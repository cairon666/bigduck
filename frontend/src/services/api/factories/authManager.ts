import { ApiClientInterface, ApiHeaders } from '../types';
import { ApiClientFactory } from './apiClientFactory';

export interface LoginRequest {
    login: string;
    password: string;
}

interface LoginResponse {
    id_user: string;
    access_token: string;
}

export interface RegisterRequest {
    login: string;
    password: string;
    username: string;
    first_name: string;
    second_name: string;
    email: string;
    day_of_birth: Date | null;
    gender: string | null;
    avatar_url: string | null;
}

export interface RefreshResponse {
    access_token: string;
}

export class AuthManager {
    private readonly apiClient: ApiClientInterface;

    public constructor(apiClient: ApiClientInterface) {
        this.apiClient = apiClient;
    }

    public async login(data: LoginRequest): Promise<LoginResponse> {
        return this.apiClient.post('login', data).then((v) => v.json());
    }

    public async register(data: RegisterRequest): Promise<void> {
        await this.apiClient.post('register', data);
    }

    public async refresh(): Promise<RefreshResponse> {
        return this.apiClient.post('refresh').then((v) => v.json());
    }

    public async logout(): Promise<Response> {
        return this.apiClient.post('logout');
    }
}

export class AuthManagerFactory {
    private readonly apiClientFactory: ApiClientFactory;

    public constructor(baseUrl: string, headers: ApiHeaders) {
        this.apiClientFactory = new ApiClientFactory(`${baseUrl}/api/v1/auth/`, headers);
    }

    public createAuthManager(): AuthManager {
        return new AuthManager(this.apiClientFactory.createClient());
    }
}
