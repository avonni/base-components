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
import { normalizeString } from 'c/utilsPrivate';
import { classSet } from 'c/utils';

const ANIMATION_VARIANTS = {
    valid: ['pulse', 'wave']
};

const SKELETON_VARIANTS = {
    valid: [
        'avatar',
        'badge',
        'breadcrumbs',
        'button',
        'button-icon',
        'chip',
        'circular',
        'combobox',
        'datatable',
        'input',
        'paragraph',
        'path',
        'pill',
        'progress-indicator',
        'rectangular',
        'tabset',
        'text',
        'tree'
    ],
    default: 'text'
};

/**
 * @class
 * @name Skeleton
 * @public
 * @storyId example-skeleton--base
 * @descriptor avonni-skeleton
 */
export default class Skeleton extends LightningElement {
    _variantAttributes = {};
    _animation;
    _height;
    _variant = SKELETON_VARIANTS.default;
    _width;

    _waveVariant;
    _initialAvatarRender = false;

    parentAvatarWrapper;
    avatarWrapperClass;
    avatarClass;
    primaryTextClass;
    secondaryTextClass;
    tertiaryTextClass;
    chipLabel;
    badgeLabel;
    breadcrumbs = [];
    buttonWrapper;
    buttonIconWrapper;

    connectedCallback() {
        if (this.isAvatarVariant) {
            this.updateAvatarClassList();
            this.primaryText = this.variantAttributes.primaryText;
            this.secondaryText = this.variantAttributes.secondaryText;
            this.tertiaryText = this.variantAttributes.tertiaryText;
        }
        if (this.isBreadcrumbsVariant) {
            this.initializeBreadcrumbs();
        }
        if (this.isButtonVariant) {
            this.updateButtonClassList();
        }
        if (this.isButtonIconVariant) {
            this.updateButtonIconClassList();
        }

        // if (this.isComboboxVariant) {
        //     this.updateComboboxClassList();
        // }
    }

    renderedCallback() {
        // if (!this.isAvatarVariant) this.setSkeletonSize();
        if (this.isChipVariant) this.chipLabel = this.variantAttributes.label;
        if (this.isBadgeVariant) this.badgeLabel = this.variantAttributes.label;
        if (!this.isAvatarVariant) this.handleVariant();
        // console.log(this.variantAttributes.hasIcon);
        // if (this.isAvatarVariant && !this._initialAvatarRender) {
        //     this.updateAvatarClassList();
        //     this._initialAvatarRender = true;
        // }
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */
    @api
    get isAvatarVariant() {
        return this.variant === 'avatar';
    }

    @api
    get isBadgeVariant() {
        return this.variant === 'badge';
    }

    @api
    get isBreadcrumbsVariant() {
        return this.variant === 'breadcrumbs';
    }

    @api
    get isButtonVariant() {
        return this.variant === 'button';
    }

    @api
    get isButtonIconVariant() {
        return this.variant === 'button-icon';
    }

    @api
    get isChipVariant() {
        return this.variant === 'chip';
    }

    @api
    get isComboboxVariant() {
        return this.variant === 'combobox';
    }

    @api
    get isDatatableVariant() {
        return this.variant === 'datatable';
    }

    @api
    get isInputVariant() {
        return this.variant === 'input';
    }

    @api
    get isProgressIndicatorVariant() {
        console.log(this.variant);
        return this.variant === 'progress-indicator';
    }

    @api
    get isRegularVariant() {
        return (
            this.variant === 'text' ||
            this.variant === 'circular' ||
            this.variant === 'rectangular'
        );
    }

    @api
    get chipHasIcon() {
        return this.variantAttributes.hasIcon;
    }

    @api
    get badgeHasEndIcon() {
        return (
            this.variantAttributes.iconPosition === 'end' &&
            this.variantAttributes.hasIcon === true
        );
    }

    @api
    get buttonHasLeftIcon() {
        return (
            this.variantAttributes.iconPosition === 'left' &&
            this.variantAttributes.hasIcon === true
        );
    }

    @api
    get buttonHasRightIcon() {
        return (
            this.variantAttributes.iconPosition === 'right' &&
            this.variantAttributes.hasIcon === true
        );
    }

    @api
    get comboboxRequired() {
        return this.variantAttributes.required;
    }

    @api
    get hasChipLabel() {
        return this.variantAttributes.chipLabel;
    }

    @api
    get hideCheckboxColumn() {
        return this.variantAttributes.hideCheckboxColumn;
    }

    @api
    get hideTableHeader() {
        return this.variantAttributes.hideTableHeader;
    }

    @api
    get inputRequired() {
        return this.variantAttributes.required;
    }

    @api
    get showPrimaryText() {
        return this.variantAttributes.primaryText;
    }

    @api
    get showSecondaryText() {
        return this.variantAttributes.secondaryText;
    }

    /**
     * Tertiary text show.
     *
     * @type {boolean}
     */
    get showTertiaryText() {
        return (
            (this._variantAttributes.size === 'x-large' ||
                this._variantAttributes.size === 'xx-large') &&
            this.variantAttributes.tertiaryText
        );
    }

    @api
    get variantAttributes() {
        return this._variantAttributes;
    }
    set variantAttributes(value) {
        this._variantAttributes = value;
    }

    /**
     * The animation type changes the appearance of the skeleton. Valid values include pulse and wave.
     * @type {string}
     * @public
     */
    @api
    get animation() {
        return this._animation;
    }
    set animation(value) {
        this._animation = normalizeString(value, {
            fallbackValue: ANIMATION_VARIANTS.default,
            validValues: null
        });
    }

    /**
     * Height of the skeleton in px.
     * @type {number}
     * @public
     */
    @api
    get height() {
        return this._height;
    }
    set height(value) {
        this._height = value;
    }

    /**
     * The variant changes the appearance of the skeleton. Valid values include circular, rectangular and text.
     * @type {string}
     * @default text
     * @public
     */
    @api
    get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: SKELETON_VARIANTS.default,
            validValues: SKELETON_VARIANTS.valid
        });
    }

    /**
     * Width of the skeleton in px.
     * @type {number}
     * @public
     */
    @api
    get width() {
        return this._width;
    }
    set width(value) {
        this._width = value;
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */
    /**
     * Wrapper div class, depending on the variant value.
     * @type {string}
     */
    get variantClass() {
        return classSet('avonni-skeleton__base')
            .add(`avonni-skeleton__variant-${this.variant}`)
            .add(`avonni-skeleton__animation-${this.animation}`)
            .toString();
    }

    /**
     * Compute chip class style.
     *
     * @type {string}
     */
    get badgeClass() {
        return classSet('avonni-badge')
            .add({
                'avonni-chip_outline': this.variantAttributes.outline
            })
            .add(`avonni-chip_theme-${this.variantAttributes.variant}`)
            .add('avonni-skeleton__base')
            .add(`avonni-skeleton__animation-${this.animation}`)
            .toString();
    }

    get badgeLabelClass() {
        return (
            classSet('avonni-skeleton__variant-text')
                .add('avonni-skeleton__chip-label')
                // .add(`avonni-skeleton__animation-${this.animation}`)
                .toString()
        );
    }

    /**
     * Compute chip class style.
     *
     * @type {string}
     */
    get chipClass() {
        return classSet('avonni-chip')
            .add({
                'avonni-chip_outline': this.variantAttributes.outline
            })
            .add(`avonni-chip_theme-${this.variantAttributes.variant}`)
            .add('avonni-skeleton__base')
            .add(`avonni-skeleton__variant-${this.variant}`)
            .add(`avonni-skeleton__animation-${this.animation}`)
            .toString();
    }

    get chipLabelClass() {
        return (
            classSet('avonni-skeleton__variant-text')
                .add('avonni-skeleton__chip-label')
                // .add(`avonni-skeleton__animation-${this.animation}`)
                .toString()
        );
    }

    get comboboxLabelClass() {
        return classSet('avonni-skeleton__base')
            .add('avonni-skeleton__variant-text')
            .add(`avonni-skeleton__animation-${this.animation}`)
            .toString();
    }

    /**
     * Computed CSS Classes for the label.
     *
     * @type {string}
     */
    get computedComboboxLabelClass() {
        return (
            classSet('slds-form-element__label avonni-combobox__label')
                // .add({
                //     'slds-assistive-text':
                //         this.variantAttributes.variant === 'label-hidden'
                // })
                .toString()
        );
    }

    /**
     * Computed CSS classes for the comboboxes wrapper.
     *
     * @type {string}
     */
    get computedComboboxGroupClass() {
        return this.showScopes ? 'slds-combobox-group' : undefined;
    }

    get slotClass() {
        return classSet('avonni-skeleton__base')
            .add(`avonni-skeleton__animation-${this.animation}`)
            .toString();
    }

    get breadcrumbClass() {
        return classSet('breadcrumbClass')
            .add(`avonni-skeleton__animation-${this.animation}`)
            .toString();
    }

    get breadcrumbsClass() {
        return classSet('slds-list_horizontal')
            .add(`avonni-skeleton__animation-${this.animation}`)
            .toString();
    }

    get datatableFirstGridClass() {
        return classSet('slds-col')
            .add(`avonni-skeleton__animation-${this.animation}`)
            .add('avonni-skeleton__datatable')
            .add('slds-size_1-of-12');
    }

    get buttonLabelClass() {
        return (
            classSet('avonni-skeleton__variant-text')
                .add('avonni-skeleton__button-label')
                // .add(`avonni-skeleton__animation-${this.animation}`)
                .toString()
        );
    }

    get datatableCheckboxGridClass() {
        return classSet('slds-col')
            .add(`avonni-skeleton__animation-${this.animation}`)
            .add('avonni-skeleton__datatable')
            .add('slds-size_1-of-12');
    }

    get datatableGridClass() {
        return (
            classSet('slds-col')
                .add(`avonni-skeleton__animation-${this.animation}`)
                .add('avonni-skeleton__datatable')
                // .add('slds-var-m-around_xxx-small')
                // .add('slds-p-horizontal_medium');
                // .add('slds-border_bottom')
                // .add('slds-border_left')
                // .add('slds-border_right')
                // .add('slds-border_top')
                .add('slds-size_1-of-5')
        );
    }

    get datatableRowClass() {
        return classSet('slds-col')
            .add(`avonni-skeleton__animation-${this.animation}`)
            .add('slds-size_1-of-1')
            .add('avonni-skeleton__datatable');
    }

    get datatableTDClass() {
        return classSet('slds-text-align_right')
            .add('slds-cell_action-mode')
            .add(`avonni-skeleton__animation-${this.animation}`);
    }

    get datatableTHClass() {
        return classSet('slds-cell_action-mode').add(
            `avonni-skeleton__animation-${this.animation}`
        );
    }

    get inputClass() {
        return classSet('slds-input')
            .add(`avonni-skeleton__animation-${this.animation}`)
            .add('avonni-skeleton__input');
    }

    get inputLabelClass() {
        return classSet('slds-list_horizontal').add(
            'avonni-skeleton__input-label'
        );
    }

    get inputLabelTagClass() {
        return classSet('avonni-skeleton__input-label-tag').add(
            `avonni-skeleton__animation-${this.animation}`
        );
    }

    get progressIndicatorItemClass() {
        return classSet('slds-progress__marker').add(
            `avonni-skeleton__buttonIcon-animation-${this.animation}`
        );
    }

    get progressIndicatorBarClass() {
        return classSet('slds-progress-bar')
            .add('slds-progress-bar_x-small')
            .add(`avonni-skeleton__buttonIcon-animation-${this.animation}`);
    }

    /*
     * ------------------------------------------------------------
     * PRIVATE METHODS
     * ------------------------------------------------------------
     */
    /**
     * Returns the avonni-skeleton DOM element
     *
     * @returns {object} avonni-skeleton
     */
    get skeleton() {
        return this.template.querySelector(
            '[data-element-id="avonni-skeleton"]'
        );
    }

    handleVariant() {
        switch (this.variant) {
            case 'avatar':
                this.handleAvatarVariant();
                break;
            case 'badge':
                this.handleBadge();
                break;
            case 'breadcrumbs':
                this.handleBreadcrumbs();
                break;
            case 'button':
                this.updateVariantButton();
                break;
            case 'button-icon':
                this.updateVariantButtonIcon();
                break;
            case 'chip':
                this.handleChipVariant();
                break;
            case 'combobox':
                this.handleComboboxVariant();
                break;
            case 'datatable':
                this.handleDatableVariant();
                break;
            case 'progress-indicator':
                this.handleProgressIndicator();
                break;
            case 'text':
                this.setTextSize();
                break;
            case 'rectangular':
                this.setRectangularCircularSize();
                break;
            case 'circular':
                this.setRectangularCircularSize();
                break;
            default:
                break;
        }
    }

    handleAvatarVariant() {
        if (Object.keys(this.variantAttributes).length !== 0)
            this.updateAvatarClassList();
    }

    handleChipVariant() {
        if (Object.keys(this.variantAttributes).length !== 0)
            this.updateChipClassList();
    }

    handleBadge() {
        if (Object.keys(this.variantAttributes).length !== 0)
            this.updateBadgeClassList();
    }

    handleBreadcrumbs() {
        if (Object.keys(this.variantAttributes).length !== 0) {
            this.updateBreadcrumbsClassList();
            // this.initializeBreadcrumbs();
        }
    }

    handleButtonVariant() {
        if (Object.keys(this.variantAttributes).length !== 0) {
            this.updateButtonClassList();
        }
    }

    handleButtonIconVariant() {
        if (Object.keys(this.variantAttributes).length !== 0) {
            this.updateButtonIconClassList();
        }
    }

    handleComboboxVariant() {
        if (Object.keys(this.variantAttributes).length !== 0) {
            this.updateComboboxClassList();
        }
    }

    handleDatableVariant() {
        if (Object.keys(this.variantAttributes).length !== 0) {
            this.updateDatatableClassList();
        }
    }

    handleProgressIndicator() {
        if (Object.keys(this.variantAttributes).length !== 0) {
            this.updateProgressIndicatorClassList();
        }
    }

    initializeBreadcrumbs() {
        const breadcrumbs = [];
        console.log(`first`);
        for (let i = 0; i < this.variantAttributes.numBreadcrumbs; i++) {
            console.log('middle');
            breadcrumbs.push({
                key: `panel-${i}`
            });
        }
        console.log('end');
        this.breadcrumbs = breadcrumbs;
    }

    /**
     * Sets the width and heigh for text variant
     */
    setTextSize() {
        console.log(`variant: ${this.variant === 'combobox'}`);
        console.log('inside setTextSize');
        let element = this.skeleton;
        console.log(`element: ${element}`);
        element.style.height =
            this.height === undefined ? '0.7em' : `${this.height}`;
        console.log('end setTextSize');
        element.style.width =
            this.width === undefined ? '100%' : `${this.width}`;
    }

    /**
     * Sets the width and heigh for rectangular and circular variants
     */
    setRectangularCircularSize() {
        let element = this.skeleton;
        element.style.height =
            this.height === undefined ? '1.2em' : `${this.height}`;
        element.style.width =
            this.width === undefined ? '100%' : `${this.width}`;
    }

    updateAvatarClassList() {
        const wrapperClass = classSet('')
            .add('slds-avatar')
            // .add(`avonni-avatar_${this.avatarVariant}`)
            .add({
                'avonni-avatar_xx-small':
                    this.variantAttributes.size === 'xx-small',
                'slds-avatar_x-small':
                    this.variantAttributes.size === 'x-small',
                'slds-avatar_small': this.variantAttributes.size === 'small',
                'slds-avatar_medium': this.variantAttributes.size === 'medium',
                'slds-avatar_large': this.variantAttributes.size === 'large',
                'avonni-avatar_x-large':
                    this.variantAttributes.size === 'x-large',
                'avonni-avatar_xx-large':
                    this.variantAttributes.size === 'xx-large',
                'slds-avatar_circle':
                    this.variantAttributes.variant === 'circle'
            });

        const parentWrapperClass = classSet('').add(
            'avonni-skeleton-avatar__paragraph-margin'
        );

        const primaryTextClass = classSet('slds-text-title_bold')
            .add('avonni-avatar__primary-text')
            .add('avonni-skeleton__variant-text')
            .add(`avonni-skeleton__animation-${this.animation}`);

        const secondaryTextClass = classSet('avonni-avatar__secondary-text')
            .add('avonni-skeleton__variant-text')
            .add(`avonni-skeleton__animation-${this.animation}`);

        const tertiaryTextClass = classSet('avonni-avatar__tertiary-text')
            .add('avonni-skeleton__variant-text')
            .add(`avonni-skeleton__animation-${this.animation}`);

        console.log('first');
        this.parentAvatarWrapper = parentWrapperClass;
        this.avatarWrapperClass = wrapperClass;
        this.primaryTextClass = primaryTextClass;
        this.secondaryTextClass = secondaryTextClass;
        this.tertiaryTextClass = tertiaryTextClass;
    }

    updateChipClassList() {
        const chip = this.template.querySelector(
            '[data-element-id="span-wrapper"]'
        );
        const chipLabel = this.template.querySelector(
            '[data-element-id="chip-label"]'
        );
        if (this.variantAttributes.variant === 'success') {
            chip.style.setProperty(
                '--avonni-skeleton-color-background',
                '#2e844a'
            );
            chip.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#4eb571'
            );
            chipLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#ffffff'
            );
        }
        if (this.variantAttributes.variant === 'brand') {
            chip.style.setProperty(
                '--avonni-skeleton-color-background',
                '#0070d1'
            );
            chip.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#3292e6'
            );
            chipLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#ffffff'
            );
        }
        if (this.variantAttributes.variant === 'inverse') {
            chip.style.setProperty(
                '--avonni-skeleton-color-background',
                '#001639'
            );
            chip.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#244c8c'
            );
            chipLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#ffffff'
            );
        }
        if (this.variantAttributes.variant === 'alt-inverse') {
            chip.style.setProperty(
                '--avonni-skeleton-color-background',
                '#032d60'
            );
            chip.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#23538c'
            );
            chipLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#ffffff'
            );
        }
        if (this.variantAttributes.variant === 'info') {
            chip.style.setProperty(
                '--avonni-skeleton-color-background',
                '#706e6b'
            );
            chip.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#8c8c8b'
            );
            chipLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#ffffff'
            );
        }
        if (this.variantAttributes.variant === 'warning') {
            chip.style.setProperty(
                '--avonni-skeleton-color-background',
                '#fe9339'
            );
            chip.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#fcac68'
            );
            chipLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#000000'
            );
        }
        if (this.variantAttributes.variant === 'error') {
            chip.style.setProperty(
                '--avonni-skeleton-color-background',
                '#ea001e'
            );
            chip.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#ff6679'
            );
            chipLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#ffffff'
            );
        }
        if (this.variantAttributes.variant === 'offline') {
            chip.style.setProperty(
                '--avonni-skeleton-color-background',
                '#444444'
            );
            chip.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#7d7d7d'
            );
            chipLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#ffffff'
            );
        }
    }

    updateBadgeClassList() {}

    updateBreadcrumbsClassList() {}

    updateButtonClassList() {
        const buttonWrapper = classSet('slds-button')
            .add({
                'slds-button_neutral':
                    this.variantAttributes.variant === 'neutral',
                'slds-button_brand': this.variantAttributes.variant === 'brand',
                'slds-button_outline-brand':
                    this.variantAttributes.variant === 'brand-outline',
                'slds-button_inverse':
                    this.variantAttributes.variant === 'inverse',
                'slds-button_destructive':
                    this.variantAttributes.variant === 'destructive',
                'slds-button_text-destructive':
                    this.variantAttributes.variant === 'text-destructive',
                'slds-button_success':
                    this.variantAttributes.variant === 'success'
            })
            .add(`avonni-skeleton__animation-${this.animation}`);
        this.buttonWrapper = buttonWrapper;
    }

    updateButtonIconClassList() {
        const buttonIconWrapper = classSet('slds-button')
            .add('slds-button_icon')
            .add('slds-button__icon_large')
            .add({
                'slds-button_icon-brand':
                    this.variantAttributes.variant === 'brand',
                'slds-button_icon-inverse':
                    this.variantAttributes.variant === 'inverse'
            })
            .add(`avonni-skeleton__buttonIcon-animation-${this.animation}`);
        this.buttonIconWrapper = buttonIconWrapper;
    }

    updateVariantButton() {
        const button = this.template.querySelector(
            '[data-element-id="button-element"]'
        );

        const buttonLabel = this.template.querySelector(
            '[data-element-id="button-label"]'
        );

        if (this.variantAttributes.variant === 'brand') {
            button.style.setProperty(
                '--avonni-skeleton-color-background',
                '#0176d3'
            );

            button.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#2fa0fa'
            );
        }
        if (this.variantAttributes.variant === 'outline-brand') {
            button.style.setProperty(
                '--avonni-skeleton-color-background',
                '#ffffff'
            );
            button.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#e1e1e1'
            );
            buttonLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#0176d3'
            );
        }
        if (this.variantAttributes.variant === 'inverse') {
            button.style.setProperty(
                '--avonni-skeleton-color-background',
                '#16325c'
            );
            button.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#5271a1'
            );
            buttonLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#f3f3f3'
            );
        }
        if (this.variantAttributes.variant === 'destructive') {
            button.style.setProperty(
                '--avonni-skeleton-color-background',
                '#ba0517'
            );
            button.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#e34050'
            );
            buttonLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#ffffff'
            );
        }
        if (this.variantAttributes.variant === 'text-destructive') {
            button.style.setProperty(
                '--avonni-skeleton-color-background',
                '#ffffff'
            );
            button.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#e1e1e1'
            );
            buttonLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#ea001e'
            );
        }
        if (this.variantAttributes.variant === 'success') {
            button.style.setProperty(
                '--avonni-skeleton-color-background',
                '#45c65a'
            );
            button.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#73e686'
            );
            buttonLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#181818'
            );
        }
    }

    updateVariantButtonIcon() {
        const buttonIcon = this.template.querySelector(
            '[data-element-id="button-icon"]'
        );

        if (this.variantAttributes.variant === 'brand') {
            buttonIcon.style.setProperty(
                '--avonni-skeleton-color-background',
                '#0176d3'
            );
            buttonIcon.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#2791e8'
            );
        }
        if (this.variantAttributes.variant === 'inverse') {
            buttonIcon.style.setProperty(
                '--avonni-skeleton-color-background',
                '#16325c'
            );
            buttonIcon.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#365380'
            );
        }
    }

    updateComboboxClassList() {
        console.log('inside updateClassList');
        this.setTextSize();
    }

    updateDatatableClassList() {}

    updateProgressIndicatorClassList() {}
}
