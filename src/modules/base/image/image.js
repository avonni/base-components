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
    default: 'left'
};
const CROP_POSITION_X_DEFAULT = '50';
const CROP_POSITION_Y_DEFAULT = '50';

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
     * X-axis of the image position ( in percent ).
     *
     * @public
     * @type {string}
     */
    @api cropPositionX = CROP_POSITION_X_DEFAULT;
    /**
     * Y-axis of the image position ( in percent ).
     *
     * @public
     * @type {string}
     */
    @api cropPositionY = CROP_POSITION_Y_DEFAULT;

    _cropFit = CROP_FIT.default;
    _cropSize;
    _fluid = false;
    _fluidGrow = false;
    _height;
    _lazyLoading = false;
    _position = POSITIONS.default;
    _sizes;
    _src;
    _srcset;
    _staticImages = false;
    _thumbnail = false;
    _width;

    _imgWidth;
    _imgHeight;
    _widthPercent;
    _heightPercent;
    _aspectRatio;

    renderedCallback() {
        this.getImageDimensions();
    }

    /**
     * Image fit behaviour inside its container ( valid options : “cover”, “contain”, “fill”, “none” ). Default is cover.
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
     * Crops the image to desired aspect ratio ( valid options : “1x1”, “4x3”, “16x9”, “none” ).
     *
     * @public
     * @type {string}
     */
    @api get cropSize() {
        return this._cropSize;
    }

    /**
     * Assign cropSize numerical value and aspectRatio fraction based on user input.
     */
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
     * Makes the image responsive. The image will shrink as needed or grow up the the image's native width.
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
     * Similar to the 'fluid' prop, but allows the image to scale up past its native width.
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
     * The value to set on the image's 'height' attribute.
     *
     * @public
     * @type {number | string}
     */
    @api
    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
        if (
            value !== undefined &&
            typeof value === 'string' &&
            value.includes('%')
        ) {
            this._heightPercent = value;
        }
    }

    /**
     * Enables lazy loading for images that are offscreen. If set to true, the property ensures that offscreen images are loaded early enough so that they have finished loading once the user scrolls near them.
     * Note: Keep in mind that the property uses the loading attribute of HTML <img> element which is not supported for Internet Explorer.
     *
     * @public
     * @type {boolean}
     */
    @api
    get lazyLoading() {
        return this._lazyLoading ? 'lazy' : 'auto';
    }

    set lazyLoading(value) {
        this._lazyLoading = normalizeBoolean(value);
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
        this._width = value;
        if (
            value !== undefined &&
            typeof value === 'string' &&
            value.includes('%')
        ) {
            this._widthPercent = value;
        }
    }

    /**
     * Computed Image class styling.
     *
     * @type {string}
     */
    get computedImageClass() {
        return classSet('avonni-image')
            .add({
                'avonni-image-fluid': this.fluid || this.fluidGrow,
                'avonni-image-fluid-grow': this.fluidGrow,
                'avonni-image-thumbnail': this.thumbnail,
                'avonni-float-left':
                    this._position === 'left' && !this._lazyLoading,
                'avonni-float-right': this._position === 'right',
                'avonni-margin-auto': this._position === 'center',
                'avonni-display-block': this._position === 'center'
            })
            .toString();
    }

    /**
     * Final Computed Image Style.
     *
     * @type {boolean}
     */
    get computedImgStyle() {
        if (!this._cropSize) {
            return this.imgHandlerNoCrop();
        } else if (this._cropSize) {
            return this.imgHandlerCropped();
        }
        return `
        width: ${this.width}px;
        height: ${this.height}px;        
        `;
    }

    /**
     * Compute No Crop image style.
     *
     * @returns {string} image style
     */
    imgHandlerNoCrop() {
        // Repeated computed styles for fit and position
        const imageFitPosition = `
            object-fit: ${this.cropFit};
            object-position: ${this.cropPositionX}% ${this.cropPositionY}%;
            `;
        // No Crop - Static Image
        if (this.staticImages) {
            // Width px - Height px
            if (
                this.width &&
                this.height &&
                !this._widthPercent &&
                !this._heightPercent
            ) {
                return `
                min-width: ${this.width}px;
                min-height: ${this.height}px;
                max-width: ${this.width}px;
                max-height: ${this.height}px;
                ${imageFitPosition}      
                `;
            }
            // No width - Height px
            else if (!this.width && this.height && !this._heightPercent) {
                return `
                min-height: ${this.height}px;
                height: ${this.height}px;
                max-height: ${this.height}px;
                max-width: ${this._imgWidth}px;
                width: ${this._imgWidth}px;
                min-width: ${this._imgWidth}px;
                ${imageFitPosition}        
                `;
            }
            // Width px - No height
            else if (this.width && !this._widthPercent && !this.height) {
                return `
                max-width: ${this.width}px;
                ${imageFitPosition}
                `;
            }
            // No Width - No Height
            // Width % - Height %
            // Width % - No Height
            else if (
                (!this.width && !this.height) ||
                (this._widthPercent && this._heightPercent) ||
                (this._widthPercent && !this.height)
            ) {
                return `
                max-width: ${this._imgWidth}px;
                max-height: ${this._imgHeight}px;
                min-width: ${this._imgWidth}px;
                min-height: ${this._imgHeight}px;
                ${imageFitPosition}        
                `;
            }
            // Width % - Height px
            else if (
                this._widthPercent &&
                this.height &&
                !this._heightPercent
            ) {
                return `
                max-width: ${this._imgWidth}px;
                max-height: ${this.height}px;
                min-width: ${this._imgWidth}px;
                min-height: ${this.height}px;
                ${imageFitPosition}
                `;
            }
            // Width px - Height %
            else if (this.width && !this._widthPercent && this._heightPercent) {
                return `
                max-width: ${this.width}px;
                max-height: ${this._imgHeight}px;
                min-width: ${this.width}px;
                min-height: ${this._imgHeight}px;
                ${imageFitPosition}    
                `;
            }
            // No Width - Height %
            else if (
                !this.width &&
                !this._widthPercent &&
                this._heightPercent
            ) {
                return `
                max-width: ${this._imgWidth}px;
                max-height: ${this._imgHeight}px;
                height: ${this._imgHeight};
                width: ${this._imgWidth};
                min-width: ${this._imgWidth}px;
                min-height: ${this._imgHeight}px;
                ${imageFitPosition}      
                `;
            }
        }
        // No Crop - No Static Images
        else if (!this.staticImages) {
            // Width px - Height %
            if (this.width && !this._widthPercent && this._heightPercent) {
                return `
                width: ${this.width}px;
                height: ${this._heightPercent};
                ${imageFitPosition}        
                `;
            }
            // Width % - Height %
            else if (this._widthPercent && this._heightPercent) {
                return `
                width: ${this._widthPercent};
                height: ${this._heightPercent};
                ${imageFitPosition}      
                `;
            }
            // Width % - Height px
            else if (this._widthPercent && this.height) {
                return `
                width: ${this._widthPercent};
                height: ${this.height}px;
                ${imageFitPosition}        
                `;
            }
            // Width % - No Height
            else if (this._widthPercent && !this.height) {
                return `
                width: ${this._widthPercent};
                ${imageFitPosition}        
                `;
            }
            // No Width - Height %
            else if (this._heightPercent && !this.width) {
                return `
                height: ${this._heightPercent};
                ${imageFitPosition}        
                `;
            }
        }
        return `
        width: ${this.width}px;
        height: ${this.height}px;
        ${imageFitPosition}            
        `;
    }

    /**
     * Compute Cropped image style.
     *
     * @returns {string} image style
     */
    imgHandlerCropped() {
        // Repeated computed styles for Fit, Position and Aspect-ratio
        const imageFitPositionAspectRatio = `
            object-fit: ${this.cropFit};
            object-position: ${this.cropPositionX}% ${this.cropPositionY}%;
            aspect-ratio: ${this._aspectRatio};
            `;
        // Cropped - No Static Images
        if (!this.staticImages) {
            // No Width - No Height
            if (!this.width && !this.height) {
                return `
                width: ${this._imgWidth}px;
                ${imageFitPositionAspectRatio}
                `;
            }
            // No Width - Height %
            else if (!this.width && this._heightPercent) {
                return `
                height: ${this._heightPercent};
                ${imageFitPositionAspectRatio}
                `;
            }
            // Width px
            // Width px - Height %
            else if (
                (this.width && !this._widthPercent && !this._heightPercent) ||
                (this.width && !this._widthPercent && this._heightPercent)
            ) {
                return `
                width: ${this.width}px;
                ${imageFitPositionAspectRatio}
                `;
            }
            // No Width - Height px
            else if (!this.width && this.height && !this._heightPercent) {
                return `
                height: ${this.height}px;
                ${imageFitPositionAspectRatio}
                `;
            }
            // Width % - Height %
            // Width % - No Height
            else if (
                (this._widthPercent && this._heightPercent) ||
                (this._widthPercent && !this.height)
            ) {
                return `
                width: ${this._widthPercent};
                ${imageFitPositionAspectRatio}
                `;
            }
            // Width % - Height px
            else if (
                this._widthPercent &&
                this.height &&
                !this._heightPercent
            ) {
                return `
                    width: ${this.height / (this._cropSize / 100)}px;
                    ${imageFitPositionAspectRatio}
                    `;
            }
        }
        // Cropped - Static Images
        else if (this.staticImages) {
            // No Width - No Height
            if (!this.width && !this.height) {
                return `
                height: ${this._imgHeight}px;
                max-width: ${this._imgWidth}px;
                max-height: ${this._imgHeight}px;
                min-width: ${this._imgWidth}px;
                min-height: ${this._imgHeight}px;
                ${imageFitPositionAspectRatio} 
                `;
            }
            // Width px
            else if (this.width && !this._widthPercent) {
                return `
                max-width: ${this.width}px;
                max-height: ${this.width * (this._cropSize / 100)}px;
                min-width: ${this.width}px;
                min-height: ${this.width * (this._cropSize / 100)}px;
                ${imageFitPositionAspectRatio} 
                `;
            }
            // No Width - Height px
            // Width % - Height px
            else if (
                (!this.width && this.height && !this._heightPercent) ||
                (this._widthPercent && this.height)
            ) {
                return `
                max-height: ${this.height}px;
                max-width: ${this.height / (this._cropSize / 100)}px;
                min-height: ${this.height}px;
                min-width: ${this.height / (this._cropSize / 100)}px;
                ${imageFitPositionAspectRatio} 
                `;
            }
            // Width % - Height %
            // Width % - No Height
            else if (
                (this._widthPercent && this._heightPercent) ||
                (this._widthPercent && !this.height)
            ) {
                return `
                max-height: ${this._imgWidth * (this._cropSize / 100)}px;
                max-width: ${this._imgWidth}px;
                min-height: ${this._imgWidth * (this._cropSize / 100)}px;
                min-width: ${this._imgWidth}px;
                ${imageFitPositionAspectRatio} 
                `;
            }
            // No Width - Height %
            else if (!this.width && this._heightPercent) {
                return `
                height: ${this._imgHeight};
                max-height: ${this._imgHeight}px;
                max-width: ${this._imgHeight / (this._cropSize / 100)}px;
                min-height: ${this._imgHeight}px;
                min-width: ${this._imgHeight / (this._cropSize / 100)}px;
                ${imageFitPositionAspectRatio}
                `;
            }
        }
        return `
        width: ${this.width}px;
        height: ${this.height}px;
        ${imageFitPositionAspectRatio}        
        `;
    }

    /**
     * Get Image dimensions when values missing or %.
     *
     * @returns {number} imgHeight , imgWidth
     */
    getImageDimensions() {
        const img = this.template.querySelector('[data-element-id="img"]');
        this._imgWidth = img.clientWidth;
        this._imgHeight = img.clientHeight;
    }
}
