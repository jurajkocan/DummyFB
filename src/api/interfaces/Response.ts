export namespace User {
    export interface ILoginUser {
        token: string
    }

    export interface IUser {
        id: number,
        email: string,
        name: string,
        imageUrl: string,
        isConnected: boolean
    }
}

export namespace Post {
    export interface IPost {
        text: string,
        createdByName: string,
        createdById: number
    }
}
