import React from 'react';

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

const speakSteps = (steps: google.maps.DirectionsStep[]) => {
  if (!window.speechSynthesis) return;

  const combinedInstructions = steps.map(step => {
    // Strip HTML tags from instructions
    const parser = new DOMParser();
    const html = parser.parseFromString(step.instructions, 'text/html');
    return html.body.textContent + ` (${step.distance?.text})`;
  }).join('. ');

  const utterance = new SpeechSynthesisUtterance(combinedInstructions);
  utterance.lang = 'en-US';
  window.speechSynthesis.speak(utterance);
};

const DirectionsGuide: React.FC<DirectionsGuideProps> = ({ directions }) => {
  if (!directions) return null;

  const steps = directions.routes[0]?.legs[0]?.steps || [];

  return (
    <div className="mt-4 p-4 bg-white rounded shadow border border-gray-200 max-h-60 overflow-y-auto text-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">Step-by-step directions</h3>
        <button
          onClick={() => speakSteps(steps)}
          aria-label="Play directions"
          className="hover:text-blue-600 transition"
        >
          🔊
        </button>
      </div>
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
    </div>
  );
};

export default DirectionsGuide;
