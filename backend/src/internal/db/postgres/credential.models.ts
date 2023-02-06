import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('credentials')
export class Credential {
    @PrimaryColumn({
        type: 'uuid',
        name: 'id',
    })
    public id: string;

    @Column({
        type: 'text',
        name: 'login',
    })
    public login: string;

    @Column({
        type: 'text',
        name: 'password_hash',
    })
    public password_hash: string;

    @Column({
        type: 'boolean',
        name: 'is_staff',
        default: false,
    })
    public is_staff: boolean;

    @Column({
        type: 'boolean',
        name: 'is_admin',
        default: false,
    })
    public is_admin: boolean;

    @Column({
        type: 'text',
        name: 'phone',
        nullable: true,
    })
    public phone: string | null;

    @Column({
        type: 'text',
        name: 'email',
        unique: true,
    })
    public email: string;

    public constructor(
        id: string,
        login: string,
        password_hash: string,
        is_staff: boolean,
        is_admin: boolean,
        phone: string | null,
        email: string,
    ) {
        this.id = id;
        this.login = login;
        this.password_hash = password_hash;
        this.is_staff = is_staff;
        this.is_admin = is_admin;
        this.phone = phone;
        this.email = email;
    }
}
