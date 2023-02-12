import config from '../config';
import { ApiHeaders, AuthManager, AuthManagerFactory, HttpError } from '../api';

export async function createAuthManager(): Promise<AuthManager> {
    const factory = new AuthManagerFactory(config.apiBaseUrl, getBaseHeaders());
    return factory.createAuthManager();
}

function getBaseHeaders(): ApiHeaders {
    return {
        'Accept-Language': 'ru',
    };
}

const refresh = async () => {
    const manager = await createAuthManager();
    return await manager.refresh();
};

export function getAccessToken(): [string | null, string | null] {
    return [
        localStorage.getItem('access_token'),
        localStorage.getItem('access_token_create'),
    ];
}

export function setAccessToken(access_token: string) {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('access_token_create', new Date().toString());
}

function addHours(d: Date, h: number): Date {
    return new Date(d.setTime(d.getTime() + h * 60 * 60 * 1000));
}

export async function getAuthToken(): Promise<string | null> {
    let [access_token, access_token_create] = getAccessToken();

    if (
        access_token == null ||
        access_token === '' ||
        access_token_create === null ||
        addHours(new Date(access_token!), 1) < new Date()
    ) {
        try {
            const res = await refresh();
            access_token = res.access_token;
            setAccessToken(res.access_token);
        } catch (e) {
            console.error(e);
        }
    }

    return access_token;
}
