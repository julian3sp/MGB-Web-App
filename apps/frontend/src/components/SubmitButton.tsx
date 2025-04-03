type SubmitButtonProps = {
    label: string
    type: "submit" | "reset" | "button" | undefined
}


function SubmitButton({ label, type}: SubmitButtonProps) {
    return (
        <div className={"p-3"}>
        <button className={" bg-[#003a96] text-white px-9 p-2 border-1 border-black rounded-md hover:bg-[#228B22] focus:outline-none"} type={type}>
            {label}
        </button>
        </div>
    );
}

export default SubmitButton