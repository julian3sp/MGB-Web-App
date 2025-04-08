import React from 'react';

export function InputBox({
    value,
    setState,
    placeholder,
    width = '',
    type,
    minLength,
    maxLength
}: {
    value: string;
    setState: (value: string) => void;
    placeholder: string;
    width?: string;
    type?: string;
    minLength?: number;
    maxLength?: number;
}) {
    return (
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
            required
        />
    );
}