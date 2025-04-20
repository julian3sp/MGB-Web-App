import { useState } from "react"
import FileUploadCard from "../../ui/fileUploadCard"
import { trpc } from "../../../lib/trpc"

export default function ImportPage() {
  const [files, setFiles] = useState<File[]>([])

  const makeNode = trpc.makeNode.useMutation()
  const deleteNodes = trpc.deleteAllNodes.useMutation()
  const makeEdge = trpc.makeEdge.useMutation()
  const deleteEdges = trpc.deleteAllEdges.useMutation()

  const handleImportFiles = async () => {
    if (files.length === 0) {
      alert("No files selected.")
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
            await makeNode.mutateAsync(inputs)
            alert(`Nodes from "${file.name}" uploaded successfully.`)
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
            alert(`Edges from "${file.name}" uploaded successfully.`)
          } else {
            alert(`Unrecognized format in file "${file.name}".`)
          }
        } catch (err) {
          console.error(`Upload failed for ${file.name}:`, err)
          alert(`Failed to upload "${file.name}". See console for details.`)
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
        className="w-full bg-[#003a96] text-white px-4 py-2 rounded hover:bg-blue-800"
      >
        Import CSV
      </button>
    </div>
  )
}
