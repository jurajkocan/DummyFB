export namespace User {
    export interface ILoginUser {
        token: string;
    }

    export interface IUser {
        id: number;
        email: string;
        name: string;
        phone: string;
        website: string;

        imageUrl: string;
        isConnected: boolean;

        address: {
            street: string;
            suite: string;
            city: string;
            zipcode: string;
            geo: {
                lat: string;
                lng: string;
            };
        };

        company: {
            name: string;
            catchPhrase: string;
            bs: string;
        };
    }
}

export namespace Post {
    export interface IPost {
        text: string;
        createdByName: string;
        createdById: number;
    }
}
