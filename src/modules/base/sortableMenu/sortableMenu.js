import { LightningElement, api } from 'lwc';
import { normalizeArray } from '../utilsPrivate/normalize';

export default class SortableMenu extends LightningElement {
    @api label;
    @api disabled;

    _items = [];
    _draggedIndex;
    _draggedElement;
    _initialY;
    _menuPosition;
    _lastHoveredItem;
    _itemElements;

    computedItems = [];

    @api
    get items() {
        return this._items;
    }
    set items(proxy) {
        this._items = normalizeArray(proxy);
        this.computedItems = JSON.parse(JSON.stringify(this._items));
    }

    dragStart(event) {
        this._menuPosition = this.template
            .querySelector('.menu')
            .getBoundingClientRect();
        this._itemElements = Array.from(
            this.template.querySelectorAll('.sortable-item')
        );
        this._initialY = event.clientY;
        this._draggedElement = event.currentTarget;
        this._draggedIndex = this._draggedElement.dataset.index;
        this._draggedElement.classList.toggle('sortable-item_dragged');
    }

    drag(event) {
        if (this._draggedIndex) {
            const mouseY = event.clientY;
            const menuTop = this._menuPosition.top;
            const menuBottom = this._menuPosition.bottom;

            // Make sure it is not possible to drag the item out of the menu
            let currentY;
            if (mouseY < menuTop) {
                currentY = menuTop - this._initialY;
            } else if (mouseY > menuBottom) {
                currentY = menuBottom - this._initialY;
            } else {
                currentY = mouseY - this._initialY;
            }

            // Stick the dragged item to the mouse position
            this._draggedElement.style.transform = `translateY(${currentY}px)`;

            this.toggleItems();
        }
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

            // Make the swith in this.items
            [this.computedItems[hoveredIndex], this.computedItems[index]] = [
                this.computedItems[index],
                this.computedItems[hoveredIndex]
            ];

            this._draggedIndex = hoveredIndex;
            this._draggedElement.dataset.index = hoveredIndex;
            hoveredItem.dataset.index = index;
        }
    }

    dragEnd() {
        if (this._draggedIndex) {
            // Make the menu rerender
            this.computedItems = new Array(this.computedItems).flat();

            // Clean the styles
            this._itemElements.forEach((item) => {
                item.style = undefined;
            });
            this._draggedElement.classList.toggle('sortable-item_dragged');

            // Clean the tracked variables
            this._draggedElement = this._draggedIndex = this._initialY = undefined;
        }
    }
}
