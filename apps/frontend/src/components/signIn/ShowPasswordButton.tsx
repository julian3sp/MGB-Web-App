import React from 'react';

export function ShowPasswordButton({  setView, viewPW, children }: {
    setView: (value: boolean) => void;
    viewPW: boolean;
    children: string;
}){
    return (
        <button
            className="font-[Poppins] text-[15px] pl-[15px] pb-[30px]"
            onClick={(e) => {setView(!viewPW);}}
            type="button"
        >
        {children}
            {/*{<img src={imgSrc} alt={altText} className="w-6 h-6" />}*/}
        </button>
    )
}