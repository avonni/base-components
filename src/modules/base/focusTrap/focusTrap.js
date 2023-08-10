import { api, LightningElement } from 'lwc';
import { findAllTabbableElements } from './focusUtils';

export default class FocusTrap extends LightningElement {
    _startNode;
    _endNode;

    _focused = false;
    _initialized = false;
    _pendingFocusOut = false;

    renderedCallback() {
        if (!this._initialized) {
            this._initialized = true;

            this._startNode = this.template.querySelector('[data-start]');
            this._endNode = this.template.querySelector('[data-end]');
        }
    }

    /**
     * Focuses the first focusable element in the focus trap.
     */
    @api
    focus() {
        if (!this._focused) {
            // We could potentially add support for focusing the element that has 'autofocus' attribute on it,
            // and if none, then focus on the first element
            this._focusFirstElement();
        }
    }

    get _bookendTabIndex() {
        return this._focused ? '0' : '-1';
    }

    _handleFocusIn() {
        if (this._pendingFocusOut) {
            this._pendingFocusOut = false;
        }
        this._focused = true;
    }

    _handleFocusOut() {
        // This assumes that a focusin will be dispatched after a focusout
        this._pendingFocusOut = true;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        requestAnimationFrame(() => {
            if (this._pendingFocusOut) {
                this._focused = false;
            }
        });
    }

    /**
     * Focuses on the specified element location.
     * @param {String} elementLocation Could be 'first or 'last'.
     */
    _moveFocusTo(elementLocation) {
        const focusableElements = this._getFocusableElements();
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

    /**
     * Focuses the last focusable element in the focus trap.
     */
    _focusFirstElement() {
        this._moveFocusTo('first');
    }

    /**
     * Focuses the last focusable element in the focus trap.
     */
    _focusLastElement() {
        this._moveFocusTo('last');
    }

    /**
     * Returns a list of the focusable children found within the element.
     */
    _getFocusableElements() {
        return findAllTabbableElements(this.template.querySelector('slot'));
    }
}
