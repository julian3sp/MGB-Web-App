// import floor3OverlayImg from '../../../../assets/pat22_floor3_rotated.png'
// import floor4OverlayImg from '../../../../assets/pat22_floor4_rotated.png'
//
//
// export interface Patriot22Overlays {
//     floor3Overlay: google.maps.GroundOverlay;
//     floor4Overlay: google.maps.GroundOverlay;
// }
//
//
// export const createPatriot22Overlays = (map: google.maps.Map) => {
//
//     const coordinates_3: number[] = [42.09319426546392 , 42.09195597432981 , -71.26619891316744 , -71.26765735462097]
//     const coordinates_4: number[] = [42.09317400927991 , 42.092096082400786 , -71.26633478170012 , -71.26760748755561]
//
//     const bounds = {
//         north: coordinates_3[0],
//         south: coordinates_3[1],
//         east: coordinates_3[2],
//         west: coordinates_3[3],
//     };
//
//     const bounds_4 = {
//         north: coordinates_4[0],
//         south: coordinates_4[1],
//         east: coordinates_4[2],
//         west: coordinates_4[3],
//     };
//
//     const floor3Overlay = new google.maps.GroundOverlay(
//         floor3OverlayImg,
//         bounds,
//         {clickable: false,
//             opacity: 1}
//     )
//     floor3Overlay.setMap(map);
//
//     const floor4Overlay = new google.maps.GroundOverlay(
//         floor4OverlayImg,
//         bounds_4,
//         {clickable: false,
//             opacity: 0}
//     )
//     floor4Overlay.setMap(map);
//
//     return {floor3Overlay, floor4Overlay};
// };
//
// export const updatePatriotPlace22 = (
//     overlays: Patriot22Overlays,
//     selectedFloor: 1 | 3 | 4
// ) => {
//     if (selectedFloor === 3) {
//         overlays.floor3Overlay.setOpacity(1);
//         overlays.floor4Overlay.setOpacity(0);
//     } else {
//         overlays.floor3Overlay.setOpacity(0);
//         overlays.floor4Overlay.setOpacity(1);
//     }
// }
//