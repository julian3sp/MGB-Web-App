import React, { useState, useEffect } from 'react';
import MapRenderer from './MapRenderer';
import SearchContainer from './SearchContainer';
import DisplayLottie from '../ui/DisplayLottie';
import { calculateAndDisplayRoute } from './routeCalculator';
import { TextGenerateEffectDemo } from '../GenerateText';
import DepartmentDropdown from './DepartmentDropdown';
import DestinationDropdown from './DestinationDropdown';
import hospitalMap from '../../../assets/map.jpg';
import DrawingPath from "../navigation/pathfinding/drawingPath.tsx";
import icon from '../../../assets/icon.png';

interface TravelTimes {
  driving: string | null;
  transit: string | null;
  walking: string | null;
}

const MapComponent: React.FC = () => {
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [startLocation, setStartLocation] = useState<{ name: string; location: google.maps.LatLngLiteral } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<{ name: string; location: google.maps.LatLngLiteral } | null>(null);
  const [showMap, setShowMap] = useState<boolean>(false);
  const [showText, setShowText] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState<{ name: string; floor: string[] } | null>(null);
  const [showHospitalMap, setShowHospitalMap] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTransport, setSelectedTransport] = useState<'driving' | 'walking' | 'transit'>('driving');
  const [travelTimes, setTravelTimes] = useState<TravelTimes>({
    driving: null,
    transit: null,
    walking: null
  });

  const formatDuration = (duration: number): string => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    
    if (hours > 0) {
      if (hours >= 13) return `${hours} hr ...`;
      return `${hours}h ${minutes}m`;
    }
    return `${minutes} min`;
  };

  const calculateTravelTimes = async () => {
    if (!startLocation || !selectedPlace) return;

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
        walking: null
      };

      results.forEach((result, index) => {
        if (result.rows[0]?.elements[0]?.duration) {
          const duration = result.rows[0].elements[0].duration.value;
          const mode = modes[index].toLowerCase() as keyof TravelTimes;
          newTravelTimes[mode] = formatDuration(duration);
        }
      });

      setTravelTimes(newTravelTimes);
    } catch (error) {
      console.error('Error calculating travel times:', error);
    }
  };

  // Calculate travel times when start or end location changes
  useEffect(() => {
    if (startLocation && selectedPlace) {
      calculateTravelTimes();
    } else {
      setTravelTimes({
        driving: null,
        transit: null,
        walking: null
      });
    }
  }, [startLocation, selectedPlace]);

  // Auto-loop the text animation every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowText(false);
      setTimeout(() => setShowText(true), 100);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Called when MapRenderer is ready.
  const handleMapReady = (
    map: google.maps.Map,
    service: google.maps.DirectionsService,
    renderer: google.maps.DirectionsRenderer
  ) => {
    console.log('Map is ready with components');
    setMapInstance(map);
    setDirectionsService(service);
    setDirectionsRenderer(renderer);
  };

  // When the user selects a starting location
  const handleStartLocationSelected = (place: { name: string; location: google.maps.LatLngLiteral }) => {
    console.log('Start location selected:', place);
    setStartLocation(place);
    
    if (mapInstance) {
      // Clear any existing markers and routes
      if (directionsRenderer) {
        directionsRenderer.setMap(null);
        directionsRenderer.setMap(mapInstance);
      }
      
      // Center map on selected location
      mapInstance.setCenter(place.location);
      mapInstance.setZoom(15);
      
      // Add marker for start location
      new google.maps.Marker({
        position: place.location,
        map: mapInstance,
        title: place.name,
        icon: { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' },
      });

      // If we already have a destination, update the route
      if (selectedPlace) {
        displayRouteOnMap(place, selectedPlace);
      }
    }
  };

  // When the user selects a destination from dropdown
  const handleDestinationSelected = (destination: { name: string; location: { lat: number; lng: number } }) => {
    console.log('Destination selected:', destination);
    const newDestination = {
      name: destination.name,
      location: destination.location
    };
    setSelectedPlace(newDestination);

    // Only proceed if we have both locations and map is ready
    if (startLocation && mapInstance && directionsService && directionsRenderer) {
      setShowMap(true);
      setShowHospitalMap(false);
      displayRouteOnMap(startLocation, newDestination);
    }
  };

  const handleDepartmentSelected = (department: { name: string; floor: string[] }) => {
    setSelectedDepartment(department);
    setShowHospitalMap(false);
  };

  // When the "Show Google Map" button is clicked
  const handleViewMap = () => {
    if (!startLocation || !selectedPlace || !mapInstance || !directionsService || !directionsRenderer) return;
    setShowMap(true);
    setShowHospitalMap(false);
    displayRouteOnMap(startLocation, selectedPlace);
  };

  const handleViewHospitalMap = () => {
    setShowHospitalMap(true);
    setShowMap(false);
  };

  // Helper function to add marker and draw the route.
  const displayRouteOnMap = (start: { name: string; location: google.maps.LatLngLiteral }, end: { name: string; location: google.maps.LatLngLiteral }) => {
    console.log('Attempting to display route:', { start, end });
    
    if (!mapInstance || !directionsService || !directionsRenderer) {
      console.warn('Map components not ready');
      return;
    }

    // Clear existing routes and markers
    directionsRenderer.setMap(null);
    directionsRenderer.setMap(mapInstance);

    const request: google.maps.DirectionsRequest = {
      origin: start.location,
      destination: end.location,
      travelMode: google.maps.TravelMode[selectedTransport.toUpperCase() as keyof typeof google.maps.TravelMode]
    };

    console.log('Calculating route with request:', request);

    directionsService.route(request, (result, status) => {
      console.log('Route calculation result:', { status, result });
      
      if (status === google.maps.DirectionsStatus.OK && result) {
        // Clear any existing markers
        mapInstance.setOptions({ draggableCursor: 'default' });

        // Add markers first
        new google.maps.Marker({
          position: start.location,
          map: mapInstance,
          title: start.name,
          icon: { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' },
        });

        new google.maps.Marker({
          position: end.location,
          map: mapInstance,
          title: end.name,
          icon: { url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' },
        });

        // Then set the directions
        directionsRenderer.setDirections(result);

        // Fit bounds to show the entire route
        if (result.routes[0] && result.routes[0].bounds) {
          mapInstance.fitBounds(result.routes[0].bounds);
        }
      } else {
        console.error('Directions request failed:', status);
        setError('Could not calculate route');
      }
    });
  };

  // Update route when transport mode changes or when either location changes
  useEffect(() => {
    if (startLocation && selectedPlace && mapInstance && directionsService && directionsRenderer) {
      displayRouteOnMap(startLocation, selectedPlace);
    }
  }, [selectedTransport, startLocation, selectedPlace]);

  return (
      <div className="flex h-screen">
          {/* Left Column: Search area */}
          <div className="w-1/4 p-5 border-r border-gray-300 flex flex-col gap-4">
              <h2 className="font-bold text-center">Enter your location and destination</h2>

              {/* Google Map Section */}
              <div className="flex flex-col gap-0 items-center">
                {startLocation && selectedPlace && (
                  <div className="flex items-center justify-center gap-4 mb-4 w-[90%]">
                    <button
                      onClick={() => setSelectedTransport('driving')}
                      className="flex flex-col items-center px-3 py-1.5"
                    >
                      <span className={`material-icons text-sm rounded-full p-1 ${
                        selectedTransport === 'driving'
                          ? 'bg-[#E9F4FF] text-[#1A73E8]'
                          : ''
                      }`}>directions_car</span>
                      <span className="text-[8px] mt-0.5 max-w-[40px] truncate">
                        {travelTimes.driving || '--'}
                      </span>
                    </button>
                    <button
                      onClick={() => setSelectedTransport('transit')}
                      className="flex flex-col items-center px-3 py-1.5"
                    >
                      <span className={`material-icons text-sm rounded-full p-1 ${
                        selectedTransport === 'transit'
                          ? 'bg-[#E9F4FF] text-[#1A73E8]'
                          : ''
                      }`}>directions_transit</span>
                      <span className="text-[8px] mt-0.5 max-w-[40px] truncate">
                        {travelTimes.transit || '--'}
                      </span>
                    </button>
                    <button
                      onClick={() => setSelectedTransport('walking')}
                      className="flex flex-col items-center px-3 py-1.5"
                    >
                      <span className={`material-icons text-sm rounded-full p-1 ${
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
                              />
                          )}
                      </div>
                      <div className="mt-5">
                          <DestinationDropdown onDestinationSelected={handleDestinationSelected} />
                      </div>
                  </div>
                </div>
                {startLocation && selectedPlace && !showMap && (
                    <button
                        onClick={handleViewMap}
                        className="w-[90%] bg-[#003a96] text-white px-4 py-1.5 rounded-full cursor-pointer font-bold text-sm
                        transition-all duration-300 ease-in-out
                        hover:bg-[#002b70] hover:scale-105 hover:shadow-lg
                        active:scale-95 mt-4"
                    >
                        Show Google Map
                    </button>
                )}
              </div>

              {/* Hospital Map Section */}
              <div className="flex flex-col mt-10">
                <h2 className="text-sm font-semibold mb-2">Select a department</h2>
                  <DepartmentDropdown onDepartmentSelected={handleDepartmentSelected} />
                  {selectedDepartment && !showHospitalMap && (
                    <button
                      onClick={handleViewHospitalMap}
                      className="w-full bg-[#003a96] text-white px-4 py-1.5 rounded-full cursor-pointer font-bold text-sm
                        transition-all duration-300 ease-in-out
                        hover:bg-[#002b70] hover:scale-105 hover:shadow-lg
                        active:scale-95 mt-4"
                    >
                      Show Inside Hospital Map
                    </button>
                  )}
                  {showHospitalMap && (
                    <div className="mt-4 bg-white rounded-lg shadow-lg p-4">
                      <div className="flex flex-col gap-2">
                        <div className="text-md font-medium font-bold mb-2">Map Legend</div>
                        <div className="flex items-center gap-2">
                          <img
                            src="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                            alt="Your Location"
                            className="w-6 h-6"
                          />
                          <span className="text-sm text-gray-600 font-bold">Your Location</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <img
                            src="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                            alt="Destination"
                            className="w-6 h-6"
                          />
                          <span className="text-sm text-gray-600 font-bold">Destination</span>
                        </div>
                      </div>
                    </div>
                  )}
              </div>

              {error && <div className="text-red-500">{error}</div>}
          </div>

          {/* Right Column: Map area */}
          <div className="w-3/4 relative">
              {/* Google Map */}
              <div
                  className={`h-full transition-all duration-500 ease-in-out ${showMap ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
              >
                  <MapRenderer onMapReady={handleMapReady} />
              </div>
              {/* Hospital Map */}
              <div
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${showHospitalMap ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
              >
                  <DrawingPath
                      key={selectedDepartment?.name}
                      source="south entrance"
                      destination={selectedDepartment?.name ?? "south entrance"}/>
              </div>
              {/* Loading Screen */}
              <div
                  className={`absolute inset-0 flex items-center justify-center bg-white transition-all duration-500 ease-in-out ${isLoading ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
              >
                  <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 border-4 border-[#003a96] border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-[#003a96] font-medium">Loading map...</p>
                  </div>
              </div>
              {/* Animation and Text */}
              <div
                  className={`absolute inset-0 flex flex-col items-center justify-center gap-5 transition-all duration-500 ease-in-out ${showMap || showHospitalMap || isLoading ? 'opacity-0 invisible' : 'opacity-100 visible'}`}
              >
                  <div className="z-10 -mt-80 text-black">
                      {showText && <TextGenerateEffectDemo />}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                      <DisplayLottie />
                  </div>
              </div>
          </div>
      </div>
  );
};

export default MapComponent;