import { api, LightningElement } from 'lwc';

export default class InfiniteLoadingUsingShowMore extends LightningElement {
    _isLoading = false;
    _maxCount;

    _showMoreTimeout;
    computedMaxCount = Infinity;
    items = [];

    connectedCallback() {
        this.generateItems();
    }

    @api
    get isLoading() {
        return this._isLoading;
    }
    set isLoading(value) {
        this._isLoading = !!value;
    }

    @api
    get maxCount() {
        return this._maxCount;
    }
    set maxCount(value) {
        const number = parseInt(value, 10);
        if (isNaN(number) || number < 0) {
            return;
        }
        this._maxCount = number;
        this.computedMaxCount = this._maxCount;
    }

    generateItems() {
        const max = this.maxCount + 1;
        for (let i = 1; i <= max; i++) {
            const id = this.items.length + 1;
            const item = {
                fallbackIconName: `custom:custom${this.getRandomNumber()}`,
                name: `item-${id}`,
                primaryText: `Item #${id}`,
                secondaryText: `Description of the item #${id}.`
            };
            this.items.push(item);
        }
        this.items = [...this.items];
    }

    getRandomNumber() {
        return Math.floor(Math.random() * 112) + 1;
    }

    handleItemsVisibilityToggle(event) {
        event.preventDefault();

        if (this.items.length < 20) {
            this._isLoading = true;

            clearTimeout(this._showMoreTimeout);
            this._showMoreTimeout = setTimeout(() => {
                this._isLoading = false;
                this.generateItems();
                this.computedMaxCount = this.items.length - 1;
            }, 1000);
        } else {
            this.computedMaxCount = Infinity;
        }
    }
}
