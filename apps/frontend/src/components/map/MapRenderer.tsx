import React, { useEffect, useRef, useState, MutableRefObject } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { createMGBOverlays, MGBOverlays } from './overlays/MGBOverlay';
import { createPatriot20Overlays } from './overlays/20PatriotOverlay';
import { createPatriot22Overlays, updatePatriotPlace22, Patriot22Overlays } from './overlays/22PatriotOverlay';

interface MapRendererProps {
  onMapReady: (
    map: google.maps.Map,
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer
  ) => void;
  // Allow selectedDestination to be an object or null.
  selectedDestination?: { name: string; location: { lat: number; lng: number } } | null;
  onZoomChange?: (zoom: number) => void;

  selectedFloor?: 3 | 4; // For 22 Patriot Place
}

const MapRenderer: React.FC<MapRendererProps> = ({ onMapReady, selectedDestination, onZoomChange, selectedFloor }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  // For overlays (only for MGB in this example)
  const [parkingOverlay, setParkingOverlay] = useState<google.maps.GroundOverlay | null>(null);
  const [floorOverlay, setFloorOverlay] = useState<google.maps.GroundOverlay | null>(null);
  const [patriot22Overlays, setPatriot22Overlays] = useState<Patriot22Overlays | null>(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Refs to track current opacity (for fade animation)
  const parkingOpacityRef = useRef(1);
  const floorOpacityRef = useRef(0);

  if (!apiKey) {
    return <div className="text-red-500 p-4">Error: Google Maps API key is missing</div>;
  }

  // Initialize the map (only once)
  useEffect(() => {
    if (map) return;

    const loader = new Loader({
      apiKey,
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
            suppressMarkers: true,
            preserveViewport: false,
            polylineOptions: {
              strokeColor: '#1A73E8',
              strokeWeight: 4,
            },
          });
          directionsRenderer.setMap(newMap);
          onMapReady(newMap, directionsService, directionsRenderer);
        }
      })
      .catch((error) => console.error('Error loading Google Maps:', error));
  }, [onMapReady, apiKey, map]);

  // Effect to create overlays based on the selected destination.
  useEffect(() => {
    if (!map) return;

    // Clear previous overlays, if any.
    if (parkingOverlay) {
      parkingOverlay.setMap(null);
      setParkingOverlay(null);
    }
    if (floorOverlay) {
      floorOverlay.setMap(null);
      setFloorOverlay(null);
    }
    
    if (patriot22Overlays){
      // remove previoyus overlays
      patriot22Overlays.floor3Overlay.setMap(null);
      patriot22Overlays.floor4Overlay.setMap(null);
      setPatriot22Overlays(null);
    }

    if (selectedDestination) {
      if (selectedDestination.name === "MGB (Chestnut Hill)") {
        const overlays: MGBOverlays = createMGBOverlays(map);
        setParkingOverlay(overlays.parkingOverlay);
        setFloorOverlay(overlays.floorOverlay);
      } else if (selectedDestination.name === "20 Patriot Place") {
        createPatriot20Overlays(map);
        // Implement when available.
      } else if (selectedDestination.name === "22 Patriot Place") {
        const overlays = createPatriot22Overlays(map);
        setPatriot22Overlays(overlays);
      }
    }
  }, [selectedDestination, map]);

  // when the selected floor for 22 Patriot Place changes, update its overlay
  useEffect(() => {
    if (!map || !patriot22Overlays) return;
    updatePatriotPlace22(patriot22Overlays, selectedFloor || 3);
  }, [selectedFloor, map, patriot22Overlays]);

  // Listen to zoom events and animate opacity changes for MGB overlays.
  useEffect(() => {
    if (!map || !parkingOverlay || !floorOverlay) return;

    const animateOverlayOpacity = (
      overlay: google.maps.GroundOverlay,
      opacityRef: MutableRefObject<number>,
      target: number,
      duration = 300
    ) => {
      const stepTime = 50; // update every 50ms
      const steps = duration / stepTime;
      const current = opacityRef.current;
      const delta = (target - current) / steps;
      let count = 0;
      const interval = setInterval(() => {
        count++;
        const newOpacity = current + delta * count;
        overlay.setOpacity(newOpacity);
        opacityRef.current = newOpacity;
        if (count >= steps) {
          clearInterval(interval);
          overlay.setOpacity(target);
          opacityRef.current = target;
        }
      }, stepTime);
    };

    const zoomListener = map.addListener('zoom_changed', () => {
      const zoom = map.getZoom();
      // trigger the parent's callback 
      if (onZoomChange) onZoomChange(zoom || 0);
      if (zoom && zoom >= 20) {
        animateOverlayOpacity(parkingOverlay, parkingOpacityRef, 0, 300);
        animateOverlayOpacity(floorOverlay, floorOpacityRef, 1, 300);
      } else {
        animateOverlayOpacity(parkingOverlay, parkingOpacityRef, 1, 300);
        animateOverlayOpacity(floorOverlay, floorOpacityRef, 0, 300);
      }
    });

    return () => google.maps.event.removeListener(zoomListener);
  }, [map, parkingOverlay, floorOverlay, onZoomChange]);

  return <div ref={mapRef} style={{ width: '100%', height: '100vh', position: 'relative' }} />;
};

export default MapRenderer;
