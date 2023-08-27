import { NotifyScheme } from '@/entities/Notify';
import { UserScheme } from '@/entities/User';
import { AuthScheme } from '@/features/auth-forms/model/slice';

export interface StateSchema {
    user: UserScheme;
    notify: NotifyScheme;
    auth: AuthScheme;
}
