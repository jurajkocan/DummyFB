import { User as UserResponse } from '../../api/interfaces/Response'

export const GetUser = async (id?: number, email?: string): Promise<UserResponse.IUser> => {
    // TODO: get user from db?? maybe from constant file
    if (id) {
        return {
            id: 1,
            email: 'test',
        }
    }
    else if (email) {
        return {
            id: 1,
            email: 'test',
        }
    }
    else {
        throw ('get user require id or email as parameter');
    }
}
