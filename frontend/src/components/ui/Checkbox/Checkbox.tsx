import classNames from 'classnames';
import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import { FiCheck } from 'react-icons/fi';

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
    className?: string;
    classNameLabel?: string;
    label?: string | JSX.Element | ReactNode;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(props, ref) {
    const { classNameLabel, label, type, className, ...otherProps } = props;

    return (
        <label className={classNames('flex h-5 cursor-pointer items-center gap-1 text-sm font-light', classNameLabel)}>
            <div className={'relative h-full'}>
                <input
                    {...otherProps}
                    className={classNames(
                        'border-yellow-gray-200 peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border transition-all checked:border-yellow-600 checked:bg-yellow-600 checked:hover:border-yellow-700 checked:hover:bg-yellow-700 disabled:!border-gray-80 disabled:!bg-gray-20 disabled:!text-gray-900',
                        className,
                    )}
                    type={type || 'checkbox'}
                    ref={ref}
                />
                <div className='pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100 peer-disabled:text-gray-300'>
                    <FiCheck />
                </div>
            </div>
            {label}
        </label>
    );
});
