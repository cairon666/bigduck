import { ApiHeaders, AuthManager, AuthManagerFactory } from '../services/api';
import { UserManager, UserManagerFactory } from '../services/api/factories/userManager';
import config from '../config';
import { AccessTokenKey, createStorage, IdUserKey } from "../services/storage";

function getBaseHeaders(): ApiHeaders {
  return {
    'Accept-Language': 'ru',
  };
}

export async function getAuthToken(): Promise<string> {
  let access_token = createStorage().getItem(AccessTokenKey)

  if (!access_token) {
    throw new Error("access_token not found")
  }

  return access_token;
}

export async function createAuthManager(): Promise<AuthManager> {
  const factory = new AuthManagerFactory(config.apiBaseUrl, getBaseHeaders());
  return factory.createAuthManager();
}

export async function createUserManager(): Promise<UserManager> {
  const factory = new UserManagerFactory(config.apiBaseUrl, getBaseHeaders());

  const id_user = createStorage().getItem(IdUserKey)

  if (!id_user) {
    throw new Error("id_user not defined")
  }

  return factory.createAuthManager(await getAuthToken(), id_user);
}


