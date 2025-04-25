import {Edge, Node} from "@/components/navigation/pathfinding/Graph.ts";
import {graph} from "@/components/map/GraphObject.ts";

// Store animation state and current path references
let currentAnimationState: { intervalId: number, progress: number } | null = null;
let currentBasePath: google.maps.Polyline | null = null;
let currentGuidePath: google.maps.Polyline | null = null;

export function drawAllEdges(
    map: google.maps.Map,
    edges: Edge[]
): google.maps.Polyline[] {
    const polylines: google.maps.Polyline[] = [];

    for (const edge of edges) {
        const source: Node = edge.sourceId;
        const target: Node = edge.targetId;
        const sourceCoord: google.maps.LatLngLiteral = { lat: source.x, lng: source.y };
        const targetCoord: google.maps.LatLngLiteral = { lat: target.x, lng: target.y };

        const edgeLine = new google.maps.Polyline({
            path: [sourceCoord, targetCoord],
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 5,
        });
        edgeLine.setMap(map);

        edgeLine.addListener("dblclick", () => {
            edgeLine.setMap(null);
            graph.deleteEdge(edge.id);
            console.log(`Edge ${edge.id} removed from graph`);
        });

        polylines.push(edgeLine);
    }
    
    if(polylines.length === 0) console.log("edges not found");
    return polylines;
}

export function drawPath(map: google.maps.Map, nodes: Node[]): google.maps.Polyline | null {
    if (nodes.length < 2) return null;

    // Clear previous path if it exists
    clearCurrentPath();

    const path = nodes.map(node => ({ lat: node.x, lng: node.y }));

    // Base path (low opacity background)
    currentBasePath = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 0.2,
        strokeWeight: 8,
        zIndex: 1
    });
    currentBasePath.setMap(map);

    // Guide path (animated high opacity)
    currentGuidePath = new google.maps.Polyline({
        path: [path[0]], // Start with first point
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 8,
        zIndex: 2
    });
    currentGuidePath.setMap(map);

    // Start animation
    animatePath(currentGuidePath, path);

    return currentGuidePath;
}

function animatePath(
    line: google.maps.Polyline,
    fullPath: google.maps.LatLngLiteral[]
) {
    // Clear any existing animation
    if (currentAnimationState) {
        clearInterval(currentAnimationState.intervalId);
    }

    const duration = 3000; // 3 seconds for full animation
    const steps = 100;
    const stepTime = duration / steps;
    let step = 0;

    const intervalId = window.setInterval(() => {
        step = (step + 1) % (steps + 1); // Go slightly beyond to ensure completion
        const progress = Math.min(1, step / steps); // Cap at 1

        // Calculate how far along the full path we are
        const totalDistance = getPathLength(fullPath);
        let distanceCovered = totalDistance * progress;
        let accumulatedDistance = 0;
        let currentSegmentStart = fullPath[0];
        let currentSegmentEnd = fullPath[1];
        let segmentIndex = 1;

        // Find the current segment
        while (segmentIndex < fullPath.length) {
            const segmentDistance = getDistance(currentSegmentStart, currentSegmentEnd);
            if (accumulatedDistance + segmentDistance >= distanceCovered) break;
            
            accumulatedDistance += segmentDistance;
            currentSegmentStart = fullPath[segmentIndex];
            segmentIndex++;
            currentSegmentEnd = fullPath[segmentIndex];
        }

        // Calculate position within current segment
        const segmentProgress = segmentIndex < fullPath.length 
            ? (distanceCovered - accumulatedDistance) / getDistance(currentSegmentStart, currentSegmentEnd)
            : 1;

        const lat = currentSegmentStart.lat + (currentSegmentEnd.lat - currentSegmentStart.lat) * segmentProgress;
        const lng = currentSegmentStart.lng + (currentSegmentEnd.lng - currentSegmentStart.lng) * segmentProgress;

        // Build the path up to the current point
        const animatedPath = [fullPath[0]];
        for (let i = 1; i < segmentIndex; i++) {
            animatedPath.push(fullPath[i]);
        }
        animatedPath.push({ lat, lng });

        line.setPath(animatedPath);

        // Store progress
        currentAnimationState = { intervalId, progress };

        // Clean up when animation completes
        if (progress >= 1) {
            clearInterval(intervalId);
            currentAnimationState = null;
        }
    }, stepTime);
}

// Helper function to calculate distance between two points
function getDistance(p1: google.maps.LatLngLiteral, p2: google.maps.LatLngLiteral) {
    const R = 6371e3; // Earth radius in meters
    const φ1 = p1.lat * Math.PI/180;
    const φ2 = p2.lat * Math.PI/180;
    const Δφ = (p2.lat - p1.lat) * Math.PI/180;
    const Δλ = (p2.lng - p1.lng) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
}

// Helper function to calculate total path length
function getPathLength(path: google.maps.LatLngLiteral[]) {
    let length = 0;
    for (let i = 1; i < path.length; i++) {
        length += getDistance(path[i-1], path[i]);
    }
    return length;
}

export function clearCurrentPath() {
    if (currentAnimationState) {
        clearInterval(currentAnimationState.intervalId);
        currentAnimationState = null;
    }
    if (currentBasePath) {
        currentBasePath.setMap(null);
        currentBasePath = null;
    }
    if (currentGuidePath) {
        currentGuidePath.setMap(null);
        currentGuidePath = null;
    }
}