type SubmitButtonProps = {
    label: string
    type: "submit" | "reset" | "button" | undefined
}


function SubmitButton({ label, type}: SubmitButtonProps) {
    return (
        <div className={"p-3"}>
        <button className={" bg-[#003a96] text-white px-9 p-2 border-2 border-black rounded-md hover:bg-[#002a70] focus:outline-none"} type={type} onClick={(e) => {
            e.preventDefault()
        }}>
            {label}
        </button>
        </div>
    );
}

export default SubmitButton