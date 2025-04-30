import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface DirectionsGuideProps {
  directions: google.maps.DirectionsResult | null;
}

const getDirectionIcon = (maneuver?: string) => {
  switch (maneuver) {
    case 'turn-left': return '←';
    case 'turn-right': return '→';
    case 'merge': return '↗';
    case 'straight':
    case 'head': return '↑';
    case 'ramp-left': return '⇦';
    case 'ramp-right': return '⇨';
    case 'fork-left': return '⤴';
    case 'fork-right': return '⤵';
    case 'roundabout-left':
    case 'roundabout-right': return '⟳';
    default: return '↑';
  }
};

const SpeakerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    {/* Speaker base */}
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
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13 5.828v12.344a1 1 0 0 1-1.707.707l-3.829-3.828H4a1 1 0 0 1-1-1V9.95a1 1 0 0 1 1-1h3.464l3.829-3.828A1 1 0 0 1 13 5.828Z" />
  </svg>
);

const DirectionsGuide: React.FC<DirectionsGuideProps> = ({ directions }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!directions) return null;
  const steps = directions.routes[0]?.legs[0]?.steps || [];

  const combinedInstructions = steps.map(step => {
    const parser = new DOMParser();
    const html = parser.parseFromString(step.instructions, 'text/html');
    return html.body.textContent + ` (${step.distance?.text})`;
  }).join('. ');

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
      // Start speaking from fresh
      startSpeaking();
      setIsSpeaking(true);
      setIsMuted(false);
    } else if (isSpeaking && !isMuted) {
      // Stop speech and mute
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsMuted(true);
    } else if (!isSpeaking && isMuted) {
      // Unmute and speak again
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

  return (
    <div className="mt-4 mb-4 p-4 w-[90%] mx-auto bg-white rounded shadow-lg max-h-60 overflow-y-auto text-sm">
      <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Step-by-step directions</h3>
            <button
              onClick={handleToggleSpeak}
              aria-label="Toggle directions speech"
              className={`w-8 h-8 rounded-full p-1 transition ${bgColor}`}
            >
              <Icon />
            </button>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}  
              className="transition duration-300 ease-in-out transform hover:scale-110"
            >
              {isDropdownOpen ? <ChevronDown /> : <ChevronUp />}
            </button>
          </div>
      {isDropdownOpen && (
        <div className="flex flex-col divide-y divide-gray-200">
          {steps.map((step, index) => (
            <div key={index} className="py-3 flex items-start gap-3">
              <span className="text-xl mt-0.5">{getDirectionIcon(step.maneuver)}</span>
              <div className="flex flex-col">
                <div dangerouslySetInnerHTML={{ __html: step.instructions }} className="leading-relaxed" />
                <span className="text-xs text-gray-500 mt-1">
                  {step.distance?.text} – {step.duration?.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DirectionsGuide;
