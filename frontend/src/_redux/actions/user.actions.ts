import { FetchUserRequest, UserTypes } from '../types';

export const fetchUser = (): FetchUserRequest => ({
    type: UserTypes.FETCH_USER,
});
