import { LightningElement, api } from 'lwc';

export default class MaxWidthPillContainer extends LightningElement {
    @api actions;
    @api alternativeText;
    @api isCollapsible;
    @api isExpanded;
    @api items;
    @api showMoreButtonLabel;
    @api singleLine;
    @api sortable;
}
