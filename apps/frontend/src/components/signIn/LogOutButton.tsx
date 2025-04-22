import React from 'react';
import {Link} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export function LogOutButton({className}: {className?: string}) {
    const { logout, isAuthenticated } = useAuth0();

    function handleLogOut() {
        if (isAuthenticated) {
            window.sessionStorage.setItem("isAdmin", "false");
            logout();
        }
    }

    return (
        isAuthenticated && (
            <button
                className={`group px-5 py-5 transition-all duration-150 ease-in-out hover:bg-[#003a96] hover:text-white font-[Poppins] ${className ?? ""}`}
                onClick={() => handleLogOut()}>Log Out
            </button>

        )
    );
}