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
    normalizeString,
    normalizeObject,
    deepCopy
} from 'c/utilsPrivate';
import { classSet, generateUUID } from 'c/utils';
import { AvonniResizeObserver } from 'c/resizeObserver';
import Item from './item';

const ICON_POSITIONS = {
    valid: ['left', 'right'],
    default: 'right'
};

const DIVIDER = {
    valid: ['top', 'bottom', 'around']
};

const DEFAULT_LOAD_MORE_OFFSET = 20;

const IMAGE_SIZE = {
    valid: ['small', 'medium', 'large'],
    default: 'large'
};

const IMAGE_CROP_FIT = {
    valid: ['cover', 'contain', 'fill', 'none'],
    default: 'cover'
};

const CROP_POSITION_DEFAULT = 50;

const VARIANTS = {
    valid: ['list', 'grid', 'single-line'],
    default: 'list'
};

const MEDIA_QUERY_BREAKPOINTS = {
    small: 480,
    medium: 768,
    large: 1024
};

const COLUMNS = { valid: [1, 2, 3, 4, 6, 12], default: 1 };

/**
 * @class
 * @storyId example-list--base
 * @description The List component allows to enumerate items in a vertical list form, in a grid form or in a paginated single-line form.
 * @descriptor avonni-list
 * @public
 */
export default class List extends LightningElement {
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
    _cols = 1;
    _smallContainerCols;
    _mediumContainerCols;
    _largeContainerCols;
    _enableInfiniteLoading = false;
    _items = [];
    _imageAttributes = {};
    _imageSrc = [];
    _isLoading = false;
    _loadMoreOffset = DEFAULT_LOAD_MORE_OFFSET;
    _sortable = false;
    _sortableIconPosition = ICON_POSITIONS.default;
    _variant = VARIANTS.default;

    _columnsSizes = {
        default: 1
    };
    _currentItemDraggedHeight;
    _currentColumnCount = 1;
    _hasActions = false;
    _initialY;
    _itemElements;
    _menuTop;
    _menuBottom;
    _savedComputedItems;
    _draggedElement;
    _draggedIndex;
    _hoveredIndex;
    _keyboardMoveIndex;
    computedActions = [];
    computedItems = [];
    hasImages;
    _resizeObserver;
    _scrollingInterval;
    _singleLinePage = 0;
    _singleLinePageFirstIndex;
    _scrollTop = 0;
    _previousScrollTop;
    _initialScrollHeight = 0;
    _restrictMotion = false;
    _dragging = false;
    _showSpinnerSpacer = false;
    _hideSpinnerSpacer = false;

    renderedCallback() {
        if (!this._resizeObserver && this._variant !== 'list') {
            this.initWrapObserver();
        }

        this.restoreScrollPosition();
        this.listResize();

        if ((this._dragging || this._keyboardDragged) && this._draggedElement) {
            this.recoverDraggedElement();
        }

        if (this.enableInfiniteLoading) {
            this._showSpinnerSpacer = true;
        }

        this._itemElements = Array.from(
            this.template.querySelectorAll('[data-element-id="li-item"]')
        );

        // To check if the bottom is reached without scrolling.
        window.requestAnimationFrame(() => {
            this.handleScroll();
        });
    }

    disconnectedCallback() {
        if (this._resizeObserver) {
            this._resizeObserver.disconnect();
            this._resizeObserver = undefined;
        }
    }

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
     * If present, you can load a subset of data and then display more when users scroll to the end of the list or reach the last page of items in a single-line variant.
     * Use with the loadmore event handler to retrieve more data.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get enableInfiniteLoading() {
        return this._enableInfiniteLoading;
    }
    set enableInfiniteLoading(value) {
        this._enableInfiniteLoading = normalizeBoolean(value);

        // When infinite loading is disabled, animate the spinner spacer to hide it.
        if (!this._enableInfiniteLoading) {
            setTimeout(() => {
                this._hideSpinnerSpacer = true;
            }, 500);
        }
    }

    /**
     * If true a loading animation is shown.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get isLoading() {
        return this._isLoading;
    }
    set isLoading(value) {
        this._isLoading = normalizeBoolean(value);
    }

    /**
     * Deprecated. Use 'size' attribute instead.
     *
     * @type {string}
     * @default large
     * @deprecated
     */
    @api
    get imageWidth() {
        return this._imageWidth;
    }

    set imageWidth(size) {
        this._imageAttributes.size = normalizeString(size, {
            fallbackValue: IMAGE_SIZE.default,
            validValues: IMAGE_SIZE.valid
        });
        console.warn(
            "'imageWidth' is deprecated. Use image attribute 'size' instead."
        );
    }

    /**
     * Image attributes: cropFit, position and size.
     *
     * @type {object}
     * @public
     */
    @api
    get imageAttributes() {
        return this._imageAttributes;
    }
    set imageAttributes(value) {
        const normalizedImgAttributes = normalizeObject(value);

        this._imageAttributes.size = normalizeString(
            normalizedImgAttributes.size,
            {
                fallbackValue: IMAGE_SIZE.default,
                validValues: IMAGE_SIZE.valid
            }
        );

        this._imageAttributes.cropPositionX = !isNaN(
            normalizedImgAttributes.cropPositionX
        )
            ? normalizedImgAttributes.cropPositionX
            : CROP_POSITION_DEFAULT;
        this._imageAttributes.cropPositionY = !isNaN(
            normalizedImgAttributes.cropPositionY
        )
            ? normalizedImgAttributes.cropPositionY
            : CROP_POSITION_DEFAULT;

        this._imageAttributes.cropFit = normalizeString(
            normalizedImgAttributes.cropFit,
            {
                fallbackValue: IMAGE_CROP_FIT.default,
                validValues: IMAGE_CROP_FIT.valid
            }
        );
    }

    /**
     * Default number of columns in the grid and single-line variants on smaller container widths. Valid values include 1, 2, 3, 4, 6 and 12.
     *
     * @type {number}
     * @public
     */
    @api
    get cols() {
        return this._cols;
    }
    set cols(value) {
        this._cols = this.normalizeColumns(value) || COLUMNS.default;
        this._columnsSizes.default = this._cols;
        this.listResize();
    }

    /**
     * Number of columns in the grid and single-line variants on small container widths. Valid values include 1, 2, 3, 4, 6 and 12.
     * @type {number}
     * @public
     */
    @api
    get smallContainerCols() {
        return this._smallContainerCols;
    }
    set smallContainerCols(value) {
        this._smallContainerCols = this.normalizeColumns(value);
        this._columnsSizes.small = this._smallContainerCols;
        this.listResize();
    }

    /**
     * Number of columns in the grid and single-line variants on medium container widths. Valid values include 1, 2, 3, 4, 6 and 12.
     *
     * @type {number}
     * @public
     */
    @api
    get mediumContainerCols() {
        return this._mediumContainerCols;
    }
    set mediumContainerCols(value) {
        this._mediumContainerCols = this.normalizeColumns(value);
        this._columnsSizes.medium = this._mediumContainerCols;
        this.listResize();
    }

    /**
     * Number of columns in the grid and single-line variants on large container widths and above. Valid values include 1, 2, 3, 4, 6 and 12.
     *
     * @type {number}
     * @public
     */
    @api
    get largeContainerCols() {
        return this._largeContainerCols;
    }
    set largeContainerCols(value) {
        this._largeContainerCols = this.normalizeColumns(value);
        this._columnsSizes.large = this._largeContainerCols;
        this.listResize();
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

        this.computedItems.forEach((item, index) => {
            this.computedItems[index] = new Item(item);
            this.computedItems[index].index = index;
        });

        this.hasImages = this.computedItems.some((item) => 'imageSrc' in item);
    }

    /**
     * Determines when to trigger infinite loading based on how many pixels the table's scroll position is from the bottom of the table.
     *
     * @type {Number}
     * @public
     * @default 20
     */
    @api
    get loadMoreOffset() {
        return this._loadMoreOffset;
    }

    set loadMoreOffset(value) {
        this._loadMoreOffset = Number.isNaN(parseInt(value, 10))
            ? DEFAULT_LOAD_MORE_OFFSET
            : parseInt(value, 10);
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

    /**
     * Variant to display the items as a grid, a single-line or a list. The list is the only variant that supports sorting. Default is list.
     *
     * @type {string}
     * @public
     * @default list
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
        this.computedItems.forEach((item) => {
            item.variant = this._variant;
        });
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Apply size classes to images. In list variant, the width is set. In grid variant, the height is set.
     */
    get computedImageClass() {
        return classSet('avonni-list__item-image-container').add({
            'avonni-list__item-image_small-width':
                this._imageAttributes.size === 'small' &&
                this._variant === 'list',
            'avonni-list__item-image_medium-width':
                this._imageAttributes.size === 'medium' &&
                this._variant === 'list',
            'avonni-list__item-image_large-width':
                this._imageAttributes.size === 'large' &&
                this._variant === 'list',
            'avonni-list__item-image_small-height':
                this._imageAttributes.size === 'small' &&
                (this._variant === 'grid' || this._variant === 'single-line'),
            'avonni-list__item-image_medium-height':
                this._imageAttributes.size === 'medium' &&
                (this._variant === 'grid' || this._variant === 'single-line'),
            'avonni-list__item-image_large-height':
                this._imageAttributes.size === 'large' &&
                (this._variant === 'grid' || this._variant === 'single-line')
        });
    }

    /**
     * Apply object fit classes to images.
     */
    get computedImageMediaClass() {
        return classSet('avonni-list__item-img').add({
            'avonni-list__item-image_object-fit-contain':
                this._imageAttributes.cropFit === 'contain',
            'avonni-list__item-image_object-fit-fill':
                this._imageAttributes.cropFit === 'fill',
            'avonni-list__item-image_object-fit-none':
                this._imageAttributes.cropFit === 'none'
        });
    }

    /**
     * The spacer provides a better scrolling experience.
     */
    get showSpinnerSpacer() {
        return (
            this._showSpinnerSpacer &&
            !this._isLoading &&
            this.variant !== 'single-line'
        );
    }

    /**
     * Apply object position style to images.
     */
    get computedImageStyle() {
        return `object-position: ${this._imageAttributes.cropPositionX}% ${this._imageAttributes.cropPositionY}%`;
    }

    /**
     * Query selector for the list container.
     */
    get listContainer() {
        return this.template.querySelector(
            '[data-element-id="list-container"]'
        );
    }

    /**
     * On single-line variant, do not apply height 100% to list container.
     */
    get computedListWrapperClass() {
        return classSet('slds-grid slds-grid_vertical-align-center').add({
            'avonni-list__list-full-height': this._variant !== 'single-line'
        });
    }

    /**
     * FirstAction is used when only 1 action is present in computedActions.
     *
     * @type {object}
     */
    get firstAction() {
        return this.computedActions[0];
    }

    get generateKey() {
        return generateUUID();
    }

    /**
     * Check whether Actions has multiple entries.
     *
     * @type {boolean}
     */
    get hasMultipleActions() {
        return this._actions.length > 1;
    }

    get hasActions() {
        if (!this._actions) {
            return false;
        }
        return this._actions.length > 0;
    }

    /**
     * Show the loading spinner at the end of the list.
     */
    get isLoadingBelow() {
        return (
            this.isLoading &&
            (this.variant === 'list' || this.variant === 'grid')
        );
    }

    /**
     * ARIA role of the items, if the list is sortable.
     *
     * @type {string|undefined}
     */
    get itemRole() {
        return this.sortable ? 'option' : undefined;
    }

    /**
     * ARIA role of the menu, if the list is sortable.
     *
     * @type {string|undefined}
     */
    get menuRole() {
        return this.sortable ? 'listbox' : undefined;
    }

    /**
     * Show media top or left depending on the variant.
     *
     * @type {boolean}
     */
    get mediaPosition() {
        return this.variant === 'grid' || this.variant === 'single-line'
            ? 'top'
            : 'left';
    }

    /**
     * Check if Icon is to be shown to the right.
     *
     * @type {boolean}
     */
    get showIconRight() {
        return (
            this.variant === 'list' &&
            this.sortable &&
            this.sortableIconName &&
            this.sortableIconPosition === 'right'
        );
    }

    /**
     * Check if Icon is to be shown to the left.
     *
     * @type {boolean}
     */
    get showIconLeft() {
        return (
            this.variant === 'list' &&
            !this.hasImages &&
            this.sortable &&
            !!this.sortableIconName &&
            this.sortableIconPosition === 'left'
        );
    }

    /**
     * Check if Icon is left of the image.
     *
     * @type {boolean}
     */
    get showImageIconLeft() {
        return (
            this.variant === 'list' &&
            this.hasImages &&
            this.sortable &&
            !!this.sortableIconName &&
            this.sortableIconPosition === 'left'
        );
    }

    /**
     * Items to be displayed in the list. On single-line lists, displayed items
     * are a portion of total computed items to display on a single page of item.
     *
     * @type {array}
     */
    get displayedItems() {
        if (this.variant === 'single-line') {
            // the first index is the first item to display
            const pageStart = this._currentColumnCount * this._singleLinePage;
            let pageItems = this.computedItems.slice(
                pageStart,
                this._currentColumnCount + pageStart
            );
            this._singleLinePageFirstIndex = pageStart;
            return pageItems;
        }
        return this.computedItems;
    }

    /**
     * On single-line variant, show pagination arrows.
     *
     * @type {boolean}
     */
    get showPaginationButtons() {
        return this.variant === 'single-line';
    }

    /**
     * On single-line variant, get the total number of pages.
     *
     * @type {number}
     */
    get totalPages() {
        return (
            Math.ceil(this.computedItems.length / this._currentColumnCount) || 1
        );
    }

    /**
     * On single-line variant, if there are items on the previous page, enable the previous page button.
     *
     * @type {boolean}
     */
    get previousPageDisabled() {
        return this._singleLinePage <= 0;
    }

    /**
     * On single-line variant, if there are items on the next page, enable the next page button.
     *
     * @type {boolean}
     */
    get nextPageDisabled() {
        return this._singleLinePage >= this.totalPages - 1;
    }

    /**
     * Check if Image is present and set the list class styling according to attributes.
     *
     * @type {string}
     */
    get computedListClass() {
        return classSet(
            'avonni-list__item-menu slds-grid slds-scrollable_y slds-is-relative slds-col'
        )
            .add({
                'slds-grid_vertical': this.variant === 'list',
                'avonni-list__grid-display':
                    this.variant === 'grid' || this.variant === 'single-line',
                'avonni-list__has-card-style': this.divider === 'around',
                'slds-has-dividers_top-space': this.divider === 'top',
                'slds-has-dividers_bottom-space': this.divider === 'bottom',
                'avonni-list__has-images': this.hasImages,
                'slds-grid_pull-padded-medium':
                    this.variant === 'grid' ||
                    (this.variant === 'single-line' &&
                        this.divider === 'around')
            })
            .toString();
    }

    /**
     * Computed item class styling based on user specified attributes.
     *
     * @type {string}
     */
    get computedItemClass() {
        return classSet()
            .add({
                'avonni-list__item-expanded': this._hasActions,
                'avonni-list__item-borderless': !this._divider,
                'avonni-list__item-card-style': this._divider === 'around'
            })
            .toString();
    }

    /**
     * Computed item class styling based on user specified attributes.
     *
     * @type {string}
     */
    get computedItemWrapperClass() {
        return classSet('avonni-list__item-wrapper avonni-list__item')
            .add({
                'avonni-list__item-sortable':
                    this.sortable && this.variant === 'list',
                'avonni-list__item-divider_top': this._divider === 'top',
                'avonni-list__item-divider_bottom': this._divider === 'bottom',
                'avonni-list__item-gutters': this.divider === 'around',
                'slds-col slds-size_12-of-12':
                    this._currentColumnCount === 1 &&
                    (this._variant === 'grid' ||
                        this._variant === 'single-line'),
                'slds-col slds-size_6-of-12':
                    this._currentColumnCount === 2 &&
                    (this._variant === 'grid' ||
                        this._variant === 'single-line'),
                'slds-col slds-size_4-of-12':
                    this._currentColumnCount === 3 &&
                    (this._variant === 'grid' ||
                        this._variant === 'single-line'),
                'slds-col slds-size_3-of-12':
                    this._currentColumnCount === 4 &&
                    (this._variant === 'grid' ||
                        this._variant === 'single-line'),
                'slds-col slds-size_2-of-12':
                    this._currentColumnCount === 6 &&
                    (this._variant === 'grid' ||
                        this._variant === 'single-line'),
                'slds-col slds-size_1-of-12':
                    this._currentColumnCount === 12 &&
                    (this._variant === 'grid' ||
                        this._variant === 'single-line')
            })
            .toString();
    }

    /**
     * Animate the spinner when loading more items.
     *
     * @type {string}
     */
    get computedSpinnerClass() {
        return classSet(
            'slds-col slds-size_12-of-12 avonni-list__lower-spinner-spacer'
        )
            .add({
                'hide-spinner-spacer': this._hideSpinnerSpacer
            })
            .toString();
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * If the items have been sorted by the user, reset the items to their original order.
     *
     * @public
     */
    @api
    reset() {
        this.clearSelection();
        this.computedItems = JSON.parse(JSON.stringify(this.items));
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Setup the screen resize observer. That counts the number of wrapped chips.
     *
     * @returns {AvonniResizeObserver} Resize observer.
     */
    initWrapObserver() {
        if (!this._resizeObserver) {
            const resizeObserver = new AvonniResizeObserver(() => {
                this.listResize();
            });
            resizeObserver.observe(this.listContainer);
            this._resizeObserver = resizeObserver;
        }
    }

    /**
     * Calculate the number of columns depending on the width of the list.
     */
    listResize() {
        if (this.variant === 'list') {
            return;
        }
        const previousColumnCount = this._currentColumnCount;
        if (!this.listContainer) {
            return;
        }
        const listWidth = this.listContainer.offsetWidth;

        let setSize = 'default';
        if (
            listWidth >= MEDIA_QUERY_BREAKPOINTS.large &&
            this._largeContainerCols > 0
        ) {
            setSize = 'large';
        } else if (
            listWidth >= MEDIA_QUERY_BREAKPOINTS.medium &&
            this._mediumContainerCols
        ) {
            setSize = 'medium';
        } else if (
            listWidth >= MEDIA_QUERY_BREAKPOINTS.small &&
            this._smallContainerCols
        ) {
            setSize = 'small';
        }

        // If this._currentColumnCount is set at each resize, it causes unnecessary rerenders.
        const calculatedColumns = this._columnsSizes[setSize];
        if (calculatedColumns !== this._currentColumnCount) {
            this._currentColumnCount = calculatedColumns;
        }

        // Go to page on which the page's first item appears.
        if (
            this.variant === 'single-line' &&
            previousColumnCount !== this._currentColumnCount
        ) {
            const firstItem = this.template.querySelector(
                '[data-element-id="li-item"]'
            );

            let firstIndex;
            if (firstItem) {
                firstIndex = parseInt(firstItem.dataset.index, 10);
            }
            if (!isNaN(firstIndex)) {
                this._singleLinePage = this.findNewPageOfItem(
                    firstIndex,
                    this._currentColumnCount
                );
            }
        }
    }

    findNewPageOfItem(index, columns) {
        let page = 0;
        for (let i = 0; i < this.computedItems.length; i += columns) {
            const chunk = this.computedItems.slice(i, i + columns);
            const chunkIndexes = [];
            chunk.forEach((item) => {
                chunkIndexes.push(item.index);
            });
            if (chunkIndexes.includes(index)) {
                return page;
            }
            page++;
        }
        return page;
    }

    /**
     * Only accept predetermined number of columns.
     *
     * @param {number} value
     * @returns {number}
     */
    normalizeColumns(value) {
        if (COLUMNS.valid.includes(value)) {
            return value;
        }
        return null;
    }

    /**
     * On single-line variant, go to the previous page of elements.
     */
    previousPage() {
        if (this._singleLinePage > 0) {
            this._singleLinePage--;
        }
    }

    /**
     * On single-line variant, go to the next page of elements. On next page load, check
     */
    nextPage() {
        window.requestAnimationFrame(() => {
            const pageStart = this._currentColumnCount * this._singleLinePage;
            let nextPageItems = this.computedItems.slice(
                this._currentColumnCount + pageStart,
                this._currentColumnCount * 2 + pageStart
            );
            if (nextPageItems.length === 0 && !this._isLoading) {
                this.handleLoadMore();
            }
        });

        if (this._singleLinePage < this.totalPages - 1) {
            this._singleLinePage++;
        }
    }

    /**
     * Determine scroll position to trigger loadmore and adjust dragged item position.
     */
    handleScroll() {
        if (this.variant === 'single-line') {
            return;
        }

        this._previousScrollTop = this._scrollTop;
        this._scrollTop = this.listContainer.scrollTop;
        this._initialY -= this._scrollTop - this._previousScrollTop;

        const offsetFromBottom =
            this.listContainer.scrollHeight -
            this.listContainer.scrollTop -
            this.listContainer.clientHeight;

        if (
            (offsetFromBottom <= this.loadMoreOffset && !this._isLoading) ||
            (this.listContainer.scrollTop === 0 &&
                this.listContainer.scrollHeight ===
                    this.listContainer.clientHeight &&
                !this._isLoading)
        ) {
            this.handleLoadMore();
        }
    }

    /**
     * Restore the scroll position when the list is rerendered. Needed when loading more items.
     */
    restoreScrollPosition() {
        const scrollTop = this.listContainer
            ? this.listContainer.scrollTop
            : null;

        if (scrollTop != null) {
            window.requestAnimationFrame(() => {
                this.listContainer.scrollTo(0, scrollTop);
            });
        }
    }

    /**
     * Update assistive text based on new item ordering.
     */
    updateAssistiveText() {
        const label = this.computedItems[this._draggedIndex].label;
        const position = this._draggedIndex + 1;
        const total = this.computedItems.length;
        const element = this.template.querySelector(
            '.slds-assistive-text[aria-live="assertive"]'
        );
        // We don't use a variable to avoid rerendering
        element.textContent = `${label}. ${position} / ${total}`;
    }

    /**
     * Get the item the cursor has entered.
     *
     * @param {number} cursorY
     * @returns {object} item
     */
    getHoveredItem(cursorY) {
        return this._itemElements.find((item) => {
            if (item !== this._draggedElement) {
                const itemIndex = Number(item.dataset.index);
                const itemPosition = item.getBoundingClientRect();
                const hoverTop = itemPosition.top + 10;
                const hoverBottom = itemPosition.bottom - 10;

                // keep the current hovered item and don't set to null if hovering a gap.
                if (
                    cursorY > hoverTop &&
                    cursorY < hoverBottom &&
                    itemIndex != null
                ) {
                    if (item.dataset.elementTempIndex != null) {
                        this._hoveredIndex = parseInt(
                            item.dataset.elementTempIndex,
                            10
                        );
                    } else {
                        this._hoveredIndex = itemIndex;
                    }
                    return item;
                }
            }
            return undefined;
        });
    }

    /**
     * Apply transform style to hovered item and items inbetween.
     *
     * @param {HTMLElement} hoveredItem
     */
    animateHoveredItem(hoveredItem) {
        const hoveredIndex = this._hoveredIndex;
        const draggedIndex = this._draggedIndex;
        const hoveredElementIndex = parseInt(hoveredItem.dataset.index, 10);
        const tempHoveredIndex = parseInt(
            hoveredItem.dataset.elementTempIndex,
            10
        );

        // This breaks when the transform is animated with css because the item remains hovered for
        // a few milliseconds, reversing the animation unpredictably.
        if (
            hoveredItem.classList.contains('avonni-list__item-sortable_moved')
        ) {
            hoveredItem.classList.remove('avonni-list__item-sortable_moved');
            hoveredItem.style.transform = 'translateY(0px)';
            hoveredItem.dataset.elementTempIndex = hoveredElementIndex;
        } else if (
            draggedIndex > hoveredIndex ||
            tempHoveredIndex > hoveredIndex
        ) {
            hoveredItem.classList.add('avonni-list__item-sortable_moved');
            hoveredItem.style.transform = `translateY(${this._currentItemDraggedHeight}px)`;
            hoveredItem.dataset.elementTempIndex = tempHoveredIndex + 1;
        } else if (
            draggedIndex < hoveredIndex ||
            tempHoveredIndex < hoveredIndex
        ) {
            hoveredItem.classList.add('avonni-list__item-sortable_moved');
            hoveredItem.style.transform = `translateY(-${this._currentItemDraggedHeight}px)`;
            hoveredItem.dataset.elementTempIndex = tempHoveredIndex - 1;
        }

        // Get all items in between the dragged and hovered.
        const itemsBetween = this._itemElements.filter((item) => {
            const itemIndex = Number(item.dataset.index);
            if (
                (itemIndex > draggedIndex && itemIndex < hoveredIndex) ||
                (itemIndex < draggedIndex && itemIndex > hoveredIndex)
            ) {
                if (
                    !item.classList.contains('avonni-list__item-sortable_moved')
                ) {
                    return item;
                }
            }
            return undefined;
        });

        if (itemsBetween.length > 0) {
            if (draggedIndex > hoveredIndex) {
                itemsBetween.forEach((item) => {
                    const tempIndex = parseInt(
                        item.dataset.elementTempIndex,
                        10
                    );
                    item.classList.add('avonni-list__item-sortable_moved');
                    item.style.transform = `translateY(${this._currentItemDraggedHeight}px)`;
                    item.dataset.elementTempIndex = tempIndex + 1;
                });
            } else if (draggedIndex < hoveredIndex) {
                itemsBetween.forEach((item) => {
                    const tempIndex = parseInt(
                        item.dataset.elementTempIndex,
                        10
                    );
                    item.classList.add('avonni-list__item-sortable_moved');
                    item.style.transform = `translateY(-${this._currentItemDraggedHeight}px)`;
                    item.dataset.elementTempIndex = tempIndex - 1;
                });
            }
        }
    }

    /**
     * Remove transform style and class from all itmes.
     */
    resetItemsAnimations() {
        this._itemElements.forEach((item) => {
            if (item.classList.contains('avonni-list__item-sortable_moved')) {
                item.classList.remove('avonni-list__item-sortable_moved');
                item.style.transform = 'translateY(0px)';
            }
        });
    }

    /**
     * Compute swap between dragged items.
     *
     * @param {number} hoveredIndex
     * @param {number} draggedIndex
     */
    switchWithItem(draggedIndex, hoveredIndex) {
        const draggedItem = this.computedItems.splice(draggedIndex, 1)[0];
        this.computedItems.splice(hoveredIndex, 0, draggedItem);

        // Update indexes
        this.computedItems.forEach((item, index) => {
            item.index = index;
        });

        this.computedItems = [...this.computedItems];
        this.resetItemsAnimations();
        this.updateAssistiveText();
    }

    /**
     * Erase the list styles and dataset - clear tracked variables.
     */
    clearSelection() {
        // Clean the styles and dataset
        this._itemElements.forEach((item, index) => {
            item.style = undefined;
            item.dataset.index = index;
            item.dataset.elementTempIndex = index;
            item.className = item.className.replace(
                /avonni-list__item-sortable_moved.*/g,
                ''
            );
            item.className = item.className.replace(
                /.avonni-list__item-sortable_keyboard-moved.*/g,
                ''
            );
        });
        if (this._draggedElement) {
            this._draggedElement.classList.remove(
                'avonni-list__item-sortable_dragged'
            );
        }

        this.template.querySelector(
            '.slds-assistive-text[aria-live="assertive"]'
        ).textContent = '';

        // Clean the tracked variables
        this._draggedElement =
            this._draggedIndex =
            this._hoveredIndex =
            this._initialY =
            this._savedComputedItems =
                null;
    }

    /**
     * Get initial list menu position and initial Y position on user interaction.
     *
     * @param {Event} event
     */
    initPositions(event) {
        let menuPosition;
        if (this.listContainer) {
            menuPosition = this.listContainer.getBoundingClientRect();
        }
        this._menuTop = menuPosition.top;
        this._menuBottom = menuPosition.bottom;
        this._initialScrollHeight = this.listContainer.scrollHeight;

        this._initialY =
            event.type === 'touchstart'
                ? event.touches[0].clientY
                : event.clientY;
    }

    /**
     * Prevent ghost image on avatar drag.
     *
     * @param {Event} event
     */
    handleAvatarDragStart(event) {
        event.preventDefault();
    }

    /**
     * Compute drag event start element positions and indexes // Prevent certain elements from being dragged.
     *
     * @param {Event} event
     */
    dragStart(event) {
        if (event.button === 0) {
            const index = Number(event.currentTarget.dataset.index);
            const item = this.computedItems[index];

            /**
             * The event fired when the mouse is pressed on an item.
             *
             * @event
             * @name itemmousedown
             * @param {object} item Item clicked.
             * @param {string} name Name of the item clicked.
             * @public
             * @bubbles
             */
            this.dispatchEvent(
                new CustomEvent('itemmousedown', {
                    detail: {
                        item: deepCopy(item),
                        name: item.name
                    },
                    bubbles: true
                })
            );
        }

        if (this._keyboardDragged) {
            this._keyboardDragged = false;
            return;
        }

        // Stop dragging if the click was on a button menu
        if (
            !this.sortable ||
            event.target.tagName.startsWith('LIGHTNING-BUTTON') ||
            event.target.tagName.startsWith('A')
        ) {
            return;
        }

        this._itemElements = Array.from(
            this.template.querySelectorAll('[data-element-id="li-item"]')
        );

        this._draggedElement = event.currentTarget;
        this._currentItemDraggedHeight = this.computeItemHeight(
            event.currentTarget
        );

        this._draggedIndex = Number(this._draggedElement.dataset.index);
        this._initialDraggedIndex = this._draggedIndex;

        if (event.type !== 'keydown') {
            this.initPositions(event);
        } else {
            this._savedComputedItems = [...this.computedItems];
        }

        this.updateAssistiveText();

        if (event.type === 'touchstart') {
            // Make sure touch events don't trigger mouse events
            event.preventDefault();
            // Close any open button menu
            this._draggedElement.focus();
        }
    }

    /**
     * Calculate the height of an item, including the row gap.
     * @param {HTMLElement} item
     */
    computeItemHeight(itemElement) {
        let rowGap;
        if (this.listContainer) {
            rowGap = parseInt(
                getComputedStyle(this.listContainer).rowGap.split('px')[0],
                10
            );
        }

        return itemElement.offsetHeight + (rowGap || 0);
    }

    /**
     * After a rerender, recover the element being dragged and keep it.
     */
    recoverDraggedElement() {
        this._draggedElement = this.template.querySelector(
            `[data-index="${this._initialDraggedIndex}"]`
        );
        this._draggedIndex = this._initialDraggedIndex;

        if (this._dragging) {
            this.animateItems(this._currentY);
            this._initialScrollHeight = this.listContainer.scrollHeight;
        }
        if (this._keyboardDragged && this._draggedElement) {
            this._draggedElement.focus();
            this.restoreItemsTransform(
                this._draggedIndex,
                this._keyboardMoveIndex
            );
        }
    }

    /**
     * Compute drag event logic.
     *
     * @param {Event} event
     */
    drag(event) {
        if (!this._draggedElement || this._keyboardDragged) {
            return;
        }

        this._dragging = true;
        this._draggedElement.classList.add(
            'avonni-list__item-sortable_dragged'
        );

        const mouseY =
            event.type === 'touchmove'
                ? event.touches[0].clientY
                : event.clientY;
        const menuTop = this._menuTop;
        const menuBottom = this._menuBottom;

        // Make sure it is not possible to drag the item out of the menu
        let currentY;
        if (mouseY < menuTop) {
            currentY = menuTop;
        } else if (mouseY > menuBottom) {
            currentY = menuBottom;
        } else {
            currentY = mouseY;
        }
        this._currentY = currentY;

        if (!this._scrollStep) {
            // Stick the dragged item to the mouse position
            this.animateItems(currentY);
        }

        const buttonMenu = event.currentTarget.querySelector(
            '[data-element-id="lightning-button-menu"]'
        );
        if (buttonMenu) {
            buttonMenu.classList.remove('slds-is-open');
        }

        this.stopPropagation(event);
        this.autoScroll(currentY);
    }

    /**
     * Process the animation of the dragged item, and the hovered items.
     *
     * @param {number} currentY
     */
    animateItems(currentY) {
        if (currentY && this._draggedElement) {
            this._draggedElement.style.transform = `translate( 0px, ${
                currentY - this._initialY
            }px)`;

            const hoveredItem = this.getHoveredItem(currentY);
            if (hoveredItem) {
                this.animateHoveredItem(hoveredItem);
            }
        }
    }

    /**
     * Compute whether to scroll up, down or none.
     *
     * @param {number} currentY
     * @return {string}
     */
    computeScrollStep(currentY) {
        let scrollStep = 0;

        const closeToTop =
            currentY - this.listContainer.getBoundingClientRect().top < 50;
        const closeToBottom =
            this.listContainer.getBoundingClientRect().bottom - currentY < 50;
        const scrolledTop = this.listContainer.scrollTop === 0;
        const scrolledBottom =
            this.listContainer.scrollHeight - this.listContainer.scrollTop ===
            this.listContainer.clientHeight;

        if (closeToTop) {
            scrollStep = -5;
        } else if (closeToBottom) {
            scrollStep = 5;
        }

        if ((scrolledTop && closeToTop) || (scrolledBottom && closeToBottom)) {
            scrollStep = 0;
        }

        this._scrollStep = scrollStep;
    }

    /**
     * Scroll when an item is dragged near the top or bottom of the list.
     *
     * @param {number} currentY
     */
    autoScroll(currentY) {
        this.computeScrollStep(currentY);

        if (!this._scrollingInterval && this._draggedElement) {
            this._scrollingInterval = window.setInterval(() => {
                const overflowY =
                    this.listContainer.scrollHeight > this._initialScrollHeight;

                if (!overflowY) {
                    this.listContainer.scrollBy(0, this._scrollStep);

                    this.animateItems(currentY);

                    this._restrictMotion = true;
                    window.requestAnimationFrame(() => {
                        this._restrictMotion = false;
                    });
                }
            }, 20);
        }

        if (this._scrollStep === 0) {
            window.clearInterval(this._scrollingInterval);
            this._scrollingInterval = null;
        }
    }

    /**
     * When dragging is finished, reorder items or reset the list.
     *
     * @param {Event} event
     */
    dragEnd(event) {
        window.clearInterval(this._scrollingInterval);
        this._scrollingInterval = null;
        this._dragging = false;

        if (this._draggedIndex === null) {
            return;
        }
        if (event && event.button === 0) {
            const index = Number(event.currentTarget.dataset.index);
            const item = this.computedItems[index];

            /**
             * The event fired when the mouse is released on an item.
             *
             * @event
             * @name itemmouseup
             * @param {object} item Item clicked.
             * @param {string} name Name of the item clicked.
             * @public
             * @bubbles
             */
            this.dispatchEvent(
                new CustomEvent('itemmouseup', {
                    detail: {
                        item: deepCopy(item),
                        name: item.name
                    },
                    bubbles: true
                })
            );
        }

        if (!this._draggedElement) {
            return;
        }

        if (this._draggedIndex != null && this._hoveredIndex != null) {
            this.switchWithItem(this._draggedIndex, this._hoveredIndex);
        }
        const orderHasChanged = this._itemElements.some((item) => {
            return (
                Number(item.dataset.index) !==
                Number(item.dataset.elementTempIndex)
            );
        });

        if (orderHasChanged) {
            this.computedItems = [...this.computedItems];
            /**
             * The event fired when a user reordered the items.
             *
             * @event
             * @name reorder
             * @param {object} items The items in their new order.
             * @public
             */
            this.dispatchEvent(
                new CustomEvent('reorder', {
                    detail: {
                        items: this.computedItems
                    }
                })
            );
        }

        this.clearSelection();
    }

    /**
     * Handle a key pressed on an item.
     *
     * @param {Event} event
     */
    handleKeyDown(event) {
        if (this.variant === 'grid') {
            return;
        }
        // If space bar is pressed, select or drop the item
        if (event.key === 'Enter') {
            this.handleItemClick(event);
        } else if (
            (this.sortable && event.key === ' ') ||
            event.key === 'Spacebar'
        ) {
            event.preventDefault();
            if (this._draggedElement) {
                this.dragEnd();
                this._keyboardDragged = false;
            } else {
                this.dragStart(event);
                this._keyboardDragged = true;
            }
        } else if (this.sortable && this._draggedElement) {
            if (event.key === 'Escape' || event.key === 'Esc') {
                this.clearSelection();
            }

            // If up/down arrow is pressed, move the item
            const index = Number(event.currentTarget.dataset.elementTempIndex);
            let targetIndex;

            if (
                event.key === 'ArrowDown' &&
                index + 1 < this.computedItems.length
            ) {
                targetIndex = index + 1;
            } else if (event.key === 'ArrowUp') {
                targetIndex = index - 1;
            }

            if (targetIndex != null) {
                const targetItem = this._itemElements.find(
                    (item) =>
                        Number(item.dataset.elementTempIndex) === targetIndex
                );

                if (event.currentTarget && targetItem) {
                    event.preventDefault();
                    this.accessMoveItem(event.currentTarget, targetItem);
                }
            }
        }
    }

    /**
     * In the case the user loses control of the dragged element, clicking anywhere will reset the list.
     */
    handleListClick() {
        if (this._draggedElement) {
            this.clearSelection();
        }
    }

    /**
     * Handle moving elements with the keyboard.
     *
     * @param {HTMLElement} currentItem
     * @param {HTMLElement} targetItem
     */
    accessMoveItem(currentItem, targetItem) {
        this._keyboardDragged = true;
        const currentIndex = Number(currentItem.dataset.elementTempIndex);
        const targetIndex = Number(targetItem.dataset.elementTempIndex);
        const currentItemHeight = this.computeItemHeight(currentItem);
        const targetItemHeight = this.computeItemHeight(targetItem);

        this._draggedElement = currentItem;
        this._hoveredIndex = targetIndex;

        // const matrix = new DOMMatrixReadOnly(currentItem.style.transform);
        // const currentItemYTransform = matrix.f;

        let currentItemYTransform = currentItem.style.transform.match(
            /translateY\((-?\d+(?:\.\d*)?)px/
        );
        if (currentItemYTransform) {
            currentItemYTransform = parseInt(currentItemYTransform[1], 10) || 0;
        }

        if (currentIndex < targetIndex) {
            currentItem.style.transform = `translateY(${
                currentItemYTransform + targetItemHeight
            }px)`;
            targetItem.style.transform = `translateY(${-currentItemHeight}px)`;
            this.listContainer.scrollBy(0, currentItemHeight);
            this.checkKeyboardMoved(targetItem);
        } else if (currentIndex > targetIndex) {
            currentItem.style.transform = `translateY(${
                currentItemYTransform - targetItemHeight
            }px)`;
            targetItem.style.transform = `translateY(${currentItemHeight}px)`;
            this.listContainer.scrollBy(0, -currentItemHeight);
            this.checkKeyboardMoved(targetItem);
        }

        // currentIndex;;

        targetItem.dataset.elementTempIndex = currentIndex;
        currentItem.dataset.elementTempIndex = targetIndex;

        this._keyboardMoveIndex = targetIndex;
    }

    restoreItemsTransform(draggedIndex, targetIndex) {
        window.requestAnimationFrame(() => {
            const draggedItem = this._itemElements.find(
                (item) => Number(item.dataset.index) === draggedIndex
            );
            const draggedItemHeight = this.computeItemHeight(draggedItem);
            // get all items between dragged index and target index
            const itemsBetween = this._itemElements.filter(
                (item) =>
                    Number(item.dataset.index) > draggedIndex &&
                    Number(item.dataset.index) <= targetIndex
            );
            let draggedItemTransform = 0;
            console.log('👩‍👩‍👦‍👦', itemsBetween);
            itemsBetween.forEach((item) => {
                draggedItemTransform += this.computeItemHeight(item);
                item.style.transform = `translateY(${-draggedItemHeight}px)`;
                item.classList.add('avonni-list__item-sortable_keyboard-moved');
                item.dataset.elementTempIndex = Number(item.dataset.index) - 1;
            });
            console.log(draggedItemTransform, draggedItemHeight);
            draggedItem.style.transform = `translateY(${draggedItemTransform}px)`;
        });
    }

    checkKeyboardMoved(targetItem) {
        if (
            targetItem.classList.contains(
                'avonni-list__item-sortable_keyboard-moved'
            )
        ) {
            targetItem.classList.remove(
                'avonni-list__item-sortable_keyboard-moved'
            );
            targetItem.style.transform = `translateY(0px)`;
        } else {
            targetItem.classList.add(
                'avonni-list__item-sortable_keyboard-moved'
            );
        }
    }

    /**
     * Handles a click on an item action.
     *
     * @param {Event} event
     */
    handleActionClick(event) {
        const actionName = this.hasMultipleActions
            ? event.detail.value
            : event.target.value;
        const itemIndex = event.currentTarget.dataset.itemIndex;

        /**
         * The event fired when a user clicks on an action.
         *
         * @event
         * @name actionclick
         * @param {string} name  Name of the action clicked.
         * @param {object} item Item clicked.
         * @param {string} targetName Name of the item.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: {
                    name: actionName,
                    item: this.computedItems[itemIndex],
                    targetName: this.computedItems[itemIndex].name
                }
            })
        );
    }

    /**
     * Handles a click on an item.
     * The click event will not dispatch an event if the clicked element already has a purpose (action or link).
     *
     * @param {Event} event
     */
    handleItemClick(event) {
        if (
            event.target.tagName.startsWith('LIGHTNING') ||
            event.target.tagName === 'A'
        ) {
            return;
        }

        /**
         * The event fired when a user clicks on an item.
         *
         * @event
         * @name itemclick
         * @param {object}  item Item clicked.
         * @param {DOMRect} bounds The size and position of the item in the viewport.
         * @param {string}  name Name of the clicked item.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('itemclick', {
                detail: {
                    item: this.computedItems[event.currentTarget.dataset.index],
                    bounds: event.currentTarget.getBoundingClientRect(),
                    name: this.computedItems[event.currentTarget.dataset.index]
                        .name
                }
            })
        );
    }

    /**
     * Dispatch loadmore event.
     */
    handleLoadMore() {
        if (this.enableInfiniteLoading) {
            /**
             * The event fired when the end of the list is reached.
             *
             * @event
             * @name loadmore
             * @public
             */
            this.dispatchEvent(new CustomEvent('loadmore'));
        }
    }

    /**
     * Stop the propagation of an event.
     *
     * @param {Event} event
     */
    stopPropagation(event) {
        event.stopPropagation();
    }
}
