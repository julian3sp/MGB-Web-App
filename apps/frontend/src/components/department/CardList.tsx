import React from 'react'

export function CardList({ children }: { children: React.ReactNode}) {
    return(
        <ul className="list-disc pl-10 text-white font-[Poppins]">{children}</ul>
    );
}