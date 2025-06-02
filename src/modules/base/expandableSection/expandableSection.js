import { LightningElement, api } from 'lwc';
import { classSet, normalizeBoolean, normalizeString } from 'c/utils';

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
     * Computed list of the section classes.
     *
     * @type {string}
     * @default slds-section
     */
    get sectionClass() {
        return classSet('slds-section slds-var-m-vertical_x-small')
            .add({
                'slds-is-open': !this.collapsible || !this.closed
            })
            .toString();
    }

    /**
     * Get the title slot DOM element.
     *
     * @type {Element}
     */
    get titleSlot() {
        return this.template.querySelector('slot[name=title]');
    }

    /**
     * Computed list of the header classes.
     *
     * @type {string}
     * @default slds-section__title
     */
    get headerClass() {
        return classSet('slds-section__title')
            .add({
                'slds-theme_shade':
                    !this.collapsible && this.variant === 'shaded',
                'avonni-expandable-section__header_collapsible':
                    this.collapsible
            })
            .add(`avonni-expandable-section__header_${this._variant}`)
            .toString();
    }

    /**
     * Computed list of the title classes, when the section is collapsible and the title is a button.
     *
     * @type {string}
     * @default slds-button slds-section__title-action
     */
    get titleButtonClass() {
        return classSet(
            'avonni-expandable-section__title-button slds-button slds-section__title-action slds-grid'
        )
            .add({
                'avonni-expandable-section__title-button_base':
                    this.variant === 'base',
                'avonni-expandable-section__title-button_shaded':
                    this.variant === 'shaded',
                'avonni-expandable-section__title-button_noncollapsible':
                    !this.collapsible
            })
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

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Section change status toggle.
     */
    toggleSection() {
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
}
