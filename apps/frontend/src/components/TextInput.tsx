type TextInputProps = {
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string; // Optional
};

function TextInput({label, value, onChange, placeholder} : TextInputProps){
    return(
        <div>
            <label>{label}</label>
            <input type="text" value={value} onChange={onChange} placeholder={placeholder} className={"bg-white border border-gray-300 p-5 h-10 w-full rounded-md hover:border-[#a2caff] focus:outline-none"}/>
        </div>
    )
}

export default TextInput