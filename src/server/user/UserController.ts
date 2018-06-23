import { GetAllUsers } from '../../database/query/User';

export const getFilteredUsers = async (page: number, pageSize: number, searchText: string) => {
    // TODO: handle page ect..
    const allUsers = await GetAllUsers();
    return allUsers;
}
