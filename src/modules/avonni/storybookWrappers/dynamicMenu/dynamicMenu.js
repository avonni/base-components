import { LightningElement, api } from 'lwc';

export default class DynamicMenu extends LightningElement {
    @api iconName;
    @api value;
    @api alternativeText;
    @api loadingStateAlternativeText;
    @api label;
    @api withSearch;
    @api accessKey;
    @api title;
    @api searchInputPlaceholder = 'Search…';
    @api tooltip;
    @api items = [];
    @api isLoading;
    @api variant = 'border';
    @api menuAlignment = 'left';
    @api disabled;
}
