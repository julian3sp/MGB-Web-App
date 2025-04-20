import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "../../ui/dropdown-menu";

interface MapEditorControlsProps {
  map: google.maps.Map | null;
  selectedHospital: string | null;
  selectedFloor: 3 | 4 | null;
  onHospitalChange: (hospital: string) => void;
  onFloorChange: (floor: 3 | 4 | null) => void;
  hospitalLocationMap: Record<string, { lat: number; lng: number }>;
}

const hospitalsWithFloors = ["20 Patriot Place", "22 Patriot Place"];
const hospitalsNoFloors = ["MGB (Chestnut Hill)"];

const MapEditorControls: React.FC<MapEditorControlsProps> = ({
  map,
  selectedHospital,
  selectedFloor,
  onHospitalChange,
  onFloorChange,
  hospitalLocationMap,
}) => {
  const handleHospitalSelect = (hospital: string) => {
    onHospitalChange(hospital);
    onFloorChange(null);

    const location = hospitalLocationMap[hospital];
    if (map && location) {
      map.setZoom(18);
      map.panTo(location);
    }
  };

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full flex items-center justify-center px-4 shadow-md border border-gray-300 w-auto max-w-full py-1.5">
      <div className="flex items-center space-x-2 font-medium">
        <span className="font-light">Viewing:</span>

        {/* Hospital Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center space-x-2 px-3 py-1 rounded-full border">
            <span className="text-sm font-bold">
              {selectedHospital ?? "Select hospital"}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {Object.keys(hospitalLocationMap).map((hospital) => (
              <DropdownMenuItem
                key={hospital}
                onClick={() => handleHospitalSelect(hospital)}
              >
                {hospital}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Nested Floor Selector */}
        {selectedHospital && hospitalsWithFloors.includes(selectedHospital) && (
          <DropdownMenu>
            <DropdownMenuTrigger className="ml-2 flex items-center space-x-2 px-3 py-1 rounded-full border">
              <span className="text-sm font-bold">Floor {selectedFloor ?? "-"}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>{selectedHospital}</DropdownMenuLabel>
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
        )}
      </div>
    </div>
  );
};

export default MapEditorControls;
