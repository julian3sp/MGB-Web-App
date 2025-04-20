import React, { useState, useRef, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { createMGBOverlays, MGBOverlays } from '../../map/overlays/MGBOverlay';
import { createPatriot20Overlays } from '../../map/overlays/20PatriotOverlay';
import { createPatriot22Overlays, updatePatriotPlace22, Patriot22Overlays } from '../../map/overlays/22PatriotOverlay'
import { createMarkers, drawAllEdges } from '../../map/overlays/createMarkers';
import ImportAllNodesAndEdges from '../mapEditorComponent/Import';
import { trpc } from "@/lib/trpc";
import MapEditorControls from '../mapEditorComponent/MapEditorControl';

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

    const { data: nodesDataFromAPI, isLoading: isNodesLoading } = trpc.getAllNodes.useQuery();
    const { data: edgesDataFromAPI, isLoading: isEdgesLoading } = trpc.getAllEdges.useQuery();

    const [mgbOverlay, setMgbOverlay] = useState<{
        parkingOverlay: google.maps.GroundOverlay;
        floorOverlay: google.maps.GroundOverlay;
    } | null>(null);

    const [patriot22Overlay, setPatriot22Overlay] = useState<Patriot22Overlays | null>(null);


    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const hospitalLocationMap = {
        "MGB (Chestnut Hill)": { lat: 42.32610671664074, lng: -71.14958629820883 },
        "20 Patriot Place": { lat: 42.09236331125932, lng: -71.26640880069897 },
        "22 Patriot Place": { lat: 42.09265105806092, lng: -71.26676051809467 }
    };

    useEffect(() => {
        if (!apiKey) {
            console.error("Google Maps API key is missing");
            return;
        }

        if (map || !mapRef.current) return;

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
            .catch((error) => console.error('Error loading Google Maps:', error));
    }, [onMapReady, apiKey]);

    // Handle toggle nodes visibility
    const toggleNodesHandler = () => {
        if (!map || isNodesLoading || !nodesDataFromAPI) return;

        if (showNodes) {
            nodeMarkers.forEach(marker => marker.setMap(null));
            setNodeMarkers([]);
            setShowNodes(false);
        } else {
            const markersCreated = createMarkers(map, nodesDataFromAPI);
            setNodeMarkers(markersCreated);
            setShowNodes(true);
        }
    };

    const toggleEdgesHandler = () => {
        if (!map || isNodesLoading || isEdgesLoading || !nodesDataFromAPI || !edgesDataFromAPI) return;

        if (showEdges) {
            edgePolylines.forEach(polyline => polyline.setMap(null));
            setEdgePolylines([]);
            setShowEdges(false);
        } else {
            const polylinesCreated = drawAllEdges(map, edgesDataFromAPI);
            setEdgePolylines(polylinesCreated);
            setShowEdges(true);
        }
    };

    useEffect(() => {
        if (!map || !selectedHospital) return;

        // Cleanup old overlays
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
                const overlays = createMGBOverlays(map);
                setMgbOverlay(overlays);
            }

            if (selectedHospital === "20 Patriot Place") {
                createPatriot20Overlays(map); // No floor control needed
            }

            if (selectedHospital === "22 Patriot Place") {
                const overlays = createPatriot22Overlays(map);
                setPatriot22Overlay(overlays);
            }

            if (selectedHospital in hospitalLocationMap) {
                const location = hospitalLocationMap[selectedHospital as keyof typeof hospitalLocationMap];
                if (location && map) {
                  map.setZoom(19);
                  map.panTo(location);
                }
            }              
        } catch (err) {
            console.error("Overlay setup error:", err);
        }
    }, [map, selectedHospital]);

    useEffect(() => {
        if (!map || !patriot22Overlay || !selectedHospital || selectedHospital !== "22 Patriot Place") return;
        try {
            updatePatriotPlace22(patriot22Overlay, selectedFloor || 3);
        } catch (err) {
            console.error("Error updating Patriot22 floor overlay:", err);
        }
    }, [selectedFloor, map, patriot22Overlay, selectedHospital]);


    return (
        <div className="flex h-screen">
            <div className="w-1/4 p-5 border-r border-gray-300 flex flex-col gap-4">
                <h2 className="font-bold text-lg text-center">Map Editor Controls</h2>

                <button
                    onClick={toggleNodesHandler}
                    className="bg-[#003a96] w-[85%] mx-auto text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    {showNodes ? 'Hide Nodes' : 'Show Nodes'}
                </button>

                <button
                    onClick={toggleEdgesHandler}
                    className="bg-[#003a96] w-[85%] mx-auto text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    {showEdges ? 'Hide Edges' : 'Show Edges'}
                </button>

                <ImportAllNodesAndEdges />
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
                />
            </div>
        </div>
    );
};

export default MapEditor;
