import {Column, Entity, Generated, PrimaryColumn} from "typeorm";

@Entity({
    name: "credential"
})
export class Credential {
    @PrimaryColumn({
        name: "id",
        type: "uuid",
        unique: true,
    })
    @Generated("uuid")
    public id: string

    @Column({
        name: "login",
        type: "text",
        unique: true
    })
    public login: string

    @Column({
        name: "password_hash",
        type: "text",
        unique: true
    })
    public password_hash: string

    @Column({
        name: "email",
        type: "text",
        unique: true
    })
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