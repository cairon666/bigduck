import { useQuery } from 'react-query';
import { UserService } from '@shared/api/UserService';
import { __DEV__ } from '@shared/const';
import { sleep } from '@shared/lib/async';
import routeHistory, { routerPaths } from '@shared/routeHistory';
import storage from '@shared/storage';
import { adaptGetUserToUser } from '@entities/user/lib';
import { session } from './model';

export const CantBeAuthErr = new Error('useGetCurrentUser: Non auth');

export const useGetCurrentUser = () => {
    return useQuery({
        queryKey: ['user', 'current'],
        queryFn: async () => {
            const id_user = storage.userId.id;

            if (!id_user) {
                routeHistory.push(routerPaths.auth);
                throw CantBeAuthErr;
            }

            const resp = await UserService.getUserDataById(id_user);
            return adaptGetUserToUser(resp);
        },
        onSuccess: (user) => {
            session.setCurrentUser(user);
        },
    });
};
