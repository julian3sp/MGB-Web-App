import React from 'react';
import {Link} from "react-router-dom";

export function SubmitPasswordButton() {
    return (
        <Link to={"/"}>
            <button className="font-[Poppins] text-white w-[396px] h-[52px] bg-[#1570ef] rounded-[5px]" type={'submit'}>Login now</button>
        </Link>
        //hospital actual color - #003a96
        //edited color for styling - #1570ef
    )
}