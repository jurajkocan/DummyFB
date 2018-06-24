import { GetAllUsers } from '../../database/query/User';
import { DbUser } from '../../database/schema/DbUser.ts';

export const getFilteredUsers = async (page: number, pageSize: number, searchText: string) => {
    console.log(page, pageSize);
    const allUsers = await GetAllUsers();
    console.log('lenght: ', allUsers.length)
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
