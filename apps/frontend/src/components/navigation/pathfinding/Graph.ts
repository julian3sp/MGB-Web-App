import {trpc} from "@/lib/trpc.ts";

export type Node = {
    name: string | null
    id: number
    building: string
    floor: number
    x: number
    y: number
    edgeCost: number
    totalCost: number
    parent?: Node;
}

export type  Edge = {
    source: Node
    target: Node;
    weight: number;
}


export class Graph {
    private nodes: Set<Node>;
    private adjacencyList: Map<Node, Edge[]>;
    private edges: Edge[];

    constructor() {
        this.nodes = new Set<Node>();
        this.adjacencyList = new Map<Node, Edge[]>();
        this.edges = []
    }

    populate(nodesData: Node[], edgesData: { sourceId: number, targetId: number, weight: number }[]) {
        // Create nodes from nodesData.
        const allNodes: Node[] = nodesData.map((n) => ({
          ...n,
          name: `node-${n.id}`,
          edgeCost: 0,
          totalCost: 0,
          parent: undefined
        }));

        const allEdges: Edge[] = (edgesData).map((n) => ({
            ...n,
            source: allNodes[n.sourceId - 1],
            target: allNodes[n.targetId - 1],
        }));

        this.edges = allEdges

        for (const edge of allEdges) {
            this.addEdge(edge.source, edge.target, edge.weight)
        }
    }

    addNode(node: Node): void {
        this.nodes.add(node);
        if (!this.adjacencyList.has(node)) {
            this.adjacencyList.set(node, []);
        }
    }

    addEdge(source: Node, destination: Node, weight: number, bidirectional: boolean = true): void {
        this.addNode(source);
        this.addNode(destination);

        this.adjacencyList.get(source)?.push({source: source, target: destination, weight });

        if (bidirectional) {
            this.adjacencyList.get(destination)?.push({source: source, target: source, weight });
        }
    }

    getNeighbors(node: Node): Edge[] {
        return this.adjacencyList.get(node) || [];
    }

    getNode(id: number): Node | undefined {
        const nodes: Node[] = this.getNodes();
        return nodes.find((node) => node.id === id);
    }

    getNodes(): Node[] {
        return Array.from(this.nodes);
    }

    getEdges(): Edge[] {
        return this.edges;
    }

    BFS(startNode: Node, targetNode: Node): Node[] {
        const visited: Node[] = [];
        const queue: Node[] = [startNode];
        const path: Node[] = [];

        startNode.parent = undefined;

        while (queue.length > 0) {
            const currentNode: Node | undefined = queue.shift(); // Same as real pop first element
            if (currentNode === undefined) break; // TypeScript weird stuff bruh
            if (!visited.includes(currentNode)) {
                visited.push(currentNode);
                //Target is found
                if (currentNode === targetNode) break;

                const neighbors: Edge[] = this.getNeighbors(currentNode); // Edges
                for (const edge of neighbors) {
                    const neighbor = edge.target;
                    if (!visited.includes(neighbor)) {
                        neighbor.parent = currentNode;
                        queue.push(neighbor);
                    }
                }
            }
        }

        return this.reCreatePath(targetNode);
    }

    DFS(startNode: Node, targetNode: Node): Node[] {
        const visited: Node[] = [];
        const stack: Node[] = [startNode];

        startNode.parent = undefined;

        while (stack.length > 0) {
            const currentNode = stack.pop();
            if (!currentNode) break;

            if (!visited.includes(currentNode)) {
                visited.push(currentNode);

                if (currentNode === targetNode) break;

                const neighbors = this.getNeighbors(currentNode);

                for (let i = neighbors.length - 1; i >= 0; i--) {
                    const neighbor = neighbors[i].target;
                    if (!visited.includes(neighbor)) {
                        neighbor.parent = currentNode;
                        stack.push(neighbor);
                    }
                }
            }
        }

        return this.reCreatePath(targetNode);
    }




    heuristicCost(startNode: Node, targetNode: Node): number {
        /**
         * Calculate the heuristic cost for current node
         */
        return Math.sqrt(
            Math.pow(targetNode.x - startNode.x, 2) + Math.pow(targetNode.y - startNode.y, 2)
        );
    }

    getLowestCostNode(nodes: Node[]): Node {
        /**
         * Returns the lowest code node from a list of nodes
         */
        const costs: number[] = [];
        for (const node of nodes) costs.push(node.totalCost);

        return nodes[costs.indexOf(Math.min(...costs))];
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

    aStar(startNode: Node, targetNode: Node): Node[] {
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

            const neighbors: Edge[] = this.getNeighbors(currentNode); // Edges
            for (const edge of neighbors) {
                const neighbor: Node = edge.target;
                //skip node if checked
                if (finished.includes(edge.target)) continue;

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
}

export default Graph;

// Test

// const node0: Node = { name: "0", x: 0,  y: 0,  edgeCost: 0, totalCost: 0 };
// const node1: Node = { name: "1", x: -1, y: 1,  edgeCost: 0, totalCost: 0 };
// const node2: Node = { name: "2", x: 1,  y: 1,  edgeCost: 0, totalCost: 0 };
// const node3: Node = { name: "3", x: -2, y: 2,  edgeCost: 0, totalCost: 0 };
// const node4: Node = { name: "4", x: 2,  y: 2,  edgeCost: 0, totalCost: 0 };
// const node5: Node = { name: "5", x: -1, y: 3, edgeCost: 0, totalCost: 0 };
// const node6: Node = { name: "6", x: 1,  y: 3, edgeCost: 0, totalCost: 0 };
// const node7: Node = { name: "7", x: 0,  y: 4, edgeCost: 0, totalCost: 0 };
//
// // Instantiate the graph
// const graph = new Graph();
//
// graph.addEdge(node0, node1, 4);
// graph.addEdge(node0, node2, 8);
// graph.addEdge(node0, node4, 1);
//
// graph.addEdge(node1, node3, 7);
// graph.addEdge(node1, node5, 1);
// graph.addEdge(node3, node5, 1);
//
// graph.addEdge(node2, node6, 5);
//
// graph.addEdge(node4, node6, 9);
//
// graph.addEdge(node5, node7, 8);
//
//
//
// //BFS
// const bfsPath = graph.BFS(node0, node7);
// console.log("\nBFS Path:");
// console.log(bfsPath.map(node => node.name).join(" -> "));
//
// //A*
// const aStarPath = graph.aStar(node0, node7);
// console.log("\nA* Path:");
// console.log(aStarPath.map(node => node.name).join(" -> "));




