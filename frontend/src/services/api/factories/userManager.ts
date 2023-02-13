import { ApiClientInterface, ApiHeaders, User } from "../types";
import { ApiClientFactory } from "./apiClientFactory";

export interface UserUpdateResponse {
  user: User
}

export class UserManager {
  private readonly apiClient: ApiClientInterface;
  private readonly id_user: string

  public constructor(apiClient: ApiClientInterface, id_user: string) {
    this.apiClient = apiClient;
    this.id_user = id_user
  }

  public async get(): Promise<UserUpdateResponse> {
    return this.apiClient.get(this.id_user).then((v) => v.json());
  }

  public async post(data: User): Promise<void> {
    return this.apiClient.post(this.id_user, data).then((v) => v.json());
  }
}

export class UserManagerFactory {
  private readonly apiClientFactory: ApiClientFactory;

  public constructor(baseUrl: string, headers: ApiHeaders) {
    this.apiClientFactory = new ApiClientFactory(`${baseUrl}/api/v1/user`, headers);
  }

  public createAuthManager(access_token: string, id_user: string): UserManager {
    return new UserManager(this.apiClientFactory.createAuthorizedClient(access_token), id_user);
  }
}