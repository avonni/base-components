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
