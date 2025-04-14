import React, { useState } from 'react';
import {trpc} from "../lib/trpc.ts";
import client from "../../../backend/src/bin/prisma-client.ts";



const ImportEdges = () => {
    const [file, setFile] = useState<File | null>(null);
    const makeEdge = trpc.makeEdge.useMutation();
    const deleteEdges = trpc.deleteAllEdges.useMutation()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0] || null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        // Delete existing edges first
        await deleteEdges.mutateAsync();

        const reader = new FileReader();

        reader.onload = async () => {
            const text = reader.result as string;
            const lines = text.split('\n').filter(Boolean);
            const inputs: {
                sourceId: number;
                targetId: number;
                weight: number;
            }[] = [];

            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split(',');

                // Skip invalid or malformed lines
                if (values.length < 3) {continue};

                const entry = {
                    sourceId: Number(values[0].trim().replace(/"/g, "")),
                    targetId: Number(values[1].trim().replace(/"/g, "")),
                    weight: Number(values[2].trim().replace(/"/g, "")),
                };

                inputs.push(entry);
            }
            console.log(inputs)

            try {
                await makeEdge.mutateAsync(inputs);
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
            <button type="submit" className={"bg-green-600 text-white px-3 py-2 rounded mt-2 hover:bg-green-800"}>Import CSV</button>
        </form>
    );
};


export default ImportEdges;