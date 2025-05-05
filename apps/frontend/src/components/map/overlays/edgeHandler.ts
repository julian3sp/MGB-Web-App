import {Edge, Node} from "@/components/navigation/pathfinding/Graph.ts";
import {graph} from "@/components/map/GraphObject.ts";

// Store animation state and current path references
let animationIntervalId: number | null = null;
let currentBasePath: google.maps.Polyline | null = null;
let currentGuidePath: google.maps.Polyline | null = null;


export interface EdgeLayer {
    layers: google.maps.Polyline[];
    edge: Edge;
}

export function makeStroke(
    map: google.maps.Map,
    path: google.maps.LatLngLiteral[],
    color: string,
    weight: number,
    z: number,
    clickable = false
): google.maps.Polyline {
    return new google.maps.Polyline({
        map,
        path,
        geodesic: true,
        strokeColor: color,
        strokeOpacity: 1,
        strokeWeight: weight,
        zIndex: z,
        clickable,
    });
}

export const COLORS = {
    border: 'rgba(255,255,255,0.9)',
    core: '#A6192E',
    arrow: '#FFC72C',
};

export const BORDER_WEIGHT = 10;
export const CORE_WEIGHT   = 6;
export const BORDER_HOVER  = 14;
export const CORE_HOVER    = 10;

let arrowTimerId: number | null = null;
let animatedOverlays: google.maps.Polyline[] = [];

// Animation


/** stop & clean up whenever you redraw edges */
export function clearEdgeAnimation() {
    if (arrowTimerId !== null) {
        clearInterval(arrowTimerId);
        arrowTimerId = null;
    }
    animatedOverlays = [];
}


export function drawAllEdges(
    map: google.maps.Map,
    edges: Edge[]
): EdgeLayer[] {
    // clearEdgeAnimation();

    const ARROW_SYMBOL: google.maps.Symbol = {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        strokeColor: COLORS.arrow,
        strokeWeight: 1,
        fillColor: COLORS.arrow,
        fillOpacity: 1,
        scale: 3, //
    };

    function startEdgeAnimation(overlays: google.maps.Polyline[]) {
        animatedOverlays = overlays;
        let offset = 0;

        if (arrowTimerId !== null) clearInterval(arrowTimerId);

        arrowTimerId = window.setInterval(() => {
            offset = (offset + 2) % 100;            // 0 → 98 %
            const offStr = `${offset}%`;

            for (const pl of animatedOverlays) {
                pl.set("icons", [{
                    icon: ARROW_SYMBOL,
                    offset: offStr,
                    repeat: "100px",
                }]);
            }
        }, 120);                                  // speed (ms)  ← tweak here
    }


    const edgeComponents: EdgeLayer[] = [];
    const overlays: google.maps.Polyline[] = [];


    for (const edge of edges) {
        const source: Node = edge.sourceId;
        const target: Node = edge.targetId;
        const sourceCoord: google.maps.LatLngLiteral = { lat: source.x, lng: source.y };
        const targetCoord: google.maps.LatLngLiteral = { lat: target.x, lng: target.y };

        const path = [sourceCoord, targetCoord];

        const border  = makeStroke(map, path, COLORS.border, BORDER_WEIGHT, 1);
        const core    = makeStroke(map, path, COLORS.core,    CORE_WEIGHT, 2, true);

        // 3) animated arrow overlay (very thin, so arrows sit inside the core)
        const overlay = new google.maps.Polyline({
            map,
            path,
            geodesic: true,
            strokeOpacity: 0,
            zIndex: 3,
            clickable: false,
            // icons: [{ icon: ARROW_SYMBOL, offset: '0%', repeat: '20%' }],
        });

        //Attach the poly lines to the edge object
        edge.border = border;
        edge.core = core;
        edge.overlay = overlay;

        overlays.push(overlay);

        // allow dbl-click to remove everything
        core.addListener('dblclick', () => {
            [border, core, overlay].forEach(pl => pl.setMap(null));
            graph.deleteEdge(edge.id);
        });

        core.addListener("mouseover", () => {
            border.setOptions({ strokeWeight: BORDER_HOVER });
            core  .setOptions({ strokeWeight: CORE_HOVER   });
        });

        // 2) on mouseout: restore to original
        core.addListener("mouseout", () => {
            border.setOptions({ strokeWeight: BORDER_WEIGHT });
            core  .setOptions({ strokeWeight: CORE_WEIGHT   });
        });

        // startEdgeAnimation(overlays);
        edgeComponents.push({edge: edge, layers: [border, core, overlay] }); // return only the main visible line
    }

    if (edgeComponents.length === 0) console.log('edges not found');
    return edgeComponents;
}


// draw path for navigation
export function drawPath(map: google.maps.Map, nodes: Node[]): google.maps.Polyline | null {
    if (nodes.length < 2) return null;

    // Clear previous path if it exists
    clearCurrentPath();

    const path = nodes.map(node => ({ lat: node.x, lng: node.y }));

    // Base path
    currentBasePath = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: "#0A1F5C",
        strokeOpacity: 1.0,
        strokeWeight: 10,
        zIndex: 1
    });
    currentBasePath.setMap(map);

    // middle layer
    const middleLayer = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: "#1E3A8A", // Medium blue
        strokeOpacity: 1.0,
        strokeWeight: 6,
        zIndex: 2
    });
    middleLayer.setMap(map);

    // Top highlight layer
    const highlightLayer = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: "#2563EB", // Brighter blue for top highlight
        strokeOpacity: 0.7,
        strokeWeight: 3,
        zIndex: 3
    });
    highlightLayer.setMap(map);

    // Store all path elements for later cleanup
    currentPathElements = [currentBasePath, middleLayer, highlightLayer];

    // Create and animate arrows
    animateArrows(map, path);

    return currentBasePath;
}

let arrowMarkers: google.maps.Marker[] = [];
let arrowAnimationId: number | null = null;

function animateArrows(map: google.maps.Map, path: google.maps.LatLngLiteral[]) {
    clearArrows();

    const arrowIconBase: google.maps.Symbol = {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        scale: 3.5,
        strokeColor: "#7DD3FC",
        strokeWeight: 2,
        fillColor: "#38BDF8",
        fillOpacity: 0.9,
        rotation: 0
    };

    const numArrows = 5;
    const totalPathLength = calculatePathLength(path);
    const arrowSpacing = totalPathLength / numArrows;

    // Create arrow markers
    for (let i = 0; i < numArrows; i++) {
        const marker = new google.maps.Marker({
            position: path[0],
            map,
            icon: { ...arrowIconBase },
            zIndex: 4,
            optimized: true
        });
        arrowMarkers.push(marker);
    }

    let step = 0;
    const speed = 0.09; // Increase this for faster movement

    function animateStep() {
        step = (step + speed) % totalPathLength;

        for (let i = 0; i < numArrows; i++) {
            const arrowDistance = (step + i * arrowSpacing) % totalPathLength;
            const { position, heading } = getPointAtDistance(path, arrowDistance);

            const marker = arrowMarkers[i];
            if (marker) {
                marker.setPosition(position);
                marker.setIcon({
                    ...arrowIconBase,
                    rotation: heading
                });
            }
        }

        arrowAnimationId = requestAnimationFrame(animateStep);
    }

    arrowAnimationId = requestAnimationFrame(animateStep);
}

function calculatePathLength(path: google.maps.LatLngLiteral[]): number {
    let length = 0;
    for (let i = 1; i < path.length; i++) {
        length += google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(path[i - 1].lat, path[i - 1].lng),
            new google.maps.LatLng(path[i].lat, path[i].lng)
        );
    }
    return length;
}

function getPointAtDistance(path: google.maps.LatLngLiteral[], distance: number): { position: google.maps.LatLngLiteral, heading: number } {
    let accDistance = 0;

    for (let i = 1; i < path.length; i++) {
        const start = new google.maps.LatLng(path[i - 1].lat, path[i - 1].lng);
        const end = new google.maps.LatLng(path[i].lat, path[i].lng);
        const segmentLength = google.maps.geometry.spherical.computeDistanceBetween(start, end);

        if (accDistance + segmentLength >= distance) {
            const ratio = (distance - accDistance) / segmentLength;

            const lat = path[i - 1].lat + ratio * (path[i].lat - path[i - 1].lat);
            const lng = path[i - 1].lng + ratio * (path[i].lng - path[i - 1].lng);
            const heading = google.maps.geometry.spherical.computeHeading(start, end);

            return {
                position: { lat, lng },
                heading
            };
        }

        accDistance += segmentLength;
    }

    const lastIdx = path.length - 1;
    const secondLastIdx = path.length - 2;

    return {
        position: path[lastIdx],
        heading: google.maps.geometry.spherical.computeHeading(
            new google.maps.LatLng(path[secondLastIdx].lat, path[secondLastIdx].lng),
            new google.maps.LatLng(path[lastIdx].lat, path[lastIdx].lng)
        )
    };
}

// Cleanup
let currentPathElements: google.maps.Polyline[] = [];

function clearCurrentPath() {
    if (currentPathElements) {
        currentPathElements.forEach(element => element.setMap(null));
        currentPathElements = [];
    }
    clearArrows();
}

function clearArrows() {
    if (arrowAnimationId !== null) {
        cancelAnimationFrame(arrowAnimationId);
        arrowAnimationId = null;
    }

    arrowMarkers.forEach(marker => marker.setMap(null));
    arrowMarkers = [];
}

function animatePathInfinite(
    line: google.maps.Polyline,
    fullPath: google.maps.LatLngLiteral[]
) {
    // Clear any existing animation
    if (animationIntervalId !== null) {
        clearInterval(animationIntervalId);
        animationIntervalId = null;
    }

    const duration = 2000; // 2 seconds for full animation
    const steps = 100;
    const stepTime = duration / steps;
    let step = 0;

    const animateStep = () => {
        step = (step + 1) % (steps + 1); // Loop back after completion
        const progress = step / steps;

        // Calculate how far along the full path we are
        const totalDistance = getPathLength(fullPath);
        const distanceCovered = totalDistance * progress;
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
            if (segmentIndex < fullPath.length) {
                currentSegmentEnd = fullPath[segmentIndex];
            }
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
    };

    // Start the animation
    animationIntervalId = window.setInterval(animateStep, stepTime);
    
    // Run first frame immediately
    animateStep();
}

// Helper function to calculate distance between two points
function getDistance(p1: google.maps.LatLngLiteral, p2: google.maps.LatLngLiteral): number {
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
function getPathLength(path: google.maps.LatLngLiteral[]): number {
    let length = 0;
    for (let i = 1; i < path.length; i++) {
        length += getDistance(path[i-1], path[i]);
    }
    return length;
}

// export function clearCurrentPath() {
//     if (animationIntervalId !== null) {
//         clearInterval(animationIntervalId);
//         animationIntervalId = null;
//     }
//     if (currentBasePath) {
//         currentBasePath.setMap(null);
//         currentBasePath = null;
//     }
//     if (currentGuidePath) {
//         currentGuidePath.setMap(null);
//         currentGuidePath = null;
//     }
// }