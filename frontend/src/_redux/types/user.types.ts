export enum UserTypes {
    FETCH_USER = 'FETCH_USER',
}

export interface FetchUserRequest {
    type: typeof UserTypes.FETCH_USER;
}
