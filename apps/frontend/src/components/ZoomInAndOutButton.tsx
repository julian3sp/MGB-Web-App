import React from "react";

interface ZoomControlsProps {
  map: google.maps.Map | null;
  selectedDestination?: { name: string; location: { lat: number; lng: number } } | null;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({ map, selectedDestination }) => {
  const handleZoomIn = () => {
    if (map && selectedDestination) {
      map.setCenter(selectedDestination.location);
      const currentZoom = map.getZoom() || 0;
      map.setZoom(Math.min(currentZoom + 1, 20));
    }
  };

  const handleZoomOut = () => {
    if (map) {
      const currentZoom = map.getZoom() || 0;
      map.setZoom(currentZoom - 1);
    }
  };

  return (
    <div className="flex justify-center rounded-full border border-gray-400 w-16 h-8">
      <button
        onClick={handleZoomOut}
        className="w-1/2 h-full text-2xl flex items-center justify-center font-bold leading-none hover:bg-gray-200"
      >
        -
      </button>
      <div className="w-[0.5px] bg-gray-400"></div>
      <button
        onClick={handleZoomIn}
        className="w-1/2 h-full text-2xl flex items-center justify-center font-bold leading-none hover:bg-gray-200"
      >
        +
      </button>
    </div>
  );
};

export default ZoomControls;
