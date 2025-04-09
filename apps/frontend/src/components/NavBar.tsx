import logo from "../../assets/Mass-General-Brigham-Logo.png";
import {Link} from "react-router-dom";
import React from "react";
import '../styles/mainStyles.css'

type Props = {
    loginTag: string
    isSignedIn: boolean
    signOut: () => void
}


export default function NavBar({loginTag, isSignedIn, signOut}: Props) {
    const [tab, setTab] = React.useState<string>("")
    return (
        <nav className="flex justify-between items-center bg-white  text-white border-b-1 border-gray-300">
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
                    <Link to="/services" onClick={() => setTab("serv")}
                          className={tab === "serv" ?
                              "bg-[#003a96] font-[Poppins] text-white  px-5 py-5" :
                              "text-sm text-black hover:bg-[#003a96] font-[Poppins] hover:text-white  px-5 py-5 transition-all"}>
                        Services
                    </Link>
                    <Link to="/requests" onClick={() => setTab("req")}
                          className={tab === "req" ?
                              "bg-[#003a96] font-[Poppins] text-white  px-5 py-5" :
                              "text-sm text-black hover:bg-[#003a96] font-[Poppins] hover:text-white  px-5 py-5 transition-all"}>
                        Requests
                    </Link>
                    <Link to="/admin/directory" onClick={() => setTab("req")}
                          className={tab === "req" ?
                              "bg-[#003a96] font-[Poppins] text-white  px-5 py-5" :
                              "text-sm text-black hover:bg-[#003a96] font-[Poppins] hover:text-white  px-5 py-5 transition-all"}>
                        Export
                    </Link>

                </div>
            </div>

            <Link to="/signIn" className={"mr-5"}>
                <button className={
                        isSignedIn ?
                            'group text-sm text-black px-3 py-1 rounded transition-all duration-150 ease-in-out hover:bg-[#003a96] hover:text-white' :
                            'text-sm text-black px-3 py-1 rounded transition-all duration-150 ease-in-out hover:bg-[#003a96] hover:text-white'}
                        onClick={() => signOut()}>
                    <span className={"defaultSign group-hover:hidden"}> {loginTag}</span>
                    <span className="hover-text hidden group-hover:block">Sign out</span>
                </button>
            </Link>
        </nav>
    )
}