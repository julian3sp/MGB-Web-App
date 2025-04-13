import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import chestnutHillOverlayImg from '../../../assets/ChestnutHillParkingLots.png';
import chestnutFloorPlanOverlay from '../../../assets/Floor1Labeled.png'

interface MapRendererProps {
  onMapReady: (
    map: google.maps.Map,
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer
  ) => void;
  // Allow selectedDestination to be an object or null.
  selectedDestination?: { name: string; location: { lat: number; lng: number } } | null;
}

const MapRenderer: React.FC<MapRendererProps> = ({ onMapReady, selectedDestination }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  // Keep track of the currently displayed overlay.
  const [parkingOverlay, setParkingOverlay] = useState<google.maps.GroundOverlay | null>(null);
  const [floorOverlay, setFloorOverlay] = useState<google.maps.GroundOverlay | null>(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const parkingOpacityRef = useRef(1);
  const floorOpacityRef = useRef(0);

  if (!apiKey) {
    return <div className="text-red-500 p-4">Error: Google Maps API key is missing</div>;
  }

  // Initialize the map only once.
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
            center: { lat: 42.3601, lng: -71.0589 }, // Boston center
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
            suppressMarkers: true, // Custom markers will be handled elsewhere.
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
      .catch((error) => {
        console.error('Error loading Google Maps:', error);
      });
  }, [onMapReady, apiKey, map]);

  // Effect to handle the ground overlay
  useEffect(() => {
    if (!map) return;

    // Clear any existing overlay
    if (parkingOverlay) {
      parkingOverlay.setMap(null);
      setParkingOverlay(null);
    }

    if (floorOverlay) {
      floorOverlay.setMap(null);
      setFloorOverlay(null);
    }

    // Add the overlay only if a destination is selected and it matches MGB Chestnut Hill.
    if (selectedDestination && selectedDestination.name === "MGB (Chestnut Hill)") {
      // Define the geographic bounds for the overlay image.
      const ParkingBounds = {
        north: 42.3264419932353,        
        south: 42.32548193483691, 
        east: -71.14910160190563,        
        west: -71.15016364918158,   
      };

      const floorBounds = {
        north: 42.326224695228895,    
        south: 42.325704043652095,     
        east: -71.14923460187407,    
        west: -71.15011134399687,   
      } 

      const newParkingOverlay = new google.maps.GroundOverlay(
        chestnutHillOverlayImg, 
        ParkingBounds,
        { opacity: 1 }
      );
      newParkingOverlay.setMap(map);
      setParkingOverlay(newParkingOverlay);

      // create the hospital floor plan overlay
      const newFloorOverlay = new google.maps.GroundOverlay(
        chestnutFloorPlanOverlay, 
        floorBounds,
        { opacity: 0 }
      );
      newFloorOverlay.setMap(map);
      setFloorOverlay(newFloorOverlay);
    }
    // Note: We only depend on map and selectedDestination.
  }, [selectedDestination, map]);

  // listen to zoom events and adjust overlay opacity
  useEffect(() => {
    if (!map || !parkingOverlay || !floorOverlay) return;

    const animateOverlayOpacity = (
      overlay: google.maps.GroundOverlay,
      opacityRef: React.MutableRefObject<number>,
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

      if (zoom && zoom >= 20){
        animateOverlayOpacity(parkingOverlay, parkingOpacityRef, 0, 300);
        animateOverlayOpacity(floorOverlay, floorOpacityRef, 1, 300);
      } else {
        animateOverlayOpacity(parkingOverlay, parkingOpacityRef, 1, 300);
        animateOverlayOpacity(floorOverlay, floorOpacityRef, 0, 300);
      }
  })

  return () => {
    google.maps.event.removeListener(zoomListener);
  };
}, [map, parkingOverlay, floorOverlay]);

  return <div ref={mapRef} style={{ width: '100%', height: '100vh', position: 'relative' }} />;
};

export default MapRenderer;
