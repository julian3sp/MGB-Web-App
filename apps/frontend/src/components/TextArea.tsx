type TextAreaProps = {
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string; // Optional
};

function TextArea({ label, value, onChange, placeholder }: TextAreaProps) {
    return (
        <div>
            <label>{label}</label>
            <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="bg-white border border-gray-300 p-5 w-full rounded-md hover:border-[#a2caff] focus:outline-none"
            />
        </div>
    );
}

export default TextArea;
