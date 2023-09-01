

import { LightningElement, api } from 'lwc';
import { classSet } from 'c/utils';
import { normalizeString } from 'c/utilsPrivate';

const REFERENCE_VARIANTS = {
    valid: ['default', 'inverse', 'success', 'warning', 'error', 'lightest'],
    default: 'default'
};

const REFERENCE_BORDER_STYLES = {
    valid: ['solid', 'dashed', 'dotted', 'none'],
    default: 'dotted'
};

const ORIENTATIONS = {
    valid: ['horizontal', 'vertical'],
    default: 'horizontal'
};

const DEFAULT_VALUE = 0;

export default class PrimitiveReferenceLine extends LightningElement {
    @api label;
    @api thickness;

    _value = DEFAULT_VALUE;
    _variant = REFERENCE_VARIANTS.default;
    _borderStyle = REFERENCE_BORDER_STYLES.default;
    _orientation = ORIENTATIONS.default;

    @api
    get value() {
        return this._value;
    }

    set value(value) {
        if (parseInt(value, 10) <= 0) {
            this._value = 0;
        } else if (parseInt(value, 10) > 100) {
            this._value = 100;
        } else if (isNaN(parseInt(value, 10))) {
            this._value = DEFAULT_VALUE;
        } else {
            this._value = parseInt(value, 10);
        }
    }

    @api
    get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: REFERENCE_VARIANTS.default,
            validValues: REFERENCE_VARIANTS.valid
        });
    }

    @api
    get borderStyle() {
        return this._borderStyle;
    }

    set borderStyle(borderStyle) {
        this._borderStyle = normalizeString(borderStyle, {
            fallbackValue: REFERENCE_BORDER_STYLES.default,
            validValues: REFERENCE_BORDER_STYLES.valid
        });
    }

    @api
    get orientation() {
        return this._orientation;
    }

    set orientation(orientation) {
        this._orientation = normalizeString(orientation, {
            fallbackValue: ORIENTATIONS.default,
            validValues: ORIENTATIONS.valid
        });
    }

    get isHorizontal() {
        return this._orientation === 'horizontal';
    }

    get computedBadgeClass() {
        return classSet('reference-line__badge')
            .add(`reference-line__badge_${this._variant}`)
            .toString();
    }

    get computedOuterClass() {
        return classSet('')
            .add({
                'reference-line__line': this.isHorizontal
            })
            .add({
                'reference-line__badge-border-style_dashed':
                    this._borderStyle === 'dashed' && this.isHorizontal,
                'reference-line__badge-border-style_solid':
                    this._borderStyle === 'solid' && this.isHorizontal,
                'reference-line__badge-border-style_dotted':
                    this._borderStyle === 'dotted' && this.isHorizontal
            })
            .add({
                'reference-line__badge-border-thickness_x-small':
                    this.thickness === 'x-small' && this.isHorizontal,
                'reference-line__badge-border-thickness_small':
                    this.thickness === 'small' && this.isHorizontal,
                'reference-line__badge-border-thickness_large':
                    this.thickness === 'large' && this.isHorizontal
            })
            .add(`reference-line__badge-border-color_${this._variant}`)
            .add({
                'reference-line__line-vertical': !this.isHorizontal
            })
            .add({
                'reference-line__badge-border-vertical-style_dashed':
                    this._borderStyle === 'dashed' && !this.isHorizontal,
                'reference-line__badge-border-vertical-style_solid':
                    this._borderStyle === 'solid' && !this.isHorizontal,
                'reference-line__badge-border-vertical-style_dotted':
                    this._borderStyle === 'dotted' && !this.isHorizontal
            })
            .add({
                'reference-line__badge-border-thickness-vertical_x-small':
                    this.thickness === 'x-small' && !this.isHorizontal,
                'reference-line__badge-border-thickness-vertical_small':
                    this.thickness === 'small' && !this.isHorizontal,
                'reference-line__badge-border-thickness-vertical_large':
                    this.thickness === 'large' && !this.isHorizontal
            })
            .add(`reference-line__badge-border-vertical-color_${this._variant}`)
            .toString();
    }

    get computedStyle() {
        return this.isHorizontal
            ? `width: ${this._value}%`
            : `height: ${this._value}%`;
    }
}
