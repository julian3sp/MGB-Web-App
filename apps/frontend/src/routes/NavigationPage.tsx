import React, { useRef, useEffect } from 'react';
import mapImage from "../components/navigation/floorplan.jpg"
import MapComponent from "../components/map/MapComponent.tsx";

function NavigationPage() {
    return (
        <div className="w-full h-[95vh]">
            <MapComponent />
        </div>
    );
}

export default NavigationPage;
