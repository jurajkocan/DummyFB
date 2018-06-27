import { getAllUsers } from '../../database/query/User';
import { getPosts } from '../../database/query/Post';
import { DbUser } from '../../database/schema/DbUser';

export const getFilteredUsers = async (page: number, pageSize: number, searchText: string) => {
    const allUsers = await getAllUsers();
    const filteredUsers = allUsers.filter((user: DbUser) => {
        // TODO: add some better full text search
        if (searchText && searchText !== '') {
            return (user.email.includes(searchText) || user.name.includes(searchText)
                || user.phone.includes(searchText) || user.website.includes(searchText)
            );
        }
        return user;
    });

    const from = page * pageSize;
    const to = from + pageSize;

    return filteredUsers.slice(from, to);
}

export const getFilteredUserPosts = async (userId: number, page: number, pageSize: number) => {
    const posts = await getPosts(undefined, userId);
    const from = page * pageSize;
    const to = from + pageSize;
    return posts.slice(from, to);
}
