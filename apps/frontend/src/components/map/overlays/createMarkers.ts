import {Edge, Node} from "@/components/navigation/pathfinding/Graph.ts";


export function createMarkers(map: google.maps.Map, Nodes: Node[]) {
    const markers: google.maps.Marker[] = [];
    for(const node of Nodes){
        const coord: google.maps.LatLngLiteral = {
            lat: node.x,
            lng: node.y,
        };

        // console.log("Coord: ", coord.lat, coord.lng)

        const marker = new google.maps.Marker({
            position: coord,
            map: map,
            title: '',
            icon: {
                url: 'https://www.clker.com/cliparts/K/2/n/j/Q/i/blue-dot-md.png',
                scaledSize: new google.maps.Size(8, 8) // width, height in pixels
            }        });
        markers.push(marker);
    }

    return markers
}

export function drawAllEdges(
    map: google.maps.Map,
    edges: Edge[]
  ): google.maps.Polyline[] {
    const polylines: google.maps.Polyline[] = [];
  
    for (const edge of edges) {
      const source: Node = edge.source;
      const target: Node = edge.target;
  
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