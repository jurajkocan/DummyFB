import { DbUser } from "../schema/DbUser";
import { isEmpty } from "../../server/Utils";
import axios from "axios";

// should be db but i am not going to create custom db for it
// using api as db

export const getUser = async (id?: number, email?: string): Promise<DbUser> => {
    if (id) {
        return await getUserById(id);
    } else if (email) {
        return getUserByEmail(email);
    } else {
        throw "id or email parameter has to be provided";
    }
};

export const getAllUsers = async (): Promise<DbUser[]> => {
    const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users/"
    );
    const users = response.data as DbUser[];
    return fakeData(users) as DbUser[];
};

const getUserById = async (id: number): Promise<DbUser> => {
    const data = "/" + id;
    return await getUserFromDb(data);
};

const getUserByEmail = async (email: string): Promise<DbUser> => {
    const data = "?email=" + email;
    return await getUserFromDb(data);
};

const getUserFromDb = async (data?: any): Promise<DbUser> => {
    try {
        const response = await axios.get(
            "https://jsonplaceholder.typicode.com/users" + data
        );
        let user;
        if (Array.isArray(response.data)) {
            if (Object.keys(response.data).length === 0)
                throw `no user with parameters: ${data}`;

            user = response.data[0] as DbUser;
        } else {
            if (isEmpty(response.data))
                throw `no user with parameters: ${data}`;

            user = response.data as DbUser;
        }

        return fakeData(user) as DbUser;
    } catch (e) {
        throw `error in db, error: ${e}`;
    }
};

// fake user data (image and connection)
const fakeData = (user: DbUser | DbUser[]) => {
    const addDataToUser = (userToExtend: DbUser) => {
        const randomBool = Math.floor(Math.random() * 2) === 0 ? false : true;
        const extendedUSer: DbUser = {
            ...userToExtend,
            imageUrl:
                "https://randomuser.me/api/portraits/women/" +
                userToExtend.id +
                ".jpg",
            isConnected: randomBool
        };

        return extendedUSer;
    };

    if (Array.isArray(user)) {
        return user.map(u => {
            return addDataToUser(u);
        });
    } else {
        return addDataToUser(user);
    }
};
