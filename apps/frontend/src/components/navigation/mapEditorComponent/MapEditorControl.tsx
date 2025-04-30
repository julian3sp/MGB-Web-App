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
    selectedFloor: 1| 2 | 3 | 4 | null;
    onHospitalChange: (hospital: string) => void;
    onFloorChange: (floor: 1| 2 | 3 | 4 | null) => void;
    hospitalLocationMap: Record<string, { lat: number; lng: number }>;
    showNodes: boolean;
    showEdges: boolean;
    onToggleNodes: () => void;
    onToggleEdges: () => void;
}

const hospitalsWithFloors = ["22 Patriot Place", "20 Patriot Place"];
const hospitalsNoFloors = ["MGB (Chestnut Hill)", "Main Campus"];

const MapEditorControls: React.FC<MapEditorControlsProps> = ({
    map,
    selectedHospital,
    selectedFloor,
    onHospitalChange,
    onFloorChange,
    hospitalLocationMap,
    showNodes,
    showEdges,

    onToggleNodes,
    onToggleEdges
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
                            {selectedHospital ?? 'Select hospital'}
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
                                onClick={() => {
                                    handleHospitalSelect(hospital);
                                }}
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
                            <span className="text-sm font-bold">Floor {selectedFloor ?? '-'}</span>
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
                                onClick={() => {
                                    onFloorChange(1);
                                }}
                                className={selectedFloor === 1 ? 'bg-blue-50' : ''}
                            >
                                Floor 1 {selectedFloor === 1 && '✓'}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    onFloorChange(2);

                                }}
                                className={selectedFloor === 2 ? 'bg-blue-50' : ''}
                            >
                                Floor 2 {selectedFloor === 2 && '✓'}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    onFloorChange(3);
                                }}
                                className={selectedFloor === 3 ? 'bg-blue-50' : ''}
                            >
                                Floor 3 {selectedFloor === 3 && '✓'}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    onFloorChange(4);

                                }}
                                className={selectedFloor === 4 ? 'bg-blue-50' : ''}
                            >
                                Floor 4 {selectedFloor === 4 && '✓'}
                            </DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
                <button
                    onClick={onToggleNodes}
                    title="Toggle Nodes"
                    className={`p-2 rounded-full hover:bg-gray-200 ${
                        showNodes ? 'bg-blue-100 text-blue-700' : 'text-gray-500'
                    }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 22s8-5.5 8-11a8 8 0 10-16 0c0 5.5 8 11 8 11z"
                        />
                    </svg>
                </button>

                <button
                    onClick={onToggleEdges}
                    title="Toggle Edges"
                    className={`p-2 rounded-full hover:bg-gray-200 ${
                        showEdges ? 'bg-blue-100 text-blue-700' : 'text-gray-500'
                    }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M18 6L6 18" />
                        <circle cx="18" cy="6" r="2" />
                        <circle cx="6" cy="18" r="2" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default MapEditorControls;
