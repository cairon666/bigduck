import dayjs, { Dayjs } from "dayjs";
import { createContext } from "react";

export interface DatePickerContextType {
    // date that be display in input
    chooseDate: Dayjs | undefined;
    setChooseDate: (f: (prev: Dayjs | undefined) => Dayjs | undefined) => void;
    // date that manage choose date panels
    currentDate: Dayjs;
    setCurrentDate: (f: (prev: Dayjs) => Dayjs) => void;
    minDate?: Dayjs;
    maxDate?: Dayjs;
    close: () => void;
}

export const DatePickerContext = createContext<DatePickerContextType>({
    chooseDate: undefined,
    setChooseDate: () => undefined,
    currentDate: dayjs(),
    setCurrentDate: () => undefined,
    close: () => undefined,
});
