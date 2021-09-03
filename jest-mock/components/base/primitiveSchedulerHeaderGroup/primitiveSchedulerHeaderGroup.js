import { LightningElement, api } from 'lwc';
import { Interval } from 'c/luxon';
import { dateTimeObjectFrom, addToDate } from 'c/utilsPrivate';

export default class PrimitiveSchedulerHeaderGroup extends LightningElement {
    @api availableDaysOfTheWeek;
    @api availableMonths;
    @api availableTimeFrames;
    @api headers;
    @api scrollLeftOffset;
    @api timeSpan;
    @api visibleInterval;

    _rendered = false;
    _start;

    connectedCallback() {
        if (!this.start) {
            throw new Error('Please set a valid start date');
        }

        this.dispatchEvent(
            new CustomEvent('privateheaderregister', {
                detail: {
                    callbacks: {
                        scrollHeadersTo: this.scrollHeadersTo.bind(this)
                    }
                }
            })
        );

        // Create the smallestHeader
        const columns = [];
        let start = this.start;
        for (let i = 0; i < 100; i++) {
            const end = start.endOf('day');
            columns.push({
                start: start.ts,
                end: end.ts
            });
            start = addToDate(start, 'day', 1).startOf('day');
        }

        this.dispatchEvent(
            new CustomEvent('privateheaderchange', {
                detail: {
                    smallestHeader: {
                        columns,
                        start: this.start,
                        end: columns[columns.length - 1].end
                    }
                }
            })
        );
    }

    renderedCallback() {
        if (!this._rendered) {
            const start = this.start;
            const end = addToDate(start, 'month', 3);
            this.dispatchEvent(
                new CustomEvent('privatevisibleheaderchange', {
                    detail: {
                        visibleCells: 0,
                        visibleInterval: Interval.fromDateTimes(start, end)
                    }
                })
            );

            this._rendered = true;
        }
    }

    @api
    get start() {
        return this._start;
    }
    set start(value) {
        this._start = dateTimeObjectFrom(value);
    }

    scrollHeadersTo() {
        return true;
    }
}
