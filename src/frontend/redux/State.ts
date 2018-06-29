import { User } from "../../api/interfaces/Response";

export type PageSettings = {
    findUser: {};
    userProfile: {
        userId: number;
    };
};

export type PageSettingsType = { [R in keyof PageSettings]: PageSettings[R] };

export interface ReduxState {
    user: {
        userToken: string;
    } & User.IUser;
    pages: PageSettingsType;
}

export const defaultAppState = <ReduxState>{};

export const getDefaultAppState = (
    token: string,
    user: User.IUser,
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
