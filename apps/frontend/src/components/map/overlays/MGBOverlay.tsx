// src/overlays/MGBOverlay.ts

import chestnutHillOverlayImg from '../../../../assets/ChestnutHillParkingLots.png';
import chestnutFloorPlanOverlay from '../../../../assets/Floor1Labeled.png';

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
  const floorBounds = {
    north: 42.326224695228895,      
    south: 42.325704043652095,      
    east: -71.14923460187407,       
    west: -71.15011134399687,      
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
