import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import {Credential} from "./credential.models";

@Entity("users")
export class User {
    @PrimaryColumn({
        type: "uuid",
        nullable: false
    })
    @OneToMany(() => Credential, (credential) => credential.id)
    id: string

    @Column({type: "text"})
    first_name: string

    @Column({type: "text"})
    second_name: string

    @Column({type: "timestamptz"})
    date_create: Date

    @Column({type: "timestamptz"})
    date_modify: Date

    @Column({type: "boolean"})
    is_staff: boolean

    @Column({type: "boolean"})
    is_admin: boolean

    @Column({type: "boolean"})
    is_active: boolean

    @Column({type: "text", unique: true})
    email: string

    @Column({type: "text", nullable: true})
    phone?: string

    @Column({type: "text", nullable: true})
    avatar_url?: string

    @Column({type: "text", nullable: true})
    bio?: string

    constructor(
        id: string,
        first_name: string,
        second_name: string,
        date_create: Date,
        date_modify: Date,
        is_staff: boolean,
        is_admin: boolean,
        is_active: boolean,
        email: string,
    ) {
        this.id = id
        this.first_name = first_name
        this.second_name = second_name
        this.date_create = date_create
        this.date_modify = date_modify
        this.is_staff = is_staff
        this.is_admin = is_admin
        this.is_active = is_active
        this.email = email
    }
}