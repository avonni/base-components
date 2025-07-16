import { LightningElement, api } from 'lwc';

export default class InfiniteGrid extends LightningElement {
    @api actions;
    @api alternativeText;
    @api cols;
    @api divider;
    @api imageAttributes;
    @api label;
    @api largeContainerCols;
    @api loadingStateAlternativeText;
    @api loadMoreOffset;
    @api mediaActions;
    @api mediumContainerCols;
    @api smallContainerCols;
    @api sortable;
    @api sortableIconName;
    @api sortableIconPosition;
    @api variant;

    _enableInfiniteLoading = true;
    _isLoading = false;
    _items = [];

    _connected = false;
    loadedItems = [];

    connectedCallback() {
        this.generateItems();
        this._connected = true;
    }

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

    @api
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = Array.isArray(value) ? value : [];

        if (this._connected) {
            this.generateItems();
        }
    }

    generateItems() {
        const newItems = this.items.map((item, index) => {
            return {
                ...item,
                name: `item-${this.loadedItems.length + index + 1}`,
                label: `Item #${this.loadedItems.length + index + 1}`
            };
        });
        this.loadedItems = this.loadedItems.concat(newItems);
    }

    loadMoreData() {
        if (this.loadedItems.length > 30) {
            this._isLoading = false;
            this._enableInfiniteLoading = false;
            return;
        }
        this._isLoading = true;

        setTimeout(() => {
            this.generateItems();
            this._isLoading = false;
        }, 1000);
    }
}
