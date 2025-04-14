import HospitalIcon from "../../assets/logo-icon-mass-general-brigham.png";
import React from 'react'
import {Link} from "react-router-dom";

function FooterBar() {
    const [tab, setTab] = React.useState<string>("");
    return (
        <div className="bg-[#003a96] text-white p-5">
            <nav className="flex justify-between items-center text-white">
                <div className="flex items-center space-x-20 text-xl">
                    <Link to="" onClick={() => setTab("")}>
                        <img src={HospitalIcon} alt="Mass General Brigham Logo"  className="width-20"/>
                    </Link>
                    <div className="flex">
                        About
                    </div>
                    <div className="flex">
                        <Link to="https://www.massgeneralbrigham.org/en">
                            Official Website
                        </Link>
                    </div>
                    <div className="flex">
                        <Link to="/directory" onClick={() => setTab("")}>
                            Directory
                        </Link>
                    </div>
                    <div className="flex">
                        <Link to="navigation" onClick={() => setTab("")}>
                            Navigation
                        </Link>
                    </div>
                    <div className="flex">
                        <Link to="/signIn" onClick={() => setTab("")}>
                            Login
                        </Link>
                    </div>
                </div>
            </nav>
            <div className="py-5">
                This page is not to be used for emergencies. For emergencies, please dial 911
            </div>
        </div>
    )
}

export default FooterBar;