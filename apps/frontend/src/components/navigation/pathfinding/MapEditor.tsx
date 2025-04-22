
import React, { useState, useRef, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { createMGBOverlays, MGBOverlays } from '../../map/overlays/MGBOverlay';
import { createPatriot20Overlays } from '../../map/overlays/20PatriotOverlay';
import { createPatriot22Overlays, updatePatriotPlace22, Patriot22Overlays } from '../../map/overlays/22PatriotOverlay';
import { createMarkers, drawAllEdges } from '../../map/overlays/createMarkers';
import ImportAllNodesAndEdges from '../mapEditorComponent/Import';
import { trpc } from "@/lib/trpc";
import MapEditorControls from '../mapEditorComponent/MapEditorControl';
import Graph, { Node, Edge } from './Graph';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem
} from '../../ui/dropdown-menu.tsx'

import { Button } from "@/components/ui/button"
import {aL} from "vitest/dist/chunks/reporters.d.CqBhtcTq";

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
  const [algoType, setAlgoType] = useState("A-Star")

  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<3 | 4 | null>(null);

  const [nodeInfo, setNodeInfo] = useState<{ id: string; x: number; y: number;} | null>(null);
    const { data: nodesDataFromAPI, isLoading: isNodesLoading } = trpc.getAllNodes.useQuery();
  const { data: edgesDataFromAPI, isLoading: isEdgesLoading } = trpc.getAllEdges.useQuery();
    const addNode = trpc.makeNode.useMutation()

  const [mgbOverlay, setMgbOverlay] = useState<MGBOverlays | null>(null);
  const [patriot22Overlay, setPatriot22Overlay] = useState<Patriot22Overlays | null>(null);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const hospitalLocationMap = {
    "MGB (Chestnut Hill)": { lat: 42.32610671664074, lng: -71.14958629820883 },
    "20 Patriot Place": { lat: 42.09236331125932, lng: -71.26640880069897 },
    "22 Patriot Place": { lat: 42.09265105806092, lng: -71.26676051809467 }
  };

  const filterNodesByHospital = (building: string): Node[] => {
    return nodesDataFromAPI?.filter((node: Node) => node.building === building) || [];
  };

  function setAlgoTypeWrapper(algo: string){
      //window.sessionStorage.setItem("algoType", algo);
      window.sessionStorage.clear()
      setAlgoType(algo);
  }

  useEffect(() => {
    if (!apiKey || map || !mapRef.current) return;

    const loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['places'],
      language: 'en',
    });

        loader.load()
            .then(() => {
                if (mapRef.current) {
                    const newMap = new google.maps.Map(mapRef.current, {
                        center: { lat: 42.3601, lng: -71.0589 },
                        zoom: 12,
                        fullscreenControl: true,
                        mapTypeControl: false,
                        streetViewControl: true,
                        zoomControl: true,
                        disableDoubleClickZoom: true
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
    }).catch(console.error);
  }, [onMapReady, apiKey]);

  const toggleNodesHandler = () => {
    if (!map || isNodesLoading || !nodesDataFromAPI || !selectedHospital) return;

        if (showNodes) {
            nodeMarkers.forEach(marker => marker.setMap(null));
            setNodeMarkers([]);
            setShowNodes(false);
        } else {
            console.log("Bro")
            const filteredNodes = filterNodesByHospital(selectedHospital);
            const markersCreated = createMarkers(map, nodesDataFromAPI, setNodeDetails);
            setNodeMarkers(markersCreated);
            setShowNodes(true);
        }
    };

  const toggleEdgesHandler = () => {
    if (!map || isNodesLoading || isEdgesLoading || !nodesDataFromAPI || !edgesDataFromAPI || !selectedHospital) return;

    if (showEdges) {
      edgePolylines.forEach(polyline => polyline.setMap(null));
      setEdgePolylines([]);
      setShowEdges(false);
    } else {
      const filteredNodes = filterNodesByHospital(selectedHospital);
      const nodeIds = new Set(filteredNodes.map((node: Node) => node.id));

      const filteredEdges = edgesDataFromAPI.filter(
        (edge: { sourceId: number; targetId: number }) => nodeIds.has(edge.sourceId) && nodeIds.has(edge.targetId)
      );

      const polylinesCreated = drawAllEdges(map, filteredEdges);
      setEdgePolylines(polylinesCreated);
      setShowEdges(true);
    }
  };

    const handleAddNode = () => {
    }

    const handleRemoveNode = () => {

    }

    const setNodeDetails = (node: Node) => {
        setNodeInfo({ id: node.id.toString(), x: node.x, y: node.y});
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
            if (selectedHospital === "MGB (Chestnut Hill)") {
                setMgbOverlay(createMGBOverlays(map));
            } else if (selectedHospital === "20 Patriot Place") {
                createPatriot20Overlays(map);
            } else if (selectedHospital === "22 Patriot Place") {
                setPatriot22Overlay(createPatriot22Overlays(map));
            }

            const location = hospitalLocationMap[selectedHospital as keyof typeof hospitalLocationMap];
            if (location) {
                map.setZoom(19);
                map.panTo(location);
            }
        } catch (err) {
            console.error("Overlay setup error:", err);
        }
    }, [map, selectedHospital]);

    useEffect(() => {
        if (!map || !patriot22Overlay || selectedHospital !== "22 Patriot Place") return;
        try {
            updatePatriotPlace22(patriot22Overlay, selectedFloor || 3);
        } catch (err) {
            console.error("Error updating Patriot22 floor overlay:", err);
        }
    }, [selectedFloor, map, patriot22Overlay, selectedHospital]);

    return (
        <div className="flex h-screen">
            <div className="w-1/4 p-5 border-r border-gray-300 flex flex-col gap-4">
                <h2 className="font-bold text-center font-[poppins]">Map Editor Controls</h2>

                <button
                    onClick={toggleNodesHandler}
                    className="bg-[#003a96] text-white py-2 px-4 rounded hover:bg-blue-600 font-[poppins]"
                >
                    {showNodes ? 'Hide Nodes' : 'Show Nodes'}
                </button>

                <button
                    onClick={toggleEdgesHandler}
                    className="bg-[#003a96] text-white py-2 px-4 rounded hover:bg-blue-600 font-[poppins]"
                >
                    {showEdges ? 'Hide Edges' : 'Show Edges'}
                </button>



                {nodeInfo && (
                    <div className=" bg-white shadow-lg border-2 border-frey rounded-2xl p-6 font-[poppins] text-center space-y-3 ">
                        <h2 className="text-xl font-semibold text-gray-800">Node Info</h2>
                        <p className="text-black text-lg"><span className="font-bold">ID:</span> {nodeInfo.id}</p>
                        <p className="text-black text-lg"><span className="font-bold">Longitude:</span> {(nodeInfo.x).toFixed(6)}</p>
                        <p className="text-black text-lg"><span className="font-bold">Latitude:</span> {(nodeInfo.y).toFixed(6)}</p>
                        <button className={"bg-[#003a96] text-white hover:bg-blue-600 shadow-lg rounded-2xl p-3 "}>
                            Remove Node
                        </button>
                    </div>

                )}
                <div className="w-full p-5 flex flex-col gap-4">
                    <ImportAllNodesAndEdges />
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="w-full bg-[#003a96] text-white px-4 py-2 rounded hover:bg-blue-800}">Choose Your Algorithm</button>
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
                    onToggleNodes={toggleNodesHandler}
                    onToggleEdges={toggleEdgesHandler}
                />

            </div>
        </div>
    );
};

export default MapEditor;
