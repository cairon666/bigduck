import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Credential } from './credential.models';

@Entity('users')
export class User {
    @PrimaryColumn({
        type: 'uuid',
        name: 'id',
    })
    @OneToMany(() => Credential, (credential) => credential.id)
    public id: string;

    @Column({
        type: 'text',
        name: 'username',
        unique: true,
    })
    public username: string;

    @Column({
        type: 'text',
        name: 'first_name',
    })
    public first_name: string;

    @Column({
        type: 'text',
        name: 'second_name',
    })
    public second_name: string;

    @Column({
        type: 'text',
        name: 'avatar_url',
        nullable: true,
    })
    public avatar_url: string | null;

    @Column({
        type: 'date',
        name: 'day_of_birth',
        nullable: true,
    })
    public day_of_birth: Date | null;

    @Column({
        type: 'text',
        name: 'gender',
        nullable: true,
    })
    public gender: string | null;

    @Column({
        type: 'timestamptz',
        name: 'date_create',
    })
    public date_create: Date;

    @Column({
        type: 'timestamptz',
        name: 'date_modify',
    })
    public date_modify: Date;

    public constructor(
        id: string,
        username: string,
        first_name: string,
        second_name: string,
        avatar_url: string | null,
        day_of_birth: Date | null,
        gender: string | null,
        date_create: Date,
        date_modify: Date,
    ) {
        this.id = id;
        this.username = username;
        this.first_name = first_name;
        this.second_name = second_name;
        this.avatar_url = avatar_url;
        this.day_of_birth = day_of_birth;
        this.gender = gender;
        this.date_create = date_create;
        this.date_modify = date_modify;
    }
}
