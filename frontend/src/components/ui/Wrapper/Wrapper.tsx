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
                        'block text-sm font-medium text-slate-700 mb-1',
                        props.error ? '!text-red-600' : '',
                    )}
                >
                    {props.label}
                    {props.required && (
                        <span className={'text-red-700'}> *</span>
                    )}
                </span>
            )}
            {props.children}
            {props.error && (
                <span className={'block text-xs font-medium text-red-600 mt-1'}>
                    {props.error}
                </span>
            )}
        </div>
    );
};
