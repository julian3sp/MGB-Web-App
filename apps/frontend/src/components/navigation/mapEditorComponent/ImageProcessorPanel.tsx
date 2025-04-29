import {PictureCorners} from "@/components/navigation/mapEditorComponent/PictureCorners.tsx";

export interface ImageProcessorPanelProps {
    /** Image*/
    imgFile: File | null;
    setImgFile: React.Dispatch<React.SetStateAction<File | null>>;

    /** Pixel Corners*/
    pixelCorners: [number, number][];
    setPixelCorners: React.Dispatch<React.SetStateAction<[number, number][]>>;

    /**Google Maps Overlay*/
    imgOverlay: google.maps.GroundOverlay | null;
    placeOverlay: () => void;

    /** World Coordinate corners */
    worldCorners: google.maps.marker.AdvancedMarkerElement[];
    sendToFastApi: () => void;
}


export const ImageProcessorPanel: React.FC<ImageProcessorPanelProps> = ({
                                                                            imgFile,
                                                                            setImgFile,
                                                                            pixelCorners,
                                                                            setPixelCorners,
                                                                            imgOverlay,
                                                                            placeOverlay,
                                                                            worldCorners,
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
                onClick={placeOverlay}
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