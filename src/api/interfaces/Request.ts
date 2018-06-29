export namespace User {
    export interface ILoginUser {
        email: string;
        password: string;
    }

    export interface FilteredUser {
        page: number;
        pageSize: number;
        searchText: string;
    }
}

export namespace Post {
    export interface FilteredPosts {
        page: number;
        pageSize: number;
        userId: number;
    }

    export interface CreatePost {
        text: string;
        userId: number;
    }
}
