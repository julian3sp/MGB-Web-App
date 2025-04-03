import React from 'react';

export function InputHeader({  className, children }: { className?: string; children: string}){
    return (
        <h2 className={`font-[Poppins] text-[15px] pt-[10px] pb-[3px] ${className ?? ""}`}>{children}</h2>
    )
}