import React, { useEffect, useRef, useState, MutableRefObject } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { createMGBOverlays, MGBOverlays } from './overlays/MGBOverlay';
import { createPatriot20Overlays } from './overlays/20PatriotOverlay';
import { createFaulknerOverlays } from './overlays/FaulknerOverlay.tsx';
import { createPatriot22Overlays, updatePatriotPlace22, Patriot22Overlays } from './overlays/22PatriotOverlay';
import { createMarkers } from './overlays/createMarkers';
import { drawAllEdges, drawPath } from "./overlays/edgeHandler.ts";
import HospitalViewControls from './HospitalViewControls';
import Graph, { Edge, Node } from '../navigation/pathfinding/Graph';
import { StrategyPathfind, PathContext, BFS, DFS } from "../navigation/pathfinding/StrategyPathfind.ts"
import { AStar, Dijkstras } from '../navigation/pathfinding/WeightedPaths.ts'
import { showRouteWithDirections } from './overlays/RouteWithDirection.tsx';
// TRPC hooks
import { trpc } from "@/lib/trpc";
import { graph } from "./GraphObject.ts"
import { StringKeyframeTrack } from 'three/src/Three.Core.js';

interface MapRendererProps {
  onMapReady: (
    map: google.maps.Map,
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer
  ) => void;
  selectedDestination?: { name: string; location: { lat: number; lng: number } } | null;
  onZoomChange?: (zoom: number) => void;
  selectedFloor?: 3 | 4;
  onFloorChange?: (floor: 3 | 4) => void;
  departmentNumber?: number | null;
  disableDoubleClickZoom: true
}

const MapRenderer: React.FC<MapRendererProps> = ({
  onMapReady,
  selectedDestination,
  onZoomChange,
  selectedFloor = 3,
  onFloorChange = () => { },
  departmentNumber
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const algoType = trpc.getAlgoType.useQuery().data
  // For overlays
  const [parkingOverlay, setParkingOverlay] = useState<google.maps.GroundOverlay | null>(null);
  const [floorOverlay, setFloorOverlay] = useState<google.maps.GroundOverlay | null>(null);
  const [patriot22Overlays, setPatriot22Overlays] = useState<Patriot22Overlays | null>(null);
  // Markers and visualization
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [showNodes, setShowNodes] = useState(false);
  const [showEdges, setShowEdges] = useState(false);
  const [nodeMarkers, setNodeMarkers] = useState<google.maps.Marker[]>([]);
  const [edgePolylines, setEdgePolylines] = useState<google.maps.Polyline[]>([]);

  const pathPolylineRef = useRef<google.maps.Polyline | null>(null);
  const startMarkerRef = useRef<google.maps.Marker | null>(null);
  const targetMarkerRef = useRef<google.maps.Marker | null>(null);

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

  // Handle department pathfinding
  // Handle department pathfinding
// Handle department pathfinding
useEffect(() => {
  if (!map || isNodesLoading || isEdgesLoading || !nodesData || !edgesData || !selectedDestination) return;

  try {
    // Build the graph
    const graph = new Graph();
    graph.populate(nodesData, edgesData);

    // DEBUG: Log graph contents
    console.log('Graph nodes:', graph.getAllNodes().map(n => `${n.id}: (${n.x},${n.y})`));

    // Entrance handling with fallbacks
    const entrances: { [building: string]: number } = {
      "MGB (Chestnut Hill)": 3900,
      "20 Patriot Place": 1139,
      "22 Patriot Place": 1952,
      "Faulkner": 3995
    };

    let entrance = graph.getNode(entrances[selectedDestination.name]);
    if (!entrance) {
      console.warn(`Predefined entrance ${entrances[selectedDestination.name]} not found, searching alternatives...`);
      
      // Try likely entrance nodes
      const potentialEntrances = graph.getAllNodes()
        .filter(n => n.name?.toLowerCase().includes('entrance') || n.tags?.includes('entrance'));
      
      entrance = potentialEntrances[0] || graph.getAllNodes()[0];
      console.warn(`Using fallback entrance:`, entrance);
    }

    // Target handling with fallbacks
    let targetNodeId = departmentNumber || 3781;
    let target = graph.getNode(targetNodeId);
    if (!target) {
      console.warn(`Target node ${targetNodeId} not found, searching alternatives...`);
      
      // Try nodes with 'lab' in name
      const potentialTargets = graph.getAllNodes()
        .filter(n => n.name?.toLowerCase().includes('lab') || n.tags?.includes('lab'));
      
      target = potentialTargets[0] || graph.getAllNodes()[1] || graph.getAllNodes()[0];
      targetNodeId = target.id;
      console.warn(`Using fallback target:`, target);
    }

    // Clear previous path
    [pathPolylineRef.current, startMarkerRef.current, targetMarkerRef.current].forEach(item => {
      if (item) item.setMap(null);
    });

    // Pathfinding
    context.setPathAlgorithm = new AStar();
    if (algoType === "A-Star") context.setStrategyPathfind(new AStar());
    else if (algoType === "DFS") context.setStrategyPathfind(new DFS());
    else if (algoType === "BFS") context.setStrategyPathfind(new BFS());
    else if (algoType === "Dijkstras") context.setStrategyPathfind(new Dijkstras());

    const pathNodes = context.pathFind(graph, entrance, target);
    console.log("Path found with", pathNodes.length, "nodes");

    // Visualization
    pathPolylineRef.current = drawPath(map, pathNodes);
    const routeInfo = showRouteWithDirections(map, pathNodes);

    // Markers
    startMarkerRef.current = new google.maps.Marker({
      position: { lat: entrance.x, lng: entrance.y },
      map: map,
      title: `Start (${entrance.name || 'Entrance'})`,
      icon: { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' },
    });

    targetMarkerRef.current = new google.maps.Marker({
      position: { lat: target.x, lng: target.y },
      map: map,
      title: target.name || (targetNodeId === 3781 ? 'Laboratory' : 'Department'),
      icon: { url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' },
    });

  } catch (error) {
    console.error('Pathfinding error:', error);
  }
}, [map, departmentNumber, nodesData, edgesData, isNodesLoading, isEdgesLoading, selectedDestination, algoType]);

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
        patriot22Overlays.floor3Overlay.setMap(null);
        patriot22Overlays.floor4Overlay.setMap(null);
        setPatriot22Overlays(null);
      }
    };

    cleanupOverlays();

    // Set up new overlays based on destination
    if (selectedDestination) {
      try {
        if (selectedDestination.name === "MGB (Chestnut Hill)") {
          const overlays: MGBOverlays = createMGBOverlays(map);
          setParkingOverlay(overlays.parkingOverlay);
          setFloorOverlay(overlays.floorOverlay);
        } else if (selectedDestination.name === "20 Patriot Place") {
          createPatriot20Overlays(map);
        } else if (selectedDestination.name === "22 Patriot Place") {
          const overlays = createPatriot22Overlays(map);
          setPatriot22Overlays(overlays);
        } else if (selectedDestination.name === "Faulkner") {
          createFaulknerOverlays(map);
        }

        // Center map on the selected destination
        map.setCenter(selectedDestination.location);
        map.setZoom(18);
      } catch (error) {
        console.error('Error setting up overlays:', error);
      }
    }

    return cleanupOverlays;
  }, [selectedDestination, map]);

  // Update Patriot Place overlays on floor change
  useEffect(() => {
    if (!map || !patriot22Overlays) return;

    try {
      updatePatriotPlace22(patriot22Overlays, selectedFloor);

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
  }, [selectedFloor, map, patriot22Overlays, onZoomChange]);

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
  };
  
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