import {graph} from "@/components/map/GraphObject.ts";
import {Node, Edge} from "@/components/navigation/pathfinding/Graph.ts";


export function createMarkers(
    map: google.maps.Map,
    nodes: Node[],
    setNodeDetails: (node: Node) => void,
    type: 'normal' | 'removed' = 'normal',
    onNodeMove: () => void,
    onNodeClicked?: (n: Node, m: google.maps.Marker) => void
    ) {
    const markers: google.maps.Marker[] = [];
    const iconUrl =
        type === 'removed'
            ? 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Basic_red_dot.png'
            : 'https://www.clker.com/cliparts/K/2/n/j/Q/i/blue-dot-md.png';
    const zIndex = type === 'removed' ? 9999 : 1; // Red dot on top, Blue dot at the bottom
    const scaledSize = new google.maps.Size(15, 15); // Larger red dot

    for (const node of nodes) {
        const coord: google.maps.LatLngLiteral = {
            lat: node.x-0.000002,
            lng: node.y,
        };

        const marker = new google.maps.Marker({
            position: coord,
            map: map,
            title: node.id.toString(),
            draggable: true,
            icon: {
                url: iconUrl,
                scaledSize: scaledSize,

            },
            zIndex
        });

        markerUI(marker, node, setNodeDetails, onNodeMove, onNodeClicked);
        markers.push(marker);
    }

    return markers;
}

function markerUI(marker: google.maps.Marker, node: Node,
                  setNodeDetails: (node: Node) => void, onNodeMove: () => void,
                  onNodeClicked?: (n: Node, m: google.maps.Marker) => void) {

    // Double click node to remove it temp
    marker.addListener('dblclick', () => {
        const connectedEdges = graph.getAllEdges().filter(
            edge => edge.sourceId.id === node.id || edge.targetId.id === node.id
        );

        graph.deleteNode(node.id); // delete node

        console.log("remove node");
        marker.setMap(null); // delete node visually/ polyline

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
                    { lat: node.x, lng: node.y },
                    { lat: otherNode.x, lng: otherNode.y }
                ],
                map: marker.getMap(),
                geodesic: true,
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 5,
            });

            tempPolylines.push(line);
        }
    });

    // Update polylines during drag
    marker.addListener('drag', () => {
        const pos = marker.getPosition();
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
                { lat: pos.lat()+0.000002, lng: pos.lng() },
                { lat: otherNode.x, lng: otherNode.y }
            ]);
        }
    });

    // Clean up when drag ends
    marker.addListener('dragend', () => {
        const newPos = marker.getPosition();
        setNodeDetails(node);
        if (newPos) {
            node.x = newPos.lat()+0.000002;
            node.y = newPos.lng();
            console.log(`Updated node ${node.id} to new position: (${node.x}, ${node.y})`);
            graph.editNode(node);
        }

        // Remove temporary polylines
        for (const line of tempPolylines) {
            line.setMap(null);
        }
        tempPolylines.length = 0;

        // Call onNodeMove to update the final state
        onNodeMove();
    });
}


export function addNodeListener(
    map: google.maps.Map,
    building: string,
    floor: number,
    setNodeDetails: (node: Node) => void,
    onNewMarker: (m: google.maps.Marker) => void,
    onNodeMove: () => void): google.maps.MapsEventListener {
    return google.maps.event.addListener(map, "dblclick", (event) => {
        const marker = new google.maps.Marker({
            position: event.latLng,
            map,
            title: "New Node",
            zIndex: 1,
            draggable: true,
            icon: {
                url: "https://www.clker.com/cliparts/K/2/n/j/Q/i/blue-dot-md.png",
                scaledSize: new google.maps.Size(15, 15),
            },
        });
        const id = Date.now();
        graph.addNode({ id: id, name:'', building, floor, x:event.latLng.lat(), y:event.latLng.lng(), edgeCost:0, totalCost:0 });
        console.log("New node added");
        markerUI(marker, graph.getNode(id),  setNodeDetails,  onNodeMove);
        onNewMarker(marker);
    });
}

