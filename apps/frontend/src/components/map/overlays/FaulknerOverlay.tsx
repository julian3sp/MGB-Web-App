import faulknerFloor1 from '../../../../assets/faulknerRotated/faulkner-FLOOR1-1_rotated.png'

export interface FaulknerOverlays {
    floor1Overlay: google.maps.GroundOverlay;
}

export const createFaulknerOverlays = (map: google.maps.Map) => {
    const coordinates: number[] = [42.3032184372054 , 42.299994799174776 , -71.12659265624008 , -71.13078457390074]

    const bounds = {
        north: coordinates[0],
        south: coordinates[1],
        east: coordinates[2],
        west: coordinates[3],
    }

    const floor1Overlay = new google.maps.GroundOverlay(
        faulknerFloor1, 
        bounds, 
        {
            clickable: false, 
            opacity: 1
        }
    )

    floor1Overlay.setMap(map);

    return { floor1Overlay: floor1Overlay }
}

export const updatFaulkner = (
    overlays: FaulknerOverlays,
    selectedFloor: 1
) => {
    if (selectedFloor === 1){
        overlays.floor1Overlay.setOpacity(1);
    }
}