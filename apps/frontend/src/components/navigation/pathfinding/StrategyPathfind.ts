import {Node, Edge, Graph} from "./Graph.ts"
import {node} from "prop-types";

export interface StrategyPathfind{
    pathFind(graph:Graph, startNode: Node, targetNode: Node): Node[]
    getNeighbors(graph: Graph, node: Node): Edge[]
    reCreatePath(node: Node): Node[]
}

export class AStar implements StrategyPathfind {

    getLowestCostNode(nodes: Node[]): Node {
        /**
         * Returns the lowest code node from a list of nodes
         */
        const costs: number[] = [];
        for (const node of nodes) costs.push(node.totalCost);

        return nodes[costs.indexOf(Math.min(...costs))];
    }

    heuristicCost(startNode: Node, targetNode: Node): number {
        /**
         * Calculate the heuristic cost for current node
         */
        return Math.sqrt(
            Math.pow(targetNode.x - startNode.x, 2) + Math.pow(targetNode.y - startNode.y, 2)
        );
    }

    reCreatePath(node: Node): Node[] {
        /**
         * Recreates the path given parent nodes of current node
         */
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

    pathFind = (graph:Graph, startNode: Node, targetNode: Node) =>{

        const evaluate: Node[] = [startNode];
        const finished: Node[] = [];

        startNode.edgeCost = 0;
        startNode.totalCost = this.heuristicCost(startNode, targetNode);
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
                neighbor.totalCost = currentEdgeCost + this.heuristicCost(neighbor, targetNode);
            }
        }
        return []; // No path found, should be impossible
    }

    getNeighbors(graph: Graph, node: Node): Edge[] {
        return graph.adjacencyList.get(node) || [];
    }
}

export class BFS implements StrategyPathfind {
    pathFind(graph: Graph, startNode: Node, targetNode: Node): Node[] {
        const visited: Node[] = [];
        const queue: Node[] = [startNode];

        startNode.parent = undefined;

        while (queue.length > 0) {
            const currentNode: Node | undefined = queue.shift(); // Same as real pop first element
            if (currentNode === undefined) break; // TypeScript weird stuff bruh
            if (!visited.includes(currentNode)) {
                visited.push(currentNode);
                //targetId is found
                if (currentNode === targetNode) break;

                const neighbors: Edge[] = this.getNeighbors(graph, currentNode); // Edges
                for (const edge of neighbors) {
                    const neighbor = edge.targetId;
                    if (!visited.includes(neighbor)) {
                        neighbor.parent = currentNode;
                        queue.push(neighbor);
                    }
                }
            }
        }

        return this.reCreatePath(targetNode);
    }

    getNeighbors(graph: Graph, node: Node): Edge[] {
        return graph.adjacencyList.get(node) || [];
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

export class DFS implements StrategyPathfind {
    getNeighbors(graph: Graph, node: Node): Edge[] {
        return graph.adjacencyList.get(node) || [];
    }

    pathFind(graph: Graph, startNode: Node, targetNode: Node): Node[] {
        const visited: Node[] = [];
        const stack: Node[] = [startNode];

        startNode.parent = undefined;

        while (stack.length > 0) {
            const currentNode = stack.pop();
            if (!currentNode) break;

            if (!visited.includes(currentNode)) {
                visited.push(currentNode);

                if (currentNode === targetNode) break;

                const neighbors = this.getNeighbors(graph, currentNode);

                for (let i = neighbors.length - 1; i >= 0; i--) {
                    const neighbor = neighbors[i].targetId;
                    if (!visited.includes(neighbor)) {
                        neighbor.parent = currentNode;
                        stack.push(neighbor);
                    }
                }
            }
        }

        return this.reCreatePath(targetNode);
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

export class PathContext {
    private pathAlgorithm: StrategyPathfind| undefined;

    get getPathAlgorithm(): StrategyPathfind | undefined {
        return this.pathAlgorithm;
    }

    set setPathAlgorithm(value: StrategyPathfind | undefined) {
        this.pathAlgorithm = value;
    }

    constructor() {
    }

    setStrategyPathfind(newGrowthAlgorithm: StrategyPathfind): string {
        this.pathAlgorithm = newGrowthAlgorithm;
        return ``;
    }

    pathFind(graph:Graph, sourceNode: Node, targetNode: Node): Node[] {
        return this.pathAlgorithm.pathFind(graph, sourceNode, targetNode);
    }
}