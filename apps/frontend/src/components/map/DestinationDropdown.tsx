import React, { useState } from 'react';

interface Destination {
  name: string;
  location: { lat: number; lng: number };
}

interface DestinationDropdownProps {
  onDestinationSelected: (destination: { name: string; location: { lat: number; lng: number } }) => void;
}

const destinations = [
  {
    name: "Chestnut Hill",
    location: { lat: 42.3314, lng: -71.1687 }
  },
  {
    name: "20 Patriot Place",
    location: { lat: 42.0909, lng: -71.2644 }
  },
  {
    name: "22 Patriot Place",
    location: { lat: 42.0905, lng: -71.2642 }
  }
];

const DestinationDropdown: React.FC<DestinationDropdownProps> = ({ onDestinationSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  const handleSelect = (destination: Destination) => {
    setSelectedDestination(destination);
    setIsOpen(false);
    onDestinationSelected(destination);
  };

  return (
    <div className="flex flex-col items-start w-full">
      <div className="relative w-[90%] ml-auto bg-white rounded-3xl shadow-lg mt-0 transition-all duration-200">
        <button
          type="button"
          className="relative w-full cursor-default rounded-3xl bg-white py-2.5 px-4 text-left text-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="flex items-center">
            <span className="block truncate">
              {selectedDestination ? selectedDestination.name : 'Choose destination'}
            </span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </span>
        </button>

        {isOpen && (
          <ul
            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-3xl bg-white py-1 text-base shadow-xl focus:outline-none sm:text-sm
              [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-option-3"
          >
            {destinations.map((destination) => (
              <li
                key={destination.name}
                className="relative cursor-default select-none py-2 pl-4 pr-9 text-gray-500 hover:bg-blue-50"
                id={`listbox-option-${destination.name}`}
                role="option"
                onClick={() => handleSelect(destination)}
              >
                <div className="flex items-center">
                  <span className="block truncate font-normal">
                    {destination.name}
                  </span>
                </div>
                {selectedDestination?.name === destination.name && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DestinationDropdown; 