import React, { useEffect, useRef, useState } from 'react';
import {imageCornerMarkerContent} from "@/components/map/overlays/markerStyles.ts";

type CornerCB = (pts: [number, number][]) => void;

interface PictureCornersProps {
    file: File;
    onDone: CornerCB;
    cornerCount: number;
    map: google.maps.Map | null;
    worldCorners: google.maps.marker.AdvancedMarkerElement[]
    setWorldCorners: (markers: google.maps.marker.AdvancedMarkerElement[]) => void
}


export const PictureCorners: React.FC<PictureCornersProps> = ({
                                                                  file,
                                                                  onDone,
                                                                  cornerCount,
                                                                    map,
                                                                    worldCorners,
                                                                    setWorldCorners
                                                              }) => {
    const cvs = useRef<HTMLCanvasElement>(null);
    const [pixelCorners, setPixelCorners] = useState<[number, number][]>([]);

    if (!file) {
        return <p>Please select a file first.</p>;
    }
    useEffect(() => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            if (!cvs.current) return;
            cvs.current.width = img.width;
            cvs.current.height = img.height;
            cvs.current.getContext('2d')!.drawImage(img, 0, 0);
        };
    }, [file]);

    useEffect(() => {

    }, [pixelCorners.length]);

    function handleClick(e: React.MouseEvent) {
        if (!cvs.current || pixelCorners.length === 4) return;
        // coordinates in the displayed (CSS) canvas
        const cssX = e.nativeEvent.offsetX;
        const cssY = e.nativeEvent.offsetY;

        // convert to the image’s real pixel grid
        const scaleX = cvs.current.width  / cvs.current.clientWidth;
        const scaleY = cvs.current.height / cvs.current.clientHeight;

        const x = cssX * scaleX;
        const y = cssY * scaleY;

        // Next corner
        console.log("pixel: ", x, " ,", y)
        const next: [number, number][] = [...pixelCorners, [x, y]];
        setPixelCorners(next);
        drawDot(x, y);

        // Complete with 4 points
        if (next.length === 4) {
            placeMarkers(map, worldCorners, setWorldCorners);
            onDone(next);
        }
    }

    function drawDot(x: number, y: number) {
        const ctx = cvs.current!.getContext("2d")!;
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(x, y, 5 /* radius */, 0, 2*Math.PI);
        ctx.fill();
    }

    /** Labels for corners **/
    const cornerLabels = [
        "bottom left",   // pixelCorners.length === 0
        "bottom right",  // 1
        "top right",     // 2
        "top left"       // 3
    ];

    function removePreviousDot(){
        if (pixelCorners.length === 0 || !cvs.current) return;

        // Remove last point
        const updatedCorners = pixelCorners.slice(0, -1);
        setPixelCorners(updatedCorners);

        // Redraw image
        const ctx = cvs.current.getContext("2d")!;
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            ctx.clearRect(0, 0, cvs.current!.width, cvs.current!.height);
            ctx.drawImage(img, 0, 0);
            updatedCorners.forEach(([x, y]) => drawDot(x, y));
        };
    }

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


        // This will be different because of pixel coordinates
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


    return (
        <div className="space-y-2">

            <h2 className="text-xl font-semibold text-gray-800">
                Click corner #{pixelCorners.length + 1} —{" "}
                {cornerLabels[pixelCorners.length] || ""}
            </h2>
            <canvas
                ref={cvs}
                className="border w-full"
                onClick={handleClick}
            />
            <button
                className="bg-[#003a96] w-[80%] block mx-auto text-white border-2 border-[#003a96] font-[poppins] hover:bg-blue-950 shadow-lg rounded-xl p-3 "
                onClick={() => {removePreviousDot()}}
            >
                Remove Previous Click
            </button>

        </div>
    );
};