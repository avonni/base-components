import { LightningElement, api } from 'lwc';

export default class ButtonMenu extends LightningElement {
    @api alternativeText;
    @api draftAlternativeText;
    @api groupOrder;
    @api label;
    @api loadingStateAlternativeText;
    @api value;
    @api accessKey;
    @api disabled;
    @api hideDownArrow;
    @api iconName;
    @api iconSize;
    @api isDraft;
    @api isLoading;
    @api menuAlignment;
    @api nubbin;
    @api title;
    @api tooltip;
    @api variant;
}
