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

const DEFAULT_HEIGHT = 400;
const DEFAULT_MAX_WIDTH = 960;
const DEFAULT_CONTENT_WIDTH = 100;

export default class HeroBanner extends LightningElement {
    @api title;
    @api caption;
    @api subtitle;
    @api src;
    @api primaryButtonLabel;
    @api secondaryButtonLabel;
    @api secondaryButtonBorderColor;

    _contentHorizontalAlignment = horizontal_alignement_options.default;
    _contentVerticalAlignment = vertical_alignement_options.default;
    _height = DEFAULT_HEIGHT;
    _maxWidth = DEFAULT_MAX_WIDTH;
    _contentWidth = DEFAULT_CONTENT_WIDTH;

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
    get contentHorizontalAlignment() {
        return this._contentHorizontalAlignment;
    }

    set contentHorizontalAlignment(alignement) {
        this._contentHorizontalAlignment = normalizeString(alignement, {
            fallbackValue: horizontal_alignement_options.default,
            validValues: horizontal_alignement_options.valid
        });
    }

    @api
    get contentVerticalAlignment() {
        return this._contentVerticalAlignment;
    }

    set contentVerticalAlignment(alignement) {
        this._contentVerticalAlignment = normalizeString(alignement, {
            fallbackValue: vertical_alignement_options.default,
            validValues: vertical_alignement_options.valid
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

    @api
    get maxWidth() {
        return this._maxWidth;
    }

    set maxWidth(value) {
        const number = typeof value === 'number' ? value : DEFAULT_MAX_WIDTH;
        this._maxWidth = parseInt(number, 10);
    }

    @api
    get contentWidth() {
        return this._contentWidth;
    }

    set contentWidth(value) {
        const number =
            typeof value === 'number' ? value : DEFAULT_CONTENT_WIDTH;
        this._contentWidth = parseInt(number, 10);
    }

    get imgSrc() {
        if (this.linearGradient) {
            return `background-color: ${this.backgroundColor}; background-image: linear-gradient(${this.linearGradient}), url(${this.src}); height: ${this._height}px;`;
        }
        return `background-color: ${this.backgroundColor}; background-image: url(${this.src}); height: ${this.height}px;`;
    }

    get computedMaxWidth() {
        return `width: ${this._maxWidth}px;`;
    }

    get computedContentStyling() {
        return `width: ${this.contentWidth}%`;
    }

    get computedTitleStyling() {
        return `font-family: ${this.titleFontFamily}; color: ${this.titleColor}; text-shadow: ${this.titleShadowColor};`;
    }

    get computedCaptionStyling() {
        return `font-family: ${this.captionFontFamily}; color: ${this.captionColor}; text-shadow: ${this.captionShadowColor};`;
    }

    get computedSubtitleStyling() {
        return `font-family: ${this.subtitleFontFamily}; color: ${this.subtitleColor}; text-shadow: ${this.subtitleShadowColor};`;
    }

    get computedPrimaryButtonStyling() {
        return `--background-primary: ${this.primaryButtonBackgroundColor}; --color-primary: ${this.primaryButtonTextColor}; border-radius: ${this.primaryButtonBorderRadius}px; --border-primary_color: ${this.primaryButtonBorderColor}; --background-primary_hover: ${this.primaryButtonBackgroundHoverColor}; --color-primary_hover: ${this.primaryButtonTextHoverColor};`;
    }

    get computedSecondaryButtonStyling() {
        return `--background-secondary: ${this.secondaryButtonBackgroundColor}; --color-secondary: ${this.secondaryButtonTextColor}; border-radius: ${this.secondaryButtonBorderRadius}px; --border-secondary_color: ${this.secondaryButtonBorderColor}; --background-secondary_hover: ${this.secondaryButtonBackgroundHoverColor}; --color-secondary_hover: ${this.secondaryButtonTextHoverColor};`;
    }

    get computedContentContainer() {
        return classSet('avonni-hero-banner-content-container')
            .add({
                'avonni-hero-banner-text-container-without-slot': !this
                    .showFooterSlot,
                'avonni-hero-banner-text-container-with-slot': this
                    .showFooterSlot,
                'avonni-hero-banner-vertical-alignement_bottom':
                    this.contentVerticalAlignment === 'bottom',
                'avonni-hero-banner-vertical-alignement_center':
                    this.contentVerticalAlignment === 'center',
                'avonni-hero-banner-vertical-alignement_top':
                    this.contentVerticalAlignment === 'top'
            })
            .toString();
    }

    get computedWidthContainer() {
        return classSet('slds-grid avonni-hero-banner-width-container')
            .add({
                'avonni-hero-banner-horizontal-alignment_left':
                    this.contentHorizontalAlignment === 'left',
                'avonni-hero-banner-horizontal-alignment_center':
                    this.contentHorizontalAlignment === 'center',
                'avonni-hero-banner-horizontal-alignment_right':
                    this.contentHorizontalAlignment === 'right'
            })
            .toString();
    }

    get computedTitleClass() {
        return classSet('')
            .add({
                'slds-text-heading_small': this.titleFontSize === 'small',
                'slds-text-heading_medium': this.titleFontSize === 'medium',
                'slds-text-heading_large': this.titleFontSize === 'large',
                'avonni-hero-banner-text-x_large':
                    this.titleFontSize === 'x-large',
                'avonni-hero-banner-text-xx_large':
                    this.titleFontSize === 'xx-large',
                'avonni-hero-banner-text-xxx_large':
                    this.titleFontSize === 'xxx-large',
                'avonni-hero-banner-text-xxxx_large':
                    this.titleFontSize === 'xxxx-large'
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

    get computedCaptionClass() {
        return classSet('')
            .add({
                'slds-text-heading_small': this.captionFontSize === 'small',
                'slds-text-heading_medium': this.captionFontSize === 'medium',
                'slds-text-heading_large': this.captionFontSize === 'large',
                'avonni-hero-banner-text-x_large':
                    this.captionFontSize === 'x-large',
                'avonni-hero-banner-text-xx_large':
                    this.captionFontSize === 'xx-large',
                'avonni-hero-banner-text-xxx_large':
                    this.captionFontSize === 'xxx-large',
                'avonni-hero-banner-text-xxxx_large':
                    this.captionFontSize === 'xxxx-large'
            })
            .add({
                'avonni-hero-banner-font-weight_light':
                    this.captionFontWeight === 'light',
                'avonni-hero-banner-font-weight_normal':
                    this.captionFontWeight === 'normal',
                'avonni-hero-banner-font-weight_bold':
                    this.captionFontWeight === 'bold'
            })
            .toString();
    }

    get computedSubtitleClass() {
        return classSet('')
            .add({
                'slds-text-heading_small': this.subtitleFontSize === 'small',
                'slds-text-heading_medium': this.subtitleFontSize === 'medium',
                'slds-text-heading_large': this.subtitleFontSize === 'large',
                'avonni-hero-banner-text-x_large':
                    this.subtitleFontSize === 'x-large',
                'avonni-hero-banner-text-xx_large':
                    this.subtitleFontSize === 'xx-large',
                'avonni-hero-banner-text-xxx_large':
                    this.subtitleFontSize === 'xxx-large',
                'avonni-hero-banner-text-xxxx_large':
                    this.subtitleFontSize === 'xxxx-large'
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

    get computedButtonClass() {
        return classSet('slds-grid slds-m-top_small')
            .add({
                'avonni-hero-banner-horizontal-alignment_right':
                    this.contentHorizontalAlignment === 'right',
                'avonni-hero-banner-horizontal-alignment_center':
                    this.contentHorizontalAlignment === 'center'
            })
            .toString();
    }

    get hasButton() {
        return this.primaryButtonLabel || this.secondaryButtonLabel;
    }

    get hasButtons() {
        return this.primaryButtonLabel && this.secondaryButtonLabel;
    }
}
