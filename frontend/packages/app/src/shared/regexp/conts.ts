export const CodeRegExp = /^[0-9]{4}$/;

export function isCode(value: string): boolean {
    return value.length === 4 && CodeRegExp.test(value);
}
