import { LightningElement, api } from 'lwc';
import { classSet } from 'c/utils';
import { normalizeString } from 'c/utilsPrivate';

const NUBBIN_POSITIONS = {
    valid: ['top', 'bottom', 'left', 'right'],
    default: 'top'
};

/**
 * @class
 * @descriptor avonni-primitive-tooltip
 */
export default class PrimitiveTooltip extends LightningElement {
    @api label;
    @api content;

    _nubbinPosition = NUBBIN_POSITIONS.default;

    /**
     * If present, sets the nubbin position of tooltip. Valid values include top, bottom, left and right. The value defaults to top.
     *
     * @type {string}
     */
    @api
    get nubbinPosition() {
        return this._nubbinPosition;
    }
    set nubbinPosition(position) {
        this._nubbinPosition = normalizeString(position, {
            fallbackValue: NUBBIN_POSITIONS.default,
            validValues: NUBBIN_POSITIONS.valid
        });
    }

    /**
     * Computed tooltip container class styling.
     *
     * @type {string}
     */
    get computedTooltipClass() {
        return classSet(
            `avonni-primitive-tooltip slds-popover slds-popover_tooltip slds-nubbin_${this.nubbinPosition}`
        ).toString();
    }
}
