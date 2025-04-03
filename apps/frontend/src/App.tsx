import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from "../assets/Mass-General-Brigham-Logo.png";
import ExamplePage from './routes/ExamplePage.tsx';
import WelcomePage from './routes/WelcomePage.tsx';

function App() {
    return (
        <Router>
            <div>
                <nav className="flex justify-between items-center bg-white h-16 border-b border-gray-300">
                    <div className="flex items-center h-full space-x-6">
                        <div className="flex items-center h-full px-4 transition-all">
                            <img src={logo} alt="Mass General Brigham Logo" className="h-6" />
                        </div>
                        <div className="flex items-center h-full px-4 text-sm text-black transition-all hover:bg-[#003a96] hover:!text-white hover:font-bold cursor-pointer">
                            Directories
                        </div>
                        <div className="flex items-center h-full px-4 text-sm text-black transition-all hover:bg-[#003a96] hover:!text-white hover:font-bold cursor-pointer">
                            Services
                        </div>
                    </div>
                    <div className="flex items-center h-full px-4 text-sm text-black transition-all hover:bg-[#003a96] hover:!text-white hover:font-bold cursor-pointer">
                        Login
                    </div>
                </nav>
                <Routes>
                    <Route path="" element={<WelcomePage />} />
                    <Route path="/directories" element={<ExamplePage />} />
                    <Route path="/services" element={<ExamplePage />} />
                    <Route path="/login" element={<ExamplePage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
