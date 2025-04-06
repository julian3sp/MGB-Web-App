type  Edge<T> = {
    node: T;
    weight: number;
}

export class Graph<T> {
    private nodes: Set<T>;
    private adjacencyList: Map<T, Edge<T>[]>;

    constructor() {
        this.nodes = new Set<T>();
        this.adjacencyList = new Map<T, Edge<T>[]>();
    }

    addNode(node: T): void {
        this.nodes.add(node);
        if (!this.adjacencyList.has(node)) {
            this.adjacencyList.set(node, []);
        }
    }


    addEdge(source: T, destination: T, weight: number = 1, bidirectional: boolean = true): void {
        this.addNode(source);
        this.addNode(destination);

        this.adjacencyList.get(source)?.push({ node: destination, weight });

        if (bidirectional) {
            this.adjacencyList.get(destination)?.push({ node: source, weight });
        }
    }

    getNeighbors(node: T): Edge<T>[] {
        return this.adjacencyList.get(node) || [];
    }

    getNodes(): T[] {
        return Array.from(this.nodes);
    }
}
