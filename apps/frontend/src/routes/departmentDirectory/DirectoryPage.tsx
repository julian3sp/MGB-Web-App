import React, { useState } from 'react';
import {trpc} from "@/lib/trpc.ts";
import ImportCSV from "../../components/ImportDept.tsx";
import ImportAllNodesAndEdges from "@/components/navigation/mapEditorComponent/Import.tsx";
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart.tsx";
import { PieChart } from 'react-minimal-pie-chart';
import {Bar, BarChart, CartesianGrid, Cell, Legend, XAxis, YAxis} from "recharts"


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
    const sanitationRequests = trpc.requestListOfType.useQuery({ type: 'Sanitation' });
    const languageRequests = trpc.requestListOfType.useQuery({ type: 'Language' });
    const securityRequests = trpc.requestListOfType.useQuery({ type: 'Security' });
    const audioVisualRequests = trpc.requestListOfType.useQuery({ type: 'AudioVisual' });
    const transportationRequests = trpc.requestListOfType.useQuery({ type: 'Transportation' });
    const medicalDeviceRequests = trpc.requestListOfType.useQuery({ type: 'MedicalDevice' });
    const facilitiesRequests = trpc.requestListOfType.useQuery({ type: 'Facilities' });
    const chartData = [
        { month: "January", desktop: 186, mobile: 80 },
        { month: "February", desktop: 305, mobile: 200 },
        { month: "March", desktop: 237, mobile: 120 },
        { month: "April", desktop: 73, mobile: 190 },
        { month: "May", desktop: 209, mobile: 130 },
        { month: "June", desktop: 214, mobile: 140 },
    ]

    const chartConfig = {
        desktop: {
            label: "Desktop",
            color: "#2563eb",
        },
        mobile: {
            label: "Mobile",
            color: "#60a5fa",
        },
    } satisfies ChartConfig

    const serviceRequestConfig = {
        number: {
            label: "amount",
            color: "#2563eb",
        },
    } satisfies ChartConfig
    const serviceRequestData = [
        { type: 'Sanitation', number: sanitationRequests.data?.length ?? 0 },
        { type: 'Language', number: languageRequests.data?.length ?? 0 },
        { type: 'Security', number: securityRequests.data?.length ?? 0 },
        { type: 'AudioVisual', number: audioVisualRequests.data?.length ?? 0 },
        { type: 'Transportation', number: transportationRequests.data?.length ?? 0 },
        { type: 'MedicalDevice', number: medicalDeviceRequests.data?.length ?? 0 },
        { type: 'Facilities', number: facilitiesRequests.data?.length ?? 0 },
    ];

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
                    className="bg-[#003a96] hover:bg-blue-950 text-white font-[Poppins] px-4 py-2 rounded"
                >
                    Submit
                </button>
            </div>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <BarChart data={chartData}>
                    <Bar dataKey="month" />
                    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                </BarChart>
            </ChartContainer>

            <ChartContainer
                config={serviceRequestConfig}
                className="min-h-[280px] w-full rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-background to-muted/50 p-6 shadow-lg"
            >
                <BarChart data={serviceRequestData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                    <XAxis
                        dataKey="type"
                        tickLine={false}
                        tickMargin={18}
                        axisLine={false}
                        angle={-45}
                        textAnchor="end"
                        height={65}
                        tick={{ fontSize: 13, fontWeight: 500, fill: "var(--color-foreground)" }}
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                        tick={{ fill: "var(--color-foreground)" }}
                    />
                    <CartesianGrid vertical={false} strokeDasharray="4" opacity={0.15} />
                    <Bar
                        dataKey="style"
                        radius={[6, 6, 0, 0]}
                        fill="rgba(124, 58, 237, 0.7)"
                        stroke="rgba(124, 58, 237, 0.9)"
                        strokeWidth={1}
                    />
                    <Bar
                        dataKey="number"
                        radius={[6, 6, 0, 0]}
                        strokeWidth={1}
                    >
                        {serviceRequestData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={[
                                    "rgba(59, 130, 246, 0.8)",
                                    "rgba(16, 185, 129, 0.8)",
                                    "rgba(245, 158, 11, 0.8)",
                                    "rgba(217, 70, 239, 0.8)",
                                    "rgba(6, 182, 212, 0.8)",
                                    "rgba(244, 63, 94, 0.8)",
                                ][index % 6]}
                                stroke={[
                                    "rgba(59, 130, 246, 1)",
                                    "rgba(16, 185, 129, 1)",
                                    "rgba(245, 158, 11, 1)",
                                    "rgba(217, 70, 239, 1)",
                                    "rgba(6, 182, 212, 1)",
                                    "rgba(244, 63, 94, 1)",
                                ][index % 6]}
                            />
                        ))}
                    </Bar>
                    <ChartTooltip
                        content={<ChartTooltipContent />}
                        cursor={{ fill: "var(--color-primary)", opacity: 0.05 }}
                    />
                </BarChart>
            </ChartContainer>

            <div className="w-full p-5 flex flex-col gap-4">
                <ImportAllNodesAndEdges />
            </div>

            {/* Import/Export CSV */}
            <div className="mb-6 bg-white p-4 shadow rounded">
                <h2 className="text-xl font-semibold mb-2">Import / Export CSV</h2>
                <button
                    onClick={downloadCSV}
                    disabled={isLoading}
                    className="bg-[#003a96] hover:bg-blue-950 text-white px-3 py-2 rounded mt-2 font-[Poppins]"
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