import React from 'react';
import { Node } from '../navigation/pathfinding/Graph';

interface HospitalDirectionsGuideProps {
  pathNodes?: Node[];
  selectedFloor: number;
  buildingName?: string;
  textDirections?: string[]; // <- Accepts actual directions
}

const HospitalDirectionsGuide: React.FC<HospitalDirectionsGuideProps> = ({
  pathNodes,
  selectedFloor,
  buildingName,
  textDirections
}) => {
  if (!textDirections || textDirections.length === 0 || !buildingName) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h3 className="font-bold text-lg mb-2">Hospital Directions</h3>
        <p className="text-gray-600">Select a department to see indoor navigation instructions.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-h-96 overflow-y-auto">
      <h3 className="font-bold text-lg mb-4">Indoor Directions for {buildingName}</h3>
      <div className="mb-2 text-sm text-gray-500">
        Estimated Floor: {selectedFloor}
      </div>

      <ol className="list-decimal list-inside space-y-1 text-sm text-gray-800">
        {textDirections.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

      {pathNodes?.some(node => node.floor !== selectedFloor) && (
        <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 text-sm">
          <p>Note: Your destination requires changing floors.</p>
        </div>
      )}
    </div>
  );
};

export default HospitalDirectionsGuide;
