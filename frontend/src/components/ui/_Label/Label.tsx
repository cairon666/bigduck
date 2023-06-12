import { memo } from 'react';

export interface LabelProps {
    label?: string;
    required?: boolean;
}

export const Label = memo(function Label(props: LabelProps) {
    return props.label ? (
        <span className={'text-sm leading-3 text-gray-600'}>
            {props.label}
            {props.required && <span className={'text-red-800'}>*</span>}
        </span>
    ) : null;
});
