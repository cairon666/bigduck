import { ThunkConfig, ThunkExtraArgKeys } from "@/app/providers/storeProvider";
import { BadRequestErr } from "@/shared/HTTPClient";
import { ApiError } from "@/shared/HTTPClient/ApiError";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface PostRegisterRequest {
    email: string;
    password: string;
    first_name: string;
    second_name: string;
    user_name: string;
    date_of_birth?: Date | null;
    gender?: "male" | "female";
}

export const postPostRegister = createAsyncThunk<void, PostRegisterRequest, ThunkConfig<ApiError>>(
    "auth/postPostRegister",
    async (req, ctx) => {
        const { extra, rejectWithValue } = ctx;

        try {
            await extra[ThunkExtraArgKeys.api].createClient().post(`/api/v1/auth/register`, { body: req });

            extra[ThunkExtraArgKeys.navigate](`/auth/login?email=${req.email}&password=${req.password}`);
        } catch (e: unknown) {
            if (e instanceof BadRequestErr) {
                return rejectWithValue(await e.parseApiError());
            }

            throw new Error("unhandled error in postRecoverPasswordUpdate!");
        }
    },
);
