import React from 'react';
import './styles/mainStyles.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from "../assets/Mass-General-Brigham-Logo.png";
import ExamplePage from './routes/ExamplePage.tsx';
import SignInPage from './routes/SignInPage.tsx';
import CreateAccountPage from './routes/CreateAccountPage.tsx';

function App() {
    const [loginTag, setLoginTag] = React.useState(localStorage.getItem("firstName") || "Log In");
    const [isSignedIn, setIsSignedIn] = React.useState(localStorage.getItem("isSignedIn") === "true");
    console.log('loginTag: ' + { loginTag });
    console.log('isSignedIn: ' + isSignedIn);
    

    function signOut(){
        localStorage.clear()
        setLoginTag("Log In")
        setIsSignedIn(false)
    }

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
                        <Link to="/signIn">

                            <button className={isSignedIn ? 'signedIn' : 'notSignedIn'} onClick={signOut}>
                                <span className={"defaultSign"}> {loginTag}</span>
                                <span className="hover-text">Sign out</span>
                            </button>
                        </Link>
                </nav>

                <Routes>
                    <Route path="/directories" element={<ExamplePage />} />
                    <Route path="/services" element={<ExamplePage />} />
                    <Route path="/signIn" element={<SignInPage />} />
                    <Route path="/createAcc" element={<CreateAccountPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;