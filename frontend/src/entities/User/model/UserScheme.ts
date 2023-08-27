import { User } from '@/entities/User/model/User';

export interface UserScheme {
    userData?: User;
    isLoading: boolean;
}
