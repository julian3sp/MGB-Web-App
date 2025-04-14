import HospitalIcon from "../../assets/logo-icon-mass-general-brigham.png";
import React from 'react'
import {Link} from "react-router-dom"
import { SocialIcon } from 'react-social-icons'
import ReactDOM from 'react-dom'

function FooterBar() {
    const [tab, setTab] = React.useState<string>("");
    return (
        <div className="bg-[#003a96] text-white p-5">
            <nav className="flex justify-between items-center text-white">
                <div className="flex items-center space-x-20 text-xl">
                    <div className="flex">
                        <Link to="" onClick={() => setTab("")}>
                            <img src={HospitalIcon} alt="Mass General Brigham Logo"  className="width-20"/>
                        </Link>
                    </div>
                    <div className="flex">
                        <Link to="/about" onClick={() => setTab("")}>
                            About
                        </Link>
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
                        <Link to="/navigation" onClick={() => setTab("")}>
                            Navigation
                        </Link>
                    </div>
                    <div className="flex">
                        <Link to="/signIn" onClick={() => setTab("")}>
                            Login
                        </Link>
                    </div>
                </div>
                <div>
                    <SocialIcon url="https://www.facebook.com/MassGeneralBrigham" bgColor="#003a96"/>
                    <SocialIcon url="https://x.com/MassGenBrigham" bgColor="#003a96"/>
                    <SocialIcon url="https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fmassgeneralbrigham%2F&is_from_rle" bgColor="#003a96"/>
                    <SocialIcon url="https://www.youtube.com/massgeneralbrigham" bgColor="#003a96"/>
                    <SocialIcon url="https://www.linkedin.com/company/mass-general-brigham" bgColor="#003a96"/>
                </div>
            </nav>
            <div className="py-5">
                This page is not to be used for emergencies. For emergencies, please dial 911
            </div>
        </div>
    )
}

export default FooterBar;