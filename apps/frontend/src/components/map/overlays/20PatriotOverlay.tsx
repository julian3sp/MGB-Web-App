// import floor1OverlayImg from '../../../../assets/pat20_floor1_rotated.png'
import floor1OverlayImg from '../../../../assets/pat20_1rotated.png'

export interface Patriot20Overlays {
    floor1Overlay: google.maps.GroundOverlay;
}


export const createPatriot20Overlays = (map: google.maps.Map) => {

    // const coordinates: number[] = [42.093430649757835 , 42.0924193258622 , -71.26535172212122 , -71.26674863262852]

    const coordinates: number[] = [42.09339212844942 , 42.092454215188006 , -71.26547140776707 , -71.26662600717441]

    const bounds = {
        north: coordinates[0],
        south: coordinates[1],
        east: coordinates[2],
        west: coordinates[3],
    };

    const floor1Overlay = new google.maps.GroundOverlay(
        floor1OverlayImg,
        bounds,
        {clickable: false,
            opacity: 1}
    )
    floor1Overlay.setMap(map);

    return {floor3Overlay: floor1Overlay};
};

export const updatePatriotPlace22 = (
    overlays: Patriot20Overlays,
    selectedFloor: 1
) => {
    if (selectedFloor === 1) {
        overlays.floor1Overlay.setOpacity(1);
    }
}