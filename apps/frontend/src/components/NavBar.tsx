import logo from "../../assets/MassGenWhite.svg";
import {Link, useLocation} from "react-router-dom";
import React, { useEffect } from "react";
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
    const [isAdmin, setAdmin] = React.useState<boolean>(false);

    useEffect(() => {
        if (location.pathname === "/navigation") {
            const navbar = document.getElementById("navbar") as HTMLElement;
            if (navbar) {
                navbar.style.display = "none";
            }
            window.scrollTo(0, 65);
        } else {
            const navbar = document.getElementById("navbar") as HTMLElement;
            if (navbar) {
                navbar.style.display = "block";
            }
        }
    }, [location.pathname]);

    useEffect(() => {
        if (location.pathname.includes("/directory")) setTab("dir");
        else if (location.pathname.includes("/navigation")) setTab("navigation");
        else if (location.pathname.includes("/services")) setTab("serv");
        else if (location.pathname.includes("/requests")) setTab("reqP");
        else if (location.pathname.includes("/editor")) setTab("editor");
        else if (location.pathname.includes("/admin/directory")) setTab("exp");
        else setTab("");
    }, [location.pathname]);

    return (
        <nav className="flex justify-between items-center border-b-[#44A6A6] border-b-3  bg-[#003A96] text-white ">
            <div className="flex items-center space-x-4 ">
                <Link to={"/"} className={"ml-5"} onClick={() => setTab("")}>
                    <img src={logo} alt="Mass General Brigham Logo"  className="h-9"/>
                </Link>
                <div className="flex">
                    <Link to="/directory" onClick={() => setTab("dir")}
                          className={tab === "dir" ?
                              "bg-[#003a96] font-[Poppins] bg-white text-black  px-5 py-5" :
                              "text-base text-white hover:bg-[#003a96] font-[Poppins]  hover:bg-white hover:text-black   px-5 py-5 transition-all"}>
                        Directory
                    </Link>
                    <Link to="/navigation" onClick={() => setTab("navigation")}
                          className={tab === "navigation" ?
                              "bg-[#003a96] font-[Poppins]  bg-white text-black    px-5 py-5" :
                              "text-base text-white hover:bg-[#003a96] font-[Poppins]  hover:bg-white hover:text-black   px-5 py-5 transition-all"}>
                        Navigation
                    </Link>
                    <div className="flex">
                        {isAuthenticated ? <Link to="/services" onClick={() => setTab("serv")}
                                                 className={tab === "serv" ?
                                                     "bg-[#003a96] font-[Poppins]  bg-white text-black   px-5 py-5" :
                                                     "text-base text-white hover:bg-[#003a96] font-[Poppins]  hover:bg-white hover:text-black  px-5 py-5 transition-all"}>
                            Services
                        </Link> : null}
                        {isAuthenticated ? <Link to="/requests" onClick={() => setTab("reqP")}
                                                 className={tab === "reqP" ?
                                                     "bg-[#003a96] font-[Poppins]  bg-white text-black   px-5 py-5" :
                                                     "text-base text-white hover:bg-[#003a96] font-[Poppins] hover:bg-white hover:text-black   px-5 py-5 transition-all"}>
                            View Requests
                        </Link> : null}
                        {isAdmin || (isAuthenticated && (window.sessionStorage.getItem("isAdmin") === "true")) ? <Link to="/editor" onClick={() => setTab("editor")}
                                                                                                                       className={tab === "editor" ?
                                                                                                                           "bg-[#003a96] font-[Poppins] bg-white text-black  px-5 py-5" :
                                                                                                                           "text-base text-white hover:bg-[#003a96] font-[Poppins]  hover:bg-white hover:text-black  px-5 py-5 transition-all"}>
                            Map Editor
                        </Link> : null}
                    </div>
                    <div className="flex">
                        {isAdmin || (isAuthenticated && (window.sessionStorage.getItem("isAdmin") === "true")) ?
                            <Link to="/admin/directory" onClick={() => setTab("exp")}
                                  className={tab === "exp" ?
                                      "text-base bg-[#003a96] font-[Poppins]  bg-white text-black   px-5 py-5" :
                                      "text-base text-white hover:bg-[#003a96] font-[Poppins]  hover:bg-white hover:text-black  px-5 py-5 transition-all"}>
                                Export
                            </Link> : null }
                    </div>
                </div>
            </div>
            <LogInButton className= "text-base text-black" rerender={setAdmin}/>
            <LogOutButton className="text-base text-black"/>
        </nav>
    )
}