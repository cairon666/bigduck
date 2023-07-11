export function mapRecord<Type, NewType>(
    old: Record<string, Type>,
    f: (key: string, value: Type) => NewType,
): Record<string, NewType> {
    const newRec: Record<string, NewType> = {};

    for (const [key, value] of Object.entries(old)) {
        newRec[key] = f(key, value);
    }

    return newRec;
}
