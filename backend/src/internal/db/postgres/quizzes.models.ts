import {
    Column,
    Entity,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Credential } from "./credential.models";
import Duration from "@icholy/duration";

@Entity({
    name: "quizzes",
})
export class Quizzes {
    @PrimaryGeneratedColumn({
        type: "integer",
        name: "id",
    })
    public id: number;

    @Column({
        name: "id_owner",
        type: "uuid",
    })
    @OneToMany(() => Credential, (credential) => credential.id)
    public id_owner: string;

    @Column({
        name: "name",
        type: "text",
    })
    public name: string;

    @Column({
        name: "title",
        type: "text",
    })
    public title: string;

    @Column({
        name: "description",
        type: "text",
    })
    public description: string;

    @Column({
        name: "intro_url",
        type: "text",
    })
    public intro_url: string;

    @Column({
        name: "date_create",
        type: "timestamptz",
    })
    public date_create: Date;

    @Column({
        name: "ttl",
        type: "text",
        nullable: true,
    })
    public ttl: string | null;

    @Column({
        name: "tts",
        type: "timestamptz",
        nullable: true,
    })
    public tts: Date | null;

    @Column({
        name: "tte",
        type: "timestamptz",
        nullable: true,
    })
    public tte: Date | null;

    constructor(
        id: number,
        id_owner: string,
        name: string,
        title: string,
        description: string,
        intro_url: string,
        date_create: Date,
        ttl: string | null,
        tts: Date | null,
        tte: Date | null
    ) {
        this.id = id;
        this.id_owner = id_owner;
        this.name = name;
        this.title = title;
        this.description = description;
        this.intro_url = intro_url;
        this.date_create = date_create;
        this.ttl = ttl;
        this.tts = tts;
        this.tte = tte;
    }
}
