import { ThunkConfig, ThunkExtraArgKeys } from "@/app/providers/storeProvider";
import { localStorageKeys } from "@/shared/const/localStorage";
import { BadRequestErr, BadRequestError } from "@/shared/HTTPClient";
import { delay } from "@/shared/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface PostLoginRequest {
    email: string;
    password: string;
}

export interface PostLoginResponse {
    id_user: string;
    access_token: string;
}

export const postPostLogin = createAsyncThunk<PostLoginResponse, PostLoginRequest, ThunkConfig<BadRequestError>>(
    "auth/postPostLogin",
    async (req, ctx) => {
        const { extra, rejectWithValue, fulfillWithValue } = ctx;

        await delay(2000);

        try {
            const resp = await extra[ThunkExtraArgKeys.api]
                .createClient()
                .post(`/api/v1/auth/login`, { body: req })
                .then((res) => res.json() as Promise<PostLoginResponse>);

            localStorage.setItem(localStorageKeys.USER_ID, resp.id_user);
            localStorage.setItem(localStorageKeys.ACCESS_TOKEN, resp.access_token);

            extra[ThunkExtraArgKeys.navigate]("/panel");

            return fulfillWithValue(resp);
        } catch (e: unknown) {
            if (e instanceof BadRequestErr) {
                return rejectWithValue(await e.parseApiError());
            }

            throw new Error("unhandled error in postRecoverPasswordUpdate!");
        }
    },
);
