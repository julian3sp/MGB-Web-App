import React from 'react';
import './styles/mainStyles.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from "../assets/Mass-General-Brigham-Logo.png";
import ExamplePage from './routes/ExamplePage.tsx';
import SignInPage from './routes/SignInPage.tsx';

function App() {
    const loginTag: string = localStorage.getItem("firstName") || "Log In"
    const isSignedIn: boolean = localStorage.getItem("isSignedIn") === "true";
    return (
        <Router>
            <div className={'navBar'}>
                <nav className="flex justify-between items-center bg-white p-3 text-white border-b-1 border-gray-300">
                    <div className="flex items-center space-x-4">
                        <img src={logo} alt="Mass General Brigham Logo" className="h-6"/>
                        <div className="flex space-x-6">
                            <Link to="/directories"
                                  className="text-sm text-black hover:bg-[#003a96] hover:text-white py-1 px-3 rounded transition-all">
                                Directories
                            </Link>
                            <Link to="/services"
                                  className="text-sm text-black hover:bg-[#003a96] hover:text-white py-1 px-3 rounded transition-all">
                                Services
                            </Link>
                        </div>
                    </div>

                    <Link to="/login">
                        <button className={isSignedIn ? 'signedIn' : 'notSignedIn'}>
                            <span className={"defaultSign"}> {loginTag}</span>
                            <span className="hover-text">Sign in on another account</span>
                        </button>
                    </Link>
                </nav>

                <Routes>
                    <Route path="/directories" element={<ExamplePage />} />
                    <Route path="/services" element={<ExamplePage />} />
                    <Route path="/login" element={<SignInPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;