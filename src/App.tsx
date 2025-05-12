import '@mantine/core/styles.css';
import {useAuth0} from "@auth0/auth0-react";
import Creator from "./Creator.tsx";
import {useEffect, useState} from "react";
import Signup from "./Signup.tsx";
import {Configuration, CreatorApi, PageApi} from "./sdk";

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
    const [userId, setUserId] = useState("");
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        if(isAuthenticated){
            getIdTokenClaims().then(value => {
                setUserId(value.sub.split("|")[1])
                setSignup(value.signup)
            });
            getAccessTokenSilently().then(value => setAccessToken(value)).catch(error => console.log("error getting token",error));
        }

        console.log(userId, accessToken);
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
                    Authorization: 'Bearer '+accessToken
                },
                basePath: 'https://api.jstl.ink.paulus.rocks'
            }));

        return (
            signup ?
                <Signup userId={userId} authenticatedApi={creatorApi} setSignup={setSignup}/> :
                <div className="flex flex-col">
                    <nav>
                        <button onClick={() => logout({logoutParams: {returnTo: window.location.origin}})}>
                            Log out
                        </button>
                    </nav>
                    <Creator authenticatedApi={creatorApi} user={user} userId={userId}/>
                </div>
        );
    } else {
        loginWithRedirect()
    }
}