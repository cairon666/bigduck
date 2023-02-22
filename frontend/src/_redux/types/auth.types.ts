export enum authTypes {
    FETCH_LOGIN = 'FETCH_LOGIN',
    FETCH_REGISTER = 'FETCH_REGISTER',
}

export interface FetchLoginRequest {
    type: typeof authTypes.FETCH_LOGIN;
}

export interface FetchRegisterRequest {
    type: typeof authTypes.FETCH_REGISTER;
}

// export type FetchPostsSuccess = {
//     type: typeof postTypes.FETCH_POST_SUCCESS;
//     payload: FetchPostsSuccessPayload;
// };
