import React from 'react'
import { NavButton } from "./NavButton.tsx";

export function ParkingLotButtons( { selectedPlace, setAccordionItem } : {
    selectedPlace: string;
    setAccordionItem:  React.Dispatch<React.SetStateAction<string[]>>;
}) {
    const accordionEdit = () => {
        setAccordionItem(["item-3"]);
    };

    switch (selectedPlace) {
        case 'MGB (Chestnut Hill)':
            return(
                <>
                    <NavButton onClick={accordionEdit}>Lot A</NavButton>
                    <NavButton onClick={accordionEdit}>Lot B</NavButton>
                    <NavButton onClick={accordionEdit}>Lot C</NavButton>
                </>
            );
        case '20 Patriot Place':
            return (
                <>
                    <NavButton onClick={accordionEdit}>Lot A</NavButton>
                    <NavButton onClick={accordionEdit}>Lot B</NavButton>
                </>
            );
        case '22 Patriot Place':
            return (
                <>
                    <NavButton onClick={accordionEdit}>Lot A</NavButton>
                    <NavButton onClick={accordionEdit}>Lot B</NavButton>
                </>
            );
        case 'Faulkner':
            return (
                <>
                    <NavButton onClick={accordionEdit}>Lot A</NavButton>
                    <NavButton onClick={accordionEdit}>Lot B</NavButton>
                </>
            );
        case 'Main Campus':
            return (<></>);
        default:
            return (<></>);
    }
}