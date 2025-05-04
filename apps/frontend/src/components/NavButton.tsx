

export function NavButton( { onClick, children } : {
    onClick?: () => void;
    children: string;
} ) {
    return(
        <button
            onClick={onClick}
            className='px-3 py-2.5 w-full mx-auto text-md text-white font-bold bg-[#003a96] cursor-pointer rounded-3xl items-center'
        >
            {children}
        </button>
    );
}