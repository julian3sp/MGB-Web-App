import graph, {Node} from "./Graph.ts"
import Graph from "./Graph.ts"
import {trpc} from "../../../lib/trpc.ts";
import {makeEdge} from "../../../../../backend/src/server/procedures/edges.ts";
import {Prisma} from "prisma-client-37b3baa66a4a7184286042a67f4df595aa7ea54728f8af47f83756c21e54b817";
import EdgesAggregateArgs = Prisma.EdgesAggregateArgs;

export const Nodes = trpc.getAllNodes.useQuery(); // array of Node
export const Edges = trpc.getAllEdges.useQuery(); // array of Edge

const hospitalGraph = new Graph()

    hospitalGraph.aStar(hospitalGraph.getNode(1)? hospitalGraph.getNode(1) , hospitalGraph.getNode(15)?)


