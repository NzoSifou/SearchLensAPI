import { MissingEnvironmentVariableError } from '../exceptions/missingEnvironmentVariableError';

export const validateEnv = (variables: string[]): void => {
    variables.forEach((variable) => {
        if (!process.env[variable]) {
            throw new MissingEnvironmentVariableError(variable);
        }
    });
};