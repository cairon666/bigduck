import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';
import { AiOutlineLoading } from 'react-icons/all';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    theme?: 'contained' | 'outlined' | 'text';
    isLoading?: boolean;
    containerClassName?: string;
};

export function Button(props: ButtonProps) {
    const { className, theme = 'contained', containerClassName, isLoading, children, onClick, ...otherProps } = props;

    return (
        <button
            {...otherProps}
            onClick={isLoading ? undefined : onClick}
            className={classNames(
                className,
                'relative rounded border border-transparent px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2',
                theme === 'contained'
                    ? 'bg-yellow-600 text-gray-900 hover:bg-yellow-700 disabled:bg-yellow-200 disabled:text-gray-200'
                    : '',
                theme === 'outlined'
                    ? 'border-yellow-600 bg-white text-gray-900 hover:border-yellow-700 hover:bg-yellow-200 disabled:bg-yellow-200 disabled:text-gray-200'
                    : '',
                theme === 'text' ? 'bg-transparent hover:bg-gray-20 disabled:bg-gray-20 disabled:text-gray-100' : '',
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
