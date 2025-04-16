import React from 'react';

interface FloorSelectorProps {
  selectedFloor: 3 | 4;
  onSelect: (floor: 3 | 4) => void;
}

const FloorSelector: React.FC<FloorSelectorProps> = ({ selectedFloor, onSelect }) => {
  return (
    <div className="absolute top-1/2 right-1 transform -translate-y-1/2 z-50 flex flex-col bg-white rounded shadow">
      <button
        onClick={() => onSelect(3)}
        className={`px-3 py-2 cursor-pointer ${
          selectedFloor === 3 ? 'bg-blue-600 text-white' : 'bg-white text-black'
        }`}
      >
        Floor 3
      </button>
      <button
        onClick={() => onSelect(4)}
        className={`px-3 py-2 cursor-pointer ${
          selectedFloor === 4 ? 'bg-blue-600 text-white' : 'bg-white text-black'
        }`}
      >
        Floor 4
      </button>
    </div>
  );
};

export default FloorSelector;
