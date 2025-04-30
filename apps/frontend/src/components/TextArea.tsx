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
                className="border-[1px] bg-white border-[#ececec] shadow border-solid focus:bg-white hover:bg-accent rounded-md py-[20px] pl-[15px] text-[11pt] font-[Poppins] resize-none  w-full h-full rounded-md"
            />
        //removed this if needed for later: hover:border-[#a2caff]

    );
}

export default TextArea;
