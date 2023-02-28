import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Credential } from './credential';

export type UserGender = 'male' | 'female';

@Entity({
    name: 'user',
})
export class User {
    @PrimaryColumn({
        name: 'id',
        type: 'uuid',
        unique: true,
    })
    public id: string;

    @OneToOne(() => Credential)
    @JoinColumn({
        name: 'id',
    })
    public credential?: Credential;

    @Column({
        name: 'username',
        type: 'text',
        unique: true,
    })
    public username: string;

    @Column({
        name: 'first_name',
        type: 'text',
    })
    public first_name: string;

    @Column({
        name: 'second_name',
        type: 'text',
    })
    public second_name: string;

    @Column({
        name: 'day_of_birth',
        type: 'text',
        nullable: true,
    })
    public day_of_birth: Date | null;

    @Column({
        name: 'gender',
        type: 'enum',
        enum: ['male', 'female'],
        nullable: true,
    })
    public gender: UserGender | null;

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

    public constructor(
        id: string,
        username: string,
        first_name: string,
        second_name: string,
        day_of_birth: Date | null,
        gender: UserGender | null,
        date_create: Date,
        date_modify: Date,
    ) {
        this.id = id;
        this.username = username;
        this.first_name = first_name;
        this.second_name = second_name;
        this.day_of_birth = day_of_birth;
        this.gender = gender;
        this.date_create = date_create;
        this.date_modify = date_modify;
    }
}
