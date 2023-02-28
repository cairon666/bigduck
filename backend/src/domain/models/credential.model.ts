export class CredentialModel {
    public id: string
    public login: string
    public password_hash: string
    public email: string

    public constructor(id: string,
                       login: string,
                       password_hash: string,
                       email: string) {
        this.id = id
        this.login = login
        this.password_hash = password_hash
        this.email = email
    }
}