import {graph} from "@/components/map/GraphObject.ts";
import {Node, Edge} from "@/components/navigation/pathfinding/Graph.ts";
// import { MarkerClusterer } from "@googlemaps/markerclusterer";
import {nodeMarker} from "./markerStyles.ts";


export function createMarkers(
    map: google.maps.Map,
    lib: google.maps.MarkerLibrary,
    nodes: Node[],
    setNodeDetails: (node: Node) => void,
    type: 'normal' | 'removed' = 'normal',
    onNodeMove: () => void,
    onNodeClicked?: (n: Node, m: google.maps.marker.AdvancedMarkerElement) => void
    ) {
    const markers: google.maps.marker.AdvancedMarkerElement[] = [];
    const zIndex = type === 'removed' ? 9999 : 1; // Red dot on top, Blue dot at the bottom

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

        markerUI(marker, node, setNodeDetails, onNodeMove, onNodeClicked);
        markers.push(marker);
    }

    return markers;
}

function markerUI(marker: google.maps.marker.AdvancedMarkerElement, node: Node,
                  setNodeDetails: (node: Node) => void, onNodeMove: () => void,
                  onNodeClicked?: (n: Node, m: google.maps.marker.AdvancedMarkerElement) => void){
    // Double click node to remove it
    const content = marker.content as HTMLElement;
    content.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        graph.deleteNode(node.id);
        console.log("remove node");
        // Animate the marker "popping"
        content.style.transition = "transform 0.7s ease, opacity 0.7s ease";
        content.style.transform = "scale(0)";
        content.style.opacity = "0";

        setTimeout(() => {
            graph.deleteNode(node.id);
            marker.map = null;
        }, 500); // Match the transition time (300ms)
    });

    // Get node Info
    marker.addListener('click', () => {
        setNodeDetails(node);
        if (onNodeClicked) onNodeClicked(node, marker);
    });

    marker.addListener('dragend', () => {
        const newPos = marker.position;
        setNodeDetails(node);
        if (newPos) {
            node.x = (newPos as google.maps.LatLngLiteral).lat;
            node.y = (newPos as google.maps.LatLngLiteral).lng;
            console.log(`Updated node ${node.id} to new position: (${node.x}, ${node.y})`);
        }
        onNodeMove();
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
        graph.addNode({ id: id, name:'', building, floor, x:event.latLng.lat(), y:event.latLng.lng(), edgeCost:0, totalCost:0 });
        const marker = new google.maps.marker.AdvancedMarkerElement({
            position: event.latLng,
            map,
            title: "New Node",
            zIndex: 1,
            content: nodeMarker(graph.neighborCount(id), "normal"),
        });
        console.log("New node added");
        // if (!node.id) continue;
        markerUI(marker, graph.getNode(id),  setNodeDetails,  onNodeMove);
        onNewMarker(marker);
    });
}

