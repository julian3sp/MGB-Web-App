// import floor3OverlayImg from '../../../../assets/pat22_floor3_rotated.png'

import floor1OverlayImg from '../../../../assets/pat22Rotated/22-FLOOR1-1_rotated.png'
import floor3OverlayImg from '../../../../assets/pat22Rotated/22-FLOOR2-1_rotated.png'
import floor4OverlayImg from '../../../../assets/pat22Rotated/22-FLOOR4-1_rotated.png'


export interface Patriot22Overlays {
  floor1Overlay: google.maps.GroundOverlay;
  floor3Overlay: google.maps.GroundOverlay;
  floor4Overlay: google.maps.GroundOverlay;
}


export const createPatriot22Overlays = (map: google.maps.Map) => {
  const coordinates_1: number[] = [42.0931272773582 , 42.0922208559581 , -71.26637665959906 , -71.2674313913836]
  const coordinates_3: number[] = [42.09312814054003 , 42.0921228813936 , -71.26620901757691 , -71.26743021876958]

  const coordinates_4: number[] = [42.093129912695275 , 42.09221843196603 , -71.26636909492426 , -71.26743280969828]

  const bounds1 = {
    north: coordinates_1[0],
    south: coordinates_1[1],
    east: coordinates_1[2],
    west: coordinates_1[3],
  };

  const bounds3 = {
    north: coordinates_3[0],
    south: coordinates_3[1],
    east: coordinates_3[2],
    west: coordinates_3[3],
  };

  const bounds_4 = {
    north: coordinates_4[0],
    south: coordinates_4[1],
    east: coordinates_4[2],
    west: coordinates_4[3],
  };

  const floor1Overlay = new google.maps.GroundOverlay(
      floor1OverlayImg,
      bounds1,
      {clickable: false,
        opacity: 1}
  )
  floor1Overlay.setMap(map);

  const floor3Overlay = new google.maps.GroundOverlay(
    floor3OverlayImg, 
    bounds3,
    {clickable: false,
      opacity: 1}
  )
  floor3Overlay.setMap(map);

  const floor4Overlay = new google.maps.GroundOverlay(
    floor4OverlayImg,
      bounds_4,
    {clickable: false,
      opacity: 0}
  )
  floor4Overlay.setMap(map);

  return {floor1Overlay, floor3Overlay, floor4Overlay};
};

export const updatePatriotPlace22 = (
  overlays: Patriot22Overlays, 
  selectedFloor: number
) => {
  console.log(selectedFloor);
  switch (selectedFloor) {
    case 1:
      overlays.floor1Overlay.setOpacity(1);
      overlays.floor3Overlay.setOpacity(0);
      overlays.floor4Overlay.setOpacity(0);
      break;
    case 3:
      overlays.floor1Overlay.setOpacity(0);
      overlays.floor3Overlay.setOpacity(1);
      overlays.floor4Overlay.setOpacity(0);
      break;
    case 4:
      overlays.floor1Overlay.setOpacity(0);
      overlays.floor3Overlay.setOpacity(0);
      overlays.floor4Overlay.setOpacity(1);
      break;
    default:
      overlays.floor1Overlay.setOpacity(1);
      overlays.floor3Overlay.setOpacity(0);
      overlays.floor4Overlay.setOpacity(0);
      break;
  }
}
  