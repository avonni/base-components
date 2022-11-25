import { LightningElement } from 'lwc';

export default class FilterMenuInfiniteLoading extends LightningElement {
    _loadMoreTimeOut;
    _searchTerm;

    isLoading = false;
    items = [];
    typeAttributes = {
        allowSearch: true,
        isMultiSelect: true,
        enableInfiniteLoading: true
    };

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

    handleClose() {
        clearTimeout(this._loadMoreTimeOut);
        this.items = [];
        this.isLoading = false;
        this.typeAttributes = {
            ...this.typeAttributes,
            enableInfiniteLoading: true,
            items: []
        };
    }

    handleLoadMore() {
        if (this.items.length > 150) {
            this.isLoading = false;
            this.typeAttributes.enableInfiniteLoading = false;
            this.typeAttributes = { ...this.typeAttributes };
            return;
        }

        this.isLoading = true;
        clearTimeout(this._loadMoreTimeOut);

        this._loadMoreTimeOut = setTimeout(() => {
            this.generateNewItems();
            this.typeAttributes.items = this.items;
            this.isLoading = false;
            this.typeAttributes = { ...this.typeAttributes };
        }, 1000);
    }

    handleSearch(event) {
        this._searchTerm = event.detail.value;
    }
}
