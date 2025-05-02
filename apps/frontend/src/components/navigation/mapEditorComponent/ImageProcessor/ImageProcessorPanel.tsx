import {PictureCorners} from "@/components/navigation/mapEditorComponent/ImageProcessor/PictureCorners.tsx";
import {imageCornerMarkerContent, cornerState} from "../../../map/overlays/markerStyles.ts";
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
    // imgOverlay: google.maps.GroundOverlay | null;
    // placeOverlay: (map: google.maps.Map | null,
    //                imgFile: File | null,
    //                setImgOverlay: (overlay: google.maps.GroundOverlay | null) => void,
    //                worldCorners: google.maps.marker.AdvancedMarkerElement[],
    //                setWorldCorners: (markers: google.maps.marker.AdvancedMarkerElement[] | null) => void) => void;
    // setImgOverlay: (overlay: google.maps.GroundOverlay | null) => void;


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
                                                                            // imgOverlay,
                                                                            // setImgOverlay,
                                                                            // placeOverlay,
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

    /** STEP 3 – drop world markers *******************************/
    if (worldCorners.length === 0) {
        placeMarkers(map, worldCorners, setWorldCorners)
    }

    /** STEP 4 – send to FastAPI **********************************/
    return (
        <div>
            <p className="mt-4 text-sm text-gray-700">
                Drag four points on the map (BL → BR → TR → TL) to place the
                markers that correspond to the image corners.
            </p>
            <button
                className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded"
                onClick={sendToFastApi}
            >
                Process &amp; Save
            </button>
        </div>
    );
};


function placeMarkers(
    map: google.maps.Map | null,
    worldCorners: google.maps.marker.AdvancedMarkerElement[],
    setWorldCorners: (markers: google.maps.marker.AdvancedMarkerElement[]) => void) {
    if (!map) return;

    // 1) compute initial bounds around center
    const centre = map.getCenter()!;
    const bounds = new google.maps.LatLngBounds(
        { lat: centre.lat() - 0.0002, lng: centre.lng() - 0.0002 },
        { lat: centre.lat() + 0.0002, lng: centre.lng() + 0.0002 },
    );
    worldCorners.forEach(m => m.position = null);
    const newMarkers: google.maps.marker.AdvancedMarkerElement[] = [];


    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();
    const nw = new google.maps.LatLng(ne.lat(), sw.lng());
    const se = new google.maps.LatLng(sw.lat(), ne.lng());

    // order them Top-Left (NW), Top-Right (NE), Bottom-Right (SE), Bottom-Left (SW)
    const corners = [nw, ne, se, sw];
    const cornerLabels = ["TL", "TR", "BR", "BL"];

    corners.forEach((pos, idx) => {
        const marker = new google.maps.marker.AdvancedMarkerElement({
            position: pos,
            map,
            title: `${idx + 1}`,
            gmpDraggable: true,
            content:imageCornerMarkerContent(cornerLabels[idx])
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