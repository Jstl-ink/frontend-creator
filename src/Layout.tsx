import Header from "./Header.tsx";
import App from "./App.tsx";
import {Auth0Provider} from "@auth0/auth0-react";
import {useState} from "react";
import {MantineProvider} from "@mantine/core";

export default function Layout() {
    const [previewUrl, setPreviewUrl] = useState("");

    return (
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
            <MantineProvider>
                <main className="bg-black text-white">
                    <Header previewUrl={previewUrl}/>
                    <App setPreviewUrl={setPreviewUrl}/>
                </main>
            </MantineProvider>
        </Auth0Provider>
    )
}