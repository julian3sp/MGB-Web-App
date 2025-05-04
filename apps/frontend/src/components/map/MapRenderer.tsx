import React, { useEffect, useRef, useState, MutableRefObject } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { createMGBOverlays, MGBOverlays } from './overlays/MGBOverlay';
import { createPatriot20Overlays, updatePatriotPlace20, Patriot20Overlays } from './overlays/20PatriotOverlay';
import { createFaulknerOverlays } from './overlays/FaulknerOverlay.tsx';
import { createPatriot22Overlays, updatePatriotPlace22, Patriot22Overlays } from './overlays/22PatriotOverlay';
import { createMainCampusOverlay, updateMainCampus, MainCampusOverlay } from './overlays/mainCampusOverlay.tsx';
import { createMarkers } from './overlays/createMarkers';
import { drawAllEdges, drawPath } from "./overlays/edgeHandler.ts";
import HospitalViewControls from './HospitalViewControls';
import Graph, { Edge, Node } from '../navigation/pathfinding/Graph';
import { StrategyPathfind, PathContext, BFS, DFS } from "../navigation/pathfinding/StrategyPathfind.ts"
import { AStar, Dijkstras } from '../navigation/pathfinding/WeightedPaths.ts'

import { showRouteWithDirections } from './overlays/RouteWithDirection.tsx';
import HospitalDirectionsGuide from './HospitalDirectionGuide.tsx';

// TRPC hooks
import { trpc } from "@/lib/trpc";
interface MapRendererProps {
  onMapReady: (
    map: google.maps.Map,
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer
  ) => void;
  selectedDestination?: { name: string; location: { lat: number; lng: number } } | null;
  onZoomChange?: (zoom: number) => void;
  selectedFloor?: 1 | 2 | 3 | 4;
  onFloorChange?: (floor: number) => void;
  departmentNumber?: number | null;
  disableDoubleClickZoom: true
  onPathFound?: (pathNodes: Node[]) => void;
  onTextDirectionsGenerated?: (textDirections: string[]) => void;
  onFloorChangeRequired?: (floor: number) => void;
  currentFloor: number;
}

const MapRenderer: React.FC<MapRendererProps> = ({
  onMapReady,
  selectedDestination,
  onZoomChange,
  selectedFloor = 1,
  onFloorChange,
  departmentNumber,
  onPathFound,
  onTextDirectionsGenerated,
  onFloorChangeRequired,
  currentFloor
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const algoType = trpc.getAlgoType.useQuery().data
  // For overlays
  const [parkingOverlay, setParkingOverlay] = useState<google.maps.GroundOverlay | null>(null);
  const [floorOverlay, setFloorOverlay] = useState<google.maps.GroundOverlay | null>(null);
  const [patriot22Overlays, setPatriot22Overlays] = useState<Patriot22Overlays | null>(null);
  const [patriot20Overlays, setPatriot20Overlays] = useState<Patriot20Overlays | null>(null);
  const [mainCampusOverlays, setMainCampusOverlays] = useState<Patriot20Overlays | null>(null);

  const pathPolylineRef = useRef<google.maps.Polyline | null>(null);
  const startMarkerRef = useRef<google.maps.Marker | null>(null);
  const targetMarkerRef = useRef<google.maps.Marker | null>(null);
  const pathNodesRef = useRef<Node[]>([]);

  const context = new PathContext();

  // Refs for overlay animations
  const parkingOpacityRef = useRef(1);
  const floorOpacityRef = useRef(0);

  // Get Google Maps API key
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Fetch graph data via TRPC
  const { data: nodesData, isLoading: isNodesLoading } = trpc.getAllNodes.useQuery();
  const { data: edgesData, isLoading: isEdgesLoading } = trpc.getAllEdges.useQuery();

  // Initialize Google Map (only once)
  useEffect(() => {
    if (!apiKey) {
      console.error("Google Maps API key is missing");
      return;
    }

    if (map || !mapRef.current) return;

    const loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['places', 'marker'],
      language: 'en',
    });

    loader.load()
      .then(() => {
        if (!mapRef.current) return;

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            console.log("User location found:", userLocation);

            const newMap = new google.maps.Map(mapRef.current!, {
              center: userLocation,
              zoom: 18,
              fullscreenControl: true,
              mapTypeControl: false,
              streetViewControl: true,
              zoomControl: true,
              disableDoubleClickZoom: true,
              rotateControl: false,
              heading: 0,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              gestureHandling: 'greedy',
              mapId: 'ca6b761fac973d24'
            });

            newMap.setHeading(0);

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

            // Optional: drop a marker on user's location
            new google.maps.Marker({
              position: userLocation,
              map: newMap,
              title: "You are here",
              icon: { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' },
            });
          },
          (error) => { // render map using predefined location
            console.error("Error getting user location:", error);

            const fallbackCenter = { lat: 42.3601, lng: -71.0589 };

            const newMap = new google.maps.Map(mapRef.current!, {
              center: fallbackCenter,
              zoom: 12,
              fullscreenControl: true,
              mapTypeControl: false,
              streetViewControl: true,
              zoomControl: true,
              disableDoubleClickZoom: true,
              rotateControl: false,
              heading: 0,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              mapId: 'ca6b761fac973d24'
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
        );
      })
      .catch((error) => console.error('Error loading Google Maps:', error));

  }, [onMapReady, apiKey]);

  function getMultiFloor(path: Node[]): { floor1: { path: Node[], floorNum: number }, floor2: { path: Node[], floorNum: number } } {
    const firstFloorNum: number = path[0].floor
    const lastFloorNum: number = path[path.length - 1].floor
    const firstFloorStairs = path.find(n => n.floor != firstFloorNum);
    const lastFloorStairs = path.find(n => n.floor === lastFloorNum);
    if (lastFloorStairs) {
      const floor1 = path.slice(0, path.indexOf(firstFloorStairs))
      const floor2 = path.slice(path.indexOf(lastFloorStairs))
      return {
        floor1: { path: floor1, floorNum: firstFloorNum },
        floor2: { path: floor2, floorNum: lastFloorStairs.floor }
      }
    }
    return { floor1: { path, floorNum: firstFloorNum }, floor2: { path: [], floorNum: firstFloorNum } }
  }

  useEffect(() => {
    if (
      !map ||
      !departmentNumber ||
      isNodesLoading ||
      isEdgesLoading ||
      !nodesData ||
      !edgesData
    ) return;

    console.log('Running pathfinding for department: ', departmentNumber)

    try {
      // Build the graph from TRPC data
      const graph = new Graph();
      graph.populate(nodesData, edgesData);

      // Fixed entrance node and target department node
      const entrances: { [building: string]: number; } = {
        "MGB (Chestnut Hill)": 3715,
        "20 Patriot Place": 1004,
        "22 Patriot Place": 1290,
        "Faulkner": 3716,
        "Belkin House": 3716, // CHANGE THISSSSSS
        "Main Campus": 4963
      }

      const entrance = graph.getNode(entrances[selectedDestination!.name]);
      const target = graph.getNode(departmentNumber);

      if (!entrance || !target) {
        console.error('Either the entrance or department node is missing');
        return;
      }

      // Clear previous path if exists
      if (pathPolylineRef.current) {
        pathPolylineRef.current.setMap(null);
        pathPolylineRef.current = null;
      }

      context.setPathAlgorithm = new AStar()
      // Compute and draw the new path
      if (algoType === "A-Star") {
        console.log("Using A-Star")
        context.setStrategyPathfind(new AStar());
      } else if (algoType === "DFS") {
        console.log("Using DFS")
        context.setStrategyPathfind(new DFS())
      } else if (algoType === "BFS") {
        console.log("Using BFS")
        context.setStrategyPathfind(new BFS())
      } else if (algoType === "Dijkstras") {
        console.log("Using Dijkstra's")
        context.setStrategyPathfind(new Dijkstras())
      }

      const pathNodes = context.pathFind(graph, entrance, target)
      console.log("Path to: ", pathNodes)

      pathNodesRef.current = pathNodes;

      if (pathNodes && onPathFound) {
        onPathFound(pathNodes)
      }

      const multiFloors = getMultiFloor(pathNodes)
      console.log("Path:", pathNodes)
      console.log("Floor: ", selectedFloor)

      // Initialize newPolyline as let instead of const
      let newPolyline;

      if (multiFloors.floor2.floorNum === multiFloors.floor1.floorNum) {
        newPolyline = drawPath(map, pathNodes);
      } else {
        if (multiFloors.floor1.floorNum === selectedFloor) {
          newPolyline = drawPath(map, multiFloors.floor1.path);
        } else if (multiFloors.floor2.floorNum === selectedFloor) {
          newPolyline = drawPath(map, multiFloors.floor2.path);
        }
      }

      // Fallback if no path was drawn (shouldn't happen)
      if (!newPolyline) {
        newPolyline = drawPath(map, pathNodes);
      }

      pathPolylineRef.current = newPolyline;

      const routeInfo = showRouteWithDirections(map, pathNodes, selectedFloor, onFloorChangeRequired);

      if (onTextDirectionsGenerated) {
        onTextDirectionsGenerated(routeInfo.directions)
      }

      console.log("Route Directions: ", routeInfo.directions);
      console.log("Total distance: ", routeInfo.totalDistance)

      // Clear existing markers
      if (startMarkerRef.current) {
        startMarkerRef.current.setMap(null);
        startMarkerRef.current = null;
      }

      if (targetMarkerRef.current) {
        console.log("clearing target marker")
        targetMarkerRef.current.setMap(null);
        targetMarkerRef.current = null;
      }

      // Add new markers for start and destination
      if (entrance.floor === selectedFloor) {
        startMarkerRef.current = new google.maps.Marker({
          position: { lat: entrance.x, lng: entrance.y },
          map: map,
          title: 'Start (Entrance)',
          icon: { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' },
        });
      }

      if (target.floor === selectedFloor) {
        targetMarkerRef.current = new google.maps.Marker({
          position: { lat: target.x, lng: target.y },
          map: map,
          title: 'Department',
          icon: { url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' },
        });
      }
    } catch (error) {
      console.error('Error in pathfinding:', error);
    }
  }, [map, departmentNumber, nodesData, edgesData, isNodesLoading, isEdgesLoading, selectedDestination, selectedFloor]);

  // Handle overlay updates based on selected destination
  useEffect(() => {
    if (!map) return;

    // Clean up previous overlays
    const cleanupOverlays = () => {
      if (parkingOverlay) {
        parkingOverlay.setMap(null);
        setParkingOverlay(null);
      }
      if (floorOverlay) {
        floorOverlay.setMap(null);
        setFloorOverlay(null);
      }
      if (patriot22Overlays) {
        patriot22Overlays.floor1Overlay.setMap(null);
        patriot22Overlays.floor3Overlay.setMap(null);
        patriot22Overlays.floor4Overlay.setMap(null);
        setPatriot22Overlays(null);
      }
      if (patriot20Overlays) {
        patriot20Overlays.floor1Overlay.setMap(null);
        patriot20Overlays.floor2Overlay.setMap(null);
        patriot20Overlays.floor3Overlay.setMap(null);
        patriot20Overlays.floor4Overlay.setMap(null);
        setPatriot20Overlays(null);
      }
      if (mainCampusOverlays) {
        mainCampusOverlays.floor2Overlay.setMap(null);
        setMainCampusOverlays(null);
      }
    };

    cleanupOverlays();

    // Set up new overlays based on destination
    if (selectedDestination) {
      try {
        if (selectedDestination.name === "MGB (Chestnut Hill)") {
          const overlays: MGBOverlays = createMGBOverlays(map);
          setParkingOverlay(overlays.parkingOverlay);
          // setFloorOverlay(overlays.floorOverlay);
        } else if (selectedDestination.name === "20 Patriot Place") {
          const overlays = createPatriot20Overlays(map);
          setPatriot20Overlays(overlays);
          updatePatriotPlace20(overlays, selectedFloor!);
        } else if (selectedDestination.name === "22 Patriot Place") {
          const overlays = createPatriot22Overlays(map);
          setPatriot22Overlays(overlays);
          updatePatriotPlace22(overlays, selectedFloor!);
        } else if (selectedDestination.name === "Faulkner" || selectedDestination.name === "Belkin House") {
          createFaulknerOverlays(map);
        }
        else if (selectedDestination.name === "Main Campus") {
          const overlays: MainCampusOverlay = createMainCampusOverlay(map);
          createMainCampusOverlay(map);
          setFloorOverlay(overlays.floor2Overlay);
        }

        // Center map on the selected destination
        map.setCenter(selectedDestination.location);
        map.setZoom(18);
      } catch (error) {
        console.error('Error setting up overlays:', error);
      }
    }

    return cleanupOverlays;
  }, [selectedDestination, map, selectedFloor]);

  // Update Patriot Place overlays on floor change
  useEffect(() => {
    if (!map || !patriot22Overlays || !patriot20Overlays) return;

    try {
      updatePatriotPlace22(patriot22Overlays, selectedFloor);
      updatePatriotPlace20(patriot20Overlays, selectedFloor);

      const patriotZoomListener = map.addListener('zoom_changed', () => {
        const zoom = map.getZoom();
        if (onZoomChange && zoom !== undefined) {
          onZoomChange(zoom);
        }
      });

      return () => google.maps.event.removeListener(patriotZoomListener);
    } catch (error) {
      console.error('Error updating Patriot Place overlays:', error);
    }
  }, [selectedFloor, map, patriot22Overlays, patriot20Overlays, onZoomChange]);

  // Handle MGB overlay opacity animations
  useEffect(() => {
    if (!map || !parkingOverlay || !floorOverlay) return;

    const animateOverlayOpacity = (
      overlay: google.maps.GroundOverlay,
      opacityRef: MutableRefObject<number>,
      target: number,
      duration = 300
    ) => {
      const stepTime = 50;
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
      if (onZoomChange && zoom !== undefined) {
        onZoomChange(zoom);
      }

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

  const rotateMap = (direction: 'left' | 'right') => {
    if (!map) return;

    const currentZoom = map.getZoom() || 0;

    if (currentZoom < 18) {
      map.setZoom(18);
    }

    const amount = direction === 'left' ? 20 : -20;
    const currentHeading = map.getHeading() ?? 0;
    const newHeading = (currentHeading + amount) % 360;

    console.log("Rotating map from:", currentHeading, "to:", newHeading);

    map.setHeading(newHeading);

    const center = map.getCenter();
    if (center) {
      map.panTo(center);
    }
    updateDirectionsForViewpoint(newHeading);
  };

  const updateDirectionsForViewpoint = (heading: number) => {
    if (!map || !pathNodesRef.current.length || !onTextDirectionsGenerated) return;

    const routeInfo = showRouteWithDirections(
      map,
      pathNodesRef.current,
      selectedFloor,
      onFloorChangeRequired,
      heading
    )
    onTextDirectionsGenerated(routeInfo.directions)
  }

  useEffect(() => {
    if (!map) return;

    const headingListener = map.addListener('heading_changed', () => {
        const currentHeading = map.getHeading() ?? 0;
        updateDirectionsForViewpoint(currentHeading);
    });

    return () => {
        google.maps.event.removeListener(headingListener);
    };
}, [map]);

  // Handle path visibility based on zoom level
  useEffect(() => {
    if (!map) return;

    const zoomListener = map.addListener('zoom_changed', () => {
      const zoom = map.getZoom();

      if (zoom !== undefined && pathPolylineRef.current) {
        const isVisible = zoom >= 20;

        pathPolylineRef.current.setVisible(isVisible);

        if (startMarkerRef.current) {
          startMarkerRef.current.setVisible(isVisible);
        }

        if (targetMarkerRef.current) {
          targetMarkerRef.current.setVisible(isVisible);
        }
      }
    });

    return () => {
      google.maps.event.removeListener(zoomListener);
    };
  }, [map]);

  // Error handling
  if (!apiKey) {
    return <div className="text-red-500 p-4">Error: Google Maps API key is missing</div>;
  }

  return (
    <div className="relative w-full h-[95vh]">
      <div ref={mapRef} className="w-full h-full"></div>

      {/* Use the new HospitalViewControls component */}
      <HospitalViewControls
        map={map}
        selectedDestination={selectedDestination || null}
        selectedFloor={selectedFloor}
        onFloorChange={onFloorChange}
        rotateMap={rotateMap}
      />
    </div>
  );
};

export default MapRenderer;