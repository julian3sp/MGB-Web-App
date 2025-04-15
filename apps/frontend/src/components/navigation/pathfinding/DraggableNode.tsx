import React, { useState, forwardRef } from 'react';

// Use 'forwardRef' to forward the ref from the parent component
const DraggableNode = forwardRef<HTMLDivElement, {}>((props, ref) => {
    const [node, setNode] = useState({
        id: 0,
        name: '',
        xCoordinate: 0,
        yCoordinate: 0,
    });

    return (
        <div
            ref={ref} // Directly use the forwarded ref
            className="absolute top-3 left-3 w-5 h-5 bg-blue-500 rounded-full text-white text-center cursor-grab"
        />
    );
});

DraggableNode.displayName = 'DraggableNode'; // This is useful for debugging

export default DraggableNode;