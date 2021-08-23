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
    _previousLimitTime;
    _visibleInterval;
    computedHeaders = [];

    connectedCallback() {
        this.initHeaders();
    }

    renderedCallback() {
        if (!this._cellWidth) {
            const cell = this.template.querySelector(
                '.scheduler__row:last-of-type .scheduler__cell span'
            );
            // We add 20 pixels for padding
            this._cellWidth =
                Math.ceil(cell.getBoundingClientRect().width) + 20;

            this.dispatchEvent(new CustomEvent('privatecellwidthchange', {
                detail: {
                    cellWidth: this._cellWidth
                }
            }));
        }

        if (!this._numberOfVisibleCells) {
            const totalWidth = this.template.host.getBoundingClientRect().width;
            const endIndex = Math.ceil(totalWidth / this._cellWidth);
            this._numberOfVisibleCells = endIndex;

            this.scrollHeadersTo(0);

            this.dispatchEvent(new CustomEvent('privateheaderheightchange'));
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
    get previousLimitTime() {
        return this._previousLimitTime;
    }

    @api
    get visibleInterval() {
        return this._visibleInterval;
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
        const sortedHeaders = [...this.headers].sort((firstHeader, secondHeader) => {
            const firstIndex = UNITS.findIndex(
                (unit) => unit === firstHeader.unit
            );
            const secondIndex = UNITS.findIndex(
                (unit) => unit === secondHeader.unit
            );
            return secondIndex - firstIndex;
        });

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

        // Make sure the reference end is at the end of the smallest header unit
        const referenceEnd = DateTime.fromMillis(
            reference.columns[reference.columns.length - 1].end
        );
        reference.end = referenceEnd.endOf(
            sortedHeaders[sortedHeaders.length - 1].unit
        );

        this._referenceHeader = reference;
        this.computedHeaders = headerObjects;

        // On next render, reset the cells calculation
        this._cellWidth = undefined;
        this._numberOfVisibleCells = undefined;

        this.dispatchEvent(new CustomEvent('privateheaderchange', {
            detail: {
                smallestHeader: this.smallestHeader
            }
        }));
    }

    @api
    scrollHeadersTo(startIndex) {
        // const startTime = dateTimeObjectFrom(this.smallestHeader.columns[startIndex].start);
        const endIndex = startIndex + this._numberOfVisibleCells * 5 + 1;
        const visibleInterval = this.getVisibleIntervalFromStartIndex(
                startIndex
            );

        // Save the previous end time of the visible schedule,
        // depending on the scroll direction
        const limitCell =
            startIndex &&
            (startIndex > this._visibleColumnsStartIndex
                ? this.template.querySelector('.scheduler__row:last-of-type .scheduler__cell:last-of-type')
                : this.template.querySelector('.scheduler__row:last-of-type .scheduler__cell'));
        const limitTime =
            limitCell && dateTimeObjectFrom(Number(limitCell.dataset.end));

        // this.computedHeaders.forEach(header => header.initColumns(startTime));

        // Filter only the header columns that are visible on the screen
        [...this.computedHeaders].reverse().forEach((header, index) => {
            if (index === 0) {
                // The smallest header will always have the same number of columns
                header.visibleColumns = header.columns.slice(
                    startIndex,
                    endIndex
                );
            } else {
                // The other headers may change their number of columns
                header.visibleColumns = header.columns.filter((column) => {
                    const from = dateTimeObjectFrom(column.start);
                    const to = dateTimeObjectFrom(column.end);

                    return (
                        visibleInterval.contains(from) ||
                        visibleInterval.contains(to) ||
                        (visibleInterval.isAfter(from) &&
                            visibleInterval.isBefore(to))
                    );
                });
            }

            // On the first render, compute the headers width.
            // On other renders, update only the width of the headers
            // that were cut by the schedule visible limit
            if (
                !limitTime ||
                (header.start <= limitTime && header.end >= limitTime)
            ) {
                header.computeColumnWidths(
                    this._cellWidth,
                    this.smallestHeader.visibleColumns
                );
            }
        });

        this._visibleInterval = visibleInterval;
        this._previousLimitTime = limitTime;

        this.dispatchEvent(new CustomEvent('privatevisibleheaderchange', {
            detail: {
                previousLimitTime: limitTime,
                startIndex,
                visibleCells: this._numberOfVisibleCells,
                visibleInterval
            }
        }));
    }

    getVisibleIntervalFromStartIndex(startIndex) {
        const columns = this.smallestHeader.columns;
        const cells = this._numberOfVisibleCells;

        const startCol = columns[startIndex] || columns[0];
        const start = dateTimeObjectFrom(startCol.start);

        const endIndex = startIndex + cells * 5;
        const endCol = columns[endIndex] || columns[columns.length - 1];
        const end = dateTimeObjectFrom(endCol.end);

        return Interval.fromDateTimes(start, end);
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
}
