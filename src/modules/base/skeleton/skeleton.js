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

import { classSet } from 'c/utils';
import { normalizeString } from 'c/utilsPrivate';
import { api, LightningElement } from 'lwc';
import avatar from './avatar.html';
import badge from './badge.html';
import button from './button.html';
import buttonIcon from './buttonIcon.html';
import chip from './chip.html';
import combobox from './combobox.html';
import datatable from './datatable.html';
import input from './input.html';
import paragraph from './paragraph.html';
import progressIndicator from './progressIndicator.html';
import skeleton from './skeleton.html';
import tabset from './tabset.html';
import tree from './tree.html';

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

    avatarWrapperClass;
    avatarClass;
    primaryAvatarTextClass;
    secondaryAvatarTextClass;
    tertiaryAvatarTextClass;
    breadcrumbs = [];
    buttonWrapper;
    buttonIconWrapper;
    datatableRows = [];
    datatableColumns = [];
    htmlVariant;
    // paragraphs = [];
    paragraphItems = [];
    currentParagraphItem = 0;
    progressItems = [];
    paragraphItemsInitialized = false;
    tabset = [];
    treeItems = [];

    connectedCallback() {
        console.log(`connected callback variant: ${this.variant}`);
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
        if (this.isDatatableVariant) {
            this.initializeDatatableRows();
            this.initializeDatatableColumns();
        }
        if (this.isParagraphVariant) {
            this.initializeParagraphItems();
        }

        if (this.isProgressIndicatorVariant) {
            this.initializeProgressItems();
        }

        if (this.isTabsetVariant) {
            this.initializeTabset();
        }

        if (this.isTreeVariant) {
            this.initializeTreeItems();
        }
    }

    renderedCallback() {
        console.log(`rendered callback variant: ${this.variant}`);
        // if (!this.isAvatarVariant) this.setSkeletonSize();
        if (!this.isAvatarVariant) this.handleVariant();
        if (this.isParagraphVariant && !this.paragraphItemsInitialized) {
            this.initializeParagraphItems();
            this.paragraphItemsInitialized = true;
            this.updateParagraphClassList();
        }
    }

    render() {
        console.log(`render variant: ${this.variant}`);
        switch (this.variant) {
            case 'avatar':
                this.htmlVariant = avatar;
                break;
            case 'badge':
                this.htmlVariant = badge;
                break;
            case 'button':
                this.htmlVariant = button;
                break;
            case 'button-icon':
                this.htmlVariant = buttonIcon;
                break;
            case 'chip':
                this.htmlVariant = chip;
                break;
            case 'circular':
                this.htmlVariant = skeleton;
                break;
            case 'combobox':
                this.htmlVariant = combobox;
                break;
            case 'datatable':
                this.htmlVariant = datatable;
                break;
            case 'input':
                this.htmlVariant = input;
                break;
            case 'paragraph':
                this.htmlVariant = paragraph;
                break;
            case 'progress-indicator':
                this.htmlVariant = progressIndicator;
                break;
            case 'rectangular':
                this.htmlVariant = skeleton;
                break;
            case 'tabset':
                this.htmlVariant = tabset;
                break;
            case 'text':
                this.htmlVariant = skeleton;
                break;
            case 'tree':
                this.htmlVariant = tree;
                break;
            default:
                this.htmlVariant = skeleton;
        }
        return this.htmlVariant;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */
    @api
    get badgeHasLeftIcon() {
        return (
            this.variantAttributes.iconPosition === 'left' &&
            this.variantAttributes.hasIcon === true
        );
    }

    @api
    get badgeHasRightIcon() {
        return (
            this.variantAttributes.iconPosition === 'right' &&
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
    get chipHasIcon() {
        return this.variantAttributes.hasIcon;
    }

    @api
    get comboboxRequired() {
        return this.variantAttributes.required;
    }

    @api
    get comboboxVariantLabelHidden() {
        return this.variantAttributes.variant === 'label-hidden';
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
    get hideTreeHeader() {
        return this.variantAttributes.hideHeader;
    }

    @api
    get inputRequired() {
        return this.variantAttributes.required;
    }

    @api
    get inputVariantLabelHidden() {
        return this.variantAttributes.variant === 'label-hidden';
    }

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
    get isBaseComboboxVariant() {
        return this.variantAttributes.variant === 'base';
    }

    @api
    get isLookupComboboxVariant() {
        return this.variantAttributes.variant === 'lookup';
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
    get isPathVariant() {
        return this.variantAttributes.variant === 'path';
    }

    @api
    get isParagraphVariant() {
        return this.variant === 'paragraph';
    }

    @api
    get isProgressIndicatorVariant() {
        return this.variant === 'progress-indicator';
    }

    // @api
    // get isRegularVariant() {
    //     return (
    //         this.variant === 'text' ||
    //         this.variant === 'circular' ||
    //         this.variant === 'rectangular'
    //     );
    // }

    @api
    get isTabsetBaseVariant() {
        return this.variantAttributes.variant === 'base';
    }

    @api
    get isTabsetScopedVariant() {
        return this.variantAttributes.variant === 'scoped';
    }

    @api
    get isTabsetVariant() {
        return this.variant === 'tabset';
    }

    @api
    get isTabsetVerticalVariant() {
        return this.variantAttributes.variant === 'vertical';
    }

    @api
    get isTreeVariant() {
        return this.variant === 'tree';
    }

    @api
    get showAvatarPrimaryText() {
        return this.variantAttributes.primaryText;
    }

    @api
    get showAvatarSecondaryText() {
        return this.variantAttributes.secondaryText;
    }

    /**
     * Tertiary text show.
     *
     * @type {boolean}
     */
    get showAvatarTertiaryText() {
        return (
            (this._variantAttributes.size === 'x-large' ||
                this._variantAttributes.size === 'xx-large') &&
            this.variantAttributes.tertiaryText
        );
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

    @api
    get variantAttributes() {
        return this._variantAttributes;
    }
    set variantAttributes(value) {
        this._variantAttributes = value;
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
     * Compute badge class style.
     *
     * @type {string}
     */
    get badgeClass() {
        return (
            classSet('avonni-badge')
                .add({
                    'avonni-chip_outline': this.variantAttributes.outline
                })
                .add(`avonni-badge_theme-${this.variantAttributes.variant}`)
                // .add('avonni-skeleton__base')
                .add(`avonni-skeleton__animation-${this.animation}`)
                .toString()
        );
    }

    get badgeLabelClass() {
        return (
            classSet('avonni-skeleton__variant-text')
                .add('avonni-skeleton__badge-label')
                // .add(`avonni-skeleton__animation-${this.animation}`)
                .toString()
        );
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

    get buttonLabelClass() {
        return (
            classSet('avonni-skeleton__variant-text')
                .add('avonni-skeleton__button-label')
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
        return (
            classSet('avonni-chip')
                .add({
                    'avonni-chip_outline': this.variantAttributes.outline
                })
                .add(`avonni-chip_theme-${this.variantAttributes.variant}`)
                // .add('avonni-skeleton__base')
                .add(`avonni-skeleton__variant-${this.variant}`)
                .add(`avonni-skeleton__animation-${this.animation}`)
                .toString()
        );
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
        return classSet('avonni-skeleton__combobox-label')
            .add('avonni-skeleton__variant-text')
            .add(`avonni-skeleton__animation-${this.animation}`)
            .toString();
    }

    get comboboxSearchClass() {
        return classSet('avonni-skeleton__combobox-search')
            .add('slds-input_faux')
            .add('slds-has-focus');
    }

    get comboboxWrapperClass() {
        return classSet('slds-form-element').add({
            'slds-form-element_horizontal':
                this.variantAttributes.variant === 'label-inline'
        });
    }

    get datatableBodyClass() {
        return classSet('avonni-skeleton__datatable-body')
            .add('slds-border_right')
            .add('slds-border_left');
    }

    get datatableCheckboxClass() {
        return classSet('slds-checkbox_faux')
            .add('avonni-skeleton__datatable-checkbox')
            .add({
                'avonni-skeleton__animation-pulse': this.animation === 'pulse',
                'avonni-skeleton__datatable-animation-wave':
                    this.animation === 'wave'
            });
    }

    get datatableCheckboxGridClass() {
        return classSet('slds-col')
            .add('avonni-skeleton__datatable')
            .add('slds-size_1-of-12')
            .add({
                'avonni-skeleton__animation-pulse': this.animation === 'pulse',
                'avonni-skeleton__datatable-animation-wave':
                    this.animation === 'wave'
            });
    }

    get datatableDividerClass() {
        return classSet('slds-border_right');
    }

    get datatableFirstGridClass() {
        return classSet('slds-col')
            .add('avonni-skeleton__datatable')
            .add('slds-size_1-of-12')
            .add({
                'avonni-skeleton__animation-pulse': this.animation === 'pulse',
                'avonni-skeleton__datatable-animation-wave':
                    this.animation === 'wave'
            });
    }

    get datatableHeaderCheckboxClass() {
        return classSet('slds-th__action')
            .add('slds-th__action_form')
            .add('avonni-skeleton__datatable-header-checkbox');
    }

    get datatableGridClass() {
        return (
            classSet('slds-col')
                .add('avonni-skeleton__datatable')
                // .add('slds-var-m-around_xxx-small')
                // .add('slds-p-horizontal_medium');
                // .add('slds-border_bottom')
                // .add('slds-border_left')
                // .add('slds-border_right')
                // .add('slds-border_top')
                .add('slds-size_1-of-5')
                .add({
                    'avonni-skeleton__animation-pulse':
                        this.animation === 'pulse',
                    'avonni-skeleton__datatable-animation-wave':
                        this.animation === 'wave'
                })
        );
    }

    get datatableRowClass() {
        return classSet('slds-col')
            .add('slds-size_1-of-1')
            .add('avonni-skeleton__datatable')
            .add({
                'avonni-skeleton__animation-pulse': this.animation === 'pulse',
                'avonni-skeleton__datatable-animation-wave':
                    this.animation === 'wave'
            });
    }

    get datatableTableClass() {
        return classSet('slds-table')
            .add('avonni-skeleton__datatable-body')
            .add({
                'slds-table_bordered':
                    this.variantAttributes.hideCheckboxColumn === false
            })
            .add('slds-table_fixed-layout')
            .add('slds-table_resizable-cols');
    }

    get datatableTDClass() {
        return classSet('slds-text-align_right').add('');
        // .add('avonni-skeleton__variant-text')
        // .add('avonni-skeleton__datatable-item')
        // .add(`avonni-skeleton__animation-${this.animation}`);
    }

    get datatableTHClass() {
        return classSet('slds-cell_action-mode')
            .add({
                'avonni-skeleton__datatable-no-checkbox':
                    this.variantAttributes.hideCheckboxColumn === true
            })
            .add('avonni-skeleton__variant-text')
            .add('avonni-skeleton__datatable-item')
            .add({
                'avonni-skeleton__animation-pulse': this.animation === 'pulse',
                'avonni-skeleton__datatable-animation-wave':
                    this.animation === 'wave'
            });
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

    get inputWrapperClass() {
        return classSet('slds-form-element').add({
            'slds-form-element_horizontal':
                this.variantAttributes.variant === 'label-inline'
        });
    }

    get paragraphLineClass() {
        return classSet('avonni-skeleton__variant-text')
            .add('slds-item')
            .add('avonni-skeleton__paragraph')
            .add(`avonni-skeleton__animation-${this.animation}`)
            .add()
            .toString();
    }

    get progressIndicatorBarClass() {
        return classSet('slds-progress-bar')
            .add('slds-progress-bar_x-small')
            .add({
                'avonni-skeleton__buttonIcon-animation-pulse':
                    this.animation === 'pulse',
                'avonni-skeleton__progress-indicator-wave':
                    this.animation === 'wave'
            });
    }

    get progressIndicatorItemClass() {
        return classSet('slds-progress__marker').add({
            'avonni-skeleton__buttonIcon-animation-pulse':
                this.animation === 'pulse',
            'avonni-skeleton__progress-indicator-wave':
                this.animation === 'wave'
        });
    }

    get progressIndicatorPathClass() {
        return classSet('slds-path__item')
            .add('avonni-skeleton__progress-indicator')
            .add(`avonni-skeleton__progress-indicator-path-${this.animation}`)
            .add(`avonni-skeleton__animation-${this.animation}`);
    }

    get progressIndicatorPathLinkClass() {
        return classSet('slds-path__link')
            .add('avonni-skeleton__progress-indicator-path')
            .add(`avonni-skeleton__animation-${this.animation}`);
    }

    get tabClass() {
        return classSet(`avonni-skeleton_tabset-${this.animation}`);
    }

    get tabContentClass() {
        return classSet('avonni-skeleton__tabset-content')
            .add('avonni-skeleton__variant-text')
            .add(`avonni-skeleton__animation-${this.animation}`);
    }

    get tabItemClass() {
        return (
            classSet('avonni-skeleton__tabset-item')
                // .add('slds-tabs_default__link')
                .add('avonni-skeleton__variant-text')
                .add(`avonni-skeleton__animation-${this.animation}`)
        );
    }

    get tabScopedItemClass() {
        return classSet('slds-tabs_scoped__link')
            .add('avonni-skeleton__tabset-scoped-item')
            .add('avonni-skeleton__variant-text')
            .add(`avonni-skeleton__animation-${this.animation}`);
    }

    get tabVerticalItemClass() {
        return classSet('slds-truncate')
            .add('avonni-skeleton__tabset-vertical-item')
            .add('avonni-skeleton__variant-text')
            .add(`avonni-skeleton__animation-${this.animation}`);
    }

    get tabVerticalItemContainerClass() {
        return classSet('slds-vertical-tabs__link').add(
            'avonni-skeleton__tabset-vertical-container'
        );
    }

    get treeHeaderClass() {
        return classSet('slds-tree__group-header')
            .add('avonni-skeleton__tree-header')
            .add('avonni-skeleton__variant-text')
            .add(`avonni-skeleton__animation-${this.animation}`);
    }

    get treeItemClass() {
        return classSet('slds-tree__item-label')
            .add('slds-truncate')
            .add('avonni-skeleton__tree-item')
            .add('avonni-skeleton__variant-text')
            .add(`avonni-skeleton__animation-${this.animation}`);
    }

    get treeItemContainerClass() {
        return classSet('avonni-skeleton__item-container');
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
                this.handleBadgeVariant();
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
            case 'tabset':
                this.handleTabset();
                break;
            case 'tree':
                this.handleTree();
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

    handleBadgeVariant() {
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

    handleTabset() {
        if (Object.keys(this.variantAttributes).length !== 0) {
            this.updateTabsetClassList();
        }
    }

    handleTree() {
        if (Object.keys(this.variantAttributes).length !== 0) {
            this.updateTreeClassList();
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

    initializeDatatableRows() {
        const datatableRows = [];
        console.log(`num of rows is: ${this.variantAttributes.rows}`);
        for (let i = 0; i < this.variantAttributes.rows; i++) {
            datatableRows.push({
                keyTr: `rowsTr-${i}`,
                keyTd: `rowsTd-${i}`,
                keyTh: `rowsTh-${i}`
            });
        }
        console.log('end');
        this.datatableRows = datatableRows;
    }

    initializeDatatableColumns() {
        const datatableColumns = [];
        for (let i = 0; i < this.variantAttributes.columns; i++) {
            datatableColumns.push({
                keyTr: `columnsTr-${i}`,
                keyTd: `columnsTd-${i}`,
                keyTh: `columnsTh-${i}`
            });
        }
        this.datatableColumns = datatableColumns;
    }

    // initializeParagraphs() {
    //     console.log('inside initialize paragraphs');
    //     const paragraphs = [];
    //     for (let i = 0; i < this.variantAttributes.rows; i++) {
    //         paragraphs.push({
    //             key: `panel-${i}`
    //         });
    //     }
    //     this.paragraphs = paragraphs;
    // }

    // initializeParagraphItems() {
    //     console.log('inside initialize paragraph items');
    //     const paragraphItems = [];
    //     let percentage = 100;
    //     for (let i = 0; i < this.variantAttributes.rows; i++) {
    //         // const paragraphId = generateUUID();
    //         percentage = 100;
    //         paragraphItems.push({
    //             keyLi: `paragraphLi-${i}`,
    //             keyUl: `paragraphUl-${i}`,
    //             line: []
    //         });
    //         const numItems = Math.floor(Math.random() * (10 - 3)) + 3;
    //         // console.log(`num of items for row ${i}: ${numItems}`);
    //         for (let j = 0; j < numItems; j++) {
    //             // const itemId = generateUUID();
    //             const itemWidthPercentage =
    //                 Math.floor(Math.random() * percentage) + 1;
    //             paragraphItems[i].line.push({
    //                 key: `item-${j}`,
    //                 percentage: itemWidthPercentage
    //             });
    //             percentage -= itemWidthPercentage;
    //         }
    //     }
    //     this.paragraphItems = paragraphItems;
    // }

    initializeParagraphItems() {
        console.log('beginning initialize paragraph items');
        const paragraphItems = [];
        let id = 0;
        let temp;
        for (let i = 0; i < this.variantAttributes.rows; i++) {
            id++;
            for (let j = 100; j > 30; ) {
                id++;
                // const width = Math.floor(Math.random() * (5 - 1)) + 1;
                const width = Math.floor(Math.random() * (30 - 10)) + 10;
                paragraphItems.push({
                    key: `paragraph-${id}`,
                    // width: width
                    width: `${width}%`
                });
                j -= width;
                temp = j;
            }
            id++;
            paragraphItems.push({
                key: `paragraph-last-item-of-line-${id}`,
                width: `${temp}%`
            });
        }
        // let total = 0;
        // paragraphItems.forEach((item) => {
        //     const num = parseInt(item.width.slice(0, -1), 10);
        //     total += num;
        // });
        // console.log(`total: ${total}`);
        // console.log(`needed : ${(this.variantAttributes.rows - 1) * 100}`);
        // if (total < (this.variantAttributes.rows - 1) * 100) {
        //     console.log(total);
        //     const width = (this.variantAttributes.rows - 1) * 100 - total;
        //     paragraphItems.push({
        //         key: `paragraph-last-item`,
        //         width: `${width}%`
        //     });
        // }
        console.log('ending initialize paragraph items');
        this.paragraphItems = paragraphItems;
    }

    initializeProgressItems() {
        const progressItems = [];
        for (let i = 0; i < this.variantAttributes.steps; i++) {
            progressItems.push({
                key: `panel-${i}`
            });
        }
        this.progressItems = progressItems;
    }

    initializeTabset() {
        const tabsetItems = [];
        for (let i = 0; i < this.variantAttributes.tabs; i++) {
            tabsetItems.push({
                key: `tabset-${i}`
            });
        }
        this.tabset = tabsetItems;
    }

    initializeTreeItems() {
        const treeItems = [];
        for (let i = 0; i < this.variantAttributes.items; i++) {
            treeItems.push({
                key: `treeItem-${i}`
            });
        }
        this.treeItems = treeItems;
    }

    /**
     * Sets the width and heigh for text variant
     */
    setTextSize() {
        // console.log(`variant: ${this.variant === 'combobox'}`);
        // console.log('inside setTextSize');
        let element = this.skeleton;
        // console.log(`element: ${element}`);
        element.style.height =
            this.height === undefined ? '0.7em' : `${this.height}`;
        // console.log('end setTextSize');
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
        const avatarWrapperClass = classSet('slds-avatar')
            // .add(`avonni-avatar_${this.avatarVariant}`)
            .add(`avonni-skeleton__animation-${this.animation}`)
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

        const primaryAvatarTextClass = classSet('slds-m-bottom_xx-small')
            .add('avonni-avatar__primary-text')
            .add('avonni-skeleton__variant-text')
            .add(`avonni-skeleton__animation-${this.animation}`);

        const secondaryAvatarTextClass = classSet('slds-m-bottom_xx-small')
            .add('avonni-avatar__secondary-text')
            .add('avonni-skeleton__variant-text')
            .add(`avonni-skeleton__animation-${this.animation}`);

        const tertiaryAvatarTextClass = classSet('avonni-avatar__tertiary-text')
            .add('avonni-skeleton__variant-text')
            .add(`avonni-skeleton__animation-${this.animation}`);

        this.avatarWrapperClass = avatarWrapperClass;
        this.primaryAvatarTextClass = primaryAvatarTextClass;
        this.secondaryAvatarTextClass = secondaryAvatarTextClass;
        this.tertiaryAvatarTextClass = tertiaryAvatarTextClass;
    }

    updateChipClassList() {
        const chipElement = this.template.querySelector(
            '[data-element-id="span-wrapper"]'
        );
        const chipLabel = this.template.querySelector(
            '[data-element-id="chip-label"]'
        );
        if (this.variantAttributes.variant === 'success') {
            chipElement.style.setProperty(
                '--avonni-skeleton-color-background',
                '#2e844a'
            );
            chipElement.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#4eb571'
            );
            chipLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#ffffff'
            );
        } else if (this.variantAttributes.variant === 'brand') {
            chipElement.style.setProperty(
                '--avonni-skeleton-color-background',
                '#0070d1'
            );
            chipElement.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#3292e6'
            );
            chipLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#ffffff'
            );
        } else if (this.variantAttributes.variant === 'inverse') {
            chipElement.style.setProperty(
                '--avonni-skeleton-color-background',
                '#001639'
            );
            chipElement.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#244c8c'
            );
            chipLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#ffffff'
            );
        } else if (this.variantAttributes.variant === 'alt-inverse') {
            chipElement.style.setProperty(
                '--avonni-skeleton-color-background',
                '#032d60'
            );
            chipElement.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#23538c'
            );
            chipLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#ffffff'
            );
        } else if (this.variantAttributes.variant === 'info') {
            chipElement.style.setProperty(
                '--avonni-skeleton-color-background',
                '#706e6b'
            );
            chipElement.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#8c8c8b'
            );
            chipLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#ffffff'
            );
        } else if (this.variantAttributes.variant === 'warning') {
            chipElement.style.setProperty(
                '--avonni-skeleton-color-background',
                '#fe9339'
            );
            chipElement.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#fcac68'
            );
            chipLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#000000'
            );
        } else if (this.variantAttributes.variant === 'error') {
            chipElement.style.setProperty(
                '--avonni-skeleton-color-background',
                '#ea001e'
            );
            chipElement.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#ff6679'
            );
            chipLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#ffffff'
            );
        } else if (this.variantAttributes.variant === 'offline') {
            chipElement.style.setProperty(
                '--avonni-skeleton-color-background',
                '#444444'
            );
            chipElement.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#7d7d7d'
            );
            chipLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#ffffff'
            );
        } else {
            chipLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#c4c4c4'
            );
        }
    }

    updateBadgeClassList() {
        const badgeElement = this.template.querySelector(
            '[data-element-id="span-wrapper"]'
        );
        const badgeLabel = this.template.querySelector(
            '[data-element-id="badge-label"]'
        );
        if (this.variantAttributes.variant === 'inverse') {
            badgeElement.style.setProperty(
                '--avonni-skeleton-color-background',
                '#747474'
            );
            badgeElement.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#8c8c8c'
            );
            badgeLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#ffffff'
            );
        } else if (this.variantAttributes.variant === 'lightest') {
            badgeElement.style.setProperty(
                '--avonni-skeleton-color-background',
                '#ffffff'
            );
            badgeElement.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#e3e3e3'
            );
            badgeLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#ffffff'
            );
        } else if (this.variantAttributes.variant === 'success') {
            badgeElement.style.setProperty(
                '--avonni-skeleton-color-background',
                '#2e844a'
            );
            badgeElement.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#55a16e'
            );
            badgeLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#ffffff'
            );
        } else if (this.variantAttributes.variant === 'warning') {
            badgeElement.style.setProperty(
                '--avonni-skeleton-color-background',
                '#fe9339'
            );
            badgeElement.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#ffab63'
            );
            badgeLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#000000'
            );
        } else if (this.variantAttributes.variant === 'error') {
            badgeElement.style.setProperty(
                '--avonni-skeleton-color-background',
                '#ea001e'
            );
            badgeElement.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#f75c6f'
            );
            badgeLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#ffffff'
            );
        } else {
            badgeLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#c4c4c4'
            );
        }
    }

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
                    this.variantAttributes.variant === 'destructive-text',
                'slds-button_success':
                    this.variantAttributes.variant === 'success'
            })
            .add('avonni-button')
            .add(`avonni-skeleton__animation-${this.animation}`);
        this.buttonWrapper = buttonWrapper;

        // const buttonLabel = this.template.querySelector(
        //     '[data-element-id="button-label"]'
        // );

        // if (this.variantAttributes.variant === 'base') {
        //     buttonLabel.style.setProperty(
        //         '--avonni-skeleton-chip-label-background',
        //         '#c4c4c4'
        //     );
        // }
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
        const buttonElement = this.template.querySelector(
            '[data-element-id="button-element"]'
        );

        const buttonLabel = this.template.querySelector(
            '[data-element-id="button-label"]'
        );

        if (this.variantAttributes.variant === 'brand') {
            buttonElement.style.setProperty(
                '--avonni-skeleton-color-background',
                '#0176d3'
            );

            buttonElement.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#2fa0fa'
            );
            buttonLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#ffffff'
            );
        } else if (this.variantAttributes.variant === 'outline-brand') {
            buttonElement.style.setProperty(
                '--avonni-skeleton-color-background',
                '#ffffff'
            );
            buttonElement.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#e1e1e1'
            );
            buttonLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#0176d3'
            );
        } else if (this.variantAttributes.variant === 'inverse') {
            buttonElement.style.setProperty(
                '--avonni-skeleton-color-background',
                '#16325c'
            );
            buttonElement.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#5271a1'
            );
            buttonLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#f3f3f3'
            );
        } else if (this.variantAttributes.variant === 'destructive') {
            buttonElement.style.setProperty(
                '--avonni-skeleton-color-background',
                '#ba0517'
            );
            buttonElement.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#e34050'
            );
            buttonLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#ffffff'
            );
        } else if (this.variantAttributes.variant === 'text-destructive') {
            buttonElement.style.setProperty(
                '--avonni-skeleton-color-background',
                '#ffffff'
            );
            buttonElement.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#e1e1e1'
            );
            buttonLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#ea001e'
            );
        } else if (this.variantAttributes.variant === 'success') {
            buttonElement.style.setProperty(
                '--avonni-skeleton-color-background',
                '#45c65a'
            );
            buttonElement.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#73e686'
            );
            buttonLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#181818'
            );
        } else {
            buttonLabel.style.setProperty(
                '--avonni-skeleton-chip-label-background',
                '#c4c4c4'
            );
        }
    }

    updateVariantButtonIcon() {
        const buttonIconElement = this.template.querySelector(
            '[data-element-id="button-icon"]'
        );

        if (this.variantAttributes.variant === 'brand') {
            buttonIconElement.style.setProperty(
                '--avonni-skeleton-color-background',
                '#0176d3'
            );
            buttonIconElement.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#2791e8'
            );
        }
        if (this.variantAttributes.variant === 'inverse') {
            buttonIconElement.style.setProperty(
                '--avonni-skeleton-color-background',
                '#16325c'
            );
            buttonIconElement.style.setProperty(
                '--avonni-skeleton-color-background-animation',
                '#365380'
            );
        }
    }

    updateComboboxClassList() {
        // console.log('inside updateClassList');
        this.setTextSize();
    }

    updateDatatableClassList() {}

    updateParagraphClassList() {
        const paragraphLines = this.template.querySelector(
            '[data-element-id="paragraph-list"]'
        ).children;
        // console.log(this.paragraphItems);
        // console.log(paragraphLines);
        for (let i = 0; i < paragraphLines.length; i++) {
            const paragraphItem = paragraphLines[i];
            // paragraphItem.style.width = this.paragraphItems[i].width;
            // paragraphItem.classList.add(
            //     `slds-size_${this.paragraphItems[i].width}-of-12`
            // );
            paragraphItem.style.width = this.paragraphItems[i].width;
        }
    }

    // updateParagraphClassList() {
    //     console.log('INSIDE UPDATE PARAGRAPH CLASS LIST');
    //     const paragraphLines = this.template.querySelector(
    //         '[data-element-id="paragraph-list"]'
    //     ).children;
    //     console.log(paragraphLines);
    //     // console.log(paragraphLines[0].children);
    //     // console.log(
    //     //     `first paragraph line has ${paragraphLines[0].children.length} items`
    //     // );

    //     for (let i = 0; i < paragraphLines.length; i++) {
    //         console.log(paragraphLines[i].children);
    //         console.log(paragraphLines[i].children[0]);
    //         console.log(paragraphLines[i].children[0].children);
    //         const variable = paragraphLines[i].children[0].children;
    //         console.log(variable);
    //         console.log(paragraphLines[i].children[0].children.length);
    //     }

    //     // for (let i = 0; i < paragraphLines.length; i++) {
    //     //     let paragraphLineItems = paragraphLines[i].children.children;
    //     //     console.log(
    //     //         `paragraphLine ${i} has: ${paragraphLineItems.length} items`
    //     //     );
    //     //     for (let j = 0; j < paragraphLineItems.length; j++) {
    //     //         let paragraphLineItem = paragraphLineItems[j];
    //     //         // console.log(`paragraphLineItem: ${paragraphLineItem}`);
    //     //         console.log(
    //     //             `paragraphLineItem width: ${paragraphLineItem.style.width}`
    //     //         );
    //     //         // paragraphLineItem.style.width =
    //     //         //     this.paragraphItems[i][j].percentage;
    //     //     }
    //     // }

    //     // const paragraphLines = this.template.querySelectorAll('li');
    //     // console.log(paragraphLines);
    //     // for (let i = 0; i < paragraphLines.length; i++) {
    //     //     let paragraphItem = paragraphLines[i];
    //     //     console.log(
    //     //         `paragraphItem ${i} width: ${paragraphItem.style.width}`
    //     //     );
    //     // }
    // }

    updateProgressIndicatorClassList() {}

    updateTabsetClassList() {}

    updateTreeClassList() {}
}
