type SubmitButtonProps = {
    label: string
}


function SubmitButton({ label}: SubmitButtonProps) {
    return (
        <div className={"p-3"}>
        <button className={" bg-[#32CD32]  text-[16px] font-[Poppins] text-white px-9 p-2  rounded-md hover:bg-[#009000] focus:outline-none"} type={"submit"}>
            {label}
        </button>
        </div>
    );
}

export default SubmitButton