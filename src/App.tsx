import {useAuth0} from "@auth0/auth0-react";
import Creator from "./Creator.tsx";
import {useEffect, useState} from "react";
import Signup from "./Signup.tsx";
import {Configuration, CreatorApi, PageApi} from "./sdk";
import Loader from "./Loader.tsx";

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
    const [isSignupStatusVerified, setIsSignupStatusVerified] = useState(false);
    const [userId, setUserId] = useState("");
    const [creatorApi, setCreatorApi] = useState<CreatorApi>();

    useEffect(() => {
        if (isAuthenticated) {
            getIdTokenClaims().then(value => {
                setUserId(value.sub.split("|")[1])
                setSignup(value.signup)
            });
            getAccessTokenSilently().then(value => {
                setCreatorApi(new CreatorApi(
                    new Configuration({
                        headers: {
                            Authorization: 'Bearer ' + value
                        },
                        basePath: 'https://api.jstl.ink.paulus.rocks'
                    })));
            }).catch(error => console.log("error getting token", error));
        }
    }, [isAuthenticated])

    useEffect(() => {
        if (creatorApi) {
            creatorApi.getCreatorPageById({pageId: userId})
                .then((page) => setSignup(!page?.id))
                .catch(err => console.log(err))
                .finally(() => setIsSignupStatusVerified(true));
        }
    }, [creatorApi]);

    if (isLoading) {
        return <Loader/>;
    }
    if (error) {
        return <div>Oops... {error.message}</div>;
    }

    if (isAuthenticated) {
        if (!isSignupStatusVerified) {
            return <Loader/>;
        }

        return (
            signup ?
                <Signup userId={userId} authenticatedApi={creatorApi} setSignup={setSignup}/> :
                <div className="flex flex-col">
                    <Creator authenticatedApi={creatorApi} user={user} userId={userId}/>
                </div>
        );
    } else {
        loginWithRedirect()
    }
}