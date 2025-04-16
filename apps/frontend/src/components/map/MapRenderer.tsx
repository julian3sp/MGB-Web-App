  import React, { useEffect, useRef, useState, MutableRefObject } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import {createMGBOverlays, MGBOverlays} from './overlays/MGBOverlay';
import { createPatriot20Overlays } from './overlays/20PatriotOverlay';
import { createPatriot22Overlays, updatePatriotPlace22, Patriot22Overlays } from './overlays/22PatriotOverlay';
import {createMarkers, drawAllEdges, drawPath} from './overlays/createMarkers'; // optional helper if implemented
import Graph, {Edge, Node} from '../navigation/pathfinding/Graph'; // Adjust the import path as needed

// Example TRPC hooks (adjust to your own TRPC query hooks)
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
  departmentNumber?: number | null;
}

const MapRenderer: React.FC<MapRendererProps> = ({ onMapReady, selectedDestination, onZoomChange, selectedFloor, departmentNumber }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  // For overlays (only for MGB in this example)
  const [parkingOverlay, setParkingOverlay] = useState<google.maps.GroundOverlay | null>(null);
  const [floorOverlay, setFloorOverlay] = useState<google.maps.GroundOverlay | null>(null);
  const [patriot22Overlays, setPatriot22Overlays] = useState<Patriot22Overlays | null>(null);
  const [patriot20Overlays, setPatriot20Overlays] = useState<Patriot22Overlays | null>(null);
  // Optionally, hold onto created markers (for future clearing, etc.)
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [showNodes, setShowNodes] = useState(false);
  const [showEdges, setShowEdges] = useState(false);
  const [nodeMarkers, setNodeMarkers] = useState<google.maps.Marker[]>([]);
  const [edgePolylines, setEdgePolylines] = useState<google.maps.Polyline[]>([]);

  const pathPolylineRef = useRef<google.maps.Polyline | null>(null);
  const startMarkerRef = useRef<google.maps.Marker | null>(null);
  const targetMarkerRef = useRef<google.maps.Marker | null>(null);
  
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  // Refs for overlay animations
  const parkingOpacityRef = useRef(1);
  const floorOpacityRef = useRef(0);

  if (!apiKey) {
    return <div className="text-red-500 p-4">Error: Google Maps API key is missing</div>;
  }

  // Initialize Google Map (only once)
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

  // Fetch graph data via TRPC
  const { data: nodesData, isLoading: isNodesLoading } = trpc.getAllNodes.useQuery();
  const { data: edgesData, isLoading: isEdgesLoading } = trpc.getAllEdges.useQuery();

  // console.log("nodesdata: ",nodesData);

  const toggleNodesHandler = () => {
    if (!map || isNodesLoading || isEdgesLoading || !nodesData || !edgesData) return;
    if (showNodes) {
      // If they are currently visible, remove them
      nodeMarkers.forEach(marker => marker.setMap(null));
      setNodeMarkers([]);
      setShowNodes(false);
    } else {
      // Otherwise, build and store the markers
      const graph = new Graph();
      graph.populate(nodesData, edgesData);
      const allNodes: Node[] = graph.getNodes();
      const markersCreated: google.maps.Marker[] = createMarkers(map, allNodes); // make sure createMarkers returns markers
      setNodeMarkers(markersCreated);
      setShowNodes(true);
    }
  };
  
  const toggleEdgesHandler = () => {
    if (!map || isNodesLoading || isEdgesLoading || !nodesData || !edgesData) return;
    if (showEdges) {
      // Remove the edge polylines if visible
      edgePolylines.forEach(polyline => polyline.setMap(null));
      setEdgePolylines([]);
      setShowEdges(false);
    } else {
      // Build and store the polylines
      const graph = new Graph();
      graph.populate(nodesData, edgesData);
      const allEdges: Edge[] = graph.getEdges();
      const polylinesCreated: google.maps.Polyline[] = drawAllEdges(map, allEdges); 
      setEdgePolylines(polylinesCreated);
      setShowEdges(true);
    }
  };

  useEffect(() => {
    if (
      !map ||
      !departmentNumber ||
      isNodesLoading ||
      isEdgesLoading ||
      !nodesData ||
      !edgesData
    )
      return;

    // Build the graph from TRPC data.
    const graph = new Graph();
    graph.populate(nodesData, edgesData);

    // Fixed entrance node (for example, node 941).
    const entrance = graph.getNode(941);
    const target = graph.getNode(departmentNumber);
    if (!entrance || !target) {
      console.error('Either the entrance or department node is missing');
      return;
    }

    // Compute the path with A* search.
    const pathNodes: Node[] = graph.aStar(entrance, target);

    // Clear previously drawn path if exists.
    if (pathPolylineRef.current) {
      pathPolylineRef.current.setMap(null);
      pathPolylineRef.current = null;
    }
    // Draw the new path.
    const newPolyline = drawPath(map, pathNodes);
    pathPolylineRef.current = newPolyline;

    // Clear existing markers.
    if (startMarkerRef.current) {
      startMarkerRef.current.setMap(null);
      startMarkerRef.current = null;
    }
    if (targetMarkerRef.current) {
      targetMarkerRef.current.setMap(null);
      targetMarkerRef.current = null;
    }
    // Add new markers for the start and department location.
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
  }, [map, departmentNumber, nodesData, edgesData, isNodesLoading, isEdgesLoading]);
  
  // Existing overlay logic for selectedDestination
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
    if (patriot22Overlays) {
      patriot22Overlays.floor3Overlay.setMap(null);
      patriot22Overlays.floor4Overlay.setMap(null);
      setPatriot22Overlays(null);
    }
    
    if (selectedDestination) {
      if (selectedDestination.name === "MGB (Chestnut Hill)") {
        const overlays: MGBOverlays = createMGBOverlays(map);
        setParkingOverlay(overlays.parkingOverlay);
        setFloorOverlay(overlays.floorOverlay);
        // addDraggableMarker(map, {
        //   lat: 42.32574519161382,
        //   lng: -71.14923688279762,
        // });
      } else if (selectedDestination.name === "20 Patriot Place") {
        createPatriot20Overlays(map);
        // addDraggableMarker(map, {
        //   lat: 42.09268500610588,
        //   lng: -71.26550646809393,
        // });
      } else if (selectedDestination.name === "22 Patriot Place") {
        const overlays = createPatriot22Overlays(map);
        setPatriot22Overlays(overlays);
      }
    }

    // Only run this effect when selectedDestination or map changes.
  }, [selectedDestination, map]);
  

  // 22 Patriot Place overlays update on floor change
  useEffect(() => {
    if (!map || !patriot22Overlays) return;
    updatePatriotPlace22(patriot22Overlays, selectedFloor || 3);
    const patriotZoomListener = map.addListener('zoom_changed', () => {
      const zoom = map.getZoom();
      if (onZoomChange) onZoomChange(zoom || 0);
    });
    return () => google.maps.event.removeListener(patriotZoomListener);
  }, [selectedFloor, map, patriot22Overlays, onZoomChange]);

  // Zoom event handling for MGB overlays opacity animation
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

  return (
    <div ref={mapRef} style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {map && (
        <div className="absolute top-30 right-1 flex flex-col  z-50">
          <button
            onClick={toggleNodesHandler}
            className="bg-[#003a96] text-white px-3 py-2 shadow hover:bg-blue-600 focus:outline-none"
          >
            {showNodes ? 'Hide Nodes' : 'Show Nodes'}
          </button>
          <button
            onClick={toggleEdgesHandler}
            className="bg-[#003a96] text-white px-3 py-2 shadow hover:bg-blue-600 focus:outline-none"
          >
            {showEdges ? 'Hide Edges' : 'Show Edges'}
          </button>
        </div>
      )}
    </div>
  )
};

export default MapRenderer;
