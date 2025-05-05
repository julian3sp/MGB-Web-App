type SubmitButtonProps = {
    label: string,
    onClick?: () => void,
    type?: "submit" | "reset" | "button" | undefined
}


function SubmitButton({ label, onClick, type}: SubmitButtonProps) {
    return (
        <div className={"p-3"}>
        <button className={" bg-[#003a96]  text-[13pt] font-[Poppins] text-white px-10 py-4  rounded-md hover:bg-blue-950 focus:outline-none"} type={type} onClick={onClick}>
            {label}
        </button>
        </div>
    );
}

export default SubmitButton