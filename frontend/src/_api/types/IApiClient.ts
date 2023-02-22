export interface IApiClient {
    get(endpoint: string, params?: URLSearchParams, signal?: AbortSignal): Promise<ReadableStream<Uint8Array> | null>;

    post(endpoint: string, data?: BodyInit, signal?: AbortSignal): Promise<ReadableStream<Uint8Array> | null>;
}
