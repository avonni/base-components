import { api, LightningElement } from 'lwc';

export default class InfiniteLoadingAvatarGroup extends LightningElement {
    @api actionIconName;
    @api layout;
    @api listButtonShowLessIconName;
    @api listButtonShowLessIconPosition;
    @api listButtonShowLessLabel;
    @api listButtonShowMoreIconName;
    @api listButtonShowMoreIconPosition;
    @api listButtonShowMoreLabel;
    @api listButtonVariant;
    @api loadMoreOffset;
    @api maxCount;
    @api name;
    @api size;
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
        const items = [];
        for (let i = 1; i <= 10; i++) {
            const id = this.items.length + i;
            const item = {
                fallbackIconName: `custom:custom${this.getRandomNumber()}`,
                name: `item-${id}`,
                primaryText: `Item ${id}`,
                secondaryText: `Description of the item #${id}.`
            };
            items.push(item);
        }
        this.items = this.items.concat(items);
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
