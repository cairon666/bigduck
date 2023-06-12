import { Link } from 'react-router-dom';

import _i18n from '../../../../_i18n';
import { Info } from '../../../../components/ui';

export enum ErrorsTypes {
    EmailNotConfirm = 1,
    EqualOldPassword,
}

interface ErrorBlockProps {
    error?: ErrorsTypes;
}

export function ErrorBlock(props: ErrorBlockProps) {
    if (!props.error) return null;

    switch (props.error) {
        case ErrorsTypes.EmailNotConfirm:
            return (
                <Info className={'text-center'} type={'danger'} as={'p'}>
                    {_i18n.auth.EmailNotConfirm}
                    <Link className={'underline'} to={'/auth/recover/password'}>
                        {_i18n.auth.Again}
                    </Link>
                </Info>
            );
        case ErrorsTypes.EqualOldPassword:
            return (
                <Info className={'text-center'} type={'danger'} as={'p'}>
                    {_i18n.auth.EqualOldPassword}
                </Info>
            );
    }
}
