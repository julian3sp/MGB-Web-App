import React, { useState } from 'react';
import { Node } from '../navigation/pathfinding/Graph.ts';

interface HospitalDirectionsGuideProps {
  pathNodes?: Node[];
  selectedFloor: number;
  buildingName?: string;
  textDirections: string[];
}

const convertDistance = (distance: string, useFeet: boolean): string => {
  // Handle "Continue straight" or other non-distance instructions
  if (!distance.match(/\d/)) return distance;

  // Match patterns like "10 meters" or "0.5 miles"
  const match = distance.match(/(.*?)(\d+\.?\d*)\s*(meters|miles|feet)(.*)/i);
  if (!match) return distance;


  const prefix = match[1] || '';
  const value = parseFloat(match[2]);
  const unit = match[3].toLowerCase();
  const suffix = match[4] || '';

  if (useFeet) {
    if (unit === 'meters') {
      const feet = value * 3.28084;
      return `${prefix}${feet.toFixed(0)} feet${suffix}`;
    } else if (unit === 'miles') {
      const feet = value * 5280;
      return `${prefix}${feet.toFixed(0)} feet${suffix}`;
    }
    // If already in feet, return as-is
    return distance;
  } else {
    // Convert feet back to meters if needed
    if (unit === 'feet') {
      const meters = value * 0.3048;
      return `${prefix}${meters.toFixed(0)} meters${suffix}`;
    }
    // If already in meters/miles, return as-is
    return distance;
  }
};

const HospitalDirectionsGuide: React.FC<HospitalDirectionsGuideProps> = ({
  pathNodes,
  selectedFloor,
  buildingName,
  textDirections,
}) => {
  const [useFeet, setUseFeet] = useState(false)

  if (!pathNodes || pathNodes.length === 0 || !buildingName || textDirections.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md font-[Poppins]">
        <h3 className="font-bold mb-2 text-[16.5px] text-[#003a96]">Hospital Directions</h3>
        <p className="text-gray-600">Select a department to see indoor navigation instructions.</p>
      </div>
    );
  }

  const UnitToggleButton = () => (
    <button
      onClick={() => setUseFeet(!useFeet)}
      className="py-1 text-[#003a96] text-md font-bold cursor-pointer transition-colors"
    >
      {useFeet ? 'Meters' : 'Feet'}
    </button>
  );

  // Convert all directions based on the current unit
  const convertedDirections = textDirections.map(dir => convertDistance(dir, useFeet));

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-h-96 overflow-y-auto font-[Poppins]">
      <div className='flex justify-between items-center'>
        <h3 className="font-bold text-[16.5px] text-[#003a96]">Directions for {buildingName}</h3>
        <UnitToggleButton />
      </div>
      <div className="mb-2 text-sm text-gray-500">
        Current Floor: {selectedFloor}
      </div>

      <ol className="space-y-2 list-decimal pl-5">
        {convertedDirections.map((direction, index) => (
          <li key={index} className="text-gray-700">
            {direction}
          </li>
        ))}
      </ol>

      {pathNodes.some(node => node.floor !== selectedFloor) && (
        <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
          <p>Note: Your destination requires changing floors.</p>
        </div>
      )}
    </div>
  );
};

export default HospitalDirectionsGuide;