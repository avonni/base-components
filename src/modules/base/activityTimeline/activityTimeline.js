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
    _actions = [];
    groupDates = [];
    orderedDates = [];
    key;

    connectedCallback() {
        this.groupedBy();
    }

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

    @api
    get actions() {
        return this._actions;
    }

    set actions(value) {
        this._actions = normalizeArray(value);
    }

    groupedBy() {
        this.groupDates = this.items.reduce((prev, cur) => {
            const date = new Date(cur.datetimeValue);
            if (this._groupBy === 'month') {
                this.key = `${date.getMonth() + 1}-${date.getFullYear()}`;
            } else if (this._groupBy === 'week') {
                this.key = `${this.getNumberOfWeek(
                    date
                )}-${date.getFullYear()}`;
            } else if (this._groupBy === 'year') {
                this.key = `${date.getFullYear()}`;
            }

            if (!prev[this.key]) {
                prev[this.key] = [cur];
            } else {
                prev[this.key].push(cur);
            }

            return prev;
        }, []);
        Object.keys(this.groupDates).forEach((date) => {
            this.orderedDates.push({
                label: date,
                items: this.groupDates[date]
            });
        });
    }

    getNumberOfWeek(date) {
        const today = new Date(date);
        const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
        const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    }
}
