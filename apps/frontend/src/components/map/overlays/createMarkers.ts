import {hospitalGraph} from "@/components/navigation/pathfinding/cache.ts";
import {Node} from "@/components/navigation/pathfinding/Graph.ts";

const source: Node | undefined | null = hospitalGraph.getNode(1)
const target: Node | undefined | null = hospitalGraph.getNode(2)


let testPath: Node[] = []

if (!source || !target) {
    console.error("Invalid source or target node");
} else {
    testPath = hospitalGraph.aStar(source, target);
}


export function createMarkers(map: google.maps.Map, Nodes: Node[]) {
    const markers: google.maps.Marker[] = [];

    for(const node of Nodes){
        const coord: google.maps.LatLngLiteral = {
            lat: node.x,
            lng: node.y,
        };

        const marker = new google.maps.Marker({
            position: coord,
            map: map,
            title: '',
            icon: { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' },
        });
        markers.push(marker);
    }

    return markers
}



