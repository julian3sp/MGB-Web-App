import React, { useState, useRef, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { createMGBOverlays, MGBOverlays } from '../../map/overlays/MGBOverlay';
import { createMarkers, drawAllEdges } from '../../map/overlays/createMarkers';
import ImportAllNodesAndEdges from '../mapEditorComponent/Import';
import { trpc } from "@/lib/trpc";

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
    const [nodesData, setNodesData] = useState<any[]>([]); // You can replace `any` with your data type
    const [edgesData, setEdgesData] = useState<any[]>([]); // Same as above for edges data
    const { data: nodesDataFromAPI, isLoading: isNodesLoading } = trpc.getAllNodes.useQuery();
    const { data: edgesDataFromAPI, isLoading: isEdgesLoading } = trpc.getAllEdges.useQuery();

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

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
            </div>
        </div>
    );
};

export default MapEditor;
