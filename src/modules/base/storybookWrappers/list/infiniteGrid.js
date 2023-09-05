import { LightningElement, api } from 'lwc';

export default class InfiniteGrid extends LightningElement {
    @api label;
    @api alternativeText;
    @api sortable;
    @api actions;
    @api mediaActions;
    @api sortableIconName;
    @api sortableIconPosition;
    @api divider;
    @api variant;
    @api cols;
    @api smallContainerCols;
    @api mediumContainerCols;
    @api largeContainerCols;
    @api imageAttributes;
    @api loadMoreOffset;

    _enableInfiniteLoading = true;
    _isLoading = false;
    _items;

    @api
    get isLoading() {
        return this._isLoading;
    }

    set isLoading(value) {
        this._isLoading = value;
    }

    @api
    get items() {
        return this._items;
    }

    set items(value) {
        this._items = value;
    }

    @api
    get enableInfiniteLoading() {
        return this._enableInfiniteLoading;
    }

    set enableInfiniteLoading(value) {
        this._enableInfiniteLoading = value;
    }

    connectedCallback() {
        this._loadedItems = this.items;
    }

    loadMoreData() {
        this._isLoading = true;

        setTimeout(() => {
            const newItems = this.items.concat(this._loadedItems);

            if (newItems.length >= 30) {
                this._isLoading = false;
                this._enableInfiniteLoading = false;
            } else {
                this._isLoading = false;
                this._items = newItems;
            }
        }, 1000);
    }
}
