import { LightningElement, api } from 'lwc';

const DEFAULT_SEARCH_INPUT_PLACEHOLDER = 'Search…';
const DEFAULT_BUTTON_VARIANT = 'border';
const DEFAULT_ICON_SIZE = 'medium';
const DEFAULT_ICON_POSITION = 'left';
const DEFAULT_MENU_ALIGNMENT = 'left';
const DEFAULT_MENU_LENGTH = '7-items';
const DEFAULT_MENU_WIDTH = 'small';

export default class DynamicMenuInGroup extends LightningElement {
    @api accessKey;
    @api allowSearch = false;
    @api alternativeText;
    @api buttonSize;
    @api disabled = false;
    @api hideCheckMark = false;
    @api iconName;
    @api iconPosition = DEFAULT_ICON_POSITION;
    @api iconSize = DEFAULT_ICON_SIZE;
    @api isLoading;
    @api items = [];
    @api label;
    @api loadingStateAlternativeText;
    @api menuAlignment = DEFAULT_MENU_ALIGNMENT;
    @api menuLength = DEFAULT_MENU_LENGTH;
    @api menuWidth = DEFAULT_MENU_WIDTH;
    @api nubbin = false;
    @api searchInputPlaceholder = DEFAULT_SEARCH_INPUT_PLACEHOLDER;
    @api selectOnHover = false;
    @api title;
    @api tooltip;
    @api value;
    @api variant = DEFAULT_BUTTON_VARIANT;
}
