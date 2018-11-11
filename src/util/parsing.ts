/**
 * Return value as number is cast is possible, otherwise returns undefined
 * @param value The string to cast
 */
export function asNumber(value: string | number | undefined | null): number | undefined {
    if (value === null || value === undefined) {
        return undefined;
    }
    const asNum = Number(value.toString());
    return isNaN(asNum) ? undefined : asNum;
}

/**
 * Returns true if value is `true` or `false`
 * @param value The value to test
 */
export function isBoolean(value: boolean | undefined | null): value is boolean {
    return value === true || value === false;
}
