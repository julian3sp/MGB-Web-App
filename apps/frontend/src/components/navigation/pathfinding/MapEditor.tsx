import DraggableNode from './DraggableNode.tsx';
import React, { useState, useRef, useEffect } from 'react';
import ImportCSV from '../../ImportDept.tsx';
import ImportDept from '../../ImportDept.tsx';
import ImportNodes from '../../ImportNodes.tsx';
import ImportEdges from '../../ImportEdges.tsx';

export default function MapEditor() {
    const containerRef = useRef<HTMLDivElement>(null);
    const nodeRef = useRef<HTMLDivElement>(null);
    const isClicked = useRef<boolean>(false);

    useEffect(() => {
        if (!nodeRef.current || !containerRef.current) return;

        const node = nodeRef.current;
        const container = containerRef.current;

        const onMouseDown = (e: MouseEvent) => {
            console.log('onMouseDown');
            isClicked.current = true;
        };

        const onMouseUp = (e: MouseEvent) => {
            isClicked.current = false;
        };

        const onMouseMove = (e: MouseEvent) => {
            if (!isClicked.current) return;

            console.log('onMouseMove');
            node.style.top = `${e.clientY}px`;
            node.style.left = `${e.clientX}px`;
        };

        node.addEventListener('mousedown', onMouseDown);
        node.addEventListener('mouseup', onMouseUp);
        container.addEventListener('mousemove', onMouseMove);

        const cleanup = () => {
            node.removeEventListener('mousedown', onMouseDown);
            node.removeEventListener('mouseup', onMouseUp);
            container.removeEventListener('mousemove', onMouseMove);
        };

        return cleanup;
    }, []);

    return (
        <>
            <div
                ref={containerRef}
                className="relative outline-2 outline-gray-500 bg-sky-100 w-5/6 h-80 truncate m-10"
            >
                <div>
                    <DraggableNode ref={nodeRef} />
                </div>
            </div>
            <div>
                <h2>Import Nodes:</h2>
                <ImportNodes />
            </div>
            <div>
                <h2>Import Edges:</h2>
                <ImportEdges />
            </div>
        </>
    );
}
