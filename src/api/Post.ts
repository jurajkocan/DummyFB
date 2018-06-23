import { User as UserResponse } from './interfaces/Response';
import { generateToken } from '../jwt/JwtHanddler';
import { getFilteredUsers } from '../server/user/UserController';

export const LoginUser = async (email: string, password: string): Promise<UserResponse.ILoginUser> => {
    return {
        token: generateToken({ email: email })
    }
}

export const GetFilteredUsers = async (page: number, pageSize: number, searchText: string): Promise<UserResponse.IUser[]> => {
    const users = getFilteredUsers(page, pageSize, searchText);
    return users;
}
