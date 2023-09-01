

import { deepCopy } from './utility';

export function normalizeString(value, config = {}) {
    const { fallbackValue = '', validValues, toLowerCase = true } = config;
    let normalized = (typeof value === 'string' && value.trim()) || '';
    normalized = toLowerCase ? normalized.toLowerCase() : normalized;
    if (validValues && validValues.indexOf(normalized) === -1) {
        normalized = fallbackValue;
    }
    return normalized;
}

export function normalizeBoolean(value) {
    return typeof value === 'string' || !!value;
}

/**
 * Normalize a given value into an array.
 *
 * @param {any} value Value that should be an array.
 * @param {string} entryType Type of the array entries. Valid values inclue string, number, boolean and object. If given, only the entries of the correct type will be left in the array.
 * @returns {any[]} Normalized array.
 */
export function normalizeArray(value, entryType) {
    if (Array.isArray(value)) {
        switch (entryType) {
            case 'string':
                return value.filter((entry) => normalizeString(entry));
            case 'boolean':
                return value.map((entry) => normalizeBoolean(entry));
            case 'number': {
                const numbers = [];
                value.forEach((entry) => {
                    const number = Number(entry);
                    if (!isNaN(number)) {
                        numbers.push(number);
                    }
                });
                return numbers;
            }
            case 'object':
                return value.filter((entry) => {
                    const object = normalizeObject(entry);
                    return Object.keys(object).length || entry === object;
                });
            default:
                break;
        }
        return value;
    }
    return [];
}

export function normalizeAriaAttribute(value) {
    let arias = Array.isArray(value) ? value : [value];
    arias = arias
        .map((ariaValue) => {
            if (typeof ariaValue === 'string') {
                return ariaValue.replace(/\s+/g, ' ').trim();
            }
            return '';
        })
        .filter((ariaValue) => !!ariaValue);

    return arias.length > 0 ? arias.join(' ') : null;
}

export function normalizeObject(value) {
    // Make sure the value is a regular object, and not a class instance
    const normalizedValue = deepCopy(value);
    if (normalizedValue && normalizedValue.constructor === Object) {
        return value;
    }
    return {};
}
