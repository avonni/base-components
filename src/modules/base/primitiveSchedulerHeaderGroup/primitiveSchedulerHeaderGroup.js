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

import { LightningElement, api } from 'lwc';
import { DateTime, Interval } from 'c/luxon';
import {
    addToDate,
    dateTimeObjectFrom,
    numberOfUnitsBetweenDates,
    normalizeArray
} from 'c/utilsPrivate';
import SchedulerHeader from './header';

const UNITS = ['minute', 'hour', 'day', 'week', 'month', 'year'];

export default class PrimitiveSchedulerHeaderGroup extends LightningElement {
    @api start;

    _availableDaysOfTheWeek = [];
    _availableMonths = [];
    _availableTimeFrames = [];
    _headers = [];
    _visibleSpan = {};

    _cellWidth = 0;
    _numberOfVisibleCells = 0;
    _previousStartTimes = [];
    computedHeaders = [];

    connectedCallback() {
        this.initHeaders();
    }

    renderedCallback() {
        if (!this._cellWidth) {
            const cellText = this.template.querySelector(
                '.scheduler__row:last-of-type .scheduler__cell span'
            );
            // We add 20 pixels for padding
            this._cellWidth =
                Math.ceil(cellText.getBoundingClientRect().width) + 20;
            this.dispatchCellWidth();
        }

        if (!this._numberOfVisibleCells) {
            const totalWidth = this.template.host.getBoundingClientRect().width;
            this._numberOfVisibleCells = Math.ceil(
                totalWidth / this._cellWidth
            );

            // If the maximum number of visible cells on the screen is bigger
            // than the actual number of cells, recompute the cell width so the
            // schedule takes the full screen
            if (
                this.smallestHeader.numberOfColumns < this._numberOfVisibleCells
            ) {
                this._numberOfVisibleCells = this.smallestHeader.numberOfColumns;
                this._cellWidth = totalWidth / this._numberOfVisibleCells;
                this.dispatchCellWidth();
            }

            this.scrollHeadersTo();
            this.dispatchEvent(new CustomEvent('privateheaderheightchange'));
            return;
        }

        this.updateCellsWidths();
    }

    @api
    get availableDaysOfTheWeek() {
        return this._availableDaysOfTheWeek;
    }
    set availableDaysOfTheWeek(value) {
        this._availableDaysOfTheWeek = normalizeArray(value);
        if (this.isConnected) this.initHeaders();
    }

    @api
    get availableMonths() {
        return this._availableMonths;
    }
    set availableMonths(value) {
        this._availableMonths = normalizeArray(value);
        if (this.isConnected) this.initHeaders();
    }

    @api
    get availableTimeFrames() {
        return this._availableTimeFrames;
    }
    set availableTimeFrames(value) {
        this._availableTimeFrames = normalizeArray(value);
        if (this.isConnected) this.initHeaders();
    }

    @api
    get headers() {
        return this._headers;
    }
    set headers(value) {
        this._headers = normalizeArray(value);
        if (this.isConnected) this.initHeaders();
    }

    @api
    get visibleSpan() {
        return this._visibleSpan;
    }
    set visibleSpan(value) {
        this._visibleSpan = typeof value === 'object' ? value : {};
        if (this.isConnected) this.initHeaders();
    }

    @api
    get visibleInterval() {
        if (!this.smallestHeader) return undefined;

        const columns = this.smallestHeader.columns;
        const lastIndex = columns.length - 1;
        const start = dateTimeObjectFrom(columns[0].start);
        const end = dateTimeObjectFrom(columns[lastIndex].end);
        return Interval.fromDateTimes(start, end);
    }

    get end() {
        if (this._referenceHeader && this._referenceHeader.end) {
            return this._referenceHeader.end;
        }
        const visibleSpanEnd = addToDate(
            this.start,
            this.visibleSpan.unit,
            this.visibleSpan.span
        );
        // We take one millisecond off to exclude the next unit
        return DateTime.fromMillis(visibleSpanEnd - 1);
    }

    get smallestHeader() {
        if (!this.computedHeaders.length) return null;

        const lastIndex = this.computedHeaders.length - 1;
        return this.computedHeaders[lastIndex];
    }

    initHeaders() {
        // Sort the headers from the longest unit to the shortest
        const sortedHeaders = [...this.headers].sort(
            (firstHeader, secondHeader) => {
                const firstIndex = UNITS.findIndex(
                    (unit) => unit === firstHeader.unit
                );
                const secondIndex = UNITS.findIndex(
                    (unit) => unit === secondHeader.unit
                );
                return secondIndex - firstIndex;
            }
        );

        // Create the reference header
        // The reference header is the header using the visibleSpan unit
        const referenceUnit = this.visibleSpan.unit;
        const referenceHeader = sortedHeaders.find(
            (header) => header.unit === referenceUnit
        );

        const referenceColumns = numberOfUnitsBetweenDates(
            referenceUnit,
            this.start,
            this.end
        );

        const referenceSpan = referenceHeader
            ? referenceHeader.span
            : this.visibleSpan.span;

        const reference = new SchedulerHeader({
            unit: referenceUnit,
            span: referenceSpan,
            duration: this.visibleSpan.span,
            label: referenceHeader ? referenceHeader.label : '',
            start: this.start,
            end: this.end,
            availableTimeFrames: this.availableTimeFrames,
            availableDaysOfTheWeek: this.availableDaysOfTheWeek,
            availableMonths: this.availableMonths,
            numberOfColumns: referenceColumns / referenceSpan,
            isReference: true,
            // If there is no header using the visibleSpan unit,
            // hide the reference header
            isHidden: !referenceHeader
        });

        // Make sure the reference end is at the end of the smallest header unit
        reference.end = reference.end.endOf(
            sortedHeaders[sortedHeaders.length - 1].unit
        );

        // Create all headers
        const headerObjects = [];
        sortedHeaders.forEach((header) => {
            const unit = header.unit;
            let headerObject;

            // If the current header is the reference, use the already made header object
            if (
                reference &&
                referenceUnit === unit &&
                reference.label === header.label
            ) {
                headerObject = reference;
            } else {
                const columns = numberOfUnitsBetweenDates(
                    unit,
                    this.start,
                    this.end
                );

                headerObject = new SchedulerHeader({
                    unit: unit,
                    span: header.span,
                    label: header.label,
                    start: reference.start,
                    end: this.end,
                    availableTimeFrames: this.availableTimeFrames,
                    availableDaysOfTheWeek: this.availableDaysOfTheWeek,
                    availableMonths: this.availableMonths,
                    numberOfColumns: columns / header.span
                });
            }

            headerObjects.push(headerObject);

            // Update the reference end if the current header ended before the reference
            if (headerObject.end < reference.end) {
                reference.end = headerObject.end;
            } else {
                headerObject.end = reference.end;
            }
        });

        this._referenceHeader = reference;
        this.computedHeaders = headerObjects;

        // On next render, reset the cells calculation
        this._cellWidth = undefined;
        this._numberOfVisibleCells = undefined;

        this.dispatchEvent(
            new CustomEvent('privateheaderchange', {
                detail: {
                    smallestHeader: this.smallestHeader
                }
            })
        );
    }

    @api
    scrollHeadersTo(direction) {
        let startTime;
        if (!this._previousStartTimes.length) {
            startTime = DateTime.fromMillis(this.start.ts);
            this._previousStartTimes = [startTime];
        } else if (direction === 'left') {
            const lastIndex = this._previousStartTimes.length - 1;
            if (lastIndex > -1) {
                startTime = this._previousStartTimes[lastIndex];
                this._previousStartTimes.pop();
            } else return;
        } else {
            const startColumn = this.smallestHeader.columns[
                this._numberOfVisibleCells
            ];
            if (startColumn) {
                startTime = dateTimeObjectFrom(startColumn.start);
                this._previousStartTimes.push(startTime);
            } else return;
        }

        const previousInterval = Interval.fromDateTimes(
            this.visibleInterval.s,
            this.visibleInterval.e
        );

        [...this.computedHeaders].reverse().forEach((header) => {
            if (header !== this.smallestHeader) {
                const lastIndex = this.smallestHeader.columns.length - 1;
                header.end = this.smallestHeader.columns[lastIndex].end;
            }
            header.initColumns(startTime);
            header.computeColumnWidths(
                this._cellWidth,
                this.smallestHeader.columns
            );
        });
        this.computedHeaders = [...this.computedHeaders];

        this.dispatchEvent(
            new CustomEvent('privatevisibleheaderchange', {
                detail: {
                    direction,
                    visibleCells: this._numberOfVisibleCells,
                    visibleInterval: this.visibleInterval,
                    previousInterval
                }
            })
        );
    }

    updateCellsWidths() {
        // Get rows and sort them from the shortest unit to the longest
        const rows = Array.from(
            this.template.querySelectorAll('.scheduler__row')
        ).reverse();

        rows.forEach((row) => {
            const header = this.computedHeaders.find((computedHeader) => {
                return computedHeader.key === row.dataset.key;
            });

            // Give cells their width
            const cells = row.querySelectorAll('.scheduler__cell');
            cells.forEach((cell, index) => {
                cell.style = `--avonni-scheduler-cell-width: ${header.columnWidths[index]}px`;
            });
        });
    }

    dispatchCellWidth() {
        this.dispatchEvent(
            new CustomEvent('privatecellwidthchange', {
                detail: {
                    cellWidth: this._cellWidth
                }
            })
        );
    }
}
