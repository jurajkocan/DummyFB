export namespace User {
    export interface ILoginUser {
        token: string
    }

    // TODO: bad user declaration position
    export interface IUser {
        id: number,
        email: string
    }
}
