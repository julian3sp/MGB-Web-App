import {Edge, Node} from "@/components/navigation/pathfinding/Graph.ts";


export function createMarkers(map: google.maps.Map, Nodes: Node[], setNodeDetails: (node: Node) => void) {
    const markers: google.maps.Marker[] = [];
    console.log("creating markers")

    for(const node of Nodes){
        const coord: google.maps.LatLngLiteral = {
            lat: node.x,
            lng: node.y,
        };

        // console.log("Coord: ", coord.lat, coord.lng)

        const marker = new google.maps.Marker({
            position: coord,
            map: map,
            title: node.id.toString(),
            icon: {
                url: 'https://www.clker.com/cliparts/K/2/n/j/Q/i/blue-dot-md.png',
                scaledSize: new google.maps.Size(8, 8) // width, height in pixels
            }        });

        // const infoWindow = new google.maps.InfoWindow({
        //     content: `<div style="font-size:12px; padding:2px;">${node.id}</div>`,
        //     pixelOffset: new google.maps.Size(0, -8),
        // });

        marker.addListener('click', () => {
            setNodeDetails(node); // Call setNodeDetails to set the clicked node info
        });

        google.maps.event.addListener(map, 'dblclick', function(event) {
            console.log("double")
            // Try to prevent event propagation to the map
            const newMarker = new google.maps.Marker({
                position: event.latLng,
                map: map,
                title: 'New Node',
                zIndex: 9999,
                icon: {
                    url: 'https://www.clker.com/cliparts/K/2/n/j/Q/i/blue-dot-md.png',
                    scaledSize: new google.maps.Size(8, 8),
                },
            });
            markers.push(newMarker)
        });


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