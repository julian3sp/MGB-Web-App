import React from 'react';
import './styles/mainStyles.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignInPage from './routes/SignInPage.tsx';
import CreateAccountPage from './routes/CreateAccountPage.tsx';
import logo from "../assets/Mass-General-Brigham-Logo.png";
import DepartmentDirectory from './routes/DepartmentDirectory';
import ServiceRequestPage from "./routes/ServiceRequestPage.tsx";
import { WelcomePage } from './routes/WelcomePage.tsx';

function App() {
    const [loginTag, setLoginTag] = React.useState(localStorage.getItem("firstName") || "Log In");
    const [isSignedIn, setIsSignedIn] = React.useState(localStorage.getItem("isSignedIn") === "true");

    const updateNavBar = () => {
        setLoginTag(localStorage.getItem("firstName") || "Log In");
        setIsSignedIn(localStorage.getItem("isSignedIn") === "true");
    };


    function signOut(){
        localStorage.clear()
        setLoginTag("Log In")
        setIsSignedIn(false)
    }

    return (
        <Router>
            <div className={'navBar'}>
                <nav className="flex justify-between items-center bg-white  text-white border-b-1 border-gray-300">
                    <div className="flex items-center space-x-4">
                        <Link to={"/"} className={"ml-5"}>
                        <img src={logo} alt="Mass General Brigham Logo"  className="h-6"/>
                        </Link>
                        <div className="flex">

                            <Link to="/directories"
                                  className="text-sm text-black hover:bg-[#003a96] font-[Poppins] hover:text-white  px-5 py-5 transition-all">
                                Directories
                            </Link>
                            <Link to="/services"
                                  className="text-sm text-black hover:bg-[#003a96]  font-[Poppins] hover:text-white  px-5 py-5 transition-all">
                                Services
                            </Link>

                        </div>
                    </div>

                        <Link to="/signIn" className={"mr-5"}>
                            <button className={isSignedIn ? 'signedIn' : 'notSignedIn'} onClick={signOut}>
                                <span className={"defaultSign"}> {loginTag}</span>
                                <span className="hover-text">Sign out</span>
                            </button>
                        </Link>
                </nav>

                <Routes>
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="/services" element={<ServiceRequestPage />} />
                    <Route path="/directories" element={<DepartmentDirectory />} />
                    <Route path="/signIn" element={<SignInPage rerenderBar={updateNavBar} />} />
                    <Route path="/createAcc" element={<CreateAccountPage rerenderBar={updateNavBar} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
