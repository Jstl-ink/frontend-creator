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

    const [page, setPage] = useState<Page>();
    const [pageId, setPageId] = useState('');


    useEffect(() => {
        pageApi.getPageById({pageId: userId}).then((page) => setPage(page)).catch(() => console.error("Error getting page"));
    }, []);

    useEffect(() => {
        console.log(page)

    }, [page]);

    return (
        <>
            {/* TODO
                Inputfeld und submit button für pageId machen und onclick signUp() methode aufrufen (pageId ist
                der parameter unter dem man die Jstl.ink seite erreicht also zb https://localhost:5173/real-terminator
            */}
            <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-2xl">
                <h1 className="text-2xl font-semibold text-center mb-6">
                    Sign Up for Your Page
                </h1>
                <label className="block text-sm font-medium text-gray-700 mb-1">Choose your handle</label>
                <input
                        type="text"
                        placeholder="e.g. NotAFisch"
                        value={pageId}
                        onChange={(e) => setPageId(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                    />
                    <button
                        onClick={() => signUp(pageId)}
                        className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-50 transition transform disabled:hover:scale-100"
                    >
                        Next
                    </button>
                {/*<p className="block text-sm font-medium text-gray-700 mt-1">Note this cannot be changed afterwards</p>*/}
            </div>
        </>
    )
}