import {SearchLensError} from "./searchLensError";

export class ImageDownloadError extends SearchLensError {
    constructor(message: string, statusCode: number = 500) {
        super(`Image download error: ${message}`, statusCode);
    }
}
