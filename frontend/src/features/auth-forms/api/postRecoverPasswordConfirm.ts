import { ThunkConfig, ThunkExtraArgKeys } from "@/app/providers/storeProvider";
import { BadRequestErr } from "@/shared/HTTPClient";
import { ApiError } from "@/shared/HTTPClient/ApiError";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface RecoverPasswordConfirmRequest {
    email: string;
    code: string;
}

export const postRecoverPasswordConfirm = createAsyncThunk<void, RecoverPasswordConfirmRequest, ThunkConfig<ApiError>>(
    "auth/postRecoverPasswordConfirm",
    async (req, ctx) => {
        const { extra, rejectWithValue, fulfillWithValue } = ctx;

        try {
            await extra[ThunkExtraArgKeys.api]
                .createClient()
                .post(`/api/v1/auth/recover/password/confirm`, { body: req });

            extra[ThunkExtraArgKeys.navigate]("/auth/recover/update");
        } catch (e: unknown) {
            if (e instanceof BadRequestErr) {
                return rejectWithValue(await e.parseApiError());
            }

            throw new Error("unhandled error in postRecoverPasswordConfirm!");
        }
    },
);
