import React from 'react';

export function InputBox1({ value, setState, placeholder, width="", type }: {
    value: string;
    setState: (value: string) => void;
    placeholder: string;
    width?: string;
    type?: string; //optional password input type
}) {
    return (
        <input
            {...(type && { type })}
            className={`border-[1px] border-[#ececec] border-solid hover:border-[#a2caff] rounded-[5px] py-[5px] pr-[5px] pl-[15px] text-[14px] font-[Poppins] h-[48px] ${width || "w-[396px]"}`}
            value={value}
            onChange={(e)=>{setState(e.target.value)}}
            placeholder={placeholder}
            required
        />
    );
}