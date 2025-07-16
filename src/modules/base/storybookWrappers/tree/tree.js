import { LightningElement, api } from 'lwc';

const MAX_LOADED_ITEMS = 20;
const LOADING_OFFSET = 5;

export default class Tree extends LightningElement {
    @api actions;
    @api actionsWhenDisabled;
    @api allowInlineEdit;
    @api collapseDisabled;
    @api editableFields;
    @api header;
    @api independentMultiSelect;
    @api isMultiSelect;
    @api loadingStateAlternativeText;
    @api placeholder;
    @api selectedItems;
    @api sortable;

    _enableInfiniteLoading = false;
    _isLoading = false;
    _items = [];

    /*
     * -------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        if (!this.items.length) {
            this.loadMoreItems();
        }
    }

    /*
     * -------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

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
        this._items = value || [];
    }

    /*
     * -------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    addItems(level, parent) {
        const start = level.length;
        for (let i = 0; i < LOADING_OFFSET; i++) {
            const number = i + start;
            const name = parent ? `${parent.name}-${number}` : `item-${number}`;
            level.push({
                label: `Item ${number}`,
                name,
                items: [],
                enableInfiniteLoading: Math.random() < 0.5
            });
        }
    }

    getItem(levelPath = []) {
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

    loadMoreItems(levelPath) {
        const parent = this.getItem(levelPath);

        let level;
        if (parent) {
            level = parent.items;
            parent.isLoading = true;
            this._items = [...this.items];
        } else {
            level = this.items;
            this._isLoading = true;
        }

        setTimeout(() => {
            this.addItems(level, parent);
            const allLoaded = level.length >= MAX_LOADED_ITEMS;
            if (parent) {
                parent.isLoading = false;
                if (allLoaded) {
                    parent.enableInfiniteLoading = false;
                }
            } else {
                this._isLoading = false;
                if (allLoaded) {
                    this._enableInfiniteLoading = false;
                }
            }
            this._items = [...this.items];
        }, 1000);
    }

    /*
     * -------------------------------------------------------------
     *  EVENT HANDLERS
     * -------------------------------------------------------------
     */

    handleLoadMore(event) {
        this.loadMoreItems(event.detail.levelPath);
    }

    handleSelect(event) {
        // Prevent the links from navigating
        event.preventDefault();
    }
}
