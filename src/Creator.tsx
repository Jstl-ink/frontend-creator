import {useEffect, useState} from "react";
import {Configuration, CreatorApi, Link, Page, PageApi} from "./sdk";
import {useAuth0, User} from "@auth0/auth0-react";
import UnsplashService from "./services/UnsplashService";

interface CreatorProps {
    authenticatedApi: CreatorApi,
    user: User,
    userId: string
}

export default function Creator({authenticatedApi, user, userId}: CreatorProps) {
    const [page, setPage] = useState<Page>();
    const [profileImages, setProfileImages] = useState<any[]>([]);
    const [selectedImage, setSelectedImage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [customLinks, setCustomLinks] = useState<Link[]>([{} as Link]);
    const [isImageMenuOpen, setIsImageMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchError, setSearchError] = useState("");

    const {logout} = useAuth0();

    useEffect(() => {
        authenticatedApi.getCreatorPageById({pageId: userId}).then(value => {
            setPage(value);
            console.log(value)
            // const socials = ["instagram", "twitter", "threads", "facebook", "mail"];
        });
    }, [user]);

    useEffect(() => {
        if (isImageMenuOpen) {
            loadImages();
        }
    }, [isImageMenuOpen]);

    const loadImages = async (searchQuery = "") => {
        setIsLoading(true);
        setSearchError("");
        try {
            const images = searchQuery
                ? await UnsplashService.searchPhotos(searchQuery, 12)
                : await UnsplashService.getRandomPhotos(12);
            setProfileImages(images);
            if (searchQuery && images.length === 0) {
                setSearchError("No images found. Try a different search term.");
            }
        } catch (error) {
            console.error("Error loading images:", error);
            setSearchError("Failed to load images. Please try again.");
            setProfileImages([]);
        } finally {
            setIsLoading(false);
        }
    };

    const updatePage = (updatedPage: Page) => {
        setPage(updatedPage);
        console.log(authenticatedApi);
        authenticatedApi.updatePageDetailsByPageId({
            pageId: userId,
            body: updatedPage
        }).then(r => console.log(r)).catch(e => console.log(e));
    };

    const handleImageSelect = (imgUrl: string) => {
        setSelectedImage(imgUrl);
        updatePage({...page, img: imgUrl});
        setIsImageMenuOpen(false);
    };

    const deletePage = ()=>{
        authenticatedApi.deletePageByPageId({pageId: userId}).then(()=> logout())
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

            {/* Profile Image Selection */}
            <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                    {page?.img ? (
                        <img
                            src={page.img}
                            alt="Profile"
                            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">No photo</span>
                        </div>
                    )}
                    <button
                        onClick={() => setIsImageMenuOpen(!isImageMenuOpen)}
                        className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition"
                    >
                        {page?.img ? "Change Photo" : "Select Photo"}
                    </button>
                </div>

                <dialog open={isImageMenuOpen} className="translate-x-[10%] backdrop:backdrop-blur-md p-4 rounded-lg max-w-[80%]">
                    <div className="flex items-center gap-2 mb-4">
                        <input
                            type="text"
                            className="border p-2 rounded-lg flex-grow"
                            placeholder="Search Unsplash photos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && loadImages(searchTerm)}
                        />
                        <button
                            onClick={() => loadImages(searchTerm)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                            disabled={isLoading}
                        >
                            {isLoading ? "Searching..." : "Search"}
                        </button>
                    </div>

                    {searchError && (
                        <div className="text-red-500 text-sm mb-4">{searchError}</div>
                    )}

                    {isLoading ? (
                        <div className="flex justify-center py-8">
                            <div
                                className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <>
                            {profileImages.length > 0 ? (
                                <div
                                    className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-96 overflow-y-auto p-2">
                                    {profileImages.map((img) => (
                                        <div
                                            key={img.id}
                                            className={`relative cursor-pointer rounded-lg overflow-hidden aspect-square ${
                                                selectedImage === img.urls.regular ? "ring-2 ring-blue-500" : ""
                                            }`}
                                            onClick={() => handleImageSelect(img.urls.regular)}
                                        >
                                            <img
                                                src={img.urls.thumb}
                                                alt={img.alt_description || "Unsplash photo"}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                !searchError && (
                                    <div className="text-center py-8 text-gray-500">
                                        No images available
                                    </div>
                                )
                            )}
                        </>
                    )}
                </dialog>
            </div>

            {/* Profile Information */}
            <div className="space-y-6">
                {["name", "bio"].map((field) => (
                    <div key={field}>
                        <label className="block text-sm font-medium capitalize mb-1">
                            {field}
                        </label>
                        <input
                            className="w-full border text-white border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                            value={page?.[field] || ""}
                            onChange={(e) => {
                                setPage({...page, [field]: e.target.value})
                                console.log(page, e.target.value);

                            }}
                            onBlur={() => updatePage(page)}
                        />
                    </div>
                ))}
            </div>

            {/* Social Links Section */}
            <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">Social Links</h2>
                <div className="space-y-4">
                    {["instagram", "twitter", "threads", "facebook"].map((name) => {
                        const link = page?.socialLinks?.find(link => link.name === name) || {name, link: ""};
                        return (
                            <div key={name}>
                                <label className="block text-sm font-medium capitalize mb-1">
                                    {name}
                                </label>
                                <input
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                                    defaultValue={link.link}
                                    onBlur={e => updatePage(
                                        {
                                            ...page,
                                            socialLinks: [...page?.socialLinks, {
                                                name,
                                                link: `https://${name}.com/${e.target.value}`
                                            }]
                                        }
                                    )}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Custom Links Section */}
            <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">Custom Links</h2>
                <div className="space-y-4">
                    {customLinks.map((link, index) => (
                        <div key={index} className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Link name"
                                    value={link.name}
                                    onChange={e => {
                                        const updated = [...customLinks];
                                        updated[index].name = e.target.value;
                                        setCustomLinks(updated);
                                    }}
                                    onBlur={() => {
                                        // if (link.name && link.link) createLink(link);
                                    }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">URL</label>
                                <input
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="https://example.com"
                                    value={link.link}
                                    onChange={e => {
                                        const updated = [...customLinks];
                                        updated[index].link = e.target.value;
                                        setCustomLinks(updated);
                                    }}
                                    onBlur={() => {
                                        if (link.name && link.link) {
                                            updatePage({
                                                ...page,
                                                links: [...page?.links, link]
                                            });
                                        }
                                        if (index === customLinks.length - 1 && link.name && link.link) {
                                            setCustomLinks([...customLinks, {name: "", link: ""}]);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col mt-20">
                <h2 className="text-lg font-semibold mb-4 text-red-600">DANGER ZONE</h2>
                <button onClick={()=> deletePage()} className="bg-red-700 rounded-lg py-2 w-[50%]">DELETE page</button>
            </div>
        </div>
    );
}