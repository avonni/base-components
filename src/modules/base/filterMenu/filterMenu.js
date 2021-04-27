import { LightningElement, api, track } from 'lwc';
import {
    normalizeBoolean,
    normalizeString,
    normalizeArray
} from 'c/utilsPrivate';

const ICON_SIZES = {
    valid: ['xx-small', 'x-small', 'small', 'medium', 'large'],
    default: 'medium'
};

const MENU_ALIGNMENTS = {
    valid: [
        'auto',
        'left',
        'center',
        'right',
        'bottom-left',
        'bottom-center',
        'bottom-right'
    ],
    default: 'left'
};

const VARIANTS = {
    valid: [
        'bare',
        'container',
        'border',
        'border-filled',
        'bare-inverse',
        'border-inverse'
    ],
    default: 'border'
};

const MENU_WIDTHS = {
    valid: ['xx-small', 'x-small', 'small', 'medium', 'large'],
    default: 'small'
};

const MENU_LENGTHS = {
    valid: ['5-items', '7-items', '10-items'],
    default: '7-items'
};

const DEFAULT_ICON_NAME = 'utility:down';
const DEFAULT_SEARCH_INPUT_PLACEHOLDER = 'Search...';
const DEFAULT_SUBMIT_BUTTON_LABEL = 'Apply';
const DEFAULT_RESET_BUTTON_LABEL = 'Reset';

// TODO:
// menuWidth
// menuLength
// tooltip (if using avonni button menu)

// QUESTIONS:
// To add to avonni button menu?
//  * tooltip
//  * width
//  * length

// TO VALIDATE:
// The selection is cleared on submit.

export default class FilterMenu extends LightningElement {
    @api accessKey;
    @api alternativeText;
    @api label;
    @api loadingStateAlternativeText;
    @api title;
    @api tooltip;

    _disabled = false;
    _iconName = DEFAULT_ICON_NAME;
    _iconSize = ICON_SIZES.default;
    _isLoading = false;
    _items = [];
    _menuAlignment = MENU_ALIGNMENTS.default;
    _nubbin = false;
    _value = [];
    _variant = VARIANTS.default;
    _searchInputPlaceholder = DEFAULT_SEARCH_INPUT_PLACEHOLDER;
    _hideSearchBox = false;
    _submitButtonLabel = DEFAULT_SUBMIT_BUTTON_LABEL;
    _resetButtonLabel = DEFAULT_RESET_BUTTON_LABEL;
    _menuWidth = MENU_WIDTHS.default;
    _menuLength = MENU_LENGTHS.default;

    @track computedItems = [];

    @api
    get disabled() {
        return this._disabled;
    }
    set disabled(bool) {
        this._disabled = normalizeBoolean(bool);
    }

    @api
    get iconName() {
        return this._iconName;
    }
    set iconName(value) {
        this._iconName =
            value && typeof value === 'string'
                ? value.trim()
                : DEFAULT_ICON_NAME;
    }

    @api
    get iconSize() {
        return this._iconSize;
    }
    set iconSize(value) {
        this._iconSize = normalizeString(value, {
            fallbackValue: ICON_SIZES.default,
            valid: ICON_SIZES.valid
        });
    }

    @api
    get isLoading() {
        return this._isLoading;
    }
    set isLoading(bool) {
        this._isLoading = normalizeBoolean(bool);
    }

    @api
    get items() {
        return this._items;
    }
    set items(proxy) {
        this._items = normalizeArray(proxy);
        this.computedItems = JSON.parse(JSON.stringify(this._items));

        this._computeValue();
    }

    @api
    get value() {
        return this._value;
    }
    set value(proxy) {
        const array = JSON.parse(JSON.stringify(proxy));
        this._value = normalizeArray(array);

        this._computeValue();
    }

    @api
    get variant() {
        return this._variant;
    }
    set variant(value) {
        this._variant = normalizeString(value, {
            fallbackValue: VARIANTS.default,
            valid: VARIANTS.valid
        });
    }

    @api
    get searchInputPlaceholder() {
        return this._searchInputPlaceholder;
    }
    set searchInputPlaceholder(value) {
        this._searchInputPlaceholder =
            value && typeof value === 'string'
                ? value.trim()
                : DEFAULT_SEARCH_INPUT_PLACEHOLDER;
    }

    @api
    get hideSearchBox() {
        return this._hideSearchBox;
    }
    set hideSearchBox(bool) {
        this._hideSearchBox = normalizeBoolean(bool);
    }

    @api
    get submitButtonLabel() {
        return this._submitButtonLabel;
    }
    set submitButtonLabel(value) {
        this._submitButtonLabel =
            value && typeof value === 'string'
                ? value.trim()
                : DEFAULT_SUBMIT_BUTTON_LABEL;
    }

    @api
    get resetButtonLabel() {
        return this._resetButtonLabel;
    }
    set resetButtonLabel(value) {
        this._resetButtonLabel =
            value && typeof value === 'string'
                ? value.trim()
                : DEFAULT_RESET_BUTTON_LABEL;
    }

    @api
    get menuAlignment() {
        return this._menuAlignment;
    }
    set menuAlignment(value) {
        this._menuAlignment = normalizeString(value, {
            fallbackValue: MENU_ALIGNMENTS.default,
            valid: MENU_ALIGNMENTS.valid
        });
    }

    @api
    get menuWidth() {
        return this._menuWidth;
    }
    set menuWidth(value) {
        this._menuWidth = normalizeString(value, {
            fallbackValue: MENU_WIDTHS.default,
            valid: MENU_WIDTHS.valid
        });
    }

    @api
    get menuLength() {
        return this._menuLength;
    }
    set menuLength(value) {
        this._menuLength = normalizeString(value, {
            fallbackValue: MENU_LENGTHS.default,
            valid: MENU_LENGTHS.valid
        });
    }

    @api
    get nubbin() {
        return this._nubbin;
    }
    set nubbin(bool) {
        this._nubbin = normalizeBoolean(bool);
    }

    _computeValue() {
        this.computedItems.forEach((item) => {
            if (this.value.indexOf(item.value) > -1) {
                item.checked = true;
            } else {
                item.checked = false;
            }
        });
    }

    @api
    clear() {
        this._value = [];
        this._computeValue();
    }

    handleItemClick(event) {
        const index = this.value.findIndex(
            (itemValue) => itemValue === event.currentTarget.value
        );
        if (index > -1) {
            this.value.splice(index, 1);
        } else {
            this.value.push(event.currentTarget.value);
        }

        this._computeValue();
    }

    handleSubmitClick() {
        this.dispatchEvent(
            new CustomEvent('apply', {
                detail: {
                    value: this.value
                }
            })
        );
        this.clear();
    }

    handleResetClick() {
        this.dispatchEvent(new CustomEvent('reset'));
        this.clear();
    }

    handleSearch(event) {
        const searchTerm = event.currentTarget.value.toLowerCase();

        this.computedItems.forEach((item) => {
            const label = item.label.toLowerCase();
            item.hidden = searchTerm ? !label.includes(searchTerm) : false;
        });
    }

    // Prevent the menu from closing on click on an item
    handleMenuItemPrivateSelect(event) {
        event.stopPropagation();
    }
}
