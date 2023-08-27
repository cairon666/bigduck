import { ThunkConfig, ThunkExtraArgKeys } from '@/app/providers/storeProvider';
import { BadRequestErr } from '@/shared/HTTPClient';
import { ApiError } from '@/shared/HTTPClient/ApiError';
import { createAsyncThunk } from '@reduxjs/toolkit';

export interface RecoverPasswordUpdateRequest {
    email: string;
    password: string;
}

export const postRecoverPasswordUpdate = createAsyncThunk<void, RecoverPasswordUpdateRequest, ThunkConfig<ApiError>>(
    'auth/postRecoverPasswordUpdate',
    async (req, ctx) => {
        const { extra, rejectWithValue } = ctx;

        try {
            await extra[ThunkExtraArgKeys.api]
                .createClient()
                .post(`/api/v1/auth/recover/password/update`, { body: req });

            extra[ThunkExtraArgKeys.navigate]('/auth/login');
        } catch (e: unknown) {
            if (e instanceof BadRequestErr) {
                return rejectWithValue(await e.parseApiError());
            }

            throw new Error('unhandled error in postRecoverPasswordUpdate!');
        }
    },
);
