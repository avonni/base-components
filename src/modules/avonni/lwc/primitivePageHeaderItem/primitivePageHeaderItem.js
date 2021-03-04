import { LightningElement, api } from 'lwc';
import { normalizeString, assert } from 'c/utilsPrivate';

const TYPES = {
    valid: [
        'text',
        'boolean',
        'currency',
        'date',
        'email',
        'number',
        'percent',
        'phone',
        'url',
        'location'
    ],
    default: 'text'
};

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
    email: ['hideIcon'],
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

export default class PrimitivePageHeaderItem extends LightningElement {
    @api item;
    @api label;
    @api value;
    @api typeAttribute0;
    @api typeAttribute1;
    @api typeAttribute2;
    @api typeAttribute3;
    @api typeAttribute4;
    @api typeAttribute5;
    @api typeAttribute6;
    @api typeAttribute7;
    @api typeAttribute8;
    @api typeAttribute9;
    @api typeAttribute10;

    _type = 'text';
    computedTypeAttribute;

    connectedCallback() {
        this.computedTypeAttribute = this.computeItemTypeAttributes(this.item);
    }

    @api
    get type() {
        return this._type;
    }

    set type(type) {
        this._type = normalizeString(type, {
            fallbackValue: TYPES.default,
            validValues: TYPES.valid
        });
    }

    isType(typeName) {
        return typeName === this._type;
    }

    get isText() {
        return this.isType('text');
    }

    get isNumber() {
        return this.isType('number');
    }

    get isCurrency() {
        return this.isType('currency');
    }

    get isPercent() {
        return this.isType('percent');
    }

    get isEmail() {
        return this.isType('email');
    }

    get isDateTime() {
        return this.isType('date');
    }

    get isPhone() {
        return this.isType('phone');
    }

    get isUrl() {
        return this.isType('url');
    }

    get isLocation() {
        return this.isType('location');
    }

    get isBoolean() {
        return this.isType('boolean');
    }

    // from primitiveCellFactory.js
    get urlTarget() {
        return this.typeAttribute1 || '_self';
    }

    get urlTooltip() {
        if (this.typeAttribute2 === '') {
            return '';
        }
        return this.typeAttribute2 || this.value;
    }

    get isChecked() {
        return !!this.value;
    }

    get dateValue() {
        if (this.value === null) {
            return '';
        }
        return new Date(this.value);
    }

    isObjectLike(value) {
        return typeof value === 'object' && value !== null;
    }

    // gives an object of all the diffent typeAttributes for a chosen Item
    getTypeAttributesValues(item) {
        if (this.isObjectLike(item.typeAttributes)) {
            return item.typeAttributes;
        }
        return {};
    }

    // gives an array of all the possible typeAttributes of a certain type from type.js
    isValidType(typeName) {
        return !!STANDARD_TYPES[typeName];
    }

    getAttributesNames(typeName) {
        assert(
            this.isValidType(typeName),
            `your are trying to access an invalid type (${typeName})`
        );

        return Array.isArray(STANDARD_TYPES[typeName])
            ? STANDARD_TYPES[typeName]
            : [];
    }

    computeItemTypeAttributes(item) {
        const attributesNames = this.getAttributesNames(item.type);
        const typeAttributesValues = this.getTypeAttributesValues(item);

        return attributesNames.reduce((attrs, attrName, index) => {
            const typeAttributeName = `typeAttribute${index}`;
            attrs[typeAttributeName] = typeAttributesValues[attrName];
            Object.keys(attrs).forEach((key) => {
                if (attrs[key] === undefined) {
                    delete attrs[key];
                }
            });
            return attrs;
        }, {});
    }
}
