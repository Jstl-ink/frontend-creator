import '@mantine/core/styles.css';
import {useAuth0} from "@auth0/auth0-react";
import Creator from "./Creator.tsx";
import {useEffect, useState} from "react";
import Signup from "./Signup.tsx";
import {Configuration, CreatorApi} from "./sdk";

export default function App() {
    const {
        isLoading,
        isAuthenticated,
        error,
        user,
        getAccessTokenSilently,
        loginWithRedirect,
        logout,
        getIdTokenClaims
    } =
        useAuth0();
    const [signup, setSignup] = useState(true);

    useEffect(() => {
        getIdTokenClaims().then(value => setSignup(value.signup));
    }, [isAuthenticated])

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Oops... {error.message}</div>;
    }

    if (isAuthenticated) {
        const creatorApi = new CreatorApi(
            new Configuration({
                headers: {
                    Authorization: `Bearer ${getAccessTokenSilently().then(value => value)}`
                },
                basePath: 'https://api.jstl.ink.paulus.rocks'
            }));

        return (
            signup ?
                <Signup user={user} authenticatedApi={creatorApi} setSignup={setSignup} /> :
                <div className="flex flex-col">
                    <nav>
                        <button onClick={() => logout({logoutParams: {returnTo: window.location.origin}})}>
                            Log out
                        </button>
                    </nav>
                    <Creator authenticatedApi={creatorApi} user={user} />
                </div>
        );
    } else {
        loginWithRedirect()
    }
}