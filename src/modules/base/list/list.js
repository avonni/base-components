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

const ICON_POSITIONS = {
    valid: ['left', 'right'],
    default: 'right'
};

const DIVIDER = {
    valid: ['top', 'bottom', 'around']
};

const DEFAULT_ITEM_HEIGHT = 44;

const IMAGE_WIDTH = {
    valid: ['small', 'medium', 'large'],
    default: 'large'
};

const VARIANTS = {
    valid: ['list', 'grid'],
    default: 'list'
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
    _imageWidth = IMAGE_WIDTH.default;
    _items = [];
    _sortable = false;
    _sortableIconPosition = ICON_POSITIONS.default;

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
    _variant;
    showMediaDragIcon = true;
    showPlaceholder = false;
    hoveredPositionTopLeft;
    draggedItemDimensions;

    renderedCallback() {
        console.log('renderedCallback', this._draggedElement);
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

    /**
     * Variant to display as grid or list. Default is list.
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

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Computed Image container style width defined by user selected image width.
     *
     * @type {string}
     */
    get computedImageContainerStyle() {
        return `
            width : ${this.computedImageWidth}px;
            min-width : ${this.computedImageWidth}px;
        `;
    }

    /**
     * Computed image width in pixels.
     *
     * @type {number}
     * @default 128
     */
    get computedImageWidth() {
        switch (this.imageWidth) {
            case 'small':
                return 48;
            case 'medium':
                return 72;
            default:
                return 128;
        }
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
     * Check if Icon is to be shown to the right.
     *
     * @type {boolean}
     */
    get showIconRight() {
        return (
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
            this.sortable &&
            this.sortableIconName &&
            this.sortableIconPosition === 'left' &&
            !this.showImageIconLeft
        );
    }

    /**
     * Check if Icon is left of the image.
     *
     * @type {boolean}
     */
    get showImageIconLeft() {
        return (
            this.hasImages &&
            this.sortable &&
            this.sortableIconName &&
            this.sortableIconPosition === 'left'
        );
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
        return classSet('avonni-list__item-menu slds-grid')
            .add({
                'slds-grid_vertical': this.variant === 'list',
                'avonni-list__grid-display': this.variant === 'grid',
                'avonni-list__has-card-style': this.divider === 'around',
                'slds-has-dividers_top-space': this.divider === 'top',
                'slds-has-dividers_bottom-space': this.divider === 'bottom',
                'avonni-list__has-images': this.hasImages
            })
            .toString();
    }

    /**
     * Computed Image container class styling based on icon position and divider attributes.
     *
     * @type {string}
     */
    get computedImageContainerClass() {
        return classSet('avonni-list__item-image-container')
            .add({
                'avonni-list__item-image-container_rounded-corners':
                    this.divider === 'around' &&
                    this.sortableIconName &&
                    this.sortableIconPosition === 'right'
            })
            .toString();
    }

    /**
     * Computed item class styling based on user specified attributes.
     *
     * @type {string}
     */
    get computedItemClass() {
        return classSet('avonni-list__item')
            .add({
                'avonni-list__item-sortable': this.sortable,
                'avonni-list__item-expanded': this._hasActions,
                'avonni-list__item-borderless': !this._divider,
                'avonni-list__item-divider_top': this._divider === 'top',
                'avonni-list__item-divider_bottom': this._divider === 'bottom',
                'avonni-list__item-card-style': this._divider === 'around',
                'slds-col slds-size_4-of-12': this.variant === 'grid'
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
     * @param {DOMElement} center
     * @returns {object} item
     */
    getHoveredItem(draggedItem) {
        return this._itemElements.find((item) => {
            if (item !== draggedItem) {
                const itemIndex = Number(item.dataset.index);
                const draggedItemIndex = Number(draggedItem.dataset.index);
                const itemPosition = item.getBoundingClientRect();
                const draggedPosition = draggedItem.getBoundingClientRect();

                const draggedTopLeft = {
                    x: draggedPosition.top,
                    y: draggedPosition.left
                };
                const draggedBottomRight = {
                    x: draggedPosition.bottom,
                    y: draggedPosition.right
                };
                const itemTopLeft = {
                    x: itemPosition.top,
                    y: itemPosition.left
                };
                const itemBottomRight = {
                    x: itemPosition.bottom,
                    y: itemPosition.right
                };

                if (
                    // check if items have thickness
                    !(
                        draggedTopLeft.x === draggedBottomRight.x ||
                        draggedTopLeft.y === draggedBottomRight.y ||
                        itemTopLeft.x === itemBottomRight.x ||
                        itemTopLeft.y === itemBottomRight.y
                    ) &&
                    // check if they dont overlap in the x-axis
                    !(
                        draggedTopLeft.x > itemBottomRight.x ||
                        draggedBottomRight.x < itemTopLeft.x
                    ) &&
                    // check if the dont overlap in the y-axis
                    !(
                        draggedTopLeft.y > itemBottomRight.y ||
                        draggedBottomRight.y < itemTopLeft.y
                    )
                ) {
                    // get overlap area
                    const draggedItemArea =
                        draggedPosition.width * draggedPosition.height;
                    const hoveredItemArea =
                        itemPosition.width * itemPosition.height;
                    let overlapArea = 0;

                    // overlap top left
                    if (
                        draggedTopLeft.x < itemTopLeft.x &&
                        draggedTopLeft.y < itemTopLeft.y
                    ) {
                        overlapArea =
                            (draggedBottomRight.x - itemTopLeft.x) *
                            (draggedBottomRight.y - itemTopLeft.y);
                    }

                    // overlap top right
                    if (
                        draggedTopLeft.y < itemTopLeft.y &&
                        draggedBottomRight.x > itemBottomRight.x
                    ) {
                        overlapArea =
                            (itemBottomRight.x - draggedTopLeft.x) *
                            (draggedBottomRight.y - itemTopLeft.y);
                    }

                    // overlap bottom right
                    if (
                        draggedBottomRight.x > itemBottomRight.x &&
                        draggedBottomRight.y > itemBottomRight.y
                    ) {
                        overlapArea =
                            (itemBottomRight.x - draggedTopLeft.x) *
                            (itemBottomRight.y - draggedTopLeft.y);
                    }

                    // overlap bottom left
                    if (
                        draggedTopLeft.x < itemTopLeft.x &&
                        draggedBottomRight.y > itemBottomRight.y
                    ) {
                        overlapArea =
                            (draggedBottomRight.x - itemTopLeft.x) *
                            (itemBottomRight.y - draggedTopLeft.y);
                    }

                    // detect if overlap reaches 50% of the dragged area
                    if (
                        overlapArea / draggedItemArea > 0.5 ||
                        overlapArea / hoveredItemArea > 0.5
                    ) {
                        this.hoveredPositionTopLeft = itemTopLeft;
                        this.draggedItemDimensions = {
                            width: draggedPosition.width,
                            height: draggedPosition.height
                        };

                        if (this._hoveredItem !== item) {
                            console.log(
                                'move',
                                draggedItemIndex,
                                'to',
                                itemIndex
                            );
                            this._hoveredItem = item;
                            return item;
                        }
                    }

                    // UN-hover if no overlap...
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
        console.log('switchWithItem', target);
        const targetIndex = Number(target.dataset.index);
        const index = this._draggedIndex;
        target.classList.add('avonni-list__item-sortable_moved');

        // If the target has already been moved, move it back to its original position
        // Else, move it up or down
        if (target.style.transform !== '') {
            target.style.transform = '';
        } else {
            // this works for virtical lists,
            // const translationXValue =
            //     targetIndex > index
            //         ? -this._currentItemDraggedWidth
            //         : this._currentItemDraggedWidth;
            // const translationYValue =
            //     targetIndex > index
            //         ? -this._currentItemDraggedHeight
            //         : this._currentItemDraggedHeight;
            // target.style.transform = `translate(0px, ${
            //     translationYValue + 'px'
            // })`;
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

    get computedPlaceholderClass() {
        return classSet('placeholder-rectangle').toString();
    }

    reserveSpaceForDraggedItem(draggedItem, hoveredItem) {
        const hoveredItemIndex = Number(hoveredItem.dataset.index);
        const draggedItemIndex = Number(draggedItem.dataset.index);

        if (
            hoveredItemIndex !== undefined &&
            draggedItemIndex !== undefined &&
            hoveredItemIndex !== draggedItemIndex
        ) {
            // show a gray rectangle as a placeholder to visualize the target location
            let placeHolder = this.template.querySelector(
                '[data-element-id="placeholder-rectangle"]'
            );

            if (
                placeHolder &&
                this.hoveredPositionTopLeft &&
                this.draggedItemDimensions
            ) {
                placeHolder.style.top = this.hoveredPositionTopLeft.x + 'px';
                placeHolder.style.left = this.hoveredPositionTopLeft.y + 'px';
                placeHolder.style.width =
                    this.draggedItemDimensions.width + 'px';
                placeHolder.style.height =
                    this.draggedItemDimensions.height + 'px';
            }

            // and then displace all items to the position of the next item, or previous item

            this._itemElements.forEach((item, itemIndex) => {
                // dragging item to lower index
                if (hoveredItemIndex < draggedItemIndex) {
                    if (
                        Number(item.dataset.index) <= draggedItemIndex &&
                        Number(item.dataset.index) > hoveredItemIndex
                    ) {
                        // if the dragged item goes down, items in between will go up. the next position of the displaced item will be the same as index + 1;
                        const nextPosition =
                            this._itemElements[
                                itemIndex + 1
                            ].getBoundingClientRect();
                        const currentPosition = item.getBoundingClientRect();
                        console.log(
                            'nextPosition',
                            currentPosition.x,
                            nextPosition.x,
                            currentPosition.y,
                            nextPosition.y
                        );

                        // 🤦‍♂️
                        // item.style.transform = `translate(${
                        //     nextPosition.x - currentPosition.x
                        // }px, ${nextPosition.y - currentPosition.y}px)`;
                    }
                } else {
                    // dragging item to higher index
                }
            });
        }
    }

    insertDraggedItem(draggedItem) {
        console.log('insertDraggedItem');

        let placeHolder = this.template.querySelector(
            '[data-element-id="placeholder-rectangle"]'
        );
        if (placeHolder) {
            placeHolder.style = '';
        }

        const draggedItemIndex = Number(draggedItem.dataset.index);
        const hoveredItemIndex = Number(this._hoveredItem.dataset.index);

        // Insert item at position
        if (draggedItemIndex !== undefined && hoveredItemIndex !== undefined) {
            console.log(draggedItemIndex, hoveredItemIndex);
            if (draggedItemIndex > hoveredItemIndex) {
                this.computedItems.splice(
                    hoveredItemIndex,
                    0,
                    this.computedItems[draggedItemIndex]
                );
                this.computedItems.splice(draggedItemIndex + 1, 1);
            } else {
                this.computedItems.splice(
                    hoveredItemIndex + 1,
                    0,
                    this.computedItems[draggedItemIndex]
                );
                this.computedItems.splice(draggedItemIndex, 1);
            }

            this.computedItems = [...this.computedItems];
        }
    }

    /**
     * Erase the list styles and dataset - clear tracked variables.
     */
    clearSelection() {
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
            this._initialX =
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
        this._menuLeft = menuPosition.left;
        this._menuRight = menuPosition.right;

        this._initialY =
            event.type === 'touchstart'
                ? event.touches[0].clientY
                : event.clientY;
        this._initialX =
            event.type === 'touchstart'
                ? event.touches[0].clientX
                : event.clientX;
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
            const item = this.items[index];

            /**
             * The event fired when the mouse is pressed on an item.
             *
             * @event
             * @name itemmousedown
             * @param {object} item Item clicked.
             * @public
             * @bubbles
             */
            this.dispatchEvent(
                new CustomEvent('itemmousedown', {
                    detail: {
                        item: deepCopy(item)
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
        this._currentItemDraggedWidth = this._draggedElement.offsetWidth;
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
        const mouseX =
            event.type === 'touchmove'
                ? event.touches[0].clientX
                : event.clientX;

        // console.log('drag', mouseX, mouseY);
        // Make sure it is not possible to drag the item out of the menu
        let currentY;
        if (mouseY < this._menuTop) {
            currentY = this._menuTop;
        } else if (mouseY > this._menuBottom) {
            currentY = this._menuBottom;
        } else {
            currentY = mouseY;
        }
        let currentX;
        if (mouseX < this._menuLeft) {
            currentX = this._menuLeft;
        } else if (mouseX > this._menuRight) {
            currentX = this._menuRight;
        } else {
            currentX = mouseX;
        }

        // console.log(
        //     'darg1',
        //     currentX,
        //     this._initialX,
        //     currentY,
        //     this._initialY
        // );

        // Stick the dragged item to the mouse position
        this._draggedElement.style.transform = `translate(
            ${currentX - this._initialX + 'px'},
            ${currentY - this._initialY + 'px'}
       )`;

        // Get the position of the dragged item
        // const position = this._draggedElement.getBoundingClientRect();
        // const center = position.bottom - position.height / 2;

        // console.log('drag2', event.pageY, center);
        const hoveredItem = this.getHoveredItem(this._draggedElement);

        if (hoveredItem) {
            // this.switchWithItem(hoveredItem);
            this.reserveSpaceForDraggedItem(this._draggedElement, hoveredItem);
        }

        const buttonMenu = event.currentTarget.querySelector(
            '[data-element-id="lightning-button-menu"]'
        );
        if (buttonMenu) {
            buttonMenu.classList.remove('slds-is-open');
        }
    }

    dragEnd(event) {
        this.insertDraggedItem(this._draggedElement);
        this._hoveredItem = undefined;

        this.showPlaceholder = false;
        if (event && event.button === 0) {
            const index = Number(event.currentTarget.dataset.index);
            const item = this.items[index];

            /**
             * The event fired when the mouse is realeased on an item.
             *
             * @event
             * @name itemmouseup
             * @param {object} item Item clicked.
             * @public
             * @bubbles
             */
            this.dispatchEvent(
                new CustomEvent('itemmouseup', {
                    detail: {
                        item: deepCopy(item)
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
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: {
                    name: actionName,
                    item: this.computedItems[itemIndex]
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
         * @param {DOMRect} bounds Bounds of the item clicked.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('itemclick', {
                detail: {
                    item: this.computedItems[event.currentTarget.dataset.index],
                    bounds: event.currentTarget.getBoundingClientRect()
                }
            })
        );
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
