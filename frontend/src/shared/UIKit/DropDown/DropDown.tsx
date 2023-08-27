import { useModal } from '@/shared/hooks';
import { Button, ButtonProps } from '@/shared/UIKit';
import { ReactNode } from 'react';

export interface DropDownOwnProps {
    buttonProps: ButtonProps;
    children?: ReactNode;
    type?: 'click' | 'hover';
}

export function DropDown({ buttonProps, children, type }: DropDownOwnProps) {
    const { isOpen, onOpen, onClose } = useModal();

    return (
        <div className={'relative'}>
            <Button {...buttonProps} />
        </div>
    );
}
