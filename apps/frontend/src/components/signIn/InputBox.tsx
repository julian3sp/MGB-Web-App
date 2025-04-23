import React from 'react';

export function InputBox({ value, setState, placeholder, width="", type }: {
    value: string;
    setState: (value: string) => void;
    placeholder: string;
    width?: string;
    type?: string; //optional password input type
}) {
    return (
        <input
            {...(type && { type })}
            className={`96px]"}`}
            value={value}
            onChange={(e)=>{setState(e.target.value)}}
            placeholder={placeholder}
            required
        />
    );
}