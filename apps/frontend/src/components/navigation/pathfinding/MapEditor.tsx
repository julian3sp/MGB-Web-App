import React, { useState, useRef, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { createMGBOverlays, MGBOverlays } from '../../map/overlays/MGBOverlay';
import { createPatriot20Overlays } from '../../map/overlays/20PatriotOverlay';
import {
    createPatriot22Overlays,
    updatePatriotPlace22,
    Patriot22Overlays,
} from '../../map/overlays/22PatriotOverlay';
import {createMarkers, drawAllEdges} from '../../map/overlays/createMarkers';
import ImportAllNodesAndEdges from '../mapEditorComponent/Import';
import { trpc } from '@/lib/trpc';
import MapEditorControls from '../mapEditorComponent/MapEditorControl';
import {Node, Edge, Graph} from './Graph';
import {graph} from "../../map/GraphObject.ts"
import HelpDropdown from '../mapEditorComponent/HelpDropDown.tsx';

interface MapEditorProps {
    onMapReady: (
        map: google.maps.Map,
        directionsService: google.maps.DirectionsService,
        directionsRenderer: google.maps.DirectionsRenderer
    ) => void;
}

const MapEditor: React.FC<MapEditorProps> = ({ onMapReady }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [nodeMarkers, setNodeMarkers] = useState<google.maps.Marker[]>([]);
    const [edgePolylines, setEdgePolylines] = useState<google.maps.Polyline[]>([]);
    const [showNodes, setShowNodes] = useState(false);
    const [showEdges, setShowEdges] = useState(false);
    const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
    const [selectedFloor, setSelectedFloor] = useState<3 | 4 | null>(null);
    const [nodeInfo, setNodeInfo] = useState<{ id: string; x: number; y: number } | null>(null);
    const { data: nodesDataFromAPI, isLoading: isNodesLoading } = trpc.getAllNodes.useQuery();
    const { data: edgesDataFromAPI, isLoading: isEdgesLoading } = trpc.getAllEdges.useQuery();
    const addNode = trpc.makeManyNodes.useMutation();
    const [mgbOverlay, setMgbOverlay] = useState<MGBOverlays | null>(null);
    const [patriot22Overlay, setPatriot22Overlay] = useState<Patriot22Overlays | null>(null);
    const [nodesToRemove, setNodesToRemove] = useState<{ id: string; x: number; y: number }[]>([])
    const [nodesToAdd, setNodesToAdd] = useState<{id: number; name: string; building: string; floor: number; x: number; y: number; edgeCost: number; totalCost: number; }[]>([])
    const addNodes = trpc.makeManyNodes.useMutation();
    const addEdges = trpc.makeManyEdges.useMutation();
    const deleteNodes = trpc.deleteSelectedNodes.useMutation();
    const deleteEdges = trpc.deleteSelectedEdges.useMutation();
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const hospitalLocationMap = {
        'MGB (Chestnut Hill)': { lat: 42.32610671664074, lng: -71.14958629820883 },
        '20 Patriot Place': { lat: 42.09236331125932, lng: -71.26640880069897 },
        '22 Patriot Place': { lat: 42.09265105806092, lng: -71.26676051809467 },
    };

    useEffect(() => {
        const nodesReady = !!nodesDataFromAPI && !isNodesLoading;
        const edgesReady = !!edgesDataFromAPI && !isEdgesLoading;

        if (!apiKey || map || !mapRef.current || !nodesReady || !edgesReady) return;

        const loader = new Loader({
            apiKey,
            version: 'weekly',
            libraries: ['places'],
            language: 'en',
        });
        graph.populate(nodesDataFromAPI, edgesDataFromAPI);

        loader
            .load()
            .then(() => {
                if (mapRef.current) {
                    const newMap = new google.maps.Map(mapRef.current, {
                        center: { lat: 42.3601, lng: -71.0589 },
                        zoom: 12,
                        fullscreenControl: true,
                        mapTypeControl: false,
                        disableDoubleClickZoom: true,
                        streetViewControl: false, 
                        zoomControl: false, 
                        scaleControl: false,
                    });

                    setMap(newMap);

                    const directionsService = new google.maps.DirectionsService();
                    const directionsRenderer = new google.maps.DirectionsRenderer({
                        map: newMap,
                        suppressMarkers: true,
                        preserveViewport: false,
                        polylineOptions: {
                            strokeColor: '#1A73E8',
                            strokeWeight: 4,
                        },
                    });

                    directionsRenderer.setMap(newMap);
                    onMapReady(newMap, directionsService, directionsRenderer);

                }
            })
            .catch(console.error);
    }, [onMapReady, apiKey]);

    function getNodeMarkers(){
        if(!selectedHospital || !map) return;
        const floor = selectedFloor === null ? 1: selectedFloor;
        console.log(graph.getBuildingNodes(selectedHospital, floor))

        let markers = createMarkers(map, graph.getBuildingNodes(selectedHospital, floor), setNodeDetails, setAddNode, 'normal');
        markers = [...markers, ...createMarkers(map, nodesToRemove, setNodeDetails, setAddNode, 'removed')]
        return markers;
    }

    function getEdgeLines(){
        if(!selectedHospital || !map) return;
        const floor = selectedFloor === null ? 1: selectedFloor;
        return drawAllEdges(map, graph.getBuildingEdges(selectedHospital, floor));
    }

    const handleToggleNodes = () => {
        setShowNodes(prev => !prev);
    };


    // Display nodes
    useEffect(() => {
        if (!map || !selectedHospital) return;

        // Always clear
        nodeMarkers.forEach(m => m.setMap(null));
        setNodeMarkers([]);

        if (showNodes) {
            const markers = getNodeMarkers();
            if (markers) {
                setNodeMarkers(markers);
            }
        }
    }, [showNodes, selectedHospital, selectedFloor, map, nodesToRemove]);


    const handleToggleEdges = () => {
        setShowEdges(prev => !prev);
    };

    // Display Edges
    useEffect(() => {
        if (!map || !selectedHospital) return;

        // clear edges
        edgePolylines.forEach(poly => poly.setMap(null));
        setEdgePolylines([]);

        if (showEdges) {
            const lines = getEdgeLines();
            if (lines) {
                setEdgePolylines(lines);
            }
        }
    }, [showEdges, selectedHospital, selectedFloor, map, nodesToRemove]);

    const setAddNode = (node: Node) => {
        setNodesToAdd(prev => [
            ...prev,
            {
                id: 1,
                name: '',
                building: selectedHospital!,   // or default like 'Main'
                floor: selectedFloor ?? 1,       // default floor if unknown
                x: node.x,
                y: node.y,
                edgeCost: node.edgeCost,
                totalCost: node.totalCost
            },
        ]);
    };

    const handleSubmit = async () => {

        const edits = graph.getEditHistory()
        await addNodes.mutateAsync(edits.addedNodes);
        console.log("We are ready to rolllll1")
        await addEdges.mutateAsync(edits.addedEdges);
        console.log("We are ready to rolllll2")
        await deleteNodes.mutateAsync(edits.deletedNodes);
        console.log("We are ready to rolllll3")
        await deleteEdges.mutateAsync(edits.deletedEdges);
        console.log("edits committed");
        // graph.commitEdits()
        const nodesReady = !!nodesDataFromAPI && !isNodesLoading;
        const edgesReady = !!edgesDataFromAPI && !isEdgesLoading;

        console.log(nodesDataFromAPI);
        if (!nodesReady || !edgesReady) return;
        console.log("We are ready to rolllll")
        graph.populate(nodesDataFromAPI, edgesDataFromAPI);

    }

    const handleRemoveNode = (id: number) => {

    };

    const setNodeDetails = (node: Node) => {
        setNodeInfo({ id: node.id.toString(), x: node.x, y: node.y });
    };

    useEffect(() => {
        if (!map || !selectedHospital) return;

        if (mgbOverlay) {
            mgbOverlay.parkingOverlay.setMap(null);
            mgbOverlay.floorOverlay.setMap(null);
            setMgbOverlay(null);
        }
        if (patriot22Overlay) {
            patriot22Overlay.floor3Overlay.setMap(null);
            patriot22Overlay.floor4Overlay.setMap(null);
            setPatriot22Overlay(null);
        }

        try {
            if (selectedHospital === 'MGB (Chestnut Hill)') {
                setMgbOverlay(createMGBOverlays(map));
            } else if (selectedHospital === '20 Patriot Place') {
                createPatriot20Overlays(map);
            } else if (selectedHospital === '22 Patriot Place') {
                setPatriot22Overlay(createPatriot22Overlays(map));
            }

            const location =
                hospitalLocationMap[selectedHospital as keyof typeof hospitalLocationMap];
            if (location) {
                map.setZoom(19);
                map.panTo(location);
            }
        } catch (err) {
            console.error('Overlay setup error:', err);
        }
    }, [map, selectedHospital]);






    useEffect(() => {
        if (!map || !patriot22Overlay || selectedHospital !== '22 Patriot Place') return;
        try {
            updatePatriotPlace22(patriot22Overlay, selectedFloor || 3);
        } catch (err) {
            console.error('Error updating Patriot22 floor overlay:', err);
        }
    }, [selectedFloor, map, patriot22Overlay, selectedHospital]);







    return (
        <div className="flex h-[95vh]">
            <div className="w-1/4 p-5 border-r border-gray-300 flex flex-col gap-4">
                <h2 className="font-bold text-center font-[poppins]">Map Editor Controls</h2>

                {nodeInfo && (
                    <div className=" bg-white shadow-lg border-2 border-frey rounded-2xl p-6 font-[poppins] text-center space-y-3 ">
                        <h2 className="text-xl font-semibold text-gray-800">Node Info</h2>
                        <p className="text-black text-lg">
                            <span className="font-bold">ID:</span> {nodeInfo.id}
                        </p>
                        <p className="text-black text-lg">
                            <span className="font-bold">Longitude:</span> {nodeInfo.x.toFixed(6)}
                        </p>
                        <p className="text-black text-lg">
                            <span className="font-bold">Latitude:</span> {nodeInfo.y.toFixed(6)}
                        </p>
                        <button
                            className={
                                'bg-[#003a96] text-white hover:bg-blue-600 shadow-lg rounded p-3 '
                            }
                            onClick={() => {
                                setNodesToRemove(prev => [...prev, nodeInfo]);
                            }}


                        >
                            Remove Node
                        </button>
                    </div>

                )}

                <div className="w-full p-5 flex flex-col gap-4">
                    <ImportAllNodesAndEdges />
                </div>
                <button className={'bg-[#003a96] w-[80%] mx-auto text-white hover:bg-blue-600 shadow-lg rounded p-3 '} type={"submit"} onClick={handleSubmit}>
                    Submit Changes
                </button>

                <div className="w-3/4 relative">
                    <div ref={mapRef} className="w-full h-full"></div>
                </div>
            </div>
            <div className="w-3/4 relative">
                <div ref={mapRef} className="w-full h-full"></div>
                <MapEditorControls
                    map={map}
                    selectedHospital={selectedHospital}
                    selectedFloor={selectedFloor}
                    onHospitalChange={setSelectedHospital}
                    onFloorChange={setSelectedFloor}
                    hospitalLocationMap={hospitalLocationMap}
                    showNodes={showNodes}
                    showEdges={showEdges}
                    onToggleNodes={handleToggleNodes}
                    onToggleEdges={handleToggleEdges}
                />

                <HelpDropdown />
            </div>
        </div>
    );
};

export default MapEditor;
