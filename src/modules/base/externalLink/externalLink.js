

import { LightningElement, api } from 'lwc';

/**
 * @class
 * @descriptor avonni-external-link
 */
export default class ExternalLink extends LightningElement {
    /**
     * The link label.
     *
     * @type {string}
     * @public
     */
    @api label;
    /**
     * The link title.
     *
     * @type {string}
     * @public
     */
    @api title;
    /**
     * The rel attribute specifies the relationship between the current component and the linked document.
     *
     * @type {string}
     * @public
     */
    @api rel;
    /**
     * The tab index for the link.
     *
     * @type {string}
     * @public
     */
    @api tabIndex;

    _href;
    _isDirty = true;

    /**
     * The URL/URI for the link.
     *
     * @type {string}
     * @public
     */
    @api
    get href() {
        return this._href;
    }

    set href(value) {
        this._href = value;
        this._isDirty = true;
    }
}
