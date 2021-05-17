import { LightningElement, api } from 'lwc';

import { normalizeString } from 'c/utilsPrivate';

import { classSet } from 'c/utils';

const horizontal_alignement_options = {
    valid: ['left', 'center', 'right'],
    default: 'left'
};
const vertical_alignement_options = {
    valid: ['top', 'center', 'bottom'],
    default: 'center'
};
const font_size_options = {
    valid: ['x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'],
    titleDefault: 'large',
    descriptionDefault: 'medium'
};

const DEFAULT_TITLE_FONT_COLOR = '#ffffff';
const DEFAULT_DESCRIPTION_FONT_COLOR = '#ffffff';

export default class HeroBanner extends LightningElement {
    @api title;
    @api titleFontColor = DEFAULT_TITLE_FONT_COLOR;
    @api description;
    @api descriptionFontColor = DEFAULT_DESCRIPTION_FONT_COLOR;
    @api src;

    _textHorizontalAlignment = horizontal_alignement_options.default;
    _textVerticalAlignment = vertical_alignement_options.default;
    _titleFontSize = font_size_options.titleDefault;
    _descriptionFontSize = font_size_options.descriptionDefault;

    @api
    get textHorizontalAlignment() {
        return this._textHorizontalAlignment;
    }

    set textHorizontalAlignment(alignement) {
        this._textHorizontalAlignment = normalizeString(alignement, {
            fallbackValue: horizontal_alignement_options.default,
            validValues: horizontal_alignement_options.valid
        });
    }

    @api
    get textVerticalAlignment() {
        return this._textVerticalAlignment;
    }

    set textVerticalAlignment(alignement) {
        this._textVerticalAlignment = normalizeString(alignement, {
            fallbackValue: vertical_alignement_options.default,
            validValues: vertical_alignement_options.valid
        });
    }

    @api
    get titleFontSize() {
        return this._titleFontSize;
    }

    set titleFontSize(size) {
        this._titleFontSize = normalizeString(size, {
            fallbackValue: font_size_options.titleDefault,
            validValues: font_size_options.valid
        });
    }

    @api
    get descriptionFontSize() {
        return this._descriptionFontSize;
    }

    set descriptionFontSize(size) {
        this._descriptionFontSize = normalizeString(size, {
            fallbackValue: font_size_options.descriptionDefault,
            validValues: font_size_options.valid
        });
    }

    get imgSrc() {
        return `background-image: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${this.src});`;
    }

    get titleColor() {
        return `color: ${this.titleFontColor}`;
    }

    get descriptionColor() {
        return `color: ${this.descriptionFontColor}`;
    }

    get computedTextContainer() {
        return classSet('').add({}).toString();
    }
}
