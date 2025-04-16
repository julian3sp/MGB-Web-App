// src/overlays/MGBOverlay.ts

import chestnutHillOverlayImg from '../../../../assets/ChestnutHillParkingLots.png';
import chestnutFloorPlanOverlay from '../../../../assets/chestnut_rotated.png';

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
  const lats = [42.32625842, 42.32572777, 42.32568042, 42.32620219];
  const lngs = [-71.14927255, -71.14922327, -71.15009599, -71.15015318];
  const floorBounds = {
    north: Math.max(...lats),
    south: Math.min(...lats),
    east: Math.max(...lngs),
    west: Math.min(...lngs),
  };

  // Create parking overlay
  const parkingOverlay = new google.maps.GroundOverlay(
    chestnutHillOverlayImg,
    parkingBounds,
    { opacity: 1 }
  );
  parkingOverlay.setMap(map);

  // Create hospital floor plan overlay
  const floorOverlay = new google.maps.GroundOverlay(
    chestnutFloorPlanOverlay,
    floorBounds,
    { opacity: 1 }
  );
  floorOverlay.setMap(map);

  return { parkingOverlay, floorOverlay };
};

// Helper function to update the department path (draw a polyline from the top entrance to the destination)
export const updateDepartmentPath = (
  overlays: MGBOverlays,
  map: google.maps.Map,
  destinationCoord: google.maps.LatLngLiteral
) => {
  // Fixed top entrance coordinate:
  const frontEntrance: google.maps.LatLngLiteral = {
    lat: 42.326240100768885,
    lng: -71.14954354546266,
  };

  // Remove any existing department path polyline.
  if (overlays.navigationPolyline) {
    overlays.navigationPolyline.setMap(null);
  }

  if (overlays.markers) {
    overlays.markers.forEach(marker => marker.setMap(null));
  }

  // Create a new polyline connecting the top entrance with the destination.
  const navigationPolyline = new google.maps.Polyline({
    path: [frontEntrance, destinationCoord],
    geodesic: true,
    strokeColor: '#FF000',
    strokeOpacity: 1,
    strokeWeight: 3,
  });
  navigationPolyline.setMap(map);

  // Update the overlays object.
  overlays.navigationPolyline = navigationPolyline;

  const frontMarker = new google.maps.Marker({
    position: frontEntrance,
    map: map,
    title: 'Front Entrance',
    icon: { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' },
  });

  const deptMarker = new google.maps.Marker({
    position: destinationCoord,
    map: map,
    title: 'Department',
    icon: { url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' },
  });

  overlays.markers = [frontMarker, deptMarker];
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

export const addDraggableMarker = (
    map: google.maps.Map,
    initialPosition: google.maps.LatLngLiteral
): google.maps.Marker => {
  const marker = new google.maps.Marker({
    position: initialPosition,
    map,
    draggable: true,
    title: "Dragable!",
    icon: { url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' },
  });

  marker.addListener("dragend", (event: google.maps.MapMouseEvent) => {
    const lat = event.latLng?.lat();
    const lng = event.latLng?.lng();
    console.log("New position:", { lat, lng });
  });

  return marker;
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
