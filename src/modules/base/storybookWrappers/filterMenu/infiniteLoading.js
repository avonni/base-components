import { LightningElement, api } from 'lwc';
import { deepCopy, normalizeObject } from 'c/utils';

const COLORS = [
    '#001219',
    '#005f73',
    '#0a9396',
    '#94d2bd',
    '#e9d8a6',
    '#ee9b00',
    '#ca6702',
    '#bb3e03',
    '#ae2012',
    '#9b2226'
];

export default class FilterMenuInfiniteLoading extends LightningElement {
    @api accessKey;
    @api alternativeText;
    @api applyButtonLabel;
    @api buttonVariant;
    @api closed;
    @api collapsible;
    @api disabled;
    @api dropdownAlignment;
    @api dropdownNubbin;
    @api hideApplyResetButtons;
    @api hideSelectedItems;
    @api iconName;
    @api iconSize;
    @api label;
    @api loadingStateAlternativeText;
    @api name;
    @api resetButtonLabel;
    @api title;
    @api tooltip;
    @api type;
    @api value;
    @api variant;

    _isLoading;
    _typeAttributes;

    computedTypeAttributes = {};
    items = [];
    _loadMoreTimeOut;
    _searchTerm;

    @api
    get isLoading() {
        return this._isLoading;
    }
    set isLoading(value) {
        this._isLoading = value;
    }

    @api
    get typeAttributes() {
        return this._typeAttributes;
    }
    set typeAttributes(value) {
        this._typeAttributes = value;
        this.computedTypeAttributes = normalizeObject(deepCopy(value));
    }

    generateNewItems() {
        for (let i = 0; i < 10; i++) {
            const number = this.items.length + 1;
            const label = this._searchTerm
                ? `${this._searchTerm} ${number}`
                : `Item ${number}`;
            this.items.push({
                label,
                value: `item-${number}`,
                color: COLORS[i]
            });
        }
    }

    handleClose() {
        clearTimeout(this._loadMoreTimeOut);
        this.items = [];
        this._isLoading = false;
        this.computedTypeAttributes = {
            ...this.computedTypeAttributes,
            enableInfiniteLoading: true,
            items: []
        };
    }

    handleLoadMore() {
        if (this.items.length > 150) {
            this._isLoading = false;
            this.computedTypeAttributes.enableInfiniteLoading = false;
            this.computedTypeAttributes = { ...this.computedTypeAttributes };
            return;
        }

        this._isLoading = true;
        clearTimeout(this._loadMoreTimeOut);

        this._loadMoreTimeOut = setTimeout(() => {
            this.generateNewItems();
            this.computedTypeAttributes.items = this.items;
            this._isLoading = false;
            this.computedTypeAttributes = { ...this.computedTypeAttributes };
        }, 1000);
    }

    handleSearch(event) {
        this._searchTerm = event.detail.value;
    }
}
