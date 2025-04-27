import React from "react";
import { RotateCcw, RotateCw } from "lucide-react";

interface RotateControlProps {
  rotateMap: (direction: "left" | "right") => void;
}

const RotateControl: React.FC<RotateControlProps> = ({ rotateMap }) => {
//   const adjustMap = (mode: "tilt" | "rotate", amount: number) => {
//     if (!map) return;

//     switch (mode) {
//       case "tilt":
//         const currentTilt = map.getTilt() ?? 0;
//         console.log("Current tilt: ", currentTilt, "new tilt: ", currentTilt + amount);
//         map.setTilt(currentTilt + amount);
//         break;
//       case "rotate":
//         const currentHeading = map.getHeading() ?? 0;
//         console.log("Current heading: ", currentHeading, "new heading: ", currentHeading + amount);
//         map.setHeading(currentHeading + amount);
//         break;
//       default:
//         break;
//     }
//   };

  return (
    <div className="flex items-center bg-gray-100 rounded-full overflow-hidden border border-gray-300">
      <button
        onClick={() => rotateMap("left")}
        className="p-2 bg-white flex items-center justify-center hover:bg-gray-200 rounded-l-full"
        aria-label="Rotate Left"
      >
        <RotateCcw className="h-5 w-5 text-gray-600" />
      </button>
      <button
        onClick={() => rotateMap("right")}
        className="p-2 bg-white flex items-center justify-center hover:bg-gray-200 rounded-r-full"
        aria-label="Rotate Right"
      >
        <RotateCw className="h-5 w-5 text-gray-600" />
      </button>
    </div>
  );
  
};

export default RotateControl;