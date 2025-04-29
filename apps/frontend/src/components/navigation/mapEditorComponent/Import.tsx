import { useState } from "react"
import FileUploadCard from "../../ui/fileUploadCard"
import {toast} from "sonner"
import { Toaster } from '../../ui/sonner';
import { trpc } from '@/lib/trpc';
import { PieChart } from 'react-minimal-pie-chart';
import {Bar, BarChart, CartesianGrid, Cell, Legend, XAxis, YAxis} from "recharts"
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "../../ui/chart"

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

export default function ImportPage() {
  const [files, setFiles] = useState<File[]>([])

    const sanitationRequests = trpc.requestListOfType.useQuery({ type: 'Sanitation' });
    const languageRequests = trpc.requestListOfType.useQuery({ type: 'Language' });
    const securityRequests = trpc.requestListOfType.useQuery({ type: 'Security' });
    const audioVisualRequests = trpc.requestListOfType.useQuery({ type: 'AudioVisual' });
    const transportationRequests = trpc.requestListOfType.useQuery({ type: 'Transportation' });
    const medicalDeviceRequests = trpc.requestListOfType.useQuery({ type: 'MedicalDevice' });
    const facilitiesRequests = trpc.requestListOfType.useQuery({ type: 'Facilities' });

    const serviceRequestData = [
        { type: 'Sanitation', number: sanitationRequests.data?.length ?? 0 },
        { type: 'Language', number: languageRequests.data?.length ?? 0 },
        { type: 'Security', number: securityRequests.data?.length ?? 0 },
        { type: 'AudioVisual', number: audioVisualRequests.data?.length ?? 0 },
        { type: 'Transportation', number: transportationRequests.data?.length ?? 0 },
        { type: 'MedicalDevice', number: medicalDeviceRequests.data?.length ?? 0 },
        { type: 'Facilities', number: facilitiesRequests.data?.length ?? 0 },
    ];

  const makeNode = trpc.makeNode.useMutation()
  const deleteNodes = trpc.deleteAllNodes.useMutation()
  const makeEdge = trpc.makeEdge.useMutation()
  const deleteEdges = trpc.deleteAllEdges.useMutation()

  const handleImportFiles = async () => {
    if (files.length === 0) {
      toast.error("Please select at least one file to upload.")
      return
    }

    for (const file of files) {
      const reader = new FileReader()
      reader.onload = async () => {
        const text = reader.result as string
        const lines = text.split("\n").filter(Boolean)
        const headers = lines[0].split(",")

        try {
          if (headers.length >= 5) {
            await deleteNodes.mutateAsync()
            const inputs = lines.slice(1).map((line) => {
              const values = line.split(",")
              return {
                building: values[0]?.trim().replace(/"/g, ""),
                floor: Number(values[1]?.trim().replace(/"/g, "")),
                name: values[2]?.trim().replace(/"/g, ""),
                x: Number(values[3]?.trim().replace(/"/g, "")),
                y: Number(values[4]?.trim().replace(/"/g, "")),
              }
            })
            console.log(inputs)
            await makeNode.mutateAsync(inputs)
            toast.success(`Nodes from "${file.name}" uploaded successfully.`)
          } else if (headers.length === 3) {
            await deleteEdges.mutateAsync()
            const inputs = lines.slice(1).map((line) => {
              const values = line.split(",")
              return {
                sourceId: Number(values[0]?.trim().replace(/"/g, "")),
                targetId: Number(values[1]?.trim().replace(/"/g, "")),
                weight: Number(values[2]?.trim().replace(/"/g, "")),
              }
            })
            await makeEdge.mutateAsync(inputs)
            toast.success(`Edges from "${file.name}" uploaded successfully.`)
          } else {
            toast.error(`Invalid file format for "${file.name}". Please check the headers.`)
          }
        } catch (err) {
          console.error(`Upload failed for ${file.name}:`, err)
          toast.error(`Failed to upload "${file.name}". Please check the console for details.`)
        }
      }

      reader.readAsText(file)
    }

    setFiles([]) // Clear the files after processing
  }

  return (
      <div className="p-4 max-w-md mx-auto space-y-4">
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

          <h1 className="text-lg font-bold text-center">Import CSV Files</h1>
          <FileUploadCard files={files} onFilesChange={setFiles} />
          <button
              onClick={handleImportFiles}
              className="w-full bg-[#003a96] text-white font-[poppins] px-4 py-2 rounded hover:bg-blue-950"
          >
              Import CSV
          </button>
          <Toaster />
      </div>
  );
}
