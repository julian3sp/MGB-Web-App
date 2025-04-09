import React, { useRef, useEffect } from 'react';
import mapImage from "../floorplan.jpg"
import { graph } from './hospitalNodes';
import { Node } from "./Graph.ts"

interface DrawingPathProps {
    source: string;
    destination: string;
}

function DrawingPath({ source, destination }: DrawingPathProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const allNodes: Node[] = graph.getNodes();
    const sourceNode: Node | undefined = graph.getNode(source);
    const targetNode: Node | undefined = graph.getNode(destination);

    useEffect(() => {
        console.log("nothing",destination);
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Create image objects
        const mapImg = new Image();
        const sourceMarkerImg = new Image();
        const destMarkerImg = new Image();

        function drawCircle(centerX: number, centerY: number, radius: number, color: string = "red") {
            if (!canvas || !ctx) return;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'white';
            ctx.stroke();
            ctx.closePath();
        }

        function drawMarker(x: number, y: number, isSource: boolean) {
            if (!ctx) return;
            const img = isSource ? sourceMarkerImg : destMarkerImg;
            const markerWidth = 32;
            const markerHeight = 48;
            // Draw the marker image centered at the point, with the pin point at the location
            ctx.drawImage(
                img, 
                x - markerWidth/2,  // Center horizontally
                y - markerHeight,   // Place pin point at the location
                markerWidth, 
                markerHeight
            );
        }

        function drawAllNodes(scale: number) {
            for (const node of allNodes) {
                drawCircle(node.x/scale, node.y/scale, 5, "#666666");
            }
        }

        function createEdgePath(source: Node, target: Node, scale: number) {
            if (!canvas || !ctx) return;
            ctx.beginPath();
            ctx.moveTo(source.x/scale, source.y/scale);
            ctx.lineTo(source.x/scale, source.y/scale);
            ctx.lineTo(target.x/scale, target.y/scale);
            ctx.lineWidth = 5;
            ctx.strokeStyle = '#4285F4';
            ctx.stroke();
        }

        function drawPath(source: Node, target: Node, scale: number) {
            const path: Node[] = graph.aStar(source, target);
            for(let i = 0; i < path.length-1; i++) {
                createEdgePath(path[i], path[i+1], scale);

            }
            
            // Draw markers after the path
            if (path.length > 0) {
                // Draw source marker
                drawMarker(path[0].x/scale, path[0].y/scale, true);
                // Draw destination marker
                drawMarker(path[path.length-1].x/scale, path[path.length-1].y/scale, false);
            }
        }

        // Set up image sources
        mapImg.src = mapImage;
        sourceMarkerImg.src = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
        destMarkerImg.src = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';

        const imgWidth = 1208;
        const imgHeight = 1028;
        const scale = 1.5;
        canvas.width = imgWidth / scale;
        canvas.height = imgHeight / scale;

        // Wait for all images to load before drawing
        Promise.all([
            new Promise(resolve => mapImg.onload = resolve),
            new Promise(resolve => sourceMarkerImg.onload = resolve),
            new Promise(resolve => destMarkerImg.onload = resolve)
        ]).then(() => {
            ctx.drawImage(mapImg, 0, 0, canvas.width, canvas.height);
            // drawAllNodes(scale);
            // const test1Node = graph.getNode("11")
            // const test2Node = graph.getNode("38")
            if (!sourceNode || !targetNode){
                console.log("node not found ")
                // ctx.clearRect(0, 0, canvas.width, canvas.height)
                return(<div> not found </div>);
            }
            drawPath(sourceNode, targetNode, scale);

        });
    }, [source, destination]);

    return (
        <div>
            <canvas ref={canvasRef} width="150" height="150" />
        </div>
    );
}

export default DrawingPath;
