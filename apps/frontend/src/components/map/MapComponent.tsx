import React, { useState, useEffect } from 'react';
import MapRenderer from './MapRenderer';
import SearchContainer from './SearchContainer';
import DisplayLottie from '../ui/DisplayLottie';
import { calculateAndDisplayRoute } from './routeCalculator';
import { TextGenerateEffectDemo } from '../GenerateText';

const MapComponent: React.FC = () => {
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<{ name: string; location: google.maps.LatLngLiteral } | null>(null);
  const [showMap, setShowMap] = useState<boolean>(false);
  const [showText, setShowText] = useState(true);

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
    renderer: google.maps.DirectionsRenderer,
    userLoc: google.maps.LatLngLiteral | null
  ) => {
    setMapInstance(map);
    setDirectionsService(service);
    setDirectionsRenderer(renderer);
    setUserLocation(userLoc);
  };

  // Helper function to add marker and draw the route.
  const displayRouteOnMap = (place: { name: string; location: google.maps.LatLngLiteral }) => {
    if (mapInstance && directionsService && directionsRenderer && userLocation) {
      new google.maps.Marker({
        position: place.location,
        map: mapInstance,
        title: place.name,
        icon: { url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' },
      });
      calculateAndDisplayRoute(
        directionsService,
        directionsRenderer,
        mapInstance,
        userLocation,
        place.location,
        setError
      );
    }
  };

  // When the user selects a destination, store it and hide the map.
  const handlePlaceSelected = (place: { name: string; location: google.maps.LatLngLiteral }) => {
    setSelectedPlace(place);
    setShowMap(false);
  };

  // When the "Show Google Map" button is clicked, wait 1 seconds, then show the map and display the route.
  const handleViewMap = () => {
    setTimeout(() => {
      setShowMap(true);
      if (selectedPlace && mapInstance && directionsService && directionsRenderer && userLocation) {
        displayRouteOnMap(selectedPlace);
      }
    }, 1000);
  };

  return (
    <div className="flex h-screen">
      {/* Left Column: Search area */}
      <div className="w-1/3 p-5 border-r border-gray-300 flex flex-col gap-4">
        <h2 className="font-bold">Enter the hospital location</h2>
        <div>
          {mapInstance && userLocation && (
            <SearchContainer onPlaceSelected={handlePlaceSelected} userLocation={userLocation} />
          )}
        </div>
        {/* Only show the button if a destination is selected and the map is hidden */}
        {selectedPlace && !showMap && (
          <div className="w-full">
            <button
              onClick={handleViewMap}
              className="w-full bg-blue-900 text-white px-4 py-1.5 rounded-full cursor-pointer font-bold text-sm"
            >
              Show Google Map
            </button>
          </div>
        )}
        {error && <div className="text-red-500">{error}</div>}
      </div>
      
      {/* Right Column: Map area */}
      <div className="w-2/3 relative">
        {/* MapRenderer is always rendered but its container is hidden until showMap is true */}
        <div className={`h-full ${showMap ? 'visible' : 'invisible'}`}>
          <MapRenderer onMapReady={handleMapReady} />
        </div>
        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-5 ${showMap ? 'invisible' : 'visible'}`}>
          <div className="z-10 -mt-70 text-black">
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
