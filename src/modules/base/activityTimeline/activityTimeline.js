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

    _key;
    _sortedItems = [];
    _beforeDates = [];
    _upcomingDates = [];
    orderedDates = [];

    connectedCallback() {
        this.initActivityTimeline()
        this.connected = true
    }

    @api
    get collapsible() {
        return this._collapsible;
    }

    set collapsible(value) {
        this._collapsible = normalizeBoolean(value);
        if (this.connected) {
            this.initActivityTimeline()
        }
    }

    @api
    get closed() {
        return this._closed;
    }

    set closed(value) {
        this._closed = normalizeBoolean(value);
        if (this.connected) {
            this.initActivityTimeline()
        }
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
        if (this.connected) {
            this.initActivityTimeline()
        }
    }

    @api
    get items() {
        return this._items;
    }

    set items(value) {
        this._items = normalizeArray(value);
        if (this.connected) {
            this.initActivityTimeline()
        }
    }

    @api
    get actions() {
        return this._actions;
    }

    set actions(value) {
        this._actions = normalizeArray(value);
        if (this.connected) {
            this.initActivityTimeline()
        }
    }

    getNumberOfWeek(date) {
        const today = new Date(date);
        const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
        const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    }

    sortItems() {
        this._sortedItems = [...this.items];
        this._sortedItems.sort(function (a, b) {
            return a.datetimeValue + b.datetimeValue;
        });
    }

    sortDates() {
        this._sortedItems.forEach((item) => {
            const date = new Date(item.datetimeValue);
            const today = new Date();
            if (date.getFullYear() > today.getFullYear()) {
                this._upcomingDates.push(item);
            } else if (date.getFullYear() <= today.getFullYear()) {
                if (this._groupBy === 'month') {
                    if (date.getMonth() > today.getMonth()) {
                        this._upcomingDates.push(item);
                    } else if (date.getMonth() <= today.getMonth()) {
                        this._beforeDates.push(item);
                    }
                } else if (this._groupBy === 'year') {
                    this._beforeDates.push(item);
                } else if (this._groupBy === 'week') {
                    if (
                        this.getNumberOfWeek(date) > this.getNumberOfWeek(today)
                    ) {
                        this._upcomingDates.push(item);
                    } else if (
                        this.getNumberOfWeek(date) <=
                        this.getNumberOfWeek(today)
                    ) {
                        this._beforeDates.push(item);
                    }
                }
            }
        });
    }

    groupDates() {
        this._beforeDates = this._beforeDates.reduce((prev, cur) => {
            const date = new Date(cur.datetimeValue);
            if (this._groupBy === 'month') {
                this._key = `${date.toLocaleString('en-EN', {
                    month: 'long'
                })} ${date.getFullYear()}`;
            } else if (this._groupBy === 'week') {
                this._key = `Week: ${this.getNumberOfWeek(
                    date
                )}, ${date.getFullYear()}`;
            } else if (this._groupBy === 'year') {
                this._key = `${date.getFullYear()} `;
            }

            if (!prev[this._key]) {
                prev[this._key] = [cur];
            } else {
                prev[this._key].push(cur);
            }
            return prev;
        }, []);

        this._upcomingDates = this._upcomingDates.reduce((prev, cur) => {
            this._key = 'Upcoming';
            if (!prev[this._key]) {
                prev[this._key] = [cur];
            } else {
                prev[this._key].push(cur);
            }
            return prev;
        }, []);

        Object.keys(this._upcomingDates).forEach((date, index) => {
            this.orderedDates.push({
                index: index,
                label: 'Upcoming',
                items: this._upcomingDates[date]
            });
        });

        Object.keys(this._beforeDates).forEach((date) => {
            this.orderedDates.push({
                label: date,
                items: this._beforeDates[date]
            });
        });
    }

    sortHours() {
        this.orderedDates.forEach((object) => {
            object.items.sort(function (a, b) {
                return a.datetimeValue - b.datetimeValue;
            });
        });
    }

    initActivityTimeline() {
        this.sortItems();
        this.sortDates();
        this.groupDates();
        this.sortHours();
    }

    get hasDates() {
        return this.orderedDates.length > 0
    }
}
