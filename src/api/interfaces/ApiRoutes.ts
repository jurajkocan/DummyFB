import { User as UserRequest } from './Request';
import { User as UserResponse } from './Response';

export declare type ApiRoutes = {
    '/api/v1/user/login': {
        type: 'POST';
        payload: UserRequest.ILoginUser;
        response: UserResponse.ILoginUser;
    },

    '/api/v1/user/filtered': {
        type: 'POST',
        payload: UserRequest.FilteredUser,
        response: UserResponse.IUser[]
    }
};
