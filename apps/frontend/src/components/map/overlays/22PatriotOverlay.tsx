import floor3OverlayImg from '../../../../assets/pat22_floor3_rotated.png'
import floor4OverlayImg from '../../../../assets/22PatriotFloor4.png'


export interface Patriot22Overlays {
  floor3Overlay: google.maps.GroundOverlay;
  floor4Overlay: google.maps.GroundOverlay;
}

export const createPatriot22Overlays = (map: google.maps.Map) => {
  const lats = [42.09422235,  42.09268377,  42.09224102,  42.09278327];
  const lngs = [-71.26637901, -71.26648763, -71.26704756, -71.26834947];

  const bounds = {
    north: Math.max(...lats),
    south: Math.min(...lats),
    east: Math.max(...lngs),
    west: Math.min(...lngs),
  };

  const floor3Overlay = new google.maps.GroundOverlay(
    floor3OverlayImg, 
    bounds, 
    {opacity: 1}
  )
  floor3Overlay.setMap(map);

  const floor4Overlay = new google.maps.GroundOverlay(
    floor4OverlayImg,
    bounds, 
    {opacity: 0}
  )
  floor4Overlay.setMap(map);

  return {floor3Overlay, floor4Overlay};
};

export const updatePatriotPlace22 = (
  overlays: Patriot22Overlays, 
  selectedFloor: 3 | 4
) => {
  if (selectedFloor === 3) {
    overlays.floor3Overlay.setOpacity(1);
    overlays.floor4Overlay.setOpacity(0);
  } else {
    overlays.floor3Overlay.setOpacity(0);
    overlays.floor4Overlay.setOpacity(1);
  }
}
  