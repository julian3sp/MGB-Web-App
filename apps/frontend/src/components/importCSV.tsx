import React, { useState } from 'react';
import {trpc} from "../lib/trpc.ts";


const UploadCSV = () => {
    const [file, setFile] = useState<File | null>(null);
    const createDirectory = trpc.makeDirectory.useMutation();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0] || null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async () => {
            const text = reader.result as string;
            const lines = text.split('\n').filter(Boolean);
            const headers = lines[0].split(',');

            for (let i = 1; i < lines.length; i++) { //skip first line
                // for each line, split on commas
                const values = lines[i].split(',');

                //insert each entry in line into our entry struct
                const entry = {
                    name: values[0].trim().replace(/"/g, ""),
                    location: values[1].trim().replace(/"/g, ""),
                    department: values[2].trim().replace(/"/g, ""),
                };

                try {
                    await createDirectory.mutateAsync(entry);
                } catch (err) {
                    console.error('Failed to insert entry:', entry, err);
                }
            }

            alert('CSV successfully uploaded.');
        };

        reader.readAsText(file);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <br/>
            <button type="submit" className={"bg-green-600 text-white px-4 py-2 rounded mt-2"}>Import CSV</button>
        </form>
    );
};

export default UploadCSV;
