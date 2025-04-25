import React, {useState} from 'react';
import './styles/mainStyles.css';
import {BrowserRouter as Router, Routes, Route, Link, Navigate, Outlet} from 'react-router-dom';
import DepartmentDirectory from './routes/departmentDirectory/DepartmentDirectory.tsx';
import ServiceRequestPage from './routes/ServiceRequestPage';
import RequestListPage from './routes/requestDisplay/RequestListPage.tsx'
import {WelcomePage} from './routes/WelcomePage';
import NavBar from './components/NavBar';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {httpBatchLink} from '@trpc/client';
import {trpc} from "./lib/trpc.ts";
import FooterBar from './components/FooterBar';
import DirectoryPage from './routes/departmentDirectory/DirectoryPage.tsx';
import RequestTablePage from './routes/requestDisplay/RequestTablePage.tsx'
import {useAuth0} from "@auth0/auth0-react";
import AboutUs from './routes/AboutUs.tsx';
import NavigationPage from "./routes/NavigationPage.tsx";
import MapEditor from "./components/navigation/pathfinding/MapEditor.tsx";
import RequestPage from "./routes/requestDisplay/RequestPage.tsx";

function App() {
    const [queryClient] = useState(() => new QueryClient());
    const {isAuthenticated, isLoading} = useAuth0();
    const [userRole, setUserRole] = React.useState<string>("Patient");
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: "/trpc"
                }),
            ],
        }),
    );

    const PrivateRoutes = () => {
        console.log(isAuthenticated);
        return (
            isLoading || isAuthenticated ? <Outlet/> : <Navigate to='/'/>
        )
    }

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <div className='min-h-screen'>

                    <NavBar userRole={userRole} setUserRole={setUserRole} />
                    <Routes>
                        <Route path="/navigation" element={<NavigationPage />} />
                        <Route path="/" element={<WelcomePage />} />
                        <Route path="/directory" element={<DepartmentDirectory />} />
                        <Route path="/directory/*" element={<DepartmentDirectory />} />
                        <Route path="/aboutus" element={<AboutUs />} />
                        <Route element={<PrivateRoutes />}>
                            <Route path="/services" element={<ServiceRequestPage />} />
                            <Route path="/admin/directory" element={<DirectoryPage />} />
                            <Route path="/editor" element={<MapEditor onMapReady={() => {}}/>} />
                            <Route path="requests" element={<RequestPage />}>
                                <Route index element={<Navigate to="table" replace />} />
                                <Route path="table" element={<RequestTablePage userRole={userRole}/>} />
                                <Route path="list" element={<RequestListPage userRole={userRole}/>} />
                            </Route>
                        </Route>
                    </Routes>
                    </div>

                    <FooterBar />
                </Router>
            </QueryClientProvider>
        </trpc.Provider>
    );
}

export default App;
