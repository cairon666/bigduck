import { AccordionContext } from "@/shared/UIKit/Accordion/AccordionContext";
import classNames from "classnames";
import { ComponentProps, ReactNode, useCallback, useContext, useEffect } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

import style from "./AccordionItem.module.scss";

export interface AccordionItemOwnProps {
    className?: string;
    isInit?: boolean;
    left?: ReactNode;
    title: ReactNode;
    children?: ReactNode;
    value: string;
    theme?: "default" | "flush";
}

export type AccordionItemProps = Omit<ComponentProps<"div">, keyof AccordionItemOwnProps> & AccordionItemOwnProps;

export function AccordionItem({
    left,
    title,
    className,
    value: valueProps,
    isInit,
    children,
    theme = "default",
    ...props
}: AccordionItemProps) {
    const { value, onChange } = useContext(AccordionContext);

    // for init value
    useEffect(() => {
        if (value) return;

        if (isInit) onChange(valueProps);
    }, []);

    const onClick = useCallback(() => {
        onChange(valueProps);
    }, [valueProps]);

    const isActive = value[valueProps] !== undefined ? value[valueProps] : false;

    const wrapperClassName = classNames(style.wrapper, {
        [style.active]: isActive,
        [style.default]: theme === "default",
        [style.flush]: theme === "flush",
    });

    return (
        <div className={wrapperClassName} {...props}>
            <button type={"button"} className={style.button} onClick={onClick}>
                <p className={style.header}>
                    {left}
                    <span className={style.title}>{title}</span>
                </p>
                {isActive ? (
                    <RiArrowDownSLine className={style.rightIcon} />
                ) : (
                    <RiArrowUpSLine className={style.rightIcon} />
                )}
            </button>
            {isActive && <div className={style.content}>{children}</div>}
        </div>
    );
}
