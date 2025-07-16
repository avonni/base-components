import { LightningElement, api } from 'lwc';

/**
 * @class
 * @descriptor avonni-link
 */
export default class Link extends LightningElement {
    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Specify the class name for the link.
     *
     * @type {string}
     * @public
     */
    @api className;
    /**
     * The URL/URI for the link.
     *
     * @type {string}
     * @public
     */
    @api href;
    /**
     * The link label.
     *
     * @type {string}
     * @public
     */
    @api label;
    /**
     * The relationship between the current component and the link document.
     *
     * @type {string}
     * @public
     * @default
     */
    @api rel;
    /**
     * Target attribute that controls what happens when clicking on the link. Default is "_blank" which opens the link in a new window.
     *
     * @type {string}
     * @default _blank
     */
    @api target = '_blank';
    /**
     * The title for the link.
     *
     * @type {string}
     * @public
     */
    @api title;
    /**
     * The link type.
     *
     * @type {string}
     * @public
     */
    @api type;

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Computed class for the link.
     *
     * @type {string}
     */
    get computedClass() {
        return this.className || '';
    }

    /**
     * Computed Href from provided uri.
     *
     * @type {string}
     */
    get computedHref() {
        return this.href
            ? '/HelpAndTrainingDoor?version=2&resource=' +
                  encodeURIComponent(this.href)
            : '';
    }

    /**
     * Retrieve link DOM element.
     *
     * @type {Element}
     */
    get linkElement() {
        return this.template.querySelector('[data-element-id="a"]');
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Removes focus on the link element.
     *
     * @public
     */
    @api
    blur() {
        this.linkElement.blur();
    }

    /**
     * Set focus on the link element.
     *
     * @public
     */
    @api
    focus() {
        this.linkElement.focus();
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS
     * -------------------------------------------------------------
     */

    /**
     * Prevent anchor tag from navigating when href leads to nothing.
     *
     * @param {Event} event
     */
    handleAnchorTagClick(event) {
        const href = event.currentTarget.href;
        if (
            // eslint-disable-next-line no-script-url
            ['#', 'javascript:void(0)', 'javascript:void(0);'].includes(href)
        ) {
            event.preventDefault();
        }
    }
}
