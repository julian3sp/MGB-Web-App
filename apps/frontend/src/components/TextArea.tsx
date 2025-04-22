type TextAreaProps = {
    value: string;
    setState: (value: string) => void;
    placeholder?: string; // Optional
};

function TextArea({value, setState, placeholder }: TextAreaProps) {
    return (


            <textarea
                value={value}
                onChange={(e)=>{setState(e.target.value)}}
                placeholder={placeholder}
                className="border-[1px] border-[#ececec] shadow border-solid hover:border-[#a2caff] rounded-[5px] py-[20px] pl-[15px] text-[14px] font-[Poppins] resize-none text-[14px] w-full h-full rounded-md hover:border-[#a2caff]"
            />

    );
}

export default TextArea;
