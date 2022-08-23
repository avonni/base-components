import { createElement } from 'lwc';
import { dateTimeObjectFrom } from 'c/utilsPrivate';
import PrimitiveSchedulerEventOccurrence from '../primitiveSchedulerEventOccurrence';
import {
    CELL_DURATION,
    CELL_HEIGHT,
    CELL_WIDTH,
    ELEMENT_HEIGHT,
    ELEMENT_WIDTH,
    FROM,
    OFFSET_SIDE,
    RESOURCE_KEY,
    RESOURCES,
    TO,
    DAY_HEADER_CELLS,
    HOUR_HEADER_CELLS
} from './defaults';

const MONTH_HEADER_CELLS = {
    xAxis: [
        {
            start: new Date('2021-11-28T05:00:00.000Z').getTime(),
            end: new Date('2021-12-27T04:59:59.999Z').getTime()
        },
        {
            start: new Date('2021-11-29T05:00:00.000Z').getTime(),
            end: new Date('2021-12-28T04:59:59.999Z').getTime()
        },
        {
            start: new Date('2021-11-30T05:00:00.000Z').getTime(),
            end: new Date('2021-12-29T04:59:59.999Z').getTime()
        },
        {
            start: new Date('2021-12-01T05:00:00.000Z').getTime(),
            end: new Date('2021-12-30T04:59:59.999Z').getTime()
        },
        {
            start: new Date('2021-12-02T05:00:00.000Z').getTime(),
            end: new Date('2021-12-31T04:59:59.999Z').getTime()
        },
        {
            start: new Date('2021-12-03T05:00:00.000Z').getTime(),
            end: new Date('2022-01-01T04:59:59.999Z').getTime()
        },
        {
            start: new Date('2021-12-04T05:00:00.000Z').getTime(),
            end: new Date('2022-01-02T04:59:59.999Z').getTime()
        }
    ],
    yAxis: [
        {
            start: new Date('2021-11-28T05:00:00.000Z').getTime(),
            end: new Date('2021-12-05T04:59:59.999Z').getTime()
        },
        {
            start: new Date('2021-12-05T05:00:00.000Z').getTime(),
            end: new Date('2021-12-12T04:59:59.999Z').getTime()
        },
        {
            start: new Date('2021-12-12T05:00:00.000Z').getTime(),
            end: new Date('2021-12-19T04:59:59.999Z').getTime()
        },
        {
            start: new Date('2021-12-19T05:00:00.000Z').getTime(),
            end: new Date('2021-12-26T04:59:59.999Z').getTime()
        },
        {
            start: new Date('2021-12-26T05:00:00.000Z').getTime(),
            end: new Date('2022-01-02T04:59:59.999Z').getTime()
        }
    ]
};

let element;
describe('Primitive Scheduler Event Occurrence: calendar variants', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-primitive-scheduler-event-occurrence', {
            is: PrimitiveSchedulerEventOccurrence
        });
        element.getBoundingClientRect = jest.fn(() => {
            return {
                height: ELEMENT_HEIGHT,
                width: ELEMENT_WIDTH
            };
        });
        document.body.appendChild(element);

        element.cellHeight = CELL_HEIGHT;
        element.cellWidth = CELL_WIDTH;
        element.cellDuration = CELL_DURATION;
        element.color = 'rgb(45, 45, 45)';
        element.resources = [...RESOURCES].map((res) => {
            res.height = 0;
            return res;
        });
        element.resourceKey = RESOURCE_KEY;
        element.from = FROM;
        element.to = TO;
        element.occurrence = { firstAllowedDate: dateTimeObjectFrom(FROM) };
        element.theme = 'default';
        element.labels = {
            center: { fieldName: 'title' },
            left: { fieldName: 'color' }
        };
    });

    // calendar-horizontal
    it('Scheduler event occurence as calendar-horizontal', () => {
        element.variant = 'calendar-horizontal';
        element.from = new Date(2021, 8, 1);
        element.to = new Date(2021, 8, 3).getTime() - 1;
        element.headerCells = { xAxis: DAY_HEADER_CELLS };
        element.labels = {
            center: { fieldName: 'title' },
            left: { fieldName: 'color' }
        };

        return Promise.resolve().then(() => {
            expect(element.className).toBeFalsy();
            expect(element.endPosition).toBe(CELL_WIDTH * 2 + ELEMENT_WIDTH);
            expect(element.startPosition).toBe(CELL_WIDTH * 2);
            expect(element.shadowRoot.host.style.transform).toBe(
                `translate(${CELL_WIDTH * 2}px, 0px)`
            );
            expect(element.shadowRoot.host.style.width).toBe(
                `${CELL_WIDTH * 2}px`
            );
            expect(element.shadowRoot.host.style.height).toBeFalsy();

            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-event-occurrence"]'
            );
            const eventContent = element.shadowRoot.querySelector(
                '[data-element-id="div-event-content"]'
            );
            const centerLabel = element.shadowRoot.querySelector(
                '[data-element-id="div-center-label-wrapper"]'
            );
            const leftLabel = element.shadowRoot.querySelector(
                '[data-element-id="div-left-label-wrapper"]'
            );
            expect(leftLabel).toBeFalsy();
            expect(centerLabel.className).toBe(
                'slds-truncate slds-grid avonni-scheduler__event-label_center slds-p-horizontal_x-small'
            );
            expect(wrapper.className).toBe(
                'slds-grid slds-grid_vertical-align-center slds-p-vertical_xx-small'
            );
            expect(eventContent.className).toBe(
                'avonni-scheduler__event slds-grid slds-has-flexi-truncate slds-col slds-p-horizontal_x-small slds-text-color_inverse slds-current-color avonni-scheduler__event_default'
            );
        });
    });

    it('Scheduler event occurence as calendar-horizontal: disabled = true', () => {
        element.variant = 'calendar-horizontal';
        element.disabled = true;
        element.occurrence = {
            numberOfEventsInThisTimeFrame: 4
        };

        return Promise.resolve().then(() => {
            expect(element.shadowRoot.host.style.height).toBe(
                `${CELL_HEIGHT / 4}px`
            );
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-disabled-wrapper"]'
            );
            const title = element.shadowRoot.querySelector(
                '[data-element-id="div-disabled-title-wrapper"]'
            );
            expect(wrapper.style.cssText).toBe(
                'background-color: rgba(45, 45, 45, 0.3); --avonni-primitive-scheduler-event-occurrence-background-color: rgba(45, 45, 45, 0.3);'
            );
            expect(title.className).toBe(
                'avonni-scheduler__disabled-date-title slds-text-body_small slds-p-around_xx-small slds-grid slds-grid-vertical-align_center slds-text-color_weak'
            );
        });
    });

    // calendar-month
    it('Scheduler event occurence as calendar-month', () => {
        element.variant = 'calendar-month';
        element.headerCells = MONTH_HEADER_CELLS;
        element.occurrence = {
            firstAllowedDate: dateTimeObjectFrom(new Date(2021, 11, 2, 3)),
            offsetSide: OFFSET_SIDE
        };
        element.from = new Date(2021, 11, 2, 3, 45);
        element.to = new Date(2021, 11, 2, 13);
        element.title = 'some title';

        return Promise.resolve().then(() => {
            expect(element.shadowRoot.host.style.visibility).toBe('visible');
            expect(element.shadowRoot.host.style.display).toBeFalsy();
            expect(element.className).toBe(
                'avonni-scheduler__standalone-event'
            );
            expect(element.startPosition).toBe(CELL_WIDTH * 4);
            expect(element.endPosition).toBe(CELL_WIDTH * 4 + ELEMENT_WIDTH);
            expect(element.shadowRoot.host.style.transform).toBe(
                `translate(${CELL_WIDTH * 4}px, ${OFFSET_SIDE}px)`
            );
            expect(element.shadowRoot.host.style.width).toBe(`${CELL_WIDTH}px`);
            expect(element.shadowRoot.host.style.height).toBeFalsy();

            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-event-occurrence"]'
            );
            const eventContent = element.shadowRoot.querySelector(
                '[data-element-id="div-event-content"]'
            );
            const centerLabel = element.shadowRoot.querySelector(
                '[data-element-id="div-center-label-wrapper"]'
            );
            const leftLabel = element.shadowRoot.querySelector(
                '[data-element-id="div-left-label-wrapper"]'
            );
            const time = element.shadowRoot.querySelector(
                '[data-element-id="span-time-label"]'
            );
            expect(leftLabel).toBeFalsy();
            expect(time.textContent).toBe('03:45');
            expect(centerLabel.className).toBe(
                'slds-truncate slds-grid avonni-scheduler__event-label_center slds-grid_vertical-align-center'
            );
            expect(wrapper.className).toBe('slds-grid');
            expect(eventContent.className).toBe(
                'avonni-scheduler__event slds-grid slds-has-flexi-truncate slds-col slds-p-horizontal_x-small avonni-scheduler__event_display-as-dot'
            );
        });
    });

    it('Scheduler event occurence as calendar-month: disabled = true', () => {
        element.disabled = true;
        element.variant = 'calendar-month';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-disabled-wrapper"]'
            );
            expect(wrapper.className).toBe(
                'slds-theme_alert-texture avonni-scheduler__disabled-date avonni-scheduler__disabled-date_standalone slds-p-horizontal_x-small slds-m-bottom_xx-small slds-is-relative'
            );
            expect(wrapper.style.cssText).toBe(
                'background-color: rgba(45, 45, 45, 0.3); --avonni-primitive-scheduler-event-occurrence-background-color: rgba(45, 45, 45, 0.3);'
            );
        });
    });

    it('Scheduler event occurence as calendar-month: is set to overflow', () => {
        element.variant = 'calendar-month';
        element.occurrence = {
            firstAllowedDate: dateTimeObjectFrom(FROM),
            overflowsCell: true
        };
        element.headerCells = MONTH_HEADER_CELLS;

        return Promise.resolve().then(() => {
            expect(element.shadowRoot.host.style.display).toBe('none');
        });
    });

    it('Scheduler event occurence as calendar-month: is overflowing because starts before first visible day', () => {
        element.variant = 'calendar-month';
        element.occurrence = {
            firstAllowedDate: dateTimeObjectFrom(new Date(2021, 6, 2))
        };
        element.headerCells = MONTH_HEADER_CELLS;
        element.from = new Date(2021, 10, 2);
        element.to = new Date(2021, 11, 2);

        return Promise.resolve().then(() => {
            expect(element.shadowRoot.host.style.display).toBe('none');
        });
    });

    it('Scheduler event occurence as calendar-month: is a placeholder', () => {
        element.variant = 'calendar-month';
        element.shadowRoot.host.dataset.isPlaceholder = true;

        return Promise.resolve().then(() => {
            expect(element.shadowRoot.host.style.visibility).toBe('hidden');
        });
    });

    it('Scheduler event occurence as calendar-month: referenceLine = true', () => {
        element.variant = 'calendar-month';
        element.referenceLine = true;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-reference-line"]'
            );
            expect(wrapper.className).toBe(
                'avonni-scheduler__reference-line slds-is-absolute avonni-scheduler__reference-line_standalone'
            );
        });
    });

    it('Scheduler event occurence as calendar-month: spans on several days', () => {
        element.variant = 'calendar-month';
        element.occurrence = {
            firstAllowedDate: dateTimeObjectFrom(new Date(2021, 11, 2)),
            startsInPreviousCell: true,
            endsInLaterCell: true
        };
        element.headerCells = MONTH_HEADER_CELLS;
        element.from = new Date(2021, 11, 2);
        element.to = new Date(2021, 11, 4, 13);

        return Promise.resolve().then(() => {
            expect(element.shadowRoot.host.style.width).toBe(
                `${CELL_WIDTH * 3}px`
            );
            expect(element.shadowRoot.host.style.height).toBeFalsy();

            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-event-occurrence"]'
            );
            const eventContent = element.shadowRoot.querySelector(
                '[data-element-id="div-event-content"]'
            );
            const centerLabel = element.shadowRoot.querySelector(
                '[data-element-id="div-center-label-wrapper"]'
            );
            const time = element.shadowRoot.querySelector(
                '[data-element-id="span-time-label"]'
            );
            expect(time).toBeFalsy();
            expect(wrapper.className).toBe(
                'slds-grid slds-grid_vertical-align-center slds-p-bottom_xx-small'
            );
            expect(eventContent.className).toBe(
                'avonni-scheduler__event slds-grid slds-has-flexi-truncate slds-col slds-p-horizontal_x-small slds-text-color_inverse slds-current-color avonni-scheduler__event_default avonni-scheduler__event_standalone-multi-day-starts-in-previous-cell avonni-scheduler__event_standalone-multi-day-ends-in-later-cell'
            );
            expect(centerLabel.className).toBe(
                'slds-truncate slds-grid avonni-scheduler__event-label_center slds-p-horizontal_x-small'
            );
        });
    });

    it('Scheduler event occurence as calendar-month: spans on several days and disabled = true', () => {
        element.variant = 'calendar-month';
        element.disabled = true;
        element.occurrence = {
            firstAllowedDate: dateTimeObjectFrom(new Date(2021, 11, 2))
        };
        element.headerCells = MONTH_HEADER_CELLS;
        element.from = new Date(2021, 11, 2);
        element.to = new Date(2021, 11, 4, 13);

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-disabled-wrapper"]'
            );
            expect(wrapper.className).toBe(
                'slds-theme_alert-texture avonni-scheduler__disabled-date avonni-scheduler__disabled-date_standalone slds-p-horizontal_x-small slds-m-bottom_xx-small slds-is-relative'
            );
        });
    });

    // calendar-vertical
    it('Scheduler event occurence as calendar-vertical', () => {
        element.variant = 'calendar-vertical';
        element.headerCells = {
            yAxis: HOUR_HEADER_CELLS,
            xAxis: DAY_HEADER_CELLS
        };
        element.labels = {
            center: { fieldName: 'title' },
            left: { fieldName: 'color' }
        };
        element.occurrence = {
            firstAllowedDate: dateTimeObjectFrom(FROM),
            offsetSide: OFFSET_SIDE
        };

        return Promise.resolve().then(() => {
            expect(element.className).toBeFalsy();
            expect(element.startPosition).toBe(2 * CELL_HEIGHT);
            expect(element.endPosition).toBe(2 * CELL_HEIGHT + ELEMENT_HEIGHT);
            expect(element.shadowRoot.host.style.transform).toBe(
                `translate(${2 * CELL_WIDTH + OFFSET_SIDE}px, ${
                    2 * CELL_HEIGHT
                }px)`
            );
            expect(element.shadowRoot.host.style.width).toBe(`${CELL_WIDTH}px`);
            expect(element.shadowRoot.host.style.height).toBe(
                `${2 * CELL_HEIGHT}px`
            );

            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-event-occurrence"]'
            );
            const eventContent = element.shadowRoot.querySelector(
                '[data-element-id="div-event-content"]'
            );
            const centerLabel = element.shadowRoot.querySelector(
                '[data-element-id="div-center-label-wrapper"]'
            );
            const leftLabel = element.shadowRoot.querySelector(
                '[data-element-id="div-left-label-wrapper"]'
            );
            expect(leftLabel).toBeFalsy();
            expect(centerLabel.className).toBe(
                'slds-truncate slds-grid avonni-scheduler__event-label_center slds-p-horizontal_x-small'
            );
            expect(wrapper.className).toBe(
                'slds-grid avonni-scheduler__event-wrapper_vertical'
            );
            expect(eventContent.className).toBe(
                'avonni-scheduler__event slds-grid slds-has-flexi-truncate slds-col slds-text-color_inverse slds-current-color avonni-scheduler__event_default avonni-scheduler__event_vertical'
            );
        });
    });

    it('Scheduler event occurence as calendar-vertical: disabled = true', () => {
        element.variant = 'calendar-vertical';
        element.disabled = true;
        element.occurrence = {
            numberOfEventsInThisTimeFrame: 4
        };

        return Promise.resolve().then(() => {
            expect(element.shadowRoot.host.style.width).toBe(
                `${CELL_WIDTH / 4}px`
            );

            const title = element.shadowRoot.querySelector(
                '[data-element-id="div-disabled-title-wrapper"]'
            );
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-disabled-wrapper"]'
            );
            expect(wrapper.style.cssText).toBe(
                'background-color: rgba(45, 45, 45, 0.3); --avonni-primitive-scheduler-event-occurrence-background-color: rgba(45, 45, 45, 0.3);'
            );
            expect(title.className).toBe(
                'avonni-scheduler__disabled-date-title slds-text-body_small slds-p-around_xx-small slds-grid slds-grid-vertical-align_center slds-text-color_weak avonni-scheduler__disabled-date-title_vertical'
            );
        });
    });

    it('Scheduler event occurence as calendar-vertical: referenceLine = true', () => {
        element.variant = 'calendar-vertical';
        element.referenceLine = true;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-reference-line"]'
            );
            expect(wrapper.className).toBe(
                'avonni-scheduler__reference-line slds-is-absolute avonni-scheduler__reference-line_vertical'
            );
        });
    });
});
