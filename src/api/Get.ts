import { User as UserResponse } from "./interfaces/Response";
import { getUser as GetUserFromDb } from "../database/query/User";

export const GetUser = async (
    id?: number,
    email?: string
): Promise<UserResponse.IUser> => {
    return await GetUserFromDb(id, email);
};
