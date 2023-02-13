export function createStorage(): Storage {
    if (window === undefined) {
        throw new Error('Language storage cannot be created outside of browser');
    }

    return window.localStorage;
}

export const IdUserKey = 'id_user';
export const AccessTokenKey = 'access_token';
