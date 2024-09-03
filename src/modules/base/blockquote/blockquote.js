import { LightningElement, api } from 'lwc';
import { classSet, normalizeString } from 'c/utils';

const BLOCKQUOTE_VARIANTS = {
    valid: ['default', 'brand', 'warning', 'error', 'success'],
    default: 'default'
};
const ICON_POSITIONS = { valid: ['left', 'right'], default: 'left' };
const ICON_SIZES = {
    valid: ['xx-small', 'x-small', 'small', 'medium', 'large'],
    default: 'small'
};

/**
 * @class
 * @name Blockquote
 * @descriptor avonni-blockquote
 * @storyId example-blockquote--base
 * @public
 */
export default class Blockquote extends LightningElement {
    /**
     * Icon displayed to the left of the title.
     *
     * @public
     * @type {string}
     */
    @api iconName;
    /**
     * The title can include text and is displayed in the header.
     *
     * @public
     * @type {string}
     */
    @api title;

    _variant = BLOCKQUOTE_VARIANTS.default;
    _iconPosition = ICON_POSITIONS.default;
    _iconSize = ICON_SIZES.default;

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Describes the position of the icon. Options include left and right.
     *
     * @public
     * @type {string}
     * @default left
     */
    @api
    get iconPosition() {
        return this._iconPosition;
    }

    set iconPosition(position) {
        this._iconPosition = normalizeString(position, {
            fallbackValue: ICON_POSITIONS.default,
            validValues: ICON_POSITIONS.valid
        });
    }

    /**
     * The size of the icon. Valid values include xx-small, x-small, small, medium, large.
     *
     * @public
     * @type {string}
     * @default small
     */
    @api
    get iconSize() {
        return this._iconSize;
    }

    set iconSize(size) {
        this._iconSize = normalizeString(size, {
            fallbackValue: ICON_SIZES.default,
            validValues: ICON_SIZES.valid
        });
    }

    /**
     * The variant changes the appearance of the blockquote. Valid values include default, brand, warning, error, success.
     *
     * @public
     * @type {string}
     * @default default
     */
    @api
    get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: BLOCKQUOTE_VARIANTS.default,
            validValues: BLOCKQUOTE_VARIANTS.valid
        });
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Compute blockquote style by variant.
     *
     * @type {string}
     */
    get blockquoteClass() {
        return classSet('avonni-blockquote__container')
            .add(`avonni-blockquote__theme-${this._variant}`)
            .toString();
    }

    /**
     * Compute blockquote header style by variant.
     *
     * @type {string}
     */
    get blockquoteHeaderClass() {
        return classSet('slds-grid slds-grid--vertical-align-center')
            .add({
                'avonni-blockquote__header-spacing':
                    this.defaultSlot?.assignedElements().length !== 0
            })
            .toString();
    }

    /**
     * Get the default slot DOM element.
     *
     * @type {Element}
     */
    get defaultSlot() {
        return this.template.querySelector(
            'slot[data-element-id="avonni-blockquote-default-slot"]'
        );
    }

    /**
     * Set icon left.
     *
     * @type {boolean}
     */
    get leftIcon() {
        return this._iconPosition === 'left' && this.iconName;
    }

    /**
     * Set icon right.
     *
     * @type {boolean}
     */
    get rightIcon() {
        return this._iconPosition === 'right' && this.iconName;
    }

    /**
     * Show header.
     *
     * @type {boolean}
     */
    get showHeader() {
        return this.iconName || this.title;
    }
}
