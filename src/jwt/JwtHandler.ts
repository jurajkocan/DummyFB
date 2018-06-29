import * as JWT from "jsonwebtoken";
import { WebConfig } from "../WebConfig";
import { UserJwtPayload } from "../api/interfaces/Common";

export const generateToken = (data: UserJwtPayload) => {
    return JWT.sign(data, WebConfig.JWT.JwtSecret, {
        expiresIn: WebConfig.JWT.JwtExpiration
    });
};

export const validateToken = (token: string) => {
    try {
        const payload = JWT.verify(token, WebConfig.JWT.JwtSecret);
        return payload;
    } catch (err) {
        return null;
    }
};
