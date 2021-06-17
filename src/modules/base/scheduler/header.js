import { generateUniqueId } from 'c/utils';
import {
    UNITS_IN_MS,
    DEFAULT_VISIBLE_SPAN,
    DEFAULT_START_DATE,
    DEFAULT_AVAILABLE_TIME_FRAMES
} from './defaults';
import { formatTime, isInTimeFrame } from './dateUtils';

export default class Header {
    constructor(props) {
        this.key = this.generateKey;
        this.unit = props.unit;
        this.span = props.span;
        this.label = props.label;
        this.columnLabels = [];
        this._millisecondsPerCol = UNITS_IN_MS[this.unit] * this.span;
        this._millisecondsVisible =
            UNITS_IN_MS[DEFAULT_VISIBLE_SPAN.unit] * DEFAULT_VISIBLE_SPAN.span;
        this._start = DEFAULT_START_DATE;
        this._timeFrames = DEFAULT_AVAILABLE_TIME_FRAMES;
    }

    get millisecondsVisible() {
        return this._millisecondsVisible;
    }
    set millisecondsVisible(value) {
        this._millisecondsVisible = value;
        this.computeColumnLabels();
    }

    get start() {
        return this._start;
    }
    set start(value) {
        this._start = value;
        this.computeColumnLabels();
    }

    get timeFrames() {
        return this._timeFrames;
    }
    set timeFrames(value) {
        this._timeFrames = value;
        this.computeColumnLabels();
    }

    get generateKey() {
        return generateUniqueId();
    }

    get numberOfColumns() {
        let millisecondsTotal = this._millisecondsPerCol;
        let numberOfCols = 1;
        while (millisecondsTotal < this.millisecondsVisible) {
            numberOfCols += 1;
            millisecondsTotal += this._millisecondsPerCol;
        }

        return numberOfCols;
    }

    get columnMaxWidth() {
        return `${100 / this.columnLabels.length}%`;
    }

    computeColumnLabels() {
        const columnLabels = [];
        let time = this.start.getTime();

        // For each column
        for (let i = 0; i < this.numberOfColumns; i++) {
            // Check if time is in allowed time frames
            let j = 0;
            let isInTimeFrames = false;
            while (!isInTimeFrames && j < this.timeFrames.length) {
                isInTimeFrames = isInTimeFrame(time, this.timeFrames[j]);
                j += 1;
            }

            if (isInTimeFrames) {
                // Create a column with the formatted label
                columnLabels.push(formatTime(time, this.label));
            }
            time += this._millisecondsPerCol;
        }
        this.columnLabels = columnLabels;
    }
}
