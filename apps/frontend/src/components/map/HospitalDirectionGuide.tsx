import React from 'react';
import { Node } from '../navigation/pathfinding/Graph.ts';


interface HospitalDirectionsGuideProps {
 pathNodes?: Node[];
 selectedFloor: number;
 buildingName?: string;
 textDirections: string[];
}


const HospitalDirectionsGuide: React.FC<HospitalDirectionsGuideProps> = ({
 pathNodes,
 selectedFloor,
 buildingName,
 textDirections
}) => {
 if (!pathNodes || pathNodes.length === 0 || !buildingName || textDirections.length === 0) {
   return (
     <div className="p-4 bg-white rounded-lg font-[Poppins] shadow-md">
       <h3 className="font-bold text-[16.5px] mb-2 text-[#003a96]">Hospital Directions</h3>
       <p className="text-gray-600">Select a department to see indoor navigation instructions.</p>
     </div>
   );
 }


 return (
   <div className="p-4 bg-white rounded-lg font-[Poppins] shadow-md max-h-96 overflow-y-auto">
     <h3 className="font-bold text-[16.5px] mb-4 text-[#003a96]">Indoor Directions for {buildingName}</h3>
     <div className="mb-2 text-sm text-gray-500">
       Current Floor: {selectedFloor}
     </div>
    
     <ol className="space-y-2 list-decimal pl-5">
       {textDirections.map((direction, index) => (
         <li key={index} className="font-[Poppins] text-gray-700">
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