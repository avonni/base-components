import { assert } from 'c/utilsPrivate';

const STANDARD_TYPES = {
    text: ['linkify'],
    boolean: true,
    number: [
        'minimumIntegerDigits',
        'minimumFractionDigits',
        'maximumFractionDigits',
        'minimumSignificantDigits',
        'maximumSignificantDigits'
    ],
    currency: [
        'currencyCode',
        'currencyDisplayAs',
        'minimumIntegerDigits',
        'minimumFractionDigits',
        'maximumFractionDigits',
        'minimumSignificantDigits',
        'maximumSignificantDigits'
    ],
    percent: [
        'minimumIntegerDigits',
        'minimumFractionDigits',
        'maximumFractionDigits',
        'minimumSignificantDigits',
        'maximumSignificantDigits'
    ],
    email: true,
    date: [
        'day',
        'era',
        'hour',
        'hour12',
        'minute',
        'month',
        'second',
        'timeZone',
        'timeZoneName',
        'weekday',
        'year'
    ],
    phone: true,
    url: ['label', 'target', 'tooltip'],
    location: true
};

export function isValidType(typeName) {
    return !!STANDARD_TYPES[typeName];
}

export function getAttributesNames(typeName) {
    assert(
        isValidType(typeName),
        `your are trying to access an invalid type (${typeName})`
    );

    return Array.isArray(STANDARD_TYPES[typeName])
        ? STANDARD_TYPES[typeName]
        : [];
}

function getStandardTypeAttributesNames(typeName) {
    return Array.isArray(STANDARD_TYPES[typeName])
        ? STANDARD_TYPES[typeName]
        : [];
}

export default class DatatableTypes {
    privateCustomTypes = {};

    constructor(types) {
        if (typeof types === 'object' && types !== null) {
            Object.keys(types).reduce((seed, key) => {
                const { template, typeAttributes = [] } = types[key];
                seed[key] = {
                    template,
                    typeAttributes
                };
                return seed;
            }, this.privateCustomTypes);
        }
    }

    getType(typeName) {
        if (this.privateCustomTypes[typeName]) {
            return this.privateCustomTypes[typeName];
        }
        if (STANDARD_TYPES[typeName]) {
            return {
                typeAttributes: getStandardTypeAttributesNames(typeName),
                type: 'standard'
            };
        }
        return undefined;
    }

    isValidType(typeName) {
        return !!this.getType(typeName);
    }
}
