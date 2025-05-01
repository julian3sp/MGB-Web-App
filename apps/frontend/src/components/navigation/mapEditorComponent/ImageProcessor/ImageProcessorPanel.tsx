import {PictureCorners} from "@/components/navigation/mapEditorComponent/ImageProcessor/PictureCorners.tsx";
// import {graph} from "../../../map/GraphObject.ts"
export interface ImageProcessorPanelProps {
    map: google.maps.Map | null;

    /** Image*/
    imgFile: File | null;
    setImgFile: React.Dispatch<React.SetStateAction<File | null>>;

    /** Pixel Corners*/
    pixelCorners: [number, number][];
    setPixelCorners: React.Dispatch<React.SetStateAction<[number, number][]>>;

    /**Google Maps Overlay*/
    imgOverlay: google.maps.GroundOverlay | null;
    placeOverlay: (map: google.maps.Map | null,
                   imgFile: File | null,
                   setImgOverlay: (overlay: google.maps.GroundOverlay | null) => void,
                   worldCorners: google.maps.marker.AdvancedMarkerElement[],
                   setWorldCorners: (markers: google.maps.marker.AdvancedMarkerElement[] | null) => void) => void;
    setImgOverlay: (overlay: google.maps.GroundOverlay | null) => void;


    /** World Coordinate corners */
    worldCorners: google.maps.marker.AdvancedMarkerElement[];
    setWorldCorners: (m: google.maps.marker.AdvancedMarkerElement[]) => void;
    sendToFastApi: () => void;

}


export const ImageProcessorPanel: React.FC<ImageProcessorPanelProps> = ({
                                                                            map,
                                                                            imgFile,
                                                                            setImgFile,
                                                                            pixelCorners,
                                                                            setPixelCorners,
                                                                            imgOverlay,
                                                                            setImgOverlay,
                                                                            placeOverlay,
                                                                            worldCorners,
                                                                            setWorldCorners,
                                                                            sendToFastApi,

                                                                        }) => {
    /** STEP 1 – upload ********************************************/
    if (!imgFile) {
        return (
            <div className="space-y-4">
                <h2 className="font-bold text-lg">Import Image</h2>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        if (e.target.files?.[0]) setImgFile(e.target.files[0]);
                    }}
                    className={"bg-[#0076CE]"}
                />
            </div>
        );
    }

    /** STEP 2 – pick pixel corners *******************************/
    if (pixelCorners.length < 4) {
        return (
            <PictureCorners
                file={imgFile}
                onDone={setPixelCorners}
                cornerCount={pixelCorners.length}
            />
        );
    }

    /** STEP 3 – place image overlay ******************************/
    if (!imgOverlay) {
        console.log(pixelCorners);
        return (
            <button
                className="bg-[#0076CE] text-white w-full py-2 rounded"
                onClick={() =>
                    placeOverlay(
                        map,
                        imgFile,
                        setImgOverlay,
                        worldCorners,
                        setWorldCorners
                    )}
            >
                Place Image on Map
            </button>
        );
    }

    /** STEP 4 – drop world markers *******************************/
    if (worldCorners.length < 4) {
        return (
            <p className="mt-4 text-sm text-gray-700">
                Click four points on the map (TL → TR → BR → BL) to place the
                markers that correspond to the image corners.
            </p>
        );
    }

    /** STEP 5 – send to FastAPI **********************************/
    return (
        <button
            className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded"
            onClick={sendToFastApi}
        >
            Process &amp; Save
        </button>
    );
};




export function placeOverlay(
    map: google.maps.Map | null,
    imgFile: File | null,
    setImgOverlay: (overlay: google.maps.GroundOverlay | null) => void,
    worldCorners: google.maps.marker.AdvancedMarkerElement[],
    setWorldCorners: (markers: google.maps.marker.AdvancedMarkerElement[] | null) => void) {
    if (!map || !imgFile) return;

    // 1) compute initial bounds around center
    const centre = map.getCenter()!;
    const bounds = new google.maps.LatLngBounds(
        { lat: centre.lat() - 0.0005, lng: centre.lng() - 0.0005 },
        { lat: centre.lat() + 0.0005, lng: centre.lng() + 0.0005 },
    );

    // 2) create the overlay
    const url = URL.createObjectURL(imgFile);
    const overlay = new google.maps.GroundOverlay(url, bounds, { opacity: 0.6 });
    overlay.setMap(map);
    setImgOverlay(overlay);

    worldCorners.forEach(m => m.position(null));
    const newMarkers: google.maps.marker.AdvancedMarkerElement[] = [];

    // get current bounds
    const b = overlay.getBounds();
    if (!b) return;

    const ne = b.getNorthEast();
    const sw = b.getSouthWest();
    const nw = new google.maps.LatLng(ne.lat(), sw.lng());
    const se = new google.maps.LatLng(sw.lat(), ne.lng());

    // order them Top-Left (NW), Top-Right (NE), Bottom-Right (SE), Bottom-Left (SW)
    const corners = [nw, ne, se, sw];

    corners.forEach((pos, idx) => {
        const marker = new google.maps.marker.AdvancedMarkerElement({
            position: pos,
            map,
            title: `${idx + 1}`,
            gmpDraggable: true
        });
        const content = marker.content as HTMLElement;
        content.addEventListener('dragend', (e) => {
            e.stopPropagation();
            console.log(marker.position)
        })
        newMarkers.push(marker);
    });
    setWorldCorners(newMarkers);
}