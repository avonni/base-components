import { LightningElement, api } from 'lwc';
import {
    normalizeBoolean,
    normalizeString,
    normalizeArray
} from 'c/utilsPrivate';

const validGroupByOptions = {
    valid: ['week', 'month', 'year'],
    default: 'week'
};
const validVariants = { valid: ['base', 'shaded'], default: 'base' };

export default class ActivityTimeline extends LightningElement {
    @api title;
    @api iconName;

    _collapsible = false;
    _closed = false;
    _groupBy = validGroupByOptions.default;
    _variant = validVariants.default;
    _items = [];

    @api
    get collapsible() {
        return this._collapsible;
    }

    set collapsible(value) {
        this._collapsible = normalizeBoolean(value);
    }

    @api
    get closed() {
        return this._closed;
    }

    set closed(value) {
        this._closed = normalizeBoolean(value);
    }

    @api
    get groupBy() {
        return this._groupBy;
    }

    set groupBy(value) {
        this._groupBy = normalizeString(value, {
            fallbackValue: validGroupByOptions.default,
            validValues: validGroupByOptions.valid
        });
    }

    @api
    get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: validVariants.default,
            validValues: validVariants.valid
        });
    }

    @api
    get items() {
        return this._items;
    }

    set items(value) {
        this._items = normalizeArray(value);
    }
}
