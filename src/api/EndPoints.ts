import { ApiRoutes } from "./interfaces/ApiRoutes";
import { User as UserRequest, Post as PostRequest } from './interfaces/Request';
import { LoginUser, GetFilteredUsers, GetFilteredPosts } from "./Post";
import { Request } from 'express-serve-static-core';

export type Endpoints = {
    [R in keyof ApiRoutes]: (req: Request, payload: ApiRoutes[R]['payload']) => Promise<ApiRoutes[R]['response']>
}

export const EndpointsV1: Endpoints = {
    // POST
    '/api/v1/user/login': (req: Request, payload: UserRequest.ILoginUser) => {
        return LoginUser(payload.email, payload.password);
    },
    '/api/v1/user/filtered': (req: Request, payload: UserRequest.FilteredUser) => {
        return GetFilteredUsers(payload.page, payload.pageSize, payload.searchText);
    },
    '/api/v1/post/filtered': (req: Request, payload: PostRequest.FilteredPosts) => {
        return GetFilteredPosts(payload.userId, payload.page, payload.pageSize);
    }
}
