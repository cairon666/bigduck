import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity("credentials")
export class Credential {
    @PrimaryColumn("uuid")
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