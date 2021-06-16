import { generateUniqueId } from 'c/utils';
import { UNITS_IN_MINUTES, DEFAULT_VISIBLE_SPAN } from './defaults';

export default class Header {
    constructor(props) {
        this.key = this.generateKey;
        this.unit = props.unit;
        this.span = props.span;
        this.label = props.label;
        this.columnLabels = [];
        this._minutesVisible =
            UNITS_IN_MINUTES[DEFAULT_VISIBLE_SPAN.unit] *
            DEFAULT_VISIBLE_SPAN.span;
    }

    get minutesVisible() {
        return this._minutesVisible;
    }
    set minutesVisible(value) {
        this._minutesVisible = value;
        this.computeColumnLabels();
    }

    get generateKey() {
        return generateUniqueId();
    }

    get numberOfColumns() {
        const minutesPerCol = UNITS_IN_MINUTES[this.unit] * this.span;
        let minutesTotal = minutesPerCol;
        let numberOfCols = 1;
        while (minutesTotal < this.minutesVisible) {
            numberOfCols += 1;
            minutesTotal += minutesPerCol;
        }

        return numberOfCols;
    }

    computeColumnLabels() {
        const columnLabels = [];
        for (let i = 0; i < this.numberOfColumns; i++) {
            columnLabels.push(`${i} - ${this.label}`);
        }
        this.columnLabels = columnLabels;
    }
}
