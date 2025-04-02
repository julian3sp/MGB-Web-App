type TextInputProps = {
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string; // Optional
};

function TextInput({label, value, onChange, placeholder} : TextInputProps){

    return(
        <div>
            <label className={""}>{label}</label>
            <div className={"mt-2"}>
            <input type="text" value={value} onChange={onChange} placeholder={placeholder} className={"bg-white border left border-gray-300 py-4 px-2 h-9 w-full text-sm rounded-md hover:border-[#a2caff] focus:outline-none"}/>
            </div>
        </div>
    )
}

export default TextInput