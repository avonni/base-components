import { LightningElement, api } from 'lwc';
import {
    classSet,
    normalizeArray,
    normalizeBoolean,
    normalizeObject,
    normalizeString
} from 'c/utils';
import progressBar from './progressBar.html';
import progressBarVertical from './progressBarVertical.html';
import { AvonniResizeObserver } from 'c/resizeObserver';

const BORDER_RADIUS_REM = 0.5;
const DEFAULT_VALUE = 0;

const PROGRESS_BAR_SIZES = {
    valid: ['x-small', 'small', 'medium', 'large', 'full'],
    default: 'full'
};

const VALUE_POSITIONS = {
    valid: [
        'left',
        'right',
        'top-right',
        'top-left',
        'bottom-right',
        'bottom-left'
    ],
    default: 'top-right'
};

const PROGRESS_BAR_VARIANTS = { valid: ['base', 'circular'], default: 'base' };

const PROGRESS_BAR_THEMES = {
    valid: [
        'base',
        'success',
        'inverse',
        'alt-inverse',
        'warning',
        'info',
        'error',
        'offline'
    ],
    default: 'base'
};

const PROGRESS_BAR_THICKNESSES = {
    valid: ['x-small', 'small', 'medium', 'large'],
    default: 'medium'
};

const PROGRESS_BAR_ORIENTATIONS = {
    valid: ['horizontal', 'vertical'],
    default: 'horizontal'
};

const PROGRESS_BAR_PIN_TYPES = {
    valid: ['circle', 'rectangle'],
    default: 'rectangle'
};

const PROGRESS_BAR_PIN_POSITIONS = {
    valid: ['right', 'left'],
    default: 'right'
};

/**
 * @class
 * @descriptor avonni-progress-bar
 * @storyId example-progress-bar--base
 * @public
 */
export default class ProgressBar extends LightningElement {
    /**
     * Label for the progress bar.
     *
     * @type {string}
     * @public
     */
    @api label;
    /**
     * Text displayed before the value.
     *
     * @type {string}
     * @public
     */
    @api valuePrefix;

    _isLoading = false;
    _orientation = PROGRESS_BAR_ORIENTATIONS.default;
    _pinAttributes = {
        type: PROGRESS_BAR_PIN_TYPES.default,
        position: PROGRESS_BAR_PIN_POSITIONS.default
    };
    _referenceLines = [];
    _showPin = false;
    _showValue = false;
    _size = PROGRESS_BAR_SIZES.default;
    _textured = false;
    _theme = PROGRESS_BAR_THEMES.default;
    _thickness = PROGRESS_BAR_THICKNESSES.default;
    _value = DEFAULT_VALUE;
    _valuePosition = VALUE_POSITIONS.default;
    _valueSuffix;
    _variant = PROGRESS_BAR_VARIANTS.default;

    _connected = false;
    _resizeObserver;

    /*
     * -------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    /**
     * Render the progress bar depending on its orientation.
     *
     * @returns {File} progressBar.html | progressBarVertical.html
     */
    render() {
        return this.isHorizontal ? progressBar : progressBarVertical;
    }

    connectedCallback() {
        this._connected = true;
    }

    renderedCallback() {
        if (!this._resizeObserver) {
            this._resizeObserver = this._initResizeObserver();
        }
        this._updatePinPosition();
    }

    disconnectedCallback() {
        if (this._resizeObserver) {
            this._resizeObserver.disconnect();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * If present, the progress bar is in a loading state and shows a spinner.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get isLoading() {
        return this._isLoading;
    }
    set isLoading(value) {
        this._isLoading = normalizeBoolean(value);
    }

    /**
     * Orientation of the progress bar to be used. Valid values include horizontal and vertical.
     *
     * @type {string}
     * @public
     * @default horizontal
     */
    @api
    get orientation() {
        return this._orientation;
    }
    set orientation(orientation) {
        this._orientation = normalizeString(orientation, {
            fallbackValue: PROGRESS_BAR_ORIENTATIONS.default,
            validValues: PROGRESS_BAR_ORIENTATIONS.valid
        });

        if (this._connected) {
            this._updatePinPosition();
        }
    }

    /**
     * Object of attributes for the pin.
     *
     * @type {object}
     * @public
     */
    @api
    get pinAttributes() {
        return this._pinAttributes;
    }
    set pinAttributes(value) {
        const pinAttributes = normalizeObject(value);

        const type = normalizeString(pinAttributes.type, {
            fallbackValue: PROGRESS_BAR_PIN_TYPES.default,
            validValues: PROGRESS_BAR_PIN_TYPES.valid
        });
        const position = normalizeString(pinAttributes.position, {
            fallbackValue: PROGRESS_BAR_PIN_POSITIONS.default,
            validValues: PROGRESS_BAR_PIN_POSITIONS.valid
        });
        this._pinAttributes = { type, position };

        if (this._connected) {
            this._updatePinPosition();
        }
    }

    /**
     * Array of reference lines objects.
     *
     * @type {object[]}
     * @public
     */
    @api
    get referenceLines() {
        return this._referenceLines;
    }
    set referenceLines(value) {
        this._referenceLines = normalizeArray(value);
    }

    /**
     * If present, display the value in pin. Show value must be set to true.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get showPin() {
        return this._showPin;
    }
    set showPin(value) {
        this._showPin = normalizeBoolean(value);

        if (this._connected) {
            this._updatePinPosition();
        }
    }

    /**
     * If present, display the value.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get showValue() {
        return this._showValue;
    }
    set showValue(value) {
        this._showValue = normalizeBoolean(value);

        if (this._connected) {
            this._updatePinPosition();
        }
    }

    /**
     * The size of the progress bar. Valid values are x-small, small, medium, large and full.
     *
     * @type {string}
     * @public
     * @default full
     */
    @api
    get size() {
        return this._size;
    }
    set size(size) {
        this._size = normalizeString(size, {
            fallbackValue: PROGRESS_BAR_SIZES.default,
            validValues: PROGRESS_BAR_SIZES.valid
        });

        if (this._connected) {
            this._updatePinPosition();
        }
    }

    /**
     * If present, display a texture background.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get textured() {
        return this._textured;
    }
    set textured(value) {
        this._textured = normalizeBoolean(value);
    }

    /**
     * Defines the theme of the progress bar. Valid values includes base, success, inverse, alt-inverse, warning, info, error and offline.
     *
     * @type {string}
     * @public
     * @default base
     */
    @api
    get theme() {
        return this._theme;
    }
    set theme(theme) {
        this._theme = normalizeString(theme, {
            fallbackValue: PROGRESS_BAR_THEMES.default,
            validValues: PROGRESS_BAR_THEMES.valid
        });
    }

    /**
     * Set progress bar thickness. Valid values include x-small, small, medium and large.
     *
     * @type {string}
     * @public
     * @default medium
     */
    @api
    get thickness() {
        return this._thickness;
    }
    set thickness(thickness) {
        this._thickness = normalizeString(thickness, {
            fallbackValue: PROGRESS_BAR_THICKNESSES.default,
            validValues: PROGRESS_BAR_THICKNESSES.valid
        });
    }

    /**
     * The percentage value of the progress bar.
     *
     * @type {number}
     * @public
     * @default 0
     */
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

    /**
     * Deprecated. Use `value-suffix` instead.
     *
     * @type {string}
     * @deprecated
     */
    @api
    get valueLabel() {
        return this._valueSuffix;
    }
    set valueLabel(value) {
        this._valueSuffix = value;
        console.warn(
            'The "value-label" attribute is deprecated. Use "value-suffix" instead.'
        );
    }

    /**
     * Position of the value if present. Valid values include left, right, top-right, top-left, bottom-right and bottom-left.
     *
     * @type {string}
     * @public
     * @default top-right
     */
    @api
    get valuePosition() {
        return this._valuePosition;
    }
    set valuePosition(valuePosition) {
        this._valuePosition = normalizeString(valuePosition, {
            fallbackValue: VALUE_POSITIONS.default,
            validValues: VALUE_POSITIONS.valid
        });
    }

    /**
     * Text displayed next to the value.
     *
     * @type {string}
     * @public
     */
    @api
    get valueSuffix() {
        return this._valueSuffix;
    }
    set valueSuffix(value) {
        this._valueSuffix = value;
    }

    /**
     * The variant changes the appearance of the progress bar. Accepted variants include base or circular.
     *
     * @type {string}
     * @public
     * @default base
     */
    @api
    get variant() {
        return this._variant;
    }
    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: PROGRESS_BAR_VARIANTS.default,
            validValues: PROGRESS_BAR_VARIANTS.valid
        });
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Return assistive text.
     *
     * @type {string}
     */
    get assistiveText() {
        return `Progress: ${this.value}%`;
    }

    /**
     * Computed Inner class styling based on selected attributes.
     *
     * @type {string}
     */
    get computedInnerClass() {
        // for the progressBar in vertical we need to set a height on the outer div and inner div
        return classSet('slds-progress-bar__value slds-is-relative')
            .add(`avonni-progress-bar__bar_theme-${this.theme}`)
            .add({
                'avonni-progress-bar__vertical-bar': this.isVertical,
                'avonni-progress-bar__vertical_size-x-small':
                    this.size === 'x-small' && this.isVertical,
                'avonni-progress-bar__vertical_size-small':
                    this.size === 'small' && this.isVertical,
                'avonni-progress-bar__vertical_size-medium':
                    this.size === 'medium' && this.isVertical,
                'avonni-progress-bar__vertical_size-large':
                    this.size === 'large' && this.isVertical,
                'slds-theme_alert-texture': this.textured
            })
            .toString();
    }

    /**
     * Computed Outer class styling.
     *
     * @type {string}
     */
    get computedOuterClass() {
        return classSet('slds-progress-bar slds-text-align_center')
            .add({
                'slds-progress-bar_vertical': this.isVertical,
                'slds-progress-bar_circular': this.variant === 'circular',
                'slds-progress-bar_x-small': this.thickness === 'x-small',
                'slds-progress-bar_small': this.thickness === 'small',
                'slds-progress-bar_large': this.thickness === 'large'
            })
            .add(`avonni-progress-bar__bar-background_theme-${this.theme}`)
            .add({
                'slds-m-bottom_large': this._referenceLines.length > 0
            })
            .toString();
    }

    /**
     * Computed Pin class for the progress bar.
     *
     * @type {string}
     */
    get computedPinClass() {
        return classSet('avonni-progress-bar__pin')
            .add(`avonni-progress-bar__pin_theme-${this.theme}`)
            .add(`avonni-progress-bar__${this.pinType}-pin`)
            .add({
                'avonni-progress-bar__pin-left':
                    this.pinAttributes?.position === 'left' && this.isVertical,
                'avonni-progress-bar__pin-right':
                    this.pinAttributes?.position === 'right' && this.isVertical
            })
            .toString();
    }

    /**
     * Computed color gradient or clipping area for the progress bar value based on vertical or horizontal display.
     *
     * @type {string}
     */
    get computedProgressBarStyle() {
        let path = 'clip-path: inset(';
        path += this.isHorizontal
            ? `0 ${100 - this.value}% 0 0`
            : `${100 - this.value}% 0 0 0`;
        if (this.variant === 'circular') {
            path += ` round ${BORDER_RADIUS_REM}rem`;
        }
        path += ')';
        return path;
    }

    /**
     * Computed Sizing class for the progress bar.
     *
     * @type {string}
     */
    get computedSizingClass() {
        const classes = classSet('');
        if (this.isHorizontal) {
            classes.add(`avonni-progress-bar__horizontal_size-${this.size}`);
        } else {
            classes.add(`avonni-progress-bar__vertical_size-${this.size}`);
            classes.add('slds-grid slds-grid_align-center');
        }
        return classes.toString();
    }

    /**
     * If true, show the value.
     *
     * @type {boolean}
     */
    get displayValue() {
        return this.showValue && !this.showPin;
    }

    /**
     * Get the div container of the pin
     *
     * @type {object}
     */
    get divPin() {
        return this.template.querySelector(
            '[data-element-id="avonni-progress-bar-pin"]'
        );
    }

    /**
     * Verify if the orientation is horizontal.
     *
     * @type {boolean}
     */
    get isHorizontal() {
        return this.orientation === 'horizontal';
    }

    /**
     * Verify if the orientation is vertical.
     *
     * @type {boolean}
     */
    get isVertical() {
        return this.orientation === 'vertical';
    }

    /**
     * The type of the pin.
     *
     * @type {string}
     */
    get pinType() {
        return this.pinAttributes?.type || PROGRESS_BAR_PIN_TYPES.default;
    }

    /**
     * Verify Show pin value.
     *
     * @type {boolean}
     */
    get showPinValue() {
        return this.showPin && this.showValue;
    }

    /**
     * Verify Show position bottom.
     *
     * @type {boolean}
     */
    get showPositionBottom() {
        return this.showPositionBottomLeft || this.showPositionBottomRight;
    }

    /**
     * Verify Show position bottom left.
     *
     * @type {string | boolean}
     */
    get showPositionBottomLeft() {
        return this.valuePosition === 'bottom-left' && this.displayValue;
    }

    /**
     * Verify Show position bottom right.
     *
     * @type {string | boolean}
     */
    get showPositionBottomRight() {
        return this.valuePosition === 'bottom-right' && this.displayValue;
    }

    /**
     * Verify Show position left.
     *
     * @type {string | boolean}
     */
    get showPositionLeft() {
        return this.valuePosition === 'left' && this.displayValue;
    }

    /**
     * Verify Show position right.
     *
     * @type {string | boolean}
     */
    get showPositionRight() {
        return this.valuePosition === 'right' && this.displayValue;
    }

    /**
     * Verify Show position top.
     *
     * @type {string | boolean}
     */
    get showPositionTop() {
        return (
            this.showPositionTopLeft || this.showPositionTopRight || this.label
        );
    }

    /**
     * Verify Show position top left.
     *
     * @type {string | boolean}
     */
    get showPositionTopLeft() {
        return this.valuePosition === 'top-left' && this.displayValue;
    }

    /**
     * Verify Show position top right.
     *
     * @type {string | boolean}
     */
    get showPositionTopRight() {
        return this.valuePosition === 'top-right' && this.displayValue;
    }

    /**
     * The value to display including the prefix and the suffix.
     *
     * @type {string}
     */
    get valueToDisplay() {
        let value = `${this.value}%`;
        if (!this.showPin || this.pinAttributes.type !== 'circle') {
            if (this.valuePrefix) {
                value = `${this.valuePrefix} ${value}`;
            }
            if (this.valueSuffix) {
                value = `${value} ${this.valueSuffix}`;
            }
        }
        return value;
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Initialize the screen resize observer.
     *
     * @returns {AvonniResizeObserver} Resize observer.
     */
    _initResizeObserver() {
        if (!this.divPin) {
            return null;
        }
        return new AvonniResizeObserver(this.divPin, () => {
            this._updatePinPosition();
        });
    }

    /**
     * Update the position of the pin based on the orientation and the pin attributes.
     */
    _updatePinPosition() {
        if (!this.divPin || !this.showPinValue) {
            return;
        }
        const width = this.divPin.getBoundingClientRect().width;
        const height = this.divPin.getBoundingClientRect().height;
        if (this.isHorizontal && width > 0) {
            this.divPin.style.left = `calc(${this.value}% + ${-width / 2}px)`;
        } else if (this.isVertical && height > 0 && width > 0) {
            this.divPin.style.top = `calc(${this.value}% + ${-height / 2}px)`;
        }
    }
}
