import React, { useEffect, useState } from 'react';
import { trpc } from '../lib/trpc';
import axios from 'axios';

const DirectoryPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        department: '',
    });

    const utils = trpc.useUtils();
    const { data: directories, refetch } = trpc.getDirectories.useQuery();

    const addDirectory = trpc.makeDirectory.useMutation({
        onSuccess: () => {
            refetch();
            setFormData({ name: '', location: '', department: '' });
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = () => {
        addDirectory.mutate(formData);
    };

    const handleCSVImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        await axios.post('/api/directory/import', formData);
        refetch();
    };

    const handleCSVExport = () => {
        window.open('/api/directory/export', '_blank');
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Directory Management</h1>

            {/* Form */}
            <div className="mb-6 bg-white p-4 shadow rounded space-y-4">
                <h2 className="text-xl font-semibold">Add New Directory Entry</h2>
                <input
                    className="border p-2 w-full"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    className="border p-2 w-full"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                />
                <input
                    className="border p-2 w-full"
                    name="department"
                    placeholder="Department"
                    value={formData.department}
                    onChange={handleChange}
                />
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Submit
                </button>
            </div>

            {/* Import/Export CSV */}
            <div className="mb-6 bg-white p-4 shadow rounded">
                <h2 className="text-xl font-semibold mb-2">Import / Export CSV</h2>
                <input type="file" accept=".csv" onChange={handleCSVImport} className="mb-2" />
                <br />
                <button
                    onClick={handleCSVExport}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Export CSV
                </button>
            </div>

            {/* Table */}
            <div className="bg-white p-4 shadow rounded">
                <h2 className="text-xl font-semibold mb-4">Directory Table</h2>
                <table className="w-full border border-collapse">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Location</th>
                        <th className="border px-4 py-2">Department</th>
                    </tr>
                    </thead>
                    <tbody>
                    {directories?.map((dir) => (
                        <tr key={dir.id}>
                            <td className="border px-4 py-2">{dir.id}</td>
                            <td className="border px-4 py-2">{dir.name}</td>
                            <td className="border px-4 py-2">{dir.location}</td>
                            <td className="border px-4 py-2">{dir.department}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DirectoryPage;
