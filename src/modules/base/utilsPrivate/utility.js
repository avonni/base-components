function _mapsEqual(map1, map2) {
    if (map1.size !== map2.size) {
        return false;
    }
    for (let [key, value] of map1) {
        if (!map2.has(key) || !equal(value, map2.get(key))) {
            return false;
        }
    }
    return true;
}

function _setsEqual(set1, set2) {
    if (set1.size !== set2.size) {
        return false;
    }
    for (let item of set1) {
        if (![...set2].some((x) => equal(item, x))) {
            return false;
        }
    }
    return true;
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
        } else if (!equal(array1[index], array2[index])) {
            return false;
        }
    }

    return true;
}

export const ArraySlice = Array.prototype.slice;

export function objectsEqual(object1, object2) {
    const firstKeys = Object.keys(object1);
    const secondKeys = Object.keys(object2);

    if (firstKeys.length !== secondKeys.length) {
        return false;
    }

    for (let index = 0; index < firstKeys.length; index++) {
        const key = firstKeys[index];

        if (!equal(object1[key], object2[key])) {
            return false;
        }
    }
    return true;
}

/**
 * Check if the two arguments have the same content, even if they are different objects.
 *
 * @param {any} first First argument to compare.
 * @param {any} second Second argument to compare.
 * @returns {boolean} True if the two arguments are equal, false otherwise.
 */
export function equal(first, second) {
    const notSameType = typeof first !== typeof second;
    const arrays = Array.isArray(first) && Array.isArray(second);
    const maps = first instanceof Map && second instanceof Map;
    const sets = first instanceof Set && second instanceof Set;
    const regexp = first instanceof RegExp && second instanceof RegExp;
    const dates = first instanceof Date && second instanceof Date;
    const objects =
        first && second && first instanceof Object && second instanceof Object;

    if (first === second) {
        return true;
    } else if (notSameType) {
        return false;
    } else if (dates) {
        return first.getTime() === second.getTime();
    } else if (arrays) {
        return arraysEqual(first, second);
    } else if (maps) {
        return _mapsEqual(first, second);
    } else if (sets) {
        return _setsEqual(first, second);
    } else if (regexp) {
        return first.source === second.source;
    } else if (objects) {
        return objectsEqual(first, second);
    }
    return false;
}
