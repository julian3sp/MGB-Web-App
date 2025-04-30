import {Node} from "@/components/navigation/pathfinding/Graph.ts";

export function WorldDistance(startNode: Node, targetNode: Node): number {
    const EARTH_RADIUS_M = 6_371_000;

    const lat1 = startNode.x * Math.PI / 180;
    const lon1 = startNode.y * Math.PI / 180;
    const lat2 = targetNode.x * Math.PI / 180;
    const lon2 = targetNode.y * Math.PI / 180;

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const sinDLat = Math.sin(dLat / 2);
    const sinDLon = Math.sin(dLon / 2);

    const a =
        sinDLat * sinDLat +
        Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return EARTH_RADIUS_M * c; // edge weight in metres
}