import React, { useState, useRef, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

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

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    useEffect(() => {
        if (!apiKey) {
            console.error('Google Maps API Key is missing');
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
                        center: { lat: 42.3601, lng: -71.0589 }, // Set initial map center
                        zoom: 12, // Initial zoom level
                        fullscreenControl: true,
                        mapTypeControl: false,
                        streetViewControl: true,
                        zoomControl: true,
                        scrollwheel: true, // Enable scroll zoom
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
            .catch((error) => console.error('Error loading Google Maps: ', error));
    }, [onMapReady, apiKey]);

    useEffect(() => {
        const setFullScreenMap = () => {
            if (mapRef.current) {
                mapRef.current.style.height = '100vh'; // Ensure map takes full screen height
                mapRef.current.style.width = '100vw';  // Ensure map takes full screen width
            }
        };

        setFullScreenMap();
        window.addEventListener('resize', setFullScreenMap); // Adjust map size on window resize

        return () => {
            window.removeEventListener('resize', setFullScreenMap); // Clean up on unmount
        };
    }, []);

    return <div ref={mapRef} style={{ height: '100vh', width: '100vw' }}></div>;
};

export default MapEditor;
