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
            icon: { url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' },
        });
        markers.push(marker);
    }

    return markers
}

export function drawAllEdges(map: google.maps.Map, Edges: Edge[]){

    for (const edge of Edges) {
        const source: Node = edge.source;
        const target: Node = edge.target;
        // console.log("Source: ", source.id, ", target: ", target.id);

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
    }

}



