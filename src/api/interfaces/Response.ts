export namespace User {
    export interface ILoginUser {
        token: string
    }

    export interface IUser {
        id: number,
        email: string,
        name: string
    }
}
