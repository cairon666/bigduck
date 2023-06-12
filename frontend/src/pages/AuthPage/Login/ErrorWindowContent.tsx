import { Link } from 'react-router-dom';

import _i18n from '../../../_i18n';

export enum LoginErrorStatus {
    EmailNotFound = 'EmailNotFound',
    WrongPassword = 'WrongPassword',
}

interface ErrorWindowContentProps {
    error: LoginErrorStatus | undefined;
}

export function ErrorWindowContent({ error }: ErrorWindowContentProps) {
    switch (error) {
        case LoginErrorStatus.EmailNotFound:
            return (
                <div>
                    <span>{_i18n.auth.UserWithEmailNotFound} </span>
                    <Link className={'underline'} to='/auth/register'>
                        {_i18n.auth.RegisterQ}
                    </Link>
                </div>
            );
        case LoginErrorStatus.WrongPassword:
            return (
                <div>
                    <span>{_i18n.auth.WrongPassword} </span>
                    <Link className={'underline'} to='/auth/recover/password'>
                        {_i18n.auth.RecoverQ}
                    </Link>
                </div>
            );
        case undefined:
            return null;
    }
}
