import floor3OverlayImg from '../../../../assets/pat22_floor3_rotated.png'
import floor4OverlayImg from '../../../../assets/22PatriotFloor4.png'


export interface Patriot22Overlays {
  floor3Overlay: google.maps.GroundOverlay;
  floor4Overlay: google.maps.GroundOverlay;
}


export const createPatriot22Overlays = (map: google.maps.Map) => {

  const coordinates: number[] = [42.09324331299805 , 42.092057037968154 , -71.26613936182538 , -71.26758041972694]

  const bounds = {
    north: coordinates[0],
    south: coordinates[1],
    east: coordinates[2],
    west: coordinates[3],
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
  