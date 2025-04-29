import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Toaster } from "../../ui/sonner";
import FileUploadCard from "../../ui/fileUploadCard"; 

const Export_CSV = () => {

    const [nodes, setNodes] = useState<{ Building: string; Floor: number; Name: string; X: number; Y: number }[]>([]);
    const [edges, setEdges] = useState<{ SourceId: number; TargetId: number; Weight: number }[]>([]);

    const { data: nodesData, isLoading: isLoadingNodes } = trpc.getAllNodes.useQuery();
    const { data: edgesData, isLoading: isLoadingEdges } = trpc.getAllEdges.useQuery();
    useEffect(() => {
        if(nodesData && edgesData) {
            setNodes(nodesData);
            setEdges(edgesData);
        }
    }, [nodesData, edgesData]);
    
    

    const downloadCSV = async () => {
        let csv_edge = "sourcec_id; target_id; weight"
        let csv_node = "building; floor; name; x; y"
        nodes.forEach((file)=>{
            csv_node += `${file.building}; ${file.floor}; ${file.name}; ${file.x}; ${file.y}\n`
        })
        edges.forEach((file)=>{
            csv_edge += `${file.sourceId}; ${file.targetId}; ${file.weight}\n`
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

export default Export_CSV 
