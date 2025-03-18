import {useAuth0, User} from "@auth0/auth0-react";
import {CreatorApi} from "./sdk";
import {useEffect, useState} from "react";

interface SignupProps {
    user: User,
    authenticatedApi: CreatorApi,
    setSignup: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

export default function Signup({user, authenticatedApi, setSignup}: SignupProps) {
    const signUp = (pageId: string) =>
        authenticatedApi.createPage({body: {id: pageId}}).then(() => setSignup(false));

    return (
        <>
            Signup
            {/* TODO
                Inputfeld und submit button für pageId machen und onclick signUp() methode aufrufen (pageId ist
                der parameter unter dem man die Jstl.ink seite erreicht also zb https://localhost:5173/real-terminator
            */}
        </>
    )
}