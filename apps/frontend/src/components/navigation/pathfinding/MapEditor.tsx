import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import {
    APIProvider,
    Map as VisMap,
    AdvancedMarker,
    Pin,
    useMap,
    CollisionBehavior
} from '@vis.gl/react-google-maps';
import { trpc } from '@/lib/trpc';
import MapEditorControls from '../mapEditorComponent/MapEditorControl';
import {Node, Edge, NodeType} from './Graph';
import {graph} from "../../map/GraphObject.ts"
import HelpDropdown from '../mapEditorComponent/HelpDropDown.tsx';
const libraries = ['places', 'marker'] as const;
import React, {useState, useRef, useEffect, useCallback} from 'react';
import {hospitalLocationMap} from "@/components/map/hospitalLocations.ts";

// Import Dropdown Menu for path type
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem
} from '../../ui/dropdown-menu.tsx';

// Import Library
import ImportAllNodesAndEdges from '../mapEditorComponent/Import';
import {renderMarkers} from "@/components/map/overlays/createMarkers.tsx";


export default function MapEditor() {
    //------------ trpc edit history --------------------//
    const addNodes = trpc.makeManyNodes.useMutation();
    const addEdges = trpc.makeManyEdges.useMutation();
    const editNodes = trpc.editNodes.useMutation();
    const deleteNodes = trpc.deleteSelectedNodes.useMutation();
    const deleteEdges = trpc.deleteSelectedEdges.useMutation();
    const [graphPopulated, setGraphPopulated] = useState<boolean>(false);

    //------------ Map controller --------------------//
    const mapRef = useRef<google.maps.Map|null>(null);
    const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
    const [selectedFloor, setSelectedFloor] = useState<3 | 4 | null>(null);
    const [showNodes, setShowNodes] = useState(false);
    const [showEdges, setShowEdges] = useState(false);
    const [edgeMode, setEdgeMode] = useState(false);
    const markerLibRef = useRef<google.maps.MarkerLibrary|null>(null);

    // Store Node info
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);

    //Stores all markers and edges
    const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
    const edgesRef   = useRef<google.maps.Polyline[]>([]);

    // Clear helpers
    function clearMarkers() {
        markersRef.current.forEach(m => m.position(null));
        markersRef.current = [];
    }
    function clearEdges() {
        edgesRef.current.forEach(l => l.setMap(null));
        edgesRef.current = [];
    }

    // useEffect(() => {
    //     if (!mapRef.current || !markerLibRef.current || !showNodes) return;
    //
    //     // clear old
    //     markersRef.current.forEach(m => m.map = null);
    //     markersRef.current = [];
    //
    //     markersRef.current = createMarkers(mapRef.current, markerLibRef.current, graph.getAllNodes(), setSelectedNode)
    //
    //     return () => {
    //         markersRef.current.forEach(m => m.map = null);
    //         markersRef.current = [];
    //     };
    // }, [mapRef.current, markerLibRef.current, showNodes]);




    //-------------Algo Type-----------------//
    const [algoType, setAlgoType] = useState(window.sessionStorage.getItem('algoType') || "A-Star");
    const newAlgo = trpc.setAlgoType.useMutation();
    function setAlgoTypeWrapper(algo: string) {
        newAlgo.mutate({ algoType: algo })
        setAlgoType(algo);
    }

    //----- Control showing nodes and edges ---------//
    const handleToggleNodes = () => setShowNodes(prev => !prev);
    const handleToggleEdges = () => setShowEdges(prev => !prev);

    //------------- Handle Submitting Edits -------------//
    const { data: nodesDataFromAPI, isLoading: isNodesLoading, refetch: refetchNodes } = trpc.getAllNodes.useQuery();
    const { data: edgesDataFromAPI, isLoading: isEdgesLoading, refetch: refetchEdges } = trpc.getAllEdges.useQuery();

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

        // staticMarkers.forEach(m => m.setMap(null));
        // setStaticMarkers([]);
        // edgePolylines.forEach(l => l.setMap(null));
        // setEdgePolylines([]);
        // graph.populate(nodesRes.data, edgesRes.data);
        // if (showNodes) displayNodes();
        // if (showEdges) {
        //     console.log("how was this called?")
        //     const lines = getEdgeLines();
        //     if (lines) setEdgePolylines(lines);
        // }
    }

    //----------- Map Loaders *This needs to be placed last --------------------//
    const [isLoadingMap, setIsLoadingMap] = useState(true);

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries,
        id: 'gmap-script', // unique script id
    });

    if (loadError) return <p>Error loading Maps</p>;
    if (!isLoaded){
        return <div className="flex h-[95vh]">
                    <div className="absolute inset-0 z-20 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-[#003a96] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </div>;
    }


    function handleMapReady(map: google.maps.Map) {
        const dirSvc  = new google.maps.DirectionsService();
        const dirRndr = new google.maps.DirectionsRenderer({ map });
        setIsLoadingMap(false);
        console.log("loading something?")
        mapRef.current = map;

        // Load Advance Marker Lib
        google.maps.importLibrary('marker')
            .then((lib) => { markerLibRef.current = lib as google.maps.MarkerLibrary; })
            .catch(console.error);
        console.log("loading something?")
        if(!isNodesLoading && !isEdgesLoading) graph.populate(nodesDataFromAPI, edgesDataFromAPI);
    }

    function MapInitializer({ nodes, edges }) {
        const map = useMap();  // gets the google.maps.Map once the Map is mounted

        useEffect(() => {
            if (!map || !nodes || !edges || graphPopulated) return;
            graph.populate(nodes, edges);
            setGraphPopulated(true)
        }, [map]);

        return null;
    }

    // useEffect(() => {
    //     if (mapRef.current     &&     // map has loaded
    //         nodesDataFromAPI   &&     // nodes are in
    //         edgesDataFromAPI             // edges are in
    //     ) {
    //         console.log("False")
    //         graph.populate(nodesDataFromAPI, edgesDataFromAPI);
    //     }
    // }, [
    //     mapRef.current,
    //     nodesDataFromAPI,
    //     edgesDataFromAPI,
    // ]);


    return (
        <div className="flex h-[95vh]">

            {/*  Start of Sidebar Component */}
            <div className="w-1/4 p-5 border-r border-gray-300 flex flex-col gap-4">
                <h2 className="font-bold text-center font-[poppins]">Map Editor Controls</h2>
                {/*  Start of displaying Node Info */}
                {/*{nodeInfo && (*/}
                {/*    <div className=" bg-white shadow-lg border-2 border-frey rounded-2xl p-6 font-[poppins] text-center space-y-3 ">*/}
                {/*        <h2 className="text-xl font-semibold text-gray-800">Node Info</h2>*/}
                {/*        <p className="text-black text-lg"><span className="font-bold">ID:</span> {nodeInfo.id}</p>*/}
                {/*        <p className="text-black text-lg"><span className="font-bold">Name:</span> {nodeInfo.name}</p>*/}
                {/*        <p className="text-black text-lg"><span className="font-bold">Type:</span> {nodeInfo.nodeType}</p>*/}
                {/*        <SRQDropdown*/}
                {/*            value={currentNodeType}*/}
                {/*            setValue={setCurrentNodeType}*/}
                {/*            width={"w-full"}*/}
                {/*            placeholder={"Select a node type"}*/}
                {/*            options={Object.values(NodeType) as string[]}/>*/}
                {/*        /!*<p className="text-black text-lg"><span className="font-bold">Longitude:</span> {nodeInfo.x.toFixed(6)}</p>*!/*/}
                {/*        /!*<p className="text-black text-lg"><span className="font-bold">Latitude:</span> {nodeInfo.y.toFixed(6)}</p>*!/*/}
                {/*    </div>*/}
                {/*)}*/}
                {/*  End of displaying Node Info */}

                {/*  Import Nodes and Edges */}
                <div className="w-full p-5 flex flex-col gap-4">
                    <ImportAllNodesAndEdges />
                </div>

                {/*  Submit Changes */}
                <button className={'bg-[#003a96] w-[80%] mx-auto text-white font-[poppins] hover:bg-blue-950 shadow-lg rounded p-3 '} type={"submit"} onClick={handleSubmit}>
                    Submit Changes
                </button>

                {/*  Start of Edit Edge Toggle */}
                <button
                    className='bg-[#003a96] w-[80%] mx-auto text-white font-[poppins] hover:bg-blue-600 shadow-lg rounded p-3 '
                    onClick={() => {
                        setEdgeMode((prevState) => !prevState);
                        setShowEdges(true);
                    }}
                >
                    {edgeMode ? "Exit Edge Mode" : "Add Edge Mode"}
                </button>
                {/*  End of Edit Edge Toggle */}


                {/*  Start of Select Algo type */}
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
                            <DropdownMenuRadioItem value="Dijkstras">Dijkstra's</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                {/*  End of Select Algo type */}
            </div>
            {/*  End of Sidebar Component */}



            {/*  Start of Google Maps Component */}
            <div className="w-3/4 relative">

                 {/*Loading screen */}
                {(!isLoaded) && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-[#003a96] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}


                {/* ERROR BANNER */}
                {loadError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-red-100">
                        <p>Error loading Google Maps</p>
                    </div>
                )}
                {/*    Start of Google Maps Component */}
                <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                    <VisMap
                        defaultCenter={{ lat: 42.3261, lng: -71.1496 }}
                        defaultZoom={19}
                        mapId="ca6b761fac973d24"
                        onLoad={handleMapReady}
                        options={{
                            disableDoubleClickZoom: true,
                            mapTypeControl: false,
                            streetViewControl: false,
                            zoomControl: false,
                            scaleControl: false,
                        }}
                    >
                        {/*Init nodes once API and Map is ready /*/}
                        <MapInitializer nodes={nodesDataFromAPI} edges={edgesDataFromAPI} />
                        {/*<AdvancedMarker position={{lat: 42.09251897010014, lng: -71.26597724690318}} />*/}
                        {showNodes && renderMarkers(graph.getAllNodes())}
                        <MapEditorControls
                            map={mapRef.current}
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
                    </VisMap>
                </APIProvider>
        {/*    End of Google Maps Component */}
            </div>
        </div>
    );
}
