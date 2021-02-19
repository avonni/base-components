import { LightningElement, api } from 'lwc';
import { normalizeBoolean, normalizeString } from 'avonni/utilsPrivate';
import { classSet } from 'avonni/utils';

const validSizes = ['x-small', 'small', 'medium', 'large'];
const validValuePositions = [
    'left',
    'right',
    'top-right',
    'top-left',
    'bottom-right',
    'bottom-left',
    'top-centered',
    'bottom-centered'
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

    _size = 'medium';
    _value = 0;
    _showValue = false;
    _valuePosition = 'top-right';
    _badges = {}; // à vérifier
    _variant = 'base';
    _theme = 'base';
    _textured = false;
    _thickness = 'medium';
    _orientation = 'horizontal';

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
            fallbackValue: 'standard',
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
    get verticalSizing() {
        return classSet('slds-progress-bar__value')
            .add({
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

    get sizing() {
        return classSet('')
            .add({
                'avonni-progress-bar-size_x-small':
                    this._size === 'x-small' &&
                    this._orientation === 'horizontal',
                'avonni-progress-bar-size_small':
                    this._size === 'small' &&
                    this._orientation === 'horizontal',
                'avonni-progress-bar-size_medium':
                    this._size === 'medium' &&
                    this._orientation === 'horizontal',
                'avonni-progress-bar-size_large':
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
                'slds-theme_alert-texture': this._textured === true
            })
            .toString();
    }

    get computedOuterClass() {
        return classSet('slds-progress-bar')
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
                'slds-theme_offline': this._theme === 'offline'
            })
            .toString();
    }
    get horizontal() {
        return this._orientation === 'horizontal';
    }

    get progressBarValue() {
        return this._orientation === 'horizontal'
            ? `width: ${this.value}%`
            : `height: ${this.value}%`;
    }

    get positionLeft() {
        return this._valuePosition === 'left' && this._showValue;
    }

    get positionRight() {
        return this._valuePosition === 'right' && this._showValue;
    }

    get positionTopRight() {
        return this._valuePosition === 'top-right' && this._showValue;
    }

    get positionTopCentered() {
        return this._valuePosition === 'top-centered' && this._showValue;
    }

    get positionTopLeft() {
        return (
            this._valuePosition === 'top-left' &&
            this._showValue &&
            this.label === ''
        );
    }

    get positionBottomRight() {
        return this._valuePosition === 'bottom-right' && this._showValue;
    }

    get positionBottomCentered() {
        return this._valuePosition === 'bottom-centered' && this._showValue;
    }

    get positionBottomLeft() {
        return this._valuePosition === 'bottom-left' && this._showValue;
    }
}
