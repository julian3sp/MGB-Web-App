import floor2OverlayImg from '../../../../assets/main-FLOOR2-BASIC-LG_rotated.png'


export interface MainCampusOverlay {
    floor2Overlay: google.maps.GroundOverlay;
}


export const createMainCampusOverlay = (map: google.maps.Map) => {

    const coordinates_3: number[] = [42.33829094394529 , 42.333095821082985 , -71.10231360131958 , -71.11048062559658]

    const bounds = {
        north: coordinates_3[0],
        south: coordinates_3[1],
        east: coordinates_3[2],
        west: coordinates_3[3],
    };


    const floor2Overlay = new google.maps.GroundOverlay(
        floor2OverlayImg,
        bounds,
        {clickable: false,
            opacity: 1}
    )
    floor2Overlay.setMap(map);


    return {floor2Overlay};
};

export const updateMainCampus = (
    overlays: MainCampusOverlay,
    selectedFloor: 1
) => {
    if (selectedFloor === 1) {
        overlays.floor2Overlay.setOpacity(1);
    }
}
