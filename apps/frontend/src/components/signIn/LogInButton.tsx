import React, { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

interface Props {
    className?: string;
    rerender: (isAdmin: boolean) => void;
}

export function LogInButton({className, rerender}: Props) {
    const {user, loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

    useEffect(()=>{
        if(user) {
            if (user.name === "Admin") {
                console.log("Good")
                window.sessionStorage.setItem("isAdmin","true")
                rerender(true)
            } else {
                console.log("Bad")
                window.sessionStorage.setItem("isAdmin","false")
                rerender(false)
            }
        }
        },
        [isAuthenticated]
    )

    return (
        isLoading || !isAuthenticated && (
            <button
                className={`group px-5 py-5 transition-all duration-150 ease-in-out hover:bg-[#003a96] hover:text-white font-[Poppins] ${className ?? ''}`}
                onClick={() => loginWithRedirect()}>Log In
            </button>
        )
    );
}