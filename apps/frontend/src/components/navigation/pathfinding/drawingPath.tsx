import React, { useRef, useEffect } from 'react';
import mapImage from "../floorplan.jpg";
import { graph } from './hospitalNodes';
import { Node } from "./Graph.ts";

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
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create image objects
    const mapImg = new Image();
    const sourceMarkerImg = new Image();
    const destMarkerImg = new Image();

    // Helper functions
    function drawCircle(centerX: number, centerY: number, radius: number, color: string = "red") {
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
      const img = isSource ? sourceMarkerImg : destMarkerImg;
      const markerWidth = 32;
      const markerHeight = 48;
      // Draw the marker image centered at the point, with the tip at (x,y)
      ctx.drawImage(
        img,
        x - markerWidth / 2,
        y - markerHeight,
        markerWidth,
        markerHeight
      );
    }

    function drawAllNodes(scale: number) {
      for (const node of allNodes) {
        drawCircle(node.x / scale, node.y / scale, 5, "#666666");
      }
    }

    // This function animates the entire path from start to end.
    function animatePath(path: Node[], scale: number) {
      let currentSegment = 0;      // which segment is being animated
      let progress = 0;            // progress from 0 to 1 on current segment
      const segmentDuration = 500; // ms for each segment
      let lastTimestamp: number | null = null;

      function animate(timestamp: number) {
        if (!lastTimestamp) lastTimestamp = timestamp;
        const delta = timestamp - lastTimestamp;
        lastTimestamp = timestamp;

        // Clear & redraw background each frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(mapImg, 0, 0, canvas.width, canvas.height);
        // Optionally show all nodes (comment out if you don't need them)
        // drawAllNodes(scale);

        // For smoother corners: set lineJoin and lineCap to "round"
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        // Draw all *fully completed* segments
        for (let i = 0; i < currentSegment; i++) {
          ctx.beginPath();
          ctx.moveTo(path[i].x / scale, path[i].y / scale);
          ctx.lineTo(path[i + 1].x / scale, path[i + 1].y / scale);
          ctx.lineWidth = 5;
          ctx.strokeStyle = '#4285F4';
          ctx.stroke();
          ctx.closePath();
        }

        // Animate the *current* segment, if we still have one
        if (currentSegment < path.length - 1) {
          const start = path[currentSegment];
          const end = path[currentSegment + 1];

          // Increment progress based on time
          progress += delta / segmentDuration;
          if (progress > 1) progress = 1;

          // Current interpolated point
          const currentX = start.x / scale + (end.x / scale - start.x / scale) * progress;
          const currentY = start.y / scale + (end.y / scale - start.y / scale) * progress;

          ctx.beginPath();
          ctx.moveTo(start.x / scale, start.y / scale);
          ctx.lineTo(currentX, currentY);
          ctx.lineWidth = 5;
          ctx.strokeStyle = '#4285F4';
          ctx.stroke();
          ctx.closePath();

          // If the segment is done, move on
          if (progress >= 1) {
            currentSegment++;
            progress = 0;
          }
        }

        // Draw markers at start and end
        if (path.length > 0) {
          drawMarker(path[0].x / scale, path[0].y / scale, true);
          drawMarker(path[path.length - 1].x / scale, path[path.length - 1].y / scale, false);
        }

        // Keep animating until we have drawn all segments
        if (currentSegment < path.length - 1) {
          requestAnimationFrame(animate);
        } else {
          // Once the full path is drawn, wait 2 seconds, then re-draw from scratch
          setTimeout(() => {
            // Reset everything and animate again
            currentSegment = 0;
            progress = 0;
            lastTimestamp = null;
            requestAnimationFrame(animate);
          }, 2000);
        }
      }

      requestAnimationFrame(animate);
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

    // Wait for images to load
    Promise.all([
      new Promise(resolve => (mapImg.onload = resolve)),
      new Promise(resolve => (sourceMarkerImg.onload = resolve)),
      new Promise(resolve => (destMarkerImg.onload = resolve))
    ]).then(() => {
      ctx.drawImage(mapImg, 0, 0, canvas.width, canvas.height);
      if (!sourceNode || !targetNode) {
        console.log("Node not found.");
        return;
      }

      // Get path from A* or whatever method
      const path: Node[] = graph.aStar(sourceNode, targetNode);

      // Animate
      animatePath(path, scale);
    });
  }, [source, destination]);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default DrawingPath;
