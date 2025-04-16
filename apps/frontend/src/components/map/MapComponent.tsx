import React, { useState, useEffect, useRef } from 'react';
import MapRenderer from './MapRenderer';
import DisplayLottie from '../ui/DisplayLottie';
import { TextGenerateEffectDemo } from '../GenerateText';
import DepartmentDropdown from './DepartmentDropdown';
import GoogleMapSection, { calculateTravelTimes, formatDuration, TravelTimes } from './GoogleMapSection';
import FloorSelector from './FloorSelector';
import { createMGBOverlays, updateDepartmentPath, MGBOverlays } from './overlays/MGBOverlay.tsx';
import Graph, {Node} from "@/components/navigation/pathfinding/Graph.ts";
import {trpc} from "../../lib/trpc"

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
  const [deptNumber, setDeptNumber] = useState<number | null>(null);
  const [showHospitalMap, setShowHospitalMap] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTransport, setSelectedTransport] = useState<'driving' | 'walking' | 'transit'>('driving');
  const destinationMarkerRef = useRef<google.maps.Marker | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<3 | 4>(3);
  const [travelTimes, setTravelTimes] = useState<TravelTimes>({
    driving: null,
    transit: null,
    walking: null,
  });

  const [mgbOverlays, setMgbOverlays] = useState<MGBOverlays | null>(null);
  const { data: nodesData, isLoading: isNodesLoading } = trpc.getAllNodes.useQuery();
  const { data: edgesData, isLoading: isEdgesLoading } = trpc.getAllEdges.useQuery();

  // Calculate travel times when start or end location changes.
  useEffect(() => {
    if (startLocation && selectedPlace) {
      calculateTravelTimes(startLocation, selectedPlace, setTravelTimes);
    } else {
      setTravelTimes({ driving: null, transit: null, walking: null });
    }
  }, [startLocation, selectedPlace]);

  // Auto-loop the text animation every 3 seconds.
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

    const overlays = createMGBOverlays(map);
    setMgbOverlays(overlays);
  };

  const handleFloorSelect = (floor: 3 | 4) => {
    setSelectedFloor(floor);
  };

  // Zoom-to-Destination button handler
  const handleZoomToDestination = () => {
    if (mapInstance && selectedPlace) {
      mapInstance.setCenter(selectedPlace.location);
      mapInstance.setZoom(19);
    }
  };

  // When the user selects a starting location.
  const handleStartLocationSelected = (place: { name: string; location: google.maps.LatLngLiteral }) => {
    console.log('Start location selected:', place);
    setStartLocation(place);

    if (mapInstance) {
      // Clear any existing markers and routes.
      if (directionsRenderer) {
        directionsRenderer.setMap(null);
        directionsRenderer.setMap(mapInstance);
      }

      // Center map on selected location.
      mapInstance.setCenter(place.location);
      mapInstance.setZoom(15);

      // Add marker for start location.
      new google.maps.Marker({
        position: place.location,
        map: mapInstance,
        title: place.name,
        icon: { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' },
      });

      // Update route if destination already exists.
      if (selectedPlace) {
        displayRouteOnMap(place, selectedPlace);
      }
    }
  };

  // When the user selects a destination.
  const handleDestinationSelected = (destination: { name: string; location: { lat: number; lng: number } }) => {
    console.log('Destination selected:', destination);
    const newDestination = {
      name: destination.name,
      location: destination.location,
    };
    setSelectedPlace(newDestination);

    if (startLocation && mapInstance && directionsService && directionsRenderer) {
      setShowMap(true);
      setShowHospitalMap(false);
      displayRouteOnMap(startLocation, newDestination);
    }
  };

  const handleDepartmentSelected = (department: { name: string; floor: string[] }) => {
      setSelectedDepartment(department);

      const departmentMapping: Record<string, number> = {
        'Multi-Specialty Clinic': 912,
        'Radiology': 80,
        'Radiology, MRI/CT Scan': 66

      };

      const deptNum = departmentMapping[department.name];
      if (deptNum) {
        setDeptNumber(deptNum);
      } else {
        console.error(`No mapping found for department: ${department.name}`);
      }
    };
  // When the "Show Google Map" button is clicked.
  const handleViewMap = () => {
    if (!startLocation || !selectedPlace || !mapInstance || !directionsService || !directionsRenderer) return;
    setShowMap(true);
    setShowHospitalMap(false);
    displayRouteOnMap(startLocation, selectedPlace);
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            name: 'Your location',
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          };
          handleStartLocationSelected(location);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  // Helper function to add marker and draw the route.
  const displayRouteOnMap = (
    start: { name: string; location: google.maps.LatLngLiteral },
    end: { name: string; location: google.maps.LatLngLiteral }
  ) => {
    if (!mapInstance || !directionsService || !directionsRenderer) {
      console.warn('Map components not ready');
      return;
    }
  
    // Clear existing routes and markers.
    directionsRenderer.setMap(null);
    directionsRenderer.setMap(mapInstance);
  
    const request: google.maps.DirectionsRequest = {
      origin: start.location,
      destination: end.location,
      travelMode: google.maps.DirectionsTravelMode[
        selectedTransport.toUpperCase() as keyof typeof google.maps.DirectionsTravelMode
      ],
    };
  
    console.log('Calculating route with request:', request);
  
    directionsService.route(request, (result, status) => {
      console.log('Route calculation result:', { status, result });
  
      if (status === google.maps.DirectionsStatus.OK && result) {
        mapInstance.setOptions({ draggableCursor: 'default' });
  
        // Add the start marker.
        new google.maps.Marker({
          position: start.location,
          map: mapInstance,
          title: start.name,
          icon: { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' },
        });
  
        // Remove any previous destination marker.
        if (destinationMarkerRef.current) {
          destinationMarkerRef.current.setMap(null);
        }
  
        // Create the destination marker (red) and store its reference.
        const destMarker = new google.maps.Marker({
          position: end.location,
          map: mapInstance,
          title: end.name,
          icon: { url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' },
        });
        destinationMarkerRef.current = destMarker;
  
        // Set the directions.
        directionsRenderer.setDirections(result);
  
        // Fit bounds to the route.
        if (result.routes[0] && result.routes[0].bounds) {
          mapInstance.fitBounds(result.routes[0].bounds);
        }
      } else {
        console.error('Directions request failed:', status);
        setError('Could not calculate route');
      }
    });
  };

  const handleZoomChange = (zoom: number) => {
    // Update the routing destination marker (if using it elsewhere)
    if (destinationMarkerRef.current) {
      if (zoom >= 19) {
        destinationMarkerRef.current.setVisible(false);
      } else {
        destinationMarkerRef.current.setVisible(true);
      }
    }
  
    // Also hide/show the department path polyline and its markers (from MGB overlays).
    // (Make sure mgbOverlays is defined.)
    if (mgbOverlays) {
      if (zoom < 20) {
        // When zoomed out, hide the department overlay markers and polyline.
        mgbOverlays.navigationPolyline?.setVisible(false);
        if (mgbOverlays.markers) {
          mgbOverlays.markers.forEach(marker => marker.setVisible(false));
        }
      } else {
        // When zoomed in, show the department overlay.
        mgbOverlays.navigationPolyline?.setVisible(true);
        if (mgbOverlays.markers) {
          mgbOverlays.markers.forEach(marker => marker.setVisible(true));
        }
      }
    }
  };
  

  // Update route when transport mode or locations change.
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

        <GoogleMapSection
          startLocation={startLocation}
          selectedPlace={selectedPlace}
          selectedTransport={selectedTransport}
          travelTimes={travelTimes}
          mapInstance={mapInstance}
          handleStartLocationSelected={handleStartLocationSelected}
          handleDestinationSelected={handleDestinationSelected}
          handleViewMap={handleViewMap}
          onTransportChange={(mode) => {
            setSelectedTransport(mode);
            if (startLocation && selectedPlace && mapInstance && directionsService && directionsRenderer) {
              displayRouteOnMap(startLocation, selectedPlace);
            }
          }}
          handleGetCurrentLocation={handleGetCurrentLocation}
        />

        {selectedPlace && (
          <button
            onClick={handleZoomToDestination}
            className="w-[90%] bg-[#003a96] text-white px-4 py-1.5 rounded-full cursor-pointer font-bold text-sm
                         transition-all duration-300 ease-in-out
                         hover:bg-[#002b70] hover:scale-105 hover:shadow-lg
                         active:scale-95 mx-auto"
          >
            Zoom to Destination
          </button>
        )}

        {/* Hospital Map Section */}
        <div className="flex flex-col mt-10">
          <h2 className="text-sm font-semibold mb-2">Select a department</h2>
          <DepartmentDropdown onDepartmentSelected={handleDepartmentSelected} />
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
        <div className={`h-full transition-all duration-500 ease-in-out ${showMap ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <MapRenderer 
            onMapReady={handleMapReady} 
            selectedDestination={selectedPlace} 
            onZoomChange={handleZoomChange}
            selectedFloor={selectedPlace?.name === "22 Patriot Place" ? selectedFloor : undefined}
            departmentNumber={deptNumber}
          />
          {selectedPlace?.name === "22 Patriot Place" && (
            <FloorSelector selectedFloor={selectedFloor} onSelect={handleFloorSelect} />
          )}
        </div>
        <div className={`absolute inset-0 flex items-center justify-center bg-white transition-all duration-500 ease-in-out ${isLoading ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#003a96] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[#003a96] font-medium">Loading map...</p>
          </div>
        </div>
        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-5 transition-all duration-500 ease-in-out ${showMap || showHospitalMap || isLoading ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
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
