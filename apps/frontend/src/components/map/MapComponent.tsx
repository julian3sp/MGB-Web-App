import React, { useState } from 'react';
import MapRenderer from './MapRenderer';
import SearchContainer from './SearchContainer';
import { calculateAndDisplayRoute } from './routeCalculator';

const MapComponent: React.FC = () => {
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const handlePlaceSelected = (place: { name: string; location: google.maps.LatLngLiteral }) => {
    if (mapInstance && directionsService && directionsRenderer && userLocation) {
      // Add a marker for the selected destination
      new google.maps.Marker({
        position: place.location,
        map: mapInstance,
        title: place.name,
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        },
      });
      // Calculate and display the route
      calculateAndDisplayRoute(
        directionsService,
        directionsRenderer,
        mapInstance,
        userLocation,
        place.location,
        setError
      );
    } else {
      console.warn("Map or services not ready yet");
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {/* The map fills the parent */}
      <MapRenderer onMapReady={handleMapReady} />

      {/* Once the map is ready and user location is known, show the SearchContainer */}
      {mapInstance && userLocation && (
        <SearchContainer onPlaceSelected={handlePlaceSelected} userLocation={userLocation} />
      )}

      {error && <div className="text-red-500 p-4">{error}</div>}
    </div>
  );
};

export default MapComponent;
