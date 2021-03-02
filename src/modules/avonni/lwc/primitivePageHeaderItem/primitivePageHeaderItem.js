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

export default class PrimitivePageHeaderItem extends LightningElement {
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
        console.log(this.isText);
        console.log(this.typeAttribute0);
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
        return typeName === this.type;
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

    get isChecked() {
        return !!this.value;
    }
}
