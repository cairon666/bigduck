import dayjs from "dayjs";
import { memo } from "react";

interface NotifyBlockProps {
    date?: Date;
    title?: string;
    description?: string;
    unviewed?: boolean;
}

export const NotifyBlock = memo(function NotifyBlock(props: NotifyBlockProps) {
    return (
        <div
            className={`w-full cursor-pointer border border-r-transparent 
                border-l-transparent border-b-transparent border-t-gray-100 
                py-2 px-4 text-sm font-light duration-75 ease-linear 
                hover:border-yellow-500`}
        >
            <h4 className={"w-full rounded font-normal"}>{props.title || ""}</h4>
            <p className={"w-full rounded line-clamp-4"}>{props.description || ""}</p>
            <div className={"flex items-center justify-between"}>
                <p className={"text-red-800"}>{props.unviewed ? "Новое" : ""}</p>
                <p className={"rounded text-xs text-gray-600"}>{props.date ? dateToString(props.date) : ""}</p>
            </div>
        </div>
    );
});

function dateToString(date: Date): string {
    return dayjs(date).format("YYYY.MM.DD");
}
