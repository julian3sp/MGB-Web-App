import {Edge, Node} from "@/components/navigation/pathfinding/Graph.ts";
import {drawPath, clearCurrentPath} from "./edgeHandler.ts";
import {
  generateDirections, 
  getTextDirections, 
  formatDistance,
  calculatePathDistance,
  DirectionStep
} from "./DirectionHandler.ts";

// Example of how to integrate directions with your existing code
export function showRouteWithDirections(map: google.maps.Map, nodes: Node[]) {
  // Draw the animated path as before
  const path = drawPath(map, nodes);
  
  // Generate turn-by-turn directions
  const directionSteps = generateDirections(nodes);
  
  // Get text directions
  const textDirections = getTextDirections(directionSteps);
  
  // Calculate total distance
  const totalDistance = calculatePathDistance(nodes);
  const formattedTotalDistance = formatDistance(totalDistance);
  
  console.log(`Total route distance: ${formattedTotalDistance}`);
  console.log("Turn-by-turn directions:");
  textDirections.forEach((direction, index) => {
    console.log(`${index + 1}. ${direction}`);
  });
  
  // You can now display these directions in your UI
  displayDirectionsInUI(textDirections, formattedTotalDistance);
  
  return {
    path,
    directions: textDirections,
    steps: directionSteps,
    totalDistance: formattedTotalDistance
  };
}

// Example function to display directions in a sidebar or panel
function displayDirectionsInUI(directions: string[], totalDistance: string) {
  // This is just a placeholder - implement according to your UI
  const directionsPanel = document.getElementById('directions-panel');
  
  if (directionsPanel) {
    directionsPanel.innerHTML = '';
    
    // Add total distance header
    const distanceHeader = document.createElement('h3');
    distanceHeader.textContent = `Total distance: ${totalDistance}`;
    directionsPanel.appendChild(distanceHeader);
    
    // Add directions list
    const directionsList = document.createElement('ol');
    directions.forEach(direction => {
      const listItem = document.createElement('li');
      listItem.textContent = direction;
      directionsList.appendChild(listItem);
    });
    
    directionsPanel.appendChild(directionsList);
  }
}

// Example of how you might show the current direction during animation
export function highlightCurrentDirection(
  map: google.maps.Map, 
  steps: DirectionStep[], 
  progress: number
) {
  // Calculate which step we're currently on based on animation progress (0-1)
  const totalDistance = steps.reduce((sum, step) => sum + step.distance, 0);
  let distanceCovered = totalDistance * progress;
  
  let currentStepIndex = 0;
  let accumulatedDistance = 0;
  
  for (let i = 0; i < steps.length; i++) {
    if (accumulatedDistance + steps[i].distance > distanceCovered) {
      currentStepIndex = i;
      break;
    }
    accumulatedDistance += steps[i].distance;
  }
  
  // Update the UI to highlight the current direction
  highlightDirectionInUI(currentStepIndex);
}

// Example function to highlight the current direction in the UI
function highlightDirectionInUI(stepIndex: number) {
  // This is just a placeholder - implement according to your UI
  const directionItems = document.querySelectorAll('#directions-panel ol li');
  
  directionItems.forEach((item, index) => {
    if (index === stepIndex) {
      item.classList.add('current-direction');
    } else {
      item.classList.remove('current-direction');
    }
  });
}