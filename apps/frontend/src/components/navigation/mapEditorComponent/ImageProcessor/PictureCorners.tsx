import React, { useEffect, useRef, useState } from 'react';

type CornerCB = (pts: [number, number][]) => void;

interface PictureCornersProps {
    file: File;
    onDone: CornerCB;
    cornerCount: number;
}

export const PictureCorners: React.FC<PictureCornersProps> = ({
                                                                  file,
                                                                  onDone,
                                                                  cornerCount,
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
        if (!cvs.current) return;
        const rect = cvs.current.getBoundingClientRect();

        // offset because canvas is smaller than image
        const scaleX = cvs.current.width  / rect.width;
        const scaleY = cvs.current.height / rect.height;

        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top)  * scaleY;

        // Next corner
        console.log("pixel: ", x, " ,", y)
        const next: [number, number][] = [...pixelCorners, [x, y]];
        setPixelCorners(next);
        drawDot(x, y);

        // Complete with 4 points
        if (next.length === 4) {
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
        </div>
    );
};