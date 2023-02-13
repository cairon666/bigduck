export interface ApiClientInterface {
    get(endpoint: string, params?: URLSearchParams, signal?: AbortSignal): Promise<unknown>;

    post(endpoint: string, data?: object, signal?: AbortSignal): Promise<Response>;

    uploadFile(endpoint: string, formData: FormData): Promise<Response>;
}
