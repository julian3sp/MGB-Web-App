// import floor1OverlayImg from '../../../../assets/pat20_floor1_rotated.png'
import floor1OverlayImg from '../../../../assets/pat20Rotated/20-FLOOR1-1_rotated.png'
import floor2OverlayImg from '../../../../assets/pat20Rotated/20-FLOOR2-1_rotated.png'
import floor3OverlayImg from '../../../../assets/pat20Rotated/20-FLOOR3-1_rotated.png'
import floor4OverlayImg from '../../../../assets/pat20Rotated/20-FLOOR4-1_rotated.png'

export interface Patriot20Overlays {
    floor1Overlay: google.maps.GroundOverlay;
    floor2Overlay: google.maps.GroundOverlay;
    floor3Overlay: google.maps.GroundOverlay;
    floor4Overlay: google.maps.GroundOverlay;
}


export const createPatriot20Overlays = (map: google.maps.Map) => {

    const coordinates: number[] = [42.09324402369457 , 42.092463386938896 , -71.26549860229635 , -71.26660553739771]
    const coordinates2: number[] = [42.093202516968006 , 42.09245889166562 , -71.26551920665537 , -71.2665985583356]
    const coordinates3: number[] = [42.09320067250373 , 42.09246273991819 , -71.2655198318874 , -71.26659530485105]
    const coordinates4: number[] = [42.09320743705746 , 42.092462479799565 , -71.26552085088777 , -71.2665965954248]

    const bounds = {
        north: coordinates[0],
        south: coordinates[1],
        east: coordinates[2],
        west: coordinates[3],
    };

    const bounds2 = {
        north: coordinates2[0],
        south: coordinates2[1],
        east: coordinates2[2],
        west: coordinates2[3],
    };

    const bounds3 = {
        north: coordinates3[0],
        south: coordinates3[1],
        east: coordinates3[2],
        west: coordinates3[3],
    };

    const bounds4 = {
        north: coordinates4[0],
        south: coordinates4[1],
        east: coordinates4[2],
        west: coordinates4[3],
    };

    const floor1Overlay = new google.maps.GroundOverlay(
        floor1OverlayImg,
        bounds,
        {clickable: false,opacity: 1,}
    )
    floor1Overlay.setMap(map);

    const floor2Overlay = new google.maps.GroundOverlay(
        floor2OverlayImg,
        bounds2,
        {clickable: false,opacity: 0}
    )
    floor2Overlay.setMap(map);

    const floor3Overlay = new google.maps.GroundOverlay(
        floor3OverlayImg,
        bounds3,
        {clickable: false,opacity: 0}
    )
    floor3Overlay.setMap(map);

    const floor4Overlay = new google.maps.GroundOverlay(
        floor4OverlayImg,
        bounds4,
        {clickable: false,opacity: 0}
    )
    floor4Overlay.setMap(map);

    return {floor1Overlay, floor2Overlay, floor3Overlay, floor4Overlay};
};

export const updatePatriotPlace20 = (
    overlays: Patriot20Overlays,
    selectedFloor: number
) => {
    console.log("Pat 20 Val: ", selectedFloor)
    if (selectedFloor === 1) {
        overlays.floor1Overlay.setOpacity(1);
        overlays.floor2Overlay.setOpacity(0);
        overlays.floor3Overlay.setOpacity(0);
        overlays.floor4Overlay.setOpacity(0);
    }
    else if (selectedFloor === 2) {
        overlays.floor1Overlay.setOpacity(0);
        overlays.floor2Overlay.setOpacity(1);
        overlays.floor3Overlay.setOpacity(0);
        overlays.floor4Overlay.setOpacity(0);
    }
    else if (selectedFloor === 3) {
        overlays.floor1Overlay.setOpacity(0);
        overlays.floor2Overlay.setOpacity(0);
        overlays.floor3Overlay.setOpacity(1);
        overlays.floor4Overlay.setOpacity(0);
    }
    else if (selectedFloor === 4) {
        overlays.floor1Overlay.setOpacity(0);
        overlays.floor2Overlay.setOpacity(0);
        overlays.floor3Overlay.setOpacity(0);
        overlays.floor4Overlay.setOpacity(1);
    }
}