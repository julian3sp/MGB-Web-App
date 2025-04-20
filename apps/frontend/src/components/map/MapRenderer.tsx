import React, { useEffect, useRef, useState, MutableRefObject } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import {createMGBOverlays, MGBOverlays} from './overlays/MGBOverlay';
import { createPatriot20Overlays } from './overlays/20PatriotOverlay';
import { createPatriot22Overlays, updatePatriotPlace22, Patriot22Overlays } from './overlays/22PatriotOverlay';
import {addNewMarkers, createMarkers, drawAllEdges, drawPath} from './overlays/createMarkers';
import HospitalViewControls from '../HospitalViewControls';
import Graph, {Edge, Node} from '../navigation/pathfinding/Graph'; 

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
  onFloorChange = () => {},
  departmentNumber 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
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
      libraries: ['places'],
      language: 'en',
    });
    
    loader.load()
      .then(() => {
        if (mapRef.current) {
          const newMap = new google.maps.Map(mapRef.current, {
            center: { lat: 42.3601, lng: -71.0589 },
            zoom: 12,
            fullscreenControl: true,
            mapTypeControl: false,
            streetViewControl: true,
            zoomControl: true,
            disableDoubleClickZoom: true
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
  }, [onMapReady, apiKey]);

  // Toggle nodes visibility
  const toggleNodesHandler = () => {
    if (!map || isNodesLoading || !nodesData || !edgesData) return;
    
    if (showNodes) {
      // Clear existing node markers
      nodeMarkers.forEach(marker => marker.setMap(null));
      setNodeMarkers([]);
      setShowNodes(false);
    } else {
      // Create and display node markers
      const graph = new Graph();
      graph.populate(nodesData, edgesData);
      const allNodes: Node[] = graph.getNodes();
      const markersCreated = createMarkers(map, allNodes);
      setNodeMarkers(markersCreated);
      setShowNodes(true);
    }
  };


  // Toggle edges visibility
  const toggleEdgesHandler = () => {
    if (!map || isNodesLoading || isEdgesLoading || !nodesData || !edgesData) return;
    
    if (showEdges) {
      // Clear existing edge polylines
      edgePolylines.forEach(polyline => polyline.setMap(null));
      setEdgePolylines([]);
      setShowEdges(false);
    } else {
      // Create and display edge polylines
      const graph = new Graph();
      graph.populate(nodesData, edgesData);
      const allEdges: Edge[] = graph.getEdges();
      const polylinesCreated = drawAllEdges(map, allEdges); 
      setEdgePolylines(polylinesCreated);
      setShowEdges(true);
    }
  };

  // Handle department pathfinding
  useEffect(() => {
    if (
      !map ||
      !departmentNumber ||
      isNodesLoading ||
      isEdgesLoading ||
      !nodesData ||
      !edgesData
    ) return;

    try {
      // Build the graph from TRPC data
      const graph = new Graph();
      graph.populate(nodesData, edgesData);

      // Fixed entrance node and target department node
      const entrance = graph.getNode(941);
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
      
      // Compute and draw the new path
      const pathNodes: Node[] = graph.aStar(entrance, target);
      const newPolyline = drawPath(map, pathNodes);
      pathPolylineRef.current = newPolyline;

      // Clear existing markers
      if (startMarkerRef.current) {
        startMarkerRef.current.setMap(null);
        startMarkerRef.current = null;
      }
      if (targetMarkerRef.current) {
        targetMarkerRef.current.setMap(null);
        targetMarkerRef.current = null;
      }
      
      // Add new markers for start and destination
      startMarkerRef.current = new google.maps.Marker({
        position: { lat: entrance.x, lng: entrance.y },
        map: map,
        title: 'Start (Entrance)',
        icon: { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' },
      });
      
      targetMarkerRef.current = new google.maps.Marker({
        position: { lat: target.x, lng: target.y },
        map: map,
        title: 'Department',
        icon: { url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' },
      });
    } catch (error) {
      console.error('Error in pathfinding:', error);
    }
  }, [map, departmentNumber, nodesData, edgesData, isNodesLoading, isEdgesLoading]);
  
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
    <div className="relative w-full h-screen">
      <div ref={mapRef} className="w-full h-full"></div>
      
      {/* {map && (
        <div className="absolute top-8 right-2 flex flex-col gap-2 z-50">
          <button
            onClick={toggleNodesHandler}
            className="bg-[#003a96] text-white px-3 py-2 rounded shadow hover:bg-blue-600 focus:outline-none"
          >
            {showNodes ? 'Hide Nodes' : 'Show Nodes'}
          </button>
          <button
            onClick={toggleEdgesHandler}
            className="bg-[#003a96] text-white px-3 py-2 rounded shadow hover:bg-blue-600 focus:outline-none"
          >
            {showEdges ? 'Hide Edges' : 'Show Edges'}
          </button>
        </div>
      )} */}
      
      {/* Use the new HospitalViewControls component */}
      <HospitalViewControls 
        map={map}
        selectedDestination={selectedDestination || null}
        selectedFloor={selectedFloor}
        onFloorChange={onFloorChange}
      />
    </div>
  );
};

export default MapRenderer;