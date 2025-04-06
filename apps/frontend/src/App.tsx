import React from 'react';
import './styles/mainStyles.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignInPage from './routes/SignInPage.tsx';
import CreateAccountPage from './routes/CreateAccountPage.tsx';
import DepartmentDirectory from './routes/DepartmentDirectory';
import ServiceRequestPage from "./routes/ServiceRequestPage.tsx";
import { WelcomePage } from './routes/WelcomePage.tsx';
import NavBar from "./components/NavBar.tsx";

function App() {
    const [loginTag, setLoginTag] = React.useState(localStorage.getItem("firstName") || "Log In");
    const [isSignedIn, setIsSignedIn] = React.useState(localStorage.getItem("isSignedIn") === "true");

    function signOut(){
        localStorage.clear()
        setLoginTag("Log In")
        setIsSignedIn(false)
    }

    const updateNavBar = () => {
        setLoginTag(localStorage.getItem("firstName") || "Log In");
        setIsSignedIn(localStorage.getItem("isSignedIn") === "true");
    };

    return (
        <Router>
            <NavBar loginTag={loginTag} isSignedIn={isSignedIn} signOut={signOut}/>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/services" element={<ServiceRequestPage />} />
                <Route path="/directory" element={<DepartmentDirectory />} />
                <Route path="/directory/*" element={<DepartmentDirectory />} />
                <Route path="/signIn" element={<SignInPage rerenderBar={updateNavBar} />} />
                <Route path="/createAcc" element={<CreateAccountPage rerenderBar={updateNavBar} />} />
            </Routes>
        </Router>
    );
}

export default App;
