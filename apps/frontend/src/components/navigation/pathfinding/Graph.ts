export enum NodeType {
    Department = "Department",
    Elevator  = "Elevator",
    Stairwell = "Stairwell",
    Checkin = "Checkin",
    Entrance = "Entrance",
    ParkingLot = "Parking Lot",
    Hall = "Hall",
    Restroom = "Restroom",
    SkyBridge = "Sky Bridge",
}

export type Node = {
    name: string
    id: number | undefined
    building: string
    floor: number
    x: number
    y: number
    edgeCost: number
    totalCost: number
    parent?: Node;
    type: NodeType;
}

export type  Edge = {
    id: number
    sourceId: Node
    targetId: Node;
    weight: number;
    polyline?:google.maps.Polyline;
}

type Edit = {
    deletedNodes: number[];
    deletedEdges: number[];
    addedNodes: Node[];
    addedEdges: Edge[];
    editedNodes: Node[];
}


export class Graph {
    private nodes: Set<Node>;
    adjacencyList: Map<Node, Edge[]>;
    private edges: Edge[];
    private edits: Edit;

    constructor() {
        this.nodes = new Set<Node>();
        this.adjacencyList = new Map<Node, Edge[]>();
        this.edges = []
        this.edits = {
            deletedNodes: [],
            addedNodes: [],
            deletedEdges: [],
            addedEdges: [],
            editedNodes: [],
        }
    }

    string2NT(string: string): NodeType {
        switch (string) {
            case "Department":
                return NodeType.Department;
            case "Elevator":
                return NodeType.Elevator;
            case "Stairwell":
                return NodeType.Stairwell;
            case "Checkin":
                return NodeType.Checkin;
            case "Entrance":
                return NodeType.Entrance;
            case "ParkingLot":
                return NodeType.ParkingLot;
            case "Restroom":
                return NodeType.Restroom;
            case "SkyBridge":
                return NodeType.SkyBridge;
            default:
                return NodeType.Hall;
        }
    }

    populate(nodesData: { id: number, name: string, building: string, floor: number, x: number, y: number,
                          edgeCost: number, totalCost: number, parent?: Node; type: string}[],
             edgesData: { id:number, sourceId: number, targetId: number, weight: number }[]) {
        // Reinit
        this.nodes = new Set<Node>();
        this.adjacencyList = new Map<Node, Edge[]>();
        this.edges = []
        this.resetEditHistory();

        for (const raw of nodesData) {
            let nodeType;
            switch (raw.type) {
                case "Department":
                    nodeType = NodeType.Department;
                    break;
                case "Elevator":
                    nodeType = NodeType.Elevator;
                    break;
                case "Stairwell":
                    nodeType = NodeType.Stairwell;
                    break;
                case "Checkin":
                    nodeType = NodeType.Checkin;
                    break;
                case "Entrance":
                    nodeType = NodeType.Entrance;
                    break;
                case "Parking Lot":
                    nodeType = NodeType.ParkingLot;
                    break;
                case "Hall":
                    nodeType = NodeType.Hall;
                    break;
                case "Restroom":
                    nodeType = NodeType.Restroom;
                    break;
                case "Sky Bridge":
                    nodeType = NodeType.SkyBridge;
                    break;
                default:
                    nodeType = NodeType.Hall;
                    break;
            }

            const node: Node = {
                id: raw.id,
                name: `node-${raw.id}`,
                building: raw.building,
                floor: raw.floor,
                x: raw.x,
                y: raw.y,
                edgeCost: 0,
                totalCost: 0,
                parent: undefined,
                type: nodeType,

            };
            this.nodes.add(node);
            this.adjacencyList.set(node, []);
        }

        const allEdges: Edge[] = (edgesData).map((e) => ({
            ...e,
            id: e.id,
            sourceId: this.getNode(e.sourceId),
            targetId: this.getNode(e.targetId),

            // node = this.getNode(e.sourceId),
            // this.nodesClass.push(new NodeClass(node.))
        }));


        this.addEdges(allEdges);
        this.resetEditHistory();
        console.log("Graph successfully populated")
        console.log("Node Count: ", this.nodes.size);
        console.log("Edge Count: ", this.edges.length);
        console.log(this.edits)

    }


    resetEditHistory(): void{
        this.edits = {
            deletedNodes: [],
            addedNodes: [],
            deletedEdges: [],
            addedEdges: [],
            editedNodes: [],
        }
        console.log("Edit History Reseted");
    }

    getEditHistory(): Edit{
        return this.edits;
    }

    addNode(node: Node): void {
        this.nodes.add(node);
        if (!this.adjacencyList.has(node)) {
            this.adjacencyList.set(node, []);
            this.edits.addedNodes.push(node);
        }
    }

    editNode(node: Node): void {
        const isAdded = this.edits.addedNodes.some(n => n.id === node.id);

        if (isAdded) {
            // Update the node in addedNodes if it's already there
            const n = this.edits.addedNodes.find(n => n.id === node.id);
            if (n) {
                n.x = node.x;
                n.y = node.y;
                n.type = node.type;
            }
        } else {
            // Either update existing edited node or push it in
            const existing = this.edits.editedNodes.find(n => n.id === node.id);
            if (existing) {
                existing.x = node.x;
                existing.y = node.y;
                existing.type = node.type
            } else {
                this.edits.editedNodes.push({ ...node });
            }
        }
        // console.log(this.edits.editedNodes);
    }

    deleteNode(id:number): void {
        const deletedNode = Array.from(this.nodes).find(n => n.id === id);
        if (!deletedNode){
            console.log("No node with id " + id);
            return;
        }

        const addedIdx = this.edits.addedNodes.findIndex(n => n.id === id);
        if (addedIdx !== -1) {
            // remove from addedNodes
            this.edits.addedNodes.splice(addedIdx, 1);
            this.edits.addedEdges = this.edits.addedEdges.filter(
                e => e.sourceId.id !== id && e.targetId.id !== id
            );
        }

        const keptEdges: Edge[] = [];
        for (const e of this.edges) {
            const connectedEdge = e.sourceId.id === id || e.targetId.id === id;
            if (connectedEdge) {
                this.deleteEdge(e.id);
            } else {
                keptEdges.push(e);
            }
        }
        this.edges = keptEdges;

        /* rebuild the adjacency */
        const newAdjacency = new Map<Node, Edge[]>();

        for (const [node, edges] of this.adjacencyList.entries()) {
            if (node.id === id) continue;

            const filtered = edges.filter(
                edge => edge.sourceId.id !== id && edge.targetId.id !== id
            );
            newAdjacency.set(node, filtered);
        }
        this.adjacencyList = newAdjacency;

        /* rebuild the node set*/
        this.nodes = new Set([...this.nodes].filter(n => n.id !== id));

        /* clear parent pointers  */
        for (const n of this.nodes) {
            if (n.parent?.id === id) n.parent = undefined;
        }

        if (addedIdx === -1) {
            this.edits.deletedNodes.push(id);
        }
    }

    addEdge(edge: Edge): void {
        const id = edge.id;
        const sourceId = edge.sourceId;
        const targetId = edge.targetId;
        const weight = edge.weight;

        if (!sourceId && !targetId) return;
        this.addNode(sourceId);
        this.addNode(targetId);

        this.adjacencyList
            .get(sourceId)
            ?.push({ id: id, sourceId: sourceId, targetId: targetId, weight: weight });
        this.adjacencyList.get(targetId)?.push({id: id, sourceId: targetId, targetId: sourceId, weight: weight });

        this.edits.addedEdges.push({sourceId: sourceId.id, targetId: targetId.id, weight: weight});
        this.edges.push(edge)
    }

    addEdges(edges: Edge[]): void {
        for (const edge of edges) {
            this.addEdge(edge);
        }
    }

    deleteEdge(id:number): void {
        const edge = this.getEdge(id);

        // Check if edge exists
        if(!edge) {
            console.log("Failed to delete edge");
            return;
        }

        this.edges = this.edges.filter(e => e.id !== id);
        this.edits.deletedEdges.push(id);

        const fromSrc = this.adjacencyList.get(edge.sourceId);
        if (fromSrc) {
            this.adjacencyList.set(
                edge.sourceId,
                fromSrc.filter(e => e.id !== id)
            );
            this.adjacencyList.set(
                edge.targetId,
                fromSrc.filter(e => e.id !== id)
            );
        }
    }

    getNode(id: number): Node | undefined {
        return Array.from(this.nodes).find((node) => node.id === id);
    }

    getEdge(id: number): Edge | undefined {
        const edge = this.edges.find((edge) => edge.id === id);
        if (!edge) {
            console.error("Failed to get edge");
        }
        return edge;
    }

    getAllNodes(): Node[] {
        return Array.from(this.nodes);
    }

    getAllEdges(): Edge[] {
        return this.edges;
    }

    getBuildingNodes(building: string, floor: number): Node[] {

        if (building === "20 Patriot Place"){
            building = "pat20";
        }
        else if (building === "22 Patriot Place"){
            building = "pat22";
        }
        else if (building === "MGB (Chestnut Hill)"){
            building = "chestnut";
        }

        // console.log("Getting nodes building: ", building, " Floor:", floor);

        return Array.from(this.nodes).filter(
            n => n.building === building && n.floor === floor
        );
    }

    getBuildingEdges(building: string, floor: number): Edge[] {
        if (building === "20 Patriot Place"){
            building = "pat20";
        }
        else if (building === "22 Patriot Place"){
            building = "pat22";
        }
        else if (building === "MGB (Chestnut Hill)"){
            building = "chestnut";
        }

        return Array.from(this.edges).filter(
            edge => edge.sourceId.building === building && edge.targetId.floor  === floor &&
                edge.targetId.building === building && edge.targetId.floor  === floor
        );
    }

     neighborCount(nodeID: number): number {
         const node = this.getNode(nodeID);
         if (!node) return 0;
         const neighbors = this.adjacencyList.get(node);
         return neighbors ? neighbors.length : 0;
    }

}

export default Graph;

// Test
// const allNodes: Node[] = [{ id: 1, name: "1", x: 0,  y: 0, building: "", floor: 0, edgeCost: 0, totalCost: 0 },
//                           { id: 2, name: "2", x: -1, y: 1, building: "", floor: 0, edgeCost: 0, totalCost: 0 },
//                           { id: 3, name: "3", x: 1,  y: 1, building: "", floor: 0, edgeCost: 0, totalCost: 0 },
//                           { id: 4, name: "4", x: -2, y: 2, building: "", floor: 0, edgeCost: 0, totalCost: 0 },
//                           { id: 5, name: "5", x: 2,  y: 2, building: "", floor: 0, edgeCost: 0, totalCost: 0 },
//                           { id: 6, name: "6", x: -1, y: 3, building: "", floor: 0, edgeCost: 0, totalCost: 0 },
//                           { id: 7, name: "7", x: 1,  y: 3, building: "", floor: 0, edgeCost: 0, totalCost: 0 },
//                           { id: 8, name: "8", x: 0,  y: 4, building: "", floor: 0, edgeCost: 0, totalCost: 0 }];
//
// const allEdges = [
//     { id: 1, sourceId: 1, targetId: 2, weight: 4 },
//     { id: 2, sourceId: 1, targetId: 3, weight: 8 },
//     { id: 3, sourceId: 1, targetId: 5, weight: 1 },
//     { id: 4, sourceId: 2, targetId: 4, weight: 7 },
//     { id: 5, sourceId: 2, targetId: 6, weight: 1 },
//     { id: 6, sourceId: 4, targetId: 6, weight: 1 },
//     { id: 7, sourceId: 3, targetId: 7, weight: 5 },
//     { id: 8, sourceId: 5, targetId: 7, weight: 9 },
//     { id: 9, sourceId: 6, targetId: 8, weight: 8 },
// ] satisfies { id: number; sourceId: number; targetId: number; weight: number }[];


// Instantiate the graph
// const graph = new Graph();
// graph.populate(allNodes, allEdges);
// console.log(graph.getEdge(1))
// console.log(graph.getAllEdges())

// //BFS
// const bfsPath = graph.BFS(node1, node2);
// console.log("\nBFS Path:");
// console.log(bfsPath.map(node => node.name).join(" -> "));

//A*
// let test = node1 === graph.getNode(1)
// graph.getNode(2)
// const aStarPath = graph.aStar(graph.getNode(1), graph.getNode(8));
// console.log("\nA* Path:");
// console.log(aStarPath.map(node => node.name).join(" -> "));

// //dfs
// const dfsPath = graph.DFS(graph.getNode(1), graph.getNode(8));
// console.log("\nDFS Path:");
// console.log(dfsPath.map(node => node.name).join(" -> "));
//
// graph.deleteEdge(4)
//
// // dfs
// const dfsPath2 = graph.DFS(graph.getNode(1), graph.getNode(8));
// console.log("\nDFS new Path:");
// console.log(dfsPath2.map(node => node.name).join(" -> "));
//
// graph.addNode({ id: 1, name: "node-1", x: 0,  y: 0, building: "", floor: 0, edgeCost: 0, totalCost: 0});
// graph.addEdge({ id: 0, sourceId: graph.getNode(1), targetId: graph.getNode(8), weight: 12 });
// graph.deleteNode(4)
//
// const edits = graph.getEditHistory();
// console.log("\nEdits:");
// console.log("Added Edges: " + edits.addedEdges.map(edge => edge.id).join(", "));
// console.log("Added Nodes: " + edits.addedNodes.map(node => node.name).join(", "));
// console.log("Deleted Edges: " + edits.deletedEdges.map(ids => ids).join(", "));
// console.log("Deleted Nodes: " + edits.deletedNodes.map(ids => ids).join(", "));