

import { LightningElement, api } from 'lwc';
import {
    normalizeBoolean,
    normalizeString,
    normalizeObject
} from 'c/utilsPrivate';
import { classSet } from 'c/utils';
import {
    applyBoundaries,
    followMagnifier,
    getCursorPosition,
    innerMagnifier,
    standardMagnifier
} from './magnifier';

const CROP_FIT = {
    valid: ['cover', 'contain', 'fill', 'none'],
    default: 'cover'
};
const CROP_SIZE = {
    valid: ['1x1', '4x3', '16x9', 'none'],
    default: 'none'
};
const POSITIONS = {
    valid: ['left', 'right', 'center'],
    default: undefined
};

const LAZY_LOADING_VARIANTS = {
    valid: ['auto', 'lazy'],
    default: 'auto'
};

const CROP_POSITION_X_DEFAULT = '50';
const CROP_POSITION_Y_DEFAULT = '50';

const MAGNIFIER_TYPES = {
    valid: ['standard', 'inner', 'follow'],
    default: undefined
};
const MAGNIFIER_POSITIONS = {
    valid: ['auto', 'left', 'right', 'top', 'bottom'],
    default: 'auto'
};
const DEFAULT_ZOOM_RATIO = '100px';
const DEFAULT_ZOOM_FACTOR = 2;

const COMPARE_ORIENTATION = {
    valid: ['horizontal', 'vertical'],
    default: 'horizontal'
};

const MOVE_ON_OPTIONS = {
    valid: ['hover', 'click'],
    default: 'click'
};

/**
 * @class
 * @descriptor avonni-image
 * @storyId example-image--base
 * @public
 */
export default class Image extends LightningElement {
    /**
     * The value to set for the 'alt' attribute.
     *
     * @public
     * @type  {string}
     */
    @api alternativeText;

    /**
     * The image to compare with.
     *
     * @public
     * @type {string}
     */
    @api compareSrc;

    _aspectRatio;
    _compareAttributes = {
        orientation: COMPARE_ORIENTATION.default,
        moveOn: MOVE_ON_OPTIONS.default,
        showLabelsOnHover: false
    };
    _cropPositionX = CROP_POSITION_X_DEFAULT;
    _cropPositionY = CROP_POSITION_Y_DEFAULT;
    _cropFit = CROP_FIT.default;
    _cropSize;
    _fluid = false;
    _fluidGrow = false;
    _height;
    _imgElementWidth;
    _imgElementHeight;
    _isDraggingCompareCursor = false;
    _lazyLoading = LAZY_LOADING_VARIANTS.default;
    _magnifierType = MAGNIFIER_TYPES.default;
    _magnifierAttributes = {
        position: MAGNIFIER_POSITIONS.default,
        horizontalOffset: 0,
        verticalOffset: 0,
        smoothMove: false,
        zoomFactor: DEFAULT_ZOOM_FACTOR,
        zoomRatioWidth: DEFAULT_ZOOM_RATIO,
        zoomRatioHeight: DEFAULT_ZOOM_RATIO
    };
    _position = POSITIONS.default;
    _sizes;
    _src;
    _srcset;
    _staticImages = false;
    _thumbnail = false;
    _width;

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Specifies the compare slider attributes.
     *
     * @type {object}
     * @public
     */
    @api
    get compareAttributes() {
        return this._compareAttributes;
    }

    set compareAttributes(value) {
        const normalizedAttributes = normalizeObject(value);

        this._compareAttributes.orientation = normalizeString(
            normalizedAttributes.orientation,
            {
                fallbackValue: COMPARE_ORIENTATION.default,
                validValues: COMPARE_ORIENTATION.valid
            }
        );

        this._compareAttributes.moveOn = normalizeString(
            normalizedAttributes.moveOn,
            {
                fallbackValue: MOVE_ON_OPTIONS.default,
                validValues: MOVE_ON_OPTIONS.valid
            }
        );

        this._compareAttributes.originalLabel =
            normalizedAttributes.originalLabel;
        this._compareAttributes.compareLabel =
            normalizedAttributes.compareLabel;

        this._compareAttributes.showLabelsOnHover = normalizeBoolean(
            normalizedAttributes.showLabelsOnHover
        );

        this._compareAttributes = { ...this._compareAttributes };
    }

    /**
     * Position of the image on the X axis (in percent).
     *
     * @public
     * @type {number}
     */
    @api
    get cropPositionX() {
        return this._cropPositionX;
    }

    set cropPositionX(value) {
        const normalizedValue = parseFloat(value);
        if (!isNaN(normalizedValue)) {
            this._cropPositionX = normalizedValue;
        }
    }

    /**
     * Position of the image on the Y axis (in percent).
     *
     * @public
     * @type {number}
     */
    @api
    get cropPositionY() {
        return this._cropPositionY;
    }

    set cropPositionY(value) {
        const normalizedValue = parseFloat(value);
        if (!isNaN(normalizedValue)) {
            this._cropPositionY = normalizedValue;
        }
    }

    /**
     * Image fit behavior inside its container. Valid values include cover, contain, fill and none.
     *
     * @public
     * @type {string}
     * @default cover
     */
    @api
    get cropFit() {
        return this._cropFit;
    }

    set cropFit(value) {
        this._cropFit = normalizeString(value, {
            fallbackValue: CROP_FIT.default,
            validValues: CROP_FIT.valid
        });
    }

    /**
     * Cropping ratio of the image. Valid values are “1x1”, “4x3”, “16x9” or “none”.
     *
     * @public
     * @type {string}
     * @default none
     */
    @api
    get cropSize() {
        return this._cropSize;
    }

    set cropSize(value) {
        const cropSize = normalizeString(value, {
            fallbackValue: CROP_SIZE.default,
            validValues: CROP_SIZE.valid
        });
        switch (cropSize) {
            case '1x1':
                this._cropSize = '100';
                this._aspectRatio = '1/1';
                break;
            case '4x3':
                this._cropSize = '75';
                this._aspectRatio = '4/3';
                break;
            case '16x9':
                this._cropSize = '56.25';
                this._aspectRatio = '16/9';
                break;
            default:
                this._cropSize = null;
                this._aspectRatio = null;
        }
    }

    /**
     * If present, the image is responsive and will take up 100% of its container width, to a maximum of its original width.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get fluid() {
        return this._fluid;
    }

    set fluid(value) {
        this._fluid = normalizeBoolean(value);
    }

    /**
     * If present, the image is responsive and will take up 100% of its container width.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get fluidGrow() {
        return this._fluidGrow;
    }

    set fluidGrow(value) {
        this._fluidGrow = normalizeBoolean(value);
    }

    /**
     * Height of the image.
     *
     * @public
     * @type {number | string}
     */
    @api
    get height() {
        return this._height;
    }

    set height(value) {
        if (value && !isNaN(value)) {
            this._height = `${value}px`;
        } else {
            this._height = value;
        }
    }

    /**
     * Enables lazy loading for images that are offscreen. If set to lazy, the property ensures that offscreen images are loaded early enough so that they have finished loading once the user scrolls near them. Valid values are 'auto' and 'lazy'.
     * Note: Keep in mind that the property uses the loading attribute of HTML <img> element which is not supported for Internet Explorer.
     *
     * @public
     * @type {string}
     * @default auto
     */
    @api
    get lazyLoading() {
        return this._lazyLoading;
    }

    set lazyLoading(value) {
        this._lazyLoading = normalizeString(value, {
            fallbackValue: LAZY_LOADING_VARIANTS.default,
            validValues: LAZY_LOADING_VARIANTS.valid
        });
    }

    /**
     * Specifies the magnifier's attributes.
     *
     * @type {object}
     * @public
     */
    @api
    get magnifierAttributes() {
        return this._magnifierAttributes;
    }

    set magnifierAttributes(value) {
        const normalizedAttributes = normalizeObject(value);

        this._magnifierAttributes.position = normalizeString(
            normalizedAttributes.position,
            {
                fallbackValue: MAGNIFIER_POSITIONS.default,
                validValues: MAGNIFIER_POSITIONS.valid
            }
        );

        if (!isNaN(normalizedAttributes.horizontalOffset)) {
            this._magnifierAttributes.horizontalOffset = Number(
                normalizedAttributes.horizontalOffset
            );
        } else {
            this._magnifierAttributes.horizontalOffset = 0;
        }

        if (
            !isNaN(normalizedAttributes.verticalOffset) &&
            normalizedAttributes.verticalOffset !== ''
        ) {
            this._magnifierAttributes.verticalOffset = Number(
                normalizedAttributes.verticalOffset
            );
        } else {
            this._magnifierAttributes.verticalOffset = 0;
        }

        this._magnifierAttributes.smoothMove = normalizedAttributes.smoothMove
            ? normalizeBoolean(normalizedAttributes.smoothMove)
            : false;

        if (
            normalizedAttributes.zoomFactor &&
            !isNaN(normalizedAttributes.zoomFactor)
        ) {
            this._magnifierAttributes.zoomFactor =
                normalizedAttributes.zoomFactor;
        } else {
            this._magnifierAttributes.zoomFactor = DEFAULT_ZOOM_FACTOR;
        }

        if (
            normalizedAttributes.zoomRatioWidth &&
            !isNaN(normalizedAttributes.zoomRatioWidth) &&
            normalizedAttributes.zoomRatioWidth > 0
        ) {
            this._magnifierAttributes.zoomRatioWidth = `${normalizedAttributes.zoomRatioWidth}px`;
        } else if (
            normalizedAttributes.zoomRatioWidth &&
            parseFloat(normalizedAttributes.zoomRatioWidth) > 0
        ) {
            this._magnifierAttributes.zoomRatioWidth =
                normalizedAttributes.zoomRatioWidth;
        } else {
            this._magnifierAttributes.zoomRatioWidth = DEFAULT_ZOOM_RATIO;
        }

        if (
            normalizedAttributes.zoomRatioHeight &&
            !isNaN(normalizedAttributes.zoomRatioHeight) &&
            normalizedAttributes.zoomRatioHeight > 0
        ) {
            this._magnifierAttributes.zoomRatioHeight = `${normalizedAttributes.zoomRatioHeight}px`;
        } else if (
            normalizedAttributes.zoomRatioHeight &&
            parseFloat(normalizedAttributes.zoomRatioHeight) > 0
        ) {
            this._magnifierAttributes.zoomRatioHeight =
                normalizedAttributes.zoomRatioHeight;
        } else {
            this._magnifierAttributes.zoomRatioHeight = DEFAULT_ZOOM_RATIO;
        }

        this._magnifierAttributes = { ...this._magnifierAttributes };
    }

    /**
     * Specifies the magnifier type. If a type is selected, a zoom of the hovered area will be displayed. Valid values include standard, inner and follow.
     *
     * @public
     * @type {string}
     */
    @api
    get magnifierType() {
        return this._magnifierType;
    }

    set magnifierType(value) {
        this._magnifierType = normalizeString(value, {
            fallbackValue: MAGNIFIER_TYPES.default,
            validValues: MAGNIFIER_TYPES.valid
        });
    }

    /**
     * Specifies the position of the image. Valid values include left, center and right.
     *
     * @public
     * @type {string}
     */
    @api
    get position() {
        return this._position;
    }

    set position(value) {
        this._position = normalizeString(value, {
            fallbackValue: POSITIONS.default,
            validValues: POSITIONS.valid
        });
    }

    /**
     * One or more strings separated by commas (or an array of strings), indicating a set of source sizes. Optionally used in combination with the srcset prop.
     *
     * @public
     * @type {string | object[]}
     */
    @api
    get sizes() {
        return this._sizes;
    }

    set sizes(value) {
        if (Array.isArray(value)) {
            this._sizes = value.join(',');
        } else {
            this._sizes = value;
        }
    }

    /**
     * URL to set for the 'src' attribute.
     *
     * @public
     * @type {string}
     */
    @api
    get src() {
        return this._src;
    }

    set src(value) {
        this._src = value;
    }

    /**
     * One or more strings separated by commas (or an array of strings), indicating possible image sources for the user agent to use.
     *
     * @public
     * @type {string | object[]}
     */
    @api
    get srcset() {
        return this._srcset;
    }

    set srcset(value) {
        if (Array.isArray(value)) {
            this._srcset = value.join(',');
        } else {
            this._srcset = value;
        }
    }

    /**
     * Sets the image as static. Images retain their current dimensions and will no longer be responsive.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get staticImages() {
        return this._staticImages;
    }

    set staticImages(value) {
        this._staticImages = normalizeBoolean(value);
    }

    /**
     * Adds a thumbnail border around the image.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get thumbnail() {
        return this._thumbnail;
    }

    set thumbnail(value) {
        this._thumbnail = normalizeBoolean(value);
    }

    /**
     * The value to set on the image's 'width' attribute.
     *
     * @public
     * @type {number | string}
     */
    @api
    get width() {
        return this._width;
    }

    set width(value) {
        if (value && !isNaN(value)) {
            this._width = `${value}px`;
        } else {
            this._width = value;
        }
    }

    /**
     * Final computed compare container class styling.
     *
     * @public
     * @type {string}
     */
    get computedCompareContainerClass() {
        return classSet('avonni-image__compare-container slds-is-absolute')
            .add({
                'avonni-image__container_compare-labels-on-hover':
                    this.compareAttributes.showLabelsOnHover
            })
            .toString();
    }

    get computedCompareImgContainerStyle() {
        return this.compareAttributes.orientation === 'horizontal'
            ? 'width: 50%; height: 100%;'
            : 'width: 100%; height: 50%;';
    }

    get computedCompareImgStyle() {
        const styleProperties = {};

        styleProperties['object-fit'] = this.cropFit;
        styleProperties[
            'object-position'
        ] = `${this.cropPositionX}% ${this.cropPositionY}%`;
        styleProperties['aspect-ratio'] = this._aspectRatio;

        styleProperties['min-width'] =
            this.staticImages && this.width ? this.width : null;
        styleProperties['max-width'] =
            this.staticImages && this.width ? this.width : null;
        styleProperties['min-height'] =
            this.staticImages && this.height ? this.height : null;
        styleProperties['max-height'] =
            this.staticImages && this.height ? this.height : null;

        if (
            this.height &&
            !this.width &&
            this.compareAttributes.orientation === 'horizontal'
        ) {
            styleProperties.width = `${
                (parseFloat(this.height) / this._imgElementHeight) *
                this._imgElementWidth
            }px`;
        } else if (
            this.height &&
            !this.width &&
            this.compareAttributes.orientation === 'vertical'
        ) {
            styleProperties.width = 'inherit';
        } else if (this.width) {
            styleProperties.width = this.width;
        } else {
            styleProperties.width = `${this._imgElementWidth}px`;
        }

        if (
            (this.height && this.width) ||
            (this.compareAttributes.orientation === 'vertical' && this.height)
        ) {
            styleProperties.height = this.height;
        } else if (this.compareAttributes.orientation === 'horizontal') {
            styleProperties.height = 'inherit';
        } else {
            styleProperties.height = `${this._imgElementHeight}px`;
        }

        let styleValue = '';
        if (styleProperties) {
            Object.keys(styleProperties).forEach((key) => {
                if (styleProperties[key]) {
                    styleValue += `${key}: ${styleProperties[key]}; `;
                }
            });
        }

        return styleValue;
    }

    /**
     * The compare slider first icon (left or up).
     *
     * @type {string}
     */
    get compareIconName1() {
        return this.compareAttributes.orientation === 'horizontal'
            ? 'utility:left'
            : 'utility:up';
    }

    /**
     * The compare slider second icon (right or down).
     *
     * @type {string}
     */
    get compareIconName2() {
        return this.compareAttributes.orientation === 'horizontal'
            ? 'utility:right'
            : 'utility:down';
    }

    /**
     * Final computed Image class styling.
     *
     * @type {string}
     */
    get computedImageClass() {
        return classSet('avonni-image_container')
            .add({
                'avonni-image_fluid': this.fluid || this.fluidGrow,
                'avonni-image_fluid-grow': this.fluidGrow,
                'avonni-image_thumbnail': this.thumbnail,
                'slds-float_left':
                    this._position === 'left' && this._lazyLoading === 'auto',
                'slds-float_right': this._position === 'right',
                'slds-align_absolute-center': this._position === 'center',
                'slds-show': this._position === 'center',
                'avonni-image__container_compare-labels-on-hover':
                    this.compareAttributes.showLabelsOnHover,
                'avonni-image__container_user-select_none': this.compareSrc
            })
            .toString();
    }

    /**
     * Final computed Magnifier Style.
     *
     * @type {string}
     */
    get computedMagnifierStyle() {
        const styleProperties = {};

        styleProperties.width = this.magnifierAttributes.zoomRatioWidth;
        styleProperties.height = this.magnifierAttributes.zoomRatioHeight;

        let styleValue = '';
        if (styleProperties) {
            Object.keys(styleProperties).forEach((key) => {
                if (styleProperties[key]) {
                    styleValue += `${key}: ${styleProperties[key]}; `;
                }
            });
        }
        return styleValue;
    }

    /**
     * Final Computed Magnifier Image Style.
     *
     * @type {string}
     */
    get computedMagnifiedImgStyle() {
        const styleProperties = {};

        styleProperties['object-fit'] = this.cropFit ? this.cropFit : null;
        styleProperties['aspect-ratio'] = this._aspectRatio
            ? this._aspectRatio
            : null;
        styleProperties[
            'object-position'
        ] = `${this.cropPositionX}% ${this.cropPositionY}%`;

        if (this.magnifierAttributes.smoothMove) {
            styleProperties.transition = 'transform 0.15s ease-out';
        }

        let styleValue = '';
        if (styleProperties) {
            Object.keys(styleProperties).forEach((key) => {
                if (styleProperties[key]) {
                    styleValue += `${key}: ${styleProperties[key]};`;
                }
            });
        }
        return styleValue;
    }

    /**
     * Final computed 'after' overlay class styling.
     *
     * @type {string}
     */
    get computedOverlayAfterClass() {
        return classSet('avonni-image__compare-overlay slds-is-absolute')
            .add({
                'avonni-image__compare-overlay-after_horizontal':
                    this.compareAttributes.orientation === 'horizontal',
                'avonni-image__compare-overlay-after_vertical':
                    this.compareAttributes.orientation === 'vertical'
            })
            .toString();
    }

    /**
     * Final computed 'before' overlay class styling.
     *
     * @type {string}
     */
    get computedOverlayBeforeClass() {
        return classSet('avonni-image__compare-overlay slds-is-absolute')
            .add({
                'avonni-image__compare-overlay-before_horizontal':
                    this.compareAttributes.orientation === 'horizontal',
                'avonni-image__compare-overlay-before_vertical':
                    this.compareAttributes.orientation === 'vertical'
            })
            .toString();
    }

    /**
     * Final computed compare slider class styling.
     *
     * @type {string}
     */
    get computedSliderClass() {
        return classSet('avonni-image__compare-slider')
            .add({
                'avonni-image__compare-slider_horizontal':
                    this.compareAttributes.orientation === 'horizontal',
                'avonni-image__compare-slider_vertical':
                    this.compareAttributes.orientation === 'vertical'
            })
            .toString();
    }

    /**
     * Final computed compare slider handle class styling.
     *
     * @type {string}
     */
    get computedSliderHandleClass() {
        return classSet(
            'avonni-image__compare-slider-handle slds-is-absolute slds-align_absolute-center'
        )
            .add({
                'slds-grid_vertical':
                    this.compareAttributes.orientation === 'vertical'
            })
            .toString();
    }

    /**
     * Final computed slider style.
     *
     * @type {string}
     */
    get computedSliderStyle() {
        return this.compareAttributes.orientation === 'horizontal'
            ? 'top: 0;'
            : 'left: 0;';
    }

    /**
     * Final Computed Image Style.
     *
     * @type {string}
     */
    get computedStyle() {
        const styleProperties = {};

        styleProperties['object-fit'] = this.cropFit;
        styleProperties[
            'object-position'
        ] = `${this.cropPositionX}% ${this.cropPositionY}%`;
        styleProperties['aspect-ratio'] = this._aspectRatio;

        styleProperties['min-width'] =
            this.staticImages && this.width ? this.width : null;
        styleProperties['max-width'] =
            this.staticImages && this.width ? this.width : null;
        styleProperties['min-height'] =
            this.staticImages && this.height ? this.height : null;
        styleProperties['max-height'] =
            this.staticImages && this.height ? this.height : null;

        styleProperties.width =
            this._cropSize && !this.width && !this.height
                ? `${this._imgElementWidth}px`
                : this.width;
        styleProperties.height = this._height;

        let styleValue = '';
        if (styleProperties) {
            Object.keys(styleProperties).forEach((key) => {
                if (styleProperties[key]) {
                    styleValue += `${key}: ${styleProperties[key]}; `;
                }
            });
        }

        return styleValue;
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Handle the 'click' type slider.
     */
    _clickSlider(event) {
        const img = this.template.querySelector('[data-element-id="img"]');
        const container = this.template.querySelector(
            '[data-element-id="compare-container"]'
        );
        const slider = this.template.querySelector(
            '[data-element-id="compare-slider"]'
        );
        const compareImg = this.template.querySelector(
            '[data-element-id="compare-img-container"]'
        );
        const rect = container.getBoundingClientRect();
        let posX =
            event.type === 'touchmove'
                ? event.touches[0].clientX
                : event.clientX;
        let posY =
            event.type === 'touchmove'
                ? event.touches[0].clientY
                : event.clientY;
        posX -= rect.left;
        posY -= rect.top;
        slider.style.transition = 'none';
        compareImg.style.transition = 'none';
        if (
            this.compareAttributes.orientation === 'horizontal' &&
            this._isDraggingCompareCursor &&
            posX <= img.width &&
            posX >= 0
        ) {
            slider.style.left = `${posX}px`;
            compareImg.style.width = `${posX}px`;
        } else if (
            this.compareAttributes.orientation === 'vertical' &&
            this._isDraggingCompareCursor &&
            posY <= img.height &&
            posY >= 0
        ) {
            slider.style.top = `${posY}px`;
            compareImg.style.height = `${posY}px`;
        }
    }

    /**
     * Slide the compare slider on hover.
     */
    _hoverSlider(event) {
        const img = this.template.querySelector('[data-element-id="img"]');
        const slider = this.template.querySelector(
            '[data-element-id="compare-slider"]'
        );
        const container = this.template.querySelector(
            '[data-element-id="compare-container"]'
        );
        const compareImg = this.template.querySelector(
            '[data-element-id="compare-img-container"]'
        );
        //const pos = getCursorPosition(event);
        const rect = container.getBoundingClientRect();
        const posX = event.clientX - rect.left;
        const posY = event.clientY - rect.top;
        slider.style.pointerEvents = 'none';
        slider.style.transition = 'none';
        compareImg.style.transition = 'none';
        if (
            this.compareAttributes.orientation === 'horizontal' &&
            posX <= img.width &&
            posX >= 0
        ) {
            slider.style.left = `${posX}px`;
            compareImg.style.width = `${posX}px`;
        } else if (
            this.compareAttributes.orientation === 'vertical' &&
            posY <= img.height &&
            posY >= 0
        ) {
            slider.style.top = `${posY}px`;
            compareImg.style.height = `${posY}px`;
        }
        container.style.cursor = 'grabbing';
    }

    /**
     * Initiate the compare slider.
     */
    _initCompareSlider(img) {
        const compareImgContainer = this.template.querySelector(
            '[data-element-id="compare-img-container"]'
        );
        if (this.compareAttributes.orientation === 'horizontal') {
            compareImgContainer.style.width = `${img.width / 2}px`;
        } else {
            compareImgContainer.style.height = `${img.height / 2}px`;
        }
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS
     * -------------------------------------------------------------
     */

    /**
     * Handle the 'keydown' event on the compare slider handle.
     */
    handleCompareKeydown(event) {
        const handle = this.template.querySelector(
            '[data-element-id="compare-slider-handle"]'
        );
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            const handleMouseDown = () => {
                this._isDraggingCompareCursor = false;
                handle.setAttribute(
                    'aria-pressed',
                    this._isDraggingCompareCursor
                );
                window.removeEventListener('mousedown', handleMouseDown);
            };
            window.addEventListener('mousedown', handleMouseDown);
            this._isDraggingCompareCursor = !this._isDraggingCompareCursor;
            handle.setAttribute('aria-pressed', this._isDraggingCompareCursor);
        } else if (this._isDraggingCompareCursor) {
            event.preventDefault();
            const img = this.template.querySelector('[data-element-id="img"]');
            const slider = this.template.querySelector(
                '[data-element-id="compare-slider"]'
            );
            const compareImg = this.template.querySelector(
                '[data-element-id="compare-img-container"]'
            );
            const computedStyle = window.getComputedStyle(slider);
            let initialPosition;
            if (this.compareAttributes.orientation === 'horizontal') {
                initialPosition = computedStyle.getPropertyValue('left');
            } else {
                initialPosition = computedStyle.getPropertyValue('top');
            }
            const numericValue = parseFloat(initialPosition);
            slider.style.transition = 'all 0.15s ease-out';
            compareImg.style.transition = 'all 0.15s ease-out';
            if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                if (this.compareAttributes.orientation === 'horizontal') {
                    if (numericValue > 20) {
                        slider.style.left = `${numericValue - 20}px`;
                        compareImg.style.width = `${numericValue - 20}px`;
                    } else {
                        slider.style.left = '0';
                        compareImg.style.width = '0';
                    }
                } else {
                    if (numericValue > 20) {
                        slider.style.top = `${numericValue - 20}px`;
                        compareImg.style.height = `${numericValue - 20}px`;
                    } else {
                        slider.style.top = '0';
                        compareImg.style.height = '0';
                    }
                }
            } else if (
                event.key === 'ArrowRight' ||
                event.key === 'ArrowDown'
            ) {
                if (this.compareAttributes.orientation === 'horizontal') {
                    if (numericValue < img.width - 20) {
                        slider.style.left = `${numericValue + 20}px`;
                        compareImg.style.width = `${numericValue + 20}px`;
                    } else {
                        slider.style.left = `${img.width}px`;
                        compareImg.style.width = `${img.width}px`;
                    }
                } else {
                    if (numericValue < img.height - 20) {
                        slider.style.top = `${numericValue + 20}px`;
                        compareImg.style.height = `${numericValue + 20}px`;
                    } else {
                        slider.style.top = `${img.height}px`;
                        compareImg.style.height = `${img.height}px`;
                    }
                }
            }
        }
    }

    /**
     * Slide and grip the compare slider on click.
     */
    handleCompareMouseDown(event) {
        if (
            (this.compareAttributes.moveOn !== 'click' &&
                event.type !== 'touchstart') ||
            (event.button !== 0 && event.type !== 'touchstart')
        ) {
            return;
        }
        const container = this.template.querySelector(
            '[data-element-id="compare-container"]'
        );
        const compareImg = this.template.querySelector(
            '[data-element-id="compare-img-container"]'
        );
        const slider = this.template.querySelector(
            '[data-element-id="compare-slider"]'
        );
        const handle = this.template.querySelector(
            '[data-element-id="compare-slider-handle"]'
        );
        const rect = container.getBoundingClientRect();
        container.style.cursor = 'grabbing';
        handle.style.cursor = 'grabbing';
        this._isDraggingCompareCursor = true;
        slider.style.transition = 'all 0.15s ease-in-out';
        compareImg.style.transition = 'all 0.15s ease-in-out';
        const posX = event.clientX - rect.left;
        const posY = event.clientY - rect.top;
        if (this.compareAttributes.orientation === 'horizontal') {
            slider.style.left = `${posX}px`;
            compareImg.style.width = `${posX}px`;
        } else {
            slider.style.top = `${posY}px`;
            compareImg.style.height = `${posY}px`;
        }
        const handleMouseUp = () => {
            this._isDraggingCompareCursor = false;
            container.style.cursor = 'default';
            handle.style.cursor = 'grab';
            window.removeEventListener('mouseup', handleMouseUp);
        };
        window.addEventListener('mouseup', handleMouseUp);
    }

    /**
     * Call the right compare slider type on mouse move.
     */
    handleCompareMouseMove(event) {
        if (
            this.compareAttributes.moveOn === 'hover' &&
            event.type !== 'touchmove'
        ) {
            this._hoverSlider(event);
        } else {
            this._clickSlider(event);
        }
    }

    /**
     * Get Image dimensions when values missing or %.
     *
     * @returns {number} imgHeight , imgWidth
     */
    handleLoadImage() {
        const img = this.template.querySelector('[data-element-id="img"]');
        if (img) {
            this._imgElementWidth = img.clientWidth;
            this._imgElementHeight = img.clientHeight;
            if (this.magnifier) {
                this.handleMagnifier(img);
            }
            if (this.compareSrc) {
                requestAnimationFrame(() => {
                    this._initCompareSlider(img);
                });
            }
        }
    }

    /**
     * Call the right function to handle the magnifier.
     */
    handleMagnifierMove(event) {
        if (!MAGNIFIER_TYPES.valid.includes(this.magnifierType)) {
            return;
        }
        const img = event.target;
        const magnifier = this.template.querySelector(
            '[data-element-id="magnifier"]'
        );
        const magnifiedLens = this.template.querySelector(
            '[data-element-id="magnifier-lens"]'
        );
        const magnifiedImage = this.template.querySelector(
            '[data-element-id="magnified-img"]'
        );
        if (this.magnifierType === 'inner') {
            magnifier.style.width = `${img.width}px`;
            magnifier.style.height = `${img.height}px`;
        } else {
            magnifier.style.width = this.magnifierAttributes.zoomRatioWidth;
            magnifier.style.height = this.magnifierAttributes.zoomRatioHeight;
        }
        magnifier.style.display = 'block';
        const w = magnifier.offsetWidth / 2;
        const h = magnifier.offsetHeight / 2;
        const dimensions = {
            img: img,
            w: w,
            h: h
        };
        const realPos = getCursorPosition(event);
        const boundedPos = applyBoundaries(
            realPos,
            dimensions,
            this.magnifierAttributes
        );
        const data = {
            x: boundedPos.x,
            y: boundedPos.y,
            w: w,
            h: h,
            magnifier: magnifier,
            magnifiedLens: magnifiedLens,
            magnifiedImage: magnifiedImage,
            img: img
        };
        img.style.cursor = 'crosshair';
        magnifiedImage.style.height = `${
            data.img.height * this.magnifierAttributes.zoomFactor
        }px`;
        magnifiedImage.style.width = `${
            data.img.width * this.magnifierAttributes.zoomFactor
        }px`;

        switch (this.magnifierType) {
            case 'standard':
                standardMagnifier(
                    data,
                    this.magnifierAttributes,
                    this.position
                );
                break;
            case 'inner':
                innerMagnifier(data, this.magnifierAttributes.zoomFactor);
                break;
            case 'follow':
                followMagnifier(data, this.magnifierAttributes.zoomFactor);
                break;
            default:
                break;
        }
    }

    /**
     * Remove the magnifier when mouse out.
     */
    handleMagnifierOut() {
        const magnifier = this.template.querySelector(
            '[data-element-id="magnifier"]'
        );
        const magnifiedLens = this.template.querySelector(
            '[data-element-id="magnifier-lens"]'
        );
        magnifier.style.display = 'none';
        magnifiedLens.style.display = 'none';
    }
}
