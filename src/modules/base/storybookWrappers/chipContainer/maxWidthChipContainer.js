

import { LightningElement, api } from 'lwc';

export default class MaxWidthPillContainer extends LightningElement {
    @api items;
    @api alternativeText;
    @api isCollapsible;
    @api isExpanded;
    @api singleLine;
    @api sortable;
}
