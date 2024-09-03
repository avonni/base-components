import { LightningElement, api } from 'lwc';
import { classSet, normalizeBoolean, normalizeString } from 'c/utils';

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

/**
 * @class
 * @descriptor avonni-chip
 * @storyId example-chip--info-outline
 * @public
 */
export default class Chip extends LightningElement {
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
     * @type {string}
     * @public
     */
    @api name;

    _outline = false;
    _variant = CHIP_VARIANTS.default;

    renderedCallback() {
        this.updateSlotsVisibility();
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

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

    set outline(value) {
        this._outline = normalizeBoolean(value);
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
     * Compute chip class style.
     *
     * @type {string}
     */
    get chipClass() {
        return classSet('avonni-chip')
            .add({
                'avonni-chip_outline': this._outline,
                [`avonni-chip_theme-${this._variant}`]: this._variant
            })
            .toString();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    updateSlotsVisibility() {
        const leftSlot = this.template.querySelector(
            '[data-element-id="slot-left"]'
        );
        const rightSlot = this.template.querySelector(
            '[data-element-id="slot-right"]'
        );

        if (!leftSlot || !rightSlot) {
            return;
        }
        if (leftSlot.assignedElements().length === 0) {
            leftSlot.classList.add('slds-hide');
        } else {
            leftSlot.classList.remove('slds-hide');
        }
        if (rightSlot.assignedElements().length === 0) {
            rightSlot.classList.add('slds-hide');
        } else {
            rightSlot.classList.remove('slds-hide');
        }
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    handleSlotChange() {
        this.updateSlotsVisibility();
    }
}
