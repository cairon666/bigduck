import { Keys } from './keys';

export default {
    getAccessToken(): string | null {
        return localStorage.getItem(Keys.AccessToken);
    },
    setAccessToken(value: string | null) {
        if (!value) {
            localStorage.removeItem(Keys.AccessToken);
            return;
        }

        localStorage.setItem(Keys.AccessToken, value);
    },
};
