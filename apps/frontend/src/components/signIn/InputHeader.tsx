import React from 'react';

export function InputHeader({  className, children }: { className?: string; children: string}){
    return (
        <h2 className={`font-[Poppins] text-[13pt] pt-[10px] pb-[3px] ${className ?? ""}`}>{children}</h2>
    )
}