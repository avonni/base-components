import { LightningElement, api } from 'lwc';

export default class ButtonMenuIllustration extends LightningElement {
    @api alternativeText;
    @api draftAlternativeText;
    @api iconName;
    @api label;
    @api loadingStateAlternativeText;
    @api value;
    @api accessKey;
    @api disabled;
    @api iconSize;
    @api isDraft;
    @api isLoading;
    @api menuAlignment;
    @api nubbin;
    @api title;
    @api tooltip;
    @api variant;
    @api computedButtonClass;
    @api focus;
    @api click;
}
