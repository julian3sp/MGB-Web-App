import React from 'react';
import {Link} from "react-router-dom";

export function CreateAccountButton({ caption, linkName, toLink }: {caption: string, linkName: string; toLink: string }){
    return (
        <>
            <div>
                <p className="pt-[25px] text-center text-[16px] font-[Poppins] text-[#98a2b3]">
                    {caption}

                    <Link to={toLink}>
                    <button
                        className="pl-[10px] text-[16px] text-[#1570ef] underline"
                    >
                        {linkName}
                    </button>
                    </Link>
                </p>
            </div>
        </>
        // med from sheet - d9d9d9
        // edited style - 98a2b3
    );
}