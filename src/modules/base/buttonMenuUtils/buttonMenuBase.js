import PrimitiveButton from 'c/primitiveButton';
import { MENU_ITEM_CLASSES, MENU_ITEM_TAGS } from './defaults';
import { keyValues } from 'c/utilsPrivate';

/**
 * Base parent, extended by the button menu and submenu.
 *
 * @class
 */
export class ButtonMenuBase extends PrimitiveButton {
    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Find menu item's index.
     *
     * @param {object} menuItemElement
     * @returns {number} index of menu item
     */
    findMenuItemIndex(menuItemElement) {
        return this.getMenuItems().indexOf(menuItemElement);
    }

    /**
     * Find menu item from event target.
     *
     * @param {Element} element
     * @returns {Element} menu item
     */
    findMenuItemFromEventTarget(element) {
        let currentNode = element;
        const stopAtElement = this.template.querySelector("[role='menu']");

        while (currentNode !== stopAtElement) {
            if (this.isValidMenuItem(currentNode)) {
                return currentNode;
            }
            if (currentNode.parentNode) {
                currentNode = currentNode.parentNode;
            } else {
                return null;
            }
        }
        return null;
    }

    focusNextOrPreviousMenuItem(event) {
        const menuItem = this.findMenuItemFromEventTarget(event.target);
        if (!menuItem) return;

        const menuItemIndex = this.findMenuItemIndex(menuItem);
        this.preventDefaultAndStopPropagation(event);
        let nextIndex =
            event.key === keyValues.up ? menuItemIndex - 1 : menuItemIndex + 1;

        if (nextIndex >= this.getMenuItems().length) {
            nextIndex = 0;
        } else if (nextIndex < 0) {
            nextIndex = this.getMenuItems().length - 1;
        }
        this.focusOnMenuItem(nextIndex);
    }

    /**
     * Set focus on menu item via Item Index.
     *
     * @param {object} itemIndex
     */
    focusOnMenuItem(itemIndex) {
        const menuItem = this.getMenuItemByIndex(itemIndex);
        if (menuItem) {
            menuItem.focus();
        }
    }

    /**
     * Get item with index in menu item array.
     *
     * @param {object[]} index
     * @return menu item from array
     */
    getMenuItemByIndex(index) {
        return this.getMenuItems()[index];
    }

    /**
     * Get item array from menu.
     *
     * @return {object[]}
     */
    getMenuItems() {
        const slot = this.template.querySelector(
            '[data-element-id="slot-default"]'
        );
        if (!slot) return [];

        const slottedElements = slot.assignedElements();
        return slottedElements.filter((el) => this.isValidMenuItem(el));
    }

    /**
     * Checks if a DOM node matches menu item tags or classes.
     *
     * @param {Element} element
     * @returns {boolean} True if the node is a menu item.
     */
    isValidMenuItem(element) {
        if (!element || !element.tagName || !element.classList) return false;

        return (
            MENU_ITEM_TAGS.includes(element.tagName) ||
            MENU_ITEM_CLASSES.some((itemClass) =>
                element.classList.contains(itemClass)
            )
        );
    }

    /**
     * To prevent default action and stop propagation of event
     *
     * @param {Event} event
     */
    preventDefaultAndStopPropagation(event) {
        event.preventDefault();
        event.stopPropagation();
    }
}
