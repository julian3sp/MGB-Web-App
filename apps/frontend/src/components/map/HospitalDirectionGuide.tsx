import React, { useState } from 'react';
import { Node } from '../navigation/pathfinding/Graph.ts';
import { ChevronDown, ChevronUp } from 'lucide-react';

const SpeakerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M13 5.828v12.344a1 1 0 0 1-1.707.707l-3.829-3.828H4a1 1 0 0 1-1-1V9.95a1 1 0 0 1 1-1h3.464l3.829-3.828A1 1 0 0 1 13 5.828Z" />
    <path
      d="M17 9c1.5 1.5 1.5 4.5 0 6"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

const MuteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M13 5.828v12.344a1 1 0 0 1-1.707.707l-3.829-3.828H4a1 1 0 0 1-1-1V9.95a1 1 0 0 1 1-1h3.464l3.829-3.828A1 1 0 0 1 13 5.828Z" />
  </svg>
);

interface HospitalDirectionsGuideProps {
  pathNodes?: Node[];
  selectedFloor: number;
  buildingName?: string;
  textDirections: string[];
}

const convertDistance = (distance: string, useFeet: boolean): string => {
  if (!distance.match(/\d/)) return distance;
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
    return distance;
  } else {
    if (unit === 'feet') {
      const meters = value * 0.3048;
      return `${prefix}${meters.toFixed(0)} meters${suffix}`;
    }
    return distance;
  }
};

const HospitalDirectionsGuide: React.FC<HospitalDirectionsGuideProps> = ({
  pathNodes,
  selectedFloor,
  buildingName,
  textDirections,
}) => {
  const [useFeet, setUseFeet] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  // Convert all directions based on the current unit
  const convertedDirections = textDirections.map(dir => convertDistance(dir, useFeet));
  const combinedInstructions = convertedDirections.join('. ');

  const startSpeaking = () => {
    const utterance = new SpeechSynthesisUtterance(combinedInstructions);
    utterance.lang = 'en-US';
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsMuted(false);
    };
    window.speechSynthesis.speak(utterance);
  };

  const handleToggleSpeak = () => {
    if (!isSpeaking && !isMuted) {
      startSpeaking();
      setIsSpeaking(true);
      setIsMuted(false);
    } else if (isSpeaking && !isMuted) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsMuted(true);
    } else if (!isSpeaking && isMuted) {
      startSpeaking();
      setIsSpeaking(true);
      setIsMuted(false);
    }
  };

  // Icon selection
  const Icon = isMuted ? MuteIcon : SpeakerIcon;
  const bgColor = isMuted
    ? 'bg-red-100 text-red-600'
    : isSpeaking
      ? 'bg-blue-100 text-blue-600'
      : 'text-gray-600 hover:text-blue-600';

  if (!pathNodes || pathNodes.length === 0 || !buildingName || textDirections.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md font-[Poppins]">
        <h3 className="font-bold mb-2 text-[16.5px] text-[#003a96]">Hospital Directions</h3>
        <p className="text-gray-600">Select a department to see indoor navigation instructions.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-h-96 overflow-y-auto font-[Poppins]">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-[16.5px] text-[#003a96]">Directions for {buildingName}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleSpeak}
            aria-label="Toggle directions speech"
            className={`w-8 h-8 rounded-full p-1 transition ${bgColor}`}
          >
            <Icon />
          </button>
          <button
            onClick={() => setUseFeet(!useFeet)}
            className="w-10 py-1 text-[#003a96] text-md font-bold cursor-pointer"
          >
            {useFeet ? 'Meters' : 'Feet'}
          </button>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="transition duration-300 ease-in-out transform hover:scale-110 text-[#003a96]"
          >
            {isDropdownOpen ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </button>
        </div>
      </div>
      
      <div className="mb-2 text-sm text-gray-500">
        Current Floor: {selectedFloor}
      </div>

      {isDropdownOpen && (
        <>
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
        </>
      )}
    </div>
  );
};

export default HospitalDirectionsGuide;