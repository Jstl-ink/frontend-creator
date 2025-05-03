import {useAuth0, User} from "@auth0/auth0-react";
import {CreatorApi, Page, PageApi} from "./sdk";
import {useEffect, useState} from "react";

interface SignupProps {
    user: User,
    authenticatedApi: CreatorApi,
    setSignup: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    pageApi: PageApi,
    userId: string
}

export default function Signup({user, authenticatedApi, setSignup, pageApi, userId}: SignupProps) {
    const signUp = (pageId: string) =>
        authenticatedApi.createPage({body: {id: pageId}}).then(() => setSignup(false));
    const {
        isLoading,
        isAuthenticated,
        error,
        getAccessTokenSilently,
        loginWithRedirect,
        logout,
        getIdTokenClaims
    } =
        useAuth0();
    const [page, setPage] = useState<Page>();

    useEffect(() => {
        pageApi.getPageById({pageId: userId}).then((page) => setPage(page)).catch(() => console.error("Error getting page"));
    }, []);

    useEffect(() => {
        console.log(page)

    }, [page]);

    return (
        <>
            Signup
            {/* TODO
                Inputfeld und submit button für pageId machen und onclick signUp() methode aufrufen (pageId ist
                der parameter unter dem man die Jstl.ink seite erreicht also zb https://localhost:5173/real-terminator
            */}
            <button onClick={() => logout({logoutParams: {returnTo: window.location.origin}})}>
                Log out
            </button>
        </>
    )
}