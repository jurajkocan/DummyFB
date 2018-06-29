export type rootName = "userProfile" | "listUsers";
export type rootUrl = "/profile" | "/users";

export interface IRootDescription {
    rootName: rootName;
    rootUrl: rootUrl;
}

export const profileRoot: IRootDescription = {
    rootName: "userProfile",
    rootUrl: "/profile"
};

export const listUsersRoot: IRootDescription = {
    rootName: "listUsers",
    rootUrl: "/users"
};
