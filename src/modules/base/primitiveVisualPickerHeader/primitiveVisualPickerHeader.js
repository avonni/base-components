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
import { classSet } from 'c/utils';
import { normalizeObject, normalizeString } from 'c/utilsPrivate';

const AVATAR_POSITIONS = {
    valid: [
        'left',
        'right',
        'top',
        'bottom',
        'center',
        'content-left',
        'content-right'
    ],
    default: 'left'
};

const VISUAL_PICKER_SIZES = {
    valid: ['small', 'medium', 'large', 'x-large', 'xx-large', 'responsive'],
    default: 'medium'
};

export default class PrimitiveVisualPickerHeader extends LightningElement {
    /**
     * The alternative text used to describe the avatar, which is displayed as hover text on the image.
     *
     * @type {string}
     */
    @api alternativeText;
    /**
     * The title can include text and is displayed inside the figure.
     *
     * @type {string}
     */
    @api title;
    /**
     * The description can include text and is displayed inside the figure.
     *
     * @type {string}
     */
    @api description;
    @api descriptionClass;
    @api hideAvatarTopBottom = false;
    @api hideTitle = false;
    @api hideDescription = false;

    _avatar = {};
    _avatarPosition = AVATAR_POSITIONS.default;
    // _displayAvatar = DEFAULT_DISPLAY_AVATAR;
    _size = VISUAL_PICKER_SIZES.default;

    /**
     * An object with item fields to be rendered as an avatar.
     *
     * @type {object}
     */
    @api
    get avatar() {
        return this._avatar;
    }
    set avatar(avatar) {
        this._avatar = normalizeObject(avatar);
    }

    /**
     * If present, sets the position of the avatar. Valid values include top, bottom, center, right and left. The value defaults to left.
     *
     * @type {string}
     */
    @api
    get avatarPosition() {
        return this._avatarPosition;
    }
    set avatarPosition(position) {
        this._avatarPosition = normalizeString(position, {
            fallbackValue: AVATAR_POSITIONS.default,
            validValues: AVATAR_POSITIONS.valid
        });
    }

    /**
     * The size of the items. Valid values include xx-small (4rem x 4 rem), x-small (6rem x 6 rem), small (8rem x 8rem), medium (12rem x 12rem), large (15rem x 15rem), x-large (18rem x 18rem), xx-large (21rem x 21rem) and responsive. Only avatar appears when x-small and xx-small.
     *
     * @type {string}
     */
    @api
    get size() {
        return this._size;
    }
    set size(size) {
        this._size = normalizeString(size, {
            fallbackValue: VISUAL_PICKER_SIZES.default,
            validValues: VISUAL_PICKER_SIZES.valid
        });
    }

    /**
     * Verify if avatar position is next to text content and should display avatar.
     *
     * @type {boolean}
     */
    get avatarIsHorizontal() {
        return (
            !this.hideTitle &&
            (this._avatarPosition === 'content-left' ||
                this._avatarPosition === 'content-right')
        );
    }

    /**
     * Verify if avatar position is top and should display avatar.
     *
     * @type {boolean}
     */
    get avatarIsTop() {
        return !this.hideAvatarTopBottom && this._avatarPosition === 'top';
    }

    /**
     * Verify if avatar position is bottom and should display avatar.
     *
     * @type {boolean}
     */
    get avatarIsBottom() {
        return (
            !this.hideAvatarTopBottom &&
            (this._avatarPosition === 'bottom' ||
                this._avatarPosition === 'center' ||
                !this.isBiggerThanXSmall ||
                (this._avatarPosition !== 'bottom' &&
                    this._avatarPosition !== 'top' &&
                    this.hideTitle))
        );
    }

    /**
     * Computed container class styling.
     *
     * @type {string}
     */
    get computedContainerClass() {
        return classSet('avonni-visual-picker__figure-header')
            .add({
                'avonni-visual-picker__figure-header-container':
                    this.avatarIsHorizontal,
                'avonni-visual-picker__figure-header-container-horizontal':
                    this.avatarPosition === 'content-left',
                'avonni-visual-picker__figure-header-container-horizontal-reverse':
                    this.avatarPosition === 'content-right'
            })
            .toString();
    }

    get computedDescriptionClass() {
        const descriptionClass = this.descriptionClass || '';
        return classSet(
            `avonni-visual-picker__figure-description ${descriptionClass}`
        ).toString();
    }

    /**
     * Verify if the title should display avatar.
     *
     * @type {boolean}
     */
    get displayTitleAvatar() {
        return (
            this._avatarPosition === 'right' || this._avatarPosition === 'left'
        );
    }

    /**
     * Verify if size is bigger than x-small.
     *
     * @type {boolean}
     */
    get isBiggerThanXSmall() {
        return !(this.size === 'x-small' || this.size === 'xx-small');
    }
}
