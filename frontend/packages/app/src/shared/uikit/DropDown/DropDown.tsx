import { ReactNode } from 'react';
import { useModal } from '@shared/hooks';
import { Button, ButtonProps } from '@shared/uikit';

export interface DropDownOwnProps {
    buttonProps: ButtonProps;
    children?: ReactNode;
    type?: 'click' | 'hover';
}

export function DropDown({ buttonProps, children, type }: DropDownOwnProps) {
    const { isOpen, onOpen, onClose } = useModal();

    return (
        <div className="relative">
            <Button {...buttonProps} />
        </div>
    );
}
