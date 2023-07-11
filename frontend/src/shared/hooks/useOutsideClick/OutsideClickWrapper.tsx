import { ComponentProps, useRef } from "react";

import { useOnClickOutside } from "../index";

interface OutsideClickWrapperOwnProps {
    onOutsideClick: () => void;
}

export type OutsideClickWrapperProps = Omit<ComponentProps<"div">, keyof OutsideClickWrapperOwnProps> &
    OutsideClickWrapperOwnProps;

export function OutsideClickWrapper({ onOutsideClick, ...props }: OutsideClickWrapperProps) {
    const ref = useRef<HTMLDivElement | null>(null);

    useOnClickOutside(ref, onOutsideClick);

    return <div ref={ref} {...props} />;
}
