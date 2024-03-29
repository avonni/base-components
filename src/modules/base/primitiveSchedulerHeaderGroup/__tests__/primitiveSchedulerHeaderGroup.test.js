import { createElement } from 'lwc';
import PrimitiveSchedulerHeaderGroup from 'avonni/primitiveSchedulerHeaderGroup';

// Not tested because depends on DOM measurement:
// - Width of the columns and privatecellwidthchange.

jest.useFakeTimers();
let element;
describe('Primitive Scheduler Header Group', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        window.requestAnimationFrame.mockRestore();
    });

    beforeEach(() => {
        element = createElement('base-primitive-scheduler-header-group', {
            is: PrimitiveSchedulerHeaderGroup
        });
        document.body.appendChild(element);
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
            setTimeout(() => {
                cb();
            }, 0);
        });
    });

    it('Scheduler header group: Default attributes', () => {
        expect(element.availableDaysOfTheWeek).toMatchObject([
            0, 1, 2, 3, 4, 5, 6
        ]);
        expect(element.availableMonths).toMatchObject([
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
        ]);
        expect(element.availableTimeFrames).toMatchObject(['00:00-23:59']);
        expect(element.availableTimeSpans).toMatchObject([
            { unit: 'day', span: 1, label: 'Day', headers: 'hourAndDay' },
            { unit: 'week', span: 1, label: 'Week', headers: 'hourAndDay' },
            { unit: 'month', span: 1, label: 'Month', headers: 'dayAndMonth' },
            { unit: 'year', span: 1, label: 'Year', headers: 'dayAndMonth' }
        ]);
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
        const today = new Date().setHours(0, 0, 0, 0);
        expect(new Date(element.start).setHours(0, 0, 0, 0)).toBe(today);
        expect(element.timeSpan).toMatchObject({ unit: 'day', span: 1 });
        expect(element.timezone).toBeUndefined();
        expect(element.variant).toBe('horizontal');
        expect(element.visibleInterval).toBeUndefined();
        expect(element.visibleWidth).toBe(0);
        expect(element.zoomToFit).toBeFalsy();
    });

    /*
     * ------------------------------------------------------------
     *  ATTRIBUTES
     * -------------------------------------------------------------
     */

    // available-days-of-the-week
    // Depends on timeSpan, start and headers
    it('Scheduler header group: availableDaysOfTheWeek', () => {
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

        jest.runAllTimers();

        return Promise.resolve().then(() => {
            const row = element.shadowRoot.querySelector(
                '[data-element-id="div-row"]'
            );
            const labels = row.querySelectorAll(
                '[data-element-id^="span-label"]'
            );
            expect(labels).toHaveLength(2);
            expect(labels[0].textContent).toContain('Mon');
            expect(labels[1].textContent).toContain('Tue');
        });
    });

    it('Scheduler header group: availableDaysOfTheWeek, remove last column if empty', () => {
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

        jest.runAllTimers();

        return Promise.resolve().then(() => {
            const row = element.shadowRoot.querySelector(
                '[data-element-id="div-row"]'
            );
            const labels = row.querySelectorAll(
                '[data-element-id^="span-label"]'
            );
            expect(labels).toHaveLength(2);
        });
    });

    // available-months
    // Depends on timeSpan, start and headers
    it('Scheduler header group: availableMonths', () => {
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
        jest.runAllTimers();

        return Promise.resolve().then(() => {
            const row = element.shadowRoot.querySelector(
                '[data-element-id="div-row"]'
            );
            const labels = row.querySelectorAll(
                '[data-element-id^="span-label"]'
            );
            expect(labels).toHaveLength(5);

            [0, 2, 4].forEach((index) => {
                expect(labels[index].textContent).toContain('Mar');
            });
            [1, 3].forEach((index) => {
                expect(labels[index].textContent).toContain('Jul');
            });
        });
    });

    // available-time-frames
    // Depends on timeSpan, start and headers
    it('Scheduler header group: availableTimeFrames', () => {
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
        jest.runAllTimers();

        return Promise.resolve().then(() => {
            const row = element.shadowRoot.querySelector(
                '[data-element-id="div-row"]'
            );
            const labels = row.querySelectorAll(
                '[data-element-id^="span-label"]'
            );
            expect(labels).toHaveLength(4);

            expect(labels[0].textContent).toBe('10');
            expect(labels[1].textContent).toBe('11');
            expect(labels[2].textContent).toBe('14');
            expect(labels[3].textContent).toBe('15');
        });
    });

    // available-time-spans
    // Depends on timeSpan and start
    it('Scheduler header group: availableTimeSpans and timeSpan match, the headers should end on the unit', () => {
        element.availableTimeSpans = [
            {
                unit: 'day',
                span: 2,
                label: 'dd'
            },
            {
                unit: 'week',
                span: 1,
                label: 'W'
            }
        ];
        element.timeSpan = {
            unit: 'day',
            span: 2
        };
        element.start = new Date(2022, 4, 18, 14, 33);
        jest.runAllTimers();

        return Promise.resolve().then(() => {
            const end = new Date(2022, 4, 20).getTime() - 1;
            const lastColumn = element.shadowRoot.querySelector(
                '[data-element-id="div-cell"]:last-of-type'
            );
            expect(Number(lastColumn.dataset.end)).toBe(end);
        });
    });

    it('Scheduler header group: availableTimeSpans and timeSpan match, start is on Sunday and the unit is week', () => {
        element.availableTimeSpans = [
            {
                unit: 'day',
                span: 2,
                label: 'dd'
            },
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
        element.start = new Date(2022, 4, 15, 14, 33);
        jest.runAllTimers();

        return Promise.resolve().then(() => {
            const end = new Date(2022, 4, 22).getTime() - 1;
            const lastColumn = element.shadowRoot.querySelector(
                '[data-element-id="div-cell"]:last-of-type'
            );
            expect(Number(lastColumn.dataset.end)).toBe(end);
        });
    });

    it('Scheduler header group: availableTimeSpans and timeSpan do not match, the headers can end in the middle of a unit', () => {
        element.availableTimeSpans = [
            {
                unit: 'day',
                span: 2,
                label: 'dd'
            },
            {
                unit: 'month',
                span: 1,
                label: 'MM'
            }
        ];
        element.headers = [
            {
                unit: 'day',
                span: 2,
                label: 'dd'
            },
            {
                unit: 'month',
                span: 1,
                label: 'mm'
            }
        ];
        element.timeSpan = {
            unit: 'week',
            span: 3
        };
        element.start = new Date(2022, 4, 18, 14, 33);
        jest.runAllTimers();

        return Promise.resolve().then(() => {
            const end = new Date(2022, 5, 8).getTime() - 1;
            const lastColumn = element.shadowRoot.querySelector(
                '[data-element-id="div-cell"]:last-of-type'
            );
            expect(Number(lastColumn.dataset.end)).toBe(end);
        });
    });

    // headers
    // Depends on timeSpan and start
    it('Scheduler header group: headers', () => {
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
        jest.runAllTimers();

        return Promise.resolve().then(() => {
            const rows = element.shadowRoot.querySelectorAll(
                '[data-element-id="div-row"]'
            );
            expect(rows).toHaveLength(3);

            const weekCells = rows[0].querySelectorAll(
                '[data-element-id^="span-label"]'
            );
            expect(weekCells).toHaveLength(2);

            const dayCells = rows[1].querySelectorAll(
                '[data-element-id^="span-label"]'
            );
            expect(dayCells).toHaveLength(8);

            const hourCells = rows[2].querySelectorAll(
                '[data-element-id^="span-label"]'
            );
            expect(hourCells).toHaveLength(192);
        });
    });

    it('Scheduler header group: headers, header span bigger than timeSpan', () => {
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
        jest.runAllTimers();

        return Promise.resolve().then(() => {
            const row = element.shadowRoot.querySelector(
                '[data-element-id="div-row"]'
            );
            const weekCells = row.querySelectorAll(
                '[data-element-id^="span-label"]'
            );
            expect(weekCells).toHaveLength(1);
        });
    });

    // scroll-left-offset
    // Depends on start
    it('Scheduler header group: scrollLeftOffset', () => {
        element.start = new Date(2021, 8, 1);

        return Promise.resolve().then(() => {
            element.scrollLeftOffset = 30;
            jest.runAllTimers();
            const stickyLabels = element.shadowRoot.querySelectorAll(
                '[data-element-id="span-label-sticky"]'
            );

            stickyLabels.forEach((label) => {
                expect(label.style.left).toBe('30px');
            });
        });
    });

    // start
    // Depends on headers and timeSpan
    it('Scheduler header group: start', () => {
        const date = new Date(2021, 1, 4);
        element.start = date;
        jest.runAllTimers();

        return Promise.resolve().then(() => {
            const cell = element.shadowRoot.querySelector(
                '[data-element-id="div-cell"]'
            );
            expect(Number(cell.dataset.start)).toBe(date.getTime());
        });
    });

    it('Scheduler header group: start in the middle of the year should end in the middle of the year', () => {
        element.start = new Date(2021, 1, 4);
        element.headers = [
            {
                unit: 'year',
                span: 1,
                label: 'yy'
            },
            {
                unit: 'month',
                span: 1,
                label: 'MMM'
            },
            {
                unit: 'day',
                span: 1,
                label: 'dd'
            }
        ];
        element.timeSpan = {
            unit: 'year',
            span: 2
        };
        jest.runAllTimers();

        return Promise.resolve().then(() => {
            const cell = element.shadowRoot.querySelector(
                '[data-element-id="div-cell"]:last-of-type'
            );
            const end = new Date(2023, 1, 4).getTime() - 1;
            expect(Number(cell.dataset.end)).toBe(end);
        });
    });

    it('Scheduler header group: start in the middle of the month should end in the middle of the month', () => {
        element.start = new Date(2021, 1, 4);
        element.headers = [
            {
                unit: 'month',
                span: 1,
                label: 'LL'
            },
            {
                unit: 'day',
                span: 1,
                label: 'dd'
            }
        ];
        element.timeSpan = {
            unit: 'month',
            span: 4
        };
        jest.runAllTimers();

        return Promise.resolve().then(() => {
            const cell = element.shadowRoot.querySelector(
                '[data-element-id="div-cell"]:last-of-type'
            );
            const end = new Date(2021, 5, 4).getTime() - 1;
            expect(Number(cell.dataset.end)).toBe(end);
        });
    });

    it('Scheduler header group: start in the middle of the week should end in the middle of the week', () => {
        element.start = new Date(2021, 8, 3);
        element.headers = [
            {
                unit: 'week',
                span: 1,
                label: 'W'
            },
            {
                unit: 'day',
                span: 1,
                label: 'dd'
            }
        ];
        element.timeSpan = {
            unit: 'week',
            span: 3
        };
        jest.runAllTimers();

        return Promise.resolve().then(() => {
            const cell = element.shadowRoot.querySelector(
                '[data-element-id="div-cell"]:last-of-type'
            );
            const end = new Date(2021, 8, 24).getTime() - 1;
            expect(Number(cell.dataset.end)).toBe(end);
        });
    });

    it('Scheduler header group: start in the middle of the day should end in the middle of the day', () => {
        element.start = new Date(2021, 8, 1, 15);
        element.headers = [
            {
                unit: 'day',
                span: 1,
                label: 'dd'
            },
            {
                unit: 'minute',
                span: 15,
                label: 'HH:mm'
            }
        ];
        element.timeSpan = {
            unit: 'day',
            span: 2
        };
        jest.runAllTimers();

        return Promise.resolve().then(() => {
            const cell = element.shadowRoot.querySelector(
                '[data-element-id="div-cell"]:last-of-type'
            );
            const end = new Date(2021, 8, 3, 15).getTime() - 1;
            expect(Number(cell.dataset.end)).toBe(end);
        });
    });

    it('Scheduler header group: start in the middle of the hour should end in the middle of the hour', () => {
        element.start = new Date(2021, 8, 1, 15, 15);
        element.headers = [
            {
                unit: 'hour',
                span: 1,
                label: 'hh'
            },
            {
                unit: 'minute',
                span: 15,
                label: 'mm'
            }
        ];
        element.timeSpan = {
            unit: 'hour',
            span: 1
        };
        jest.runAllTimers();

        return Promise.resolve().then(() => {
            const cell = element.shadowRoot.querySelector(
                '[data-element-id="div-cell"]:last-of-type'
            );
            const end = new Date(2021, 8, 1, 16, 15).getTime() - 1;
            expect(Number(cell.dataset.end)).toBe(end);
        });
    });

    // time-span
    // Depends on start and headers
    it('Scheduler header group: timeSpan', () => {
        element.start = new Date(2021, 8, 4, 11);
        element.headers = [
            {
                unit: 'day',
                span: 1,
                label: 'ccc dd/LL'
            },
            {
                unit: 'hour',
                span: 1,
                label: 'hh'
            }
        ];

        element.timeSpan = {
            unit: 'week',
            span: 2
        };
        jest.runAllTimers();

        return Promise.resolve().then(() => {
            const cell = element.shadowRoot.querySelector(
                '[data-element-id="div-cell"]:last-of-type'
            );
            const end = new Date(2021, 8, 17, 11).getTime() - 1;
            expect(Number(cell.dataset.end)).toBe(end);
        });
    });

    // timezone
    it('Scheduler header group: timezone', () => {
        element.timezone = 'Asia/Shanghai';
        element.start = '2023-02-15T16:00:00.000Z';
        jest.runAllTimers();

        return Promise.resolve().then(() => {
            jest.runAllTimers();
            const firstCell = element.shadowRoot.querySelector(
                '[data-element-id="div-cell"]'
            );
            const lastCell = element.shadowRoot.querySelector(
                '[data-element-id="div-cell"]:last-of-type'
            );
            const start = new Date('2023-02-16T00:00:00.000+08:00').getTime();
            const end = new Date('2023-02-17T00:00:00.000+08:00').getTime() - 1;

            expect(Number(firstCell.dataset.start)).toBe(start);
            expect(Number(lastCell.dataset.end)).toBe(end);
        });
    });

    // variant
    it('Scheduler header group: horizontal variant', () => {
        element.variant = 'horizontal';
        jest.runAllTimers();

        return Promise.resolve().then(() => {
            const cells = element.shadowRoot.querySelectorAll(
                '[data-element-id="div-row"]'
            );
            cells.forEach((cell) => {
                expect(cell.classList).not.toContain(
                    'avonni-scheduler-header-group__header_vertical'
                );
                expect(cell.classList).not.toContain('slds-grid_vertical');
            });

            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.classList).not.toContain('slds-grid');
        });
    });

    it('Scheduler header group: vertical variant', () => {
        element.variant = 'vertical';
        jest.runAllTimers();

        return Promise.resolve().then(() => {
            const cells = element.shadowRoot.querySelectorAll(
                '[data-element-id="div-row"]'
            );
            cells.forEach((cell) => {
                expect(cell.classList).toContain(
                    'avonni-scheduler-header-group__header_vertical'
                );
                expect(cell.classList).toContain('slds-grid_vertical');
            });

            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.classList).toContain('slds-grid');
        });
    });

    // visible-interval
    // Depends on start and timeSpan
    it('Scheduler header group: visibleInterval', () => {
        element.start = new Date(2022, 4, 18);
        element.timeSpan = {
            unit: 'day',
            span: 1
        };
        jest.runAllTimers();

        return Promise.resolve().then(() => {
            const start = new Date(2022, 4, 18).getTime();
            const end = new Date(2022, 4, 19).getTime() - 1;
            expect(element.visibleInterval.s.ts).toBe(start);
            expect(element.visibleInterval.e.ts).toBe(end);
        });
    });

    // visible-width and zoom-to-fit
    it('Scheduler header group: zoomToFit', () => {
        const wrapper = element.shadowRoot.querySelector(
            '[data-element-id="div-wrapper"]'
        );
        wrapper.getBoundingClientRect = jest.fn(() => {
            return { width: 120 };
        });
        const handler = jest.fn();
        element.addEventListener('privatecellsizechange', handler);
        element.start = new Date(2022, 4, 18);
        element.timeSpan = {
            unit: 'day',
            span: 1
        };
        element.zoomToFit = true;
        jest.runAllTimers();

        expect(handler).toHaveBeenCalled();
        const size = Math.ceil(handler.mock.calls[0][0].detail.cellSize);
        expect(size).toBe(5);
    });

    it('Scheduler header group: visibleWidth and zoomToFit', () => {
        element.visibleWidth = 1200;
        const handler = jest.fn();
        element.addEventListener('privatecellsizechange', handler);
        element.start = new Date(2022, 4, 18);
        element.zoomToFit = true;
        jest.runAllTimers();

        expect(handler).toHaveBeenCalled();
        const size = Math.ceil(handler.mock.calls[0][0].detail.cellSize);
        expect(size).toBe(50);
    });

    /*
     * ------------------------------------------------------------
     *  EVENTS
     * -------------------------------------------------------------
     */

    // privateheaderchange
    it('Scheduler header group: privateheaderchange event', () => {
        const handler = jest.fn();
        element.addEventListener('privateheaderchange', handler);
        element.headers = [
            {
                unit: 'day',
                span: 1,
                label: 'dd'
            },
            {
                unit: 'hour',
                span: 1,
                label: 'hh'
            }
        ];
        jest.runAllTimers();
        expect(handler).toHaveBeenCalled();
        const call = handler.mock.calls[0][0];
        expect(call.detail.smallestHeader).toBeTruthy();
        expect(call.bubbles).toBeFalsy();
        expect(call.composed).toBeFalsy();
        expect(call.cancelable).toBeFalsy();
    });
});
