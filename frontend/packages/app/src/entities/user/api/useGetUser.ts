import { useQuery } from 'react-query';
import { UserService } from '@shared/api/UserService';
import { adaptGetUserToUser } from '../lib';

export const useGetUser = (id_user: string) => {
    return useQuery({
        queryKey: ['user', id_user],
        queryFn: async () => {
            const resp = await UserService.getUserDataById(id_user);
            return adaptGetUserToUser(resp);
        },
    });
};
