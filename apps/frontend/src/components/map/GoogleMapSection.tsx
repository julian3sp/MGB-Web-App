import React from 'react';
import SearchContainer from './SearchContainer';
import DestinationDropdown from './DestinationDropdown';
import icon from '../../../assets/icon.png';

export interface TravelTimes {
  driving: string | null;
  transit: string | null;
  walking: string | null;
}

// Formats a duration (in seconds) into an easily readable string.
export const formatDuration = (duration: number): string => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);

  if (hours > 0) {
    if (hours >= 13) return `${hours} hr ...`;
    return `${hours}h ${minutes}m`;
  }
  return `${minutes} min`;
};

// Calculates travel times using Google's DistanceMatrixService and updates state.
export const calculateTravelTimes = async (
  startLocation: { name: string; location: google.maps.LatLngLiteral },
  selectedPlace: { name: string; location: google.maps.LatLngLiteral },
  setTravelTimes: React.Dispatch<React.SetStateAction<TravelTimes>>
) => {
  const distanceMatrixService = new google.maps.DistanceMatrixService();
  const modes: ('DRIVING' | 'TRANSIT' | 'WALKING')[] = ['DRIVING', 'TRANSIT', 'WALKING'];

  try {
    const results = await Promise.all(
      modes.map(mode =>
        distanceMatrixService.getDistanceMatrix({
          origins: [startLocation.location],
          destinations: [selectedPlace.location],
          travelMode: google.maps.TravelMode[mode],
        })
      )
    );

    const newTravelTimes: TravelTimes = {
      driving: null,
      transit: null,
      walking: null,
    };

    results.forEach((result, index) => {
      if (result.rows[0]?.elements[0]?.duration) {
        const duration = result.rows[0].elements[0].duration.value;
        const modeKey = modes[index].toLowerCase() as keyof TravelTimes;
        newTravelTimes[modeKey] = formatDuration(duration);
      }
    });

    setTravelTimes(newTravelTimes);
  } catch (error) {
    console.error('Error calculating travel times:', error);
  }
};

interface GoogleMapSectionProps {
  startLocation: { name: string; location: google.maps.LatLngLiteral } | null;
  selectedPlace: { name: string; location: google.maps.LatLngLiteral } | null;
  selectedTransport: 'driving' | 'walking' | 'transit';
  travelTimes: TravelTimes;
  mapInstance: google.maps.Map | null;
  handleStartLocationSelected: (place: { name: string; location: google.maps.LatLngLiteral }) => void;
  handleDestinationSelected: (destination: { name: string; location: { lat: number; lng: number } }) => void;
  handleViewMap: () => void;
  onTransportChange: (mode: 'driving' | 'walking' | 'transit') => void;
  handleGetCurrentLocation: () => void;
}

export const GoogleMapSection: React.FC<GoogleMapSectionProps> = ({
  startLocation,
  selectedPlace,
  selectedTransport,
  travelTimes,
  mapInstance,
  handleStartLocationSelected,
  handleDestinationSelected,
  handleViewMap,
  onTransportChange,
  handleGetCurrentLocation
}) => {
  return (
    <div className="flex flex-col gap-0 items-center">
      {startLocation && selectedPlace && (
        <div className="flex items-center justify-center gap-4 mb-4 w-[90%]">
          <button
            onClick={() => onTransportChange('driving')}
            className="flex flex-col items-center px-3 py-1.5"
          >
            <span className={`material-icons text-sm rounded-full p-1 transition-colors duration-200 ${
              selectedTransport === 'driving'
                ? 'bg-[#E9F4FF] text-[#1A73E8]'
                : ''
            }`}>directions_car</span>
            <span className="text-[8px] mt-0.5 max-w-[40px] truncate">
              {travelTimes.driving || '--'}
            </span>
          </button>
          <button
            onClick={() => onTransportChange('transit')}
            className="flex flex-col items-center px-3 py-1.5"
          >
            <span className={`material-icons text-sm rounded-full p-1 transition-colors duration-200 ${
              selectedTransport === 'transit'
                ? 'bg-[#E9F4FF] text-[#1A73E8]'
                : ''
            }`}>directions_transit</span>
            <span className="text-[8px] mt-0.5 max-w-[40px] truncate">
              {travelTimes.transit || '--'}
            </span>
          </button>
          <button
            onClick={() => onTransportChange('walking')}
            className="flex flex-col items-center px-3 py-1.5"
          >
            <span className={`material-icons text-sm rounded-full p-1 transition-colors duration-200 ${
              selectedTransport === 'walking'
                ? 'bg-[#E9F4FF] text-[#1A73E8]'
                : ''
            }`}>directions_walk</span>
            <span className="text-[8px] mt-0.5 max-w-[40px] truncate">
              {travelTimes.walking || '--'}
            </span>
          </button>
        </div>
      )}
      <div className="flex items-start relative w-[90%]">
        <div className="flex flex-col items-center absolute -left-3">
          <div className="flex items-center h-[40px]">
            <div className="w-3 h-3 rounded-full bg-white border-2 border-gray-600"></div>
          </div>
          <div className="w-0.5 h-5 bg-gray-300" style={{ background: 'repeating-linear-gradient(to bottom, #9CA3AF 0, #9CA3AF 2px, transparent 2px, transparent 6px)' }}></div>
          <div className="flex items-center h-[40px]">
            <div>
              <img src={icon} alt="icon" className="w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div>
            {mapInstance && (
              <SearchContainer
                onPlaceSelected={handleStartLocationSelected}
                placeholder="Choose starting point"
                onGetCurrentLocation={handleGetCurrentLocation}
              />
            )}
          </div>
          <div className="mt-5">
            <DestinationDropdown onDestinationSelected={handleDestinationSelected} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleMapSection;
