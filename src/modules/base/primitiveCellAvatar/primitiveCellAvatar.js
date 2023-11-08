import { LightningElement, api } from 'lwc';
import { normalizeString } from 'c/utilsPrivate';

const AVATAR_SIZE = {
    valid: ['x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'],
    default: 'medium'
};

const AVATAR_VARIANTS = {
    valid: ['square', 'circle'],
    default: 'square'
};

export default class PrimitiveCellAvatar extends LightningElement {
    @api alternativeText;
    @api entityIconName;
    @api entitySrc;
    @api fallbackIconName;
    @api initials;
    @api presence;
    @api primaryText;
    @api secondaryText;
    @api status;
    @api src;

    _size = AVATAR_SIZE.default;

    _variant = AVATAR_VARIANTS.default;

    @api
    get size() {
        return this._size;
    }

    set size(size) {
        this._size = normalizeString(size, {
            fallbackValue: AVATAR_SIZE.default,
            validValues: AVATAR_SIZE.valid
        });
    }

    @api
    get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: AVATAR_VARIANTS.default,
            validValues: AVATAR_VARIANTS.valid
        });
    }

    get showAvatar() {
        return this.value || this.primaryText || this.secondaryText;
    }

    get value() {
        return this.src || this.fallbackIconName;
    }
}
