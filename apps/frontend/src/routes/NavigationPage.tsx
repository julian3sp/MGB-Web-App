import React, { useRef, useEffect } from 'react';
import mapImage from "../components/navigation/floorplan.jpg"
import DrawingPath from "../components/navigation/pathfinding/drawingPath.tsx";
import MapComponent from "../components/map/MapComponent.tsx";

function NavigationPage() {
    return (
        <div className="w-full h-screen">
            <MapComponent />
            {/*<DrawingPath/>*/}

        </div>
    );
}

export default NavigationPage;
