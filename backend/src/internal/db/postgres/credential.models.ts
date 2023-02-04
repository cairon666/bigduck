import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity("credentials")
export class Credential {
    @PrimaryColumn({type: "uuid"})
    public id: string

    @Column({type: "text"})
    public login: string

    @Column({type: "text"})
    public password_hash: string

    constructor(id: string, login: string, hash: string) {
        this.id = id
        this.login = login
        this.password_hash = hash
    }
}