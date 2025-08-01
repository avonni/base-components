import { LightningElement, api } from 'lwc';
import { colorType, generateColors, HSVToHSL } from 'c/colorUtils';
import { classSet, normalizeBoolean } from 'c/utils';

const DEFAULT_MESSAGE_WHEN_BAD_INPUT = 'Please ensure value is correct';
const DEFAULT_VALUE = '#ffffff';
const INDICATOR_SIZE = 12;

/**
 * @class
 * @descriptor avonni-color-gradient
 * @storyId example-color-gradient--base
 * @public
 */
export default class ColorGradient extends LightningElement {
    /**
     * Error message to be displayed when a bad input is detected.
     *
     * @public
     * @type {string}
     * @default Please ensure value is correct
     */
    @api messageWhenBadInput = DEFAULT_MESSAGE_WHEN_BAD_INPUT;

    _disabled = false;
    _opacity = false;
    _readOnly = false;
    _value = DEFAULT_VALUE;

    colors = generateColors(DEFAULT_VALUE);
    data;
    down = false;
    init = false;
    paletteHeight;
    paletteWidth;
    positionX;
    positionY;
    showError = false;
    _setColorChangeTimeout;

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this.onMouseUp = this.handleMouseUp.bind(this);
        this.onMouseMove = this.handleMouseMove.bind(this);

        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('mouseup', this.onMouseUp);
    }

    disconnectedCallback() {
        window.removeEventListener('mouseup', this.onMouseUp);
        window.removeEventListener('mousemove', this.onMouseMove);
    }

    renderedCallback() {
        if (!this.init) {
            if (this.opacity) {
                this.setOpacityColor(this.colors.H);
            }

            let palette = this.template.querySelector(
                '.slds-color-picker__custom-range'
            );

            this.paletteWidth = palette.offsetWidth;
            this.paletteHeight = palette.offsetHeight;

            this.setPaletteColor(this.colors.H);
            this.setSwatchColor(this.value);
            this.setIndicatorPosition();

            this.init = true;
        }
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * If present, the input field is disabled and users cannot interact with it.
     *
     * @public
     * @type {boolean}
     */
    @api
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = normalizeBoolean(value);

        [
            ...this.template.querySelectorAll('.slds-color-picker__hue-slider')
        ].forEach((element) => {
            element.style.background = this._disabled ? '#ecebea' : '';
        });

        if (this.init) {
            this.setPaletteColor(this.colors.H);
        }
    }

    /**
     * If present, the alpha slider will be displayed.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get opacity() {
        return this._opacity;
    }
    set opacity(value) {
        this._opacity = normalizeBoolean(value);
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        setTimeout(() => {
            if (this.opacity) {
                this.setOpacityColor(this.colors.H);
            }
        }, 1);
    }

    /**
     * If present, the palette is read-only and cannot be edited by users.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get readOnly() {
        return this._readOnly;
    }
    set readOnly(value) {
        this._readOnly = normalizeBoolean(value);
    }

    /**
     * Specifies the value of an input element.
     *
     * @public
     * @type {string}
     */
    @api
    get value() {
        return this._value;
    }
    set value(value) {
        if (colorType(this.value) !== null) {
            this._value = value;
            this.colors = generateColors(this._value);

            if (this.opacity) {
                this.setOpacityColor(this.colors.H);
            }

            if (this.init) {
                this.setPaletteColor(this.colors.H);
                this.setSwatchColor(this.value);
                this.setIndicatorPosition();
            }
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Disable cursor if disabled or readOnly.
     *
     * @type {string}
     */
    get computedDisabledClass() {
        return classSet('slds-color-picker__custom-range')
            .add({
                'slds-color-picker__custom-range_disabled':
                    this._disabled || this._readOnly
            })
            .toString();
    }

    /**
     * Retrieve color value if present.
     *
     * @type {string}
     */
    get colorValue() {
        return this.colors.A < 1 && this.opacity
            ? this.colors.hexa
            : this.colors.hex;
    }

    /**
     * Disable input handle.
     *
     * @type {boolean}
     */
    get disabledInput() {
        return this.disabled || this.readOnly;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Display the given color in the color gradient.
     *
     * @param {string} color Color to display.
     */
    @api
    renderValue(color) {
        if (this.colorValue !== color) {
            this._value = color;
            this.colors = generateColors(this.value);

            if (this.opacity) {
                this.setOpacityColor(this.colors.H);
            }

            this.setPaletteColor(this.colors.H);
            this.setSwatchColor(this.value);
            this.setIndicatorPosition();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Remove errors.
     */
    hideErrors() {
        this.showError = false;

        this.template
            .querySelector('.slds-color-picker__input-custom-hex')
            .classList.remove('slds-has-error');

        [...this.template.querySelectorAll('.avonni-color-input')].forEach(
            (element) => {
                element.classList.remove('slds-has-error');
            }
        );
    }

    /**
     * RGBA computed color method.
     *
     * @param {object} event
     */
    processingRGBColor(event) {
        let color = `rgba(${this.colors.R},${this.colors.G},${this.colors.B},${this.colors.A})`;
        if (colorType(color) !== null) {
            this.hideErrors();
            this.updateColors(color);
        } else {
            this.showError = true;
            event.target.parentElement.parentElement.classList.add(
                'slds-has-error'
            );
        }
    }

    /**
     * Set HSL/A colors via palette x/y coordinates.
     *
     * @param {number} x
     * @param {number} y
     */
    setColor(x, y) {
        let s = x / this.paletteWidth;
        let v = 1 - y / this.paletteHeight;
        let hsl = HSVToHSL(this.colors.H, s, v);

        let saturation = Math.round(hsl.S * 100);
        let lightness = Math.round(hsl.L * 100);

        if (saturation < 0) {
            saturation = 0;
        } else if (saturation > 100) {
            saturation = 100;
        }

        if (lightness < 0) {
            lightness = 0;
        } else if (lightness > 100) {
            lightness = 100;
        }

        const opacity = this.opacity ? this.colors.A : 100;

        let color = `hsla(${this.colors.H}, ${saturation}%, ${lightness}%, ${opacity})`;

        if (colorType(color) === null) {
            color = `hsla(${this.colors.H}, ${saturation}%, ${lightness}%, 1)`;
        }

        let colors = generateColors(color);

        if (colors.H !== this.colors.H) {
            colors.H = this.colors.H;
        }

        this.colors = colors;

        this.positionX = x;
        this.positionY = y;

        this.hideErrors();
        this.setSwatchColor(this.colors.hexa);
        this.dispatchChange();
    }

    /**
     * Set indicator position based on color value.
     */
    setIndicatorPosition() {
        let x = this.paletteWidth * this.colors.hsv.s;
        let y = this.paletteHeight * (1 - this.colors.hsv.v);

        if (!this.disabled) {
            // eslint-disable-next-line @lwc/lwc/no-async-operation
            setTimeout(() => {
                let indicator = this.template.querySelector(
                    '.slds-color-picker__range-indicator'
                );

                if (indicator) {
                    indicator.style.top = `${y}px`;
                    indicator.style.left = `${x}px`;
                }
            }, 1);
        }

        this.positionX = x;
        this.positionY = y;
    }

    /**
     * Set opacity color.
     *
     * @param {string} value
     */
    setOpacityColor(value) {
        const opacity = this.template.querySelector('.avonni-opacity-input');

        if (opacity) {
            opacity.style.backgroundImage = this.disabled
                ? 'none'
                : `linear-gradient(to right, hsla(0,100%,50%, 0), hsla(${value},100%,50%,1))`;
        }
    }

    /**
     * Set palette color range.
     *
     * @param {string} value
     */
    setPaletteColor(value) {
        let color = this.disabled ? '#ecebea' : `hsl(${value}, 100%, 50%)`;

        this.template.querySelector(
            '.slds-color-picker__custom-range'
        ).style.background = color;
    }

    /**
     * Set swatch color.
     *
     * @param {string} value
     */
    setSwatchColor(value) {
        let color = this.disabled ? '#ecebea' : value;
        this.template.querySelector('.slds-swatch').style.background = color;
    }

    /**
     * Update color parameters.
     *
     * @param {string} color
     */
    updateColors(color) {
        this.colors = generateColors(color);

        if (this.opacity) {
            this.setOpacityColor(this.colors.H);
        }

        this.setPaletteColor(this.colors.H);
        this.setSwatchColor(this.colors.hexa);
        this.setIndicatorPosition();
        this.dispatchChange();
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS & DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Public and private blur handle.
     */
    handleBlur() {
        /**
         * The event fired when the color gradient loses focus.
         *
         * @event
         * @name blur
         * @public
         */
        this.dispatchEvent(new CustomEvent('blur'));

        /**
         * @event
         * @name privateblur
         * @composed
         * @bubbles
         * @cancelable
         */
        this.dispatchEvent(
            new CustomEvent('privateblur', {
                composed: true,
                bubbles: true,
                cancelable: true
            })
        );
    }

    /**
     * Change event handle.
     *
     * @param {object} event
     */
    handleChange(event) {
        event.stopPropagation();
    }

    /**
     * Palette Click event handle.
     *
     * @param {object} event
     */
    handleClickPalet(event) {
        if (
            event.target.className !== 'slds-color-picker__range-indicator' &&
            !this.disabled &&
            !this.readOnly
        ) {
            let indicator = this.template.querySelector(
                '.slds-color-picker__range-indicator'
            );

            indicator.style.top = `${event.offsetY - INDICATOR_SIZE}px`;
            indicator.style.left = `${event.offsetX}px`;

            this.setColor(event.offsetX, event.offsetY - INDICATOR_SIZE);
        }
    }

    /**
     * Private focus handle.
     */
    handleFocus() {
        /**
         * @event
         * @name privatefocus
         * @private
         * @cancelable
         * @bubbles
         */
        this.dispatchEvent(
            new CustomEvent('privatefocus', {
                bubbles: true,
                cancelable: true
            })
        );
    }

    /**
     * Input event handle.
     *
     * @param {object} event
     */
    handleInput(event) {
        event.stopPropagation();
        if (!this.readOnly) {
            let H = event.target.value;

            this.setPaletteColor(H);

            if (this.opacity) {
                this.setOpacityColor(H);

                let color = `hsla(${H}, ${this.colors.S}%, ${this.colors.L}%, ${this.colors.A})`;

                if (colorType(color) === null) {
                    color = `hsla(${H}, ${this.colors.S}%, ${this.colors.L}%, 1)`;
                }

                this.colors = generateColors(color);
            } else {
                this.colors = generateColors(
                    `hsl(${H}, ${this.colors.S}%, ${this.colors.L}%)`
                );
            }

            this.colors.H = H;

            this.setSwatchColor(this.colors.hexa);
            this.hideErrors();
            this.dispatchChange();
        }
    }

    /**
     * Handle Alpha input in RGBA.
     *
     * @param {object} event
     */
    handleInputAlpha(event) {
        this.colors.A = event.target.value;
        this.processingRGBColor(event);
    }

    /**
     * Handle Blue input in RGBA.
     *
     * @param {object} event
     */
    handleInputBlue(event) {
        this.colors.B = event.target.value;
        this.processingRGBColor(event);
    }

    /**
     * Input color event handle.
     *
     * @param {object} event
     */
    handleInputColor(event) {
        let color = event.target.value;

        if (this.colors.A < 1 && this.opacity) {
            this.colors.hexa = color;
        } else {
            this.colors.hex = color;
        }

        if (
            colorType(color) === 'hex' ||
            (colorType(color) === 'hexa' && this.opacity)
        ) {
            this.hideErrors();
            this.updateColors(color);
        } else {
            this.showError = true;
            this.template
                .querySelector('.slds-color-picker__input-custom-hex')
                .classList.add('slds-has-error');
        }
    }

    /**
     * Handle Green input in RGBA.
     *
     * @param {object} event
     */
    handleInputGreen(event) {
        this.colors.G = event.target.value;
        this.processingRGBColor(event);
    }

    /**
     * Input opacity event handle.
     *
     * @param {object} event
     */
    handleInputOpacity(event) {
        if (!this.readOnly) {
            let alpha = event.target.value;

            this.colors = generateColors(
                `hsla(${this.colors.H}, ${this.colors.S}%, ${this.colors.L}%, ${alpha})`
            );

            this.setSwatchColor(this.colors.hexa);
            this.hideErrors();
            this.dispatchChange();
        }
    }

    /**
     * Handle Red input in RGBA.
     *
     * @param {object} event
     */
    handleInputRed(event) {
        this.colors.R = event.target.value;
        this.processingRGBColor(event);
    }

    /**
     * Mouse down event handle.
     *
     * @param {object} event
     */
    handleMouseDown(event) {
        this.down = true;
        this.data = {
            x: event.x,
            y: event.y,
            top: event.offsetY - INDICATOR_SIZE,
            left: event.offsetX,
            width: this.paletteWidth,
            height: this.paletteHeight - INDICATOR_SIZE
        };
    }

    /**
     * Mouse mouse event handle.
     *
     * @param {object} event
     */
    handleMouseMove(event) {
        if (this.down && !this.readOnly && !this.disabled) {
            let indicator = this.template.querySelector(
                '.slds-color-picker__range-indicator'
            );

            let delta = {
                x: this.data.left + event.clientX - this.data.x,
                y: this.data.top + event.clientY - this.data.y
            };

            if (delta.x < this.data.width) {
                if (delta.x < 0) {
                    indicator.style.left = '0px';
                    delta.x = 0;
                } else {
                    indicator.style.left = `${delta.x}px`;
                }
            } else {
                indicator.style.left = `${this.data.width}px`;
                delta.x = this.data.width;
            }

            if (delta.y < this.data.height) {
                if (delta.y < -INDICATOR_SIZE) {
                    indicator.style.top = `-${INDICATOR_SIZE}px`;
                    delta.y = -INDICATOR_SIZE;
                } else {
                    indicator.style.top = `${delta.y}px`;
                }
            } else {
                indicator.style.top = `${this.data.height}px`;
                delta.y = this.data.height;
            }

            this.setColor(delta.x, delta.y);
        }
    }

    /**
     * Mouse up handle.
     */
    handleMouseUp() {
        this.down = false;
    }

    /**
     * Change dispatcher.
     */
    dispatchChange() {
        if (this.disabled || this.readOnly) {
            return;
        }
        clearTimeout(this._setColorChangeTimeout);
        this._setColorChangeTimeout = setTimeout(() => {
            /**
             * The event fired when the color value changed.
             *
             * @event
             * @name change
             * @public
             * @param {string} hex Color in hexadecimal format.
             * @param {string} hexa Color in hexadecimal format with alpha.
             * @param {string} rgb Color in rgb format.
             * @param {string} rgba Color in rgba format.
             * @param {string} alpha Alpha value of the color.
             * @cancelable
             * @bubbles
             */
            this.dispatchEvent(
                new CustomEvent('change', {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        hex: this.colors.hex,
                        hexa: this.colors.hexa,
                        rgb: this.colors.rgb,
                        rgba: this.colors.rgba,
                        alpha: this.colors.A
                    }
                })
            );
        }, 250);
    }
}
