import { User as UserResponse } from "../../api/interfaces/Response";

export type PageSettings = {
    findUser: {};
    userProfile: UserResponse.IUser;
};

export type PageSettingsType = { [R in keyof PageSettings]: PageSettings[R] };

export interface ReduxState {
    user: {
        userToken: string;
    } & UserResponse.IUser;
    pages: PageSettingsType;
}

export const defaultAppState = <ReduxState>{};

export const getDefaultAppState = (
    token: string,
    user: UserResponse.IUser,
    pages: PageSettingsType
): ReduxState => {
    return {
        user: {
            ...user,
            userToken: token
        },
        pages: pages
    };
};
