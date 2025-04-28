import {Node, Edge, Graph} from "./Graph.ts"
import {StrategyPathfind} from "./StrategyPathfind.ts";

abstract class WeightedPath implements StrategyPathfind {
    getNeighbors(graph: Graph, node: Node): Edge[] {
        return graph.adjacencyList.get(node) || [];
    }

    getLowestCostNode(nodes: Node[]): Node {
        /**
         * Returns the lowest code node from a list of nodes
         */
        const costs: number[] = [];
        for (const node of nodes) costs.push(node.totalCost);

        return nodes[costs.indexOf(Math.min(...costs))];
    }

    abstract costDifference(startNode: Node, targetNode: Node):number;

    pathFind(graph: Graph, startNode: Node, targetNode: Node): Node[] {
        const evaluate: Node[] = [startNode];
        const finished: Node[] = [];

        startNode.edgeCost = 0;
        startNode.totalCost = this.costDifference(startNode, targetNode);
        startNode.parent = undefined;

        while (evaluate.length > 0) {
            const currentNode: Node = this.getLowestCostNode(evaluate);

            if (currentNode === targetNode) return this.reCreatePath(currentNode);

            // Update evaluate and finished
            const currentIndex: number = evaluate.indexOf(currentNode);
            evaluate.splice(currentIndex, 1);
            finished.push(currentNode);

            const neighbors: Edge[] = this.getNeighbors(graph, currentNode); // Edges
            for (const edge of neighbors) {
                const neighbor: Node = edge.targetId;
                //skip node if checked
                if (finished.includes(edge.targetId)) continue;

                // cost of moving to new node
                const currentEdgeCost: number = neighbor.edgeCost + edge.weight;

                // Check for new node
                if (!evaluate.includes(neighbor)) {
                    evaluate.push(neighbor);
                }
                // Check if current path is better
                else if (currentEdgeCost >= neighbor.edgeCost) {
                    continue;
                }

                neighbor.parent = currentNode;
                neighbor.edgeCost = currentEdgeCost;
                neighbor.totalCost = currentEdgeCost + this.costDifference(neighbor, targetNode);
            }
        }
        return []; // No path found, should be impossible
    }

    reCreatePath(node: Node): Node[] {
        const path: Node[] = [];
        let currentNode: Node = node;
        while (currentNode !== undefined) {
            path.unshift(currentNode);
            if (currentNode.parent === undefined) {
                break;
            } else {
                currentNode = currentNode.parent;
            }
        }
        return path;
    }

}

export class AStar extends WeightedPath {
    costDifference(startNode: Node, targetNode: Node): number {
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
}

export class Dijkstras extends WeightedPath {
    costDifference(startNode: Node, targetNode: Node): number {
        return 0;
    }
}