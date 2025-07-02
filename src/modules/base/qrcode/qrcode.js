import { LightningElement, api } from 'lwc';
import { normalizeString } from 'c/utils';
import qrcodeGeneration from './qrcodeGeneration';

const QR_ENCODINGS = { valid: ['ISO_8859_1', 'UTF_8'], default: 'ISO_8859_1' };
const QR_ERROR_CORRECTIONS = { valid: ['L', 'M', 'Q', 'H'], default: 'L' };
const QR_RENDER_AS = { valid: ['canvas', 'svg'], default: 'svg' };

const DEFAULT_BORDER_WIDTH = 0;
const DEFAULT_PADDING = 0;
const DEFAULT_SIZE = 200;
const DEFAULT_COLOR = '#000000';
const DEFAULT_BACKGROUND_COLOR = '#ffffff';

/**
 * @class
 * @descriptor avonni-qrcode
 * @storyId example-qrcode--base
 * @public
 */
export default class Qrcode extends LightningElement {
    /**
     * The assistive text for the QR code.
     *
     * @type {string}
     * @public
     */
    @api alternativeText;

    _background;
    _borderColor;
    _borderWidth = DEFAULT_BORDER_WIDTH;
    _color;
    _encoding = QR_ENCODINGS.default;
    _errorCorrection = QR_ERROR_CORRECTIONS.default;
    _padding = DEFAULT_PADDING;
    _renderAs = QR_RENDER_AS.default;
    _size = DEFAULT_SIZE;
    _value;

    _rendered = false;

    renderedCallback() {
        this.redraw();
        this._rendered = true;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Background color of the qr-code. Accepts a valid CSS color string, including hex and rgb.
     *
     * @type {string}
     * @public
     * @default #ffffff
     */
    @api
    get background() {
        return this._background;
    }
    set background(color) {
        if (color && typeof color === 'string') {
            let styles = new Option().style;
            styles.color = color;

            if (
                styles.color === color ||
                this._isHexColor(color.replace('#', ''))
            ) {
                this._background = color;
            }
        }

        this._redraw();
    }

    /**
     * The color of the border. Accepts a valid CSS color string, including hex and rgb.
     *
     * @type {string}
     * @public
     */
    @api
    get borderColor() {
        return this._borderColor;
    }
    set borderColor(color) {
        if (color && typeof color === 'string') {
            let styles = new Option().style;
            styles.color = color;

            if (
                styles.color === color ||
                this._isHexColor(color.replace('#', ''))
            ) {
                this._borderColor = color;
            }
        }

        this._redraw();
    }

    /**
     * The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.
     *
     * @type {number}
     * @public
     * @default 0
     */
    @api
    get borderWidth() {
        return this._borderWidth;
    }
    set borderWidth(value) {
        this._borderWidth = isNaN(parseInt(value, 10))
            ? DEFAULT_BORDER_WIDTH
            : value;

        this._redraw();
    }

    /**
     * The color of the QR code. Accepts a valid CSS color string, including hex and rgb.
     *
     * @type {string}
     * @public
     * @default #000000
     */
    @api
    get color() {
        return this._color;
    }
    set color(color) {
        if (color && typeof color === 'string') {
            let styles = new Option().style;
            styles.color = color;

            if (
                styles.color === color ||
                this._isHexColor(color.replace('#', ''))
            ) {
                this._color = color;
            }
        }

        this._redraw();
    }

    /**
     * The encoding mode used to encode the value.The possible values are:
     * * "ISO_8859_1" - supports all characters from the ISO/IEC 8859-1 character set.
     * * "UTF_8" - supports all Unicode characters.
     *
     * @type {string}
     * @public
     * @default ISO_8859_1
     */
    @api
    get encoding() {
        return this._encoding;
    }
    set encoding(encoding) {
        this._encoding = normalizeString(encoding, {
            fallbackValue: QR_ENCODINGS.default,
            validValues: QR_ENCODINGS.valid,
            toLowerCase: false
        });

        this._redraw();
    }

    /**
     * The error correction level used to encode the value. The possible values are:
     * * "L" - approximately 7% of the codewords can be restored.
     * * "M" - approximately 15% of the codewords can be restored.
     * * "Q" - approximately 25% of the codewords can be restored.
     * * "H" - approximately 30% of the codewords can be restored.
     *
     * @type {string}
     * @public
     * @default L
     */
    @api
    get errorCorrection() {
        return this._errorCorrection;
    }
    set errorCorrection(value) {
        this._errorCorrection = normalizeString(value, {
            fallbackValue: QR_ERROR_CORRECTIONS.default,
            validValues: QR_ERROR_CORRECTIONS.valid,
            toLowerCase: false
        });

        this._redraw();
    }

    /**
     * Sets the minimum distance in pixels that should be left between the border and the QR modules.
     *
     * @type {number}
     * @public
     * @default 0
     */
    @api
    get padding() {
        return this._padding;
    }
    set padding(value) {
        this._padding = isNaN(parseInt(value, 10)) ? DEFAULT_PADDING : value;

        this._redraw();
    }

    /**
     * Sets the preferred rendering engine. If it is not supported by the browser, the QRCode will switch to the first available mode. The supported values are:
     * * "canvas" - renders the widget as a Canvas element, if available.
     * * "svg" - renders the widget as inline SVG document, if available
     *
     * @type {string}
     * @public
     * @default svg
     */
    @api
    get renderAs() {
        return this._renderAs;
    }
    set renderAs(value) {
        this._renderAs = normalizeString(value, {
            fallbackValue: QR_RENDER_AS.default,
            validValues: QR_RENDER_AS.valid
        });

        this._color =
            this._renderAs === 'canvas' && !this._color ? DEFAULT_COLOR : null;
        this._background =
            this._renderAs === 'canvas' && !this._background
                ? DEFAULT_BACKGROUND_COLOR
                : null;

        this._redraw();
    }

    /**
     * Specifies the size of a QR code in pixels (i.e. "200px"). Numeric values are treated as pixels.
     * If no size is specified, it will be determined from the element width and height. In case the element has width or height of zero, a default value of 200 pixels will be used.
     *
     * @type {number}
     * @public
     * @default 200
     */
    @api
    get size() {
        return this._size;
    }
    set size(value) {
        const parsedValue = Number(value);
        const isValidSize = !isNaN(parsedValue) && parsedValue >= 1;

        this._size = isValidSize ? parsedValue : DEFAULT_SIZE;

        this._redraw();
    }

    /**
     * The value of the QRCode.
     *
     * @type {string}
     * @public
     * @required
     */
    @api
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;

        this._redraw();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Check if background is null.
     *
     * @type {boolean}
     */
    get isBackgroundNull() {
        return !this.background;
    }

    /**
     * Check if color is null.
     *
     * @type {boolean}
     */
    get isColorNull() {
        return !this.color;
    }

    /**
     * Render QR Code as SVG.
     *
     * @type {string}
     */
    get renderAsSvg() {
        return this.renderAs === 'svg';
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Redraws the QR code using the current value and options.
     *
     * @public
     */
    @api
    redraw() {
        if (this.value) {
            const qrCodeGenerated = new qrcodeGeneration(
                0,
                this._errorCorrection
            );

            qrCodeGenerated.addData(this.value, this._encoding);
            qrCodeGenerated.make();

            let svgCode = qrCodeGenerated.createSvgTag({
                cellColor: () => {
                    return this._color;
                },
                bg: {
                    enabled: true,
                    fill: this.background
                },
                margin: 0,
                svgSize: this.size,
                renderAsSvg: this.renderAsSvg,
                isColorNull: this.isColorNull,
                isBackgroundNull: this.isBackgroundNull
            });

            if (this.renderAsSvg) {
                let element = this.template.querySelector('.qrcode');

                if (!element) return;
                // eslint-disable-next-line @lwc/lwc/no-inner-html
                element.innerHTML = svgCode;

                element.firstElementChild.style.border = `${this.borderWidth}px solid ${this.borderColor}`;
                element.firstElementChild.style.padding = `${this.padding}px`;
                element.firstElementChild.style.maxWidth = '100%';
            } else {
                let canvas = this.template.querySelector('canvas');
                if (!canvas) return;

                if (this.size) {
                    canvas.width = this.size;
                    canvas.height = this.size;
                    canvas.style.maxWidth = this.size + 'px';
                } else {
                    canvas.style.width = '100%';
                    canvas.style.height = '100%';
                    canvas.width = canvas.offsetWidth;
                    canvas.height = canvas.offsetWidth;
                    canvas.style.maxWidth = this.offsetWidth + 'px';
                }

                canvas.style.border = `${this.borderWidth}px solid ${this.borderColor}`;
                canvas.style.padding = `${this.padding}px`;

                let ctx = canvas.getContext('2d');
                let img = new Image();

                img.onload = function () {
                    ctx.drawImage(this, 0, 0);
                };

                img.src =
                    'data:image/svg+xml; charset=utf8, ' +
                    encodeURIComponent(svgCode);
            }
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Verify if a color is a valid hexadecimal value.
     *
     * @param {string} hex - The color string to verify.
     * @returns {boolean} - Returns true if the string is a valid hexadecimal color, otherwise false.
     */
    _isHexColor(hex) {
        const hexRegex = /^[0-9A-Fa-f]{6}$/;
        return typeof hex === 'string' && hexRegex.test(hex);
    }

    /**
     * Calls the redraw method on the next animation frame.
     */
    _redraw() {
        if (this._rendered) {
            requestAnimationFrame(() => {
                this.redraw();
            });
        }
    }
}
