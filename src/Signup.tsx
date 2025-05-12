import {User} from "@auth0/auth0-react";
import {CreatorApi, PageApi} from "./sdk";
import {useState} from "react";

interface SignupProps {
    authenticatedApi: CreatorApi,
    setSignup: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    userId: string
}

export default function Signup({authenticatedApi, setSignup, userId}: SignupProps) {
    const signUp = () =>
        authenticatedApi.createPage({
            body: {
                id: userId,
                handle: handle
            }
        }).then(() => setSignup(false)).catch(() => setError(true));

    const [handle, setHandle] = useState('');
    const [error, setError] = useState(false);

    return (
        <>
            <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-2xl">
                <h1 className="text-2xl font-semibold text-center mb-6">
                    Sign Up for Your Page
                </h1>
                <label className="block text-sm font-medium text-gray-700 mb-1">Choose your handle</label>
                <input
                    type="text"
                    placeholder="e.g. NotAFisch"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                />
                <button
                    onClick={() => signUp()}
                    className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-50 transition transform disabled:hover:scale-100"
                >
                    Next
                </button>
                {error &&
                    <p className="block text-sm font-medium text-red-600 mt-1">Handle already exists - please choose
                        something else</p>}
            </div>
        </>
    )
}