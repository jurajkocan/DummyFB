import { Request } from "express";
import { DbUser } from "../database/schema/DbUser";
import { PageSettingsType } from "../frontend/redux/State";
import { rootUrl } from "../common/RootConstant";

export const getPageSettings = (
    req: Request,
    user: DbUser
): PageSettingsType => {
    switch (req.path as rootUrl) {
        case "/profile":
            const userId = req.query.userId as number;
            if (userId) {
                return {
                    findUser: {},
                    userProfile: {
                        userId: userId
                    }
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
        userProfile: {
            userId: user.id
        }
    };
};

export const isEmpty = (obj: object) => {
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
};
