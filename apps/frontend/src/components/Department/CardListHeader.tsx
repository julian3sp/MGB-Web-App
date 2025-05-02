import React from 'react';

export function CardListHeader({ children } : {
    children: string;
}) {
    return (
        <h2 className="font-[450] text-white font-[Poppins]">{children}</h2>
    );
}