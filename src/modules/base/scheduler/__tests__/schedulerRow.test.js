// /**
//  * BSD 3-Clause License
//  *
//  * Copyright (c) 2021, Avonni Labs, Inc.
//  * All rights reserved.
//  *
//  * Redistribution and use in source and binary forms, with or without
//  * modification, are permitted provided that the following conditions are met:
//  *
//  * - Redistributions of source code must retain the above copyright notice, this
//  *   list of conditions and the following disclaimer.
//  *
//  * - Redistributions in binary form must reproduce the above copyright notice,
//  *   this list of conditions and the following disclaimer in the documentation
//  *   and/or other materials provided with the distribution.
//  *
//  * - Neither the name of the copyright holder nor the names of its
//  *   contributors may be used to endorse or promote products derived from
//  *   this software without specific prior written permission.
//  *
//  * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
//  * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//  * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
//  * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
//  * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
//  * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
//  * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
//  * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
//  * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
//  * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//  */

import SchedulerRow from '../row';

const REFERENCE_COLUMNS = [
    {
        start: new Date(2021, 8, 1, 11).getTime(),
        end: new Date(2021, 8, 1, 11).getTime() - 1
    },
    {
        start: new Date(2021, 8, 1, 12).getTime(),
        end: new Date(2021, 8, 1, 12).getTime() - 1
    },
    {
        start: new Date(2021, 8, 1, 13).getTime(),
        end: new Date(2021, 8, 1, 13).getTime() - 1
    },
    {
        start: new Date(2021, 8, 1, 14).getTime(),
        end: new Date(2021, 8, 1, 14).getTime() - 1
    },
    {
        start: new Date(2021, 8, 1, 15).getTime(),
        end: new Date(2021, 8, 1, 15).getTime() - 1
    },
    {
        start: new Date(2021, 8, 1, 16).getTime(),
        end: new Date(2021, 8, 1, 16).getTime() - 1
    }
];

const EVENTS = [
    {
        from: new Date(2021, 8, 1, 11).getTime(),
        to: new Date(2021, 8, 1, 12, 30).getTime(),
        key: 'event-1'
    },
    {
        from: new Date(2021, 8, 1, 13, 12).getTime(),
        to: new Date(2021, 8, 1, 15, 30).getTime(),
        key: 'event-2'
    }
];

describe('SchedulerRow', () => {
    it('Scheduler row: Default attributes', () => {
        const element = new SchedulerRow({});

        expect(element.color).toBeUndefined();
        expect(element.columns).toMatchObject([]);
        expect(element.data).toBeUndefined();
        expect(element.events).toMatchObject([]);
        expect(element.height).toBe(0);
        expect(element.key).toBeUndefined();
        expect(element.minHeight).toBe(0);
        expect(element.referenceColumns).toMatchObject([]);
    });

    /* ----- ATTRIBUTES ----- */

    // columns
    // Depends on referenceColumns
    it('Scheduler row: columns', () => {
        const element = new SchedulerRow({
            referenceColumns: REFERENCE_COLUMNS
        });
        expect(element.columns).toHaveLength(REFERENCE_COLUMNS.length);
        element.columns.forEach((column, index) => {
            expect(column.start).toBe(REFERENCE_COLUMNS[index].start);
            expect(column.end).toBe(REFERENCE_COLUMNS[index].end);
        });
    });

    // events
    // Depends on referenceColumns
    it('Scheduler row: events', () => {
        const element = new SchedulerRow({
            referenceColumns: REFERENCE_COLUMNS,
            events: EVENTS
        });

        const columns = element.columns;
        EVENTS.forEach((event) => {
            columns.forEach((column) => {
                if (column.end >= event.from && column.start < event.to) {
                    expect(column.events).toContain(event);
                } else {
                    expect(column.events).not.toContain(event);
                }
            });
        });
    });

    // removeEvent()
    // Depends on referenceColumns and events
    it('Scheduler row: removeEvent method', () => {
        const element = new SchedulerRow({
            referenceColumns: REFERENCE_COLUMNS,
            events: EVENTS
        });

        const eventToRemove = EVENTS[0];
        element.removeEvent(eventToRemove);

        element.columns.forEach((column) => {
            expect(column.events).not.toContain(eventToRemove);
        });
    });

    // getColumnFromStart()
    // Depends on referenceColumns
    it('Scheduler row: getColumnFromStart method', () => {
        const element = new SchedulerRow({
            referenceColumns: REFERENCE_COLUMNS
        });

        const start = element.getColumnFromStart(REFERENCE_COLUMNS[0].start);
        expect(start).toBe(element.columns[0]);
    });
});
