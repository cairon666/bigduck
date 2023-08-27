import { ThunkConfig, ThunkExtraArgKeys } from '@/app/providers/storeProvider';
import { Gender, User } from '@/entities/User';
import { localStorageKeys } from '@/shared/const/localStorage';
import { BadRequestErr } from '@/shared/HTTPClient';
import { ApiError } from '@/shared/HTTPClient/ApiError';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface getUserByIdResponse {
    id: string;
    email: string;
    first_name: string;
    second_name: string;
    create_at: Date;
    modify_at: Date;
    date_of_birth?: Date;
    gender?: Gender;
}

export const getUserDataById = createAsyncThunk<User, string, ThunkConfig<ApiError>>(
    'user/getUserDataById',
    async (id_user, ctx) => {
        const { extra, rejectWithValue } = ctx;

        try {
            const res = await extra[ThunkExtraArgKeys.api]
                .createAuthorizedClient(localStorage.getItem(localStorageKeys.ACCESS_TOKEN) || '')
                .get(`/api/v1/user/${id_user}`)
                .then((res) => res.json() as Promise<getUserByIdResponse>);

            const user: User = {
                id: res.id,
                email: res.email,
                first_name: res.first_name,
                second_name: res.second_name,
                create_at: res.create_at,
                modify_at: res.modify_at,
                date_of_birth: res.date_of_birth,
                gender: res.gender,
            };

            return user;
        } catch (e: unknown) {
            if (e instanceof BadRequestErr) {
                return rejectWithValue(await e.parseApiError());
            }

            throw new Error('unhandled error in getUserDataById!');
        }
    },
);
