import { useState } from "react"
import FileUploadCard from "../../ui/fileUploadCard"
import {toast} from "sonner"
import { Toaster } from '../../ui/sonner';
import { trpc } from '@/lib/trpc';

export default function ImportPage() {
  const [files, setFiles] = useState<File[]>([])

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
        const headers = lines[0].split(";")

        try {
          if (headers.length >= 5) {
            await deleteNodes.mutateAsync()
            const inputs = lines.slice(1).map((line) => {
              const values = line.split(";")
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
              const values = line.split(";")
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
  )
}
