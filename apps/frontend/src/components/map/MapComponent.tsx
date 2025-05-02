import React, { useState, useEffect, useRef } from 'react';
import MapRenderer from './MapRenderer';
import DisplayLottie from '../ui/DisplayLottie';
import { TextGenerateEffectDemo } from '../GenerateText';
import DepartmentDropdown from './DepartmentDropdown';
import GoogleMapSection, { calculateTravelTimes, formatDuration, TravelTimes } from './GoogleMapSection';
import { createMGBOverlays, updateDepartmentPath, MGBOverlays } from './overlays/MGBOverlay.tsx';
import DirectionsGuide from './DirectionsGuide.tsx';
import {trpc} from "@/lib/trpc.ts"
import ServiceFormSideBar from "@/components/serviceRequest/ServiceFormSideBar.tsx";
import PageWrapper from "@/components/ui/PageWrapper.tsx";

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
  const [directionsResult, setDirectionsResult] = useState<google.maps.DirectionsResult | null>(null);
  const [selectedTransport, setSelectedTransport] = useState<'driving' | 'walking' | 'transit'>('driving');
  const destinationMarkerRef = useRef<google.maps.Marker | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<number>(1);
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

  const handleFloorSelect = (floor: number) => {
    console.log(`Floor changed to: ${floor}`);
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

    function getDeptNum():number {
      const CNdepartmentMapping: Record<string, number> = {
        'Entrance': 2707,
        'Multi-Specialty Clinic': 2573,
        'Radiology': 2163,
        'MRI': 2075,
        'CT': 2108,
        'Laboratory': 2630
      };

      const Pat20departmentMapping: Record<string, number> = {
        'Blood Draw / Phlebotomy': 714,
        'Pharmacy': 694,
        'Orthopedics': 95,
        'Rehabilitation': 10,
        'Surgical Specialties': 204,
        'Sports Medicine': 176,
        'Day Surgery Center': 468,
        'Pain Medicine': 351,
        'Physiatry': 275,
        'Pulmonary Testing': 271,
        'Radiology': 535,
        'Urgent Care Center': 817,
        'Cardio Vascular Services': 859,
        'Urology': 859,
        'Main Entrance': 1139,
        'South Entrance': 1027,
        'Main Staircase': 1055,
        'Main Checkin': 697,
        'Reception': 814,
        'East Checkin': 979,
        'East Checkin 2': 988,
        'East Elevator': 1063,
        'East Staircase': 1063,
        'East Entrance': 813,
        'North Staircase': 54
      };
      const Pat22departmentMapping: Record<string, number> = {
        'Gynecology': 1604,
        'Lactation': 1817,
        'Vein Treatment': 1798
      };
      const FaulknerMapping: Record<string, number> = {
        'Admitting/Registration': 2774,
        'Audiology': 2860,
        'Blood Drawing Lab': 2863,
        'Cardiac Rehab': 2838,
        'Emergency Department': 2877,
        'Endoscopy': 2882,
        'MRI/CT': 2849,
        'Pre-Admittance Screening': 2857,
        'Pulmonary Lab': 2875,
        'Radiology': 2831,
        'Special Testing': 2881,
        'Vascular Lab': 2883
      };

      const mainCampusMapping: Record<string, number> = {
        'Wound Care Center': 4684,
        'Asthma Research Center': 4415,
        'Emergency' : 4987,
        'Neuroscience' : 5247
      };



      if(selectedPlace?.name === null) {
        console.error("No location selected");
      }else if(selectedPlace?.name === "MGB (Chestnut Hill)"){
        return CNdepartmentMapping[department.name];
      } else if(selectedPlace?.name === "20 Patriot Place"){
        return Pat20departmentMapping[department.name];
      } else if(selectedPlace?.name === "22 Patriot Place"){
        return Pat22departmentMapping[department.name];
      } else if(selectedPlace?.name === "Faulkner"){
        return FaulknerMapping[department.name];
      }
      else if(selectedPlace?.name === "Main Campus"){
        return mainCampusMapping[department.name];
      }
      console.log("Issues in finding dept node")
      return 0;
    }

      const deptNum = getDeptNum();
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
      travelMode: selectedTransport.toUpperCase() as google.maps.TravelMode,
    };
  
    console.log('Calculating route with request:', request);
  
    directionsService.route(request, (result, status) => {
      console.log('Route calculation result:', { status, result });
  
      if (status === google.maps.DirectionsStatus.OK && result) {
        setDirectionsResult(result);
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
      <PageWrapper open={true}
                   contents=
                       {
        // put sidebar contents here:</p>
        <div className="h-[95vh] w-full p-5 border-r border-[#003a96] border-r-3 flex flex-col gap-4 overflow-y-auto ">
          <h2 className="font-bold font-[Poppins] text-center">Enter your location and <br/>destination</h2>
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
                if (startLocation && selectedPlace && mapInstance && directionsService && directionsRenderer)
                {displayRouteOnMap(startLocation, selectedPlace);}
              }}
              handleGetCurrentLocation={handleGetCurrentLocation}/>
          {directionsResult && (<DirectionsGuide directions={directionsResult} />)}

          {/* Select Department dropdown */}
          <h2 className="text-sm font-semibold pt-4 font-[Poppins] self-center">Select a department</h2>
          <DepartmentDropdown onDepartmentSelected={handleDepartmentSelected} building={selectedPlace?.name ?? ""} />
        </div>}
                   scaling = {4}
                   absolute={false}>

        {/* Hospital Map Section */}
        <div className="flex">
          <div className="flex flex-col">
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
      <div className="w-full relative">
        <MapRenderer
          onMapReady={handleMapReady}
          selectedDestination={selectedPlace}
          onZoomChange={handleZoomChange}
          selectedFloor={selectedFloor}
          onFloorChange={handleFloorSelect}
          departmentNumber={deptNumber}
          disableDoubleClickZoom={true}
        />
      </div>
      </PageWrapper>
  );
};

export default MapComponent;