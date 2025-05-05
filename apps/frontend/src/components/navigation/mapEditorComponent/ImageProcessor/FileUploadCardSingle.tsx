"use client"

import { useRef } from "react"

interface FileUploadCardSingleProps {
  file: File | null
  onFileChange: (file: File) => void
}

export default function FileUploadCardSingle({ file, onFileChange }: FileUploadCardSingleProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onFileChange(e.target.files[0])
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files?.[0]) {
      onFileChange(e.dataTransfer.files[0])
    }
  }

  return (
    <div
      className="border-2 border-dashed border-[#0076CE] bg-blue-50 rounded-lg flex flex-col gap-2 p-10 items-center cursor-pointer hover:bg-blue-100 transition"
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <FileIcon className="w-12 h-12 text-[#0076CE]" />
      <span className="text-md font-semibold text-[#003a96]">Drag & drop or click to upload image</span>
      <span className="text-sm text-[#003a96]">Only image files accepted (JPG, PNG, etc.)</span>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {file && (
        <p className="mt-2 text-sm text-[#003a96] font-[poppins]">
          Selected: <span className="font-medium">{file.name}</span>
        </p>
      )}
    </div>
  )
}

function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}
