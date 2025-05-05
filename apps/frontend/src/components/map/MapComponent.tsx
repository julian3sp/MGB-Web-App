import React, { useState, useEffect, useRef } from 'react';
import MapRenderer from './MapRenderer';
import DisplayLottie from '../ui/DisplayLottie';
import { TextGenerateEffectDemo } from '../GenerateText';
import DepartmentDropdown from './DepartmentDropdown';
import { ParkingLotButtons } from "../ParkingLotButtons.tsx";
import GoogleMapSection, {
    calculateTravelTimes,
    formatDuration,
    TravelTimes,
} from './GoogleMapSection';
import { createMGBOverlays, updateDepartmentPath, MGBOverlays } from './overlays/MGBOverlay.tsx';
import DirectionsGuide from './DirectionsGuide.tsx';
import { trpc } from '@/lib/trpc.ts';
import ServiceFormSideBar from '@/components/serviceRequest/ServiceFormSideBar.tsx';
import PageWrapper from '@/components/ui/PageWrapper.tsx';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { NavButton } from '../NavButton.tsx';
import HospitalDirectionsGuide from './HospitalDirectionGuide.tsx';
const MapComponent: React.FC = () => {
    const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
    const [directionsService, setDirectionsService] =
        useState<google.maps.DirectionsService | null>(null);
    const [directionsRenderer, setDirectionsRenderer] =
        useState<google.maps.DirectionsRenderer | null>(null);
    const [startLocation, setStartLocation] = useState<{
        name: string;
        location: google.maps.LatLngLiteral;
    } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedPlace, setSelectedPlace] = useState<{
        name: string;
        location: google.maps.LatLngLiteral;
    } | null>(null);
    const [showMap, setShowMap] = useState<boolean>(false);
    const [showText, setShowText] = useState(true);
    const [selectedDepartment, setSelectedDepartment] = useState<{
        name: string;
        floor: string[];
    } | null>(null);
    const [deptNumber, setDeptNumber] = useState<number | null>(null);
    const [accordionItem, setAccordionItem] = useState<string[]>(["item-1"]);
    const [showHospitalMap, setShowHospitalMap] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [directionsResult, setDirectionsResult] = useState<google.maps.DirectionsResult | null>(
        null
    );
    const [selectedTransport, setSelectedTransport] = useState<'driving' | 'walking' | 'transit'>(
        'driving'
    );
    const destinationMarkerRef = useRef<google.maps.Marker | null>(null);
    const [selectedFloor, setSelectedFloor] = useState<number>(1);
    const [checkInDesk, setCheckInDesk] = useState<boolean>(true);
    const [pathNodes, setPathNodes] = useState<Node[]>([]);
    const [textDirections, setTextDirections] = useState<string[]>([]);
    const [currentFloor, setCurrentFloor] = useState<number>(1)
    const [travelTimes, setTravelTimes] = useState<TravelTimes>({
        driving: null,
        transit: null,
        walking: null,
    });
    const [mgbOverlays, setMgbOverlays] = useState<MGBOverlays | null>(null);
    const [parkingLot, setParkingLot] = useState("")

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
        setMapInstance(map);
        setDirectionsService(service);
        setDirectionsRenderer(renderer);

        const overlays = createMGBOverlays(map);
        setMgbOverlays(overlays);
    };

    const handleFloorSelect = (floor: number) => {
        setSelectedFloor(floor);
    };


    const handleCheckInToggle = () => {
        setCheckInDesk(prev => !prev);
    }

    useEffect(() => {
        console.log("Check in bool: ", checkInDesk)
        if (selectedDepartment) {
            setDeptNumber(getDeptNum(selectedDepartment, checkInDesk));
        }
    }, [selectedDepartment, checkInDesk]);

    // When the user selects a starting location.
    const handleStartLocationSelected = (place: {
        name: string; location: google.maps.LatLngLiteral;
    }) => {
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
    const handleDestinationSelected = (destination: {
        name: string;
        location: { lat: number; lng: number };
    }) => {
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

    function getDeptNum(department: { name: string; floor: string[] }): number {
        const CNdepartmentMapping: Record<string, number> = {
            'Multi-Specialty Clinic': 1267,
            'Radiology': 1358,
            'MRI': 1358,
            'CT': 1358,
            'Laboratory': 1277
        };
        const CNCheckin: Record<string, number> = {
            'Entrance': 3314,
            'Multi-Specialty Clinic': 3314,
            'Radiology': 3314,
            'MRI': 3314,
            'CT': 3314,
            'Laboratory': 3314
        };
        const Pat20departmentMapping: Record<string, number> = {
            'Urgent Care': 1861,
            'Urology': 2009,
            'Pharmacy': 1743,
            'Blood Work': 1784,
            'Radiology': 1739,
            'Cardiology': 3315,
            'Orthopedics': 2181,
            'Rehabilitation Services': 2162,
            'Surgical Specialties': 2318,
            'Sports Medicine': 2271,
            'Day Surgery': 2562,
            'Pain Medicine/Nutrition': 2458,
            'EMG': 3316,
            'Physiatry': 2379,
            'Pulmonary Testing': 2365
        };
        const Pat20Checkin: Record<string, number> = {
            'Urology': 2003,
            'Cardiology': 2003,
            'Urgent Care': 2025,
            'Blood Work': 1869,
            'Radiology': 1852,
            'Pharmacy': 1743,
            'Orthopedics': 2209,
            'Rehabilitation Services': 2209,
            'Surgical Specialties': 2325,
            'Sports Medicine': 2301,
            'Day Surgery': 2471,
            'Pain Medicine/Nutrition': 2471,
            'EMG': 2442,
            'Physiatry': 2442,
            'Pulmonary Testing': 2442

        }
        const Pat22departmentMapping: Record<string, number> = {
            'Multi-Specialty Clinic': 257,
            'Blood Draw/Phlebotomy': 1168,
            'Primary Care': 797,
        };
        const Pat22Checkin: Record<string, number> = {
            'Multi-Specialty Clinic': 658,
            'Blood Draw/Phlebotomy': 1191,
            'Primary Care': 1082,
        };
        const FaulknerMapping: Record<string, number> = {
            'Audiology': 3136,
            'Blood Drawing Lab': 3135,
            'Cardiac Rehab': 3139,
            'Emergency Department': 3158,
            'Endoscopy': 3163,
            'MRI/CT': 3095,
            'Operation Rooms': 3175,
            'Pre-Admittance Screening': 3318,
            'Pulmonary Lab': 3320,
            'Radiology': 3105,
            'Special Testing': 3322,
            'Vascular Lab': 3320,
            'Recovery': 3143
        };
        const FaulknerCheckin: Record<string, number> = {
            'Audiology': 3317,
            'Blood Drawing Lab': 3317,
            'Cardiac Rehab': 3317,
            'Emergency Department': 3317,
            'Endoscopy': 3317,
            'MRI/CT': 3317,
            'Operation Rooms': 3317,
            'Pre-Admittance Screening': 3317,
            'Pulmonary Lab': 3317,
            'Radiology': 3317,
            'Special Testing': 3317,
            'Vascular Lab': 3317,
            'Recovery': 3317
        };

        const mainCampusMapping: Record<string, number> = {
            'Wound Care Center': 4684,
            'Asthma Research Center': 4415,
            'Emergency': 4987,
            'Neuroscience': 5247
        };
        const mainCampusCheckin: Record<string, number> = {
            'Wound Care Center': 4684,
            'Asthma Research Center': 4415,
            'Emergency': 4987,
            'Neuroscience': 5247
        };

        if (!checkInDesk) {
            if (selectedPlace?.name === null) {
                console.error('No location selected');
            } else if (selectedPlace?.name === 'MGB (Chestnut Hill)') {
                return CNdepartmentMapping[department.name];
            } else if (selectedPlace?.name === '20 Patriot Place') {
                return Pat20departmentMapping[department.name];
            } else if (selectedPlace?.name === '22 Patriot Place') {
                return Pat22departmentMapping[department.name];
            } else if (selectedPlace?.name === 'Faulkner') {
                return FaulknerMapping[department.name];
            } else if (selectedPlace?.name === 'Main Campus') {
                return mainCampusMapping[department.name];
            }
        } else {
            if (selectedPlace?.name === null) {
                console.error('No location selected');
            } else if (selectedPlace?.name === 'MGB (Chestnut Hill)') {
                return CNCheckin[department.name];
            } else if (selectedPlace?.name === '20 Patriot Place') {
                return Pat20Checkin[department.name];
            } else if (selectedPlace?.name === '22 Patriot Place') {
                return Pat22Checkin[department.name];
            } else if (selectedPlace?.name === 'Faulkner') {
                return FaulknerCheckin[department.name];
            } else if (selectedPlace?.name === 'Main Campus') {
                return mainCampusCheckin[department.name];
            }
        }
        console.log('Issues in finding dept node');
        return 0;
    }

    const handleDepartmentSelected = (department: { name: string; floor: string[] }) => {
        setSelectedDepartment(department);
        const deptNum = getDeptNum(department);
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

    const handleParkingLot = (lot: string)=> {
        setParkingLot(lot)
    }

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
                    mgbOverlays.markers.forEach((marker) => marker.setVisible(false));
                }
            } else {
                // When zoomed in, show the department overlay.
                mgbOverlays.navigationPolyline?.setVisible(true);
                if (mgbOverlays.markers) {
                    mgbOverlays.markers.forEach((marker) => marker.setVisible(true));
                }
            }
        }
    };

    // Update route when transport mode or locations change.
    useEffect(() => {
        if (
            startLocation &&
            selectedPlace &&
            mapInstance &&
            directionsService &&
            directionsRenderer
        ) {
            displayRouteOnMap(startLocation, selectedPlace);
        }
    }, [selectedTransport, startLocation, selectedPlace]);

    return (
        <PageWrapper open={true}
            contents={
                // put sidebar contents here:</p>

                <div className="h-[95vh] w-full p-5 border-r border-[#003a96] border-r-3 flex flex-col gap-4 overflow-y-auto ">
                    <h2 className="font-bold font-[Poppins] text-center text-[#003a96]">Enter your location and <br />destination</h2>
                    <div className="overflow-visible">
                        <Accordion type="multiple" value={accordionItem} onValueChange={setAccordionItem} defaultValue={["item-1"]} className={'w-full'}>
                            <AccordionItem value={"item-1"}>
                                <AccordionTrigger>Transit Directions</AccordionTrigger>
                                <AccordionContent className={"h-auto pb-8"}>
                                    <GoogleMapSection
                                        startLocation={startLocation}
                                        selectedPlace={selectedPlace}
                                        selectedTransport={selectedTransport}
                                        travelTimes={travelTimes}
                                        mapInstance={mapInstance}
                                        handleStartLocationSelected={handleStartLocationSelected}
                                        handleDestinationSelected={handleDestinationSelected}
                                        handleViewMap={handleViewMap}
                                        directionsResult={directionsResult}
                                        setAccordionItem={setAccordionItem} onTransportChange={(mode) => {
                                            setSelectedTransport(mode);
                                            if (startLocation && selectedPlace && mapInstance && directionsService && directionsRenderer) { displayRouteOnMap(startLocation, selectedPlace); }
                                        }}
                                        handleGetCurrentLocation={handleGetCurrentLocation}
                                    />

                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value={"item-2"}>
                                <AccordionTrigger>Parking</AccordionTrigger>
                                <AccordionContent className={"h-auto"}>
                                    {/* Select Department dropdown */}
                                    <div className="flex justify-between gap-3 items-center">
                                        {selectedPlace && <ParkingLotButtons selectedPlace={selectedPlace.name} setAccordionItem={setAccordionItem} setLot={handleParkingLot} />}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value={"item-3"}>
                                <AccordionTrigger>Hospital Department</AccordionTrigger>
                                <AccordionContent className={"h-auto"}>
                                    {/* Select Department dropdown */}
                                    {/*<h2 className="text-sm font-semibold pt-4 font-[Poppins] self-center pb-4">*/}
                                    {/*    Select a department*/}
                                    {/*</h2>*/}
                                    <DepartmentDropdown
                                        onDepartmentSelected={handleDepartmentSelected}
                                        building={selectedPlace?.name ?? ''}
                                    />
                                    <br />
                                    {checkInDesk ? <NavButton onClick={handleCheckInToggle}>Direct to Department</NavButton> : <NavButton onClick={handleCheckInToggle}>Direct to Check In Desk</NavButton>}
                                    <br /> <br />
                                    <HospitalDirectionsGuide
                                        pathNodes={pathNodes}
                                        selectedFloor={currentFloor}
                                        buildingName={selectedPlace?.name}
                                        textDirections={textDirections}
                                    />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            } scaling={4}
            absolute={false}
        >
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
                    selectedFloor={currentFloor}
                    onFloorChange={setCurrentFloor}
                    departmentNumber={deptNumber}
                    disableDoubleClickZoom={true}
                    onPathFound={setPathNodes}
                    onTextDirectionsGenerated={setTextDirections}
                    onFloorChangeRequired={(newFloor) => setCurrentFloor(newFloor)}
                    currentFloor={currentFloor}
                    selectedLot={parkingLot}
                    checkin ={checkInDesk}
                    deptName={selectedDepartment?.name || ""}
                />

            </div>
        </PageWrapper>
    );
};

export default MapComponent;
