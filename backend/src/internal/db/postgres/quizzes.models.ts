import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CredentialDB } from './credential.models';

@Entity({
    name: 'quizzes',
})
export class Quizzes {
    @PrimaryGeneratedColumn({
        type: 'integer',
        name: 'id',
    })
    public id: number;

    @Column({
        name: 'id_owner',
        type: 'uuid',
    })
    @OneToMany(() => CredentialDB, (credential) => credential.id)
    public id_owner: string;

    @Column({
        name: 'name',
        type: 'text',
    })
    public name: string;

    @Column({
        name: 'title',
        type: 'text',
    })
    public title: string;

    @Column({
        name: 'description',
        type: 'text',
    })
    public description: string;

    @Column({
        name: 'intro_url',
        type: 'text',
    })
    public intro_url: string;

    @Column({
        name: 'date_create',
        type: 'timestamptz',
    })
    public date_create: Date;

    @Column({
        name: 'date_modify',
        type: 'timestamptz',
    })
    public date_modify: Date;

    @Column({
        name: 'ttl',
        type: 'text',
        nullable: true,
    })
    public ttl: string | null;

    @Column({
        name: 'tts',
        type: 'timestamptz',
        nullable: true,
    })
    public tts: Date | null;

    @Column({
        name: 'tte',
        type: 'timestamptz',
        nullable: true,
    })
    public tte: Date | null;

    @Column({
        name: 'is_show',
        type: 'boolean',
    })
    public is_show: boolean;

    @Column({
        name: 'is_strict',
        type: 'boolean',
    })
    public is_strict: boolean;

    @Column({
        name: 'is_random',
        type: 'boolean',
    })
    public is_random: boolean;

    public constructor(
        id: number,
        id_owner: string,
        name: string,
        title: string,
        description: string,
        intro_url: string,
        date_create: Date,
        date_modify: Date,
        ttl: string | null,
        tts: Date | null,
        tte: Date | null,
        is_show: boolean,
        is_strict: boolean,
        is_random: boolean,
    ) {
        this.id = id;
        this.id_owner = id_owner;
        this.name = name;
        this.title = title;
        this.description = description;
        this.intro_url = intro_url;
        this.date_create = date_create;
        this.date_modify = date_modify;
        this.ttl = ttl;
        this.tts = tts;
        this.tte = tte;
        this.is_show = is_show;
        this.is_strict = is_strict;
        this.is_random = is_random;
    }
}
