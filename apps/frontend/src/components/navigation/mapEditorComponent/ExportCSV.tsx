import React, { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Toaster } from "../../ui/sonner";

type ExportType = 'Nodes' | 'Edges' | 'Directories';

interface ExportCSVProps {
    type: ExportType;
}
export default function ExportCSV({type} : ExportCSVProps) {

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
    const [directories, setDirectories] = useState<{
        name: string;
        location: string;
        id: number;
        services: string;
        telephone: string;
    }[]>([]);

    const { data: nodesData, isLoading: isLoadingNodes } = trpc.getAllNodes.useQuery();
    const { data: edgesData, isLoading: isLoadingEdges } = trpc.getAllEdges.useQuery();
    const { data: directoriesData, isLoading: isLoadingDirectories } = trpc.getDirectories.useQuery();

    useEffect(() => {
        if(nodesData && edgesData && directoriesData) {
            setNodes(nodesData);
            setEdges(edgesData);
            setDirectories(directoriesData);
        }
    }, [nodesData, edgesData, directoriesData]);


        const downloadCSV = async () => {
            let csv_edge = "source_id, target_id, weight\n";
            let csv_node = "building, floor, name, x, y, type\n";
            let csv_directories = "name, services, location, telephone\n";

            nodes.forEach((file) => {
                csv_node += `${file.building}, ${file.floor}, ${file.name}, ${file.x}, ${file.y}, ${file.type}\n`;
            });
            edges.forEach((file) => {
                csv_edge += `${file.sourceId}, ${file.targetId}, ${file.weight}\n`;
            });
            directories.forEach((file) => {
                csv_directories += `${file.name}, ${file.services}, ${file.location}, ${file.telephone}\n`;
            });

            let encodedUri: string;
            let filename: string;

            switch (type) {
                case 'Nodes':
                    encodedUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_node);
                    filename = 'nodes_export.csv';
                    break;
                case 'Edges':
                    encodedUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_edge);
                    filename = 'edges_export.csv';
                    break;
                case 'Directories':
                    encodedUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_directories);
                    filename = 'directories_export.csv';
                    break;
                default:
                    console.error("Invalid export type.");
                    return;
            }

            const link = document.createElement('a');
            link.href = encodedUri;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

    return (
        <div className=" px-6  max-w-md">
          <button
            onClick={downloadCSV}
            className="w-full bg-white border-1 shadow-sm border-[#44A6A6] text-[#003a96] font-[poppins] py-2 rounded-lg hover:bg-[#003a96] hover:text-white"
          >
            Export {type}
          </button>
          <Toaster />
        </div>
    )
}