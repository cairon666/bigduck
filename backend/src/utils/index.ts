export function fromStringToBool(value: string | undefined | null): boolean {
    return value === "true" || value === "t";
}