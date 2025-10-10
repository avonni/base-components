import { LightningElement, api } from 'lwc';
import { dateTimeObjectFrom, addToDate } from 'c/luxonDateTimeUtils';
import { Interval, DateTime } from 'c/luxon';

export default class PrimitiveSchedulerHeaderGroup extends LightningElement {
    @api availableDaysOfTheWeek;
    @api availableMonths;
    @api availableTimeFrames;
    @api availableTimeSpans;
    @api headers;
    @api isMobileView;
    @api scrollLeftOffset;
    @api variant;
    @api visibleWidth;
    @api timezone;
    @api weekStartDay;
    @api zoomToFit;

    _start;

    _connected = false;

    connectedCallback() {
        if (!this.start) {
            throw new Error('Please set a valid start date');
        }

        this.dispatchHeaderChange();
        this._connected = true;
    }

    @api
    get start() {
        return this._start;
    }
    set start(value) {
        const start = dateTimeObjectFrom(value, { zone: this.timezone });
        if (this._start && this._start.ts === start.ts) {
            // Prevent an infinite loop
            return;
        }
        this._start = start;

        if (this._connected) {
            this.dispatchHeaderChange();
        }
    }

    @api
    get timeSpan() {
        return this._timeSpan;
    }
    set timeSpan(value) {
        if (
            this._timeSpan &&
            JSON.stringify(value) === JSON.stringify(this._timeSpan)
        ) {
            // Prevent an infinite loop
            return;
        }
        this._timeSpan = value;

        if (this._connected) {
            this.dispatchHeaderChange();
        }
    }

    @api
    get visibleInterval() {
        return Interval.fromDateTimes(this.start, this.end);
    }

    get end() {
        const { unit, span } = this.timeSpan;
        let end = this.start.plus({ [unit]: span });
        return DateTime.fromMillis(end.ts - 1);
    }

    dispatchHeaderChange() {
        // Create the smallestHeader
        const cells = [];
        let start = this.start;
        for (let i = 0; i < 100; i++) {
            const end = start.endOf('day');
            cells.push({
                start: start.ts,
                end: end.ts
            });
            start = addToDate(start, 'day', 1).startOf('day');
        }

        this.dispatchEvent(
            new CustomEvent('privateheaderchange', {
                detail: {
                    smallestHeader: {
                        cells,
                        start: this.start,
                        end: this.end
                    },
                    visibleInterval: this.visibleInterval
                }
            })
        );
    }
}
