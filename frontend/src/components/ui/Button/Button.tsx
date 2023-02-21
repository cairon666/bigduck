import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';
import { AiOutlineLoading } from 'react-icons/all';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    theme?: 'contained' | 'outlined' | 'text' | 'gray';
    isLoading?: boolean;
    containerClassName?: string;
    onlyIcon?: boolean;
};

export function Button(props: ButtonProps) {
    const {
        className,
        theme = 'contained',
        onlyIcon,
        containerClassName,
        isLoading,
        children,
        onClick,
        ...otherProps
    } = props;

    return (
        <button
            {...otherProps}
            onClick={isLoading ? undefined : onClick}
            className={classNames(
                className,
                'relative rounded border border-transparent text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2',
                theme === 'contained'
                    ? 'bg-yellow-600 text-gray-900 hover:bg-yellow-700 disabled:bg-yellow-200 disabled:text-gray-200'
                    : '',
                theme === 'outlined'
                    ? 'border-yellow-600 bg-white text-gray-900 hover:border-yellow-700 hover:bg-yellow-200 disabled:bg-yellow-200 disabled:text-gray-200'
                    : '',
                theme === 'text' ? 'bg-transparent hover:bg-gray-20 disabled:bg-gray-20 disabled:text-gray-100' : '',
                theme === 'gray'
                    ? 'border-2 border-gray-150 bg-gray-20 hover:bg-gray-40 disabled:bg-gray-20 disabled:text-gray-80'
                    : '',
                onlyIcon ? 'p-1' : 'px-2 py-1',
            )}
        >
            <div
                className={classNames(
                    'flex items-center justify-center',
                    isLoading ? 'opacity-0' : '',
                    containerClassName,
                )}
            >
                {children}
            </div>
            {isLoading && (
                <div className={'absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'}>
                    <AiOutlineLoading
                        className={classNames(
                            '  h-4 w-4 animate-spin',
                            theme === 'contained' ? 'text-white' : '',
                            theme === 'outlined' ? 'text-yellow-500' : '',
                            theme === 'text' ? 'text-gray-500' : '',
                        )}
                    />
                </div>
            )}
        </button>
    );
}
