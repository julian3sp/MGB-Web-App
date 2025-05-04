import React, { useState } from 'react';
import { trpc } from "@/lib/trpc.ts";
import ImportAllNodesAndEdges from "@/components/navigation/mapEditorComponent/Import.tsx";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart.tsx";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import ExportCSV from "@/components/navigation/mapEditorComponent/ExportCSV.tsx";
import {DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuRadioItem} from "@/components/ui/dropdown-menu.tsx";

const DirectoryPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        services: '',
        location: '',
        telephone: '',
    });

    const utils = trpc.useUtils();
    const { data: directories, isLoading } = trpc.getDirectories.useQuery();

    const addDirectory = trpc.makeDirectory.useMutation({
        onSuccess: async () => {
            await utils.getDirectories.invalidate();
        },
    });

    const sanitationRequests = trpc.requestListOfType.useQuery({ type: 'Sanitation' });
    const languageRequests = trpc.requestListOfType.useQuery({ type: 'Language' });
    const securityRequests = trpc.requestListOfType.useQuery({ type: 'Security' });
    const audioVisualRequests = trpc.requestListOfType.useQuery({ type: 'AudioVisual' });
    const transportationRequests = trpc.requestListOfType.useQuery({ type: 'Transportation' });
    const medicalDeviceRequests = trpc.requestListOfType.useQuery({ type: 'MedicalDevice' });
    const facilitiesRequests = trpc.requestListOfType.useQuery({ type: 'Facilities' });
    const [algoType, setAlgoType] = useState(window.sessionStorage.getItem('algoType') || "A-Star");
    const newAlgo = trpc.setAlgoType.useMutation();



    const serviceRequestConfig = {
        number: {
            label: "amount",
            color: "#2563eb",
        },
    } satisfies ChartConfig;

    const serviceRequestData = [
        { type: 'Sanitation', number: sanitationRequests.data?.length ?? 0 },
        { type: 'Language', number: languageRequests.data?.length ?? 0 },
        { type: 'Security', number: securityRequests.data?.length ?? 0 },
        { type: 'AudioVisual', number: audioVisualRequests.data?.length ?? 0 },
        { type: 'Transportation', number: transportationRequests.data?.length ?? 0 },
        { type: 'MedicalDevice', number: medicalDeviceRequests.data?.length ?? 0 },
        { type: 'Facilities', number: facilitiesRequests.data?.length ?? 0 },
    ];

    function setAlgoTypeWrapper(algo: string) {
        newAlgo.mutate({ algoType: algo })
        setAlgoType(algo);
    }

    const downloadDirectories = () => {
        if (!directories || directories.length === 0) {
            alert('No data available to download.');
            return;
        }

        let csv = 'id, name,services,location,telephone\n';
        directories.forEach((dir) => {
            csv += `${dir.id},"${dir.name}","${dir.services.replace(/,/g, "#")}","${dir.location}","${dir.telephone}"\n`;
        });

        const encodedUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
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
        <div className="p-6 min-h-screen ">
            <h1 className="text-4xl font-bold mb-6 font-[poppins] text-[#003a96]">Admin Dashboard</h1>

            {/* Top Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
                {/* Bar Chart */}
                <div className="col-span-2 bg-white rounded-2xl  shadow-lg border-1">
                    <h2 className="text-2xl font-semibold bg-[#003a96] rounded-t-2xl  p-5 text-center border-b-5 border-b-[#44A6A6] mb-4 font-[poppins] text-white">
                        Service Request Overview
                    </h2>
                    <ChartContainer config={serviceRequestConfig} className="min-h-[200px] m-5 font-[poppins] bg-blue-50 rounded-3xl p-2">
                        <BarChart data={serviceRequestData} margin={{ top: 10, right: 30, left: 20, bottom: 30 }}>
                            <XAxis
                                dataKey="type"
                                tickLine={false}
                                tickMargin={18}
                                axisLine={false}
                                angle={-45}
                                textAnchor="end"
                                height={65}
                                tick={{ fontSize: 13, fontWeight: 500, fill: "#374151" }}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                                tick={{ fill: "#374151" }}
                            />
                            <CartesianGrid vertical={false} strokeDasharray="4" opacity={0.15} />
                            <Bar dataKey="number" radius={[6, 6, 0, 0]} strokeWidth={1}>
                                {serviceRequestData.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={["#003a96", "#009ca6"][index % 2]}
                                        stroke={["#003a96", "#009ca6"][index % 2]}
                                    />
                                ))}
                            </Bar>
                            <ChartTooltip
                                content={<ChartTooltipContent />}
                                cursor={{ fill: "#2563eb", opacity: 0.05 }}
                            />
                        </BarChart>
                    </ChartContainer>
                </div>

                {/* Teal Divider Line */}

                {/* Directory Import/Export */}

                    <div className="bg-white rounded-2xl shadow-lg border-1 ">
                        <h2 className="text-2xl font-[poppins] mb-10 bg-[#003a96] border-b-5 border-b-[#44A6A6] text-center p-5 rounded-t-lg font-semibold text-white">Admin Tools</h2>
                        <ImportAllNodesAndEdges />
                        <div className={'mb-15 p-3 flex justify-between space-y-10'}>
                            <ExportCSV type="Nodes" />
                            <ExportCSV type="Edges" />
                            <ExportCSV type="Directories" />
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="bg-[#003a96] w-[80%] font-[poppins] text-white hover:bg-blue-950 shadow-lg rounded-lg ml-15 p-3">
                                    Choose Your Algorithm
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Pathfinding Algorithms</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup
                                    value={algoType}
                                    onValueChange={setAlgoTypeWrapper}
                                >
                                    <DropdownMenuRadioItem value="A-Star">
                                        A-Star
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="DFS">
                                        Depth First Search
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="BFS">
                                        Breadth First Search
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Dijkstras">
                                        Dijkstra's
                                    </DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/*<button*/}
                        {/*    onClick={downloadDirectories}*/}
                        {/*    className="w-full bg-[#003a96] font-[poppins] hover:bg-blue-950 text-white font-medium px-4 py-2 rounded-lg transition"*/}
                        {/*>*/}
                        {/*    Download CSV*/}
                        {/*</button>*/}
                    </div>
            </div>

            {/* Directory Table */}
            <div className="mt-8 bg-white border-1 shadow-lg rounded-2xl">
                <h2 className="text-2xl font-[poppins] text-white rounded-t-2xl p-5 border-b-3 border-b-[#44A6A6] text-center bg-[#003a96] font-semibold  text-gray-800">Directory Table</h2>
                <div className="overflow-x-auto max-h-[400px] border-t-2 border-t-[#44A6A6] border-1 scrollbar-thin">
                    <table className="w-full font-[poppins]  border-collapse text-sm">
                        <thead className="sticky top-0 bg-[#B8D9D9]  text-black">
                        <tr>
                            <th className="border-b px-3 py-2 text-left font-medium">ID</th>
                            <th className="border-b px-3 py-2 text-left font-medium">Name</th>
                            <th className="border-b px-3 py-2 text-left font-medium">Services</th>
                            <th className="border-b px-3 py-2 text-left font-medium">Location</th>
                            <th className="border-b px-3 py-2 text-left font-medium">Telephone</th>
                        </tr>
                        </thead>
                        <tbody>
                        {directories?.length > 0 ? (
                            directories.map((dir) => (
                                <tr key={dir.id} className="hover:bg-blue-50">
                                    <td className="px-3 py-2">{dir.id}</td>
                                    <td className="px-3 py-2">{dir.name}</td>
                                    <td className="px-3 py-2">{dir.services}</td>
                                    <td className="px-3 py-2">{dir.location}</td>
                                    <td className="px-3 py-2">{dir.telephone}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-3 py-4 text-center text-gray-500">
                                    No entries found
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DirectoryPage;
