import { ReactNode } from 'react';
import { Error } from '../Error';
import { Label } from '../Label';

export interface CheckboxGroupProps {
    children?: ReactNode;
    error?: ReactNode;
    label?: ReactNode;
}

export function CheckboxGroup({ children, error, label }: CheckboxGroupProps) {
    return (
        <div className="flex flex-col gap-1">
            <Label>{label}</Label>
            <div className="flex items-center gap-2">{children}</div>
            <Error>{error}</Error>
        </div>
    );
}
