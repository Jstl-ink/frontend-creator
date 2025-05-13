import {CreatorApi} from "./sdk";
import {useState} from "react";
import {IconChevronRight} from '@tabler/icons-react';


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
            <div className="max-w-md mx-auto p-6 shadow-xl rounded-2xl">
                <h1 className="text-2xl font-semibold mb-6">
                    Sign Up for your Jstl.ink page
                </h1>
                <div className="">
                    <label className="block text-sm font-medium mb-1">Choose your handle</label>
                    <div className="flex justify-between gap-2">
                        <input
                            type="text"
                            placeholder="e.g. CaptainObviousness"
                            value={handle}
                            onChange={(e) => setHandle(e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                        />
                        <button
                            onClick={() => signUp()}
                            className="px-6 py-2 rounded-xl bg-slate-800 text-white font-medium hover:bg-slate-700 disabled:opacity-50 transition transform disabled:hover:scale-100"
                        >
                            Next
                        </button>
                    </div>
                    {error &&
                        <p className="block text-sm font-medium text-red-600 mt-1">Handle already exists - please choose
                            something else</p>}
                </div>
            </div>
        </>
    )
}