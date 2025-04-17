import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel
} from './ui/dropdown-menu';
import ZoomControls from './ZoomInAndOutButton';

interface HospitalViewControlsProps {
  map: google.maps.Map | null;
  selectedDestination: { name: string; location: { lat: number; lng: number } } | null;
  selectedFloor: 3 | 4;
  onFloorChange: (floor: 3 | 4) => void;
}

const HospitalViewControls: React.FC<HospitalViewControlsProps> = ({
  map,
  selectedDestination,
  selectedFloor,
  onFloorChange
}) => {
  // MGB doesn't have floors to select
  const isMGB = selectedDestination?.name === "MGB (Chestnut Hill)";
  // Either Patriot Place location has floors
  const isPatriotPlace = selectedDestination?.name === "20 Patriot Place" || 
                          selectedDestination?.name === "22 Patriot Place";

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-1/2 h-12 bg-white rounded-full flex items-center justify-center px-4 shadow-md border border-gray-300">
      <div className="flex items-center space-x-2">
        {isMGB ? (
          // Simple text display for MGB
          <div className="font-medium mr-5">
            Viewing: <span className="font-semibold">{selectedDestination.name}</span>
            <div className="inline-block h-[20px] min-h-[1em] w-0.5 self-stretch bg-dark"></div>
          </div>
        ) : isPatriotPlace ? (
          // Floor selection dropdown for Patriot Place locations
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-2 px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 mr-5">
              <span className="text-sm">Floor {selectedFloor}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>{selectedDestination?.name}</DropdownMenuLabel>
              <DropdownMenuItem 
                onClick={() => onFloorChange(3)}
                className={selectedFloor === 3 ? "bg-blue-50" : ""}
              >
                Floor 3 {selectedFloor === 3 && "✓"}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onFloorChange(4)}
                className={selectedFloor === 4 ? "bg-blue-50" : ""}
              >
                Floor 4 {selectedFloor === 4 && "✓"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          // Default when no location is selected
          <div className="font-medium text-gray-500">
            Select a destination
          </div>
        )}
      </div>

      <ZoomControls map={map} selectedDestination={selectedDestination} />
    </div>
  );
};

export default HospitalViewControls;