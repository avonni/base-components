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
import { normalizeBoolean } from '../utilsPrivate/normalize';

const ANIMATION_VARIANTS = {
    valid: ['pulse', 'wave']
};

const AVATAR_SIZES = {
    valid: [
        'xx-small',
        'x-small',
        'small',
        'medium',
        'large',
        'x-large',
        'xx-large'
    ],
    default: 'medium'
};

const AVATAR_VARIANTS = {
    valid: ['circle', 'square'],
    default: 'square'
};

const SKELETON_VARIANTS = {
    valid: [
        'avatar',
        'badge',
        'breadcrumbs',
        'button',
        'button-icon',
        'circular',
        'combobox',
        'datatable',
        'input',
        'paragraph',
        'path',
        'pill',
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
    /**
     * Primary text to display, usually the name of the person.
     *
     * @public
     * @type {string}
     */
    @api primaryText;
    /**
     * Secondary text to display, usually the role of the user.
     *
     * @public
     * @type {string}
     */
    @api secondaryText;
    /**
     * Tertiary text to display, usually the status of the user. The tertiary text will only be shown when using size x-large and xx-large.
     *
     * @public
     * @type {string}
     */
    @api tertiaryText;

    _animation;
    _avatarSize = AVATAR_SIZES.default;
    _avatarVariant = AVATAR_VARIANTS.default;
    _height;
    _hideAvatarDetails = false;
    _avatarDetails = [];
    _variant = SKELETON_VARIANTS.default;
    _width;

    _waveVariant;
    _initialAvatarRender = false;

    avatarWrapperClass;
    avatarClass;

    connectedCallback() {
        this.updateAvatarClassList();
    }

    renderedCallback() {
        if (!this.isAvatarVariant) this.setSkeletonSize();
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
    get avatarSize() {
        return this._avatarSize;
    }

    set avatarSize(value) {
        this._avatarSize = normalizeString(value, {
            fallbackValue: AVATAR_SIZES.default,
            validValues: AVATAR_SIZES.valid
        });
        this.updateAvatarClassList();
    }

    @api
    get avatarVariant() {
        return this._avatarVariant;
    }

    set avatarVariant(value) {
        this._avatarVariant = normalizeString(value, {
            fallbackValue: AVATAR_VARIANTS.default,
            validValues: AVATAR_VARIANTS.valid
        });
        this.updateAvatarClassList();
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
     * Hide primary, secondary and tertiary text.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get hideAvatarDetails() {
        return this._hideAvatarDetails;
    }

    set hideAvatarDetails(value) {
        this._hideAvatarDetails = normalizeBoolean(value);
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

    /**
     * Switch case to call the appropriate sizing function. Variants include: text, rectangular, circular.
     */
    setSkeletonSize() {
        switch (this.variant) {
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

    handleVariant() {
        switch (this.alternativeVariant) {
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
                this.handleAvatarVariant();
                break;
            case 'button-icon':
                this.handleAvatarVariant();
                break;
            case 'combobox':
                this.handleCombobox();
                break;
            case 'datatable':
                this.handleDatable();
                break;
            default:
                break;
        }
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

    updateAvatarClassList() {
        const wrapperClass = classSet('')
            .add('slds-avatar')
            // .add(`avonni-avatar_${this.avatarVariant}`)
            .add({
                'avonni-avatar_xx-small': this.avatarSize === 'xx-small',
                'slds-avatar_x-small': this.avatarSize === 'x-small',
                'slds-avatar_small': this.avatarSize === 'small',
                'slds-avatar_medium': this.avatarSize === 'medium',
                'slds-avatar_large': this.avatarSize === 'large',
                'avonni-avatar_x-large': this.avatarSize === 'x-large',
                'avonni-avatar_xx-large': this.avatarSize === 'xx-large',
                'slds-avatar_circle': this.avatarVariant === 'circle'
            });

        this.avatarWrapperClass = wrapperClass;
    }
}
