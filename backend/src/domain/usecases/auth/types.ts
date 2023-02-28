import { CredentialModel, UserModel } from '../../models';

export interface AuthService {
    ReadByLogin(login: string): Promise<CredentialModel | null>;

    Create(credential: CredentialModel, user: UserModel): Promise<void>;
}

