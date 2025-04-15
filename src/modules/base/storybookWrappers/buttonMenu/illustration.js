import { LightningElement, api } from 'lwc';

export default class ButtonMenuIllustration extends LightningElement {
    @api accessKey;
    @api alternativeText;
    @api disabled;
    @api draftAlternativeText;
    @api hideDownArrow;
    @api iconName;
    @api iconSize;
    @api iconSrc;
    @api isDraft;
    @api isLoading;
    @api label;
    @api loadingStateAlternativeText;
    @api menuAlignment;
    @api nubbin;
    @api prefixIconName;
    @api title;
    @api tooltip;
    @api triggers;
    @api value;
    @api variant;
}
