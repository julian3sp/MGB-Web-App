import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface MapRendererProps {
  onMapReady: (
    map: google.maps.Map,
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer,
    userLocation: google.maps.LatLngLiteral | null
  ) => void;
}

const MapRenderer: React.FC<MapRendererProps> = ({ onMapReady }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return <div className="text-red-500 p-4">Error: Google Maps API key is missing</div>;
  }

  useEffect(() => {
    // Prevent multiple initializations if map is already created
    if (map) return;

    const loader = new Loader({
      apiKey: apiKey,
      version: 'weekly',
      libraries: ['places'],
    });

    loader
      .load()
      .then(() => {
        if (mapRef.current) {
          const newMap = new google.maps.Map(mapRef.current, {
            center: { lat: 42.3601, lng: -71.0589 },
            zoom: 12,
            fullscreenControl: true,
            mapTypeControl: false,
            streetViewControl: true,
            zoomControl: true,
          });
          setMap(newMap);

          const directionsService = new google.maps.DirectionsService();
          const directionsRenderer = new google.maps.DirectionsRenderer({
            map: newMap,
            suppressMarkers: false,
          });

          let userLocation: google.maps.LatLngLiteral | null = null;
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                userLocation = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                };
                newMap.setZoom(16);
                newMap.setCenter(userLocation);
                new google.maps.Marker({
                  position: userLocation,
                  map: newMap,
                  title: 'Your Location',
                  icon: {
                    url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                  },
                });
                onMapReady(newMap, directionsService, directionsRenderer, userLocation);
              },
              (error) => {
                console.log('Error getting user location:', error);
                onMapReady(newMap, directionsService, directionsRenderer, null);
              }
            );
          } else {
            onMapReady(newMap, directionsService, directionsRenderer, null);
          }
        }
      })
      .catch((error) => {
        console.error('Error loading Google Maps:', error);
      });
  }, [onMapReady, apiKey, map]);

  return (
    <div ref={mapRef} style={{ width: '100%', height: '100vh', position: 'relative' }} />
  );
};

export default MapRenderer;