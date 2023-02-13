import classNames from 'classnames';
import { ReactNode } from 'react';

export interface WrapperProps {
    label?: string;
    error?: string;
    required?: boolean;
    children?: JSX.Element | ReactNode;
}

export const Wrapper = (props: WrapperProps) => {
    return (
        <div className='block'>
            {props.label && (
                <span
                    className={classNames(
                        'mb-1 block text-sm font-medium text-slate-700',
                        props.error ? '!text-red-600' : '',
                    )}
                >
                    {props.label}
                    {props.required && <span className={'text-red-700'}> *</span>}
                </span>
            )}
            {props.children}
            {props.error && <span className={'mt-1 block text-xs font-medium text-red-600'}>{props.error}</span>}
        </div>
    );
};
