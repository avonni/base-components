import { LightningElement, api } from 'lwc';
import { normalizeBoolean, normalizeString } from 'c/utilsPrivate';
import { classSet } from 'c/utils';

const validRounded = ['top', 'right', 'bottom', 'left', 'circle', '0'];
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
                break;
            case '4x3':
                this._cropSize = '75';
                break;
            case '16x9':
                this._cropSize = '56.25';
                break;
            default:
                this._cropSize = null;
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
        this.initBlank();
    }

    @api
    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
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
            validValues: validRounded
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
                'avonni-img_cropped': this._cropSize,
                'avonni-img_cropped-centered': this.center && this._cropSize,
                'avonni-img_cropped-left': this.left && this._cropSize,
                'avonni-img_cropped-right': this.right && this._cropSize,
                'avonni-img_cropped_no-width': !this.width && this._cropSize,
                'avonni-img_cropped_width': this.width && this._cropSize,
                'avonni-img_no-crop_no-width': !this.width && !this._cropSize,
                'avonni-img_no-crop_width_blank':
                    this.width && !this._cropSize && this._blank,
                'avonni-img_width_height':
                    this.width && this.height && !this._blank
            })
            .toString();
    }

    get computedImgContainerClass() {
        return classSet('avonni-img-container').toString();
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

    get computedImgContainerStyle() {
        return this._cropSize ? `padding-top: ${this._cropSize}%;` : '';
    }

    get computedImgStyle() {
        if (!this.width && this._cropSize) {
            return `
            object-fit: ${this.cropFit};
            object-position: ${this.cropPositionX}% ${this.cropPositionY}%; 
            `;
        } else if (this.width && this._cropSize) {
            return `
            width: ${this.width}px;
            height: ${this.width * (this._cropSize / 100)}px;
            object-fit: ${this.cropFit};
            object-position: ${this.cropPositionX}% ${this.cropPositionY}%; 
            `;
        } else if (this.width && this._blank) {
            return `
            width: ${this.width}px;
            `;
        }
        return ` 
            width: ${this.width}px;
            height: ${this.height}px;
            `;
    }
}
