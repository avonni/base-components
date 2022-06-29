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

import { addToDate, dateTimeObjectFrom, isAllowedTime } from 'c/utilsPrivate';

export default class CalendarData {
    columns = [];
    cells = [];

    dayTimeSpan = {
        unit: 'day',
        span: 1
    };

    horizontalHeaders = [
        {
            label: 'ccc dd',
            unit: 'day',
            span: 1
        }
    ];

    verticalHeaders = [
        {
            label: 'h a',
            unit: 'hour',
            span: 1
        }
    ];

    constructor(scheduler) {
        this.scheduler = scheduler;
    }

    get resourceOptions() {
        return this.scheduler.computedResources.map((res) => {
            return {
                label: res.label || res.name,
                value: res.name
            };
        });
    }

    initHeaders(timeSpan) {
        const startDate = new Date(this.scheduler.start.ts);
        startDate.setHours(0, 0, 0, 0);

        let hour = dateTimeObjectFrom(startDate);
        const availableHours = [];
        for (let i = 0; i < 24; i++) {
            if (isAllowedTime(hour, this.scheduler.availableTimeFrames)) {
                availableHours.push(hour);
            }
            hour = addToDate(hour, 'hour', 1);
        }

        const cells = [];
        availableHours.forEach((availableHour) => {
            const start = availableHour.startOf('hour');
            const end = availableHour.endOf('hour');
            cells.push({
                start: start.ts,
                end: end.ts
            });
        });

        const columns = [];
        const numberOfColumns =
            timeSpan.unit === 'day'
                ? timeSpan.span
                : this.scheduler.availableDaysOfTheWeek.length;

        for (let i = 0; i < numberOfColumns; i++) {
            columns.push(i);
        }

        this.cells = cells;
        this.columns = columns;
    }
}
