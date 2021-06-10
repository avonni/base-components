import { LightningElement, api } from 'lwc';

const DEFAULT_PAGE_HEADER_VARIANT = 'base'

export default class PageHeader extends LightningElement {
    @api iconName;
    @api label;
    @api title;
    @api info;
    @api variant = DEFAULT_PAGE_HEADER_VARIANT;
    @api fields = [];
}
