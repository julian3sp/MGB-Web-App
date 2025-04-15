// src/overlays/MGBOverlay.ts

import chestnutHillOverlayImg from '../../../../assets/ChestnutHillParkingLots.png';
import chestnutFloorPlanOverlay from '../../../../assets/chestnut_rotated.png';

export interface MGBOverlays {
  parkingOverlay: google.maps.GroundOverlay;
  floorOverlay: google.maps.GroundOverlay;
}

export const createMGBOverlays = (map: google.maps.Map): MGBOverlays => {
  // Parking overlay bounds 
  const parkingBounds = {
    north: 42.3264419932353,       
    south: 42.32548193483691,      
    east: -71.14910160190563,       
    west: -71.15016364918158,        
  };

  // Hospital floor plan overlay bounds

  // [[ 42.32625842 -71.14927255]
  //   [ 42.32572777 -71.14922327]
  //   [ 42.32568042 -71.15009599]
  //   [ 42.32620219 -71.15015318]]
// # topright chestnut:
//       # bottom right chestnut:
//       # bottom left chestnut:
//       # top left chestnut:

  const lats = [42.32625842, 42.32572777, 42.32568042, 42.32620219];
  const lngs = [-71.14927255, -71.14922327, -71.15009599, -71.15015318];

  const floorBounds = {
    north: Math.max(...lats),
    south: Math.min(...lats),
    east: Math.max(...lngs),
    west: Math.min(...lngs),
  };

  // Create parking overlay (initially fully visible)
  const parkingOverlay = new google.maps.GroundOverlay(
    chestnutHillOverlayImg,
    parkingBounds,
    { opacity: 1 }
  );
  parkingOverlay.setMap(map);

  // Create hospital floor plan overlay (initially hidden)
  const floorOverlay = new google.maps.GroundOverlay(
    chestnutFloorPlanOverlay,
    floorBounds,
    { opacity: 1 }
  );
  floorOverlay.setMap(map);

  return { parkingOverlay, floorOverlay };
};

export const removeMGBOverlays = (overlays: MGBOverlays) => {
  overlays.parkingOverlay.setMap(null);
  overlays.floorOverlay.setMap(null);
};
