import {useEffect, useState} from "react";
import {Configuration, CreatorApi, Link, Page, PageApi} from "./sdk";
import {User} from "@auth0/auth0-react";

interface CreatorProps {
    authenticatedApi: CreatorApi,
    user: User
}

export default function Creator({authenticatedApi, user}: CreatorProps) {
    const [page, setPage] = useState<Page>();

    useEffect(() => {
        const pageApi = new PageApi();
        pageApi.getPageById({pageId: user?.email}).then(value => setPage(value));
    }, [])

    const createLink = (link: Link) =>
        authenticatedApi.createLinkByPageId({pageId: page.id, body: link})

    const updateSocialLink = (link: Link) =>
        authenticatedApi.updateSocialLinkByPageId({pageId: page.id, body: link})

    const updatePage = (page: Page) =>
        authenticatedApi.updatePageByPageId({pageId: page.id, body: page})


    return (
        <>
            {/* TODO
                Inputfelder für diese attribute machen (updatePage verwenden):
                - name
                - bio
                - description

                die inputfelder für socialLinks sollen vorgegeben sein (updateSocialLink verwenden):
                - instagram
                - twitter
                - threads
                - facebook
                - mail

                für sonstige links sollen alle links mit ihren werten (also name & link) aufgelistet
                sein und immer ein leerer input für name & link bereit stehen (sobald befüllt und fokus weg
                createLink verwenden)

                generell sollen die input felder ihre aktuellen werte haben

                struktur in etwa wie beim anzeigen der jstl.ink seite also:
                label: name
                input: <aktueller name>
                ...
                label: instagram
                input: <aktueller insta link>
                ...
                input: mein custom link
                input: <aktueller link von "mein custom link>
                ...

                wenn der fokus auf ein input feld verloren geht soll dann immer der request ans backend stattfinden
            */}
            Creator {page?.name}
        </>
    )
}