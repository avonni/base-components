import { LightningElement, api } from 'lwc';
import { normalizeString } from 'c/utilsPrivate';

const DATA_TYPES = {
    valid: [
        'boolean',
        'currency',
        'date',
        'email',
        'location',
        'number',
        'percent',
        'phone',
        'text',
        'url'
    ],
    default: 'text'
};

export default class OutputData extends LightningElement {
    @api label;

    _typeAttributes = {};
    _type = DATA_TYPES.default;
    _value;

    @api
    get typeAttributes() {
        return this._typeAttributes;
    }
    set typeAttributes(value) {
        this._typeAttributes = typeof value === 'object' ? value : {};
    }

    @api
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = normalizeString(value, {
            fallbackValue: DATA_TYPES.default,
            validValues: DATA_TYPES.valid
        });
    }

    @api
    get value() {
        if (this.isBoolean) {
            return this._value === 'true' || this._value;
        }

        return this._value;
    }
    set value(value) {
        this._value = value;
    }

    get isBoolean() {
        return this.type === 'boolean';
    }

    get isDate() {
        return this.type === 'date';
    }

    get isEmail() {
        return this.type === 'email';
    }

    get isLocation() {
        return this.type === 'location';
    }

    get isNumber() {
        return (
            this.type === 'number' ||
            this.type === 'percent' ||
            this.type === 'currency'
        );
    }

    get isPhone() {
        return this.type === 'phone';
    }

    get isText() {
        return this.type === 'text';
    }

    get isUrl() {
        return this.type === 'url';
    }

    get numberFormatStyle() {
        if (this.type === 'currency' || this.type === 'percent') {
            return this.type;
        }
        return 'decimal';
    }

    get showBoolean() {
        return this.isBoolean && this.value;
    }
}
