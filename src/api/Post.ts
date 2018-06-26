import { User as UserResponse, Post as PostResponse } from './interfaces/Response';
import { generateToken } from '../jwt/JwtHanddler';
import { getFilteredUsers } from '../server/user/UserController';
import { getPosts } from '../database/query/Post';

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
    const posts = getPosts(undefined, userId);
    console.log(posts);
    // TODO: add some emails from api or something like this
    return posts.map((post) => {
        return {
            text: post,
            createdByName: 'some name',
            createdById: 999
        }
    });
}
