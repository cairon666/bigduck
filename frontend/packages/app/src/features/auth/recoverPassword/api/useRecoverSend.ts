import { useMutation } from 'react-query';
import { AuthService } from '@shared/api';
import { currentState } from '../model';

export interface UseRecoverSendProps {
    onError?: (e: unknown) => void;
    skipSetState?: boolean;
}

export const useRecoverSend = ({ onError, skipSetState }: UseRecoverSendProps) => {
    return useMutation(
        (email: string) => {
            return AuthService.recoverSend({
                email,
            });
        },
        {
            onError,
            onSuccess(_, email) {
                if (skipSetState) {
                    return;
                }
                currentState.send(email);
            },
        },
    );
};
