import React from 'react';

interface DirectionsGuideProps {
  directions: google.maps.DirectionsResult | null;
}

const DirectionsGuide: React.FC<DirectionsGuideProps> = ({ directions }) => {
  if (!directions) return null;

  const steps = directions.routes[0]?.legs[0]?.steps || [];

  return (
    <div className="mt-4 p-4 bg-white rounded shadow border border-gray-200 max-h-60 overflow-y-auto text-sm">
      <h3 className="font-semibold mb-2">Step-by-step directions</h3>
      <ol className="list-decimal list-inside space-y-2">
        {steps.map((step, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: step.instructions }} />
        ))}
      </ol>
    </div>
  );
};

export default DirectionsGuide;
