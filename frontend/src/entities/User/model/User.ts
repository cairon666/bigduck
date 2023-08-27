import { Gender } from '@/entities/User/model/Gender';

export interface User {
    id: string;
    email: string;
    first_name: string;
    second_name: string;
    create_at: Date;
    modify_at: Date;
    date_of_birth?: Date;
    gender?: Gender;
}
