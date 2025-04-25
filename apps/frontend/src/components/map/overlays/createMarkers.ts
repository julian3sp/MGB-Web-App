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
                  onNodeClicked?: (n: Node, m: google.maps.Marker) => void){
    // Double click node to remove it temp
    marker.addListener('dblclick', () => {
        graph.deleteNode(node.id);
        console.log("remove node");
        marker.setMap(null);
    });

    // Get node Info
    marker.addListener('click', () => {
        setNodeDetails(node);
        if (onNodeClicked) onNodeClicked(node, marker);
    });

    marker.addListener('dragend', () => {
        const newPos = marker.getPosition();
        setNodeDetails(node);
        if (newPos) {
            node.x = newPos.lat();
            node.y = newPos.lng();
            console.log(`Updated node ${node.id} to new position: (${node.x}, ${node.y})`);
            graph.editNode(node)
        }
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

