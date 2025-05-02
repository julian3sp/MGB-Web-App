import React from 'react';
import { CardList } from "./CardList.tsx"
import { CardListHeader } from "./CardListHeader.tsx"
import { CardListItem } from "./CardListItem.tsx"

export function CardContent( { location, specialties, phoneNumber } : {
    location: string;
    specialties: string[];
    phoneNumber: string;
} ) {
    return (
        <>
            <CardListHeader>Location:</CardListHeader>
            <CardList>
                <CardListItem>{location}</CardListItem>
            </CardList>
            <CardListHeader>Specialties and Services:</CardListHeader>
            <CardList>
                {specialties.map((specialty) => (
                <CardListItem>{specialty}</CardListItem>
                ))}
            </CardList>
            <CardListHeader>Phone Number:</CardListHeader>
            <CardList>
                <CardListItem>{phoneNumber}</CardListItem>
            </CardList>
        </>
    );
}