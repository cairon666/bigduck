import classNames from 'classnames';
import { ComponentProps, ElementType, ForwardedRef, ReactNode, forwardRef, memo } from 'react';
import { AiOutlineLoading } from 'react-icons/all';

const defaultElement = 'button';

export type ButtonOwnerProps<E extends ElementType> = {
    as?: E;
    theme?: 'contained' | 'outlined' | 'text' | 'gray';
    isLoading?: boolean;
    disabled?: boolean;
    className?: string;
    containerClassName?: string;
    // set padding from x-2 y-1 to xy-1
    onlyIcon?: boolean;
    children?: ReactNode;
};

export type ButtonProps<E extends ElementType> = Omit<ComponentProps<'button'>, keyof ButtonOwnerProps<E>> &
    ButtonOwnerProps<E>;

const ForwardButton = forwardRef(function Button<E extends ElementType = typeof defaultElement>(
    props: ButtonProps<E>,
    forwardRef: ForwardedRef<HTMLButtonElement | null>,
) {
    const {
        className,
        theme = 'contained',
        onlyIcon,
        containerClassName,
        isLoading,
        children,
        disabled,
        onClick,
        as,
        ...otherProps
    } = props;
    const Element = as || defaultElement;

    return (
        <Element
            {...otherProps}
            ref={forwardRef}
            disabled={disabled}
            onClick={onClick}
            className={classNames(
                className,
                `relative rounded border text-sm duration-100 ease-linear 
                focus-visible:outline-none focus-visible:ring-2 
                focus-visible:ring-yellow-500 focus-visible:ring-offset-2`,
                theme === 'contained'
                    ? `border-transparent bg-yellow-600 text-gray-900 
                    hover:bg-yellow-700 disabled:bg-yellow-200 
                    disabled:text-gray-200`
                    : '',
                theme === 'outlined'
                    ? `border-yellow-600 bg-white text-gray-900 hover:border-yellow-700 
                    hover:bg-yellow-200 disabled:bg-yellow-200 disabled:text-gray-200`
                    : '',
                theme === 'text'
                    ? `bg-transparent hover:bg-gray-20 disabled:bg-gray-20 
                    disabled:text-gray-100`
                    : '',
                theme === 'gray'
                    ? `border-2 border-gray-150 bg-gray-20 hover:bg-gray-40 
                    disabled:bg-gray-20 disabled:text-gray-80`
                    : '',
                onlyIcon ? 'p-1' : 'px-2 py-1',
            )}
        >
            <div
                className={classNames(
                    'flex h-full items-center justify-center',
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
        </Element>
    );
});

const MemoButton = memo(ForwardButton);

export const Button = ForwardButton;
