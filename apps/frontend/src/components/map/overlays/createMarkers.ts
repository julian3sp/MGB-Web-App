import {Node, Graph} from "@/components/navigation/pathfinding/Graph.ts";


export function createMarkers(map: google.maps.Map, Nodes: Node[]) {
    const markers: google.maps.Marker[] = [];
    for(const node of Nodes){
        const coord: google.maps.LatLngLiteral = {
            lat: node.x,
            lng: node.y,
        };

        console.log("Coord: ", coord.lat, coord.lng)

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



