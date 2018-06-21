import { User as UserResponse } from './interfaces/Response'
import { GetUser as GetUserFromDb } from '../database/query/User';

export const GetUser = async (id?: number, email?: string): Promise<UserResponse.IUser> => {
    return GetUser(id, email);
}
