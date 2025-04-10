type CloseButtonProps = {
    label: string,
    onClick?: () => void,
    type?: "submit" | "reset" | "button" | undefined
}


function CloseButton({ label, onClick, type}: CloseButtonProps) {
    return (
        <div className={"p-3"}>
        <button className={"bg-[#003a96] text-[16px] font-[Poppins] text-white px-10 p-2  rounded-md hover:bg-[#FF0000] focus:outline-none"} type={type} onClick={onClick}>
        {label}
        </button>
        </div>
);
}

export default CloseButton