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

    function handleClick(e: React.MouseEvent) {
        if (!cvs.current) return;
        const rect = cvs.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Next corner
        console.log("pixel: ", x)
        const next: [number, number][] = [...pixelCorners, [x, y]];
        setPixelCorners(next);

        // Complete with 4 points
        if (next.length === 4) {
            onDone(next);
        }
    }

    return (
        <div className="space-y-2">
            <p className="text-sm text-gray-600">
                Click corner #{cornerCount + 1} (top-left → clockwise)
            </p>
            <canvas
                ref={cvs}
                className="border w-full"
                onClick={handleClick}
            />
        </div>
    );
};