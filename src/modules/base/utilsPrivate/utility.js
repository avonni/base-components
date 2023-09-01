

export function deepCopy(obj) {
    if (Object(obj) !== obj) {
        return obj;
    }
    if (obj instanceof Set) {
        return new Set(obj);
    }
    if (obj instanceof Date) {
        return new Date(obj);
    }
    if (typeof obj === 'function') {
        return obj.bind({});
    }
    if (Array.isArray(obj)) {
        const obj2 = [];
        const len = obj.length;
        for (let i = 0; i < len; i++) {
            obj2.push(deepCopy(obj[i]));
        }
        return obj2;
    }
    const result = Object.create({});
    let keys = Object.keys(obj);
    if (obj instanceof Error) {
        keys = Object.getOwnPropertyNames(obj);
    }

    const len = keys.length;
    for (let i = 0; i < len; i++) {
        const key = keys[i];
        result[key] = deepCopy(obj[key]);
    }
    return result;
}

export function arraysEqual(array1, array2) {
    if (!array1 || !array2) {
        return false;
    }

    if (array1.length !== array2.length) {
        return false;
    }

    for (let index = 0; index < array1.length; index++) {
        if (array1[index] instanceof Array && array2[index] instanceof Array) {
            if (!arraysEqual(array1[index], array2[index])) {
                return false;
            }
        } else if (array1[index] !== array2[index]) {
            return false;
        }
    }

    return true;
}

export const ArraySlice = Array.prototype.slice;

/**
 * Check if the two arguments have the same content, even if they are different objects.
 *
 * @param {any} first First argument to compare.
 * @param {any} second Second argument to compare.
 * @returns {boolean} True if the two arguments are equal, false otherwise.
 */
export function equal(first, second) {
    let normalizedFirst = first;
    let normalizedSecond = second;

    if (first instanceof RegExp) {
        normalizedFirst = first.source;
    } else if (first instanceof Object) {
        normalizedFirst = JSON.stringify(first);
    }
    if (second instanceof RegExp) {
        normalizedSecond = second.source;
    } else if (second instanceof Object) {
        normalizedSecond = JSON.stringify(second);
    }

    return normalizedFirst === normalizedSecond;
}
