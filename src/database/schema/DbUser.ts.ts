export interface DbUser {
    id: number,
    name: string,
    email: string,
    address: DbAddress,
    phone: string,
    website: string,
    company: DbCompany,

    imageUrl: string,
    isConnected: boolean,
}

export interface DbAddress {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
        lat: string,
        lng: string
    }
}

export interface DbCompany {
    name: string,
    catchPhrase: string,
    bs: string
}
