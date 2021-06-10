import { LightningElement, api } from 'lwc';

const DEFAULT_SEARCH_INPUT_PLACEHOLDER = 'Search…';
const DEFAULT_BUTTON_VARIANT = 'border'
const DEFAULT_MENU_ALIGNMENT = 'left'
const DEFAULT_ICON_SIZE = 'medium'

export default class DynamicMenu extends LightningElement {
    @api iconName;
    @api value;
    @api alternativeText;
    @api loadingStateAlternativeText;
    @api label;
    @api withSearch;
    @api accessKey;
    @api title;
    @api searchInputPlaceholder = DEFAULT_SEARCH_INPUT_PLACEHOLDER;
    @api tooltip;
    @api items = [];
    @api isLoading;
    @api variant = DEFAULT_BUTTON_VARIANT;
    @api menuAlignment = DEFAULT_MENU_ALIGNMENT;
    @api disabled;
    @api iconSize = DEFAULT_ICON_SIZE;
}
