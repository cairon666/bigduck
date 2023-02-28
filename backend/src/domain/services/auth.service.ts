import {CredentialModel, UserModel} from "../models";

interface AuthRepository {
    Create(credential: CredentialModel, user: UserModel): Promise<void>

    ReadByLogin(login: string): Promise<CredentialModel | null>
}

export class AuthService {
    public constructor(private authRepo: AuthRepository) {
    }

    public async ReadByLogin(login: string): Promise<CredentialModel | null> {
        return this.authRepo.ReadByLogin(login)
    }

    public async Create(credential: CredentialModel, user: UserModel): Promise<void> {
        return this.authRepo.Create(credential, user)
    }
}