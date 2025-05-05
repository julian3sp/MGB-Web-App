import React, { useRef, useEffect } from 'react';
import mapImage from "../components/navigation/floorplan.jpg"
import MapComponent from "../components/map/MapComponent.tsx";


function NavigationPage() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" }); // or 'smooth'
    }, []);
    return (
        <div className="w-full min-h-[95vh] ">
            <MapComponent />
        </div>
    );
}

export default NavigationPage;
