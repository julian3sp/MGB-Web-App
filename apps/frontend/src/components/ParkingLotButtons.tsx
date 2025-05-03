import { NavButton } from "./NavButton.tsx";

export function ParkingLotButtons( { selectedPlace } : {
    selectedPlace: string;
}) {
    switch (selectedPlace) {
        case 'MGB (Chestnut Hill)':
            return(
                <>
                    <NavButton>Lot A</NavButton>
                    <NavButton>Lot B</NavButton>
                    <NavButton>Lot C</NavButton>
                </>
            );
        case '20 Patriot Place':
            return (
                <>
                    <NavButton>Lot A</NavButton>
                    <NavButton>Lot B</NavButton>
                </>
            );
        case '22 Patriot Place':
            return (
                <>
                    <NavButton>Lot A</NavButton>
                    <NavButton>Lot B</NavButton>
                </>
            );
        case 'Faulkner':
            return (
                <>
                    <NavButton>Lot A</NavButton>
                    <NavButton>Lot B</NavButton>
                </>
            );
        case 'Main Campus':
            return (<></>);
        default:
            return (<></>);
    }
}