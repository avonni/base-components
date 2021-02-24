import { LightningElement, api } from 'lwc';
import { normalizeBoolean, normalizeString } from 'avonni/utilsPrivate';
import { classSet } from 'avonni/utils';

const validSizes = ['x-small', 'small', 'medium', 'large', 'full'];
const validValuePositions = [
    'left',
    'right',
    'top-right',
    'top-left',
    'bottom-right',
    'bottom-left'
];
const validVariants = ['base', 'circular'];
const validThemes = [
    'base',
    'success',
    'inverse',
    'alt-inverse',
    'warning',
    'info',
    'error',
    'offline'
];
const validThickness = ['x-small', 'small', 'medium', 'large'];
const validOrientations = ['horizontal', 'vertical'];

export default class ProgressBar extends LightningElement {
    @api label;
    @api valueLabel;
    @api badges = [];

    _size = 'full';
    _value = 0;
    _showValue = false;
    _valuePosition = 'top-right';
    _variant = 'base';
    _theme = 'base';
    _textured = false;
    _thickness = 'medium';
    _orientation = 'vertical';

    @api
    get size() {
        return this._size;
    }

    set size(size) {
        this._size = normalizeString(size, {
            fallbackValue: 'medium',
            validValues: validSizes
        });
    }

    @api
    get value() {
        return this._value;
    }

    set value(value) {
        if (value <= 0) {
            this._value = 0;
        } else if (value > 100) {
            this._value = 100;
        } else {
            this._value = value;
        }
    }

    @api
    get showValue() {
        return this._showValue;
    }

    set showValue(value) {
        this._showValue = normalizeBoolean(value);
    }

    @api
    get valuePosition() {
        return this._valuePosition;
    }

    set valuePosition(valuePosition) {
        this._valuePosition = normalizeString(valuePosition, {
            fallbackValue: 'top-right',
            validValues: validValuePositions
        });
    }

    @api
    get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: 'base',
            validValues: validVariants
        });
    }

    @api
    get theme() {
        return this._theme;
    }

    set theme(theme) {
        this._theme = normalizeString(theme, {
            fallbackValue: 'base',
            validValues: validThemes
        });
    }

    @api
    get textured() {
        return this._textured;
    }

    set textured(value) {
        this._textured = normalizeBoolean(value);
    }

    @api
    get thickness() {
        return this._thickness;
    }

    set thickness(thickness) {
        this._thickness = normalizeString(thickness, {
            fallbackValue: 'medium',
            validValues: validThickness
        });
    }

    @api
    get orientation() {
        return this._orientation;
    }

    set orientation(orientation) {
        this._orientation = normalizeString(orientation, {
            fallbackValue: 'standard',
            validValues: validOrientations
        });
    }

    get badgesList() {
        let result = [];
        let borderHeight = '20px';
        let borderLeft = '-8px';

        this.badges.forEach((badge, index) => {
            let cloneBadge = Object.assign({}, badge);
            cloneBadge.key = `badge-key-${index}`;
            cloneBadge.class = classSet('avonni-progress-bar-badges');

            if (cloneBadge.variant === 'success') {
                cloneBadge.class
                    .add('slds-theme_success avonni-progress-bar-badges')
                    .toString();
            } else if (cloneBadge.variant === 'darker') {
                cloneBadge.class.add('slds-badge_inverse').toString();
            } else if (cloneBadge.variant === 'lightest') {
                cloneBadge.class
                    .add(
                        'slds-badge_lightest avonni-progress-bar-badges-border_none'
                    )
                    .toString();
            } else if (cloneBadge.variant === 'warning') {
                cloneBadge.class.add('slds-theme_warning').toString();
            } else if (cloneBadge.variant === 'error') {
                cloneBadge.class.add('slds-theme_error').toString();
            }

            if (this._thickness === 'large') {
                borderHeight = '24px';
            } else if (this._thickness === 'small') {
                borderHeight = '16px';
            } else if (this._thickness === 'x-small') {
                borderHeight = '14px';
            }

            if (this._thickness === 'large') {
                borderLeft = '-11px';
            } else if (this._thickness === 'small') {
                borderLeft = '-4px';
            } else if (this._thickness === 'x-small') {
                borderLeft = '-1px';
            }

            if (this._orientation === 'horizontal') {
                if (cloneBadge.value >= 100) {
                    cloneBadge.style = `width: 100%; border-right: 2px ${cloneBadge.borderType} #706e6b; height: ${borderHeight}`;
                } else if (cloneBadge.value <= 0) {
                    cloneBadge.style = `width: 0%; border-right: 2px ${cloneBadge.borderType} #706e6b; height: ${borderHeight}`;
                } else if (0 < cloneBadge.value < 100) {
                    cloneBadge.style = `width: ${cloneBadge.value}%; border-right: 2px ${cloneBadge.borderType} #706e6b; height: ${borderHeight}`;
                }
            }

            if (this._orientation === 'vertical') {
                if (cloneBadge.value >= 100) {
                    cloneBadge.style = `height: 100%; border-bottom: 2px ${cloneBadge.borderType} #706e6b; left: ${borderLeft};`;
                } else if (cloneBadge.value <= 0) {
                    cloneBadge.style = `height: 0%; border-bottom: 2px ${cloneBadge.borderType} #706e6b; left: ${borderLeft};`;
                } else if (0 < cloneBadge.value < 100) {
                    cloneBadge.style = `height: ${cloneBadge.value}%; border-bottom: 2px ${cloneBadge.borderType} #706e6b; left: ${borderLeft};`;
                }
            }

            result.push(cloneBadge);
        });

        return result;
    }

    get computedProgressBarSizing() {
        return classSet('')
            .add({
                'avonni-progress-bar-horizontal-size_x-small':
                    this._size === 'x-small' &&
                    this._orientation === 'horizontal',
                'avonni-progress-bar-horizontal-size_small':
                    this._size === 'small' &&
                    this._orientation === 'horizontal',
                'avonni-progress-bar-horizontal-size_medium':
                    this._size === 'medium' &&
                    this._orientation === 'horizontal',
                'avonni-progress-bar-horizontal-size_large':
                    this._size === 'large' &&
                    this._orientation === 'horizontal',
                'avonni-progress-bar-vertical-size_x-small':
                    this._size === 'x-small' &&
                    this._orientation === 'vertical',
                'avonni-progress-bar-vertical-size_small':
                    this._size === 'small' && this._orientation === 'vertical',
                'avonni-progress-bar-vertical-size_medium':
                    this._size === 'medium' && this._orientation === 'vertical',
                'avonni-progress-bar-vertical-size_large':
                    this._size === 'large' && this._orientation === 'vertical',
                'avonni-progress-bar-vertical-size_full':
                    (this._size === 'full') & (this._orientation === 'vertical')
            })
            .toString();
    }

    get computedOuterClass() {
        return classSet('slds-progress-bar slds-text-align_center')
            .add({
                'slds-progress-bar_vertical': this._orientation === 'vertical',
                'slds-progress-bar_circular': this.variant === 'circular',
                'slds-progress-bar_x-small': this._thickness === 'x-small',
                'slds-progress-bar_small': this._thickness === 'small',
                'slds-progress-bar_large': this._thickness === 'large'
            })
            .toString();
    }

    get computedInnerClass() {
        return classSet('slds-progress-bar__value')
            .add({
                'slds-progress-bar__value_success': this._theme === 'success',
                'slds-theme_inverse': this._theme === 'inverse',
                'slds-theme_alt-inverse': this._theme === 'alt-inverse',
                'slds-theme_warning': this.theme === 'warning',
                'slds-theme_info': this._theme === 'info',
                'slds-theme_error': this._theme === 'error',
                'slds-theme_offline': this._theme === 'offline',
                'avonni-progress-bar-vertical-size_x-small':
                    this._size === 'x-small' &&
                    this._orientation === 'vertical',
                'avonni-progress-bar-vertical-size_small':
                    this._size === 'small' && this._orientation === 'vertical',
                'avonni-progress-bar-vertical-size_medium':
                    this._size === 'medium' && this._orientation === 'vertical',
                'avonni-progress-bar-vertical-size_large':
                    this._size === 'large' && this._orientation === 'vertical',
                'slds-theme_alert-texture': this._textured === true
            })
            .toString();
    }
    get isHorizontal() {
        return this._orientation === 'horizontal';
    }

    get computedProgressBarValue() {
        return this._orientation === 'horizontal'
            ? `width: ${this.value}%`
            : `height: ${this.value}%`;
    }

    get showPositionLeft() {
        return this._valuePosition === 'left' && this._showValue;
    }

    get showPositionRight() {
        return this._valuePosition === 'right' && this._showValue;
    }

    get showPositionTopRight() {
        return this._valuePosition === 'top-right' && this._showValue;
    }

    get showPositionTopLeft() {
        return this._valuePosition === 'top-left' && this._showValue;
    }

    get showPositionBottomRight() {
        return this._valuePosition === 'bottom-right' && this._showValue;
    }

    get showPositionBottomLeft() {
        return this._valuePosition === 'bottom-left' && this._showValue;
    }

    get showPositionBottom() {
        return (
            (this._valuePosition === 'bottom-left' ||
                this._valuePosition === 'bottom-right') &&
            this._showValue
        );
    }

    get showBadge() {
        return this.badges.length !== 0;
    }
}
