import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

interface Props {
    className?: string;
    rerender: (userRole: string) => void;
}

export function LogOutButton({className, rerender}: Props) {
    const { logout, isAuthenticated } = useAuth0();

    function handleLogOut() {
        if (isAuthenticated) {
            rerender("")
            logout({ logoutParams: { returnTo: window.location.origin } });
        }
    }

    return (
        isAuthenticated && (
            <button
                className={`right-0 group px-5 py-5 transition-all duration-150 ease-in-out hover:bg-white hover:text-black font-[Poppins] ${className ?? ""}`}
                onClick={() => handleLogOut()}>Log Out
            </button>

        )
    );
}