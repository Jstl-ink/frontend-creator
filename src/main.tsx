import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Auth0Provider} from '@auth0/auth0-react';
import Header from "./Header.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Auth0Provider
            domain="dev-wytn16b0qo3jiulg.us.auth0.com"
            clientId="6mfsMp7uCCcpGVdRgjk6nhjcSQyNbnf6"
            authorizationParams={{
                redirect_uri: window.location.origin + "/creator",
                audience: "https://api.jstl.ink.paulus.rocks/",
            }}
            cacheLocation="localstorage"
            useRefreshTokens={true}
        >
            <Header/>
            <App/>
        </Auth0Provider>
    </StrictMode>,
)
