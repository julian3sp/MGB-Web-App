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

function makeStroke(
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

const COLORS = {
    border: 'rgba(255,255,255,0.9)',
    core: '#A6192E',
    arrow: '#FFC72C',
};

const BORDER_WEIGHT = 10;
const CORE_WEIGHT   = 6;
const BORDER_HOVER  = 14;
const CORE_HOVER    = 10;

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

    // Start infinite animation
    animatePathInfinite(currentGuidePath, path);

    return currentGuidePath;
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

export function clearCurrentPath() {
    if (animationIntervalId !== null) {
        clearInterval(animationIntervalId);
        animationIntervalId = null;
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