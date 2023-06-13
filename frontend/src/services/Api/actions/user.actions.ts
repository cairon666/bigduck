import AsyncStorage from '../../AsyncStorage';
import { factory } from '../HTTPClient';
import { Gender } from './types';

export interface fetchUserDataRequest {
    id_user: string;
}

export interface fetchUserDataResponse {
    id: string;
    email: string;
    first_name: string;
    second_name: string;
    create_at: Date;
    modify_at: Date;
    date_of_birth?: Date;
    gender?: Gender;
}

export function fetchUserData(payload: fetchUserDataRequest): Promise<fetchUserDataResponse> {
    return factory
        .createAuthorizedClient(AsyncStorage.getAccessToken() || '')
        .get(`/api/v1/user/${payload.id_user}`)
        .then((res) => res.json() as Promise<fetchUserDataResponse>);
}
