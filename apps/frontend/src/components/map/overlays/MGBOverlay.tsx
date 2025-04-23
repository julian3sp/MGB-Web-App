import chestnutHillOverlayImg from '../../../../assets/ChestnutHillParkingLots.png';
// import chestnutFloorPlanOverlay from '../../../../assets/chestnut_rotated.png';
import chestnutFloorPlanOverlay from '../../../../assets/chest_rotated.png';
import {Node} from "../../navigation/pathfinding/Graph"

export interface MGBOverlays {
  parkingOverlay: google.maps.GroundOverlay;
  floorOverlay: google.maps.GroundOverlay;
  navigationPolyline?: google.maps.Polyline;
  markers?: google.maps.Marker[];
}

// Creates the base overlays (parking and floor plan).
export const createMGBOverlays = (map: google.maps.Map): MGBOverlays => {
  // Parking overlay bounds 
  const parkingBounds = {
    north: 42.3264419932353,
    south: 42.32548193483691,
    east: -71.14910160190563,
    west: -71.15016364918158,
  };

  // Hospital floor plan overlay bounds
  // Coordinates: [Top Right, Bottom Right, Bottom Left, Top Left]
  // const lats = [42.32625842, 42.32572777, 42.32568042, 42.32620219];
  // const lngs = [-71.14927255, -71.14922327, -71.15009599, -71.15015318];
  //
  // const floorBounds = {
  //   north: Math.max(...lats),
  //   south: Math.min(...lats),
  //   east: Math.max(...lngs),
  //   west: Math.min(...lngs),
  // };

  const coordinates_3: number[] = [42.326699937545584 , 42.32542932116046 , -71.14887598191709 , -71.15036909225422]

  const floorBounds = {
    north: coordinates_3[0],
    south: coordinates_3[1],
    east: coordinates_3[2],
    west: coordinates_3[3],
  };

  // Create parking overlay
  const parkingOverlay = new google.maps.GroundOverlay(
    chestnutHillOverlayImg,
    parkingBounds,
    { clickable: false,
      opacity: 1 }
  );
  parkingOverlay.setMap(map);

  // Create hospital floor plan overlay
  const floorOverlay = new google.maps.GroundOverlay(
    chestnutFloorPlanOverlay,
    floorBounds,

    { clickable: false,
      opacity: 1 }
  );
  floorOverlay.setMap(map);

  return { parkingOverlay, floorOverlay };
};

// Helper function to update the department path (draw a polyline from the top entrance to the destination)
// In your overlays/MGBOverlay.tsx file
export const updateDepartmentPath = (
    overlays: MGBOverlays,
    map: google.maps.Map,
    pathNodes: Node[]
) => {
  // Remove any existing department path polyline.
  if (overlays.navigationPolyline) {
    overlays.navigationPolyline.setMap(null);
  }

  if (overlays.markers) {
    overlays.markers.forEach(marker => marker.setMap(null));
  }

  // Correct coordinate mapping: x is latitude, y is longitude.
  const pathCoordinates = pathNodes.map((node) => ({
    lat: node.x,
    lng: node.y,
  }));

  console.log('Path coordinates:', pathCoordinates);

  // Create a new polyline connecting the computed path nodes.
  const navigationPolyline = new google.maps.Polyline({
    path: pathCoordinates,
    geodesic: true,
    strokeColor: '#FF0000', // Corrected to six-digit hex code for red.
    strokeOpacity: 1,
    strokeWeight: 3,
  });
  navigationPolyline.setMap(map);

  // Update the overlays object.
  overlays.navigationPolyline = navigationPolyline;

  if (pathCoordinates.length > 0) {
    const startMarker = new google.maps.Marker({
      position: pathCoordinates[0],
      map: map,
      title: 'Start',
      icon: { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' },
    });
    const endMarker = new google.maps.Marker({
      position: pathCoordinates[pathCoordinates.length - 1],
      map: map,
      title: 'Destination',
      icon: { url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' },
    });

    overlays.markers = [startMarker, endMarker];
  }
  if (pathCoordinates.length > 0) {
    const bounds = new google.maps.LatLngBounds();
    pathCoordinates.forEach(coord => bounds.extend(coord));
    map.fitBounds(bounds);
  }
};



export const removeMGBOverlays = (overlays: MGBOverlays) => {
  overlays.parkingOverlay.setMap(null);
  overlays.floorOverlay.setMap(null);
  if (overlays.navigationPolyline) {
    overlays.navigationPolyline.setMap(null);
  }
  if (overlays.markers) {
    overlays.markers.forEach(marker => marker.setMap(null));
  }
};

export const setDepartmentOverlaysVisibility = (
  overlays: MGBOverlays,
  visible: boolean
) => {
  if (overlays.navigationPolyline) {
    overlays.navigationPolyline.setVisible(visible);
  }
  if (overlays.markers) {
    overlays.markers.forEach(marker => marker.setVisible(visible));
  }
};
