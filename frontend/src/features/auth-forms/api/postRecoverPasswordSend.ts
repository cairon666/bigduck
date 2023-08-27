import { ThunkConfig, ThunkExtraArgKeys } from '@/app/providers/storeProvider';
import { BadRequestErr } from '@/shared/HTTPClient';
import { ApiError } from '@/shared/HTTPClient/ApiError';
import { createAsyncThunk } from '@reduxjs/toolkit';

export interface RecoverPasswordSendRequest {
    email: string;
}

export const postRecoverPasswordSend = createAsyncThunk<void, RecoverPasswordSendRequest, ThunkConfig<ApiError>>(
    'auth/postRecoverPasswordSend',
    async (req, ctx) => {
        const { extra, rejectWithValue } = ctx;

        try {
            const res = await extra[ThunkExtraArgKeys.api]
                .createClient()
                .post(`/api/v1/auth/recover/password/send`, { body: req });

            extra[ThunkExtraArgKeys.navigate]('/auth/recover/confirm');
        } catch (e: unknown) {
            if (e instanceof BadRequestErr) {
                return rejectWithValue(await e.parseApiError());
            }

            console.error(e);
        }
    },
);
