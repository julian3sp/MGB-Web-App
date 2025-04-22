import React from 'react';

export function ServiceComponentInputBox({
                                             value,
                                             setState,
                                             placeholder,
                                             width = '',
                                             type,
                                             minLength,
                                             maxLength,
                                             error,
                                         }: {
    value: string;
    setState: (value: string) => void;
    placeholder: string;
    width?: string;
    type?: string;
    minLength?: number;
    maxLength?: number;
    error?: string;
}) {
    return (
        <div className="relative">
            {error && (
                <div className="absolute bottom-full left-4 mb-2">
                    <div className="bg-red-100 text-red-800 font-medium px-3 py-2 rounded text-sm relative border border-red-300 shadow-md">
                        {error}

                        {/* Triangle container div - for positioning */}
                        <div className="absolute top-full left-0 w-full h-0 flex justify-center items-start overflow-visible">
                            {/* border - slightly bigger triangle*/}
                            <div className ="w-0 h-0 border-x-[10px] border-x-transparent border-t-[10px] border-t-red-300 absolute top-0 left-[20px] -translate-x-1/2 transform">
                            </div>

                            {/* Inner triangle (background color) */}
                            <div className = "w-0 h-0 border-x-[8px] border-x-transparent border-t-[8px] border-t-red-100 absolute top-0 left-[20px] -translate-x-1/2 transform">
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <input
                minLength={minLength}
                maxLength={maxLength}
                {...(type && { type })}
                className={`border-[1px] border-[#ececec] border-solid hover:border-[#a2caff] focus:bg-white rounded-[5px] py-[5px] pr-[5px] pl-[15px] text-[14px] font-[Poppins] h-[48px] ${width || 'w-[396px]'}`}
                value={value}
                onChange={(e) => {
                    setState(e.target.value);
                }}
                placeholder={placeholder}
            />
        </div>
    );
}