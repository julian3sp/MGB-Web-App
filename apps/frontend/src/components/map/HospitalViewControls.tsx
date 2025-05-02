import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel
} from '../MapEditor/DropdownMenu.tsx';
import ZoomControls from './ZoomInAndOutButton.tsx';
import RotateControl from './RotateButton.tsx'

interface HospitalViewControlsProps {
  map: google.maps.Map | null;
  selectedDestination: { name: string; location: { lat: number; lng: number } } | null;
  selectedFloor: 1| 2| 3 | 4;
  onFloorChange: (floor: 1| 2 | 3 | 4) => void;
  rotateMap: (direction: 'left' | 'right') => void;
}

const HospitalViewControls: React.FC<HospitalViewControlsProps> = ({
  map,
  selectedDestination,
  selectedFloor,
  onFloorChange,
  rotateMap
}) => {
  const isMGB = selectedDestination?.name === "MGB (Chestnut Hill)";
  const isPatriotPlace = selectedDestination?.name === "20 Patriot Place" || 
                          selectedDestination?.name === "22 Patriot Place";
  const isFaulkner = selectedDestination?.name === "Faulkner";
  const isMainCampus = selectedDestination?.name === "Main Campus";

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full flex items-center justify-center px-4 shadow-md border border-gray-300 w-auto max-w-full py-1.5">
      <div className="flex items-center space-x-2">
        {isMGB || isFaulkner || isMainCampus ? (
          <div className="font-medium">
            <span className="font-light">Viewing: </span><span className="font-bold">{selectedDestination.name}</span>
          </div>
        ) : isPatriotPlace ? (
          <div className="flex items-center font-medium">
            <span className="font-light mr-1">Viewing:</span>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-2 px-3 py-1 rounded-full border">
                <span className="text-sm font-bold">Floor {selectedFloor}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>{selectedDestination?.name}</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => onFloorChange(1)} className={selectedFloor === 1 ? "bg-blue-50" : ""}>
                      Floor 1 {selectedFloor === 1 && "✓"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onFloorChange(2)} className={selectedFloor === 2 ? "bg-blue-50" : ""}>
                      Floor 2 {selectedFloor === 2 && "✓"}
                  </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onFloorChange(3)} className={selectedFloor === 3 ? "bg-blue-50" : ""}>
                  Floor 3 {selectedFloor === 3 && "✓"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onFloorChange(4)} className={selectedFloor === 4 ? "bg-blue-50" : ""}>
                  Floor 4 {selectedFloor === 4 && "✓"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="font-medium text-gray-500">
            Select a destination
          </div>
        )}
      </div>

      <div className="h-6 w-[1px] bg-gray-300 mx-4"></div>

      {/* Zoom controls */}
      <ZoomControls map={map} selectedDestination={selectedDestination} />

      <div className="h-6 w-[1px] bg-gray-300 mx-4"></div>

      {/* Rotate controls */}
      <RotateControl rotateMap={rotateMap} />
    </div>
  );
};

export default HospitalViewControls;
