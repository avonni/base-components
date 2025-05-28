import { classSet, normalizeBoolean, normalizeString } from 'c/utils';
import { LightningElement, api } from 'lwc';

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
     * @type {string}
     * @public
     */
    @api name;
    /**
     * The text color of the chip.
     *
     * @public
     * @type {string}
     */
    @api textColor;

    _outline = false;
    _variant = CHIP_VARIANTS.default;

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    renderedCallback() {
        this.updateSlotsVisibility();
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Compute chip circle class style.
     *
     * @type {string}
     */
    get computedChipCircleClass() {
        return classSet('avonni-chip__circle')
            .add({
                'avonni-chip_outline': this.outline,
                [`avonni-chip__circle_theme-${this.variant}`]: this.variant
            })
            .toString();
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
    get computedChipClass() {
        return classSet('avonni-chip')
            .add({
                'avonni-chip_outline': this.outline,
                [`avonni-chip_theme-${this.variant}`]: this.variant
            })
            .toString();
    }

    /**
     * Compute chip color style.
     *
     * @type {string}
     */
    get computedChipStyle() {
        if (!this.backgroundColor && !this.textColor) {
            return '';
        }

        const styles = [];

        if (this.backgroundColor) {
            const property = this.outline
                ? 'outline-color'
                : 'color-background';
            styles.push(
                `--avonni-chip-${this.variant}-${property}: ${this.backgroundColor};`
            );
        }

        if (this.textColor && !this.outline) {
            styles.push(
                `--avonni-chip-${this.variant}-text-color: ${this.textColor};`
            );
        }

        return styles.join(' ');
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Update the visibility of the left and right slots.
     *
     * @private
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
