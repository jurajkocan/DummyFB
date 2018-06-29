import { User as UserRequest, Post as PostRequest } from "./Request";
import { User as UserResponse, Post as PostResponse } from "./Response";

export declare type ApiRoutes = {
    "/api/v1/user/login": {
        type: "POST";
        payload: UserRequest.ILoginUser;
        response: UserResponse.ILoginUser;
    };

    "/api/v1/user/filtered": {
        type: "POST";
        payload: UserRequest.FilteredUser;
        response: UserResponse.IUser[];
    };
    "/api/v1/post/filtered": {
        type: "POST";
        payload: PostRequest.FilteredPosts;
        response: PostResponse.IPost[];
    };
};
