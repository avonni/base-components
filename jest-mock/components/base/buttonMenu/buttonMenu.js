import { LightningElement, api } from 'lwc';

export default class ButtonMenu extends LightningElement {
    @api accessKey;
    @api alternativeText;
    @api disabled;
    @api draftAlternativeText;
    @api groupOrder;
    @api hideDownArrow;
    @api iconName;
    @api iconSize;
    @api isDraft;
    @api isLoading;
    @api label;
    @api loadingStateAlternativeText;
    @api menuAlignment;
    @api nubbin;
    @api title;
    @api tooltip;
    @api value;
    @api variant;

    @api click() {}
    @api close() {}
    @api focus() {}
}
