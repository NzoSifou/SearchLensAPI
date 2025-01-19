import {SearchLensError} from "./searchLensError";

export class MissingEnvironmentVariableError extends SearchLensError {
    constructor(variableName: string) {
        super(`Missing required environment variable: ${variableName}`, 400);
    }
}
