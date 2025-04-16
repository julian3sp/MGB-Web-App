import React, { useState } from 'react';
import { trpc } from '../lib/trpc';
import ImportCSV from "../components/ImportDept.tsx";


const DirectoryPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        services: '',
        location: '',
        telephone: '',
    });

    //const utils = trpc.useUtils();
    const { data: directories, isLoading} = trpc.getDirectories.useQuery();

    const addDirectory = trpc.makeDirectory.useMutation();

    const downloadCSV = () => {
        if (!directories || directories.length === 0) {
            alert('No data available to download.');
            return;
        }

        // Construct CSV string
        let csv = 'id;name;services;location;telephone\n';
        directories.forEach((dir) => {
            csv += `${dir.id}';'${dir.name}";"${dir.services.replace(/,/g,"#")}";"${dir.location}";"${dir.telephone}"\n`;
        });

        // Encode the CSV data as a Data URI
        const encodedUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);

        // Create a temporary link to trigger download
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'directory_export.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = () => {
        addDirectory.mutate(formData);
        window.location.reload();
    };


    //const handleCSVExport = () => {
        //window.open('/api/directory/export', '_blank');
    //};

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
                    name="services"
                    placeholder="Services"
                    value={formData.services}
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
                    name="telephone"
                    placeholder="Telephone"
                    value={formData.telephone}
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
                <button
                    onClick={downloadCSV}
                    disabled={isLoading}
                    className="bg-green-600 text-white px-3 py-2 rounded mt-2 hover:bg-green-800"
                >
                    Export CSV
                </button>

                <br /><br />

                <ImportCSV/>
            </div>



            {/* Table */}
            <div className="bg-white p-4 shadow rounded">
                <h2 className="text-xl font-semibold mb-4">Directory Table</h2>
                <table className="w-full border border-collapse">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Services</th>

                        <th className="border px-4 py-2">Location</th>
                        <th className="border px-4 py-2">Telephone</th>
                    </tr>
                    </thead>
                    <tbody>
                    {directories?.map((dir) => (
                        <tr key={dir.id}>
                            <td className="border px-4 py-2">{dir.id}</td>
                            <td className="border px-4 py-2">{dir.name}</td>
                            <td className="border px-4 py-2">{dir.services}</td>
                            <td className="border px-4 py-2">{dir.location}</td>
                            <td className="border px-4 py-2">{dir.telephone}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DirectoryPage