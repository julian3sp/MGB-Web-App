import React from 'react';

export function ErrorPopUp({
    value,
    setState,
    placeholder,
    width = '',
    type,
    minLength,
    maxLength,
    error,
    clearError,
}: {
    value: string;
    setState: (value: string) => void;
    placeholder: string;
    width?: string;
    type?: string;
    minLength?: number;
    maxLength?: number;
    error?: string;
    clearError?: ()=>void;
}) {
    return (
        <div className="relative flex flex-col">
            <input
                minLength={minLength}
                maxLength={maxLength}
                {...(type && { type })}
                className={`border-[1px] border-[#ececec] focus:bg-white shadow border-solid hover:bg-accent hover:text-black rounded-md py-[5px] pr-[5px] pl-[15px] text-[14px] font-[Poppins] h-[48px] ${width || 'w-[396px]'}`}
                value={value}
                onChange={(e) => {
                    setState(e.target.value);
                    if (clearError) clearError(); // clear error when user starts typing
                }}
                placeholder={placeholder}
            />
            {error && (
                <div className="text-red-500 text-[14px] mt-1 font-[Poppins]">
                    * {error}
                </div>
            )}
        </div>
    );
}