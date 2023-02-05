import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import {Credential} from "./credential.models";

@Entity("users")
export class User {
    @PrimaryColumn({
        type: "uuid",
        name: "id"
    })
    @OneToMany(() => Credential, (credential) => credential.id)
    id: string

    @Column({
        type: "text",
        name: "username",
        unique: true,
    })
    username: string

    @Column({
        type: "text",
        name: "first_name",
    })
    first_name: string

    @Column({
        type: "text",
        name: "second_name",
    })
    second_name: string

    @Column({
        type: "text",
        name: "avatar_url",
        nullable: true
    })
    avatar_url: string | null

    @Column({
        type: "date",
        name: "day_of_birth",
        nullable: true
    })
    day_of_birth: Date | null

    @Column({
        type: "text",
        name: "gender",
        nullable: true
    })
    gender: string | null

    constructor(
        id: string,
        username: string,
        first_name: string,
        second_name: string,
        avatar_url: string | null,
        day_of_birth: Date | null,
        gender: string | null,
    ) {
        this.id = id
        this.username = username
        this.first_name = first_name
        this.second_name = second_name
        this.avatar_url = avatar_url
        this.day_of_birth = day_of_birth
        this.gender = gender
    }
}