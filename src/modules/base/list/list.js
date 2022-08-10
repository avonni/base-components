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
    deepCopy
} from 'c/utilsPrivate';
import { classSet, generateUUID } from 'c/utils';
import { AvonniResizeObserver } from 'c/resizeObserver';

const ICON_POSITIONS = {
    valid: ['left', 'right'],
    default: 'right'
};

const DIVIDER = {
    valid: ['top', 'bottom', 'around']
};

const DEFAULT_ITEM_HEIGHT = 44;

const DEFAULT_LOAD_MORE_OFFSET = 20;

const IMAGE_SIZE = {
    valid: ['small', 'medium', 'large'],
    default: 'large'
};

const IMAGE_CROP_FIT = {
    valid: ['cover', 'contain', 'fill', 'none'],
    default: 'cover'
};

const VARIANTS = {
    valid: ['list', 'grid', 'single-line'],
    default: 'list'
};

const MEDIA_QUERY_BREAKPOINTS = {
    small: 480,
    medium: 768,
    large: 1024
};

/**
 * @class
 * @storyId example-list--base
 * @description The List component allows for a user to enumerate a vertical list with items.
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
    _items = [];
    _sortable = false;
    _sortableIconPosition = ICON_POSITIONS.default;
    _imageSize = IMAGE_SIZE.default;
    _imageCropFit = IMAGE_CROP_FIT.default;
    _imageAttributes;
    _enableInfiniteLoading = false;
    _draggedIndex;
    _draggedElement;
    _initialX;
    _initialY;
    _menuTop;
    _menuBottom;
    _itemElements;
    _savedComputedItems;
    _hoveredItem;
    _currentItemDraggedHeight;
    _currentItemDraggedWidth;
    _hasActions = false;
    _imageSrc = [];
    computedActions = [];
    computedItems = [];
    hasImages;
    _variant = VARIANTS.default;
    showMediaDragIcon = true;
    showPlaceholder = false;
    hoveredPositionTopLeft;
    draggedItemDimensions;

    _loadMoreOffset = DEFAULT_LOAD_MORE_OFFSET;

    _columns;
    _smallContainerCols;
    _mediumContainerCols;
    _largeContainerCols;
    _effectiveColumnCount;
    _savedScrollTop;

    _resizeObserver;
    _isLoading = false;
    _scrollingInterval;

    _singleLinePage = 0;
    _scrollTop;
    _previousScrollTop;
    _isLastItemVisible;
    _preventDragEnd = false;
    _initialScrollHeight = 0;

    renderNumber = 0;
    renderedCallback() {
        if (this.renderNumber === 0) {
            this.initWrapObserver();
            this.renderNumber++;
        }
        setTimeout(() => {
            this.handleScroll();
        }, 0);

        console.log('🏁');

        this.listResize();
        this.saveScrollPosition();
        this.restoreScrollPosition();
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
     * If present, you can load a subset of data and then display more
when users scroll to the end of the list.
Use with the onloadmore event handler to retrieve more data.
     *
     * @type {boolean}
     * @public
     */
    @api
    get enableInfiniteLoading() {
        return this._enableInfiniteLoading;
    }

    set enableInfiniteLoading(value) {
        this._enableInfiniteLoading = normalizeBoolean(value);
    }

    /**
     * If true a loading animation is shown.
     *
     * @type {boolean}
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
        this._imageSize = normalizeString(size, {
            validValues: IMAGE_SIZE.valid,
            defaultValue: IMAGE_SIZE.default
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
        if (!value) {
            return;
        }

        if (value.size) {
            this._imageSize = normalizeString(value.size, {
                validValues: IMAGE_SIZE.valid,
                defaultValue: IMAGE_SIZE.default
            });
        }

        this._imagePositionY =
            value.cropPositionY !== null ? value.cropPositionY : 50;
        this._imagePositionX =
            value.cropPositionX !== null ? value.cropPositionX : 50;

        if (value.cropFit) {
            this._imageCropFit = normalizeString(value.cropFit, {
                validValues: IMAGE_CROP_FIT.valid,
                defaultValue: IMAGE_CROP_FIT.default
            });
        }
    }

    /**
     * Number of columns in the grid.
     *
     * @type {number}
     * @public
     */
    @api
    get cols() {
        return this._columns;
    }
    set cols(value) {
        this._columns = this.normalizeColumns(value);
    }

    /**
     * Number of columns for small grid container.
     * @type {number}
     * @public
     */
    @api
    get smallContainerCols() {
        return this._smallContainerCols;
    }
    set smallContainerCols(value) {
        this._smallContainerCols = this.normalizeColumns(value);
    }

    /**
     * Number of columns for medium grid container.
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
    }

    /**
     * Number of columns for large grid container.
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
            item.infos = normalizeArray(item.infos);
            item.icons = normalizeArray(item.icons);
            item.label = normalizeString(item.label + ':' + index);
        });
    }

    /**
     * Determines when to trigger infinite loading based on how many pixels the table's scroll position is from the bottom of the table. The default is 20.
     *
     * @type {Number}
     * @public
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
     * Variant to display as grid or list. Default is list.
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
                this._imageSize === 'small' && this._variant === 'list',
            'avonni-list__item-image_medium-width':
                this._imageSize === 'medium' && this._variant === 'list',
            'avonni-list__item-image_large-width':
                this._imageSize === 'large' && this._variant === 'list',
            'avonni-list__item-image_small-height':
                this._imageSize === 'small' &&
                (this._variant === 'grid' || this._variant === 'single-line'),
            'avonni-list__item-image_medium-height':
                this._imageSize === 'medium' &&
                (this._variant === 'grid' || this._variant === 'single-line'),
            'avonni-list__item-image_large-height':
                this._imageSize === 'large' &&
                (this._variant === 'grid' || this._variant === 'single-line')
        });
    }

    /**
     * Apply object fit classes to images.
     */
    get computedImageMediaClass() {
        return classSet('avonni-list__item-img').add({
            'avonni-list__item-image_object-fit-contain':
                this._imageCropFit === 'contain',
            'avonni-list__item-image_object-fit-fill':
                this._imageCropFit === 'fill',
            'avonni-list__item-image_object-fit-none':
                this._imageCropFit === 'none'
        });
    }

    /**
     * Apply object position style to images.
     */
    get computedImageStyle() {
        return `object-position: ${this._imagePositionX}% ${this._imagePositionY}%`;
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

    get showBottomSpinnerSpacer() {
        return (
            this._enableInfiniteLoading &&
            !this.isLoadingBelow &&
            this.variant !== 'single-line'
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
     * are a portion of total computed items.
     *
     * @type {array}
     * @private
     */
    get displayedItems() {
        if (
            this.variant === 'single-line' &&
            this._effectiveColumnCount !== null
        ) {
            const pageStart = this._effectiveColumnCount * this._singleLinePage;
            let pageItems = this.computedItems.slice(
                pageStart,
                this._effectiveColumnCount + pageStart
            );
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
            Math.ceil(this.computedItems.length / this._effectiveColumnCount) ||
            1
        );
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
            const pageStart = this._effectiveColumnCount * this._singleLinePage;
            let nextPageItems = this.computedItems.slice(
                this._effectiveColumnCount + pageStart,
                this._effectiveColumnCount * 2 + pageStart
            );
            if (
                nextPageItems.length === 0 &&
                !this._isLoading &&
                this.renderNumber !== 0
            ) {
                this.handleLoadMore();
            }
        });

        if (this._singleLinePage < this.totalPages - 1) {
            this._singleLinePage++;
        }
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
        if (
            this.computedItems.length > 0 &&
            Object.keys(...this.computedItems).includes('imageSrc')
        ) {
            this.hasImages = true;
        }
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
                    this._effectiveColumnCount === 1 &&
                    (this._variant === 'grid' ||
                        this._variant === 'single-line'),
                'slds-col slds-size_6-of-12':
                    this._effectiveColumnCount === 2 &&
                    (this._variant === 'grid' ||
                        this._variant === 'single-line'),
                'slds-col slds-size_4-of-12':
                    this._effectiveColumnCount === 3 &&
                    (this._variant === 'grid' ||
                        this._variant === 'single-line'),
                'slds-col slds-size_3-of-12':
                    this._effectiveColumnCount === 4 &&
                    (this._variant === 'grid' ||
                        this._variant === 'single-line'),
                'slds-col slds-size_2-of-12':
                    this._effectiveColumnCount === 6 &&
                    (this._variant === 'grid' ||
                        this._variant === 'single-line'),
                'slds-col slds-size_1-of-12':
                    this._effectiveColumnCount === 12 &&
                    (this._variant === 'grid' ||
                        this._variant === 'single-line')
            })
            .toString();
    }

    /**
     * On items with images, show actions in card media-action slot.
     *
     * @type {boolean}
     */
    get showMediaAction() {
        return (
            (this.variant === 'grid' || this.variant === 'single-line') &&
            this.hasImages &&
            this.actions.length > 0
        );
    }

    /**
     * Show actions on the right.
     *
     * @type {boolean}
     */
    get showActionRight() {
        return this.variant === 'list' && this.actions.length > 0;
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
     * @private
     */
    listResize() {
        const previousCols = this._effectiveColumnCount;
        if (!this.listContainer) {
            return;
        }
        const listWidth = this.listContainer.offsetWidth;
        if (!listWidth) {
            return;
        }

        // defaults to cols value
        let calculatedColumns = this._columns;

        if (
            listWidth > MEDIA_QUERY_BREAKPOINTS.small &&
            this._smallContainerCols > 0
        ) {
            calculatedColumns = this._smallContainerCols;
        }
        if (
            listWidth > MEDIA_QUERY_BREAKPOINTS.medium &&
            this._mediumContainerCols > 0
        ) {
            calculatedColumns = this._mediumContainerCols;
        }
        if (
            listWidth > MEDIA_QUERY_BREAKPOINTS.large &&
            this._largeContainerCols > 0
        ) {
            calculatedColumns = this._largeContainerCols;
        }

        if (calculatedColumns !== this._effectiveColumnCount) {
            this._effectiveColumnCount = calculatedColumns;
        }

        // go back to first page in single line view
        if (previousCols !== this._effectiveColumnCount) {
            this._singleLinePage = 0;
        }
    }

    /**
     * Only accept predetermined number of columns.
     * @private
     * @param {number} cols
     * @returns {number}
     */
    normalizeColumns(cols) {
        let _value = cols;
        if (typeof cols === 'string') {
            _value = parseInt(cols, 10);
        }
        if (
            _value === 1 ||
            _value === 2 ||
            _value === 3 ||
            _value === 4 ||
            _value === 6 ||
            _value === 12
        ) {
            return _value;
        }
        return null;
    }

    /**
     * Determine scroll position to trigger loadmore and adjust dragged item position.
     * @private
     */
    handleScroll() {
        if (this.variant === 'single-line') {
            return;
        }

        this._previousScrollTop = this._scrollTop;
        this._scrollTop = this.listContainer.scrollTop;
        const scrollDelta = this._scrollTop - this._previousScrollTop;

        setTimeout(() => {
            this._initialY -= scrollDelta;
        }, 0);

        const offsetFromBottom =
            this.listContainer.scrollHeight -
            this.listContainer.scrollTop -
            this.listContainer.clientHeight;

        console.log('🛼', this._scrollTop);

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
     * Restore the scroll position from the top of the list.
     * @private
     */
    restoreScrollPosition() {
        if (this._savedScrollTop === null) {
            return;
        }
        window.requestAnimationFrame(() => {
            this.listContainer.scrollTo(0, this._savedScrollTop);
            console.log('🛑', this._savedScrollTop);
        });
    }

    /**
     * Record the scroll position from the top of the list.
     * @private
     */
    saveScrollPosition() {
        this._savedScrollTop = this.listContainer
            ? this.listContainer.scrollTop
            : null;

        console.log('💾', this._savedScrollTop);
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
     * Compute hovered items center coordinates for ordering.
     *
     * @param {number} center
     * @returns {object} item
     */
    getHoveredItem(center) {
        return this._itemElements.find((item) => {
            if (item !== this._draggedElement) {
                const itemIndex = Number(item.dataset.index);
                const itemPosition = item.getBoundingClientRect();
                const itemCenter =
                    itemPosition.bottom - itemPosition.height / 2;

                if (
                    (this._draggedIndex > itemIndex && center < itemCenter) ||
                    (this._draggedIndex < itemIndex && center > itemCenter)
                ) {
                    return item;
                }
            }
            return undefined;
        });
    }

    /**
     * Compute swap between dragged items.
     *
     * @param {Element} target
     */
    switchWithItem(target) {
        const targetIndex = Number(target.dataset.index);
        const index = this._draggedIndex;
        target.classList.add('avonni-list__item-sortable_moved');

        // If the target has already been moved, move it back to its original position
        // Else, move it up or down
        if (target.style.transform !== '') {
            target.style.transform = '';
        } else {
            const translationValue =
                targetIndex > index
                    ? -this._currentItemDraggedHeight
                    : this._currentItemDraggedHeight;
            window.requestAnimationFrame(() => {
                target.style.transform = `translateY(${
                    translationValue + 'px'
                })`;
            });
        }

        // Make the switch in computed items
        [this.computedItems[targetIndex], this.computedItems[index]] = [
            this.computedItems[index],
            this.computedItems[targetIndex]
        ];

        this._draggedIndex = targetIndex;
        this._draggedElement.dataset.index = targetIndex;
        target.dataset.index = index;
        this.updateAssistiveText();
    }

    /**
     * Erase the list styles and dataset - clear tracked variables.
     */
    clearSelection() {
        console.log('❌ clearSelection');
        // Clean the styles and dataset
        this._itemElements.forEach((item, index) => {
            item.style = undefined;
            item.dataset.position = 0;
            item.dataset.index = index;
            item.className = item.className.replace(
                /avonni-list__item-sortable_moved.*/g,
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
            this._initialY =
            this._savedComputedItems =
                undefined;
    }

    /**
     * Get initial list menu position and initial Y position on user interaction.
     *
     * @param {Event} event
     */
    initPositions(event) {
        const menuPosition = this.template
            .querySelector('.avonni-list__item-menu')
            .getBoundingClientRect();
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

        // Stop dragging if the click was on a button menu
        if (
            !this.sortable ||
            event.target.tagName.startsWith('LIGHTNING-BUTTON') ||
            event.target.tagName.startsWith('A')
        ) {
            return;
        }

        this._itemElements = Array.from(
            this.template.querySelectorAll('.avonni-list__item-sortable')
        );
        this._draggedElement = event.currentTarget;
        this._currentItemDraggedHeight = this._draggedElement.offsetHeight;
        this._draggedIndex = Number(this._draggedElement.dataset.index);

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
     * Compute drag event logic.
     *
     * @param {Event} event
     */
    drag(event) {
        if (!this._draggedElement) {
            return;
        }
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

        // Stick the dragged item to the mouse position
        this._draggedElement.style.transform = `translate( 0px, ${
            currentY - this._initialY
        }px)`;

        const hoveredItem = this.getHoveredItem(currentY);
        if (hoveredItem) {
            this.switchWithItem(hoveredItem);
        }

        const buttonMenu = event.currentTarget.querySelector(
            '[data-element-id="lightning-button-menu"]'
        );
        if (buttonMenu) {
            buttonMenu.classList.remove('slds-is-open');
        }

        this.autoScroll(currentY);
    }

    autoScroll(currentY) {
        let scrollStep = 0;

        const closeToTop =
            currentY - this.listContainer.getBoundingClientRect().top < 50;
        const closeToBottom =
            this.listContainer.getBoundingClientRect().bottom - currentY < 50;
        const scrolledTop = this.listContainer.scrollTop === 0;
        const scrolledBottom =
            this.listContainer.scrollHeight - this.listContainer.scrollTop ===
            this.listContainer.clientHeight;

        scrollStep = closeToTop ? -5 : closeToBottom ? 5 : 0;

        if ((scrolledTop && closeToTop) || (scrolledBottom && closeToBottom)) {
            scrollStep = 0;
        }

        if (!this._scrollingInterval && this._draggedElement) {
            this._scrollingInterval = window.setInterval(() => {
                const overflowY =
                    this.listContainer.scrollHeight > this._initialScrollHeight;

                if (!overflowY) {
                    this.listContainer.scrollBy(0, scrollStep);

                    // Also animate the dragged item because otherwise it only moves
                    // when the mouse moves.
                    this._draggedElement.style.transform = `translate( 0px, ${
                        currentY - this._initialY
                    }px)`;

                    const hoveredItem = this.getHoveredItem(currentY);
                    if (hoveredItem) {
                        this.switchWithItem(hoveredItem);
                    }
                }
            }, 20);
        }

        if (scrollStep === 0) {
            window.clearInterval(this._scrollingInterval);
            this._scrollingInterval = null;
        }
    }

    dragEnd(event) {
        if (this._preventDragEnd) {
            return;
        }
        console.log('🛑 dragEnd', event);
        window.clearInterval(this._scrollingInterval);
        this._scrollingInterval = null;
        // event.button is not reliable on touch devices
        // finding hovered
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

        const orderHasChanged = this._itemElements.some((item, index) => {
            return Number(item.dataset.index) !== index;
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
        // If space bar is pressed, select or drop the item
        if (event.key === 'Enter') {
            this.handleItemClick(event);
        } else if (
            (this.sortable && event.key === ' ') ||
            event.key === 'Spacebar'
        ) {
            if (this._draggedElement) {
                this.dragEnd();
            } else {
                this.dragStart(event);
            }
        } else if (this.sortable && this._draggedElement) {
            // If escape is pressed, cancel the move
            if (event.key === 'Escape' || event.key === 'Esc') {
                this.computedItems = [...this._savedComputedItems];
                this.clearSelection();
            }

            // If up/down arrow is pressed, move the item
            const index = Number(event.currentTarget.dataset.index);
            let targetIndex;

            if (
                event.key === 'ArrowDown' &&
                index + 1 < this.computedItems.length
            ) {
                targetIndex = index + 1;
            } else if (event.key === 'ArrowUp') {
                targetIndex = index - 1;
            }

            if (targetIndex >= 0) {
                const targetItem = this._itemElements.find(
                    (item) => Number(item.dataset.index) === targetIndex
                );

                this.switchWithItem(targetItem);

                // Move the dragged element
                const currentPosition = Number(
                    this._draggedElement.dataset.position
                );
                const position =
                    targetIndex > index
                        ? currentPosition + DEFAULT_ITEM_HEIGHT
                        : currentPosition - DEFAULT_ITEM_HEIGHT;

                this._draggedElement.style.transform = `translateY(${position}px)`;
                this._draggedElement.dataset.position = position;
            }
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
