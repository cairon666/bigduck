export default {
    get apiBaseUrl(): string {
        return import.meta.env.REACT_APP_API_BASE_URL || '';
    },
};
