import {Edge, Node} from "@/components/navigation/pathfinding/Graph.ts";

// Define direction types
export enum TurnDirection {
  STRAIGHT = "straight",
  SLIGHT_RIGHT = "slight right",
  RIGHT = "right",
  SHARP_RIGHT = "sharp right",
  SLIGHT_LEFT = "slight left",
  LEFT = "left",
  SHARP_LEFT = "sharp left",
  U_TURN = "make a U-turn"
}

// Define a step in the directions
export interface DirectionStep {
  direction: TurnDirection | null; // null for the first step
  distance: number;               // in meters
  startNode: Node;
  endNode: Node;
  nodes: Node[];                  // nodes in this segment
}

// Main function to generate directions
export function generateDirections(nodes: Node[]): DirectionStep[] {
  if (nodes.length < 2) return [];
  
  const steps: DirectionStep[] = [];
  let currentSegment: Node[] = [nodes[0]];
  let currentDirection: TurnDirection | null = null;
  
  // Process each node transition
  for (let i = 1; i < nodes.length; i++) {
    const prevNode = nodes[i-1];
    const currentNode = nodes[i];
    
    // For the second node, we just continue the segment
    if (i === 1) {
      currentSegment.push(currentNode);
      continue;
    }
    
    // Get the direction from the previous two nodes to the current node
    const newDirection = determineDirection(nodes[i-2], nodes[i-1], nodes[i]);
    
    // If this is the first real direction or if the direction changed
    if (currentDirection === null || newDirection !== currentDirection) {
      // If we have an existing segment, save it
      if (currentSegment.length > 1) {
        const segmentDistance = calculatePathDistance(currentSegment);
        steps.push({
          direction: currentDirection,
          distance: segmentDistance,
          startNode: currentSegment[0],
          endNode: currentSegment[currentSegment.length - 1],
          nodes: [...currentSegment]
        });
      }
      
      // Start a new segment
      currentSegment = [nodes[i-1], currentNode];
      currentDirection = newDirection;
    } else {
      // Continue the current segment
      currentSegment.push(currentNode);
    }
  }
  
  // Add the last segment
  if (currentSegment.length > 1) {
    const segmentDistance = calculatePathDistance(currentSegment);
    steps.push({
      direction: currentDirection,
      distance: segmentDistance,
      startNode: currentSegment[0],
      endNode: currentSegment[currentSegment.length - 1],
      nodes: [...currentSegment]
    });
  }
  
  return steps;
}

// Determine direction based on three consecutive points
function determineDirection(node1: Node, node2: Node, node3: Node): TurnDirection {
  // Convert the nodes to vectors
  const vector1 = {
    x: node2.x - node1.x,
    y: node2.y - node1.y
  };
  
  const vector2 = {
    x: node3.x - node2.x,
    y: node3.y - node2.y
  };
  
  // Normalize the vectors
  const magnitude1 = Math.sqrt(vector1.x * vector1.x + vector1.y * vector1.y);
  const magnitude2 = Math.sqrt(vector2.x * vector2.x + vector2.y * vector2.y);
  
  const normalizedVector1 = {
    x: vector1.x / magnitude1,
    y: vector1.y / magnitude1
  };
  
  const normalizedVector2 = {
    x: vector2.x / magnitude2,
    y: vector2.y / magnitude2
  };
  
  // Calculate the cross product to determine left or right
  // For geographic coordinates, we need to be careful with the sign
  const crossProduct = normalizedVector1.x * normalizedVector2.y - normalizedVector1.y * normalizedVector2.x;
  
  // Calculate the dot product to determine the angle
  const dotProduct = normalizedVector1.x * normalizedVector2.x + normalizedVector1.y * normalizedVector2.y;
  
  // Calculate the angle in degrees
  let angle = Math.acos(clamp(dotProduct, -1, 1)) * (180 / Math.PI);
  
  // Determine direction based on angle and cross product
  if (angle < 10) {
    return TurnDirection.STRAIGHT;
  } else if (angle < 45) {
    return crossProduct > 0 ? TurnDirection.SLIGHT_LEFT : TurnDirection.SLIGHT_RIGHT;
  } else if (angle < 100) {
    return crossProduct > 0 ? TurnDirection.LEFT : TurnDirection.RIGHT;
  } else if (angle < 160) {
    return crossProduct > 0 ? TurnDirection.SHARP_LEFT : TurnDirection.SHARP_RIGHT;
  } else {
    return TurnDirection.U_TURN;
  }
}

// Helper function to clamp a value between min and max
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

// Calculate the distance between two nodes using the Haversine formula
export function calculateDistance(node1: Node, node2: Node): number {
  const R = 6371e3; // Earth radius in meters
  const φ1 = node1.x * Math.PI/180;
  const φ2 = node2.x * Math.PI/180;
  const Δφ = (node2.x - node1.x) * Math.PI/180;
  const Δλ = (node2.y - node1.y) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c; // Distance in meters
}

// Calculate the total distance of a path
export function calculatePathDistance(nodes: Node[]): number {
  let distance = 0;
  for (let i = 1; i < nodes.length; i++) {
    distance += calculateDistance(nodes[i-1], nodes[i]);
  }
  return distance;
}

// Format distance for display
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

// Generate human-readable directions
export function getTextDirections(steps: DirectionStep[]): string[] {
  const directions: string[] = [];
  
  steps.forEach((step, index) => {
    const formattedDistance = formatDistance(step.distance);
    
    if (index === 0) {
      directions.push(`Start by going ${formattedDistance}`);
    } else {
      directions.push(`${capitalize(step.direction!)} and continue for ${formattedDistance}`);
    }
  });
  
  directions.push("You have arrived at your destination");
  
  return directions;
}

// Helper function to capitalize the first letter
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}