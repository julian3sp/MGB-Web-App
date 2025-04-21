import {Edge, Node} from "@/components/navigation/pathfinding/Graph.ts";


export function createMarkers(
    map: google.maps.Map,
    nodes: Node[],
    setNodeDetails: (node: Node) => void,
    setAddNode: (node: Node) => void,
    type: 'normal' | 'removed' = 'normal'
) {
    const markers: google.maps.Marker[] = [];
    const iconUrl =
        type === 'removed'
            ? 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Basic_red_dot.png'
            : 'https://www.clker.com/cliparts/K/2/n/j/Q/i/blue-dot-md.png';
    const zIndex = type === 'removed' ? 9999 : 1; // Red dot on top, Blue dot at the bottom
    const scaledSize = new google.maps.Size(10, 10); // Larger red dot

    google.maps.event.addListener(map, 'dblclick', function (event) {
        const newMarker = new google.maps.Marker({
            position: event.latLng,
            map: map,
            title: 'New Node',
            zIndex: 9999,
            icon: {
                url: 'https://www.clker.com/cliparts/K/2/n/j/Q/i/blue-dot-md.png',
                scaledSize: scaledSize,
            },
        });
        markers.push(newMarker);
    });
    google.maps.event.addListener(map, 'dblclick', function (event) {
        setAddNode({
            id: Date.now(), // or another unique value
            name: '',
            building: 'Main',
            floor:  1,
            x: event.latLng.lat(),
            y: event.latLng.lng(),
            edgeCost: 0, // default value
            totalCost: 0, // default value
        });
    });
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

        marker.addListener('click', () => {
            setNodeDetails(node);
        });


        markers.push(marker);
    }

    return markers;
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