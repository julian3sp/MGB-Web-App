import React, { useState, useEffect } from 'react';
import './styles/mainStyles.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import DepartmentDirectory from './routes/departmentDirectory/DepartmentDirectory.tsx';
import ServiceRequestPage from './routes/ServiceRequestPage';
import RequestListPage from './routes/requestDisplay/RequestListPage.tsx';
import { WelcomePage } from './routes/WelcomePage';
import {BryanDirectoryPage} from './routes/BryanDirectoryPage.tsx';
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
import {Credits} from "./routes/Credits.tsx";

function InnerApp() {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
    const [userRole, setUserRole] = React.useState<string>("Patient");
    const navigate = useNavigate();
    const location = useLocation();

    // Track if this is the user's first visit to the site in this session
    const [isFirstVisit, setIsFirstVisit] = React.useState(true);

    // Effect to handle first visit - show waiting screen once
    useEffect(() => {
        // Check if this is the first page load
        const hasVisited = sessionStorage.getItem('hasVisitedBefore');

        if (!hasVisited && isFirstVisit) {
            // First visit - go to waiting screen
            navigate('/waiting');
            setIsFirstVisit(false);
            // Mark that they've visited before during this session
            sessionStorage.setItem('hasVisitedBefore', 'true');
        }
    }, [navigate, isFirstVisit]);

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
        // any user interaction resets the inactivity

        reset(); // start the timer when the page loads

        return () => {
            if(timeoutRef.current) {
                clearTimeout(timeoutRef.current) // clear the timer if component unmounts
            }
            events.forEach(event => window.removeEventListener(event, reset)); // remove event listeners
        }
    }, [location.pathname])

    const PrivateRoutes = () => {
        console.log(isAuthenticated);
        return (
            isLoading || isAuthenticated ? <Outlet/> : <Navigate to='/'/>
        )
    }

    return (
        <div className='min-h-screen'>
            {location.pathname !== '/waiting' && (
                <NavBar userRole={userRole} setUserRole={setUserRole} />
            )}
            <Routes>
                <Route path='/waiting' element={<WaitingScreen />} />
                <Route path='/' element={<WelcomePage />} />
                <Route path="/navigation" element={<NavigationPage />} />
                <Route path="/directory" element={<BryanDirectoryPage />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/credits" element={<Credits />} />
                <Route element={<PrivateRoutes />}>
                    <Route path="/services" element={<ServiceRequestPage />} />
                    <Route path="/admin/directory" element={<DirectoryPage />} />
                    <Route path="/editor" element={<MapEditor onMapReady={() => { }} />} />
                    <Route path="requests" element={<RequestPage />}>
                        <Route index element={<Navigate to="table" replace />} />
                        <Route path="table" element={<RequestTablePage userRole={userRole}/>} />
                        <Route path="list" element={<RequestListPage userRole={userRole}/>} />
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
