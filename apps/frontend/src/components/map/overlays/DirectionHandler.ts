import { Edge, Node, NodeType } from "@/components/navigation/pathfinding/Graph";

export enum TurnDirection {
    STRAIGHT = "Continue straight",
    SLIGHT_RIGHT = "Turn slight right",
    RIGHT = "Turn right",
    SHARP_RIGHT = "Turn sharp right",
    SLIGHT_LEFT = "Turn slight left",
    LEFT = "Turn left",
    SHARP_LEFT = "Turn sharp left",
    U_TURN = "Make a U-turn"
}

export interface DirectionStep {
    instruction: string;
    distance: string;
    startNode: Node;
    endNode: Node;
    floor: number;
    isFloorChange: boolean;
    changeType?: 'stairs' | 'elevator';
    nodes?: Node[];
    directions?: string;
    onActivate?: () => void;
}

export interface RouteWithDirectionResult {
    path: google.maps.Polyline;
    directions: string[];
    steps: DirectionStep[];
    totalDistance: string;
    currentFloor: number;
    currentStep: number;
}

export function generateDirections(nodes: Node[]): DirectionStep[] {
    if (nodes.length < 2) return [];
    const steps: DirectionStep[] = [];

    let currentSegment: Node[] = [nodes[0]];
    let currentDirection: TurnDirection = TurnDirection.STRAIGHT;

    for (let i = 1; i < nodes.length; i++) {
        const prevNode = nodes[i - 1]
        const currentNode = nodes[i];

        // check for floor change
        if (prevNode.floor !== currentNode.floor) {
            // finalize current segment if not empty
            if (currentSegment.length > 1) {
                steps.push(createRegularStep(currentSegment, currentDirection))
            }

            // create floor change step
            const changeType = isElevatorNode(prevNode) ? 'elevator' : 'stairs';
            steps.push(createFloorChangeStep(prevNode, currentNode, changeType));

            // start new segment
            currentSegment = [currentNode];
            currentDirection = TurnDirection.STRAIGHT;
            continue;
        }

        // regular movement
        const newDirection = determineDirection(
            nodes[Math.max(0, i - 2)],
            nodes[i - 1],
            nodes[i]
        )

        if (i > 1 && newDirection !== currentDirection) {
            if (currentSegment.length > 1) {
                steps.push(createRegularStep(currentSegment, currentDirection));
            }
            currentSegment = [nodes[i - 1], nodes[i]];
            currentDirection = newDirection;
        } else {
            currentSegment.push(nodes[i])
        }
    }

    // add final segment
    if (currentSegment.length > 1) {
        steps.push(createRegularStep(currentSegment, currentDirection));
    }

    return steps;
}

function createRegularStep(nodes: Node[], direction: TurnDirection): DirectionStep {
    const distance = calculatePathDistance(nodes);
    return {
        instruction: direction,
        distance: formatDistance(distance),
        startNode: nodes[0],
        endNode: nodes[nodes.length - 1],
        floor: nodes[0].floor,
        isFloorChange: false
    };
}

function createFloorChangeStep(fromNode: Node, toNode: Node, changeType: 'stairs' | 'elevator'): DirectionStep {
    return {
        instruction: changeType === 'elevator'
            ? `Take the elevator to floor ${toNode.floor}`
            : `Use the stairwell to floor ${toNode.floor}`,
        distance: '0', // floor changes have no distance
        startNode: fromNode,
        endNode: toNode,
        floor: fromNode.floor, // starting floor
        isFloorChange: true,
        changeType
    };
}


function isElevatorNode(node: Node): boolean {
    return node.type === NodeType.Elevator;
}

function determineDirection(node1: Node, node2: Node, node3: Node): TurnDirection {
    // Convert to vectors
    const vec1 = { x: node2.x - node1.x, y: node2.y - node1.y };
    const vec2 = { x: node3.x - node2.x, y: node3.y - node2.y };
  
    // Calculate angle between vectors (in degrees)
    const angle = Math.atan2(vec2.y, vec2.x) - Math.atan2(vec1.y, vec1.x);
    let degrees = (angle * 180) / Math.PI;
    
    // Normalize to -180 to 180 range
    degrees = ((degrees + 540) % 360) - 180;
  
    // Determine direction based on angle
    if (Math.abs(degrees) < 10) return TurnDirection.STRAIGHT;
    if (degrees > 10 && degrees <= 45) return TurnDirection.SLIGHT_RIGHT;
    if (degrees > 45 && degrees <= 135) return TurnDirection.RIGHT;
    if (degrees > 135) return TurnDirection.SHARP_RIGHT;
    if (degrees < -10 && degrees >= -45) return TurnDirection.SLIGHT_LEFT;
    if (degrees < -45 && degrees >= -135) return TurnDirection.LEFT;
    if (degrees < -135) return TurnDirection.SHARP_LEFT;
    
    return TurnDirection.STRAIGHT;
  }

// Helper function to clamp a value between min and max
function clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value))
}

// Update calculateDistance to use proper scale
export function calculateDistance(node1: Node, node2: Node): number {
    // Assuming coordinates are in degrees (latitude/longitude)
    const R = 6371000; // Earth radius in meters
    const dLat = (node2.x - node1.x) * Math.PI/180;
    const dLon = (node2.y - node1.y) * Math.PI/180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(node1.x * Math.PI/180) * 
      Math.cos(node2.x * Math.PI/180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// calculate the total distance of a path 
export function calculatePathDistance(nodes: Node[]): number {
    let distance = 0;
    for (let i = 1; i < nodes.length; i++) {
        distance += calculateDistance(nodes[i - 1], nodes[i]);
    }
    return distance;
}

// format distance for display
export function formatDistance(meters: number): string {
    if (meters < 10) {
        return `${Math.round(meters)} meters`;
    } else if (meters < 1000) {
        return `${Math.round(meters / 10) * 10} meters`;
    } else {
        const miles = meters / 1609.34;
        return `${miles.toFixed(1)} miles`;
    }
}

export function getTextDirections(steps: DirectionStep[]): string[] {
    const out: string[] = [];

    if(!steps.length) return out;

    let justChangedFloor = false;
    let lastNode: "stairs" | "elevator" = "stairs";

    steps.forEach((step, idx) => {
        const {startNode, endNode, distance} = step;
        const distText = formatDistance(parseFloat(distance));

        // floor change
        if (step.isFloorChange && step.changeType) {
            out.push(`Take the ${lastNode} from floor ${startNode.floor} to floor ${endNode.floor}.`);
            out.push(`View floor ${endNode.floor} map to continue.`);
            justChangedFloor = true;
            return;
        }

        // first step after floor change
        if (justChangedFloor) {
            out.push(`Get off the ${lastNode} and continue for ${distText}.`);
            justChangedFloor = false;
            return;
        }

        // normal floor
        if(idx === 0) {
            out.push(`Head straight for ${distText}.`);
        } else {
            // use the instruction field instead of direction 
            out.push(`${capitalize(step.instruction)} and continue for ${distText}.`);
        }
    });

    out.push("You have arrived at your destination.");
    return out;
}

function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
