import axios from "axios";

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const UNSPLASH_BASE_URL = "https://api.unsplash.com";

interface UnsplashImage {
    id: string;
    urls: {
        thumb: string;
        regular: string;
        full: string;
    };
    alt_description?: string;
}

export const UnsplashService = {
    async getRandomPhotos(count: number): Promise<UnsplashImage[]> {
        try {
            const response = await axios.get(`${UNSPLASH_BASE_URL}/photos/random`, {
                params: { count },
                headers: {
                    Authorization: `Client-ID ${ACCESS_KEY}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching random photos:", error);
            throw new Error("Failed to load random photos");
        }
    },

    async searchPhotos(query: string, count: number): Promise<UnsplashImage[]> {
        try {
            if (!query.trim()) {
                return this.getRandomPhotos(count);
            }

            const response = await axios.get(`${UNSPLASH_BASE_URL}/search/photos`, {
                params: {
                    query,
                    per_page: count,
                },
                headers: {
                    Authorization: `Client-ID ${ACCESS_KEY}`,
                },
            });
            return response.data.results;
        } catch (error) {
            console.error("Error searching photos:", error);
            throw new Error("Search failed");
        }
    }
};

export default UnsplashService;
