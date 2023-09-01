

import { LightningElement, api } from 'lwc';
import {
    normalizeBoolean,
    normalizeString,
    normalizeObject,
    deepCopy
} from 'c/utilsPrivate';

import { classSet } from 'c/utils';

const CHIP_VARIANTS = {
    valid: [
        'alt-inverse',
        'base',
        'brand',
        'error',
        'info',
        'inverse',
        'offline',
        'success',
        'warning'
    ],
    default: 'base'
};

const MEDIA_POSITION = {
    valid: ['left', 'right'],
    default: 'left'
};

export default class PrimitiveChip extends LightningElement {
    /**
     * Label displayed in the chip.
     *
     * @public
     * @type {string}
     */
    @api label;

    /**
     * Name to identify the chip.
     *
     * @public
     * @type {string}
     */
    @api name;

    _outline = false;
    _variant = CHIP_VARIANTS.default;
    _avatar = {};
    _position = MEDIA_POSITION.default;
    _prefixIconName = undefined;
    _suffixIconName = undefined;
    _hidden = false;

    /**
     *  The avatar to display. Set to null by default
     *  @public
     *  @type {Object}
     *  @default null
     */
    @api
    get avatar() {
        return this._avatar;
    }
    set avatar(value) {
        if (value) {
            const tempAvatar = deepCopy(normalizeObject(value));
            this._avatar = tempAvatar;
        } else {
            this._avatar = null;
        }
    }

    @api
    get hidden() {
        return this._hidden;
    }
    set hidden(value) {
        this._hidden = normalizeBoolean(value);
    }

    /**
     * If true, display an outline style button.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get outline() {
        return this._outline;
    }
    set outline(hasOutline) {
        this._outline = normalizeBoolean(hasOutline);
    }

    /** The prefix name of the icon to display.
     *  @public
     *  @type {string}
     *  @default x-small
     */
    @api
    get prefixIconName() {
        return this._prefixIconName;
    }
    set prefixIconName(value) {
        this._prefixIconName = value;
    }

    /** The suffix name of the icon to display.
     *  @public
     *  @type {string}
     *  @default x-small
     */
    @api
    get suffixIconName() {
        return this._suffixIconName;
    }
    set suffixIconName(value) {
        this._suffixIconName = value;
    }

    /**
     * The variant changes the appearance of the chip. Accepted variants include base, brand, inverse, alt-inverse, success, info, warning, error, offline.
     *
     * @public
     * @type {string}
     * @default base
     */
    @api
    get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: CHIP_VARIANTS.default,
            validValues: CHIP_VARIANTS.valid
        });
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     *  Computed class for chip.
     */
    get computedChipClass() {
        return classSet('').add({
            'slds-is-collapsed': this._hidden
        });
    }

    get showAvatar() {
        return this._avatar;
    }

    /**
     *  If left icon media is to be shown.
     */
    get showAvatarLeft() {
        return this.showAvatar && this._avatar.position !== 'right';
    }
}
