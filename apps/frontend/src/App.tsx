import React, { useState } from 'react';
import './styles/mainStyles.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignInPage from './routes/SignInPage';
import CreateAccountPage from './routes/CreateAccountPage';
import DepartmentDirectory from './routes/DepartmentDirectory';
import ServiceRequestPage from './routes/ServiceRequestPage';
import RequestListPage from './routes/RequestListPage'
import { WelcomePage } from './routes/WelcomePage';
import NavBar from './components/NavBar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink} from '@trpc/client';
import {trpc} from "./lib/trpc.ts";
import DirectoryPage from './routes/DirectoryPage';
import AboutUs from './routes/AboutUs.tsx';

import NavigationPage from "./routes/NavigationPage.tsx";
import MapEditor from "./components/navigation/pathfinding/MapEditor.tsx";

function App() {
    const [loginTag, setLoginTag] = React.useState(localStorage.getItem("firstName") || "Log In");
    const [isSignedIn, setIsSignedIn] = React.useState(localStorage.getItem("isSignedIn") === "true");
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: 'http://localhost:3001/trpc'
                }),
            ],
        }),
    );

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
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
        <Router>
            <NavBar loginTag={loginTag} isSignedIn={isSignedIn} signOut={signOut}/>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/services" element={<ServiceRequestPage />} />
                <Route path="/requests" element={<RequestListPage />} />
                <Route path="/directory" element={<DepartmentDirectory />} />
                <Route path="/directory/*" element={<DepartmentDirectory />} />
                <Route path="/admin/directory" element={<DirectoryPage />} />
                <Route path="/signIn" element={<SignInPage rerenderBar={updateNavBar} />} />
                <Route path="/createAcc" element={<CreateAccountPage rerenderBar={updateNavBar} />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/navigation" element={<NavigationPage />} />
            </Routes>
        </Router>
            </QueryClientProvider>
        </trpc.Provider>
    );
}

export default App;
