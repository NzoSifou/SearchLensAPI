import axios from 'axios';
import { Response } from 'express';
import {ImageDownloadError} from "../exceptions/imageDownloadError";

/**
 * Downloads an image from a URL and returns it to the client.
 * @param imageUrl Image URL.
 * @param res Express response object.
 */
export const downloadImage = async (imageUrl: string, res: Response): Promise<void> => {
    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        res.setHeader('Content-Type', 'image/png');
        res.send(response.data);
    } catch (error: any) {
        throw new ImageDownloadError(error.message || 'Unable to download image.');
    }
};