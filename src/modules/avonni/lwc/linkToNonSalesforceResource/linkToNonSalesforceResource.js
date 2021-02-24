import { LightningElement, api } from 'lwc';

export default class LinkToNonSalesforceResource extends LightningElement {
    @api label;
    @api title;
    @api href;
    @api rel;

    @api
    get parsedHref() {
        const element = this.template.querySelector('forcehelp-link');
        const link = element && element.shadowRoot.querySelector('a');
        return link && link.href;
    }
}

LinkToNonSalesforceResource.interopMap = {
    exposeNativeEvent: {
        click: true,
        focus: true,
        blur: true
    }
};
