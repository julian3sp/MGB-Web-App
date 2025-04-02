import React from 'react';
import './styles/mainStyles.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from "../assets/Mass-General-Brigham-Logo.png";
import ExamplePage from './routes/ExamplePage.tsx';
import SignInPage from './routes/SignInPage.tsx';
import ServiceRequestPage from './routes/ServiceRequestPage.tsx';
import {AppProvider, useAppContext} from "./Globals";

function AppContent() {
    const { isSignedIn, firstName } = useAppContext();
    console.log(isSignedIn);
    console.log(firstName);
    return (
        <Router>
            <div className={'navBar'}>
                <nav className="flex justify-between items-center bg-white p-3 h-15 text-white border-b border-gray-300">
                    <div className="flex items-center space-x-4 h-15">
                        <img src={logo} alt="Mass General Brigham Logo" className="h-6" />

                        {/* Flex container to align links side by side */}
                        <div className="flex h-full">
                            <ul className="flex h-full">
                                <Link to="/directories" className="flex items-center h-full px-4 text-sm text-black hover:bg-[#003a96] hover:text-white transition-all">
                                    <li className="w-full">Directories</li>
                                </Link>
                                <Link to="/services" className="flex items-center h-full px-4 text-sm text-black hover:bg-[#003a96] hover:text-white transition-all">
                                    <li className="w-full">Services</li>
                                </Link>
                                <Link to="/service-request" className="flex items-center h-full px-4 text-sm text-black hover:bg-[#003a96] hover:text-white transition-all">
                                    <li className="w-full">Service Request Forms</li>
                                </Link>
                            </ul>
                        </div>
                    </div>

                    <Link to="/login">
                        <button className={isSignedIn ? 'signedIn' : 'notSignedIn'}>
                            <span className="defaultSign">{isSignedIn ? firstName : 'Login'}</span>
                            <span className="hover-text">Sign in on another account</span>
                        </button>
                    </Link>
                </nav>




                <Routes>
                    <Route path="/directories" element={<ExamplePage />} />
                    <Route path="/services" element={<ExamplePage />} />
                    <Route path="/login" element={<SignInPage />} />
                    <Route path="/service-request" element={<ServiceRequestPage />} />
                </Routes>
            </div>
        </Router>
    );
}

function App() {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    );
}

export default App;