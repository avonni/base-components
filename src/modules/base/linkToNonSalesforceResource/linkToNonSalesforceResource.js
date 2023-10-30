import { LightningElement, api } from 'lwc';

/**
 * @class
 * @descriptor avonni-link-to-non-salesforce-resource
 */
export default class LinkToNonSalesforceResource extends LightningElement {
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
     * The URL/URI for the link.
     *
     * @type {string}
     * @public
     */
    @api href;
    /**
     * The relationship between the current component and the link document.
     *
     * @type {string}
     * @public
     */
    @api rel;

    /**
     * Parse the link dom element and the salesforce forcehelp-link.
     *
     * @type {Element|string}
     * @public
     */
    @api
    get parsedHref() {
        const element = this.template.querySelector('forcehelp-link');
        const link = element && element.shadowRoot.querySelector('a');
        return link && link.href;
    }
}

/**
 * Allow for interoperability of the current component's events to the link document.
 */
LinkToNonSalesforceResource.interopMap = {
    exposeNativeEvent: {
        click: true,
        focus: true,
        blur: true
    }
};
