import React, { useState, useRef, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { createMGBOverlays, MGBOverlays } from '../../map/overlays/MGBOverlay';
import { createPatriot20Overlays } from '../../map/overlays/20PatriotOverlay';
import { createFaulknerOverlays } from '@/components/map/overlays/FaulknerOverlay.tsx';
import {
    createPatriot22Overlays,
    updatePatriotPlace22,
    Patriot22Overlays,
} from '../../map/overlays/22PatriotOverlay';
import { addNodeListener, createMarkers } from '../../map/overlays/createMarkers';
import ImportAllNodesAndEdges from '../mapEditorComponent/Import';
import { trpc } from '@/lib/trpc';
import MapEditorControls from '../mapEditorComponent/MapEditorControl';
import {Node, Edge} from './Graph';
import {graph} from "../../map/GraphObject.ts"
import HelpDropdown from '../mapEditorComponent/HelpDropDown.tsx';
import {drawAllEdges} from "@/components/map/overlays/edgeHandler.ts";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem
} from '../../ui/dropdown-menu.tsx';

// resolve
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
    const [edgePolylines, setEdgePolylines] = useState<google.maps.Polyline[]>([]);
    const [isLoadingMap, setIsLoadingMap] = useState(true);
    const [showNodes, setShowNodes] = useState(false);
    const [showEdges, setShowEdges] = useState(false);
    const [algoType, setAlgoType] = useState(window.sessionStorage.getItem('algoType') || "A-Star");
    const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
    const [selectedFloor, setSelectedFloor] = useState<3 | 4 | null>(null);
    const [nodeInfo, setNodeInfo] = useState<{ id: string; x: number; y: number } | null>(null);

    const { data: nodesDataFromAPI, isLoading: isNodesLoading, refetch: refetchNodes } = trpc.getAllNodes.useQuery();
    const { data: edgesDataFromAPI, isLoading: isEdgesLoading, refetch: refetchEdges } = trpc.getAllEdges.useQuery();
    const [mgbOverlay, setMgbOverlay] = useState<MGBOverlays | null>(null);
    const [patriot22Overlay, setPatriot22Overlay] = useState<Patriot22Overlays | null>(null);
    const [nodesToRemove, setNodesToRemove] = useState<{ id: string; x: number; y: number }[]>([])
    const addNodes = trpc.makeManyNodes.useMutation();
    const addEdges = trpc.makeManyEdges.useMutation();
    const deleteNodes = trpc.deleteSelectedNodes.useMutation();
    const deleteEdges = trpc.deleteSelectedEdges.useMutation();
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const [staticMarkers,  setStaticMarkers]  = useState<google.maps.Marker[]>([]);
    const [newNodeTracker,  setNewNodeTracker]  = useState(false);
    const [clearMarkers, setClearMarkers]  = useState<boolean>(false);

    const hospitalLocationMap = {
        'MGB (Chestnut Hill)': { lat: 42.32610671664074, lng: -71.14958629820883 },
        '20 Patriot Place': { lat: 42.09236331125932, lng: -71.26640880069897 },
        '22 Patriot Place': { lat: 42.09265105806092, lng: -71.26676051809467 },
        'Faulkner': { lat: 42.30149071877142, lng: -71.12823221807406}
    };

    function setAlgoTypeWrapper(algo: string) {
        window.sessionStorage.setItem("algoType", algo);
        setAlgoType(algo);
    }

    // Start of map editor
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

        loader.load().then(() => {
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
                setIsLoadingMap(false);

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

    // useEffect(() => {
    //     if (!map) return;
    //
    //     const marker = new google.maps.Marker({
    //         position: { lat: 42.30149071877142, lng: -71.12823221807406},
    //         map,
    //         draggable: true,
    //         title: "Drag me!"
    //     });
    //
    //     // const listener = marker.addListener("dragend", () => {
    //     //     const pos = marker.getPosition();
    //     //     if (pos) {
    //     //         console.log("Marker dropped at:", pos.lat().toFixed(6), pos.lng().toFixed(6));
    //     //     }
    //     // });
    //
    //     return () => {
    //       //  listener.remove();
    //         marker.setMap(null);
    //     };
    // }, [map]);

    function getEdgeLines(){
        console.log("fetching lines")
        if(!selectedHospital || !map) return;
        let building = selectedHospital;
        if (building === "20 Patriot Place"){
            building = "pat20";
        }
        else if (building === "22 Patriot Place"){
            building = "pat22";
        }
        else if (building === "MGB (Chestnut Hill)"){
            building = "chestnut";
        } else if (building === "Faulkner"){
            building = "Faulkner";
        }
        const floor = selectedFloor === null ? 1: selectedFloor;
        return drawAllEdges(map, graph.getBuildingEdges(building, floor));
    }

    const handleToggleNodes = () => setShowNodes(prev => !prev);
    const handleToggleEdges = () => setShowEdges(prev => !prev);



    // Effect to clear and rerender markers when building or floor changes
    useEffect(() => {
        if (!map) return;

        // Clear all existing markers
        staticMarkers.forEach(m => m.setMap(null));
        setStaticMarkers([]);
        console.log("Full clear");

        // Display nodes if showNodes is true and a building is selected
        if (showNodes && selectedHospital) {
            displayNodes();
        }
    }, [map, selectedHospital, selectedFloor, showNodes]);

    useEffect(() => {
        if (!map || !selectedHospital) return;

        // Function to listen for new nodes
        const newNodeListener = () => {
            const floor = selectedFloor ?? 1;
            console.log("Creating new node");

            const buildingKey = selectedHospital === "MGB (Chestnut Hill)"
                ? "chestnut"
                : selectedHospital === "20 Patriot Place"
                    ? "pat20"
                    : selectedHospital === "22 Patriot Place"
                        ? "pat22"
                        : selectedHospital.toLowerCase();

            const listener = addNodeListener(map, buildingKey, floor, marker => {
                // Add the new marker to staticMarkers and toggle newNodeTracker
                setStaticMarkers(prev => [...prev, marker]);
                setNewNodeTracker(prev => !prev);
            });

            return () => listener.remove();
        };

        // Listen for new nodes if showNodes is true
        if (showNodes) {
            newNodeListener();
        }
    }, [map, selectedHospital, selectedFloor, showNodes, newNodeTracker]);


    function newNodeListener(){
        if (!map || !selectedHospital) return;

        const floor = selectedFloor === null ? 1: selectedFloor;
        console.log("Displaying")


        const buildingKey = selectedHospital === "MGB (Chestnut Hill)"
            ? "chestnut"
            : selectedHospital === "20 Patriot Place"
                ? "pat20"
                : selectedHospital === "22 Patriot Place"
                    ? "pat22"
                    : selectedHospital.toLowerCase();

        const listener = addNodeListener(map, buildingKey, selectedFloor ?? 1,
            marker => {
                setStaticMarkers(prev => [...prev, marker]);
                setNewNodeTracker(prev => !prev);
            });
        return () => listener.remove();
    }

    function displayNodes(){
        if (!map || !selectedHospital) return;

        const floor = selectedFloor === null ? 1: selectedFloor;
        console.log("Displaying")

        const buildingKey = selectedHospital === "MGB (Chestnut Hill)"
            ? "chestnut"
            : selectedHospital === "20 Patriot Place"
                ? "pat20"
                : selectedHospital === "22 Patriot Place"
                    ? "pat22"
                    : selectedHospital.toLowerCase();

        const newStatics = createMarkers(map,
            graph.getBuildingNodes(selectedHospital, floor),
            setNodeDetails,
            'normal',
            buildingKey,
            floor
        );
        setStaticMarkers(newStatics);
    }

    useEffect(() => {
        if (!map || !selectedHospital) return;
        edgePolylines.forEach(poly => poly.setMap(null));
        setEdgePolylines([]);

        if (showEdges) {
            const lines = getEdgeLines();
            if (lines) setEdgePolylines(lines);
        }
    }, [showEdges, selectedHospital, selectedFloor, map, nodesToRemove]);

    const handleSubmit = async () => {
        const edits = graph.getEditHistory()
        console.log("Edits: ", edits.addedNodes);
        await addNodes.mutateAsync(edits.addedNodes);
        await addEdges.mutateAsync(edits.addedEdges);
        await deleteNodes.mutateAsync(edits.deletedNodes);
        await deleteEdges.mutateAsync(edits.deletedEdges);
        console.log("edits committed");

        const [nodesRes, edgesRes] = await Promise.all([
            refetchNodes(),
            refetchEdges(),
        ]);

        if (!nodesRes.data || !edgesRes.data) {
            console.error("Failed to fetch fresh data");
            return;
        }
        console.log("Database fetched", {
            nodes: nodesRes.data.length,
            edges: edgesRes.data.length
        });

        staticMarkers.forEach(m => m.setMap(null));
        setStaticMarkers([]);
        edgePolylines.forEach(l => l.setMap(null));
        setEdgePolylines([]);
        graph.populate(nodesRes.data, edgesRes.data);
        if (showNodes) displayNodes();
        if (showEdges) {
            const lines = getEdgeLines();
            if (lines) setEdgePolylines(lines);
        }
    }


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
            } else if (selectedHospital === 'Faulkner') {
                createFaulknerOverlays(map);
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
                        <p className="text-black text-lg"><span className="font-bold">ID:</span> {nodeInfo.id}</p>
                        <p className="text-black text-lg"><span className="font-bold">Longitude:</span> {nodeInfo.x.toFixed(6)}</p>
                        <p className="text-black text-lg"><span className="font-bold">Latitude:</span> {nodeInfo.y.toFixed(6)}</p>
                        <button className="bg-[#003a96] text-white hover:bg-blue-950 shadow-lg rounded p-3" onClick={() => setNodesToRemove(prev => [...prev, nodeInfo])}>
                            Remove Node
                        </button>
                    </div>
                )}

                <div className="w-full p-5 flex flex-col gap-4">
                    <ImportAllNodesAndEdges />
                </div>
                <button className={'bg-[#003a96] w-[80%] mx-auto text-white font-[poppins] hover:bg-blue-950 shadow-lg rounded p-3 '} type={"submit"} onClick={handleSubmit}>
                    Submit Changes
                </button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="bg-[#003a96] w-[80%] mx-auto font-[poppins] text-white hover:bg-blue-950 shadow-lg rounded p-3">Choose Your Algorithm</button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Pathfinding Algorithms</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={algoType} onValueChange={setAlgoTypeWrapper}>
                            <DropdownMenuRadioItem value="A-Star">A-Star</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="DFS">Depth First Search</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="BFS">Breadth First Search</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="w-3/4 relative">
                {isLoadingMap && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-[#003a96] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
                <div ref={mapRef} className="w-full h-[95vh]"></div>
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
