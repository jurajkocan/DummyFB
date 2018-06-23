import { DbUser } from '../schema/DbUser.ts';
import axios from 'axios';

// should be db but i am not going to create custom db for it
// using api as db

export const GetUser = async (id?: number, email?: string): Promise<DbUser> => {
    if (id) {
        return await getUserById(id);
    }
    else if (email) {
        return getUserByEmail(email);
    }
    else {
        return getUser();
    }
}

const getUserById = async (id: number): Promise<DbUser> => {
    const data = '/' + id;
    return getUser(data);
}

const getUserByEmail = async (email: string): Promise<DbUser> => {
    const data = '?email=' + email;
    return getUser(data);
}

const getUser = async (data?: any): Promise<DbUser> => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users/' + data);
        if (Object.keys(response.data).length === 0)
            throw (`no user with parameters: ${data}`);

        const user = response.data[0] as DbUser;
        return user;
    }
    catch (e) {
        throw (`error in db, error: ${e}`);
    }
}
