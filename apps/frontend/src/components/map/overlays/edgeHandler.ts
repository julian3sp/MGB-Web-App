import {Edge, Node} from "@/components/navigation/pathfinding/Graph.ts";
import {graph} from "@/components/map/GraphObject.ts";

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
            strokeWeight: 5,
        });
        edgeLine.setMap(map);

        // on dblclick: remove the polyline + delete from graph
        edgeLine.addListener("dblclick", () => {
            // 1) remove it visually
            edgeLine.setMap(null);

            graph.deleteEdge(edge.id);
            console.log(`Edge ${edge.id} removed from graph`);
        });

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