import { createAuthManager, createUserManager } from '../../../di/api-client';
import { Forbidden } from '../../api';
import { AccessTokenKey, createStorage } from '../../storage';
import { userSlice } from '../slice/user';
import { AppDispatch } from '../store';

const refresh = async () => {
    const manager = await createAuthManager();
    return await manager.refresh();
};

const getUser = async () => {
    const manager = await createUserManager();
    return await manager.get();
};

export const fetchUser = () => async (dispatch: AppDispatch) => {
    try {
        const res = await getUser();
        dispatch(userSlice.actions.SET_USER(res.user));
    } catch (e) {
        console.error(e)
        if (e instanceof Forbidden) {
            const res = await refresh();
            createStorage().setItem(AccessTokenKey, res.access_token);
            dispatch(fetchUser())
        } else if (e instanceof Error) {
            location.replace("/auth/login")
        }
    }
};
