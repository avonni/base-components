import { api, LightningElement } from 'lwc';
import { findAllTabbableElements } from './focusUtils';

export default class FocusTrap extends LightningElement {
    _focused = false;
    _pendingFocusOut = false;

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    get bookendTabIndex() {
        return this._focused ? '0' : '-1';
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Focuses the first focusable element in the focus trap.
     */
    @api
    focus() {
        if (!this._focused) {
            // We could potentially add support for focusing the element that has 'autofocus' attribute on it,
            // and if none, then focus on the first element
            this.focusFirstElement();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Returns a list of the focusable children found within the element.
     */
    getFocusableElements() {
        return findAllTabbableElements(this.template.querySelector('slot'));
    }

    /**
     * Focuses on the specified element location.
     * @param {String} elementLocation Could be 'first or 'last'.
     */
    moveFocusTo(elementLocation) {
        const focusableElements = this.getFocusableElements();
        if (focusableElements.length > 0) {
            let node;
            if (elementLocation === 'last') {
                node = focusableElements[focusableElements.length - 1];
            } else if (elementLocation === 'first') {
                node = focusableElements[0];
            }
            node.focus();
        }
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANLDERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Focuses the last focusable element in the focus trap.
     */
    focusFirstElement() {
        this.moveFocusTo('first');
    }

    /**
     * Focuses the last focusable element in the focus trap.
     */
    focusLastElement() {
        this.moveFocusTo('last');
    }

    handleFocusIn() {
        if (this._pendingFocusOut) {
            this._pendingFocusOut = false;
        }
        this._focused = true;
    }

    handleFocusOut() {
        // This assumes that a focusin will be dispatched after a focusout
        this._pendingFocusOut = true;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        requestAnimationFrame(() => {
            if (this._pendingFocusOut) {
                this._focused = false;
            }
        });
    }
}
