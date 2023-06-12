enum Keys {
    AccessToken = 'access_token',
    UserId = 'user_id',
}

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
