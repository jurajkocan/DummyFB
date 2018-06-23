import { User } from '../../api/interfaces/Response';
export interface ReduxState {
    user: {
        userToken: string
    } & User.IUser
}

export const defaultAppState = <ReduxState>{

}

export const getDefaultAppState = (token: string, user: User.IUser): ReduxState => {
    return {
        user: {
            ...user,
            userToken: token
        }
    }
}
