import {Node, Edge} from "./Graph.ts"
import Graph from "./Graph.ts"
import {trpc} from "@/lib/trpc.ts";

const nodesQuery = trpc.getAllNodes.useQuery();
const edgesQuery = trpc.getAllEdges.useQuery();


const allNodes: Node[] = (nodesQuery.data ?? []).map((n) => ({
    ...n,
    name: `node-${n.id}`,
    edgeCost: 0,     // or any default value
    totalCost: 0,
    parent: undefined
}));

const allEdges: Edge[] = (edgesQuery.data ?? []).map((n) => ({
    ...n,
    source: allNodes[n.sourceId - 1],
    target: allNodes[n.targetId - 1],
}));

export const hospitalGraph: Graph = new Graph();

for (const edge of allEdges) {
    hospitalGraph.addEdge(edge.source, edge.target, edge.weight)
}




