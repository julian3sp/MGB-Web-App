type TextAreaProps = {
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string; // Optional
};

function TextArea({ label, value, onChange, placeholder }: TextAreaProps) {
    return (
        <div className={"p-3"}>
            <label >{label}</label>
            <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="bg-white border border-gray-300 p-2 resize-none text-sm w-full rounded-md hover:border-[#a2caff] focus:outline-none"
            />
        </div>
    );
}

export default TextArea;
