"use client";

import { useRef } from "react";

interface FileUploadCardProps {
    files?: File[];
    onFilesChange: (files: File[]) => void;
}

export default function FileUploadService({
                                              files = [],
                                              onFilesChange,
                                          }: FileUploadCardProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            onFilesChange([...files, ...newFiles]);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const newFiles = Array.from(e.dataTransfer.files);
        onFilesChange([...files, ...newFiles]);
    };

    const handleRemove = (indexToRemove: number) => {
        const updatedFiles = files.filter((_, index) => index !== indexToRemove);
        onFilesChange(updatedFiles);
    };

    return (
        <div className="w-full space-y-5">
            <div
                className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col gap-1 p-10 items-center cursor-pointer hover:bg-gray-50 transition"
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
            >
                <FileIcon className="w-12 h-12 text-gray-500" />
                <span className="text-sm font-medium text-gray-500">
          Drag and drop file(s) or click to browse
        </span>
            </div>

            <input
                ref={inputRef}
                type="file"
                accept=".pdf, .png, .jpg, .jpeg, .webp, .heic, image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
            />


            {files.length > 0 && (
                <div className="p-3 bg-gray-100 rounded-md border text-sm text-gray-700 space-y-5">
                    <div className="font-semibold mb-1">Uploaded Files:</div>
                    {files.map((file, idx) => (
                        <div
                            key={idx}
                            className="flex justify-between items-center bg-white px-3 py-1 rounded border text-sm"
                        >
                            <span className="truncate max-w-[80%]">{file.name}</span>
                            <button
                                type="button"
                                onClick={() => handleRemove(idx)}
                                className="font-bold hover:text-grey-500 cursor-pointer"
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
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
    );
}
