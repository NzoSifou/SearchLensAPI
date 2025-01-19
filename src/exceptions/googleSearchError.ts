import {SearchLensError} from "./searchLensError";

export class GoogleSearchError extends SearchLensError {
    constructor(message: string, statusCode: number = 500) {
        super(`Google Search API error: ${message}`, statusCode);
    }
}