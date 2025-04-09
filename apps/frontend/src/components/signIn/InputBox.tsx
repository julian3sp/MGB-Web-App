import React from 'react';

export function InputBox({
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
                            <div
                                style={{
                                    width: 0,
                                    height: 0,
                                    borderLeft: '10px solid transparent',
                                    borderRight: '10px solid transparent',
                                    borderTop: '10px solid #fca5a5', /* red-300 */
                                    position: 'absolute',
                                    top: 0,
                                    transform: 'translateX(-50%)',
                                    left: '20px'
                                }}>
                            </div>

                            {/* Inner triangle (background color) */}
                            <div
                                style={{
                                    width: 0,
                                    height: 0,
                                    borderLeft: '8px solid transparent',
                                    borderRight: '8px solid transparent',
                                    borderTop: '8px solid #fee2e2', /* red-100 */
                                    position: 'absolute',
                                    top: 0,
                                    transform: 'translateX(-50%)',
                                    left: '20px'
                                }}>
                            </div>
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