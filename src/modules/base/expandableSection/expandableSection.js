import { classSet, normalizeBoolean, normalizeString } from 'c/utils';
import { LightningElement, api } from 'lwc';

const DEFAULT_CLOSED_ICON_ALTERNATIVE_TEXT = 'Closed';
const DEFAULT_OPENED_ICON_ALTERNATIVE_TEXT = 'Opened';
const VARIANTS = {
    default: 'shaded',
    valid: ['base', 'shaded']
};

/**
 * @class
 * @descriptor avonni-expandable-section
 * @storyId example-expandable-section--base
 * @public
 */
export default class ExpandableSection extends LightningElement {
    /**
     * Alternative text for the closed icon.
     *
     * @type {string}
     * @public
     */
    @api closedIconAlternativeText = DEFAULT_CLOSED_ICON_ALTERNATIVE_TEXT;
    /**
     * Alternative text for the open icon.
     *
     * @type {string}
     * @public
     */
    @api openedIconAlternativeText = DEFAULT_OPENED_ICON_ALTERNATIVE_TEXT;
    /**
     * The title can include text, and is displayed in the header.
     *
     * @type {string}
     * @public
     */
    @api title;

    _closed = false;
    _collapsible = false;
    _variant = VARIANTS.default;

    showTitleSlot = true;

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    renderedCallback() {
        this.showTitleSlot =
            !this.title &&
            this.titleSlot &&
            this.titleSlot.assignedElements().length !== 0;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * If present, close the section.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get closed() {
        return this._closed;
    }
    set closed(value) {
        this._closed = normalizeBoolean(value);
    }

    /**
     * If present, the section is collapsible.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get collapsible() {
        return this._collapsible;
    }
    set collapsible(value) {
        this._collapsible = normalizeBoolean(value);
    }

    /**
     * Variant of the section. Valid values include base and shaded.
     *
     * @type {string}
     * @public
     * @default base
     */
    @api
    get variant() {
        return this._variant;
    }
    set variant(value) {
        this._variant = normalizeString(value, {
            validValues: VARIANTS.valid,
            fallbackValues: VARIANTS.default
        });
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Return a true string if the section is opened or and a false string if not.
     *
     * @type {string}
     */
    get computedAriaExpanded() {
        return String(!this.closed);
    }

    /**
     * Computed list of the header classes.
     *
     * @type {string}
     * @default slds-section__title
     */
    get computedHeaderClass() {
        return classSet('slds-section__title')
            .add({
                'slds-theme_shade':
                    !this.collapsible && this.variant === 'shaded',
                'avonni-expandable-section__header_collapsible':
                    this.collapsible
            })
            .add(`avonni-expandable-section__header_${this.variant}`)
            .toString();
    }

    /**
     * Computed list of the section classes.
     *
     * @type {string}
     * @default slds-section
     */
    get computedSectionClass() {
        return classSet('slds-section slds-var-m-vertical_x-small')
            .add({
                'slds-is-open': !this.collapsible || !this.closed
            })
            .toString();
    }

    /**
     * Computed list of the title classes, when the section is collapsible and the title is a button.
     *
     * @type {string}
     * @default slds-button slds-section__title-action
     */
    get computedTitleButtonClass() {
        return classSet(
            'avonni-expandable-section__title-button slds-button slds-section__title-action slds-grid'
        )
            .add({
                'avonni-expandable-section__title-button_noncollapsible':
                    !this.collapsible
            })
            .add(`avonni-expandable-section__title-button_${this.variant}`)
            .toString();
    }

    /**
     * If true, the header is visible.
     *
     * @type {boolean}
     * @default false
     */
    get showHeader() {
        return this.title || this.showTitleSlot;
    }

    /**
     * Get the title slot DOM element.
     *
     * @type {Element}
     */
    get titleSlot() {
        return this.template.querySelector('slot[name=title]');
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    @api
    focus() {
        const button = this.template.querySelector(
            '[data-element-id="button"]'
        );
        if (button) {
            button.focus();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Section change status toggle.
     */
    toggleSection() {
        if (!this.collapsible) {
            return;
        }
        this._closed = !this._closed;

        /**
         * The event fired when the expandable section is closed or opened.
         *
         * @event
         * @name toggle
         * @param {boolean} closed
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('toggle', {
                detail: {
                    closed: this._closed
                }
            })
        );
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS
     * -------------------------------------------------------------
     */

    handleBlur() {
        this._dispatchBlur();
    }

    handleFocus() {
        this._dispatchFocus();
    }

    /*
     * ------------------------------------------------------------
     *  EVENT DISPATCHERS
     * -------------------------------------------------------------
     */

    _dispatchBlur() {
        /**
         * The event fired when the focus is removed from the expandable section.
         *
         * @event
         * @name blur
         */
        this.dispatchEvent(new CustomEvent('blur'));
    }

    _dispatchFocus() {
        /**
         * The event fired when the focus is set on the expandable section.
         *
         * @event
         * @name focus
         */
        this.dispatchEvent(new CustomEvent('focus'));
    }
}
