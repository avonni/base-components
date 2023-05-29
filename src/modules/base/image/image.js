/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2021, Avonni Labs, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { LightningElement, api } from 'lwc';
import { normalizeBoolean, normalizeString } from 'c/utilsPrivate';
import { classSet } from 'c/utils';
import { normalizeObject } from '../utilsPrivate/normalize';

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
    valid: ['none', 'standard', 'inner', 'follow'],
    default: 'none'
};
const MAGNIFIER_POSITIONS = {
    valid: ['auto', 'left', 'right', 'top', 'bottom'],
    default: 'auto'
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
     * Position of the image on the X axis (in percent).
     *
     * @public
     * @type {number}
     */
    @api cropPositionX = CROP_POSITION_X_DEFAULT;
    /**
     * Position of the image on the Y axis (in percent).
     *
     * @public
     * @type {number}
     */
    @api cropPositionY = CROP_POSITION_Y_DEFAULT;

    _cropFit = CROP_FIT.default;
    _cropSize;
    _fluid = false;
    _fluidGrow = false;
    _height;
    _lazyLoading = LAZY_LOADING_VARIANTS.default;
    _position = POSITIONS.default;
    _sizes;
    _src;
    _srcset;
    _staticImages = false;
    _thumbnail = false;
    _width;
    _magnifierType = MAGNIFIER_TYPES.default;
    _magnifierAttributes = {
        position: MAGNIFIER_POSITIONS.default,
        horizontalOffset: 0,
        verticalOffset: 0,
        smoothMove: true,
        zoomFactor: 2,
        zoomRatioWidth: 100,
        zoomRatioHeight: 100
    };

    _imgElementWidth;
    _imgElementHeight;
    _aspectRatio;

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Image fit behavior inside its container. Valid values include cover, contain, fill and none.
     *
     * @public
     * @type {string}
     * @default cover
     */
    @api get cropFit() {
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
    @api get cropSize() {
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
     * Specifies the magnifier type. Valid values include standard, inner and follow.
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
     * Magnifier attributes: position, horizontalOffset, verticalOffset, smoothing, zoomFactor, zoomRatioWidth and zoomRatioHeight.
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

        this._magnifierAttributes.smoothMove = normalizeBoolean(
            normalizedAttributes.smoothMove
        );

        this._magnifierAttributes.zoomFactor = !isNaN(
            normalizedAttributes.zoomFactor
        )
            ? normalizedAttributes.zoomFactor
            : 2;

        if (
            normalizedAttributes.zoomRatioWidth &&
            !isNaN(normalizedAttributes.zoomRatioWidth)
        ) {
            this._magnifierAttributes.zoomRatioWidth = `${normalizedAttributes.zoomRatioWidth}px`;
        } else {
            this._magnifierAttributes.zoomRatioWidth =
                normalizedAttributes.zoomRatioWidth;
        }

        if (
            normalizedAttributes.zoomRatioHeight &&
            !isNaN(normalizedAttributes.zoomRatioHeight)
        ) {
            this._magnifierAttributes.zoomRatioHeight = `${normalizedAttributes.zoomRatioHeight}px`;
        } else {
            this._magnifierAttributes.zoomRatioHeight =
                normalizedAttributes.zoomRatioHeight;
        }
    }

    /**
     * Computed Image class styling.
     *
     * @type {string}
     */
    get computedImageClass() {
        return classSet('avonni-image avonni-image_container')
            .add({
                'avonni-image_fluid': this.fluid || this.fluidGrow,
                'avonni-image_fluid-grow': this.fluidGrow,
                'avonni-image_thumbnail': this.thumbnail,
                'avonni-image_float-left':
                    this._position === 'left' && this._lazyLoading === 'auto',
                'avonni-image_float-right': this._position === 'right',
                'avonni-image_margin-auto': this._position === 'center',
                'avonni-image_display-block': this._position === 'center'
            })
            .toString();
    }

    /**
     * Final Computed Image Style.
     *
     * @type {boolean}
     */
    get computedStyle() {
        let styleProperties = {};

        styleProperties['object-fit'] = this.cropFit ? this.cropFit : null;
        styleProperties['object-position'] =
            this.cropPositionX !== '' && this.cropPositionY !== ''
                ? `${this.cropPositionX}% ${this.cropPositionY}%`
                : null;
        styleProperties['aspect-ratio'] = this._aspectRatio
            ? this._aspectRatio
            : null;

        if (this.staticImages) {
            styleProperties['min-width'] = this._width ? this._width : null;
            styleProperties['max-width'] = this._width ? this._width : null;
            styleProperties['min-height'] = this._height ? this._height : null;
            styleProperties['max-height'] = this._height ? this._height : null;
        } else {
            styleProperties['min-width'] = null;
            styleProperties['max-width'] = null;
            styleProperties['min-height'] = null;
            styleProperties['max-height'] = null;
        }

        styleProperties.width =
            this._cropSize && !this._width && !this._height
                ? `${this._imgElementWidth}px`
                : this._width;
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

    get computedMagnifierStyle() {
        let styleProperties = {};

        styleProperties.width = this.magnifierAttributes.zoomRatioWidth;
        styleProperties.height = this.magnifierAttributes.zoomRatioHeight;
        styleProperties.overflow = 'hidden';

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

    get computedMagnifiedImgStyle() {
        let styleProperties = {};

        styleProperties.position = 'absolute';
        styleProperties['object-fit'] = this.cropFit ? this.cropFit : null;
        styleProperties['max-width'] = 'fit-content';
        styleProperties['aspect-ratio'] = this._aspectRatio
            ? this._aspectRatio
            : null;
        styleProperties['object-position'] =
            this.cropPositionX !== '' && this.cropPositionY !== ''
                ? `${this.cropPositionX}% ${this.cropPositionY}%`
                : null;

        if (this.magnifierAttributes.smoothMove) {
            styleProperties.transition = 'transform 0.15s ease-out';
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
     * Get Image dimensions when values missing or %.
     *
     * @returns {number} imgHeight , imgWidth
     */
    handleLoadImage() {
        const img = this.template.querySelector('[data-element-id="img"]');
        if (img) {
            this._imgElementWidth = img.clientWidth;
            this._imgElementHeight = img.clientHeight;
        }
    }

    /**
     * Call the right function to handle the magnifier.
     *
     * @returns {void}
     */
    handleMouseMove(event) {
        if (this.magnifierType !== 'none') {
            event.preventDefault();
            event.stopPropagation();
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
            const computedStyle = window.getComputedStyle(magnifier);
            const borderWidthValue = parseFloat(
                computedStyle.getPropertyValue('border-width')
            );
            const borderWidth = isNaN(borderWidthValue) ? 0 : borderWidthValue;
            const w = magnifier.offsetWidth / 2;
            const h = magnifier.offsetHeight / 2;
            const pos = this.getPos(event);
            const finalPos = this.applyBoundaries(pos, img, w, h, borderWidth);
            const data = {
                x: finalPos.x,
                y: finalPos.y,
                w: w,
                h: h,
                magnifier: magnifier,
                magnifiedLens: magnifiedLens,
                magnifiedImage: magnifiedImage,
                img: img
            };
            img.style.cursor = 'crosshair';
            magnifier.style.display = 'block';
            magnifiedImage.style.height = `${
                data.img.height * this.magnifierAttributes.zoomFactor
            }px`;

            switch (this.magnifierType) {
                case 'standard':
                    this.standardMagnifier(data);
                    break;
                case 'inner':
                    this.innerMagnifier(data);
                    break;
                case 'follow':
                    this.followMagnifier(data);
                    break;
                default:
                    break;
            }
        }
    }

    handleMouseOut() {
        const magnifier = this.template.querySelector(
            '[data-element-id="magnifier"]'
        );
        const magnifiedLens = this.template.querySelector(
            '[data-element-id="magnifier-lens"]'
        );
        magnifier.style.display = 'none';
        magnifiedLens.style.display = 'none';
    }

    /**
     * Apply the standard magnifying effect to the image.
     *
     * @returns {void}
     */
    standardMagnifier(data) {
        const ratioW = parseFloat(this.magnifierAttributes.zoomRatioWidth);
        const ratioH = parseFloat(this.magnifierAttributes.zoomRatioHeight);
        data.magnifiedLens.style.display = 'block';
        data.magnifiedLens.style.width = `${
            ratioW / this.magnifierAttributes.zoomFactor
        }px`;
        data.magnifiedLens.style.height = `${
            ratioH / this.magnifierAttributes.zoomFactor
        }px`;
        data.magnifiedLens.style.top = `${
            data.y - data.h / this.magnifierAttributes.zoomFactor
        }px`;
        data.magnifiedLens.style.left = `${
            data.x - data.w / this.magnifierAttributes.zoomFactor
        }px`;

        switch (this.magnifierAttributes.position) {
            case 'auto':
                this.autoPositionMagnifier(data);
                break;
            case 'left':
                data.magnifier.style.left =
                    '-' +
                    data.magnifier.offsetWidth -
                    this.magnifierAttributes.horizontalOffset +
                    'px';
                data.magnifier.style.top =
                    this.magnifierAttributes.verticalOffset + 'px';
                break;
            case 'right':
                data.magnifier.style.left =
                    data.img.width +
                    this.magnifierAttributes.horizontalOffset +
                    'px';
                data.magnifier.style.top =
                    this.magnifierAttributes.verticalOffset + 'px';
                break;
            case 'top':
                data.magnifier.style.left =
                    this.magnifierAttributes.horizontalOffset + 'px';
                data.magnifier.style.top =
                    '-' +
                    data.magnifier.offsetHeight -
                    this.magnifierAttributes.verticalOffset +
                    'px';
                break;
            case 'bottom':
                data.magnifier.style.left =
                    this.magnifierAttributes.horizontalOffset + 'px';
                data.magnifier.style.top =
                    data.img.height +
                    this.magnifierAttributes.verticalOffset +
                    'px';
                break;
            default:
                break;
        }
        const zoom = this.magnifierAttributes.zoomFactor;
        data.magnifiedImage.style.transform = `translate(-${
            data.x * zoom - data.w
        }px, -${data.y * zoom - data.h}px)`;
    }

    autoPositionMagnifier(data) {
        switch (this.position) {
            case 'left':
                data.magnifier.style.left =
                    data.img.width +
                    this.magnifierAttributes.horizontalOffset +
                    'px';
                data.magnifier.style.top =
                    this.magnifierAttributes.verticalOffset + 'px';
                break;
            case 'right':
                data.magnifier.style.left =
                    '-' +
                    data.magnifier.offsetWidth -
                    this.magnifierAttributes.horizontalOffset +
                    'px';
                data.magnifier.style.top =
                    this.magnifierAttributes.verticalOffset + 'px';
                break;
            case 'center':
                data.magnifier.style.left =
                    data.img.width +
                    this.magnifierAttributes.horizontalOffset +
                    'px';
                data.magnifier.style.top =
                    this.magnifierAttributes.verticalOffset + 'px';
                break;
            default:
                break;
        }
    }

    /**
     * Apply the inner magnifying effect to the image.
     *
     * @returns {void}
     */
    innerMagnifier(data) {
        data.magnifier.style.left = 0;
        data.magnifier.style.top = 0;

        data.magnifier.style.width = data.img.width + 'px';
        data.magnifier.style.height = data.img.height + 'px';

        const zoom = this.magnifierAttributes.zoomFactor;
        data.magnifiedImage.style.transform = `translate(-${
            data.x * zoom - data.w
        }px, -${data.y * zoom - data.h}px)`;
    }

    /**
     * Apply the follow magnifying effect to the image.
     *
     * @returns {void}
     */
    followMagnifier(data) {
        data.magnifier.style.left = data.x - data.w + 'px';
        data.magnifier.style.top = data.y - data.h + 'px';
        const zoom = this.magnifierAttributes.zoomFactor;
        data.magnifiedImage.style.transform = `translate(-${
            data.x * zoom - data.w
        }px, -${data.y * zoom - data.h}px)`;
    }

    /**
     * Get the position of the cursor relative to the image.
     *
     * @returns {x: number, y: number} posX, posY
     */
    getPos(event) {
        var rect = event.target.getBoundingClientRect();
        const posX = event.clientX - rect.left;
        const posY = event.clientY - rect.top;
        return { x: posX, y: posY };
    }

    /**
     * Apply the boundaries to the magnifier.
     *
     * @returns {void}
     */
    applyBoundaries(pos, img, w, h, borderWidth) {
        var finalPos = { x: pos.x, y: pos.y };
        if (
            pos.x >
            img.width - w / this.magnifierAttributes.zoomFactor - borderWidth
        ) {
            finalPos.x =
                img.width -
                w / this.magnifierAttributes.zoomFactor -
                borderWidth;
        }
        if (pos.x < w / this.magnifierAttributes.zoomFactor + borderWidth) {
            finalPos.x = w / this.magnifierAttributes.zoomFactor + borderWidth;
        }
        if (
            pos.y >
            img.height - h / this.magnifierAttributes.zoomFactor - borderWidth
        ) {
            finalPos.y =
                img.height -
                h / this.magnifierAttributes.zoomFactor -
                borderWidth;
        }
        if (pos.y < h / this.magnifierAttributes.zoomFactor + borderWidth) {
            finalPos.y = h / this.magnifierAttributes.zoomFactor + borderWidth;
        }
        return finalPos;
    }
}
