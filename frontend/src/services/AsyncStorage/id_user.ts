import { Keys } from './keys';

export default {
    getUserId(): string | null {
        return localStorage.getItem(Keys.UserId);
    },
    setUserId(value: string | null) {
        if (!value) {
            localStorage.removeItem(Keys.UserId);
            return;
        }

        localStorage.setItem(Keys.UserId, value);
    },
};
