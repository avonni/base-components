import { LightningElement } from 'lwc';

const MAX_LOADED_ITEMS = 20;
const LOADING_OFFSET = 5;

export default class TreeInfiniteLoading extends LightningElement {
    enableInfiniteLoading = true;
    isLoading = false;
    items = [];

    connectedCallback() {
        this._loadMoreItems();
    }

    _addItems(level) {
        const start = level.length;
        for (let i = 0; i < LOADING_OFFSET; i++) {
            const number = i + start;
            level.push({
                label: `Item ${number}`,
                name: `item-${number}`,
                items: [],
                enableInfiniteLoading: Math.random() < 0.5
            });
        }
    }

    _getItem(levelPath = []) {
        let level = this.items;
        let item;
        for (let i = 0; i < levelPath.length; i++) {
            const index = levelPath[i];
            item = level[index];
            if (!item || !item.items) {
                break;
            }
            level = item.items;
        }
        return item;
    }

    _loadMoreItems(levelPath) {
        const parent = this._getItem(levelPath);

        let level;
        if (parent) {
            level = parent.items;
            parent.isLoading = true;
            this.items = [...this.items];
        } else {
            level = this.items;
            this.isLoading = true;
        }

        setTimeout(() => {
            this._addItems(level);
            const allLoaded = level.length >= MAX_LOADED_ITEMS;
            if (parent) {
                parent.isLoading = false;
                if (allLoaded) {
                    parent.enableInfiniteLoading = false;
                }
            } else {
                this.isLoading = false;
                if (allLoaded) {
                    this.enableInfiniteLoading = false;
                }
            }
            this.items = [...this.items];
        }, 1000);
    }

    handleLoadMore(event) {
        this._loadMoreItems(event.detail.levelPath);
    }
}
