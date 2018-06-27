import { User as UserResponse, Post as PostResponse } from './interfaces/Response';
import { generateToken } from '../jwt/JwtHanddler';
import { getFilteredUsers, getFilteredUserPosts } from '../server/user/UserController';
import { getUser } from '../database/query/User';
import { WSAEMSGSIZE } from 'constants';

export const LoginUser = async (email: string, password: string): Promise<UserResponse.ILoginUser> => {
    return {
        token: generateToken({ email: email })
    }
}

export const GetFilteredUsers = async (page: number, pageSize: number, searchText: string): Promise<UserResponse.IUser[]> => {
    const users = getFilteredUsers(page, pageSize, searchText);
    return users;
}

export const GetFilteredPosts = async (userId: number, page: number, pageSize: number): Promise<PostResponse.IPost[]> => {
    const posts = await getFilteredUserPosts(userId, page, pageSize);
    return Promise.all(posts.map(async (post) => {
        const randomId = Math.floor(Math.random() * 10) + 1;
        const createdBy = await getUser(randomId)
        return {
            text: post,
            createdByName: createdBy.name,
            createdById: createdBy.id
        }
    }));
}
