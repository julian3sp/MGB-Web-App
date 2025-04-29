import React, { useState } from 'react';
import {trpc} from "../lib/trpc.ts";
import client from "../../../backend/src/bin/prisma-client.ts";



const ImportNodes = () => {
    const [file, setFile] = useState<File | null>(null);
    const makeNode = trpc.makeNode.useMutation();
    const deleteNodes = trpc.deleteAllNodes.useMutation()


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0] || null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        // Delete existing nodes first
        await deleteNodes.mutateAsync();

        const reader = new FileReader();

        reader.onload = async () => {
            const text = reader.result as string;
            const lines = text.split('\n').filter(Boolean);
            const inputs: {
                building: string;
                floor: number;
                name: string;
                x: number;
                y: number;
                type: string;
            }[] = [];

            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split(',');

                // Skip invalid or malformed lines
                if (values.length < 4) {continue};

                const entry = {
                    building: values[0].trim().replace(/"/g, ""),
                    floor: Number(values[1].trim().replace(/"/g, "")),
                    name: values[2].trim().replace(/"/g, ""),
                    x: Number(values[3].trim().replace(/"/g, "")),
                    y: Number(values[4].trim().replace(/"/g, "")),
                    type: values[5].trim().replace(/"/g, "")
                };

                inputs.push(entry);
            }

            try {
                await makeNode.mutateAsync(inputs);
                alert('CSV successfully uploaded.');
            } catch (err) {
                console.error('Failed to insert nodes:', err);
            }
        };

        reader.readAsText(file);
    };


    return (
        <form onSubmit={handleSubmit}>
            <input type="file" accept=".csv" onChange={handleFileChange} className={"bg-blue-100 text-black px-3 py-2 rounded mt-2 hover:bg-blue-300"}/>
            <br/>
            <button type="submit" className={"bg-[#003a96] text-white px-3 py-2 rounded mt-2 hover:bg-blue-800"}>Import CSV</button>
        </form>
    );
};

export default ImportNodes;