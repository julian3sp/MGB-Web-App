import {graph} from "@/components/map/GraphObject.ts";
import {Node, NodeType} from "@/components/navigation/pathfinding/Graph.ts";

import {nodeMarker} from "./markerStyles.ts";

let prevMarker: google.maps.marker.AdvancedMarkerElement | null = null;

export function createMarkers(
    map: google.maps.Map,
    lib: google.maps.MarkerLibrary,
    nodes: Node[],
    setNodeDetails: (node: Node) => void,
    // onNodeMove: () => void,
    setSelectedNode?: (n: Node, m: google.maps.marker.AdvancedMarkerElement) => void
    ) {
    const markers: google.maps.marker.AdvancedMarkerElement[] = [];
    const zIndex = 9999;

    for (const node of nodes) {
        const coord: google.maps.LatLngLiteral = {
            lat: node.x-0.000002,
            lng: node.y,
        };
        if (!node.id) continue;
        const marker = new google.maps.marker.AdvancedMarkerElement({
            position: coord,
            map: map,
            title: node.id.toString(),
            gmpDraggable: true,
            content: nodeMarker(graph.neighborCount(node.id), "normal"),
            collisionBehavior: lib.CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY,
            zIndex
        });

        markerUI(marker, node, setNodeDetails, setSelectedNode);
        markers.push(marker);
    }

    return markers;
}

function markerUI(marker: google.maps.marker.AdvancedMarkerElement, node: Node,
                  setSelectedNode: (node: Node) => void,
                  onNodeClicked?: (n: Node, m: google.maps.marker.AdvancedMarkerElement) => void) {

    // Double click node to remove it
    const content = marker.content as HTMLElement;

    // Correct double click detection for AdvancedMarkerElement
    content.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        const connectedEdges = graph.getAllEdges().filter(
            edge => edge.sourceId.id === node.id || edge.targetId.id === node.id
        );

        graph.deleteNode(node.id); // delete node
        console.log("remove node");
        content.style.transition = "transform 0.7s ease, opacity 0.7s ease";
        content.style.transform = "scale(0)";
        content.style.opacity = "0";

        // After animation, delete from graph and hide marker
        setTimeout(() => {
            graph.deleteNode(node.id);
            marker.map = null;
        }, 500); // Match the transition time (300ms)

        connectedEdges.forEach(edge => {
            // You can delete the polyline by setting its map to null here
            if (edge.polyline) edge.polyline.setMap(null);
        });
    });

    // Track all temporary polylines we create for this node
    const tempPolylines: google.maps.Polyline[] = [];

    marker.addListener('dragstart', () => {
        const connectedEdges = graph.getAllEdges().filter(
            edge => edge.sourceId.id === node.id || edge.targetId.id === node.id
        );
        // Delete edges from the graph and from the map visually
        connectedEdges.forEach(edge => {
            // You can delete the polyline by setting its map to null here
            if (edge.polyline) edge.polyline.setMap(null);
        });


        // Create a temporary polyline for each connected edge
        for (const edge of connectedEdges) {
            const otherNode = edge.sourceId.id === node.id ? edge.targetId : edge.sourceId;
            const line = new google.maps.Polyline({
                path: [
                    {lat: node.x, lng: node.y},
                    {lat: otherNode.x, lng: otherNode.y}
                ],
                map: marker.map,
                geodesic: true,
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 5,
            });
            tempPolylines.push(line);
        }
    });
    // Get node Info
    content.addEventListener('click', (e) => {
        e.stopPropagation();
        setSelectedNode(node);
        if (onNodeClicked) onNodeClicked(node, marker);
        content.classList.add("node-selected");
        if (prevMarker && prevMarker.content) {
            (prevMarker.content as HTMLElement).classList.remove("node-selected");
        }
        content.classList.add("node-selected");
        prevMarker = marker;
    })


    // Update polylines during drag
    marker.addListener('drag', () => {
        const pos = marker.position;
        if (!pos) return;

        // Find all edges connected to this node
        const connectedEdges = graph.getAllEdges().filter(
            edge => edge.sourceId.id === node.id || edge.targetId.id === node.id
        );

        // Update each temporary polyline
        for (let i = 0; i < connectedEdges.length && i < tempPolylines.length; i++) {
            const edge = connectedEdges[i];
            const line = tempPolylines[i];
            const otherNode = edge.sourceId.id === node.id ? edge.targetId : edge.sourceId;

            line.setPath([
                {
                    lat: (pos as google.maps.LatLngLiteral).lat + 0.000002,
                    lng: (pos as google.maps.LatLngLiteral).lng
                },
                {lat: otherNode.x, lng: otherNode.y}
            ]);
        }
    });

    // Clean up when drag ends
    marker.addListener('dragend', () => {
        const newPos = marker.position;
        setSelectedNode(node);
        if (newPos) {
            node.x = (newPos as google.maps.LatLngLiteral).lat + 0.000002;
            node.y = (newPos as google.maps.LatLngLiteral).lng;
            console.log(`Updated node ${node.id} to new position: (${node.x}, ${node.y})`);
            graph.editNode(node);
        }

        // Remove temporary polylines
        for (const line of tempPolylines) {
            line.setMap(null);
        }
        tempPolylines.length = 0;


    });
}

export function addNodeListener(
    map: google.maps.Map,
    building: string,
    floor: number,
    setNodeDetails: (node: Node) => void,
    onNewMarker: (m: google.maps.marker.AdvancedMarkerElement) => void,
    onNodeMove: () => void): google.maps.MapsEventListener {
    return google.maps.event.addListener(map, "dblclick", (event) => {
        const id = Date.now();
        graph.addNode({
            id: id,
            name: '',
            building,
            floor,
            x: event.latLng.lat(),
            y: event.latLng.lng(),
            edgeCost: 0,
            totalCost: 0,
            type: NodeType.Hall
        });
        const marker = new google.maps.marker.AdvancedMarkerElement({
            position: event.latLng,
            map,
            title: "New Node",
            zIndex: 1,
            gmpDraggable: true,
            content: nodeMarker(graph.neighborCount(id), "normal"),
        });
        console.log("New node added");
        // if (!node.id) continue;
        markerUI(marker, graph.getNode(id), setNodeDetails, onNodeMove);
        onNewMarker(marker);
    });
}

