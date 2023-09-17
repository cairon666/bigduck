import BaseProvider from '../BaseProvider';
import { getUserDataResponseDTO } from './types';

export class UserService {
    // public postUserData(userData: UserDataResponseDTO) {
    //     return BaseProvider
    //         .fetchWIthAuth('POST', '/api/v1/user', {
    //             body: userData,
    //         });
    // }

    static getUserDataById(id_user: string) {
        return BaseProvider.fetchWithAuth('GET', `/api/v1/user/${id_user}`).then(
            (resp) => resp.json() as Promise<getUserDataResponseDTO>,
        );
    }

    static changeEmail(id_user: string, new_email: string) {
        return BaseProvider.fetchWithAuth('POST', `/api/v1/user/change/email/${id_user}`, {
            body: {
                email: new_email,
            },
        });
    }
}
