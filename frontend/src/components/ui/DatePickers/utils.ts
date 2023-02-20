export function dateToFullString(date: Date): string {
    return `${dateGetDayString(date)}.${dateGetMonthString(date)}.${date.getFullYear()}`;
}

export function dateGetMonthString(date: Date): string {
    return date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
}

export function dateGetDayString(date: Date): string {
    return date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
}

export function dateIs(date1: Date | null, date2: Date | null): boolean {
    return (
        date1?.getFullYear() === date2?.getFullYear() &&
        date1?.getMonth() === date2?.getMonth() &&
        date1?.getDate() === date2?.getDate()
    );
}
