import logo from "../../assets/Mass-General-Brigham-Logo.png";
import {Link, useLocation} from "react-router-dom";
import React, { useEffect } from "react";
import '../styles/mainStyles.css'
import {LogInButton} from "./signIn/LogInButton.tsx";
import {LogOutButton} from "./signIn/LogOutButton.tsx"
import { useAuth0 } from "@auth0/auth0-react";
import icon from "../../assets/logo-icon-mass-general-brigham.png";


type Props = {
    loginTag: string
    isSignedIn: boolean
    signOut: () => void
}


export default function NavBar({loginTag, isSignedIn, signOut}: Props) {
    const [tab, setTab] = React.useState<string>("")
    const location = useLocation();
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
    const isLoginPage = location.pathname === "/signIn" || location.pathname === "/createAcc";
    const [isAdmin, setAdmin] = React.useState<boolean>(false);

    return (
        <nav className="flex justify-between items-center bg-white text-white border-b-1 border-gray-300">
            <div className="flex items-center space-x-4">
                <Link to={"/"} className={"ml-5 flex items-center space-x-2 text-sm text-[#003a96] font-[Poppins]"} onClick={() => setTab("")}>
                    <img src={icon} alt="Mass General Brigham Logo"  className="h-6"/>
                    <div className="flex font-semibold">Mass General Brigham</div>
                </Link>
                <div className="flex">
                    <Link to="/directory" onClick={() => setTab("dir")}
                          className={tab === "dir" ?
                              "text-base bg-[#003a96] font-[Poppins] text-white px-5 py-5" :
                              "text-base text-black hover:bg-[#003a96] font-[Poppins] hover:text-white px-5 py-5 transition-all"}>
                        Directory
                    </Link>
                    <Link to="/navigation" onClick={() => setTab("navigation")}
                          className={tab === "navigation" ?
                              "text-base bg-[#003a96] font-[Poppins] text-white  px-5 py-5" :
                              "text-base text-black hover:bg-[#003a96] font-[Poppins] hover:text-white  px-5 py-5 transition-all"}>
                        Navigation
                    </Link>
                    <div className="flex">
                        {isAuthenticated ? <Link to="/services" onClick={() => setTab("serv")}
                          className={tab === "serv" ?
                              "text-base bg-[#003a96] font-[Poppins] text-white  px-5 py-5" :
                              "text-base text-black hover:bg-[#003a96] font-[Poppins] hover:text-white  px-5 py-5 transition-all"}>
                        Services
                        </Link> : null}
                        {isAuthenticated ? <Link to="/requests" onClick={() => setTab("reqP")}
                          className={tab === "reqP" ?
                              "text-base bg-[#003a96] font-[Poppins] text-white  px-5 py-5" :
                              "text-base text-black hover:bg-[#003a96] font-[Poppins] hover:text-white  px-5 py-5 transition-all"}>
                        View Requests
                        </Link> : null}
                        {isAdmin || (isAuthenticated && (window.sessionStorage.getItem("isAdmin") === "true")) ? <Link to="/editor" onClick={() => setTab("editor")}
                          className={tab === "editor" ?
                              "text-base bg-[#003a96] font-[Poppins] text-white  px-5 py-5" :
                              "text-base text-black hover:bg-[#003a96] font-[Poppins] hover:text-white  px-5 py-5 transition-all"}>
                        Map Editor
                        </Link> : null}
                    </div>
                    <div className="flex">
                        {isAdmin || (isAuthenticated && (window.sessionStorage.getItem("isAdmin") === "true")) ? <Link to="/admin/directory" onClick={() => setTab("exp")}
                          className={tab === "exp" ?
                              "text-base bg-[#003a96] font-[Poppins] text-white  px-5 py-5" :
                              "text-base text-black hover:bg-[#003a96] font-[Poppins] hover:text-white  px-5 py-5 transition-all"}>
                        Export
                    </Link> : null }
                    </div>
                    <LogInButton className=" right-0 text-base text-black" rerender={setAdmin}/>
                    <LogOutButton className=" right-0 text-base text-black"/>
                </div>
            </div>
        </nav>
    )
}