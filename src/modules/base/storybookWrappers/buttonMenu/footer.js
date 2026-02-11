import { LightningElement, api } from 'lwc';

export default class ButtonMenuFooter extends LightningElement {
    @api accessKey;
    @api allowSearch;
    @api alternativeText;
    @api disabled;
    @api draftAlternativeText;
    @api enableInfiniteLoading;
    @api hideDownArrow;
    @api iconName;
    @api iconSize;
    @api iconSrc;
    @api isDraft;
    @api isButtonLoading;
    @api isLoading;
    @api label;
    @api loadingStateAlternativeText;
    @api loadMoreButtonLabel;
    @api menuAlignment;
    @api menuLength;
    @api nubbin;
    @api prefixIconName;
    @api searchInputPlaceholder;
    @api title;
    @api tooltip;
    @api triggers;
    @api value;
    @api variant;
}
