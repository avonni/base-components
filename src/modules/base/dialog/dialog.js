import { LightningElement, api } from 'lwc';
import { synchronizeAttrs } from 'c/utilsPrivate';
import { classSet, normalizeBoolean, normalizeString } from 'c/utils';

const DIALOG_SIZES = {
    valid: ['x-small', 'small', 'medium', 'large'],
    default: 'medium'
};

/**
 * @class
 * @descriptor avonni-dialog
 * @storyId example-dialog--base
 * @public
 */
export default class Dialog extends LightningElement {
    /**
     * Id of the element that describes the dialog.
     *
     * @type {string}
     * @public
     */
    @api ariaDescribedBy;

    /**
     * Id of the element labelling the dialog. If a title is present, defaults to the title tag.
     *
     * @type {string}
     * @public
     */
    @api ariaLabelledBy;

    /**
     * Alternative text for the close button. If the dialog contains a cancel button, the alternative text should be equal to the button label.
     *
     * @type {string}
     * @default Close
     * @public
     */
    @api closeButtonAlternativeText = 'Close';

    /**
     * Dialog name.
     *
     * @type {string}
     * @public
     */
    @api dialogName;

    /**
     * Message displayed while the modal box is in the loading state.
     *
     * @type {string}
     * @public
     */
    @api loadingStateAlternativeText;

    /**
     * The title can include text, and is displayed in the header. To include additional markup or another component, use the title slot.
     *
     * @type {string}
     * @public
     */
    @api title;

    _contentClicked = false;
    _isLoading = false;
    _size = DIALOG_SIZES.default;

    _focusedIn = false;
    _showDialog = false;
    showFooter = true;
    showHeader = true;

    connectedCallback() {
        this.template.addEventListener('click', this.handleClick);
        this.setAttribute('dialog-name', this.dialogName);
    }

    disconnectedCallback() {
        this.template.removeEventListener('click', this.handleClick);
    }

    renderedCallback() {
        if (this.titleSlot) {
            this.showTitleSlot = this.titleSlot.assignedElements().length !== 0;
            this.showHeader = this.title || this.showTitleSlot;
        }

        if (this.footerSlot) {
            this.showFooter = this.footerSlot.assignedElements().length !== 0;
        }

        const modal = this.template.querySelector('[data-element-id="modal"]');
        synchronizeAttrs(modal, {
            'aria-describedby': this.ariaDescribedBy,
            'aria-labelledby': this.computedAriaLabelledby
        });
    }

    /**
     * Title Slot DOM element
     *
     * @type {HTMLElement}
     */
    get titleSlot() {
        return this.template.querySelector('slot[name=title]');
    }

    /**
     * Footer Slot DOM element
     *
     * @type {HTMLElement}
     */
    get footerSlot() {
        return this.template.querySelector('slot[name=footer]');
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * If present, the modal box is in a loading state and shows a spinner.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get isLoading() {
        return this._isLoading;
    }

    set isLoading(value) {
        this._isLoading = normalizeBoolean(value);
    }

    /**
     * If present, the dialog is open by default.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get showDialog() {
        return this._showDialog;
    }

    set showDialog(value) {
        this._showDialog = normalizeBoolean(value);
    }

    /**
     * Width of the modal. Accepted sizes include small, medium, large.
     *
     * @type {string}
     * @public
     * @default medium
     */
    @api
    get size() {
        return this._size;
    }

    set size(size) {
        this._size = normalizeString(size, {
            fallbackValue: DIALOG_SIZES.default,
            validValues: DIALOG_SIZES.valid
        });
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    get computedAriaLabelledby() {
        return this.hasStringTitle && !this.ariaLabelledBy
            ? 'h1-dialog'
            : this.ariaLabelledBy;
    }

    /**
     * Computed Header class styling.
     *
     * @type {string}
     */
    get computedHeaderClass() {
        return classSet('slds-modal__header')
            .add({
                'slds-modal__header_empty': !this.showHeader
            })
            .toString();
    }

    /**
     * Computed Modal class styling
     *
     * @type {string}
     */
    get computedModalClass() {
        return classSet('slds-modal slds-fade-in-open')
            .add(`slds-modal_${this._size}`)
            .toString();
    }

    /**
     * Verify if Title string present.
     *
     * @type {boolean}
     */
    get hasStringTitle() {
        return !!this.title;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Open the modal box.
     *
     * @public
     */
    @api
    show() {
        this._showDialog = true;
    }

    /**
     * Close the modal box.
     *
     * @public
     */
    @api
    hide() {
        this._showDialog = false;
        /**
         * The event fired when the dialog closes.
         *
         * @event
         * @name closedialog
         */
        this.dispatchEvent(new CustomEvent('closedialog'));
    }

    /**
     * Set the focus on the given title, if any. Otherwise set the focus on the close button.
     *
     * @public
     */
    @api
    focus() {
        if (this.template.activeElement) {
            return;
        }
        const title = this.template.querySelector('[data-element-id="h1"]');
        if (title) {
            title.focus();
        } else {
            this.focusOnCloseButton();
        }
    }

    /**
     * Set the focus on the close button.
     *
     * @public
     */
    @api
    focusOnCloseButton() {
        const button = this.template.querySelector('.slds-modal__close');
        if (button) button.focus();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Handle a click on any part of the dialog.
     */
    handleClick = () => {
        if (this.showDialog && !this._contentClicked) {
            /**
             * The event fired when the user clicks outside of the dialog.
             *
             * @event
             * @name outsideclick
             * @public
             * @bubbles
             */
            this.dispatchEvent(
                new CustomEvent('outsideclick', {
                    bubbles: true
                })
            );
        } else {
            this._contentClicked = false;
        }
    };

    /**
     * Handle a click on the content of the dialog. Block the dispatch of the outsideclick event.
     */
    handleContentClick() {
        this._contentClicked = true;
    }

    handleFocusIn() {
        this._focusedIn = true;
    }

    handleFocusOut() {
        this._focusedIn = false;

        requestAnimationFrame(() => {
            if (!this._focusedIn && this.showDialog) {
                this.focus();
                this._focusedIn = true;
            }
        });
    }

    /**
     * Handle a key up event anywhere in the dialog. Close the dialog if Escape is pressed.
     *
     * @param {Event} event keyup event
     */
    handleKeyUp(event) {
        if (event.key === 'Escape') {
            this.hide();
        }
    }
}
