import { useMutation } from 'react-query';
import { AuthService } from '@shared/api';
import { currentState } from '../model';

export interface UseRecoverConfirmProps {
    onError: (error: unknown) => void;
}

export function useRecoverConfirm({ onError }: UseRecoverConfirmProps) {
    return useMutation(
        (code: string) => {
            return AuthService.recoverConfirm({
                code,
                email: currentState.email,
            });
        },
        {
            onError,
            onSuccess: () => {
                currentState.confirm();
            },
        },
    );
}
