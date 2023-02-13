import { ApiHeaders, AuthManager, AuthManagerFactory } from '../api';
import config from '../config';

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

export function getAccessToken(): string | null {
    return localStorage.getItem('access_token');
}

export function getAccessTokenCreate(): string | null {
    return localStorage.getItem('access_token_create');
}

export function setAccessToken(access_token: string) {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('access_token_create', new Date().toString());
}

// TODO: add to utils
function addHours(d: Date, h: number): Date {
    return new Date(d.setTime(d.getTime() + h * 60 * 60 * 1000));
}

export async function getAuthToken(): Promise<string | null> {
    const access_token_create = getAccessTokenCreate();
    let access_token = getAccessToken();

    if (
        !access_token ||
        access_token === '' ||
        !access_token_create ||
        addHours(new Date(access_token_create), 1) < new Date()
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
