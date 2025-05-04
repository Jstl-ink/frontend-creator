import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Auth0Provider} from '@auth0/auth0-react';
import {MantineProvider} from '@mantine/core';


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Auth0Provider
            domain="dev-wytn16b0qo3jiulg.us.auth0.com"
            clientId="6mfsMp7uCCcpGVdRgjk6nhjcSQyNbnf6"
            authorizationParams={{
                redirect_uri: window.location + "/creator",
            }}
            cacheLocation="localstorage"
            useRefreshTokens={true}
        >
            <MantineProvider>
                <App/>
            </MantineProvider>
        </Auth0Provider>
    </StrictMode>,
)
