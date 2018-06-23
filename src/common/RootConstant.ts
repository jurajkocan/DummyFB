export type rootName = 'userProfile' | 'listUsers';

export interface IRootDescription {
    rootName: rootName,
    rootUrl: string
}

export const profileRoot: IRootDescription = {
    rootName: 'userProfile',
    rootUrl: '/profile'
}

export const listUsersRoot: IRootDescription = {
    rootName: 'listUsers',
    rootUrl: '/users'
}

