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
    valid: ['small', 'medium', 'large', 'x-large', 'xx-large'],
    titleDefault: 'large',
    subtitleDefault: 'medium'
};

const font_weight_options = {
    valid: ['light', 'normal', 'bold'],
    titleDefault: 'bold',
    subtitleDefault: 'normal'
};

const DEFAULT_TITLE_COLOR = '#ffffff';
const DEFAULT_SUBTITLE_COLOR = '#ffffff';
const DEFAULT_HEIGHT = 400;
const DEFAULT_LINEAR_GRADIENT = 'rgba(0,0,0,0.4), rgba(0,0,0,0.4)';
const DEFAULT_FONT_FAMILY = '"Salesforce Sans", Arial, sans-serif';

export default class HeroBanner extends LightningElement {
    @api title;
    @api titleColor = DEFAULT_TITLE_COLOR;
    @api titleFontFamily = DEFAULT_FONT_FAMILY;
    @api subtitle;
    @api subtitleColor = DEFAULT_SUBTITLE_COLOR;
    @api subtitleFontFamily = DEFAULT_FONT_FAMILY;
    @api src;
    @api linearGradient = DEFAULT_LINEAR_GRADIENT;

    _textHorizontalAlignment = horizontal_alignement_options.default;
    _textVerticalAlignment = vertical_alignement_options.default;
    _titleFontSize = font_size_options.titleDefault;
    _titleFontWeight = font_weight_options.titleDefault;
    _subtitleFontSize = font_size_options.subtitleDefault;
    _subtitleFontWeight = font_weight_options.subtitleDefault;
    _height = DEFAULT_HEIGHT;

    _rendered = false;
    showSlot = true;
    showFooterSlot = true;

    renderedCallback() {
        if (!this._rendered) {
            this._rendered = true;
            if (this.slot) {
                this.showSlot = this.slot.assignedElements().length !== 0;
            }

            if (this.footerSlot) {
                this.showFooterSlot =
                    this.footerSlot.assignedElements().length !== 0;
            }
        }
    }

    get slot() {
        return this.template.querySelector('slot');
    }

    get footerSlot() {
        return this.template.querySelector('slot[name=footer]');
    }

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
    get titleFontWeight() {
        return this._titleFontWeight;
    }

    set titleFontWeight(weight) {
        this._titleFontWeight = normalizeString(weight, {
            fallbackValue: font_weight_options.titleDefault,
            validValues: font_weight_options.valid
        });
    }

    @api
    get subtitleFontSize() {
        return this._subtitleFontSize;
    }

    set subtitleFontSize(size) {
        this._subtitleFontSize = normalizeString(size, {
            fallbackValue: font_size_options.subtitleDefault,
            validValues: font_size_options.valid
        });
    }

    @api
    get subtitleFontWeight() {
        return this._subtitleFontWeight;
    }

    set subtitleFontWeight(weight) {
        this._subtitleFontWeight = normalizeString(weight, {
            fallbackValue: font_weight_options.subtitleDefault,
            validValues: font_weight_options.valid
        });
    }

    @api
    get height() {
        return this._height;
    }

    set height(value) {
        const number = typeof value === 'number' ? value : DEFAULT_HEIGHT;
        this._height = parseInt(number, 10);
    }

    get imgSrc() {
        return `background-image: linear-gradient(${this.linearGradient}), url(${this.src}); height: ${this.height}px`;
    }

    get computedTitleStyling() {
        return `font-family: ${this.titleFontFamily}; color: ${this.titleColor}`;
    }

    get computedSubtitleStyling() {
        return `font-family: ${this.subtitleFontFamily}; color: ${this.subtitleColor}`;
    }

    get computedTextContainer() {
        return classSet('')
            .add({
                'avonni-hero-banner-text-container-without-slot': !this
                    .showFooterSlot,
                'avonni-hero-banner-text-container-with-slot': this
                    .showFooterSlot,
                'slds-text-align_left': this.textHorizontalAlignment === 'left',
                'slds-text-align_center':
                    this.textHorizontalAlignment === 'center',
                'slds-text-align_right':
                    this.textHorizontalAlignment === 'right',
                'avonni-hero-banner-vertical-alignement-bottom':
                    this.textVerticalAlignment === 'bottom',
                'avonni-hero-banner-vertical-alignement-center':
                    this.textVerticalAlignment === 'center',
                'avonni-hero-banner-column-div':
                    this.textVerticalAlignment === 'top'
            })
            .toString();
    }

    get computedTitleClass() {
        return classSet('')
            .add({
                'slds-text-heading_large': this.titleFontSize === 'large',
                'slds-text-heading_medium': this.titleFontSize === 'medium',
                'slds-text-heading_small': this.titleFontSize === 'small',
                'avonni-hero-banner-text-x_large':
                    this.titleFontSize === 'x-large',
                'avonni-hero-banner-text-xx_large':
                    this.titleFontSize === 'xx-large'
            })
            .add({
                'avonni-hero-banner-font-weight_light':
                    this.titleFontWeight === 'light',
                'avonni-hero-banner-font-weight_normal':
                    this.titleFontWeight === 'normal',
                'avonni-hero-banner-font-weight_bold':
                    this.titleFontWeight === 'bold'
            })
            .toString();
    }

    get computedSubtitleClass() {
        return classSet('')
            .add({
                'slds-text-heading_large': this.subtitleFontSize === 'large',
                'slds-text-heading_medium': this.subtitleFontSize === 'medium',
                'slds-text-heading_small': this.subtitleFontSize === 'small',
                'avonni-hero-banner-text-x_large':
                    this.subtitleFontSize === 'x-large',
                'avonni-hero-banner-text-xx_large':
                    this.subtitleFontSize === 'xx-large'
            })
            .add({
                'avonni-hero-banner-font-weight_light':
                    this.subtitleFontWeight === 'light',
                'avonni-hero-banner-font-weight_normal':
                    this.subtitleFontWeight === 'normal',
                'avonni-hero-banner-font-weight_bold':
                    this.subtitleFontWeight === 'bold'
            })
            .toString();
    }
}
