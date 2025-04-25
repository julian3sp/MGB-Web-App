import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/mainStyles.css';
import { Auth0Provider } from '@auth0/auth0-react';

const authDomain= import.meta.env.VITE_PUBLIC_AUTH0_DOMAIN;
const authClientID= import.meta.env.VITE_PUBLIC_AUTH0_CLIENT_ID;


// Entry point where root component is rendered into the DOM
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <React.StrictMode>
            <Auth0Provider
                domain={authDomain || ""}
                clientId={authClientID || ""}
                authorizationParams={{
                    redirect_uri: window.location.origin
                }}
            >
                <App />
            </Auth0Provider>
        </React.StrictMode>
);
