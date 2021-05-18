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
    descriptionDefault: 'medium'
};

const font_weight_options = {
    valid: ['light', 'normal', 'bold'],
    titleDefault: 'bold',
    descriptionDefault: 'normal'
};

const DEFAULT_TITLE_FONT_COLOR = '#ffffff';
const DEFAULT_DESCRIPTION_FONT_COLOR = '#ffffff';
const DEFAULT_HEIGHT = 400;

export default class HeroBanner extends LightningElement {
    @api title;
    @api titleFontColor = DEFAULT_TITLE_FONT_COLOR;
    @api description;
    @api descriptionFontColor = DEFAULT_DESCRIPTION_FONT_COLOR;
    @api src;

    _textHorizontalAlignment = horizontal_alignement_options.default;
    _textVerticalAlignment = vertical_alignement_options.default;
    _titleFontSize = font_size_options.titleDefault;
    _titleFontWeight = font_weight_options.titleDefault;
    _descriptionFontSize = font_size_options.descriptionDefault;
    _descriptionFontWeight = font_weight_options.descriptionDefault;
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
    get descriptionFontSize() {
        return this._descriptionFontSize;
    }

    set descriptionFontSize(size) {
        this._descriptionFontSize = normalizeString(size, {
            fallbackValue: font_size_options.descriptionDefault,
            validValues: font_size_options.valid
        });
    }

    @api
    get descriptionFontWeight() {
        return this._descriptionFontWeight;
    }

    set descriptionFontWeight(weight) {
        this._descriptionFontWeight = normalizeString(weight, {
            fallbackValue: font_weight_options.titleDefault,
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
        return `background-image: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${this.src}); height: ${this.height}px`;
    }

    get titleColor() {
        return `color: ${this.titleFontColor}`;
    }

    get descriptionColor() {
        return `color: ${this.descriptionFontColor}`;
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

    get computedDescriptionClass() {
        return classSet('')
            .add({
                'slds-text-heading_large': this.descriptionFontSize === 'large',
                'slds-text-heading_medium':
                    this.descriptionFontSize === 'medium',
                'slds-text-heading_small': this.descriptionFontSize === 'small',
                'avonni-hero-banner-text-x_large':
                    this.descriptionFontSize === 'x-large',
                'avonni-hero-banner-text-xx_large':
                    this.descriptionFontSize === 'xx-large'
            })
            .add({
                'avonni-hero-banner-font-weight_light':
                    this.descriptionFontWeight === 'light',
                'avonni-hero-banner-font-weight_normal':
                    this.descriptionFontWeight === 'normal',
                'avonni-hero-banner-font-weight_bold':
                    this.descriptionFontWeight === 'bold'
            })
            .toString();
    }
}
