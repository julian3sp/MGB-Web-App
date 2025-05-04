import {PictureCorners} from "@/components/navigation/mapEditorComponent/ImageProcessor/PictureCorners.tsx";
export interface ImageProcessorPanelProps {
    map: google.maps.Map | null;

    /** Image*/
    imgFile: File | null;
    setImgFile: React.Dispatch<React.SetStateAction<File | null>>;

    /** Pixel Corners*/
    pixelCorners: [number, number][];
    setPixelCorners: React.Dispatch<React.SetStateAction<[number, number][]>>;


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
                                                                            worldCorners,
                                                                            setWorldCorners,
                                                                            sendToFastApi,

                                                                        }) => {
    /** STEP 1 – upload ********************************************/
    if (!imgFile) {
        return (

            <div className="bg-blue-50 border-l-4 border-[#003a96] text-[#003a96] px-4 py-4 rounded shadow-sm mt-4" role="alert">
                <h2 className="font-bold text-left text-[#003a96] text-2xl font-[poppins] mb-2">Step 1: Import Image</h2>
                <p className="font-semibold text-lg font-[poppins]">
                    Please first choose a blank image of the building to process.
                </p>

                <label
                    htmlFor="image-upload"
                    className="inline-block cursor-pointer bg-[#0076CE] text-white font-semibold py-2 px-4 rounded hover:bg-[#005fa3] transition duration-200 font-[poppins]"
                >
                    Choose Image
                </label>

                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        if (e.target.files?.[0]) setImgFile(e.target.files[0]);
                    }}
                    className="hidden"
                />

                {/*{imgFile && (*/}
                {/*    <p className="mt-2 text-sm text-[#003a96] font-[poppins]">*/}
                {/*        Selected: <span className="font-medium">{imgFile.name}</span>*/}
                {/*    </p>*/}
                {/*)}*/}
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
        <div className="bg-blue-50 border-l-4 border-[#0076CE] p-4 rounded shadow-sm mt-6 space-y-3">
            <h2 className="font-bold text-left text-[#003a96] text-2xl font-[poppins] mb-2">Step 3: Select World Corners</h2>

            <p className="font-semibold text-lg font-[poppins] text-[#003a96]">
                Drag four points on the map (
                <span className="font-semibold">BL → BR → TR → TL</span>) to place the
                markers that correspond to the image corners.
            </p>

            <div className="text-center">
                <img
                    src="assets/exampleMapCorners.jpg"  // Replace with actual image path
                    alt="Corner point placement example"
                    className="inline-block w-full max-w-xl rounded border border-[#003a96] shadow"
                />
                <p className="text-xs text-[#003a96] mt-1 font-[poppins] italic">
                    Example: corner order from Bottom-Left to Top-Left
                </p>
            </div>

            <button
                className="bg-white  text-[#003a96] w-[80%] block mx-auto font-[poppins] border-2 border-[#003a96] hover:bg-accent shadow-lg rounded-xl p-3 "
                onClick={sendToFastApi}
            >
                Process & Save
            </button>
        </div>
    );
};

