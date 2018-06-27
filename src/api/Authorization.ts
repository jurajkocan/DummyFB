import { Request } from 'express';
import { validateToken } from '../jwt/JwtHanddler'
import { UserJwtPayload } from './interfaces/Common';

type errorMessage = 'token validated successfully' | 'invalid token' | 'token schema not supported' | 'auth header is missing';
export const authenticated = async (req: Request): Promise<[UserJwtPayload, errorMessage] | [null, errorMessage]> => {
    const authHeader = req.header('Authorization');
    if (authHeader) {
        const [schema, token] = authHeader.split(' ');
        if (schema !== 'Bearer') {
            return [null, 'token schema not supported'];
        }
        const payload = validateToken(token) as UserJwtPayload;
        if (payload) {
            return [payload, 'token validated successfully']
        }
        return [null, 'invalid token'];
    }
    return [null, 'auth header is missing'];
}

