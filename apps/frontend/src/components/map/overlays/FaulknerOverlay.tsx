import faulknerFloor1 from '../../../../assets/FaulknerFloor1.png'

export interface FaulknerOverlays {
    floor1Overlay: google.maps.GroundOverlay;
}

export const createFaulknerOverlays = (map: google.maps.Map) => {
    const coordinates: number[] = [
        42.302361405241356, 
        42.301006971479225, 
        -71.12780533551847, 
        -71.12937452284586, 
    ]

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