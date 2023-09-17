import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';
import { currentState, Stages } from '../model';
import { ConfirmForm } from './ConfirmForm';
import { SendForm } from './SendForm';
import { UpdateForm } from './UpdateForm';

export const RecoverPasswordForm = observer(() => {
    useEffect(() => {
        return () => currentState.clear();
    }, []);

    const currentStage = currentState.stage;

    const CurrentStage = useMemo(() => {
        switch (currentStage) {
            case Stages.send:
                return <SendForm />;
            case Stages.confirm:
                return <ConfirmForm />;
            case Stages.update:
                return <UpdateForm />;
            default:
                return <SendForm />;
        }
    }, [currentStage]);

    return (
        <div>
            <h1 className="text-center">Востановление пароля</h1>
            {CurrentStage}
        </div>
    );
});
