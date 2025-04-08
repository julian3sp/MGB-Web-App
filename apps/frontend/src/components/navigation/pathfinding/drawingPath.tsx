import React, { useRef, useEffect } from 'react';
import mapImage from "../floorplan.jpg"
import { graph } from './hospitalNodes';
import { Node } from "./Graph.ts"

function DrawingPath() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const allNodes: Node[] = graph.getNodes();

    useEffect(() => {
        // if (!canvas || !ctx) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Create a new image object
        const image = new Image();

        function drawCircle(centerX: number, centerY: number, radius: number) {
            if (!canvas || !ctx) return;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.fillStyle = '#FF5733';
            ctx.fill();
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.closePath();
        }

        function drawAllNodes() {
            for (const node of allNodes) {
                drawCircle(node.x, node.y, 10);
            }
        }

        function createEdgePath(source: Node, target: Node) {
            if (!canvas || !ctx) return;
            ctx.beginPath();
            ctx.moveTo(source.x, source.y);
            ctx.lineTo(source.x, source.y);
            ctx.lineTo(target.x, target.y);
            ctx.stroke();
        }

        function drawPath(source: Node, target: Node) {
            const path: Node[] = graph.aStar(source, target);
            for(let i = 0; i < path.length-1; i++) {
                createEdgePath(path[i], path[i+1]);
            }
            console.log("\nA* Path:");
            console.log(path.map(node => node.name).join(" -> "));

        }

        // Set the image source using the imported image
        image.src = mapImage;
        canvas.width = 943;
        canvas.height = 781;

        image.onload = () => {
            // Draw the image onto the canvas, resized to fit the canvas
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            drawAllNodes();
            const node = graph.getNode("23")
            if (!node) return(<div> not found </div>);
            drawPath(allNodes[0], node);

            // // Draw additional graphics after the image has loaded
            // ctx.beginPath();
            // ctx.moveTo(20, 20);
            // ctx.lineTo(20, 100);
            // ctx.lineTo(70, 100);
            // ctx.lineTo(70, 150);
            // ctx.stroke();
            // drawCircle(50, 50, 20);
        };
    }, []); // Empty dependency array means this effect runs only once after the initial rendering

    return (
        <div>
            <canvas ref={canvasRef} width="150" height="150" />
        </div>
    );
}

export default DrawingPath;
