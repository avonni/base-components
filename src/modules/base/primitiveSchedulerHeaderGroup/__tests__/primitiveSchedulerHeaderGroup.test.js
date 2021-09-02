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

import { createElement } from 'lwc';
import PrimitiveSchedulerHeaderGroup from 'avonni/primitiveSchedulerHeaderGroup';
import { DateTime } from 'c/luxon';

// NB:
// The component will always render twice on the first time. To make sure all renders are done,
// we always set the properties before appending the element to the body.

// Not tested because depends on DOM measurement:
// - Width of the columns, depending on the cellWidth value.
// - Scrolling, because it depends on the number of visible cells.

const MAX_VISIBLE_COLUMNS = Math.ceil(3840 / 17);

describe('PrimitiveSchedulerHeaderGroup', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-primitive-scheduler-header-group', {
            is: PrimitiveSchedulerHeaderGroup
        });

        expect(element.availableDaysOfTheWeek).toMatchObject([
            0,
            1,
            2,
            3,
            4,
            5,
            6
        ]);
        expect(element.availableMonths).toMatchObject([
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11
        ]);
        expect(element.availableTimeFrames).toMatchObject(['00:00-23:59']);
        expect(element.headers).toMatchObject([
            {
                unit: 'hour',
                span: 1,
                label: 'h a'
            },
            {
                unit: 'day',
                span: 1,
                label: 'ccc, LLL d'
            }
        ]);
        expect(element.scrollLeftOffset).toBe(0);
        expect(element.start).toBeInstanceOf(DateTime);
        expect(element.timeSpan).toMatchObject({ unit: 'hour', span: '12' });
        expect(element.visibleInterval).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // available-days-of-the-week
    // Depends on timeSpan, start and headers
    it('availableDaysOfTheWeek', () => {
        const element = createElement('base-primitive-scheduler-header-group', {
            is: PrimitiveSchedulerHeaderGroup
        });

        element.availableDaysOfTheWeek = [1, 2];
        element.headers = [
            {
                unit: 'day',
                span: 1,
                label: 'ccc, LLL d'
            }
        ];
        element.timeSpan = {
            unit: 'week',
            span: 1
        };
        element.start = new Date(2021, 7, 28);

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const row = element.shadowRoot.querySelector(
                '.avonni-scheduler__header-row'
            );
            const labels = row.querySelectorAll(
                '.avonni-scheduler__header-cell span'
            );
            expect(labels).toHaveLength(2);

            let isMonday = true;
            labels.forEach((label) => {
                if (isMonday) {
                    expect(label.textContent).toContain('Mon');
                } else {
                    expect(label.textContent).toContain('Tue');
                }
                isMonday = !isMonday;
            });
        });
    });

    it('availableDaysOfTheWeek, remove last column if empty', () => {
        const element = createElement('base-primitive-scheduler-header-group', {
            is: PrimitiveSchedulerHeaderGroup
        });

        element.availableDaysOfTheWeek = [1, 2];
        element.headers = [
            {
                unit: 'week',
                span: 1,
                label: `'Sprint' W`
            },
            {
                unit: 'day',
                span: 1,
                label: 'ccc dd'
            }
        ];
        element.timeSpan = {
            unit: 'week',
            span: 2
        };
        element.start = new Date(2021, 7, 28);

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const row = element.shadowRoot.querySelector(
                '.avonni-scheduler__header-row'
            );
            const labels = row.querySelectorAll(
                '.avonni-scheduler__header-cell span'
            );
            expect(labels).toHaveLength(2);
        });
    });

    // available-months
    // Depends on timeSpan, start and headers
    it('availableMonths', () => {
        const element = createElement('base-primitive-scheduler-header-group', {
            is: PrimitiveSchedulerHeaderGroup
        });

        element.availableMonths = [2, 6];
        element.headers = [
            {
                unit: 'month',
                span: 1,
                label: 'LLL kkkk'
            }
        ];
        element.timeSpan = {
            unit: 'year',
            span: 2
        };
        element.start = new Date(2021, 11, 20);

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const row = element.shadowRoot.querySelector(
                '.avonni-scheduler__header-row'
            );
            const labels = row.querySelectorAll(
                '.avonni-scheduler__header-cell span'
            );
            expect(labels).toHaveLength(4);

            let isMarch = true;
            labels.forEach((label) => {
                if (isMarch) {
                    expect(label.textContent).toContain('Mar');
                } else {
                    expect(label.textContent).toContain('Jul');
                }
                isMarch = !isMarch;
            });
        });
    });

    // available-time-frames
    // Depends on timeSpan, start and headers
    it('availableTimeFrames', () => {
        const element = createElement('base-primitive-scheduler-header-group', {
            is: PrimitiveSchedulerHeaderGroup
        });

        element.availableTimeFrames = ['10:00-12:00', '14:00-16:00'];
        element.headers = [
            {
                unit: 'hour',
                span: 1,
                label: 'HH'
            }
        ];
        element.timeSpan = {
            unit: 'day',
            span: 1
        };
        element.start = new Date(2021, 7, 31, 5);

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const row = element.shadowRoot.querySelector(
                '.avonni-scheduler__header-row'
            );
            const labels = row.querySelectorAll(
                '.avonni-scheduler__header-cell span'
            );
            expect(labels).toHaveLength(4);

            expect(labels[0].textContent).toBe('10');
            expect(labels[1].textContent).toBe('11');
            expect(labels[2].textContent).toBe('14');
            expect(labels[3].textContent).toBe('15');
        });
    });

    // headers
    // Depends on timeSpan and start
    it('headers', () => {
        const element = createElement('base-primitive-scheduler-header-group', {
            is: PrimitiveSchedulerHeaderGroup
        });

        element.headers = [
            {
                unit: 'week',
                span: 1,
                label: `'Week #'W`
            },
            {
                unit: 'day',
                span: 1,
                label: 'ccc dd/LL'
            },
            {
                unit: 'hour',
                span: 1,
                label: 'HH:mm'
            }
        ];
        element.timeSpan = {
            unit: 'day',
            span: 8
        };
        element.start = new Date(2021, 8, 1);

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const rows = element.shadowRoot.querySelectorAll(
                '.avonni-scheduler__header-row'
            );
            expect(rows).toHaveLength(3);

            const weekCells = rows[0].querySelectorAll(
                '.avonni-scheduler__header-cell span'
            );
            expect(weekCells).toHaveLength(2);

            const dayCells = rows[1].querySelectorAll(
                '.avonni-scheduler__header-cell span'
            );
            expect(dayCells).toHaveLength(8);

            const hourCells = rows[2].querySelectorAll(
                '.avonni-scheduler__header-cell span'
            );
            expect(hourCells).toHaveLength(192);
        });
    });

    it('headers, load only a maximum number of cells', () => {
        const element = createElement('base-primitive-scheduler-header-group', {
            is: PrimitiveSchedulerHeaderGroup
        });

        element.headers = [
            {
                unit: 'week',
                span: 1,
                label: `'Week #'W`
            },
            {
                unit: 'day',
                span: 1,
                label: 'ccc dd/LL'
            },
            {
                unit: 'hour',
                span: 1,
                label: 'HH:mm'
            }
        ];
        element.timeSpan = {
            unit: 'month',
            span: 1
        };
        element.start = new Date(2021, 8, 1);

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const rows = element.shadowRoot.querySelectorAll(
                '.avonni-scheduler__header-row'
            );

            const weekCells = rows[0].querySelectorAll(
                '.avonni-scheduler__header-cell span'
            );
            expect(weekCells).toHaveLength(
                Math.ceil(MAX_VISIBLE_COLUMNS / 24 / 7)
            );

            const dayCells = rows[1].querySelectorAll(
                '.avonni-scheduler__header-cell span'
            );
            expect(dayCells).toHaveLength(Math.ceil(MAX_VISIBLE_COLUMNS / 24));

            const hourCells = rows[2].querySelectorAll(
                '.avonni-scheduler__header-cell span'
            );
            expect(hourCells).toHaveLength(MAX_VISIBLE_COLUMNS);
        });
    });

    it('headers, header span bigger than timeSpan', () => {
        const element = createElement('base-primitive-scheduler-header-group', {
            is: PrimitiveSchedulerHeaderGroup
        });

        element.headers = [
            {
                unit: 'week',
                span: 8,
                label: `'Week #'W`
            }
        ];
        element.timeSpan = {
            unit: 'month',
            span: 1
        };
        element.start = new Date(2021, 8, 1);

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const row = element.shadowRoot.querySelector(
                '.avonni-scheduler__header-row'
            );
            const weekCells = row.querySelectorAll(
                '.avonni-scheduler__header-cell span'
            );
            expect(weekCells).toHaveLength(1);
        });
    });

    // scroll-left-offset
    // Depends on start
    it('scrollLeftOffset', () => {
        const element = createElement('base-primitive-scheduler-header-group', {
            is: PrimitiveSchedulerHeaderGroup
        });

        element.start = new Date(2021, 8, 1);
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            // We set the scrollLeftOffset here because the updateStickyLabels()
            // in the renderedCallBack() will never be reached, since the _numberOfVisibleCells
            // will always be 0 in the tests.
            element.scrollLeftOffset = 30;

            const stickyLabels = element.shadowRoot.querySelectorAll(
                '.avonni-scheduler__header-label_sticky'
            );

            stickyLabels.forEach((label) => {
                expect(label.style.left).toBe('30px');
            });
        });
    });

    // start
    // Depends on headers and timeSpan
    it('start', () => {
        const element = createElement('base-primitive-scheduler-header-group', {
            is: PrimitiveSchedulerHeaderGroup
        });

        const date = new Date(2021, 1, 4);
        element.start = date;

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const cell = element.shadowRoot.querySelector(
                '.avonni-scheduler__header-cell'
            );
            expect(Number(cell.dataset.start)).toBe(date.getTime());
        });
    });

    it('start in the middle of the year should end in the middle of the year', () => {
        const element = createElement('base-primitive-scheduler-header-group', {
            is: PrimitiveSchedulerHeaderGroup
        });

        element.start = new Date(2021, 1, 4);
        element.headers = [
            {
                unit: 'year',
                span: 1,
                label: 'yy'
            }
        ];
        element.timeSpan = {
            unit: 'year',
            span: 1
        };

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const cell = element.shadowRoot.querySelector(
                '.avonni-scheduler__header-cell:last-of-type'
            );
            const end = new Date(2022, 1, 4).getTime() - 1;
            expect(Number(cell.dataset.end)).toBe(end);
        });
    });

    it('start in the middle of the month should end in the middle of the month', () => {
        const element = createElement('base-primitive-scheduler-header-group', {
            is: PrimitiveSchedulerHeaderGroup
        });

        element.start = new Date(2021, 1, 4);
        element.headers = [
            {
                unit: 'month',
                span: 1,
                label: 'LL'
            }
        ];
        element.timeSpan = {
            unit: 'month',
            span: 1
        };

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const cell = element.shadowRoot.querySelector(
                '.avonni-scheduler__header-cell:last-of-type'
            );
            const end = new Date(2021, 2, 4).getTime() - 1;
            expect(Number(cell.dataset.end)).toBe(end);
        });
    });

    it('start in the middle of the week should end in the middle of the week', () => {
        const element = createElement('base-primitive-scheduler-header-group', {
            is: PrimitiveSchedulerHeaderGroup
        });

        element.start = new Date(2021, 8, 1);
        element.headers = [
            {
                unit: 'week',
                span: 1,
                label: 'W'
            }
        ];
        element.timeSpan = {
            unit: 'week',
            span: 1
        };

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const cell = element.shadowRoot.querySelector(
                '.avonni-scheduler__header-cell:last-of-type'
            );
            const end = new Date(2021, 8, 8).getTime() - 1;
            expect(Number(cell.dataset.end)).toBe(end);
        });
    });

    it('start in the middle of the day should end in the middle of the day', () => {
        const element = createElement('base-primitive-scheduler-header-group', {
            is: PrimitiveSchedulerHeaderGroup
        });

        element.start = new Date(2021, 8, 1, 15);
        element.headers = [
            {
                unit: 'day',
                span: 1,
                label: 'dd'
            }
        ];
        element.timeSpan = {
            unit: 'day',
            span: 1
        };

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const cell = element.shadowRoot.querySelector(
                '.avonni-scheduler__header-cell:last-of-type'
            );
            const end = new Date(2021, 8, 2, 15).getTime() - 1;
            expect(Number(cell.dataset.end)).toBe(end);
        });
    });

    it('start in the middle of the hour should end in the middle of the hour', () => {
        const element = createElement('base-primitive-scheduler-header-group', {
            is: PrimitiveSchedulerHeaderGroup
        });

        element.start = new Date(2021, 8, 1, 15, 15);
        element.headers = [
            {
                unit: 'hour',
                span: 1,
                label: 'hh'
            }
        ];
        element.timeSpan = {
            unit: 'hour',
            span: 1
        };

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const cell = element.shadowRoot.querySelector(
                '.avonni-scheduler__header-cell:last-of-type'
            );
            const end = new Date(2021, 8, 1, 16, 15).getTime() - 1;
            expect(Number(cell.dataset.end)).toBe(end);
        });
    });

    // time-span
    // Depends on start and headers
    it('timeSpan', () => {
        const element = createElement('base-primitive-scheduler-header-group', {
            is: PrimitiveSchedulerHeaderGroup
        });

        element.start = new Date(2021, 8, 1, 11);
        element.headers = [
            {
                unit: 'day',
                span: 1,
                label: 'ccc dd/LL'
            },
            {
                unit: 'hour',
                span: 1,
                label: 'HH:mm'
            }
        ];
        element.timeSpan = {
            unit: 'week',
            span: 1
        };

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const cell = element.shadowRoot.querySelector(
                '.avonni-scheduler__header-cell:last-of-type'
            );
            const end = new Date(2021, 8, 8, 11).getTime() - 1;
            expect(Number(cell.dataset.end)).toBe(end);
        });
    });

    /* ----- EVENTS ----- */

    // privateheaderregister and privatevisibleheaderchange
    it('privateheaderregister event and privatevisibleheaderchange event', () => {
        const element = createElement('base-primitive-scheduler-header-group', {
            is: PrimitiveSchedulerHeaderGroup
        });

        // Register event
        let scrollHeadersTo;
        const registerHandler = jest.fn((event) => {
            scrollHeadersTo = event.detail.callbacks.scrollHeadersTo;
        });
        element.addEventListener('privateheaderregister', registerHandler);

        document.body.appendChild(element);

        expect(registerHandler).toHaveBeenCalled();

        // Visible header change event
        const changeHandler = jest.fn();
        element.addEventListener('privatevisibleheaderchange', changeHandler);
        scrollHeadersTo('right');
        expect(changeHandler).toHaveBeenCalled();
        expect(changeHandler.mock.calls[0][0].detail.direction).toBe('right');
        expect(changeHandler.mock.calls[0][0].detail.visibleCells).toBe(0);
        expect(
            changeHandler.mock.calls[0][0].detail.visibleInterval
        ).toMatchObject(element.visibleInterval);
    });

    // privatecellwidthchange
    it('privatecellwidthchange event', () => {
        const element = createElement('base-primitive-scheduler-header-group', {
            is: PrimitiveSchedulerHeaderGroup
        });

        const handler = jest.fn();
        element.addEventListener('privatecellwidthchange', handler);

        document.body.appendChild(element);

        // The padding added is 20px.
        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.cellWidth).toBe(20);
    });
});
