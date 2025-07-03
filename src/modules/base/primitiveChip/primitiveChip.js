import { LightningElement, api } from 'lwc';
import {
    classSet,
    normalizeBoolean,
    normalizeObject,
    normalizeString
} from 'c/utils';

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

export default class PrimitiveChip extends LightningElement {
    /**
     * The background color of the chip.
     *
     * @public
     * @type {string}
     */
    @api backgroundColor;
    /**
     * If present, the text is hidden and the chip is displayed as a colored circle.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api hideText = false;
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
    /**
     * The text color of the chip.
     *
     * @public
     * @type {string}
     */
    @api textColor;

    _avatar = {};
    _hidden = false;
    _outline = false;
    _prefixIconName = undefined;
    _suffixIconName = undefined;
    _variant = CHIP_VARIANTS.default;

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     *  The avatar to display. Set to null by default
     *
     *  @public
     *  @type {Object}
     *  @default null
     */
    @api
    get avatar() {
        return this._avatar;
    }
    set avatar(value) {
        this._avatar = value ? normalizeObject(value) : null;
    }

    /**
     * If present, the chip is hidden.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get hidden() {
        return this._hidden;
    }
    set hidden(value) {
        this._hidden = normalizeBoolean(value);
    }

    /**
     * If present, display an outline style chip.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get outline() {
        return this._outline;
    }
    set outline(outline) {
        this._outline = normalizeBoolean(outline);
    }

    /**
     * The prefix name of the icon to display.
     *
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

    /**
     * The suffix name of the icon to display.
     *
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
            'slds-is-collapsed': this.hidden
        });
    }

    /**
     * If present, the avatar is to be shown.
     */
    get showAvatar() {
        return this.avatar;
    }

    /**
     *  If left icon media is to be shown.
     */
    get showAvatarLeft() {
        return this.showAvatar && this.avatar.position !== 'right';
    }
}
