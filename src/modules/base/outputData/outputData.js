import { classSet, normalizeBoolean, normalizeString } from 'c/utils';
import { LightningElement, api } from 'lwc';
import {
    SUPPORTED_TYPE_ATTRIBUTES,
    TYPES,
    TYPE_ATTRIBUTES,
    VARIANTS
} from './constants';

/**
 * The output data displays data depending on its type.
 *
 * @class
 * @descriptor avonni-output-data
 * @storyId example-output-data--base
 * @public
 */
export default class OutputData extends LightningElement {
    /**
     * Label of the output. If present, it will be displayed on top of the data.
     *
     * @type {string}
     * @public
     */
    @api label;

    _type = TYPES.default;
    _typeAttributes = {};
    _value;
    _variant = VARIANTS.default;

    _connected = false;
    normalizedTypeAttributes = {};

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this.normalizeTypeAttributes();
        this._connected = true;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Type of the output. Valid types include boolean, currency, date, email, location, number, percent, phone, url and text.
     *
     * @type {string}
     * @public
     */
    @api
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = normalizeString(value, {
            fallbackValue: TYPES.default,
            validValues: TYPES.valid
        });

        if (this._connected) this.normalizeTypeAttributes();
    }

    /**
     * Attributes specific to the type (see <strong>Types and Type Attributes</strong>).
     *
     * @type {object}
     * @public
     */
    @api
    get typeAttributes() {
        return this._typeAttributes;
    }
    set typeAttributes(value) {
        this._typeAttributes = typeof value === 'object' ? value : {};

        if (this._connected) this.normalizeTypeAttributes();
    }

    /**
     * Value of the output.
     *
     * @type {string}
     * @public
     */
    @api
    get value() {
        if (this.isBoolean) {
            return this._value === 'true' || this._value;
        }
        if (this.isNumber) {
            return this.truncateNumber(this._value);
        }

        return this._value;
    }
    set value(value) {
        this._value = value;
    }

    /**
     * The variant changes the appearance of an input field. Accepted variants include standard, label-inline, label-hidden, and label-stacked.
     * This value defaults to standard, which displays the label above the field. Use label-hidden to hide the label but make it available to assistive technology. Use label-inline to horizontally align the label and input field. Use label-stacked to place the label above the input field.
     *
     * @type {string}
     * @public
     */
    @api
    get variant() {
        return this._variant;
    }
    set variant(value) {
        this._variant = normalizeString(value, {
            fallbackValue: VARIANTS.default,
            validValues: VARIANTS.valid
        });
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Computed class of label.
     *
     * @type {string}
     */
    get computedLabelClass() {
        return classSet(
            'avonni-output-data__label slds-item_label slds-truncate'
        )
            .add({
                'slds-assistive-text': this.variant === 'label-hidden',
                'slds-p-right_small avonni-output-data__label_inline':
                    this.variant === 'label-inline'
            })
            .toString();
    }

    /**
     * Computed class of the output wrapper.
     *
     * @type {string}
     */
    get computedWrapperClass() {
        return classSet()
            .add({
                'slds-list_stacked':
                    this.variant === 'label-stacked' ||
                    this.variant === 'standard',
                'slds-list_horizontal slds-wrap':
                    this.variant === 'label-inline'
            })
            .toString();
    }

    /**
     * True if the type is boolean.
     *
     * @type {boolean}
     */
    get isBoolean() {
        return this.type === 'boolean';
    }

    /**
     * True if the type is date.
     *
     * @type {boolean}
     */
    get isDate() {
        return this.type === 'date';
    }

    /**
     * True if the type is email.
     *
     * @type {boolean}
     */
    get isEmail() {
        return this.type === 'email';
    }

    /**
     * True if the type is location.
     *
     * @type {boolean}
     */
    get isLocation() {
        return this.type === 'location';
    }

    /**
     * True if the type is number, percent or currency.
     *
     * @type {boolean}
     */
    get isNumber() {
        return (
            this.type === 'number' ||
            this.type === 'percent' ||
            this.type === 'currency'
        );
    }

    /**
     * True if the type is phone.
     *
     * @type {boolean}
     */
    get isPhone() {
        return this.type === 'phone';
    }

    /**
     * True if the type is text.
     *
     * @type {boolean}
     */
    get isText() {
        return this.type === 'text';
    }

    /**
     * True if the type is url.
     *
     * @type {boolean}
     */
    get isUrl() {
        return this.type === 'url';
    }

    /**
     * Format of the number type.
     *
     * @type {boolean}
     */
    get numberFormatStyle() {
        if (this.type === 'currency' || this.type === 'percent') {
            return this.type;
        }
        return 'decimal';
    }

    /**
     * Check if label should be displayed or not.
     *
     * @type {boolean}
     */
    get shouldDisplayLabel() {
        return this.label && this.variant !== 'label-hidden';
    }

    /**
     * True if the type is boolean and the value is truthy.
     *
     * @type {boolean}
     */
    get showBoolean() {
        return this.isBoolean && this.value;
    }

    /**
     * True if the value is empty. Explicitely set to null or undefined.
     *
     * @type {boolean}
     */
    get showEmptyValue() {
        if (this.isLocation) {
            return (
                !this.typeAttributes.latitude && !this.typeAttributes.longitude
            );
        }
        return this._value === null || this._value === undefined;
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Normalize the type attributes, to remove the invalid and unsupported attributes.
     */
    normalizeTypeAttributes() {
        const typeAttributes = Object.entries(this.typeAttributes);
        if (!typeAttributes.length) {
            this.normalizedTypeAttributes = {};
            return;
        }

        const normalizedTypeAttributes = {};
        for (let i = 0; i < typeAttributes.length; i++) {
            // Check if the attribute is valid for the type
            const [key, value] = typeAttributes[i];
            const allowedAttribute =
                SUPPORTED_TYPE_ATTRIBUTES[this.type] &&
                SUPPORTED_TYPE_ATTRIBUTES[this.type].includes(key);
            const hasValue = value !== undefined && value !== null;
            if (!allowedAttribute || !hasValue) continue;

            // Check if the value type is valid
            const definition = TYPE_ATTRIBUTES.find(
                (attr) => attr.name === key
            );

            let normalizedValue = value;
            if (definition.type === 'string' && definition.valid) {
                // Normalize string attributes
                normalizedValue = normalizeString(value, {
                    fallbackValue: definition.default,
                    validValues: definition.valid
                });
                if (!normalizedValue) continue;
            } else if (
                definition.type === 'string' &&
                typeof normalizedValue !== 'string'
            ) {
                continue;
            } else if (definition.type === 'number') {
                // Normalize number attributes
                normalizedValue = Number(value);
                if (isNaN(normalizedValue)) continue;
            } else if (definition.type === 'boolean') {
                // Normalize boolean attributes
                normalizedValue = normalizeBoolean(value);
            }

            normalizedTypeAttributes[key] = normalizedValue;
        }

        if (this.isText) {
            normalizedTypeAttributes.disableLinkify =
                !normalizedTypeAttributes.linkify;
        }

        this.normalizedTypeAttributes = normalizedTypeAttributes;
    }

    /**
     *
     * Truncates a number to handle floatting point errors (4.500000000000000003 for example)
     * @param {number} num Number to truncate
     */
    truncateNumber(num) {
        return Math.round(num * 1e6) / 1e6;
    }
}
