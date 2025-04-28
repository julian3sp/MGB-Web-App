import React from "react";
import { RotateCcw, RotateCw } from "lucide-react";

interface RotateControlProps {
  rotateMap: (direction: "left" | "right") => void;
}

const RotateControl: React.FC<RotateControlProps> = ({ rotateMap }) => {
  return (
    <div className="flex items-center bg-gray-100 rounded-full overflow-hidden border border-gray-300">
      <button
        onClick={() => {
          console.log("Rotate left button clicked");
          rotateMap("left");
        }}
        className="p-2 bg-white flex items-center justify-center hover:bg-gray-200 rounded-l-full"
        aria-label="Rotate Left"
        type="button"
      >
        <RotateCcw className="h-5 w-5 text-gray-600" />
      </button>
      <button
        onClick={() => {
          console.log("Rotate right button clicked");
          rotateMap("right");
        }}
        className="p-2 bg-white flex items-center justify-center hover:bg-gray-200 rounded-r-full"
        aria-label="Rotate Right"
        type="button"
      >
        <RotateCw className="h-5 w-5 text-gray-600" />
      </button>
    </div>
  );
};

export default RotateControl;