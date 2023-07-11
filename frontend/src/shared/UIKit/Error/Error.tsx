import classNames from "classnames";
import { ReactNode } from "react";

export interface ErrorProps {
    children?: ReactNode;
    className?: string;
}

export function Error({ children, className }: ErrorProps) {
    return children ? (
        <p className={classNames("mt-1 text-xs font-normal leading-3 text-red-800", className)}>{children}</p>
    ) : null;
}
