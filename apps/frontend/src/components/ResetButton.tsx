type SubmitButtonProps = {
    label: string
}


function SubmitButton({ label}: SubmitButtonProps) {
    return (
        <div className={"p-3"}>
                <button className={" bg-[#003a96] text-[16px] font-[Poppins] text-white px-10 p-2  rounded-md hover:bg-[#FF0000] focus:outline-none"} type={"reset"}>
                {label}
            </button>
        </div>
    );
}

export default SubmitButton