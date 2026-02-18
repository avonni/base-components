import { LightningElement, api } from 'lwc';

export default class ButtonMenuInfiniteLoading extends LightningElement {
    @api accessKey;
    @api allowSearch;
    @api alternativeText;
    @api disabled;
    @api draftAlternativeText;
    @api hideDownArrow;
    @api iconName;
    @api iconSize;
    @api iconSrc;
    @api isDraft;
    @api isButtonLoading;
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

    _enableInfiniteLoading = true;

    _isLoading;

    items = [];
    _loadMoreTimeOut;
    _searchTerm;

    @api
    get enableInfiniteLoading() {
        return this._enableInfiniteLoading;
    }
    set enableInfiniteLoading(value) {
        this._enableInfiniteLoading = value;
    }

    @api
    get isLoading() {
        return this._isLoading;
    }
    set isLoading(value) {
        this._isLoading = value;
    }

    generateNewItems() {
        for (let i = 0; i < 10; i++) {
            const number = this.items.length + 1;
            const label = this._searchTerm
                ? `${this._searchTerm} ${number}`
                : `Item ${number}`;
            this.items.push({
                label,
                value: `item-${number}`
            });
        }
    }

    handleOpen() {
        clearTimeout(this._loadMoreTimeOut);
        this.items = [];
        this._enableInfiniteLoading = true;
        this.handleLoadMore();
    }

    handleClose() {
        clearTimeout(this._loadMoreTimeOut);
        this.items = [];
        this._isLoading = false;
        this._enableInfiniteLoading = false;
        this._searchTerm = null;
    }

    handleLoadMore() {
        if (this.items.length > 150) {
            this._isLoading = false;
            this._enableInfiniteLoading = false;
            this.items = [...this.items];
            return;
        }

        this._isLoading = true;
        clearTimeout(this._loadMoreTimeOut);

        this._loadMoreTimeOut = setTimeout(() => {
            this.generateNewItems();
            this.items = [...this.items];
            this._isLoading = false;
        }, 500);
    }

    handleSearch(event) {
        this._searchTerm = event.detail.value;
        this._enableInfiniteLoading = true;
        this.items = [];
        this.handleLoadMore();
    }
}
