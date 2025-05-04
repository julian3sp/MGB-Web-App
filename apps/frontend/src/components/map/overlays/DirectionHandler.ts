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
    const MIN_ANGLE_FOR_TURN = 15; // Minimum degrees to consider it a turn
    const MAX_STRAIGHT_DISTANCE = 30; // Meters to combine straight segments

    let currentSegment: Node[] = [nodes[0]];
    let accumulatedDistance = 0;
    let lastDirection: TurnDirection | null = null;

    for (let i = 1; i < nodes.length; i++) {
        const prevNode = nodes[i - 1];
        const currentNode = nodes[i];

        // Check for floor change
        if (prevNode.floor !== currentNode.floor) {
            if (currentSegment.length > 1) {
                steps.push(createRegularStep(currentSegment, lastDirection || TurnDirection.STRAIGHT));
            }
            steps.push(createFloorChangeStep(prevNode, currentNode, isElevatorNode(prevNode) ? 'elevator' : 'stairs'));
            currentSegment = [currentNode];
            accumulatedDistance = 0;
            lastDirection = null;
            continue;
        }

        const distance = calculateDistance(prevNode, currentNode);
        accumulatedDistance += distance;

        // Only calculate direction if we have 3 consecutive nodes
        if (i >= 2) {
            const direction = determineDirection(nodes[i - 2], nodes[i - 1], nodes[i]);

            // If direction hasn't changed significantly, continue straight
            if (lastDirection &&
                Math.abs(getTurnAngle(direction) - getTurnAngle(lastDirection)) < MIN_ANGLE_FOR_TURN) {
                currentSegment.push(currentNode);
                continue;
            }

            // If we have a straight segment that's not too long, continue it
            if (direction === TurnDirection.STRAIGHT && accumulatedDistance < MAX_STRAIGHT_DISTANCE) {
                currentSegment.push(currentNode);
                continue;
            }

            // Finalize current segment if it has meaningful distance
            if (currentSegment.length > 1 && accumulatedDistance >= 5) {
                steps.push(createRegularStep(currentSegment, lastDirection || TurnDirection.STRAIGHT));
            }

            // Start new segment
            currentSegment = [prevNode, currentNode];
            lastDirection = direction;
            accumulatedDistance = distance;
        } else {
            currentSegment.push(currentNode);
        }
    }

    // Add final segment
    if (currentSegment.length > 1) {
        steps.push(createRegularStep(currentSegment, lastDirection || TurnDirection.STRAIGHT));
    }

    return simplifyDirections(steps);
}

// Helper to get numeric angle value from direction
function getTurnAngle(direction: TurnDirection): number {
    switch (direction) {
        case TurnDirection.SHARP_LEFT: return -135;
        case TurnDirection.LEFT: return -90;
        case TurnDirection.SLIGHT_LEFT: return -30;
        case TurnDirection.STRAIGHT: return 0;
        case TurnDirection.SLIGHT_RIGHT: return 30;
        case TurnDirection.RIGHT: return 90;
        case TurnDirection.SHARP_RIGHT: return 135;
        case TurnDirection.U_TURN: return 180;
        default: return 0;
    }
}

// Simplify directions by combining similar segments
function simplifyDirections(steps: DirectionStep[]): DirectionStep[] {
    const simplified: DirectionStep[] = [];
    let currentStraightDistance = 0;
    let straightStartNode: Node | null = null;

    for (const step of steps) {
        if (step.isFloorChange) {
            // Push any accumulated straight distance first
            if (currentStraightDistance > 0 && straightStartNode) {
                simplified.push(createRegularStep(
                    [straightStartNode, step.startNode],
                    TurnDirection.STRAIGHT
                ));
                currentStraightDistance = 0;
            }
            simplified.push(step);
            straightStartNode = step.endNode;
            continue;
        }

        if (step.instruction === TurnDirection.STRAIGHT) {
            currentStraightDistance += parseFloat(step.distance);
            if (!straightStartNode) {
                straightStartNode = step.startNode;
            }
        } else {
            // Push any accumulated straight distance first
            if (currentStraightDistance > 0 && straightStartNode) {
                simplified.push(createRegularStep(
                    [straightStartNode, step.startNode],
                    TurnDirection.STRAIGHT
                ));
                currentStraightDistance = 0;
            }
            simplified.push(step);
            straightStartNode = step.endNode;
        }
    }

    // Add any remaining straight distance
    if (currentStraightDistance > 0 && straightStartNode) {
        const lastNode = steps[steps.length - 1].endNode;
        simplified.push(createRegularStep(
            [straightStartNode, lastNode],
            TurnDirection.STRAIGHT
        ));
    }

    return simplified;
}

// Updated determineDirection to be more forgiving
function determineDirection(node1: Node, node2: Node, node3: Node): TurnDirection {
    // Convert to vectors
    const vec1 = { x: node2.x - node1.x, y: node2.y - node1.y };
    const vec2 = { x: node3.x - node2.x, y: node3.y - node2.y };

    // Calculate angle between vectors (in degrees)
    const angle = Math.atan2(vec2.y, vec2.x) - Math.atan2(vec1.y, vec1.x);
    let degrees = (angle * 180) / Math.PI;

    // Normalize to -180 to 180 range
    degrees = ((degrees + 540) % 360) - 180;

    // More forgiving thresholds for turns
    if (Math.abs(degrees) < 15) return TurnDirection.STRAIGHT;
    if (degrees > 15 && degrees <= 60) return TurnDirection.SLIGHT_RIGHT;
    if (degrees > 60 && degrees <= 120) return TurnDirection.RIGHT;
    if (degrees > 120) return TurnDirection.SHARP_RIGHT;
    if (degrees < -15 && degrees >= -60) return TurnDirection.SLIGHT_LEFT;
    if (degrees < -60 && degrees >= -120) return TurnDirection.LEFT;
    if (degrees < -120) return TurnDirection.SHARP_LEFT;

    return TurnDirection.STRAIGHT;
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

// Helper function to clamp a value between min and max
function clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value))
}

// Update calculateDistance to use proper scale
export function calculateDistance(node1: Node, node2: Node): number {
    // Assuming coordinates are in degrees (latitude/longitude)
    const R = 6371000; // Earth radius in meters
    const dLat = (node2.x - node1.x) * Math.PI / 180;
    const dLon = (node2.y - node1.y) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(node1.x * Math.PI / 180) *
        Math.cos(node2.x * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
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

    if (!steps.length) return out;

    let justChangedFloor = false;
    let lastNode: "stairs" | "elevator" = "stairs";

    steps.forEach((step, idx) => {
        const { startNode, endNode, distance } = step;
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
        if (idx === 0) {
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
