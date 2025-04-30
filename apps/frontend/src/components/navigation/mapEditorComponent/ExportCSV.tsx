import React, { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Toaster } from "../../ui/sonner";


export default function ExportCSV() {

    const [nodes, setNodes] = useState<{
        name: string | null
        type: string
        id: number
        building: string
        floor: number
        x: number
        y: number
        edgeCost: number
        totalCost: number
    }[]>([]);
    const [edges, setEdges] = useState<{
        id: number
        sourceId: number
        targetId: number
        weight: number
        sourceNode: {
            name: string | null
            type: string
            id: number
            building: string
            floor: number
            x: number
            y: number
            edgeCost: number
            totalCost: number
        }
        targetNode: {
            name: string | null
            type: string
            id: number
            building: string
            floor: number
            x: number
            y: number
            edgeCost: number
            totalCost: number
        }
    }[]>([]);

    const { data: nodesData, isLoading: isLoadingNodes } = trpc.getAllNodes.useQuery();
    const { data: edgesData, isLoading: isLoadingEdges } = trpc.getAllEdges.useQuery();
    useEffect(() => {
        if(nodesData && edgesData) {
            setNodes(nodesData);
            setEdges(edgesData);
        }
    }, [nodesData, edgesData]);
    
    

    const downloadCSV = async () => {
        let csv_edge = "sourcec_id, target_id, weight\n"
        let csv_node = "building, floor, name, x, y, type\n"
        nodes.forEach((file)=>{
            csv_node += `${file.building}, ${file.floor}, ${file.name}, ${file.x}, ${file.y}, ${file.type}\n`
        })
        edges.forEach((file)=>{
            csv_edge += `${file.sourceId}, ${file.targetId}, ${file.weight}\n`
        })
        
        const encodedUri1 = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_node)
        const encodedUri2 = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_edge)
        
        const link = document.createElement('a')
        link.setAttribute('href', encodedUri1)
        link.setAttribute('download', 'nodes_export.csv')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        const link1 = document.createElement('a')
        link1.setAttribute('href', encodedUri2)
        link1.setAttribute('download', 'edges_export.csv')
        document.body.appendChild(link1)
        link1.click()
        document.body.removeChild(link1)

    };


    return (
        <div className="p-4 max-w-md mx-auto space-y-4">
          <h1 className="text-lg font-bold text-center">Export CSV</h1>
          <button
            onClick={downloadCSV}
            className="w-full bg-[#003a96] text-white font-[poppins] px-4 py-2 rounded hover:bg-blue-950"
          >
            Export the  CSV file from the database
          </button>
          <Toaster />
        </div>
    )
}