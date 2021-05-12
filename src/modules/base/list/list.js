import { LightningElement, api } from 'lwc';
import {
    normalizeArray,
    normalizeBoolean,
    normalizeString
} from 'c/utilsPrivate';
import { classSet } from 'c/utils';

const ICON_POSITIONS = {
    valid: ['left', 'right'],
    default: 'right'
};

const DEFAULT_ALTERNATIVE_TEXT =
    'Press spacebar to grab or drop an item. Press up and down arrow keys to change position.';

export default class List extends LightningElement {
    @api label;
    @api sortableIconName;
    @api alternativeText = DEFAULT_ALTERNATIVE_TEXT;

    _items = [];
    _sortable = false;
    _sortableIconPosition = ICON_POSITIONS.default;

    _draggedIndex;
    _draggedElement;
    _initialY;
    _menuTop;
    _menuBottom;
    _lastHoveredItem;
    _itemElements;
    _unsavedComputedItems;

    computedItems = [];
    computedAssistiveText;

    @api
    get items() {
        return this._items;
    }
    set items(proxy) {
        this._items = normalizeArray(proxy);
        this.computedItems = JSON.parse(JSON.stringify(this._items));
    }

    @api
    get sortable() {
        return this._sortable;
    }
    set sortable(bool) {
        this._sortable = normalizeBoolean(bool);
    }

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

    get showIconRight() {
        return (
            this.sortable &&
            this.sortableIconName &&
            this.sortableIconPosition === 'right'
        );
    }

    get showIconLeft() {
        return (
            this.sortable &&
            this.sortableIconName &&
            this.sortableIconPosition === 'left'
        );
    }

    get itemClass() {
        return classSet('slds-border_bottom slds-grid list-item')
            .add({
                'sortable-item': this.sortable
            })
            .toString();
    }

    @api
    reset() {
        this.computedItems = JSON.parse(JSON.stringify(this.items));
    }

    getHoveredItem(position) {
        const { top, bottom, center } = position;

        return this._itemElements.find((item) => {
            if (item !== this._draggedElement) {
                const itemTop = item.getBoundingClientRect().top;
                const itemBottom = item.getBoundingClientRect().bottom;

                if (
                    (bottom > itemBottom && center < itemBottom) ||
                    (top < itemTop && center > itemTop)
                ) {
                    return item;
                }
            }
            return undefined;
        });
    }

    toggleItems() {
        // Get the position of the dragged item
        const position = this._draggedElement.getBoundingClientRect();
        const top = position.top;
        const bottom = position.bottom;
        const center = bottom - position.height / 2;

        // Get the hovered item
        const hoveredItem = this.getHoveredItem({ top, bottom, center });

        // Switch the hovered item with the dragged item
        if (hoveredItem !== this._lastHoveredItem) {
            const index = this._draggedIndex;
            const hoveredIndex = hoveredItem.dataset.index;

            // If the hovered item has already been moved, move it back to its original position
            // Else, move it
            if (hoveredItem.style.transform) {
                hoveredItem.style = undefined;
            } else {
                hoveredItem.style.transform =
                    hoveredIndex > index
                        ? 'translateY(-44px)'
                        : 'translateY(44px)';
            }

            // Make the swith in computed items
            [this.computedItems[hoveredIndex], this.computedItems[index]] = [
                this.computedItems[index],
                this.computedItems[hoveredIndex]
            ];

            this._draggedIndex = hoveredIndex;
            this._draggedElement.dataset.index = hoveredIndex;
            hoveredItem.dataset.index = index;
        }
    }

    clearSelection() {
        // Clean the styles
        this._itemElements.forEach((item) => {
            item.style = undefined;
        });
        this._draggedElement.classList.remove('sortable-item_dragged');

        // Clean the tracked variables
        this._draggedElement = this._draggedIndex = this._initialY = undefined;
    }

    initPositions(event) {
        const menuPosition = this.template
            .querySelector('.menu')
            .getBoundingClientRect();
        this._menuTop = menuPosition.top;
        this._menuBottom = menuPosition.bottom;

        this._initialY =
            event.type === 'touchstart'
                ? event.touches[0].clientY
                : event.clientY;
    }

    dragStart(event) {
        if (!this.sortable) return;

        // Make sure touch events don't trigger mouse events
        event.preventDefault();

        // If the user went from keyboard to mouse in the middle of an action, make sure to start anew
        if (this._draggedIndex) this.clearSelection();

        this._itemElements = Array.from(
            this.template.querySelectorAll('.sortable-item')
        );
        this._draggedElement = event.currentTarget;
        this._draggedIndex = this._draggedElement.dataset.index;
        this._draggedElement.classList.add('sortable-item_dragged');

        if (event.type !== 'keydown') {
            this.initPositions(event);
        } else {
            this._unsavedComputedItems = [...this.computedItems];
        }
    }

    drag(event) {
        if (!this._draggedIndex) return;

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
        this._draggedElement.style.transform = `translateY(${
            currentY - this._initialY
        }px)`;

        this.toggleItems();
    }

    dragEnd() {
        if (!this._draggedIndex) return;

        this.computedItems = [...this.computedItems];

        this.clearSelection();

        this.dispatchEvent(
            new CustomEvent('reorder', {
                detail: {
                    items: this.computedItems
                }
            })
        );
    }

    // handleKeyDown(event) {
    // if (!this.sortable) return;
    // If there is a selected item, check for use of arrows up/down and reorder accordingly
    // On enter, save the reordering

    // const index = event.currentTarget.dataset.index;

    // if (event.key === ' ' || event.key === 'Spacebar') {
    //     // Select or drop an item
    //     if (this._draggedIndex) {
    //         this.dragEnd();
    //     } else {
    //         this.dragStart(event);
    //     }
    // } else if (this._draggedIndex && event.key === 'ArrowDown') {
    //     if (this._unsavedComputedItems.length === index + 1)

    //     [this._unsavedComputedItems[index], this._unsavedComputedItems[index + 1]] = [
    //         this._unsavedComputedItems[index + 1],
    //         this._unsavedComputedItems[index]
    //     ];
    // } else if (this._draggedIndex && event.key === 'ArrowUp') {

    // }
    // }
}
