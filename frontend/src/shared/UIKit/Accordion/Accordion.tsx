import { AccordionContext } from "@/shared/UIKit/Accordion/AccordionContext";
import classNames from "classnames";
import { ComponentProps, useCallback, useState } from "react";

export interface AccordionOwnProps {
    type?: "single" | "multiple";
    onSelect?: (value?: string) => void;
    className?: string;
}

export type AccordionProps = Omit<ComponentProps<"div">, keyof AccordionOwnProps> & AccordionOwnProps;

export function Accordion({ type = "single", className, onSelect, ...props }: AccordionProps) {
    const [value, setValue] = useState<Record<string, boolean>>({});

    const onChange = useCallback(
        (value?: string) => {
            // if value is undefined -> reset value
            if (value === undefined) {
                setValue({});
            } else {
                // if type is 'single' -> set value with one key
                // if type is 'multiple' -> set value with prev keys
                if (type === "single") {
                    setValue((prev) => ({
                        [value]: !prev[value],
                    }));
                } else if (type === "multiple") {
                    setValue((prev) => ({
                        ...prev,
                        [value]: !prev[value],
                    }));
                }
            }
            onSelect?.(value);
        },
        [type, onSelect],
    );

    return (
        <AccordionContext.Provider
            value={{
                value: value,
                onChange: onChange,
            }}
        >
            <div className={classNames("flex flex-col", className)} {...props} />
        </AccordionContext.Provider>
    );
}
