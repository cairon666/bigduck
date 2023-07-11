import { Dayjs } from "dayjs";

export type DatePickerAdapter = (date: Dayjs | undefined) => string | undefined;

export const DDMMYYYYWithDot: DatePickerAdapter = (date) => {
    if (!date) return undefined;

    return date.format("DD.MM.YYYY");
};
