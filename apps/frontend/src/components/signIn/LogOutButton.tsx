import React from 'react';
import {Link} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export function LogOutButton(){
    const { logout, isAuthenticated } = useAuth0();
    return (
        isAuthenticated && (
            <button
                className="group text-sm px-5 py-5 transition-all duration-150 ease-in-out bg-[#003a96] text-white"
                onClick={() => logout()}>Log Out
            </button>

        )
    );
}