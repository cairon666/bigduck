import _AsyncStorage from '../../AsyncStorage';
import { BadRequest } from '../errors';
import { fetchRefreshResponse, fetchRefreshTokens } from './auth.actions';

export enum ApiErrorCodes {
    CodeNotFound = 1,
    CodeEmailAlreadyExist,
    CodeBadPassword,
    CodeGenderNotFound,
    CodeBadEmail,
    CodeShortPassword,
    CodeShortFirstName,
    CodeShortSecondName,
    CodeBadAvatarURL,
    CodeUnknownGender,
    CodeBadUUID,
    CodeBadData,
    CodeBadRecoverCode,
    CodeRecoverEmailNotConfirm,
    CodeNotValidRecoverCode,
    CodeNewPasswordEqualOldPassword,
    CodeDateOfBirthFromFeature,
}

export interface ApiError {
    errors: {
        code: ApiErrorCodes;
        message: string;
    }[];
}

export type Gender = 'male' | 'female';

export async function withRetry<T>(cb: Promise<T>): Promise<T> {
    try {
        return await cb;
    } catch (e) {
        if (e instanceof BadRequest) {
            let resp: fetchRefreshResponse;
            try {
                resp = await fetchRefreshTokens();
            } catch {
                window.location.href = window.location.origin + '/auth/login';
                throw new Error('withRetry: error when update access token');
            }

            _AsyncStorage.setAccessToken(resp.access_token);
            return cb;
        }

        throw new Error('withRetry: error is not HTTPError');
    }
}
