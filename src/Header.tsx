import {useAuth0} from "@auth0/auth0-react";

export default function Header() {
    const {
        logout,
    } = useAuth0();

    return (
        <header className="px-8 flex items-center justify-between py-4 md:py-8">
            <a href="/" className="inline-flex items-center gap-3 text-2xl font-bold md:text-3xl" aria-label="logo">
                <><span>🤯</span> Jstl.ink Creator</>
            </a>
            <button className="bg-slate-800 rounded-lg px-4 py-2" onClick={() => logout()}>
                Logout
            </button>
        </header>
    )
}