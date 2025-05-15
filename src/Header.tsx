import {useAuth0} from "@auth0/auth0-react";

interface HeaderProps {
    previewUrl: string;
}

export default function Header({previewUrl}: HeaderProps) {
    const {
        logout,
    } = useAuth0();

    return (
        <header className="px-8 flex items-center justify-between py-4 md:py-8">
            <div className="inline-flex items-center gap-3 text-2xl font-bold md:text-3xl" aria-label="logo">
                <><span>🤯</span> Jstl.ink Creator</>
            </div>
            <div className="gap-2 flex">
                {previewUrl &&
                    <a href={"https://jstl.ink.paulus.rocks/" + previewUrl} target="_blank" className="bg-slate-700 rounded-lg px-4 py-2">
                        Preview
                    </a>
                }
                <button className="bg-slate-800 rounded-lg px-4 py-2" onClick={() => logout({logoutParams: {returnTo: window.location.origin}})}>
                    Logout
                </button>
            </div>
        </header>
    )
}