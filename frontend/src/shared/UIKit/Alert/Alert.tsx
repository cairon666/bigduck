import { variants } from "classname-variants";
import classNames from "classnames";
import { ComponentProps } from "react";

export interface AlertOwnProps {
    theme?: "info" | "danger" | "success" | "warning" | "dark";
    className?: string;
}

export type AlertProps = Omit<ComponentProps<"div">, keyof AlertOwnProps> & AlertOwnProps;

const alertVariants = variants({
    base: "flex items-center p-4 text-sm border rounded-lg",
    variants: {
        theme: {
            info: "text-blue-800 border-blue-600 bg-blue-100",
            danger: "text-red-800 border-red-600 bg-red-200",
            success: "text-green-800 border-green-600 bg-green-200",
            warning: "text-yellow-800 border-yellow-600 bg-yellow-100",
            dark: "text-gray_green-800 border-gray_green-600 bg-gray_green-200",
        },
    },
    defaultVariants: {
        theme: "info",
    },
});

export const Alert = ({ theme, className, ...props }: AlertProps) => {
    const alertClassName = classNames(className, alertVariants({ theme }));

    return <div className={alertClassName} {...props} />;
};
