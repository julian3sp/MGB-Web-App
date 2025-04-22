import {graph} from "@/components/map/GraphObject.ts";
import {Node, Edge} from "@/components/navigation/pathfinding/Graph.ts";


export function createMarkers(
    map: google.maps.Map,
    nodes: Node[],
    setNodeDetails: (node: Node) => void,
    type: 'normal' | 'removed' = 'normal',
    building: string,
    floor: number,
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
            lat: node.x,
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

        // Get node Info
        marker.addListener('click', () => {
            setNodeDetails(node);
        });

        // Double click node to remove it temp
        marker.addListener('dblclick', () => {
           graph.deleteNode(node.id);
            const newMarker = new google.maps.Marker({
                position: {lat: node.x, lng: node.y},
                map: map,
                title: 'New Node',
                zIndex: 9999,
                icon: {
                    url: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Basic_red_dot.png',
                    scaledSize: scaledSize,
                },
            });
            console.log("remove node");
            markers.push(newMarker);
        });

        markers.push(marker);
    }

    return markers;
}


export function addNodeListener(
    map: google.maps.Map,
    building: string,
    floor: number,
    onNewMarker: (m: google.maps.Marker) => void): google.maps.MapsEventListener {
    return map.addListener("dblclick", (event) => {
        const marker = new google.maps.Marker({
            position: event.latLng,
            map,
            title: "New Node",
            zIndex: 1,
            icon: {
                url: "https://www.clker.com/cliparts/K/2/n/j/Q/i/blue-dot-md.png",
                scaledSize: new google.maps.Size(1, 1),
            },
        });

        const id = Date.now();
        graph.addNode({ id: id, name:'', building, floor, x:event.latLng.lat(), y:event.latLng.lng(), edgeCost:0, totalCost:0 });
        console.log("New node added");
        onNewMarker(marker);
    });
}


export function drawAllEdges(
    map: google.maps.Map,
    edges: Edge[]
  ): google.maps.Polyline[] {
    const polylines: google.maps.Polyline[] = [];
  
    for (const edge of edges) {
      const source: Node = edge.sourceId;
      const target: Node = edge.targetId;
      const sourceCoord: google.maps.LatLngLiteral = { lat: source.x, lng: source.y };
      const targetCoord: google.maps.LatLngLiteral = { lat: target.x, lng: target.y };
  
      const edgeLine = new google.maps.Polyline({
        path: [sourceCoord, targetCoord],
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
  
      edgeLine.setMap(map);
      polylines.push(edgeLine);
    }
    if(polylines.length === 0) console.log("edges not found");
    return polylines;
}

export function drawPath(map: google.maps.Map, nodes: Node[]){
    // Initialize an array to hold coordinates (using LatLngLiteral for type-safety)
    const path: google.maps.LatLngLiteral[] = [];

    for (const node of nodes) {
        const targetCoord: google.maps.LatLngLiteral = { lat: node.x, lng: node.y};
        path.push(targetCoord);
    }
    const polyline = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
    });
    polyline.setMap(map);
    return polyline;
}