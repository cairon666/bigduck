import { variants } from 'classname-variants';
import classNames from 'classnames';
import { ComponentProps, ReactNode } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

const button = variants({
    base: 'relative rounded border text-sm duration-100 ease-linear focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2',
    variants: {
        theme: {
            contained:
                'border-transparent bg-yellow-600 text-gray-900 hover:bg-yellow-700 disabled:bg-yellow-200 disabled:text-gray-200',
            outlined:
                'border-yellow-600 bg-white text-gray-900 hover:border-yellow-700 hover:bg-yellow-200 disabled:bg-yellow-200 disabled:text-gray-200',
            text: 'bg-transparent hover:bg-gray-20 disabled:bg-gray-20 disabled:text-gray-100',
            gray: 'border-2 border-gray-150 bg-gray-20 hover:bg-gray-40 disabled:bg-gray-20 disabled:text-gray-80',
        },
        size: {
            extraSmall: 'px-1 py-1 text-xs',
            small: 'px-3 py-2 text-sm',
            base: 'px-5 py-2 text-sm',
            large: 'px-5 py-3 text-base',
            extraLarge: 'px-6 py-4 text-base',
        },
        disabled: {
            true: 'cursor-not-allowed',
            false: '',
        },
        isLoading: {
            true: '',
            false: '',
        },
        onlyIcon: {
            true: '!p-1',
            false: '',
        },
    },
    defaultVariants: {
        theme: 'contained',
        size: 'base',
        disabled: false,
        isLoading: false,
    },
});

const buttonLoadingIcon = variants({
    base: 'h-4 w-4 animate-spin',
    variants: {
        theme: {
            contained: 'text-white',
            outlined: 'text-yellow-500',
            text: 'text-gray-500',
            gray: '',
        },
    },
    defaultVariants: {
        theme: 'contained',
    },
});

export type ButtonOwnerProps = {
    theme?: 'contained' | 'outlined' | 'text' | 'gray';
    size?: 'extraSmall' | 'small' | 'base' | 'large' | 'extraLarge';
    isLoading?: boolean;
    onlyIcon?: boolean;
    disabled?: boolean;
    className?: string;
    classNameContainer?: string;
    classNameLoadingIcon?: string;
    children?: ReactNode;
};

export type ButtonProps = Omit<ComponentProps<'button'>, keyof ButtonOwnerProps> & ButtonOwnerProps;

export function Button(props: ButtonProps) {
    const {
        theme,
        size,
        className,
        classNameContainer,
        classNameLoadingIcon,
        isLoading,
        children,
        disabled,
        onClick,
        onlyIcon,
        ...otherProps
    } = props;

    const classNameButton = classNames(
        className,
        button({
            theme: theme,
            size: size,
            disabled: disabled,
            isLoading: isLoading,
            onlyIcon: onlyIcon,
        }),
    );

    const classNameLoading = classNames(classNameLoadingIcon, buttonLoadingIcon({ theme: theme }));

    const classNameContent = classNames(classNameContainer, 'flex h-full items-center justify-center', {
        'opacity-0': isLoading,
    });

    return (
        <button {...otherProps} disabled={disabled} onClick={onClick} className={classNameButton}>
            <div className={classNameContent}>{children}</div>
            {isLoading && (
                <div className={'absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4'}>
                    <AiOutlineLoading className={classNameLoading} />
                </div>
            )}
        </button>
    );
}
