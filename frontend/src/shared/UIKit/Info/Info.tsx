import classNames from "classnames";
import { ComponentProps, ElementType } from "react";

type InfoOwnProps<E extends ElementType> = {
    as?: E;
    className?: string;
    type?: "warn" | "danger" | "default";
};

type InfoProps<E extends ElementType> = InfoOwnProps<E> & Omit<ComponentProps<E>, keyof InfoOwnProps<E>>;

const defaultElement = "div";

export function Info<E extends ElementType = typeof defaultElement>({
    as,
    className,
    type = "default",
    ...otherProps
}: InfoProps<E>) {
    const TagName = as || defaultElement;
    const cs = classNames(
        className,
        "rounded-md p-2 text-center text-xs text-gray-800",
        type === "warn" ? "bg-yellow-200" : "",
        type === "danger" ? "bg-red-200" : "",
        type === "default" ? "bg-gray-200" : "",
    );

    return <TagName className={cs} {...otherProps} />;
}
