import classNames from "classnames";
import { Dayjs } from "dayjs";
import { useCallback } from "react";

const item = [
    {
        label: "Янв",
        value: 0,
    },
    {
        label: "Фев",
        value: 1,
    },
    {
        label: "Мар",
        value: 2,
    },
    {
        label: "Апр",
        value: 3,
    },
    {
        label: "Май",
        value: 4,
    },
    {
        label: "Июн",
        value: 5,
    },
    {
        label: "Июл",
        value: 6,
    },
    {
        label: "Авг",
        value: 7,
    },
    {
        label: "Сен",
        value: 8,
    },
    {
        label: "Окт",
        value: 9,
    },
    {
        label: "Ноя",
        value: 10,
    },
    {
        label: "Дек",
        value: 11,
    },
];

interface MonthGridProps {
    onSelect: (month: number) => void;
    value?: Dayjs;
}

export function MonthGrid({ onSelect, value }: MonthGridProps) {
    const onClick = useCallback((month: number) => () => onSelect(month), [onSelect]);

    return (
        <div className={"grid grid-cols-4"}>
            {item.map((item) => {
                const isActive = item.value === value?.month();
                const className = classNames(
                    "items-center flex justify-center hover:bg-gray-20 h-[50px] font-light text-gray-1000 ",
                    isActive ? "font-normal bg-gray-20" : "",
                );

                return (
                    <button key={item.value} onClick={onClick(item.value)} className={className} type="button">
                        {item.label}
                    </button>
                );
            })}
        </div>
    );
}
