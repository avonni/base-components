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
import { normalizeBoolean, normalizeString } from 'c/utilsPrivate';

const CHIP_VARIANTS = {
    valid: [
        'alt-inverse',
        'base',
        'brand',
        'error',
        'info',
        'inverse',
        'offline',
        'success',
        'warning'
    ],
    default: 'base'
};

const MEDIA_POSITION = {
    valid: ['left', 'right'],
    default: 'left'
};

const ICON_SIZES = {
    valid: ['xx-small', 'x-small', 'small', 'medium', 'large'],
    default: 'x-small'
};

const AVATAR_SIZES = {
    valid: ['xx-small', 'x-small', 'small', 'medium', 'large'],
    default: 'x-small'
};

const DEFAULT_ICON_NAME = 'utility:check';

export default class PrimitiveChip extends LightningElement {
    _label = '';
    _outline = false;
    _variant = CHIP_VARIANTS.default;
    _avatar = null;
    _avatarSize = AVATAR_SIZES.default;
    _mediaPosition = MEDIA_POSITION.default;
    _iconName = DEFAULT_ICON_NAME;
    _iconSize = ICON_SIZES.default;
    _showIcon = false;

    /**
     * Label displayed in the chip.
     *
     * @public
     * @type {string}
     */
    @api
    get label() {
        return this._label;
    }
    set label(value) {
        this._label = value;
    }

    /**
     * If true, display an outline style button.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get outline() {
        return this._outline;
    }
    set outline(hasOutline) {
        this._outline = normalizeBoolean(hasOutline);
    }

    /**
     * The variant changes the appearance of the chip. Accepted variants include base, brand, inverse, alt-inverse, success, info, warning, error, offline.
     *
     * @public
     * @type {string}
     * @default base
     */
    @api
    get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: CHIP_VARIANTS.default,
            validValues: CHIP_VARIANTS.valid
        });
    }

    /**
     *  The avatar to display. Set to null by default
     *  @public
     *  @type {Object}
     *  @default null
     */
    @api
    get avatar() {
        return this._avatar;
    }
    set avatar(value) {
        this._avatar = value;
    }

    /**
     *  The position of the media to display. Can be set to 'left' or 'right'. Left by default.
     *  @public
     *  @type {string}
     *  @default left
     */
    @api
    get mediaPosition() {
        return this._mediaPosition;
    }
    set mediaPosition(position) {
        this._mediaPosition = normalizeString(position, {
            fallbackValue: MEDIA_POSITION.default,
            validValues: MEDIA_POSITION.valid
        });
    }

    /** The size of the avatar to display. Values range from 'xx-small' to 'large'
     *  @public
     *  @type {string}
     *  @default x-small
     */
    @api
    get avatarSize() {
        return this._avatarSize;
    }

    set avatarSize(value) {
        this._avatarSize = normalizeString(value, {
            fallbackValue: AVATAR_SIZES.default,
            validValues: AVATAR_SIZES.valid
        });
    }

    /** The name of the icon to display.
     *  @public
     *  @type {string}
     *  @default x-small
     */
    @api
    get iconName() {
        return this._iconName;
    }
    set iconName(value) {
        if (value) {
            this._iconName = this._iconName = normalizeString(value, {
                fallbackValue: DEFAULT_ICON_NAME
            });
            this._showIcon = true;
        }
    }

    /** The size of the icon to display. Values range from 'xx-small' to 'large'
     *  @public
     *  @type {string}
     *  @default x-small
     */
    @api
    get iconSize() {
        return this._iconSize;
    }

    set iconSize(value) {
        this._iconSize = normalizeString(value, {
            fallbackValue: ICON_SIZES.default,
            validValues: ICON_SIZES.valid
        });
    }

    /**
     *  If icon media is to be shown.
     */
    get showIcon() {
        return this._showIcon;
    }

    /**
     *  Returns true if avatar is left, if not, returns false.
     */
    get showMediaLeft() {
        return this.mediaPosition !== 'right';
    }
}
