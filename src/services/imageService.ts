import axios from 'axios';
import { GoogleSearchError } from '../exceptions/googleSearchError';
import { validateEnv } from '../utils/validateEnv';

validateEnv(['GOOGLE_API_KEY', 'GOOGLE_CX_ID']);

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY!;
const GOOGLE_CX_ID = process.env.GOOGLE_CX_ID!;

/**
 * Search for an image with Google Custom Search API.
 * @param query Search query.
 * @returns URL of the image found.
 */
export const searchImage = async (query: string): Promise<string | null> => {
    const url = `https://customsearch.googleapis.com/customsearch/v1`;
    try {
        const response = await axios.get(url, {
            params: {
                key: GOOGLE_API_KEY,
                cx: GOOGLE_CX_ID,
                searchType: 'image',
                q: query,
                fileType: 'png',
                num: 1
            },
        });

        const items = response.data.items;
        if (items && items.length > 0) {
            return items[0].link;
        }
        return null;
    } catch (error: any) {
        throw new GoogleSearchError(error.message ?? 'Unknown error occurred');
    }
};