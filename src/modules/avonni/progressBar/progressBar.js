import { LightningElement, api } from 'lwc';
import { normalizeBoolean, normalizeString } from 'avonni/utilsPrivate';
import { classSet } from 'avonni/utils';

const validSizes = ['x-small', 'small', 'medium', 'large'];
const validPositions = [
    'left',
    'right',
    'top-right',
    'top-left',
    'bottom-right',
    'bottom-left',
    'centered'
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

    _size = 'medium';
    _value = 0;
    _showValue = false;
    _valuePosition = 'top-right';
    _valueLabel = ''; // à vérifier
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
    get position() {
        return this._position;
    }

    set position(position) {
        this._position = normalizeString(position, {
            fallbackValue: 'top-right',
            validValues: validPositions
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
                'avonni-progress-bar-theme-inverse': this._theme === 'inverse',
                'avonni-progress-bar-theme-alt-inverse':
                    this._theme === 'alt-inverse',
                'avonni-progress-bar-theme-warning': this.theme === 'warning',
                'avonni-progress-bar-theme-info': this._theme === 'info',
                'avonni-progress-bar-theme-error': this._theme === 'error',
                'avonni-progress-bar-theme-offline': this._theme === 'offline'
            })
            .toString();
    }

    @api
    get value() {
        return this._value;
    }
    get progressBarValue() {
        return this._orientation === 'horizontal'
            ? `width: ${this.value}%`
            : `height: ${this.value}%`;
    }

    set value(value) {
        if (value < 0) {
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
}
