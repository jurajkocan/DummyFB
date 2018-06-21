import { ApiRoutes } from "./interfaces/ApiRoutes";
import { User as UserRequest } from './interfaces/Request';
import { User } from "./interfaces/Response";
import { LoginUser } from "./Post";
import { Request } from 'express-serve-static-core';

export type Endpoints = {
    [R in keyof ApiRoutes]: (req: Request, payload: ApiRoutes[R]['payload']) => Promise<ApiRoutes[R]['response']>
}

export const EndpointsV1: Endpoints = {
    // POST
    '/api/v1/user/login': (req: Request, payload: UserRequest.ILoginUser) => {
        return LoginUser(payload.email, payload.password);
    },
}
