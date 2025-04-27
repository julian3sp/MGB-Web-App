import logo from "../../assets/Mass-General-Brigham-Logo.png";
import {Link, useLocation} from "react-router-dom";
import React, { useEffect } from "react";
import '../styles/mainStyles.css'
import {LogInButton} from "./signIn/LogInButton.tsx";
import {LogOutButton} from "./signIn/LogOutButton.tsx"
import { useAuth0 } from "@auth0/auth0-react";


type Props = {
    userRole: string
    setUserRole: (newRole: string) => void
}


export default function NavBar({ userRole,  setUserRole }: Props) {
    const [tab, setTab] = React.useState<string>("")
    const location = useLocation();
    const { isAuthenticated } = useAuth0();

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
                              "text-base text-black hover:bg-[#003a96] font-[Poppins] hover:text-white  px-5 py-5 transition-all"}>
                        Directory
                    </Link>
                    <Link to="/navigation" onClick={() => setTab("navigation")}
                          className={tab === "navigation" ?
                              "bg-[#003a96] font-[Poppins] text-white  px-5 py-5" :
                              "text-base text-black hover:bg-[#003a96] font-[Poppins] hover:text-white  px-5 py-5 transition-all"}>
                        Navigation
                    </Link>
                    <div className="flex">
                        {isAuthenticated && (userRole === "Staff" || userRole === "Admin") ? <Link to="/services" onClick={() => setTab("serv")}
                             className={tab === "serv" ?
                                 "bg-[#003a96] font-[Poppins] text-white  px-5 py-5" :
                                 "text-base text-black hover:bg-[#003a96] font-[Poppins] hover:text-white  px-5 py-5 transition-all"}>
                            Services
                        </Link> : null}
                        {isAuthenticated && (userRole === "Staff" || userRole === "Admin") ? <Link to="/requests" onClick={() => setTab("reqP")}
                             className={tab === "reqP" ?
                                 "bg-[#003a96] font-[Poppins] text-white  px-5 py-5" :
                                 "text-base text-black hover:bg-[#003a96] font-[Poppins] hover:text-white  px-5 py-5 transition-all"}>
                            View Requests
                        </Link> : null}
                        {(isAuthenticated &&  userRole === "Admin") ? <Link to="/editor" onClick={() => setTab("editor")}
                               className={tab === "editor" ?
                                   "bg-[#003a96] font-[Poppins] text-white  px-5 py-5" :
                                   "text-base text-black hover:bg-[#003a96] font-[Poppins] hover:text-white  px-5 py-5 transition-all"}>
                            Map Editor
                        </Link> : null}
                    </div>
                    <div className="flex">
                        { (isAuthenticated && userRole === "Admin") ?
                            <Link to="/admin/directory" onClick={() => setTab("exp")}
                                  className={tab === "exp" ?
                                      "text-base bg-[#003a96] font-[Poppins] text-white  px-5 py-5" :
                                      "text-base text-black hover:bg-[#003a96] font-[Poppins] hover:text-white  px-5 py-5 transition-all"}>
                                Export
                            </Link> : null }
                    </div>
                </div>
            </div>
            <LogInButton className= "text-base text-black" rerender={setUserRole}/>
            <LogOutButton className="text-base text-black" rerender={setUserRole}/>
        </nav>
    )
}