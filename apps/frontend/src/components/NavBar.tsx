import logo from "../../assets/Mass-General-Brigham-Logo.png";
import {Link, useLocation} from "react-router-dom";
import React from "react";
import '../styles/mainStyles.css'
import {LogInButton} from "./signIn/LogInButton.tsx";
import {LogOutButton} from "./signIn/LogOutButton.tsx"
import { useAuth0 } from "@auth0/auth0-react";


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
    return (
        <nav className="flex justify-between items-center bg-white text-white border-b-1 border-gray-300">
            <div className="flex items-center space-x-4">
                <Link to={"/"} className={"ml-5"} onClick={() => setTab("")}>
                    <img src={logo} alt="Mass General Brigham Logo"  className="h-6"/>
                </Link>
                <div className="flex">
                    <Link to="/directory" onClick={() => setTab("dir")}
                          className={tab === "dir" ?
                              "bg-[#003a96] font-[Poppins] text-white  px-5 py-5" :
                              "text-sm text-black hover:bg-[#003a96] font-[Poppins] hover:text-white  px-5 py-5 transition-all"}>
                        Directory
                    </Link>
                    <Link to="/navigation" onClick={() => setTab("navigation")}
                          className={tab === "navigation" ?
                              "bg-[#003a96] font-[Poppins] text-white  px-5 py-5" :
                              "text-sm text-black hover:bg-[#003a96] font-[Poppins] hover:text-white  px-5 py-5 transition-all"}>
                        Navigation
                    </Link>
                    <div className="flex">
                        {isLoading ||isAuthenticated ? <Link to="/services" onClick={() => setTab("serv")}
                          className={tab === "serv" ?
                              "bg-[#003a96] font-[Poppins] text-white  px-5 py-5" :
                              "text-sm text-black hover:bg-[#003a96] font-[Poppins] hover:text-white  px-5 py-5 transition-all"}>
                        Services
                        </Link> : null}
                        {isLoading || isAuthenticated ? <Link to="/requests" onClick={() => setTab("reqP")}
                          className={tab === "reqP" ?
                              "bg-[#003a96] font-[Poppins] text-white  px-5 py-5" :
                              "text-sm text-black hover:bg-[#003a96] font-[Poppins] hover:text-white  px-5 py-5 transition-all"}>
                        View Requests
                        </Link> : null}
                        {isLoading || isAuthenticated ? <Link to="/editor" onClick={() => setTab("editor")}
                          className={tab === "editor" ?
                              "bg-[#003a96] font-[Poppins] text-white  px-5 py-5" :
                              "text-sm text-black hover:bg-[#003a96] font-[Poppins] hover:text-white  px-5 py-5 transition-all"}>
                        Map Editor
                        </Link> : null}
                    </div>
                    <div className="flex">
                        {isLoading || isAuthenticated ? <Link to="/admin/directory" onClick={() => setTab("exp")}
                          className={tab === "exp" ?
                              "bg-[#003a96] font-[Poppins] text-white  px-5 py-5" :
                              "text-sm text-black hover:bg-[#003a96] font-[Poppins] hover:text-white  px-5 py-5 transition-all"}>
                        Export
                    </Link> : null }
                    </div>
                    <LogInButton className="fixed right-0 text-sm text-black"/>
                    <LogOutButton className="fixed right-0 text-sm text-black"/>
                </div>
            </div>
        </nav>
    )
}