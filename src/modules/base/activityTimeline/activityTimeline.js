/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2021, Avonni Labs, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { LightningElement, api, track } from 'lwc';
import {
    normalizeBoolean,
    normalizeString,
    normalizeArray
} from 'c/utilsPrivate';

const validGroupByOptions = {
    valid: ['week', 'month', 'year'],
    default: undefined
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

    @track ungroupedItems = [];
    @track orderedDates = [];

    connectedCallback() {
        this.initActivityTimeline();
        this.connected = true;
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
    get items() {
        return this._items;
    }

    set items(value) {
        this._items = normalizeArray(value);
        if (this.connected) {
            this.initActivityTimeline();
        }
    }

    @api
    get actions() {
        return this._actions;
    }

    set actions(value) {
        this._actions = normalizeArray(value);
    }

    getNumberOfWeek(date) {
        const today = new Date(date);
        const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
        const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    }

    sortItems() {
        this._sortedItems = [...this.items];
        this._sortedItems.sort((a, b) => b.datetimeValue - a.datetimeValue);
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
                } else if (this._groupBy === 'week' || !this._groupBy) {
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
        this._upcomingDates = this._upcomingDates.reduce((prev, cur) => {
            this._key = 'Upcoming';
            if (!prev[this._key]) {
                prev[this._key] = [cur];
            } else {
                prev[this._key].push(cur);
            }
            return prev;
        }, []);

        this._beforeDates = this._beforeDates.reduce((prev, cur) => {
            const date = new Date(cur.datetimeValue);
            if (this._groupBy === 'month') {
                this._key = `${date.toLocaleString('en-EN', {
                    month: 'long'
                })} ${date.getFullYear()}`;
            } else if (this._groupBy === 'week' || !this._groupBy) {
                this._key = `Week: ${this.getNumberOfWeek(
                    date
                )}, ${date.getFullYear()}`;
            } else if (this._groupBy === 'year') {
                this._key = `${date.getFullYear()}`;
            }

            if (!prev[this._key]) {
                prev[this._key] = [cur];
            } else {
                prev[this._key].push(cur);
            }
            return prev;
        }, []);

        Object.keys(this._upcomingDates).forEach((date) => {
            this.orderedDates.push({
                label: date,
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
            object.items.sort((a, b) => a.datetimeValue - b.datetimeValue);
        });
    }

    createUngroupedItems() {
        // we need this function to have the dates ordered by dates and hours
        this.orderedDates.forEach((group) => {
            this.ungroupedItems.push(group.items);
        });
        this.ungroupedItems = this.ungroupedItems.reduce(
            (acc, val) => acc.concat(val),
            []
        );
    }

    initActivityTimeline() {
        this.sortItems();
        this.sortDates();
        this.groupDates();
        this.sortHours();
        this.createUngroupedItems();
    }

    get hasDates() {
        return this.orderedDates.length > 0;
    }

    get hasHeader() {
        return this.title || this.iconName;
    }

    get noGroupBy() {
        return !this.groupBy;
    }
}
