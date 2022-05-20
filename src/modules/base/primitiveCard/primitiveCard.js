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
import {
    normalizeArray,
    normalizeBoolean,
    normalizeString
} from 'c/utilsPrivate';
import verticalCard from './verticalCard.html';
import horizontalCard from './horizontalCard.html';
import { classSet } from '../utils/classSet';

const ICON_POSITIONS = {
    valid: ['left', 'right'],
    default: 'right'
};

const DIVIDER = {
    valid: ['top', 'bottom', 'around']
};

// const DEFAULT_ITEM_HEIGHT = 44;

const IMAGE_WIDTH = {
    valid: ['small', 'medium', 'large'],
    default: 'large'
};

const VARIANTS = {
    valid: ['vertical', 'horizontal'],
    default: 'horizontal'
};

export default class PrimitiveCard extends LightningElement {
    render() {
        if (this._variant === 'horizontal') {
            return horizontalCard;
        }
        return verticalCard;
    }

    /**
     * Variant of vertical or horizontal
     *
     * @type {string}
     * @public
     * @default 'list'
     */
    @api
    get variant() {
        return this._variant;
    }

    set variant(value) {
        this._variant = normalizeString(value, {
            fallbackValue: VARIANTS.default,
            validValues: VARIANTS.valid
        });
    }
    /**
     * Alternative text used to describe the list. If the list is sortable, it should describe its behavior, for example: “Sortable menu. Press spacebar to grab or drop an item. Press up and down arrow keys to change position. Press escape to cancel.”
     *
     * @type {string}
     * @public
     */
    @api alternativeText;
    /**
     * Text label for the list.
     *
     * @type {string}
     * @public
     */
    @api label;
    /**
     * The Lightning Design System name of the sortable icon. Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed.
     *
     * @type {string}
     * @public
     */
    @api sortableIconName;

    _actions = [];
    _divider;
    _imageWidth = IMAGE_WIDTH.default;
    _items = [];
    _sortable = false;
    _sortableIconPosition = ICON_POSITIONS.default;

    _draggedIndex;
    _draggedElement;
    _initialY;
    _menuTop;
    _menuBottom;
    _itemElements;
    _savedComputedItems;
    _currentItemDraggedHeight;
    _hasActions = false;
    _imageSrc = [];
    computedActions = [];
    computedItems = [];
    _hasImages;
    _variant;
    isCard = true;
    isFlatCard = true;

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Array of action objects.
     *
     * @type {object}
     * @public
     */
    @api
    get actions() {
        return this._actions;
    }
    set actions(proxy) {
        this._actions = normalizeArray(proxy);
        this.computedActions = JSON.parse(JSON.stringify(this._actions));
        this._hasActions = true;
    }

    /**
     * Position of the item divider. Valid valus include top, bottom and around.
     *
     * @type {string}
     * @public
     */
    @api
    get divider() {
        return this._divider;
    }
    set divider(value) {
        this._divider = normalizeString(value, {
            validValues: DIVIDER.valid
        });
    }

    /**
     * Width of the item images. Valid values include small, medium and large.
     *
     * @type {string}
     * @public
     * @default large
     */
    @api
    get imageWidth() {
        return this._imageWidth;
    }

    set imageWidth(width) {
        this._imageWidth = normalizeString(width, {
            validValues: IMAGE_WIDTH.valid,
            defaultValue: IMAGE_WIDTH.default
        });
    }

    /**
     * Array of item objects.
     *
     * @type {object[]}
     * @public
     */
    @api
    get items() {
        return this._items;
    }
    set items(proxy) {
        this._items = normalizeArray(proxy, 'object');
        this.computedItems = JSON.parse(JSON.stringify(this._items));
        this.computedItems.forEach((item) => {
            item.infos = normalizeArray(item.infos);
            item.icons = normalizeArray(item.icons);
        });
    }

    /**
     * If true, it will be possible to reorder the list items.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get sortable() {
        return this._sortable;
    }
    set sortable(bool) {
        this._sortable = normalizeBoolean(bool);
    }

    /**
     * Position of the sortable icon. Valid values include left and right.
     *
     * @type {string}
     * @public
     * @default right
     */
    @api
    get sortableIconPosition() {
        return this._sortableIconPosition;
    }
    set sortableIconPosition(value) {
        this._sortableIconPosition = normalizeString(value, {
            fallbackValue: ICON_POSITIONS.default,
            validValues: ICON_POSITIONS.valid
        });
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Computed item class styling based on user specified attributes.
     *
     * @type {string}
     */
    get computedItemClass() {
        return classSet('slds-grid avonni-list__item slds-item')
            .add({
                'slds-card': this.isCard,
                'avonni-card__no-shadow': this.isFlatCard,
                'avonni-card__sortable': this.sortable,
                'avonni-card__expanded': this._hasActions,
                // add padding if you want it, not because there's no divider?
                // 'slds-p-vertical_x-small': !this._divider,
                'avonni-card__divider_top': this._divider === 'top',
                'avonni-card__divider_bottom': this._divider === 'bottom',
                'avonni-card__divider_around': this._divider === 'around'
            })
            .toString();
    }
}
