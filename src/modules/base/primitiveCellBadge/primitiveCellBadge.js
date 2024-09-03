import { LightningElement, api } from 'lwc';
import { normalizeString } from 'c/utils';

const BADGE_VARIANTS = {
    valid: [
        'base',
        'brand',
        'inverse',
        'alt-inverse',
        'success',
        'warning',
        'error',
        'info',
        'offline'
    ],
    default: 'base'
};

export default class PrimitiveCellBadge extends LightningElement {
    @api label;

    _variant;

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTY
     * -------------------------------------------------------------
     */

    @api
    get variant() {
        return this._variant;
    }
    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: BADGE_VARIANTS.default,
            validValues: BADGE_VARIANTS.valid
        });
    }
}
