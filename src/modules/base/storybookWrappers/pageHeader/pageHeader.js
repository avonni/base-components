import { LightningElement, api } from 'lwc';

const DEFAULT_PAGE_HEADER_VARIANT = 'base';

export default class PageHeader extends LightningElement {
    @api info;
    @api isJoined = false;
    @api label;
    @api title;
    @api variant = DEFAULT_PAGE_HEADER_VARIANT;
}
