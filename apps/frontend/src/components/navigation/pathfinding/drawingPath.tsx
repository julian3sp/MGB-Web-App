import React, { useRef, useEffect } from 'react';
import mapImage from "../floorplan.jpg"
import { graph } from './hospitalNodes';
import { Node } from "./Graph.ts"

function DrawingPath({ source, destination }: props) {
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

        // Create a new image object
        const image = new Image();

        function drawCircle(centerX: number, centerY: number, radius: number) {
            if (!canvas || !ctx) return;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.fillStyle = "red"
            ctx.fill();
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.closePath();
        }

        function drawAllNodes(scale: number) {
            for (const node of allNodes) {
                drawCircle(node.x/scale, node.y/scale, 5);
            }
        }

        function createEdgePath(source: Node, target: Node, scale: number) {
            if (!canvas || !ctx) return;
            ctx.beginPath();
            ctx.moveTo(source.x/scale, source.y/scale);
            ctx.lineTo(source.x/scale, source.y/scale);
            ctx.lineTo(target.x/scale, target.y/scale);
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'blue';
            ctx.stroke();
        }

        function drawPath(source: Node, target: Node, scale: number) {
            const path: Node[] = graph.aStar(source, target);
            for(let i = 0; i < path.length-1; i++) {
                createEdgePath(path[i], path[i+1], scale);

            }
            console.log("\nA* Path:");
            console.log(path.map(node => node.name).join(" -> "));

        }

        image.src = mapImage;
        const imgWidth = 1208;
        const imgHeight = 1028;

        const scale = 1.5
        canvas.width = imgWidth / scale;
        canvas.height = imgHeight/ scale;


        image.onload = () => {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            // drawAllNodes(scale);
            // const test1Node = graph.getNode("11")
            // const test2Node = graph.getNode("38")
            if (!sourceNode || !targetNode){
                console.log("node not found ")
                // ctx.clearRect(0, 0, canvas.width, canvas.height)
                return(<div> not found </div>);
            }
            drawPath(sourceNode, targetNode, scale);

        };
    }, []);

    return (
        <div>
            <canvas ref={canvasRef} width="150" height="150" />
        </div>
    );
}

export default DrawingPath;
