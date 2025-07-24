import { api, LightningElement } from 'lwc';

export default class InfiniteLoadingVisualPicker extends LightningElement {
    @api collapsedShowMoreButton;
    @api disabled;
    @api expandedShowMoreButton;
    @api hideCheckMark;
    @api label;
    @api loadMoreOffset;
    @api loadingStateAlternativeText;
    @api maxCount;
    @api messageWhenValueMissing;
    @api name;
    @api required;
    @api requiredAlternativeText;
    @api size;
    @api type;
    @api value;
    @api variant;

    _isLoading = false;

    _loadMoreTimeout;
    items = [];

    @api
    get isLoading() {
        return this._isLoading;
    }
    set isLoading(value) {
        this._isLoading = !!value;
    }

    generateItems() {
        const items = [...this.items];
        for (let i = 1; i <= 10; i++) {
            const id = items.length + 1;
            const item = {
                avatar: {
                    iconName: `custom:custom${this.getRandomNumber()}`
                },
                value: `item-${id}`,
                title: `Item #${id}`,
                description: `Description of the item #${id}.`
            };
            items.push(item);
        }
        this.items = items;
    }

    getRandomNumber() {
        return Math.floor(Math.random() * 112) + 1;
    }

    handleItemsVisibilityToggle(event) {
        const { show, visibleItemsLength } = event.detail;
        if (!show) {
            this.items = this.items.slice(0, visibleItemsLength);
        }
    }

    handleLoadMore() {
        if (this.items.length >= 100) {
            this._isLoading = false;
            return;
        }
        this._isLoading = true;
        clearTimeout(this._loadMoreTimeout);
        this._loadMoreTimeout = setTimeout(() => {
            this._isLoading = false;
            this.generateItems();
        }, 1000);
    }
}
