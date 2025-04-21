import React, { useRef, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import ImportNodes from '../../ImportNodes.tsx';
import ImportEdges from '../../ImportEdges.tsx';
import SideNav from "@/components/serviceRequest/sideNavigation.tsx";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function MapEditor() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<google.maps.Map | null>(null);

    useEffect(() => {
        const loader = new Loader({
            apiKey: apiKey,
            version: 'weekly',
        });

        loader.load().then(() => {
            if (containerRef.current) {
                mapRef.current = new google.maps.Map(containerRef.current, {
                    center: { lat: 42.3183, lng: -71.1661 }, // Mass General Brigham - Chestnut Hill
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                });
            }
        });
    }, []);

    return (
        <div className="flex min-h-screen">
            {/* Main Content */}
            <div className="flex-1 p-4">
                <div
                    ref={containerRef}
                    className="rounded-2xl border-2 border-gray-300 shadow-md w-full h-[500px] mb-8"
                />
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">Import Nodes:</h2>
                    <ImportNodes />
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-2">Import Edges:</h2>
                    <ImportEdges />
                </div>
            </div>
        </div>
    );
}
