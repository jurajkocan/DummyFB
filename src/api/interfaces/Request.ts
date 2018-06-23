export namespace User {
    export interface ILoginUser {
        email: string,
        password: string
    }

    export interface FilteredUser {
        page: number,
        pageSize: number,
        searchText: string
    }
}
