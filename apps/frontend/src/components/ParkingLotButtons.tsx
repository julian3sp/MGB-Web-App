import React from 'react'
import { NavButton } from "./NavButton.tsx";

export function ParkingLotButtons( { selectedPlace, setAccordionItem, setLot} : {
    selectedPlace: string;
    setAccordionItem:  React.Dispatch<React.SetStateAction<string[]>>;
    setLot: (
        lot: string,
    ) => void
}) {
    const accordionEdit = (location: string) => {
        setLot(location)
        setAccordionItem(["item-3"]);
    };

    switch (selectedPlace) {
        case 'MGB (Chestnut Hill)':
            return(
                <>
                    <NavButton onClick={() => accordionEdit('MGB A')}>Lot A</NavButton>
                    <NavButton onClick={() => accordionEdit('MGB B')}>Lot B</NavButton>
                    <NavButton onClick={() => accordionEdit('MGB C')}>Lot C</NavButton>
                </>
            );
        case '20 Patriot Place':
            return (
                <>
                    <NavButton onClick={() => accordionEdit('20 Patriot Place')}>Main Entrance</NavButton>
                </>
            );
        case '22 Patriot Place':
            return (
                <>
                    <NavButton onClick={() => accordionEdit('22 Patriot Place')}>Main Entrance</NavButton>
                </>
            );
        case 'Faulkner':
            return (
                <>
                    <NavButton onClick={() => accordionEdit('Faulk A')}>Lot A</NavButton>
                    <NavButton onClick={() => accordionEdit('Faulk B')}>Lot B</NavButton>
                </>
            );
        case 'Belkin House':
            return (
                <>
                    <NavButton onClick={() => accordionEdit('BH A')}>Lot A</NavButton>
                    <NavButton onClick={() => accordionEdit('BH B')}>Lot B</NavButton>
                </>
            );
        case 'Main Campus':
            return (
                <>
                    <NavButton onClick={() => accordionEdit('MC A')}>Lot A</NavButton>
                </>
            );
        default:
            return (<></>);
    }
}