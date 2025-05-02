import {PictureCorners} from "./PictureCorners.tsx";
import {imageCornerMarkerContent, cornerState} from "../../../map/overlays/markerStyles.ts";
import {useEffect} from "react";
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
                map={map}
                worldCorners={worldCorners}
                setWorldCorners={setWorldCorners}
            />
        );
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


