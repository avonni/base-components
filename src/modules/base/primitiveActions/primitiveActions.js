

import { LightningElement, api } from 'lwc';

export default class PrimitiveActions extends LightningElement {
    /**
     * Array of actions to display
     *
     * @type {number}
     * @public
     */
    @api actions = [];
    /**
     * The size of the button icon for a single action.
     *
     * @type {number}
     * @public
     */
    @api buttonIconSize;
    /**
     * The variant of the button icon for a single action.
     *
     * @type {number}
     * @public
     */
    @api buttonIconVariant;
    /**
     * The number of actions appearing as buttons
     *
     * @type {number}
     * @public
     */
    @api visibleActions;

    get actionButtons() {
        return this.actions.slice(0, this.visible);
    }

    get actionsButtonMenu() {
        return this.actions.slice(this.visible, this.actions.length);
    }

    get singleAction() {
        return this.actions.length === 1 && this.actions[0];
    }

    get hasActions() {
        return this.actions?.length > 0;
    }

    get hasActionsButtonMenu() {
        return this.actionsButtonMenu.length > 0;
    }

    get hasZeroActionButtons() {
        return this.actionButtons.length === 0;
    }

    get visible() {
        return !this.visibleActions && this.visibleActions !== 0
            ? this.actions.length
            : this.visibleActions;
    }

    handleActionButtonClick(event) {
        event.stopImmediatePropagation();
        this.dispatchActionClick(event.currentTarget.dataset.name);
    }

    handleActionButtonMenuClick(event) {
        event.stopImmediatePropagation();
        this.dispatchActionClick(event.detail.value);
    }

    dispatchActionClick(name) {
        /**
         * The event fired when a user clicks on an action.
         *
         * @event
         * @name actionclick
         * @param {string} name  Name of the action clicked.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('actionclick', { detail: { name } })
        );
    }
}
