import React from 'react';

export function CardListItem( { children} : { children: string; } ) {
    return(
        <li className="font-light">{children}</li>
    );
}