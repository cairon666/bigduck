import { useMutation } from 'react-query';
import { AuthService } from '@shared/api';
import { currentState } from '../model';

export interface UsePostRecoverUpdateProps {
    onError?: (e: unknown) => void;
}

export const useRecoverUpdate = ({ onError }: UsePostRecoverUpdateProps) => {
    return useMutation(
        (password: string) => {
            return AuthService.recoverUpdate({
                password,
                email: currentState.email,
            });
        },
        {
            onError,
            onSuccess: (_, password) => {
                currentState.update(password);
            },
        },
    );
};
