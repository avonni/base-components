import { LightningElement, api } from 'lwc';
import { normalizeString } from 'c/utilsPrivate';

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

    connectedCallback() {
        console.log(this.type);
        console.log(this.getType(this.typeAttribute0));
        console.log(this.item.typeAttributes);
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

    get computedDateLocalDay() {
        return this.typeAttribute0 || 'numeric';
    }

    get computedDateLocalMonth() {
        return this.typeAttribute1 || 'short';
    }

    get computedDateLocalYear() {
        return this.typeAttribute2 || 'numeric';
    }

    // from columns.js
    isObjectLike(value) {
        return typeof value === 'object' && value !== null;
    }

    getTypeAttributesValues(item) {
        if (this.isObjectLike(item.typeAttributes)) {
            return item.typeAttributes;
        }
        return {};
    }

    getSubTypeAttributesValues(item) {
        if (this.isObjectLike(item.typeAttributes.subTypeAttributes)) {
            return item.typeAttributes.subTypeAttributes;
        }
        return {};
    }

    // from types.js
    getTypeAttributesNames(typeName) {
        return Array.isArray(STANDARD_TYPES[typeName])
            ? STANDARD_TYPES[typeName]
            : [];
    }

    getType(typeName) {
        if (STANDARD_TYPES[typeName]) {
            return {
                typeAttributes: this.getTypeAttributesNames(typeName)
            };
        }
        return undefined;
    }
}
