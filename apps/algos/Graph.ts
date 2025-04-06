import {start} from "@popperjs/core";

type Node<T> = {
    // Const prop
    name: string;

    // Dynamic props
    x: number; // SVG changes xy
    y: number;
    edgeCost: number;
    totalCost: number;
    parent?: Node<T>;
}

type  Edge<T> = {
    node: Node<T>;
    weight: number;
}

export class Graph<T> {
    private nodes: Set<Node<T>>;
    private adjacencyList: Map<Node<T>, Edge<T>[]>;

    constructor() {
        this.nodes = new Set<Node<T>>();
        this.adjacencyList = new Map<Node<T>, Edge<T>[]>();
    }

    addNode(node: Node<T>): void {
        this.nodes.add(node);
        if (!this.adjacencyList.has(node)) {
            this.adjacencyList.set(node, []);
        }
    }


    addEdge(source: Node<T>, destination: Node<T>, weight: number = 1, bidirectional: boolean = true): void {
        this.addNode(source);
        this.addNode(destination);

        this.adjacencyList.get(source)?.push({ node: destination, weight});

        if (bidirectional) {
            this.adjacencyList.get(destination)?.push({ node: source, weight});
        }
    }

    getNeighbors(node: Node<T>): Edge<T>[] {
        return this.adjacencyList.get(node) || [];
    }

    getNodes(): Node<T>[] {
        return Array.from(this.nodes);
    }

    BFS(startNode: Node<T>, targetNode: Node<T>, ): Node<T>[]{
        const visited: Node<T>[] = [];
        const queue: Node<T>[] = [startNode];
        const path: Node<T>[] = [];

        while (queue.length > 0) {
            let currentNode: Node<T> | undefined = queue.shift(); // Same as real pop first element
            if(currentNode === undefined) break; // TypeScript weird stuff bruh
            if (!visited.includes(currentNode)) {
                visited.push(currentNode);
                path.push(currentNode);

                //Target is found
                if(currentNode === targetNode) break;

                let neighbors: Edge<T>[] = this.getNeighbors(currentNode) // Edges
                for (let edge of neighbors) {
                    if(!visited.includes(edge.node)) {
                        queue.push(edge.node);
                    }
                }
            }
        }

        return path; // Change this
    }

    heuristicCost(startNode: Node<T>, targetNode: Node<T>): number {
        /**
         * Calculate the heuristic cost for current node
         */
        return Math.sqrt(Math.pow(targetNode.x - startNode.x, 2) + Math.pow(targetNode.y - - startNode.y, 2));
    }

    getLowestCostNode(nodes: Node<T>[]): Node<T> {
        /**
         * Returns the lowest code node from a list of nodes
         */
        const costs: number[] = [];
        for(let node of nodes) costs.push(node.totalCost);

        return nodes[ costs.indexOf( Math.min(...costs) ) ];
    }

    reCreatePath(node: Node<T>): Node<T>[] {
        /**
         * Recreates the path given parent nodes of current node
         */
        const path: Node<T>[] = [];
        let currentNode: Node<T> = node;
        while(currentNode !== undefined){
            path.push(currentNode);
            if(currentNode.parent === undefined){
                break;
            }
            else{
                currentNode = currentNode.parent;
            }
        }
        return path;
    }


    aStar(startNode: Node<T>, targetNode: Node<T>): Node<T>[] {
        const evaluate: Node<T>[] = [startNode];
        const finished: Node<T>[] = [];

        startNode.edgeCost = 0;
        startNode.totalCost = this.heuristicCost(startNode, targetNode);
        startNode.parent = undefined;

        while(evaluate.length > 0) {
            let currentNode: Node<T> = this.getLowestCostNode(evaluate);

            if(currentNode === targetNode) return this.reCreatePath(currentNode);

            // Update evaluate and finished
            let currentIndex: number = evaluate.indexOf(currentNode);
            evaluate.splice(currentIndex, 1);
            finished.push(currentNode);

            let neighbors: Edge<T>[] = this.getNeighbors(currentNode) // Edges
            for (let edge of neighbors){
                let neighbor: Node<T> = edge.node;
                if(finished.indexOf(edge.node) === -1) continue;

                // cost of moving to new node
                let currentEdgeCost: number = neighbor.edgeCost + edge.weight;

                // Check for new node
                if(evaluate.indexOf(edge.node) !== -1){
                    evaluate.push(neighbor);
                }
                // Check if current path is better
                else if(currentEdgeCost >= neighbor.edgeCost){
                    continue;
                }

                neighbor.parent = currentNode;
                neighbor.edgeCost = currentEdgeCost;
                neighbor.totalCost = currentEdgeCost + this.heuristicCost(currentNode, targetNode);
            }
        }
        return [];// No path found, should be impossible
    }


    findPath(startNode: T, targetNode: T, pathType: (start: T, end:T) => T[]): T[]{
        return pathType(startNode, targetNode);
    }

}
