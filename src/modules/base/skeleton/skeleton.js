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
import {
    normalizeString,
    CHIP_VARIANT_VALUES,
    BADGE_VARIANT_VALUES,
    BUTTON_VARIANT_VALUES,
    BUTTON_ICON_VARIANT_VALUES
} from 'c/utilsPrivate';
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
    _animation;
    _height;
    _variant = SKELETON_VARIANTS.default;
    _variantAttributes = {};
    _width;

    breadcrumbs = [];
    datatableRows = [];
    datatableColumns = [];
    htmlVariant;
    paragraphItems = [];
    progressItems = [];
    tabset = [];
    treeItems = [];

    connectedCallback() {
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
        if (!this.isAvatarVariant) this.handleVariant();
        if (this.isParagraphVariant) {
            this.updateParagraphClassList();
        }
    }

    render() {
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
     * The variantAttributes specify the attributes for the variant. ex: rows for paragraph
     * @type {object}
     * @default object
     * @public
     */
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

    /**
     * Get if badge has an icon on its left
     * @type {boolean}
     */
    @api
    get badgeHasLeftIcon() {
        return (
            this.variantAttributes.iconPosition === 'left' &&
            this.variantAttributes.hasIcon === true
        );
    }

    /**
     * Get if badge has an icon on its right
     * @type {boolean}
     */
    @api
    get badgeHasRightIcon() {
        return (
            this.variantAttributes.iconPosition === 'right' &&
            this.variantAttributes.hasIcon === true
        );
    }

    /**
     * Get if chip has an icon
     * @type {boolean}
     */
    @api
    get chipHasIcon() {
        return this.variantAttributes.hasIcon;
    }

    /**
     * Get if combobox has a required input
     * @type {boolean}
     */
    @api
    get comboboxRequired() {
        return this.variantAttributes.required;
    }

    /**
     * Get if combobox has its label hidden
     * @type {boolean}
     */
    @api
    get comboboxVariantLabelHidden() {
        return this.variantAttributes.variant === 'label-hidden';
    }

    /**
     * Get if datatable has to have its checkbox column hidden
     * @type {boolean}
     */
    @api
    get hideCheckboxColumn() {
        return this.variantAttributes.hideCheckboxColumn;
    }

    /**
     * Get if datatable has to have its table header hidden
     * @type {boolean}
     */
    @api
    get hideTableHeader() {
        return this.variantAttributes.hideTableHeader;
    }

    /**
     * Get if tree has to have its header hidden
     * @type {boolean}
     */
    @api
    get hideTreeHeader() {
        return this.variantAttributes.hideHeader;
    }

    /**
     * Get if input has a required input field
     * @type {boolean}
     */
    @api
    get inputRequired() {
        return this.variantAttributes.required;
    }

    /**
     * Get if input has to have its label hidden
     * @type {boolean}
     */
    @api
    get inputVariantLabelHidden() {
        return this.variantAttributes.variant === 'label-hidden';
    }

    /**
     * Get if variant is avatar
     * @type {boolean}
     */
    @api
    get isAvatarVariant() {
        return this.variant === 'avatar';
    }

    /**
     * Get if variant is datatable
     * @type {boolean}
     */
    @api
    get isDatatableVariant() {
        return this.variant === 'datatable';
    }

    /**
     * Get if variant is path
     * @type {boolean}
     */
    @api
    get isPathVariant() {
        return this.variantAttributes.variant === 'path';
    }

    /**
     * Get if variant is paragraph
     * @type {boolean}
     */
    @api
    get isParagraphVariant() {
        return this.variant === 'paragraph';
    }

    /**
     * Get if variant is progress-indicator
     * @type {boolean}
     */
    @api
    get isProgressIndicatorVariant() {
        return this.variant === 'progress-indicator';
    }

    /**
     * Get if variant is text, rectangular or circular
     * @type {boolean}
     */
    @api
    get isRegularVariant() {
        return (
            this.variant === 'text' ||
            this.variant === 'rectangular' ||
            this.variant === 'circular'
        );
    }

    /**
     * Get if the tabset variant is base
     * @type {boolean}
     */
    @api
    get isTabsetBaseVariant() {
        return this.variantAttributes.variant === 'base';
    }

    /**
     * Get if the tabset variant is scoped
     * @type {boolean}
     */
    @api
    get isTabsetScopedVariant() {
        return this.variantAttributes.variant === 'scoped';
    }

    /**
     * Get if variant is tabset
     * @type {boolean}
     */
    @api
    get isTabsetVariant() {
        return this.variant === 'tabset';
    }

    /**
     * Get if the tabset variant is vertical
     * @type {boolean}
     */
    @api
    get isTabsetVerticalVariant() {
        return this.variantAttributes.variant === 'vertical';
    }

    /**
     * Get if the variant is tree
     * @type {boolean}
     */
    @api
    get isTreeVariant() {
        return this.variant === 'tree';
    }

    /**
     * Get if avatar should show its primary text
     * @type {boolean}
     */
    @api
    get showAvatarPrimaryText() {
        return this.variantAttributes.primaryText;
    }

    /**
     * Get if avatar should show its secondary text
     * @type {boolean}
     */
    @api
    get showAvatarSecondaryText() {
        return this.variantAttributes.secondaryText;
    }

    /**
     * Get if avatar should show its tertiary text
     * @type {boolean}
     */
    @api
    get showAvatarTertiaryText() {
        return (
            (this._variantAttributes.size === 'x-large' ||
                this._variantAttributes.size === 'xx-large') &&
            this.variantAttributes.tertiaryText
        );
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */
    /**
     * Class of the avatar wrapper
     * @type {string}
     */
    get avatarWrapperClass() {
        return classSet('slds-avatar')
            .add({
                'avonni-skeleton__avatar-animation-pulse':
                    this.animation === 'pulse',
                'avonni-skeleton__avatar-animation-wave':
                    this.animation === 'wave'
            })
            .add({
                'avonni-skeleton__avatar_xx-small':
                    this.variantAttributes.size === 'xx-small',
                'slds-avatar_x-small':
                    this.variantAttributes.size === 'x-small',
                'slds-avatar_small': this.variantAttributes.size === 'small',
                'slds-avatar_medium': this.variantAttributes.size === 'medium',
                'slds-avatar_large': this.variantAttributes.size === 'large',
                'avonni-skeleton__avatar_x-large':
                    this.variantAttributes.size === 'x-large',
                'avonni-skeleton__avatar_xx-large':
                    this.variantAttributes.size === 'xx-large',
                'slds-avatar_circle':
                    this.variantAttributes.variant === 'circle'
            });
    }

    /**
     * Compute badge class
     * @type {string}
     */
    get badgeClass() {
        return (
            classSet('avonni-skeleton__badge')
                .add({
                    'avonni-chip_outline': this.variantAttributes.outline
                })
                .add(`avonni-badge_theme-${this.variantAttributes.variant}`)
                // .add('avonni-skeleton__base')
                .add(`avonni-skeleton__animation-${this.animation}`)
                .toString()
        );
    }

    /**
     * Compute button wrapper class
     * @type {string}
     */
    get buttonWrapperClass() {
        return classSet('slds-button')
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
            .add('slds-p-vertical_xx-small')
            .add('slds-p-horizontal_x-small')
            .add(`avonni-skeleton__animation-${this.animation}`);
    }

    /**
     * Compute button icon wrapper class
     * @type {string}
     */
    get buttonIconWrapper() {
        return classSet('slds-button')
            .add('slds-button_icon')
            .add('slds-button__icon_large')
            .add({
                'slds-button_icon-brand':
                    this.variantAttributes.variant === 'brand',
                'slds-button_icon-inverse':
                    this.variantAttributes.variant === 'inverse',
                'slds-button_icon-border':
                    this.variantAttributes.variant === 'container' ||
                    this.variantAttributes.variant === 'border'
            })
            .add(`avonni-skeleton__buttonIcon-animation-${this.animation}`);
    }

    /**
     * Compute chip class
     * @type {string}
     */
    get chipClass() {
        return classSet('avonni-skeleton__chip')
            .add('slds-p-vertical_xx-small')
            .add('slds-p-horizontal_x-small')
            .add(`avonni-skeleton__animation-${this.animation}`)
            .toString();
    }

    /**
     * Compute chip label class
     * @type {string}
     */
    get chipLabelClass() {
        return classSet('avonni-skeleton__chip-label').toString();
    }

    /**
     * Compute combobox label class
     * @type {string}
     */
    get comboboxLabelClass() {
        return classSet('avonni-skeleton__combobox-label')
            .add('avonni-skeleton__variant-text')
            .add(`avonni-skeleton__animation-${this.animation}`)
            .toString();
    }

    /**
     * Compute combobox wrapper class
     * @type {string}
     */
    get comboboxWrapperClass() {
        return classSet('slds-form-element').add({
            'slds-form-element_horizontal':
                this.variantAttributes.variant === 'label-inline'
        });
    }

    /**
     * Compute datatable checkbox class
     * @type {string}
     */
    get datatableCheckboxClass() {
        return classSet('slds-checkbox_faux')
            .add('avonni-skeleton__datatable-checkbox')
            .add({
                'avonni-skeleton__animation-pulse': this.animation === 'pulse',
                'avonni-skeleton__datatable-animation-wave':
                    this.animation === 'wave'
            });
    }

    /**
     * Compute datatable th class
     * @type {string}
     */
    get datatableTHClass() {
        return classSet('').add({
            'avonni-skeleton__datatable-no-checkbox':
                this.variantAttributes.hideCheckboxColumn === true
        });
    }

    /**
     * Compute datatable th content class
     * @type {string}
     */
    get datatableTHContentClass() {
        return classSet('slds-cell_action-mode')
            .add('avonni-skeleton__variant-text')
            .add('avonni-skeleton__datatable-item')
            .add({
                'avonni-skeleton__animation-pulse': this.animation === 'pulse',
                'avonni-skeleton__datatable-animation-wave':
                    this.animation === 'wave'
            });
    }

    /**
     * Compute datatable th header class
     * @type {string}
     */
    get datatableTHHeaderClass() {
        return this.datatableTHClass
            .add('slds-border_right')
            .add('slds-border_left');
    }

    /**
     * Compute input class
     * @type {string}
     */
    get inputClass() {
        return classSet('slds-input')
            .add(`avonni-skeleton__animation-${this.animation}`)
            .add('avonni-skeleton__input');
    }

    /**
     * Compute input label class
     * @type {string}
     */
    get inputLabelClass() {
        return classSet('slds-list_horizontal').add(
            'avonni-skeleton__input-label'
        );
    }

    /**
     * Compute input label tag class
     * @type {string}
     */
    get inputLabelTagClass() {
        return classSet('avonni-skeleton__input-label-tag').add(
            `avonni-skeleton__animation-${this.animation}`
        );
    }

    /**
     * Compute input wrapper class
     * @type {string}
     */
    get inputWrapperClass() {
        return classSet('slds-form-element').add({
            'slds-form-element_horizontal':
                this.variantAttributes.variant === 'label-inline'
        });
    }

    /**
     * Compute paragraph line class
     * @type {string}
     */
    get paragraphLineClass() {
        return classSet('avonni-skeleton__variant-text')
            .add('slds-item')
            .add('avonni-skeleton__paragraph')
            .add(`avonni-skeleton__animation-${this.animation}`)
            .add()
            .toString();
    }

    /**
     * Compute avatar primary text class
     * @type {string}
     */
    get primaryAvatarTextClass() {
        return classSet('slds-m-bottom_xx-small')
            .add('avonni-skeleton__avatar-primary-text')
            .add('avonni-skeleton__variant-text')
            .add(`avonni-skeleton__animation-${this.animation}`);
    }

    /**
     * Compute progress indicator bar class
     * @type {string}
     */
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

    /**
     * Compute progress indicator item class
     * @type {string}
     */
    get progressIndicatorItemClass() {
        return classSet('slds-progress__marker').add({
            'avonni-skeleton__buttonIcon-animation-pulse':
                this.animation === 'pulse',
            'avonni-skeleton__progress-indicator-wave':
                this.animation === 'wave'
        });
    }

    /**
     * Compute progress indicator path class
     * @type {string}
     */
    get progressIndicatorPathClass() {
        return classSet('slds-path__item')
            .add(`avonni-skeleton__progress-indicator-path-${this.animation}`)
            .add(`avonni-skeleton__animation-${this.animation}`);
    }

    /**
     * Compute text, rectangular and circular class
     * @type {string}
     */
    get regularVariantsClass() {
        return classSet(`avonni-skeleton__variant-${this.variant}`).add(
            `avonni-skeleton__animation-${this.animation}`
        );
    }

    /**
     * Compute avatar secondary text class
     * @type {string}
     */
    get secondaryAvatarTextClass() {
        return classSet('slds-m-bottom_xx-small')
            .add('avonni-skeleton__avatar-secondary-text')
            .add('avonni-skeleton__variant-text')
            .add(`avonni-skeleton__animation-${this.animation}`);
    }

    /**
     * Compute tabset class
     * @type {string}
     */
    get tabClass() {
        return classSet(`avonni-skeleton_tabset-${this.animation}`);
    }

    /**
     * Compute tabset content class
     * @type {string}
     */
    get tabContentClass() {
        return classSet('avonni-skeleton__tabset-content')
            .add('avonni-skeleton__variant-text')
            .add(`avonni-skeleton__animation-${this.animation}`);
    }

    /**
     * Compute tabset item class
     * @type {string}
     */
    get tabItemClass() {
        return classSet('avonni-skeleton__variant-text')
            .add(`avonni-skeleton__animation-${this.animation}`)
            .add({
                'avonni-skeleton__tabset-item':
                    this.variantAttributes.variant === 'base',
                'avonni-skeleton__tabset-scoped-item':
                    this.variantAttributes.variant === 'scoped',
                'slds-m-around_medium':
                    this.variantAttributes.variant === 'scoped',
                'slds-tabs_scoped__link':
                    this.variantAttributes.variant === 'scoped',
                'slds-truncate': this.variantAttributes.variant === 'vertical',
                'avonni-skeleton__tabset-vertical-item':
                    this.variantAttributes.variant === 'vertical'
            });
    }

    /**
     * Compute avatar tertiary text class
     * @type {string}
     */
    get tertiaryAvatarTextClass() {
        return classSet('avonni-skeleton__avatar-tertiary-text')
            .add('avonni-skeleton__variant-text')
            .add(`avonni-skeleton__animation-${this.animation}`);
    }

    /**
     * Compute tree header class
     * @type {string}
     */
    get treeHeaderClass() {
        return classSet('slds-tree__group-header')
            .add('avonni-skeleton__tree-header')
            .add('avonni-skeleton__variant-text')
            .add(`avonni-skeleton__animation-${this.animation}`);
    }

    /**
     * Compute tree item class
     * @type {string}
     */
    get treeItemClass() {
        return classSet('slds-tree__item-label')
            .add('slds-truncate')
            .add('avonni-skeleton__tree-item')
            .add('avonni-skeleton__variant-text')
            .add(`avonni-skeleton__animation-${this.animation}`);
    }

    /*
     * ------------------------------------------------------------
     * PRIVATE METHODS
     * ------------------------------------------------------------
     */
    /**
     * Returns the avonni-skeleton DOM element
     * @returns {object} avonni-skeleton
     */
    get skeleton() {
        return this.template.querySelector(
            '[data-element-id="avonni-skeleton"]'
        );
    }

    /**
     * Calls related variant function to update variant
     */
    handleVariant() {
        if (
            this.isRegularVariant ||
            Object.keys(this.variantAttributes).length !== 0
        ) {
            switch (this.variant) {
                case 'badge':
                    this.updateVariantClassList('badge');
                    break;
                case 'button':
                    this.updateVariantClassList('button');
                    break;
                case 'button-icon':
                    this.updateVariantButtonIcon();
                    break;
                case 'chip':
                    this.updateVariantClassList('chip');
                    break;
                case 'combobox':
                    this.updateComboboxClassList();
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
    }

    /**
     * Initializes datatable rows
     */
    initializeDatatableRows() {
        const datatableRows = [];
        for (let i = 0; i < this.variantAttributes.rows; i++) {
            datatableRows.push({
                keyTr: `rowsTr-${i}`,
                keyTd: `rowsTd-${i}`,
                keyTh: `rowsTh-${i}`
            });
        }
        this.datatableRows = datatableRows;
    }

    /**
     * Initializes datatable columns
     */
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

    /**
     * Initializes paragraph items
     */
    initializeParagraphItems() {
        const paragraphItems = [];
        let id = 0;
        let temp;
        for (let i = 0; i < this.variantAttributes.rows; i++) {
            id++;
            for (let j = 100; j > 13; ) {
                id++;
                const width = Math.floor(Math.random() * (13 - 5)) + 5;
                paragraphItems.push({
                    key: `paragraph-${id}`,
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
        this.paragraphItems = paragraphItems;
    }

    /**
     * Initialized progress indicator items
     */
    initializeProgressItems() {
        const progressItems = [];
        for (let i = 0; i < this.variantAttributes.steps; i++) {
            progressItems.push({
                key: `panel-${i}`
            });
        }
        this.progressItems = progressItems;
    }

    /**
     * Initializes tabset
     */
    initializeTabset() {
        const tabsetItems = [];
        for (let i = 0; i < this.variantAttributes.tabs; i++) {
            tabsetItems.push({
                key: `tabset-${i}`
            });
        }
        this.tabset = tabsetItems;
    }

    /**
     * Initializes tree items
     */
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
        let element = this.skeleton;
        element.style.height =
            this.height === undefined ? '0.7em' : `${this.height}`;
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

    /**
     * Updates variant passed in parameter, may include button, chip or badge
     * @param {*} variant
     */
    updateVariantClassList(variant) {
        const variantElement = this.template.querySelector(
            `[data-element-id="avonni-skeleton-${variant}-wrapper"]`
        );
        const variantLabel = this.template.querySelector(
            `[data-element-id="avonni-skeleton-${variant}-label"]`
        );
        const variantAttributes = this.variantValues(variant).get(
            this.variantAttributes.variant
        );

        variantElement.style.setProperty(
            '--avonni-skeleton-color-background',
            variantAttributes.background
        );
        variantElement.style.setProperty(
            '--avonni-skeleton-color-background-animation',
            variantAttributes.backgroundAnimation
        );
        variantLabel.style.setProperty(
            '--avonni-skeleton-chip-label-background',
            variantAttributes.labelColor
        );
    }

    /**
     * updates button icon variant
     */
    updateVariantButtonIcon() {
        const buttonIconElement = this.template.querySelector(
            '[data-element-id="avonni-skeleton-button-icon"]'
        );
        const buttonIconVariantAttributes = BUTTON_ICON_VARIANT_VALUES.get(
            this.variantAttributes.variant
        );
        buttonIconElement.style.setProperty(
            '--avonni-skeleton-color-background',
            buttonIconVariantAttributes.background
        );
        buttonIconElement.style.setProperty(
            '--avonni-skeleton-color-background-animation',
            buttonIconVariantAttributes.backgroundAnimation
        );
    }

    /**
     * Updates combobox variant
     */
    updateComboboxClassList() {
        this.setTextSize();
    }

    /**
     * Updates paragraph variant
     */
    updateParagraphClassList() {
        const paragraphElementItems = this.template.querySelector(
            '[data-element-id="avonni-skeleton-paragraph-list"]'
        ).children;
        for (let i = 0; i < paragraphElementItems.length; i++) {
            paragraphElementItems[i].style.width = this.paragraphItems[i].width;
        }
    }

    /**
     * Gets the maps with the background, background animation and label colors for button, badge and chip variant
     * @param {*} variant
     * @returns {Map}
     */
    variantValues(variant) {
        let variantValues;
        switch (variant) {
            case 'badge':
                variantValues = BADGE_VARIANT_VALUES;
                break;
            case 'button':
                variantValues = BUTTON_VARIANT_VALUES;
                break;
            case 'chip':
                variantValues = CHIP_VARIANT_VALUES;
                break;
            default:
                break;
        }
        return variantValues;
    }
}
