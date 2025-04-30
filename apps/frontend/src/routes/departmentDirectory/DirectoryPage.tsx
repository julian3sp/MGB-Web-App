import React, { useState } from 'react';
import {trpc} from "@/lib/trpc.ts";
import ImportAllNodesAndEdges from "@/components/navigation/mapEditorComponent/Import.tsx";
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart.tsx";
import {Bar, BarChart, CartesianGrid, Cell, Legend, XAxis, YAxis} from "recharts"
import ExportCSV from "@/components/navigation/mapEditorComponent/ExportCSV.tsx";

const DirectoryPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        services: '',
        location: '',
        telephone: '',
    });

    const utils = trpc.useUtils();

    const { data: directories, isLoading} = trpc.getDirectories.useQuery();

    const addDirectory = trpc.makeDirectory.useMutation({
        onSuccess:async (newDirectory)=> {
            await utils.getDirectories.invalidate();
        },
    });
    // get data for table from backend
    const sanitationRequests = trpc.requestListOfType.useQuery({ type: 'Sanitation' });
    const languageRequests = trpc.requestListOfType.useQuery({ type: 'Language' });
    const securityRequests = trpc.requestListOfType.useQuery({ type: 'Security' });
    const audioVisualRequests = trpc.requestListOfType.useQuery({ type: 'AudioVisual' });
    const transportationRequests = trpc.requestListOfType.useQuery({ type: 'Transportation' });
    const medicalDeviceRequests = trpc.requestListOfType.useQuery({ type: 'MedicalDevice' });
    const facilitiesRequests = trpc.requestListOfType.useQuery({ type: 'Facilities' });

    // make config for service request from bar chart
    const serviceRequestConfig = {
        number: {
            label: "amount",
            color: "#2563eb",
        },
    } satisfies ChartConfig

    // make chart data for service request form
    const serviceRequestData = [
        { type: 'Sanitation', number: sanitationRequests.data?.length ?? 0 },
        { type: 'Language', number: languageRequests.data?.length ?? 0 },
        { type: 'Security', number: securityRequests.data?.length ?? 0 },
        { type: 'AudioVisual', number: audioVisualRequests.data?.length ?? 0 },
        { type: 'Transportation', number: transportationRequests.data?.length ?? 0 },
        { type: 'MedicalDevice', number: medicalDeviceRequests.data?.length ?? 0 },
        { type: 'Facilities', number: facilitiesRequests.data?.length ?? 0 },
    ];

    const downloadDirectories = () => {
        if (!directories || directories.length === 0) {
            alert('No data available to download.');
            return;
        }

        // Construct CSV string
        let csv = 'id, name,services,location,telephone\n';
        directories.forEach((dir) => {
            csv += `${dir.id},"${dir.name}","${dir.services.replace(/,/g,"#")}","${dir.location}","${dir.telephone}"\n`;
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
    };

    return (
        <div className="p-6 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Directory Management</h1>
            <div className='flex flex-cols gap-x-3'>
                <div className="">
                    {/* bar chart for service request form */}
                    <ChartContainer
                        config={serviceRequestConfig}
                        className="min-h-[280px] rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-background to-muted/50 p-6 shadow-lg"
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
                                            "#003a96",
                                            "#009ca6",
                                            "#003a96",
                                            "#009ca6",
                                            "#003a96",
                                            "#009ca6",
                                        ][index % 6]}
                                        stroke={[
                                            "#003a96",
                                            "#009ca6",
                                            "#003a96",
                                            "#009ca6",
                                            "#003a96",
                                            "#009ca6",
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

                    {/*import directories*/}
                    <div>
                        <div className="p-5 gap-4">
                            <ImportAllNodesAndEdges />
                        </div>
                        <ExportCSV/>
                    </div>
                </div>
                    {/*/!* Form - make new directery input *!/*/}
                    {/*<div className="mb-6 bg-white p-4 shadow rounded-2xl space-y-4">*/}
                    {/*    <h2 className="text-xl font-semibold">Add New Directory Entry</h2>*/}
                    {/*    <input*/}
                    {/*        className="border p-2 w-full"*/}
                    {/*        name="name"*/}
                    {/*        placeholder="Name"*/}
                    {/*        value={formData.name}*/}
                    {/*        onChange={handleChange}*/}
                    {/*    />*/}
                    {/*    <input*/}
                    {/*        className="border p-2 w-full"*/}
                    {/*        name="services"*/}
                    {/*        placeholder="Services"*/}
                    {/*        value={formData.services}*/}
                    {/*        onChange={handleChange}*/}
                    {/*    />*/}
                    {/*    <input*/}
                    {/*        className="border p-2 w-full"*/}
                    {/*        name="location"*/}
                    {/*        placeholder="Location"*/}
                    {/*        value={formData.location}*/}
                    {/*        onChange={handleChange}*/}
                    {/*    />*/}

                    {/*    <input*/}
                    {/*        className="border p-2 w-full"*/}
                    {/*        name="telephone"*/}
                    {/*        placeholder="Telephone"*/}
                    {/*        value={formData.telephone}*/}
                    {/*        onChange={handleChange}*/}
                    {/*    />*/}
                    {/*    <button*/}
                    {/*        onClick={handleSubmit}*/}
                    {/*        className="bg-[#003a96] hover:bg-blue-950 text-white font-[Poppins] px-4 py-2 rounded"*/}
                    {/*    >*/}
                    {/*        Submit*/}
                    {/*    </button>*/}
                    {/*</div>*/}

                    {/* Table */}
                    <div className="bg-white p-4 shadow rounded-xl ">
                        <h2 className="text-xl font-semibold mb-3">Directory Table</h2>
                        <div className="overflow-y-auto max-h-150 scrollbar-thin">
                            <table className="w-full border-collapse text-sm">
                                <thead className="sticky top-0">
                                <tr className="bg-gray-100 text-gray-700">
                                    <th className="border-b px-3 py-2 text-left font-medium">ID</th>
                                    <th className="border-b px-3 py-2 text-left font-medium">Name</th>
                                    <th className="border-b px-3 py-2 text-left font-medium">Services</th>
                                    <th className="border-b px-3 py-2 text-left font-medium">Location</th>
                                    <th className="border-b px-3 py-2 text-left font-medium">Telephone</th>
                                </tr>
                                </thead>
                                <tbody >
                                {directories?.length > 0 ? (
                                    directories.map((dir) => (
                                        <tr key={dir.id} className="hover:bg-gray-50">
                                            <td className="px-3 py-2">{dir.id}</td>
                                            <td className="px-3 py-2">{dir.name}</td>
                                            <td className="px-3 py-2">{dir.services}</td>
                                            <td className="px-3 py-2">{dir.location}</td>
                                            <td className="px-3 py-2">{dir.telephone}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-3 py-4 text-center text-gray-500">
                                            No entries found
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default DirectoryPage