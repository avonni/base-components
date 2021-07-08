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

const IMAGE_ROUNDED = ['top', 'right', 'bottom', 'left', 'circle', '0'];
const CROP_FIT = {
    valid: ['cover', 'contain', 'fill', 'none'],
    default: 'cover'
};
const CROP_SIZE = {
    valid: ['1x1', '4x3', '16x9', 'none'],
    default: 'none'
};
const BLANK_COLOR_DEFAULT = 'transparent';
const CROP_POSITION_X_DEFAULT = '50';
const CROP_POSITION_Y_DEFAULT = '50';

export default class Image extends LightningElement {
    @api alt;
    @api cropPositionX = CROP_POSITION_X_DEFAULT;
    @api cropPositionY = CROP_POSITION_Y_DEFAULT;

    _src;
    _width;
    _height;
    _blankColor = BLANK_COLOR_DEFAULT;
    _srcset;
    _sizes;
    _block = false;
    _fluid = false;
    _fluidGrow = false;
    _rounded = false;
    _thumbnail = false;
    _left = false;
    _right = false;
    _center = false;
    _blank = false;
    _cropSize;
    _cropFit = CROP_FIT.default;
    _imgWidth;
    _imgHeight;
    _staticImages = false;
    _lazyLoading = false;
    _widthPercent;
    _heightPercent;
    _widthPercentNumberOnly;
    _heightPercentNumberOnly;
    _aspectRatio;

    renderedCallback() {
        this.getImageDimensions();
    }

    @api
    get staticImages() {
        return this._staticImages;
    }

    set staticImages(value) {
        this._staticImages = normalizeBoolean(value);
    }

    @api
    get lazyLoading() {
        return this._lazyLoading ? 'lazy' : 'auto';
    }

    set lazyLoading(value) {
        this._lazyLoading = normalizeBoolean(value);
    }

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

    @api get cropFit() {
        return this._cropFit;
    }

    set cropFit(value) {
        this._cropFit = normalizeString(value, {
            fallbackValue: CROP_FIT.default,
            validValues: CROP_FIT.valid
        });
    }

    @api
    get src() {
        return this._src;
    }

    set src(value) {
        if (!this.blank) {
            this._src = value;
        }
    }

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
        this.initBlank();
    }

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
        this.initBlank();
    }

    @api
    get blankColor() {
        return this._blankColor;
    }

    set blankColor(value) {
        this._blankColor = value;
        this.initBlank();
    }

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

    @api
    get block() {
        return this._block;
    }

    set block(value) {
        this._block = normalizeBoolean(value);
    }

    @api
    get fluid() {
        return this._fluid;
    }

    set fluid(value) {
        this._fluid = normalizeBoolean(value);
    }

    @api
    get fluidGrow() {
        return this._fluidGrow;
    }

    set fluidGrow(value) {
        this._fluidGrow = normalizeBoolean(value);
    }

    @api
    get rounded() {
        return this._rounded;
    }

    set rounded(value) {
        let roundedValue = normalizeString(value, {
            fallbackValue: null,
            validValues: IMAGE_ROUNDED
        });

        if (roundedValue !== null) {
            this._rounded = value;
        } else {
            this._rounded = normalizeBoolean(value);
        }
    }

    @api
    get thumbnail() {
        return this._thumbnail;
    }

    set thumbnail(value) {
        this._thumbnail = normalizeBoolean(value);
    }

    @api
    get left() {
        return this._left;
    }

    set left(value) {
        this._left = normalizeBoolean(value);
    }

    @api
    get right() {
        return this._right;
    }

    set right(value) {
        this._right = normalizeBoolean(value);
    }

    @api
    get center() {
        return this._center;
    }

    set center(value) {
        this._center = normalizeBoolean(value);
    }

    @api
    get blank() {
        return this._blank;
    }

    set blank(value) {
        this._blank = normalizeBoolean(value);
        this.initBlank();
    }

    get computedImageClass() {
        return classSet({
            'avonni-img-fluid': this.fluid || this.fluidGrow,
            'avonni-img-fluid-grow': this.fluidGrow,
            'avonni-img-thumbnail': this.thumbnail,
            'avonni-rounded': this.rounded === true,
            'avonni-rounded-top': this.rounded === 'top',
            'avonni-rounded-right': this.rounded === 'right',
            'avonni-rounded-bottom': this.rounded === 'bottom',
            'avonni-rounded-left': this.rounded === 'left',
            'avonni-rounded-circle': this.rounded === 'circle',
            'avonni-not-rounded': this.rounded === '0',
            'avonni-float-left': this.left && !this._cropSize,
            'avonni-float-right': this.right && !this._cropSize,
            'avonni-margin-auto': this.center && !this._cropSize,
            'avonni-display-block': this.center || this.block
        })
            .add({
                'avonni-img_cropped':
                    !this._widthPercent ||
                    (!this._heightPercent && this._cropSize),
                'avonni-img_cropped-centered':
                    (this.center && this._cropSize) ||
                    (this.center &&
                        !this._blank &&
                        this.width &&
                        this.height &&
                        !this._cropSize &&
                        !this.staticImages),
                'avonni-img_cropped-left':
                    (this.left && this._cropSize) ||
                    (this.left &&
                        this.width &&
                        this.height &&
                        !this._cropSize &&
                        !this.staticImages),
                'avonni-img_cropped-right':
                    (this.right && this._cropSize) ||
                    (this.right &&
                        this.width &&
                        this.height &&
                        !this._cropSize &&
                        !this.staticImages),
                'avonni-img_blank_no-crop_centered':
                    this.center &&
                    this.width &&
                    this.height &&
                    this._blank &&
                    !this._cropSize &&
                    !this.staticImages,
                'avonni-img_cropped_no-width_height':
                    !this.width &&
                    this.height &&
                    this._cropSize &&
                    !this.staticImages,
                'avonni-img_cropped_no-width_no-height':
                    !this.width &&
                    !this.height &&
                    this._cropSize &&
                    !this.staticImages,
                'avonni-img_cropped_width':
                    (this.width &&
                        !this.height &&
                        this._cropSize &&
                        !this.staticImages) ||
                    (this._widthPercent &&
                        !this.height &&
                        this._cropSize &&
                        this.staticImages),
                'avonni-img_no-crop_no-width_height':
                    !this.width && this.height && !this._cropSize,
                'avonni-img_no-crop_no-width_no-height':
                    !this.width &&
                    !this.height &&
                    !this._cropSize &&
                    !this.staticImages,
                '.avonni-img_no-crop_blank_width_height':
                    this.width &&
                    !this._cropSize &&
                    this._blank &&
                    !this.staticImages,
                'avonni-img_width_height':
                    this.width && this.height && !this._blank && !this.cropSize,
                'avonni-img_static_height_no-crop_no-width':
                    this.staticImages &&
                    !this.cropSize &&
                    !this.width &&
                    this.height,
                'avonni-img_static_no-crop_blank_height_width':
                    this.staticImages &&
                    this._blank &&
                    !this._cropSize &&
                    this.width &&
                    this.height,
                'avonni-image_no-crop_percent':
                    (this.width && this._heightPercent && !this.cropSize) ||
                    (this._widthPercent && this.height && !this.cropSize) ||
                    (!this.width && this._heightPercent && !this.cropSize) ||
                    (this._widthPercent &&
                        this._heightPercent &&
                        !this._cropSize &&
                        !this.staticImages) ||
                    (this._widthPercent && !this.height && !this.cropSize),
                'avonni-image_crop_percent':
                    (this._widthPercent || this._heightPercent) && this.cropSize
            })
            .toString();
    }

    get computedImgContainerClass() {
        return classSet('avonni-img-container')
            .add({
                'avonni-img-container_percent':
                    this._heightPercent || this._widthPercent
            })
            .toString();
    }

    initBlank() {
        if (this.blank) {
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            canvas.width = this.width;
            canvas.height = this.height;

            ctx.beginPath();
            ctx.rect(0, 0, this.width, this.height);
            ctx.fillStyle = this.blankColor;
            ctx.fill();

            this._src = canvas.toDataURL('image/png', '');
        }
    }

    /**
     * Final Computed Image Style
     * @returns image style
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
     * Compute No Crop image style
     * @returns image style
     */
    imgHandlerNoCrop() {
        // Repeated computed styles for fit and position
        const imageFitPosition = `object-fit: ${this.cropFit};
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
                //bug
                return `
                min-height: ${this.height}px;
                height: ${this.height}px;
                max-height: ${this.height};
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
            else if (!this.width && !this.height) {
                return `
                max-width: ${this._imgWidth}px;
                max-height: ${this._imgHeight}px;
                min-width: ${this._imgWidth}px;
                min-height: ${this._imgHeight}px;
                ${imageFitPosition}        
                `;
            }
            // Width % - Height %
            else if (this._widthPercent && this._heightPercent) {
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
            // Width % - No Height
            else if (this._widthPercent && !this.height) {
                return `
                max-width: ${this._imgWidth}px;
                max-height: ${this._imgHeight}px;
                min-width: ${this._imgWidth}px;
                min-height: ${this._imgHeight}px;
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
            // bug
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
            // Width px - Height px - blank
            if (this._blank && this.width && this.height) {
                return `
                width: ${this.width}px;
                ${imageFitPosition}
                `;
            }
            // Width px - Height %
            else if (this.width && !this._widthPercent && this._heightPercent) {
                return `
                width: ${this.width}px;
                height: ${this.height};
                ${imageFitPosition}        
                `;
            }
            // Width % - Height %
            else if (this._widthPercent && this._heightPercent) {
                return `
                width: ${this.width};
                height: ${this.height};
                ${imageFitPosition}      
                `;
            }
            // Width % - Height px
            else if (this._widthPercent && this.height) {
                return `
                width: ${this.width};
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
                height: ${this.height};
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
     * Compute Cropped image style
     * @returns img style
     */
    imgHandlerCropped() {
        // Repeated computed styles for Fit, Position and Aspect-ratio
        const imageFitPositionAspectRatio = `object-fit: ${this.cropFit};
            object-position: ${this.cropPositionX}% ${this.cropPositionY}%;
            aspect-ratio: ${this._aspectRatio}; 
            `;
        // Cropped - No Static Images
        if (!this.staticImages) {
            // No Width - No Height
            if (!this.width && !this.height) {
                return `
                ${imageFitPositionAspectRatio}
                `;
            }
            // Width px
            else if (
                this.width &&
                !this._widthPercent &&
                !this._heightPercent
            ) {
                // height: ${this.width * (this._cropSize / 100)}px;
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
            else if (this._widthPercent && this._heightPercent) {
                return `
                width: ${this._widthPercent};
                ${imageFitPositionAspectRatio}
                `;
            }
            // Width px - Height %
            else if (this.width && !this._widthPercent && this._heightPercent) {
                return `
                width: ${this.width}px;
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
            // Width % - No Height
            else if (this._widthPercent && !this.height) {
                return `
                width: ${this._widthPercent};
                ${imageFitPositionAspectRatio}
                `;
            }
        }
        // Cropped - Static Images
        else if (this.staticImages) {
            // No Width - No Height
            if (!this.width && !this.height) {
                return `
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
            else if (!this.width && this.height && !this._heightPercent) {
                return `
                max-height: ${this.height}px;
                max-width: ${this.height / (this._cropSize / 100)}px;
                min-height: ${this.height}px;
                min-width: ${this.height / (this._cropSize / 100)}px;
                ${imageFitPositionAspectRatio} 
                `;
            }
            // Width % - Height %
            else if (this._widthPercent && this._heightPercent) {
                return `
                max-height: ${
                    this._imgWidth *
                    (this._widthPercentNumberOnly / 100) *
                    (this._cropSize / 100)
                }px;
                max-width: ${
                    this._imgWidth * (this._widthPercentNumberOnly / 100)
                }px;
                min-height: ${
                    this._imgWidth *
                    (this._widthPercentNumberOnly / 100) *
                    (this._cropSize / 100)
                }px;
                min-width: ${
                    this._imgWidth * (this._widthPercentNumberOnly / 100)
                }px;
                ${imageFitPositionAspectRatio} 
                `;
            }
            // Width % - Height px
            else if (this._widthPercent && this.height) {
                return `
                max-height: ${this.height}px;
                max-width: ${this.height / (this._cropSize / 100)}px;
                min-height: ${this.height}px;
                min-width: ${this.height / (this._cropSize / 100)}px;
                ${imageFitPositionAspectRatio} 
                `;
            }
            // Width % - No Height
            else if (this._widthPercent && !this.height) {
                return `
                max-height: ${
                    this._imgWidth *
                    (this._widthPercentNumberOnly / 100) *
                    (this._cropSize / 100)
                }px;
                max-width: ${
                    this._imgWidth * (this._widthPercentNumberOnly / 100)
                }px;
                min-height: ${
                    this._imgWidth *
                    (this._widthPercentNumberOnly / 100) *
                    (this._cropSize / 100)
                }px;
                min-width: ${
                    this._imgWidth * (this._widthPercentNumberOnly / 100)
                }px;
                ${imageFitPositionAspectRatio} 
                `;
            }
            // No Width - Height %
            else if (!this.width && this._heightPercent) {
                return `
                max-height: ${
                    this._imgHeight * (this._heightPercentNumberOnly / 100)
                }px;
                max-width: ${
                    (this._imgHeight * (this._heightPercentNumberOnly / 100)) /
                    (this._cropSize / 100)
                }px;
                min-height: ${
                    this._imgHeight * (this._heightPercentNumberOnly / 100)
                }px;
                min-width: ${
                    (this._imgHeight * (this._heightPercentNumberOnly / 100)) /
                    (this._cropSize / 100)
                }px;
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
     * Compute Image dimensions when values missing or %
     * @returns _imgHeight , _imgWidth , _heightPercentNumberOnly , _widthPercentNumberOnly
     */
    getImageDimensions() {
        const container = this.template.querySelector('.avonni-img-container');
        const img = this.template.querySelector('img');
        // No Width - No Height - No Crop - Static
        if (
            this.staticImages &&
            !this.width &&
            !this.height &&
            !this._cropSize
        ) {
            this._imgWidth = img.clientWidth;
            this._imgHeight = img.clientHeight;
        }
        // No Width - No Height - Crop - Static
        if (
            this.staticImages &&
            !this.width &&
            !this.height &&
            this._cropSize
        ) {
            switch (this._cropSize) {
                case '100':
                    this._imgWidth = container.clientWidth;
                    this._imgHeight = container.clientHeight;
                    break;
                case '75':
                    this._imgWidth = container.clientWidth;
                    this._imgHeight = container.clientWidth * 0.75;
                    break;
                case '56.25':
                    this._imgWidth = container.clientWidth;
                    this._imgHeight = container.clientWidth * 0.5625;
                    break;
                default:
                    this._imgWidth = container.clientWidth;
                    break;
            }
        }
        // No Width - Height px - No Crop // No Static  ||  Static
        if (
            (!this.width &&
                this.height &&
                !this._cropSize &&
                !this.staticImages) ||
            (!this.width && this.height && !this._cropSize && this.staticImages)
        ) {
            this._imgWidth = img.clientWidth;
            this._imgHeight = img.clientHeight;
        }
        // Width % - Height % - No Crop - Static Images
        if (
            this._widthPercent &&
            this._heightPercent &&
            !this._cropSize &&
            this.staticImages
        ) {
            this._imgWidth = img.clientWidth;
            this._imgHeight = img.clientHeight;
            this._heightPercentNumberOnly = +this._heightPercent.slice(0, -1);
            this._widthPercentNumberOnly = +this._widthPercent.slice(0, -1);
        }
        // Width % - Height px - No Crop - Static Images
        if (
            this._widthPercent &&
            this.height &&
            !this._heightPercent &&
            !this._cropSize &&
            this.staticImages
        ) {
            this._imgWidth = img.clientWidth;
            this._widthPercentNumberOnly = +this._widthPercent.slice(0, -1);
        }
        // Width % - No Height - No Crop - Static Images
        if (
            this._widthPercent &&
            !this.height &&
            !this._cropSize &&
            this.staticImages
        ) {
            this._imgWidth = img.clientWidth;
            this._widthPercentNumberOnly = +this._widthPercent.slice(0, -1);
            this._imgHeight = img.clientHeight;
        }
        // Width px - Height % - No Crop - Static Images
        if (
            this.width &&
            !this._widthPercent &&
            this._heightPercent &&
            !this._cropSize &&
            this.staticImages
        ) {
            this._heightPercentNumberOnly = +this._heightPercent.slice(0, -1);
            this._imgHeight = img.clientHeight;
        }
        // No Width - Height % - No Crop - Static Images
        if (
            !this.width &&
            this._heightPercent &&
            !this._cropSize &&
            this.staticImages
        ) {
            this._imgWidth = img.clientWidth;
            this._heightPercentNumberOnly = +this._heightPercent.slice(0, -1);
            this._imgHeight = img.clientHeight;
        }
        // Width % - Height % - Crop - No Static Images
        if (
            this._widthPercent &&
            this._heightPercent &&
            this._cropSize &&
            !this.staticImages
        ) {
            this._imgWidth = container.clientWidth;
            this._imgHeight = container.clientHeight;
            this._heightPercentNumberOnly = +this._heightPercent.slice(0, -1);
            this._widthPercentNumberOnly = +this._widthPercent.slice(0, -1);
        }
        // No Width - Height % - Crop - No Static Images
        if (
            !this.width &&
            this._heightPercent &&
            this._cropSize &&
            !this.staticImages
        ) {
            this._imgHeight = container.clientHeight;
            this._heightPercentNumberOnly = +this._heightPercent.slice(0, -1);
        }
        // Width % - No Height - Crop - No Static Images
        if (
            this._widthPercent &&
            !this.height &&
            this._cropSize &&
            !this.staticImages
        ) {
            this._imgWidth = container.clientWidth;
            this._widthPercentNumberOnly = +this._widthPercent.slice(0, -1);
        }
        // Width % - Height % - Crop - Static Images
        if (
            this._widthPercent &&
            this._heightPercent &&
            this._cropSize &&
            this.staticImages
        ) {
            this._imgWidth = container.clientWidth;
            this._widthPercentNumberOnly = +this._widthPercent.slice(0, -1);
        }
        // Width % - No Height - Crop - Static Images
        if (
            this._widthPercent &&
            !this.height &&
            this._cropSize &&
            this.staticImages
        ) {
            this._imgWidth = container.clientWidth;
            this._widthPercentNumberOnly = +this._widthPercent.slice(0, -1);
        }
        // No Width - Height % - Crop - Static Images
        if (
            !this.width &&
            this._heightPercent &&
            this._cropSize &&
            this.staticImages
        ) {
            this._imgHeight = container.clientHeight;
            this._heightPercentNumberOnly = +this._heightPercent.slice(0, -1);
        }
    }
}
