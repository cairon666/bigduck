import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import _i18n from '../../../_i18n';
import { ConfirmCodeStage } from './ConfirmCodeStage';
import { SendEmailStage } from './SendEmailStage';
import { UpdatePasswordStage } from './UpdatePasswordStage';

export enum Stages {
    SendEmail = 1,
    ConfirmCode,
    UpdatePassword,
}

export function RecoverPassword() {
    const [email, setEmail] = useState<string>('');
    const [currentStage, setCurrentStage] = useState<Stages>(Stages.SendEmail);
    const navigate = useNavigate();

    const onNextSend = useCallback(() => {
        setCurrentStage(Stages.ConfirmCode);
    }, []);

    const onNextConfirm = useCallback(() => {
        setCurrentStage(Stages.UpdatePassword);
    }, []);

    const onNextUpdate = useCallback(() => {
        navigate('/auth/login');
    }, [navigate]);

    // set title
    useEffect(() => {
        document.title = _i18n.auth.RecoverPassword;
    }, []);

    return (
        <div className={'flex flex-col gap-2'}>
            <h1 className={'text-center text-xl font-medium'}>{_i18n.auth.RecoverPassword}</h1>
            {currentStage == Stages.SendEmail ? (
                <SendEmailStage setEmail={setEmail} onNext={onNextSend} />
            ) : currentStage == Stages.ConfirmCode ? (
                <ConfirmCodeStage email={email} onNext={onNextConfirm} />
            ) : (
                <UpdatePasswordStage email={email} onNext={onNextUpdate} />
            )}
        </div>
    );
}
