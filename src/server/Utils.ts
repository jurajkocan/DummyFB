import { Request } from "express";
import { DbUser } from "../database/schema/DbUser";
import { PageSettingsType } from "../frontend/redux/State";
import { rootUrl } from "../common/RootConstant";
import { getUser } from "../database/query/User";

export const getPageSettings = async (
    req: Request,
    user: DbUser
): Promise<PageSettingsType> => {
    switch (req.path as rootUrl) {
        case "/profile":
            const userId = req.query.userId as number;
            if (userId) {
                return {
                    findUser: {},
                    userProfile: await getUser(userId)
                };
            }
            break;
        case "/users":
            break;
        default:
            break;
    }
    return {
        findUser: {},
        userProfile: await await getUser(user.id)
    };
};

export const isEmpty = (obj: object) => {
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
};
