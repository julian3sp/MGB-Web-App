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
        <div className="relative">
            {error && (
                <div className="absolute bottom-full left-18 mb-2">
                    <div className="bg-red-100 text-red-800 font-medium pr-5 pl-8 py-2 rounded text-sm relative border border-red-300 shadow-md">
                        <svg
                            viewBox="0 0 24 24"
                            className="absolute top-2 left-1 text-red-800 w-5 h-5 sm:w-5 sm:h-5 mr-3"
                        >
                            <path
                                fill="currentColor"
                                d="M23.119,20,13.772,2.15h0a2,2,0,0,0-3.543,0L.881,20a2,2,0,0,0,1.772,2.928H21.347A2,2,0,0,0,23.119,20ZM11,8.423a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Zm1.05,11.51h-.028a1.528,1.528,0,0,1-1.522-1.47,1.476,1.476,0,0,1,1.448-1.53h.028A1.527,1.527,0,0,1,13.5,18.4,1.475,1.475,0,0,1,12.05,19.933Z"
                            ></path>
                        </svg>
                        {error}
                        <button
                            onClick={() => clearError?.()}
                            className="absolute top-0 right-1 text-red-300 hover:text-red-800 font-bold text-base leading-none"
                            aria-label="Dismiss error"
                        >
                            &times;
                        </button>


                        {/* Triangle container div - for positioning */}
                        <div className="absolute top-full left-0 w-full h-0 flex justify-center items-start overflow-visible">
                            {/* border - slightly bigger triangle*/}
                            <div
                                className="w-0 h-0 border-x-[10px] border-x-transparent border-t-[10px] border-t-red-300 absolute top-0 left-[20px] -translate-x-1/2 transform"
                            ></div>

                            {/* Inner triangle (background color) */}
                            <div
                                className="w-0 h-0 border-x-[8px] border-x-transparent border-t-[8px] border-t-red-100 absolute top-0 left-[20px] -translate-x-1/2 transform"
                            ></div>
                        </div>
                    </div>
                </div>
            )}

            <input
                minLength={minLength}
                maxLength={maxLength}
                {...(type && { type })}
                className={`border-[1px] border-[#ececec] border-solid hover:border-[#a2caff] rounded-[5px] py-[5px] pr-[5px] pl-[15px] text-[14px] font-[Poppins] h-[48px] ${width || 'w-[396px]'}`}
                value={value}
                onChange={(e) => {
                    setState(e.target.value);
                }}
                placeholder={placeholder}
            />
        </div>
    );
}