import React, { useState, useEffect } from 'react';
import './styles/mainStyles.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import DepartmentDirectory from './routes/departmentDirectory/DepartmentDirectory.tsx';
import ServiceRequestPage from './routes/ServiceRequestPage';
import RequestListPage from './routes/requestDisplay/RequestListPage.tsx';
import { WelcomePage } from './routes/WelcomePage';
import NavBar from './components/NavBar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from "./lib/trpc.ts";
import FooterBar from './components/FooterBar';
import DirectoryPage from './routes/departmentDirectory/DirectoryPage.tsx';
import RequestTablePage from './routes/requestDisplay/RequestTablePage.tsx';
import { useAuth0 } from "@auth0/auth0-react";
import AboutUs from './routes/AboutUs.tsx';
import WaitingScreen from './routes/WaitingScreen.tsx';
import NavigationPage from "./routes/NavigationPage.tsx";
import MapEditor from "./components/navigation/pathfinding/MapEditor.tsx";
import RequestPage from "./routes/requestDisplay/RequestPage.tsx";

function InnerApp() {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
    const [loginTag, setLoginTag] = React.useState(localStorage.getItem("firstName") || "Log In");
    const [isSignedIn, setIsSignedIn] = React.useState(localStorage.getItem("isSignedIn") === "true");
    const navigate = useNavigate();
    const location = useLocation();

    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const inactive = 5 * 60 * 1000;

    const reset = () => {
        if (timeoutRef.current){
            clearTimeout(timeoutRef.current); // clear the previous time if exists
        }
        timeoutRef.current = setTimeout(() => { // start a new timer
            if(location.pathname !== '/waiting') {
                navigate('/waiting'); // if the user is not already on the waiting page, redirect them there
            }
        }, inactive) // after 5 minutes of no activity 
    }

    useEffect(() => {
        const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];

        events.forEach(event => window.addEventListener(event, reset)); // every event that restarts the timer
        // any user interaction resets the inactivity timer

        reset(); // start the timer when the page loads

        return () => {
            if(timeoutRef.current) {
                clearTimeout(timeoutRef.current) // clear the timer if component unmounts
            }
            events.forEach(event => window.removeEventListener(event, reset)); // remove event listeners
        }
    }, [location.pathname])

    function signOut() {
        localStorage.clear();
        setLoginTag("Log In");
        setIsSignedIn(false);
    }

    const PrivateRoutes = () => {
        console.log(isAuthenticated);
        return (
            isLoading || isAuthenticated ? <Outlet /> : <Navigate to='/' />
        );
    }

    return (
        <div className='min-h-screen'>
            {location.pathname !== '/waiting' && (
                <NavBar loginTag={loginTag} isSignedIn={isSignedIn} signOut={signOut} />
            )}
            <Routes>
                <Route path='/waiting' element={<WaitingScreen />} />
                <Route path='/' element={<Navigate to="/waiting" replace />} />
                <Route path="/navigation" element={<NavigationPage />} />
                <Route path="/welcome" element={<WelcomePage />} />
                <Route path="/directory" element={<DepartmentDirectory />} />
                <Route path="/directory/*" element={<DepartmentDirectory />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route element={<PrivateRoutes />}>
                    <Route path="/services" element={<ServiceRequestPage />} />
                    <Route path="/admin/directory" element={<DirectoryPage />} />
                    <Route path="/editor" element={<MapEditor onMapReady={() => { }} />} />
                    <Route path="requests" element={<RequestPage />}>
                        <Route index element={<Navigate to="table" replace />} />
                        <Route path="table" element={<RequestTablePage />} />
                        <Route path="list" element={<RequestListPage />} />
                    </Route>
                </Route>
            </Routes>
            {location.pathname !== '/waiting' && (
                <FooterBar />
            )}
        </div>
    );
}

function App() {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: "/trpc"
                }),
            ],
        }),
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <InnerApp />
                </Router>
            </QueryClientProvider>
        </trpc.Provider>
    );
}

export default App;
