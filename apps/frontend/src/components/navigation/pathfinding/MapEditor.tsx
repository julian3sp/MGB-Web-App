import React, {useEffect, useRef, useState} from 'react';
import {Loader} from '@googlemaps/js-api-loader';
import {createMGBOverlays, MGBOverlays} from '../../map/overlays/MGBOverlay';
import {createPatriot20Overlays} from '../../map/overlays/20PatriotOverlay';
import {createFaulknerOverlays} from '@/components/map/overlays/FaulknerOverlay.tsx';
import {createPatriot22Overlays, Patriot22Overlays, updatePatriotPlace22,} from '../../map/overlays/22PatriotOverlay';
import {addNodeListener, createMarkers} from '../../map/overlays/createMarkers';
import ImportAllNodesAndEdges from '../mapEditorComponent/Import';
import {trpc} from '@/lib/trpc';
import MapEditorControls from '../mapEditorComponent/MapEditorControl';
import {Edge, Node, NodeType} from './Graph';
import {graph} from "../../map/GraphObject.ts"
import HelpDropdown from '../mapEditorComponent/HelpDropDown.tsx';
import {drawAllEdges} from "@/components/map/overlays/edgeHandler.ts";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '../../ui/dropdown-menu.tsx';
// import {NodeType} from ""
import {WorldDistance} from "./worldCalculations.ts"
import { SRQDropdown } from '@/components/serviceRequest/inputFields/SRQDropdown.tsx';
import { EditorPanel } from '../mapEditorComponent/EditorPanel.tsx';
import { PictureCorners } from '../mapEditorComponent/PictureCorners.tsx';
import {ImageProcessorPanel} from "@/components/navigation/mapEditorComponent/ImageProcessorPanel.tsx";
import {importGraphFromZip} from "@/components/importZipGraph.ts";
import JSZip from 'jszip';
// resolve
interface MapEditorProps {
    onMapReady: (
        map: google.maps.Map,
        directionsService: google.maps.DirectionsService,
        directionsRenderer: google.maps.DirectionsRenderer
    ) => void;
}

type GMapsListener = google.maps.MapsEventListener;


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
    const [selectedNode, setselectedNode] = useState< Node | null>(null);
    const newAlgo = trpc.setAlgoType.useMutation();
    const { data: nodesDataFromAPI, isLoading: isNodesLoading, refetch: refetchNodes } = trpc.getAllNodes.useQuery();
    const { data: edgesDataFromAPI, isLoading: isEdgesLoading, refetch: refetchEdges } = trpc.getAllEdges.useQuery();
    const [mgbOverlay, setMgbOverlay] = useState<MGBOverlays | null>(null);
    const [patriot22Overlay, setPatriot22Overlay] = useState<Patriot22Overlays | null>(null);
    const addNodes = trpc.makeManyNodes.useMutation();
    const addEdges = trpc.makeManyEdges.useMutation();
    const editNodes = trpc.editNodes.useMutation();
    const deleteNodes = trpc.deleteSelectedNodes.useMutation();
    const deleteEdges = trpc.deleteSelectedEdges.useMutation();
    const makeNode = trpc.makeNode.useMutation()
    const makeEdge = trpc.makeEdge.useMutation()
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const [staticMarkers,  setStaticMarkers]  = useState<google.maps.Marker[]>([]);
    const [edgeRefresh, setEdgeRefresh] = useState(0);
    const [edgeMode, setEdgeMode] = useState(false);
    const [ghostLine, setGhostLine] = useState<google.maps.Polyline | null>(null);
    const nodeListenerRef = useRef<GMapsListener | null>(null);
    const [markerLib, setMarkerLib] = useState<google.maps.MarkerLibrary | null>(null);
    const [currentNodeType, setCurrentNodeType] = useState<string>("");


    const [startNode, setStartNode] = useState<Node| null>(null);
    const startNodeRef = useRef<Node | null>(null);



    const hospitalLocationMap = {
        'MGB (Chestnut Hill)': { lat: 42.32610671664074, lng: -71.14958629820883 },
        '20 Patriot Place': { lat: 42.09236331125932, lng: -71.26640880069897 },
        '22 Patriot Place': { lat: 42.09265105806092, lng: -71.26676051809467 },
        'Faulkner': { lat: 42.30149071877142, lng: -71.12823221807406}
    };

    function setAlgoTypeWrapper(algo: string) {
        newAlgo.mutate({ algoType: algo })
        setAlgoType(algo);
    }

    // Start of map e
    // ditor
    useEffect(() => {
        const nodesReady = !!nodesDataFromAPI && !isNodesLoading;
        const edgesReady = !!edgesDataFromAPI && !isEdgesLoading;

        if (!apiKey || map || !mapRef.current || !nodesReady || !edgesReady) return;

        const loader = new Loader({
            apiKey,
            version: 'weekly',
            libraries: ['places', "marker"],
            language: 'en',
        });


        graph.populate(nodesDataFromAPI, edgesDataFromAPI);

        loader.load().then(async () => {
            if (mapRef.current) {
                const newMap = new google.maps.Map(mapRef.current, {
                    center: {lat: 42.3601, lng: -71.0589},
                    zoom: 12,
                    fullscreenControl: true,
                    mapTypeControl: false,
                    disableDoubleClickZoom: true,
                    streetViewControl: false,
                    zoomControl: false,
                    scaleControl: false,
                    mapId: 'ca6b761fac973d24'
                });

                setMap(newMap);
                setIsLoadingMap(false);

                const lib = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
                setMarkerLib(lib);


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

    function getEdgeLines(){

        console.log("fetching lines what the heck")
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
        }
        const floor = selectedFloor === null ? 1: selectedFloor;
        const edgeComponents = drawAllEdges(map, graph.getBuildingEdges(building, floor));
        const allLayers: google.maps.Polyline[] = edgeComponents.flatMap(pack => pack.layers);
        return allLayers;
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
    }, [map, selectedHospital, selectedFloor, showNodes, edgeMode]);

    useEffect(() => {
        // graph.getNode()
    }, [currentNodeType]);



    useEffect(() => {
        if (!map || !selectedHospital || !showNodes) return;

        // detach any previous listener
        nodeListenerRef.current?.remove();

        const floor  = selectedFloor ?? 1;
        const buildingKey =
            selectedHospital === "MGB (Chestnut Hill)" ? "chestnut" :
                selectedHospital === "20 Patriot Place"   ? "pat20"   :
                    selectedHospital === "22 Patriot Place"   ? "pat22"   :
                        selectedHospital;

        // attach a single dbl-click listener
        nodeListenerRef.current = addNodeListener(
            map,
            buildingKey,
            floor,
            setNodeDetails,
            marker => setStaticMarkers(prev => [...prev, marker])
        );

        return () => {
            nodeListenerRef.current?.remove();
            nodeListenerRef.current = null;
        };
    }, [map, selectedHospital, selectedFloor, showNodes, edgeMode]);

    function displayNodes(){
        if (!map || !selectedHospital || !markerLib) return;

        const floor = selectedFloor === null ? 1: selectedFloor;
        console.log("Displaying")

        const buildingKey = selectedHospital === "MGB (Chestnut Hill)"
            ? "chestnut"
            : selectedHospital === "20 Patriot Place"
                ? "pat20"
                : selectedHospital === "22 Patriot Place"
                    ? "pat22"
                    : selectedHospital.toLowerCase();

        const newStatics = createMarkers(map, markerLib,
            graph.getBuildingNodes(buildingKey, floor),
            setselectedNode,
            'normal',
            () => setEdgeRefresh((v) => v + 1),
            handleEdgeClick);
        setStaticMarkers(newStatics);

    }

    function handleEdgeClick(node: Node){
        console.log("edge mode: ", edgeMode);
        if (!edgeMode) return;
        if (!startNodeRef.current) {
            console.log("start node:", node.id)
            setStartNode(node);
            startNodeRef.current = node;

        } else if (startNodeRef.current.id !== node.id) {
            console.log("end node:", node.id);
            // ADD WEIGHT TO EDGE
            const w = WorldDistance(startNodeRef.current, node);
            const edge: Edge = {id: Date.now(), sourceId: startNodeRef.current, targetId: node, weight: w}
            graph.addEdge(edge);
            setStartNode(null);


            if(startNodeRef.current.building !== node.building){
                startNodeRef.current.type = NodeType.SkyBridge;
                node.type = NodeType.SkyBridge;
                graph.editNode(startNodeRef.current)
                graph.editNode(node)
                console.log("set nodes to sky bridge (default)")
            }
            else if (startNodeRef.current.building === node.building && startNodeRef.current.floor !== node.floor){
                startNodeRef.current.type = NodeType.Elevator;
                node.type = NodeType.Elevator;
                graph.editNode(startNodeRef.current)
                graph.editNode(node)
                console.log("set nodes to elevator (default)")
            }

            startNodeRef.current = null;
            console.log("end");
            setEdgeRefresh((v) => v + 1);
            // Add line Follower somewhere --- ------- - --
        }
    }



    useEffect(() => {
        if (!map || !selectedHospital) return;
        edgePolylines.forEach(poly => poly.setMap(null));
        setEdgePolylines([]);

        if (showEdges) {
            const lines = getEdgeLines();
            if (lines) setEdgePolylines(lines);
        }

    }, [showEdges, selectedHospital, selectedFloor, map, edgeRefresh]);

    const handleSubmit = async () => {
        const edits = graph.getEditHistory()
        console.log("Edits: ", edits);
        await editNodes.mutateAsync(edits.editedNodes);
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
            console.log("how was this called?")
            const lines = getEdgeLines();
            if (lines) setEdgePolylines(lines);
        }
    }


    const setNodeDetails = (node: Node) => {
        setselectedNode({ id: node.id.toString(), name:node.name, x: node.x, y: node.y, nodeType: node.type});
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

    //------------ Image Processor States ---------//
    // MODE  ───────────────────────────────────────────────
    const [mode, setMode] = useState<'edit' | 'image'>('edit');

    // IMAGE-PROCESSOR STATE ──────────────────────────────
    const [imgFile, setImgFile] = useState<File | null>(null);
    const [pixelCorners, setPixelCorners] = useState<[number, number][]>([]);
    const [worldCorners, setWorldCorners] = useState<google.maps.marker.AdvancedMarkerElement[]>([]);
    const [imgOverlay, setImgOverlay] = useState<google.maps.GroundOverlay | null>(null);

    async function sendToFastApi() {
        if (!imgFile || pixelCorners.length !== 4 || worldCorners.length !== 4) {
            return alert('Need all four image + map points!');
        }

        const form = new FormData();

        // 1) The file
        form.append('file', imgFile);

        // 2) sourcePoints (pixel coords)
        form.append(
            'sourcePoints',
            JSON.stringify(pixelCorners)
        );

        // 3) targetPoints (world coords)
        form.append(
            'targetPoints',
            JSON.stringify(
                worldCorners.map(m => {
                    const pos = m.position!;
                    console.log(pos);
                    return [pos.lat, pos.lng];
                })
            )
        );

        form.append('name', 'test');
        form.append('building', "chestnut");
        form.append('floor', "1");
        form.append('offset',(graph.getAllNodes().length+1 || 1).toString());

        try {
            console.log("calculating")
            // 1) Fetch the ZIP from the FastAPI endpoint
            const res = await fetch('http://localhost:3001/image-api/generate-new-map', {
                method: 'POST',
                body: form,
            });
            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }
            const blob = await res.blob();
            const arrayBuffer = await blob.arrayBuffer();
            const zip = await JSZip.loadAsync(arrayBuffer);
            const node_edge_input = await importGraphFromZip(zip)

            await makeNode.mutateAsync(node_edge_input[0]);
            await makeEdge.mutateAsync(node_edge_input[1]);

            alert('Graph appended successfully!');
        } catch (e) {
            console.error(e);
            alert('Import failed: ' + e.message);
        }


        // cleanup
        setMode('edit');
        imgOverlay?.setMap(null);
        worldCorners.forEach(m => m.position == null);
        setImgFile(null);
        setPixelCorners([]);
        setWorldCorners([]);
        setImgOverlay(null);
    }

    function placeOverlay() {
        if (!map || !imgFile) return;

        // 1) compute initial bounds around center
        const centre = map.getCenter()!;
        const bounds = new google.maps.LatLngBounds(
            { lat: centre.lat() - 0.0005, lng: centre.lng() - 0.0005 },
            { lat: centre.lat() + 0.0005, lng: centre.lng() + 0.0005 },
        );

        // 2) create the overlay
        const url = URL.createObjectURL(imgFile);
        const overlay = new google.maps.GroundOverlay(url, bounds, { opacity: 0.6 });
        overlay.setMap(map);
        setImgOverlay(overlay);

        worldCorners.forEach(m => m.position(null));
        const newMarkers: google.maps.marker.AdvancedMarkerElement[] = [];

        // get current bounds
        const b = overlay.getBounds();
        if (!b) return;

        const ne = b.getNorthEast();
        const sw = b.getSouthWest();
        const nw = new google.maps.LatLng(ne.lat(), sw.lng());
        const se = new google.maps.LatLng(sw.lat(), ne.lng());

        // order them Top-Left (NW), Top-Right (NE), Bottom-Right (SE), Bottom-Left (SW)
        const corners = [nw, ne, se, sw];

        corners.forEach((pos, idx) => {
            const m = new google.maps.marker.AdvancedMarkerElement({
                position: pos,
                map,
                title: `${idx + 1}`,
                gmpDraggable: true
            });
            newMarkers.push(m);
        });

        setWorldCorners(newMarkers);

        // // 3) double-click handler to drop corner markers
        // overlay.addListener('dblclick', () => {
        //     // clear old markers
        //
        // });

        // // 4) retain your drag-to-move logic
        // overlay.addListener('mousedown', e => {
        //     const start = e.latLng!;
        //     const listener = map.addListener('mousemove', m => {
        //         const dx = m.latLng!.lat() - start.lat();
        //         const dy = m.latLng!.lng() - start.lng();
        //         const sw = bounds.getSouthWest();
        //         const ne = bounds.getNorthEast();
        //         const newBounds = new google.maps.LatLngBounds(
        //             { lat: sw.lat() + dx, lng: sw.lng() + dy },
        //             { lat: ne.lat() + dx, lng: ne.lng() + dy },
        //         );
        //         overlay.setOptions({ bounds: newBounds });
        //     });
        //     map.addListener('mouseup', () => google.maps.event.removeListener(listener));
        // });
    }

    return (
        <div className="flex h-[95vh]">

            {/*Start of Side bar */}
            <div className="w-1/4 p-5 border-r border-gray-300 flex flex-col gap-4 min-h-0 overflow-y-auto gap-4">

                <button
                    className="bg-[#0076CE] text-white font-[poppins] shadow rounded p-3 mb-4"
                    onClick={() => setMode(m => (m === 'edit' ? 'image' : 'edit'))}
                >
                    {mode === 'edit' ? 'Switch to Image-Processor' : 'Back to Map-Editor'}
                </button>

                {mode === 'edit' ?
                    <EditorPanel
                        selectedNode={selectedNode}
                        currentNodeType={currentNodeType}
                        setCurrentNodeType={setCurrentNodeType}
                        handleSubmit={handleSubmit}
                        edgeMode={edgeMode}
                        setEdgeMode={setEdgeMode}
                        setShowEdges={setShowEdges}
                        algoType={algoType}
                        setAlgoTypeWrapper={setAlgoTypeWrapper}
                    />
                    :
                    <ImageProcessorPanel
                        imgFile={imgFile}
                        setImgFile={setImgFile}
                        pixelCorners={pixelCorners}
                        setPixelCorners={setPixelCorners}
                        imgOverlay={imgOverlay}
                        placeOverlay={placeOverlay}
                        worldCorners={worldCorners}
                        sendToFastApi={sendToFastApi}
                    />
                }

            </div>
            {/*End of side bar*/}

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
