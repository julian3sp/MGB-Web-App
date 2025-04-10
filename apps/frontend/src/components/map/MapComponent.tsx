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
    setMapInstance(map);
    setDirectionsService(service);
    setDirectionsRenderer(renderer);
  };

  // Helper function to add marker and draw the route.
  const displayRouteOnMap = (start: { name: string; location: google.maps.LatLngLiteral }, end: { name: string; location: google.maps.LatLngLiteral }) => {
    if (mapInstance && directionsService && directionsRenderer) {
      // Add start marker
      new google.maps.Marker({
        position: start.location,
        map: mapInstance,
        title: start.name,
        icon: { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' },
      });
      // Add end marker
      new google.maps.Marker({
        position: end.location,
        map: mapInstance,
        title: end.name,
        icon: { url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' },
      });
      calculateAndDisplayRoute(
        directionsService,
        directionsRenderer,
        mapInstance,
        start.location,
        end.location,
        setError
      );
    }
  };

  // When the user selects a starting location
  const handleStartLocationSelected = (place: { name: string; location: google.maps.LatLngLiteral }) => {
    setStartLocation(place);
    // If we already have a destination and map is ready, show the map immediately
    if (selectedPlace && mapInstance && directionsService && directionsRenderer) {
      setShowMap(true);
      setShowHospitalMap(false);
      displayRouteOnMap(place, selectedPlace);
    }
  };

  // When the user selects a destination from dropdown
  const handleDestinationSelected = (destination: { name: string; location: { lat: number; lng: number } }) => {
    setSelectedPlace({
      name: destination.name,
      location: destination.location
    });
    // If we already have a start location and map is ready, show the map immediately
    if (startLocation && mapInstance && directionsService && directionsRenderer) {
      setShowMap(true);
      setShowHospitalMap(false);
      displayRouteOnMap(startLocation, {
        name: destination.name,
        location: destination.location
      });
    }
  };

  const handleDepartmentSelected = (department: { name: string; floor: string[] }) => {
    setSelectedDepartment(department);
    setShowHospitalMap(false);
  };

  // When the "Show Google Map" button is clicked
  const handleViewMap = () => {
    if (!startLocation || !selectedPlace) return;
    setShowMap(true);
    setShowHospitalMap(false);
    displayRouteOnMap(startLocation, selectedPlace);
  };

  const handleViewHospitalMap = () => {
    setShowHospitalMap(true);
    setShowMap(false);
  };

  return (
      <div className="flex h-screen">
          {/* Left Column: Search area */}
          <div className="w-1/4 p-5 border-r border-gray-300 flex flex-col gap-4">
              <h2 className="font-bold text-center">Enter your location and destination</h2>

              {/* Google Map Section */}
              <div className="flex flex-col gap-4">
                  <div>
                      <h3 className="text-sm font-semibold mb-2">Starting Location</h3>
                      {mapInstance && (
                          <SearchContainer
                              onPlaceSelected={handleStartLocationSelected}
                              placeholder="Enter your starting location"
                          />
                      )}
                  </div>
                  <div>
                      <h3 className="text-sm font-semibold mb-2">Destination</h3>
                      <DestinationDropdown onDestinationSelected={handleDestinationSelected} />
                  </div>
                  {startLocation && selectedPlace && !showMap && (
                      <button
                          onClick={handleViewMap}
                          className="w-full bg-[#003a96] text-white px-4 py-1.5 rounded-full cursor-pointer font-bold text-sm
                transition-all duration-300 ease-in-out
                hover:bg-[#002b70] hover:scale-105 hover:shadow-lg
                active:scale-95"
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
