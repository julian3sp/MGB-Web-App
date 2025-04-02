import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from "../assets/Mass-General-Brigham-Logo.png"; // Make sure the path is correct
import ExamplePage from './routes/ExamplePage.tsx'; // Example page for routing
import WelcomePage from './routes/WelcomePage.tsx';
/* Import your page here, then replace the element in the routes so it can perform the routing */

function App() {
    return (
        <Router>
            <div>
                <nav className="flex justify-between items-center bg-white p-3 text-white border-b-1 border-gray-300">
                    {/* the text in the logo is blue so I have no idea what color should be set for the nav bar */}
                    <div className="flex items-center space-x-4">
                        <div className="flex space-x-6">
                            <Link to="" className=" text-sm text-black hover:bg-[#003a96] hover:text-white py-1 px-3 rounded transition-all"><img src={logo} alt="Mass General Brigham Logo" className="h-6" /></Link>
                            <Link to="/directories" className=" text-sm text-black hover:bg-[#003a96] hover:text-white py-1 px-3 rounded transition-all">Directories</Link>
                            <Link to="/services" className="text-sm text-black hover:bg-[#003a96] hover:text-white py-1 px-3 rounded transition-all">Services</Link>
                        </div>
                    </div>

                    <Link to="/login">
                        <button className="text-sm text-black hover:bg-[#003a96] hover:text-white py-1 px-3 rounded transition-all">
                            Login
                        </button>
                    </Link>
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
