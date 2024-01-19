import { LightningElement, api } from 'lwc';

export default class LayoutItem extends LightningElement {
    @api alignmentBump;
    @api largeContainerOrder;
    @api largeContainerSize;
    @api mediumContainerOrder;
    @api mediumContainerSize;
    @api order;
    @api size;
    @api smallContainerOrder;
    @api smallContainerSize;
}
