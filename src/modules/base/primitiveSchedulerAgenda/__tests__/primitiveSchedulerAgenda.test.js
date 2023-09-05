import { createElement } from 'lwc';
import PrimitiveSchedulerAgenda from '../primitiveSchedulerAgenda';
import { DateTime } from 'c/luxon';

const RESOURCES = [
    {
        name: 'resource-1',
        label: 'Resource 1',
        avatarSrc: 'some fake avatar src',
        avatarFallbackIconName: 'utility:user',
        avatarInitials: 'R1',
        col1: 'Resource 1, column 1',
        col2: 'Resource 1, column 2',
        col3: 'Resource 1, column 3',
        color: '#454545'
    },
    {
        name: 'resource-2',
        label: 'Resource 2',
        color: '#fff',
        col1: 'Resource 2, column 1',
        col2: 'Resource 2, column 2',
        col3: 'Resource 2, column 3'
    },
    {
        name: 'resource-3',
        label: 'Resource 3',
        color: '#444',
        col1: 'Resource 3, column 1',
        col2: 'Resource 3, column 2',
        col3: 'Resource 3, column 3'
    }
];
const ALL_RESOURCES = RESOURCES.map((res) => res.name);
const SELECTED_DATE = new Date(2022, 7, 24, 10, 37);
const EVENTS = [
    {
        resourceNames: ['resource-2', 'resource-1'],
        name: 'event-1',
        title: 'Event 1',
        from: new Date(2022, 7, 24, 10),
        to: new Date(2022, 7, 24, 10, 30),
        color: '#333'
    },
    {
        resourceNames: ['resource-3'],
        name: 'event-2',
        title: 'Event 2',
        allDay: true,
        from: new Date(2022, 7, 24),
        labels: {
            center: {
                fieldName: 'from',
                iconName: 'utility:apps'
            },
            right: {
                value: 'Great event'
            }
        }
    },
    {
        resourceNames: ['resource-3'],
        name: 'disabled-event',
        title: 'Disabled event',
        from: new Date(2022, 7, 23, 7),
        to: new Date(2022, 7, 26, 19, 57),
        disabled: true
    },
    {
        name: 'reference-line',
        title: 'Reference line',
        from: new Date(2022, 8, 3, 14, 34),
        referenceLine: true,
        theme: 'success'
    }
];

const RECURRING_EVENT = {
    name: 'recurring-event',
    title: 'Recurring event',
    recurrence: 'daily',
    from: new Date(2022, 7, 24, 13),
    to: new Date(2022, 7, 24, 14, 50),
    resourceNames: ['resource-1']
};

expect.extend({
    toBeEvent(
        occElement,
        { event, resourceName, fromDay, fromMonth, fromHour }
    ) {
        const hasOccurrenceKey = typeof occElement.occurrenceKey === 'string';
        const hasSameColor = occElement.color === event.color;
        const hasSameIcon = occElement.iconName === event.iconName;
        const hasSameName = occElement.eventName === event.name;
        const hasSameTitle = occElement.title === event.title;
        const hasSameTheme =
            occElement.theme === event.theme ||
            (!event.theme && occElement.theme === 'default');
        const hasSameResource = occElement.resourceKey === resourceName;
        const isDisabled = !!occElement.disabled === !!event.disabled;
        const isReferenceLine =
            !!occElement.referenceLine === !!event.referenceLine;

        // data
        const hasSameData =
            typeof occElement.eventData === 'object' &&
            occElement.eventData.name === event.name;

        // labels
        const occLabels =
            typeof occElement.labels === 'object' &&
            JSON.stringify(occElement.labels);
        const eventLabels = event.labels && JSON.stringify(event.labels);
        const hasSameLabels = !event.labels || eventLabels === occLabels;

        // from
        const hasSameFrom =
            occElement.from &&
            occElement.from.month === fromMonth &&
            occElement.from.day === fromDay &&
            occElement.from.hour === fromHour;

        // occurrence
        const hasOccurrence = typeof occElement.occurrence === 'object';
        const occIsSameDay =
            hasOccurrence && occElement.occurrence.from.day === fromDay;
        const occIsSameMonth =
            hasOccurrence && occElement.occurrence.from.month === fromMonth;
        const isRightOccurrence = occIsSameDay && occIsSameMonth;

        // to
        const hasSameTo =
            !event.to ||
            (event.to.getMonth() + 1 === occElement.to.month &&
                event.to.getDate() === occElement.to.day &&
                event.to.getHours() === occElement.to.hour);

        return {
            pass: !!(
                hasOccurrenceKey &&
                hasSameColor &&
                hasSameData &&
                hasSameFrom &&
                hasSameIcon &&
                hasSameLabels &&
                hasSameName &&
                hasSameResource &&
                hasSameTitle &&
                hasSameTheme &&
                hasSameTo &&
                isDisabled &&
                isReferenceLine &&
                isRightOccurrence
            ),
            message: () => {
                const prefix = `${event.name} (${fromDay}/${fromMonth}): Expected `;
                if (!hasOccurrenceKey) {
                    return `${prefix}occurrence key ${occElement.occurrenceKey} to be a string.`;
                }
                if (!hasSameColor) {
                    return `${prefix}color ${occElement.color} to be ${event.color}.`;
                }
                if (!hasSameData) {
                    const occData = JSON.stringify(occElement.eventData);
                    const eventData = JSON.stringify(event);
                    return `${prefix}data ${occData} to be ${eventData}.`;
                }
                if (!hasSameFrom) {
                    return `${prefix}from ${occElement.from} to be ${event.from}.`;
                }
                if (!hasSameIcon) {
                    return `${prefix}icon ${occElement.iconName} to be ${event.iconName}.`;
                }
                if (!hasSameLabels) {
                    return `${prefix}labels ${occLabels} to be ${eventLabels}.`;
                }
                if (!hasSameName) {
                    return `${prefix}name ${occElement.eventName} to be ${event.name}.`;
                }
                if (!hasSameResource) {
                    return `${prefix}resource ${occElement.resourceKey} to be ${resourceName}.`;
                }
                if (!hasSameTheme) {
                    return `${prefix}theme ${occElement.theme} to be ${event.theme}.`;
                }
                if (!hasSameTo) {
                    return `${prefix}to ${occElement.to} to be ${event.to}.`;
                }
                if (!isDisabled) {
                    return `${prefix}disabled to be ${event.disabled} and received ${occElement.disabled}.`;
                }
                if (!isReferenceLine) {
                    return `${prefix}reference line to be ${event.referenceLine} and received ${occElement.referenceLine}.`;
                }
                if (!isRightOccurrence) {
                    return `${prefix}occurrence's date ${occElement.occurrence.from.day}/${occElement.occurrence.from.month} to be ${fromDay}/${fromMonth}.`;
                }
                return `${prefix}title ${occElement.title} to be ${event.title}.`;
            }
        };
    },
    toBeTimeLabel(label, start, end) {
        const startDate = new Date(0, 0, 0, start[0], start[1]);
        const startDateTime = DateTime.fromJSDate(startDate);
        const startString = startDateTime.toFormat('t');
        let endString = end ? ' - ' : '';
        if (end) {
            const endDate = new Date(0, 0, 0, end[0], end[1]);
            const endDateTime = DateTime.fromJSDate(endDate);
            endString += endDateTime.toFormat('t');
        }
        const expectedLabel = `${startString}${endString}`;
        return {
            pass: label === expectedLabel,
            message: () => `Expected ${label} to be ${expectedLabel}`
        };
    }
});

let element;
describe('Primitive Scheduler Agenda', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-primitive-scheduler-agenda', {
            is: PrimitiveSchedulerAgenda
        });
        document.body.appendChild(element);
    });

    it('Default attributes', () => {
        expect(element.availableDaysOfTheWeek).toEqual([0, 1, 2, 3, 4, 5, 6]);
        expect(element.availableMonths).toEqual([
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
        ]);
        expect(element.availableTimeFrames).toEqual(['00:00-23:59']);
        expect(element.collapseDisabled).toBeFalsy();
        expect(element.dateFormat).toBe('ff');
        expect(element.events).toEqual([]);
        expect(element.eventsLabels).toEqual({
            center: { fieldName: 'title' }
        });
        expect(element.eventsTheme).toBe('default');
        expect(element.hideResourcesFilter).toBeFalsy();
        expect(element.newEventTitle).toBe('New event');
        expect(element.readOnly).toBeFalsy();
        expect(element.resizeColumnDisabled).toBeFalsy();
        expect(element.resources).toEqual([]);

        const today = new Date();
        expect(element.selectedDate.hour).toBe(today.getHours());
        expect(element.selectedDate.day).toBe(today.getDate());
        expect(element.selectedDate.month - 1).toBe(today.getMonth());
        expect(element.selectedDate.year).toBe(today.getFullYear());

        expect(element.selectedResources).toEqual([]);
        expect(element.sidePanelPosition).toBe('left');
        expect(element.timeSpan).toEqual({ unit: 'day', span: 1 });
        expect(element.timezone).toBeUndefined();
    });

    /*
     * ------------------------------------------------------------
     *  ATTRIBUTES
     * -------------------------------------------------------------
     */

    // available-days-of-the-week
    it('Primitive Scheduler Agenda: availableDaysOfTheWeek', () => {
        element.events = [
            {
                resourceNames: ['resource-2'],
                name: 'monday',
                from: new Date(2022, 7, 29, 10),
                to: new Date(2022, 7, 29, 12)
            },
            {
                resourceNames: ['resource-2'],
                name: 'tuesday',
                from: new Date(2022, 7, 30, 10),
                to: new Date(2022, 7, 30, 12)
            },
            {
                resourceNames: ['resource-2'],
                name: 'thursday',
                from: new Date(2022, 8, 1, 10),
                to: new Date(2022, 8, 1, 12)
            },
            {
                resourceNames: ['resource-2'],
                name: 'friday',
                from: new Date(2022, 8, 2, 10),
                to: new Date(2022, 8, 2, 12)
            },
            {
                resourceNames: ['resource-2'],
                name: 'saturday',
                from: new Date(2022, 8, 3, 10),
                to: new Date(2022, 8, 3, 12)
            }
        ];
        element.resources = RESOURCES;
        element.timeSpan = { unit: 'month', span: 2 };
        element.selectedResources = ['resource-2'];
        element.selectedDate = SELECTED_DATE;
        expect(element.selectedDate.weekday).toBe(3);
        element.availableDaysOfTheWeek = [6, 0, 1];
        expect(element.selectedDate.weekday).toBe(6);

        return Promise.resolve().then(() => {
            const leftPanelCalendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-calendar-left-panel"]'
            );
            expect(leftPanelCalendar.disabledDates).toEqual([
                'Tue',
                'Wed',
                'Thu',
                'Fri'
            ]);

            const events = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            expect(events).toHaveLength(2);
            expect(events[0].eventName).toBe('monday');
            expect(events[1].eventName).toBe('saturday');
        });
    });

    // available-months
    it('Primitive Scheduler Agenda: availableMonths', () => {
        element.events = [
            {
                resourceNames: ['resource-2'],
                name: 'august',
                from: new Date(2022, 7, 30, 10),
                to: new Date(2022, 7, 30, 12)
            },
            {
                resourceNames: ['resource-2'],
                name: 'october',
                from: new Date(2022, 9, 19, 10),
                to: new Date(2022, 9, 19, 12)
            },
            {
                resourceNames: ['resource-2'],
                name: 'january',
                from: new Date(2023, 0, 3),
                to: new Date(2023, 0, 3, 17)
            }
        ];
        element.resources = RESOURCES;
        element.timeSpan = { unit: 'year', span: 2 };
        element.selectedResources = ['resource-2'];
        element.selectedDate = SELECTED_DATE;
        expect(element.selectedDate.month).toBe(8);
        element.availableMonths = [0, 1, 3, 9, 11];
        expect(element.selectedDate.month).toBe(10);

        return Promise.resolve()
            .then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                expect(events).toHaveLength(2);
                expect(events[0].eventName).toBe('october');
                expect(events[1].eventName).toBe('january');

                const leftPanelCalendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-calendar-left-panel"]'
                );
                expect(leftPanelCalendar.disabledDates).toEqual([]);
                leftPanelCalendar.dispatchEvent(
                    new CustomEvent('navigate', {
                        detail: {
                            date: new Date(2022, 7, 1).toISOString()
                        }
                    })
                );
            })
            .then(() => {
                const disabledDates = [];
                for (let i = 1; i < 32; i++) {
                    disabledDates.push(i);
                }

                const leftPanelCalendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-calendar-left-panel"]'
                );
                expect(leftPanelCalendar.disabledDates).toEqual(disabledDates);
            });
    });

    // available-time-frames
    it('Primitive Scheduler Agenda: availableTimeFrames', () => {
        element.events = [
            {
                resourceNames: ['resource-2'],
                name: 'event1',
                from: new Date(2022, 7, 24, 10),
                to: new Date(2022, 7, 24, 12)
            },
            {
                resourceNames: ['resource-2'],
                name: 'event2',
                from: new Date(2022, 7, 24, 4),
                to: new Date(2022, 7, 24, 8)
            }
        ];
        element.resources = RESOURCES;
        element.selectedResources = ['resource-2'];
        element.selectedDate = SELECTED_DATE;
        element.availableTimeFrames = ['09:00-15:00'];

        return Promise.resolve().then(() => {
            const events = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            expect(events).toHaveLength(1);
            expect(events[0].eventName).toBe('event1');
        });
    });

    // collapse-disabled
    it('Primitive Scheduler Calendar: collapseDisabled = false', () => {
        element.collapseDisabled = false;

        return Promise.resolve().then(() => {
            const collapseButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-splitter-collapse"]'
            );
            const expandButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-splitter-expand"]'
            );

            expect(collapseButton).toBeTruthy();
            expect(expandButton).toBeTruthy();
        });
    });

    it('Primitive Scheduler Calendar: collapseDisabled = true', () => {
        element.collapseDisabled = true;

        return Promise.resolve().then(() => {
            const collapseButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-splitter-collapse"]'
            );
            const expandButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-splitter-expand"]'
            );

            expect(collapseButton).toBeFalsy();
            expect(expandButton).toBeFalsy();
        });
    });

    // date-format
    it('Primitive Scheduler Agenda: dateFormat', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;
        element.dateFormat = 'hh:mm';

        return Promise.resolve().then(() => {
            const events = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            expect(events.length).toBeTruthy();
            events.forEach((event) => {
                expect(event.dateFormat).toBe('hh:mm');
            });
        });
    });

    // events
    it('Primitive Scheduler Agenda: events', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;
        element.timeSpan = { unit: 'month', span: 2 };

        return Promise.resolve().then(() => {
            const noEvents = element.shadowRoot.querySelector(
                '[data-element-id="avonni-illustration-no-events"]'
            );
            expect(noEvents).toBeFalsy();

            const monthHeadings = element.shadowRoot.querySelectorAll(
                '[data-element-id="div-month-heading"]'
            );
            expect(monthHeadings[0].textContent).toBe('August');
            expect(monthHeadings[1].textContent).toBe('September');

            const dayGroups = element.shadowRoot.querySelectorAll(
                '[data-element-id="div-day-group"]'
            );
            expect(dayGroups).toHaveLength(5);

            // 23rd of August
            const day0Heading = dayGroups[0].querySelector(
                '[data-element-id="div-day-heading"]'
            );
            expect(day0Heading.textContent).toBe('23TuesdayAug 2022');
            const day0Times = dayGroups[0].querySelectorAll(
                '[data-element-id="div-event-time"]'
            );
            expect(day0Times).toHaveLength(1);
            expect(day0Times[0].textContent).toBe('23 Aug - 26 Aug');
            const day0Events = dayGroups[0].querySelectorAll(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            expect(day0Events).toHaveLength(1);
            expect(day0Events[0]).toBeEvent({
                event: EVENTS[2],
                fromDay: 23,
                fromHour: 7,
                fromMonth: 8,
                resourceName: 'resource-3'
            });

            // 24th of August
            const day1Heading = dayGroups[1].querySelector(
                '[data-element-id="div-day-heading"]'
            );
            expect(day1Heading.textContent).toBe('24WednesdayAug 2022');
            const day1Times = dayGroups[1].querySelectorAll(
                '[data-element-id="div-event-time"]'
            );
            expect(day1Times).toHaveLength(4);
            expect(day1Times[0].textContent).toBeTimeLabel([10, 0], [10, 30]);
            expect(day1Times[1].textContent).toBeTimeLabel([10, 0], [10, 30]);
            expect(day1Times[2].textContent).toBe('All Day');
            expect(day1Times[3].textContent).toBe('23 Aug - 26 Aug');
            const day1Events = dayGroups[1].querySelectorAll(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            expect(day1Events).toHaveLength(4);
            expect(day1Events[0]).toBeEvent({
                event: EVENTS[0],
                fromDay: 24,
                fromHour: 10,
                fromMonth: 8,
                resourceName: 'resource-2'
            });
            expect(day1Events[1]).toBeEvent({
                event: EVENTS[0],
                fromDay: 24,
                fromHour: 10,
                fromMonth: 8,
                resourceName: 'resource-1'
            });
            expect(day1Events[2]).toBeEvent({
                event: EVENTS[1],
                fromDay: 24,
                fromHour: 0,
                fromMonth: 8,
                resourceName: 'resource-3'
            });
            expect(day1Events[3]).toBeEvent({
                event: EVENTS[2],
                fromDay: 23,
                fromHour: 7,
                fromMonth: 8,
                resourceName: 'resource-3'
            });

            // 25th of August
            const day2Heading = dayGroups[2].querySelector(
                '[data-element-id="div-day-heading"]'
            );
            expect(day2Heading.textContent).toBe('25ThursdayAug 2022');
            const day2Times = dayGroups[2].querySelectorAll(
                '[data-element-id="div-event-time"]'
            );
            expect(day2Times).toHaveLength(1);
            expect(day2Times[0].textContent).toBe('23 Aug - 26 Aug');
            const day2Events = dayGroups[2].querySelectorAll(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            expect(day2Events).toHaveLength(1);
            expect(day2Events[0]).toBeEvent({
                event: EVENTS[2],
                fromDay: 23,
                fromHour: 7,
                fromMonth: 8,
                resourceName: 'resource-3'
            });

            // 26th of August
            const day3Heading = dayGroups[3].querySelector(
                '[data-element-id="div-day-heading"]'
            );
            expect(day3Heading.textContent).toBe('26FridayAug 2022');
            const day3Times = dayGroups[3].querySelectorAll(
                '[data-element-id="div-event-time"]'
            );
            expect(day3Times).toHaveLength(1);
            expect(day3Times[0].textContent).toBe('23 Aug - 26 Aug');
            const day3Events = dayGroups[3].querySelectorAll(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            expect(day3Events).toHaveLength(1);
            expect(day3Events[0]).toBeEvent({
                event: EVENTS[2],
                fromDay: 23,
                fromHour: 7,
                fromMonth: 8,
                resourceName: 'resource-3'
            });

            // 3rd of September
            const day4Heading = dayGroups[4].querySelector(
                '[data-element-id="div-day-heading"]'
            );
            expect(day4Heading.textContent).toBe('3SaturdaySep 2022');
            const day4Times = dayGroups[4].querySelectorAll(
                '[data-element-id="div-event-time"]'
            );
            expect(day4Times).toHaveLength(1);
            expect(day4Times[0].textContent).toBeTimeLabel([14, 34]);
            const day4Events = dayGroups[4].querySelectorAll(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            expect(day4Events).toHaveLength(1);
            expect(day4Events[0]).toBeEvent({
                event: EVENTS[3],
                fromDay: 3,
                fromHour: 14,
                fromMonth: 9
            });
        });
    });

    it('Primitive Scheduler Agenda: recurring event', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = [RECURRING_EVENT];
        element.timeSpan = { unit: 'week', span: 1 };

        return Promise.resolve().then(() => {
            const dayGroups = element.shadowRoot.querySelectorAll(
                '[data-element-id="div-day-group"]'
            );
            expect(dayGroups).toHaveLength(4);
            dayGroups.forEach((group) => {
                const events = group.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                expect(events).toHaveLength(1);
            });
        });
    });

    it('Primitive Scheduler Agenda: no events', () => {
        const noEvents = element.shadowRoot.querySelector(
            '[data-element-id="avonni-illustration-no-events"]'
        );
        expect(noEvents).toBeTruthy();
    });

    // events-labels
    it('Primitive Scheduler Agenda: eventsLabels', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = [EVENTS[0]];
        element.eventsLabels = {
            center: { value: 'Some custom label' }
        };

        return Promise.resolve().then(() => {
            const events = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            events.forEach((event) => {
                expect(event.labels).toEqual({
                    center: { value: 'Some custom label' }
                });
            });
        });
    });

    it('Primitive Scheduler Agenda: eventsLabels is overwritten by specific event labels', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = [EVENTS[1]];
        element.eventsLabels = {
            center: { value: 'Some custom label' }
        };

        return Promise.resolve().then(() => {
            const event = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            expect(event.labels).toEqual(EVENTS[1].labels);
        });
    });

    // events-theme
    it('Primitive Scheduler Agenda: eventsTheme', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = [EVENTS[1]];
        element.eventsTheme = 'transparent';

        return Promise.resolve().then(() => {
            const event = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            expect(event.theme).toBe('transparent');
        });
    });

    it('Primitive Scheduler Agenda: eventsTheme is overwritten by specific event theme', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = new Date(2022, 8, 3);
        element.events = [EVENTS[3]];
        element.eventsTheme = 'transparent';

        return Promise.resolve().then(() => {
            const event = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            expect(event.theme).toBe('success');
        });
    });

    // hide-resources-filter
    it('Primitive Scheduler Agenda: hideResourcesFilter = false', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.hideResourcesFilter = false;

        return Promise.resolve().then(() => {
            const filter = element.shadowRoot.querySelector(
                '[data-element-id="div-resources-filter"]'
            );
            expect(filter).toBeTruthy();
        });
    });

    it('Primitive Scheduler Agenda: hideResourcesFilter = true', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.hideResourcesFilter = true;

        return Promise.resolve().then(() => {
            const filter = element.shadowRoot.querySelector(
                '[data-element-id="div-resources-filter"]'
            );
            expect(filter).toBeFalsy();
        });
    });

    // hide-side-panel
    it('Primitive Scheduler Agenda: hideSidePanel = false', () => {
        element.hideSidePanel = false;

        return Promise.resolve()
            .then(() => {
                const panel = element.shadowRoot.querySelector(
                    '[data-element-id="div-panel-left"]'
                );
                const mainSection = element.shadowRoot.querySelector(
                    '[data-element-id="div-main-section"]'
                );
                expect(mainSection.classList).not.toContain(
                    'avonni-scheduler__main-border_left'
                );
                expect(panel).toBeTruthy();

                element.sidePanelPosition = 'right';
            })
            .then(() => {
                const panel = element.shadowRoot.querySelector(
                    '[data-element-id="div-panel-right"]'
                );
                const mainSection = element.shadowRoot.querySelector(
                    '[data-element-id="div-main-section"]'
                );
                expect(mainSection.classList).not.toContain(
                    'avonni-scheduler__main-border_right'
                );
                expect(panel).toBeTruthy();
            });
    });

    it('Primitive Scheduler Agenda: hideSidePanel = true', () => {
        element.hideSidePanel = true;

        return Promise.resolve()
            .then(() => {
                const panel = element.shadowRoot.querySelector(
                    '[data-element-id="div-panel-left"]'
                );
                const mainSection = element.shadowRoot.querySelector(
                    '[data-element-id="div-main-section"]'
                );
                expect(mainSection.classList).toContain(
                    'avonni-scheduler__main-border_left'
                );
                expect(panel).toBeFalsy();

                element.sidePanelPosition = 'right';
            })
            .then(() => {
                const panel = element.shadowRoot.querySelector(
                    '[data-element-id="div-panel-right"]'
                );
                const mainSection = element.shadowRoot.querySelector(
                    '[data-element-id="div-main-section"]'
                );
                expect(mainSection.classList).toContain(
                    'avonni-scheduler__main-border_right'
                );
                expect(panel).toBeFalsy();
            });
    });

    // read-only
    it('Primitive Scheduler Agenda: readOnly = false, double click on empty spot is possible', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;
        element.readOnly = false;

        const handler = jest.fn();
        element.addEventListener('openeditdialog', handler);

        return Promise.resolve().then(() => {
            const dayGroup = element.shadowRoot.querySelector(
                '[data-element-id="div-day-group"]'
            );
            jest.spyOn(dayGroup, 'getBoundingClientRect').mockImplementation(
                () => {
                    return { top: 5, bottom: 50 };
                }
            );
            const dblclick = new CustomEvent('dblclick');
            dblclick.clientY = 18;
            dayGroup.dispatchEvent(dblclick);
            expect(handler).toHaveBeenCalled();
        });
    });

    it('Primitive Scheduler Agenda: readOnly = true, prevents double click on empty spot', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;
        element.readOnly = true;

        const handler = jest.fn();
        element.addEventListener('openeditdialog', handler);

        return Promise.resolve().then(() => {
            const dayGroup = element.shadowRoot.querySelector(
                '[data-element-id="div-day-group"]'
            );
            jest.spyOn(dayGroup, 'getBoundingClientRect').mockImplementation(
                () => {
                    return { top: 5, bottom: 50 };
                }
            );
            const dblclick = new CustomEvent('dblclick');
            dblclick.clientY = 18;
            dayGroup.dispatchEvent(dblclick);
            expect(handler).not.toHaveBeenCalled();
        });
    });

    it('Primitive Scheduler Agenda: readOnly = false, double click on event is possible', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;
        element.readOnly = false;

        const handler = jest.fn();
        element.addEventListener('openeditdialog', handler);

        return Promise.resolve().then(() => {
            const event = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            event.dispatchEvent(
                new CustomEvent('privatedblclick', {
                    detail: {
                        eventName: event.eventName,
                        from: event.from,
                        x: 3,
                        y: 120,
                        key: event.occurrenceKey
                    }
                })
            );
            expect(handler).toHaveBeenCalled();
        });
    });

    it('Primitive Scheduler Agenda: readOnly = true, prevents double click on event', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;
        element.readOnly = true;

        const handler = jest.fn();
        element.addEventListener('openeditdialog', handler);

        return Promise.resolve().then(() => {
            const event = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            event.dispatchEvent(
                new CustomEvent('privatedblclick', {
                    detail: {
                        eventName: event.eventName,
                        from: event.from,
                        x: 3,
                        y: 120,
                        key: event.occurrenceKey
                    }
                })
            );
            expect(handler).not.toHaveBeenCalled();
        });
    });

    // resize-column-disabled
    it('Primitive Scheduler Calendar: resizeColumnDisabled = false', () => {
        element.resizeColumnDisabled = false;

        return Promise.resolve().then(() => {
            const resizeHandle = element.shadowRoot.querySelector(
                '[data-element-id="div-splitter-resize-handle"]'
            );
            expect(resizeHandle).toBeTruthy();
        });
    });

    it('Primitive Scheduler Calendar: resizeColumnDisabled = true', () => {
        element.resizeColumnDisabled = true;

        return Promise.resolve().then(() => {
            const resizeHandle = element.shadowRoot.querySelector(
                '[data-element-id="div-splitter-resize-handle"]'
            );
            expect(resizeHandle).toBeFalsy();
        });
    });

    // resources
    it('Primitive Scheduler Agenda: resources', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;

        return Promise.resolve().then(() => {
            const events = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            events.forEach((event) => {
                expect(event.resources).toMatchObject(RESOURCES);
            });

            const checkboxes = element.shadowRoot.querySelectorAll(
                '[data-element-id="lightning-input-resource"]'
            );
            expect(checkboxes).toHaveLength(RESOURCES.length);
            checkboxes.forEach((checkbox, i) => {
                expect(checkbox.label).toBe(RESOURCES[i].label);
                expect(checkbox.value).toBe(RESOURCES[i].name);
            });
        });
    });

    // selected-date
    it('Primitive Scheduler Agenda: selectedDate', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-calendar-left-panel"]'
            );
            expect(calendar.value.ts).toBe(SELECTED_DATE.getTime());
        });
    });

    // selected-resources
    it('Primitive Scheduler Agenda: selectedResources', () => {
        element.resources = RESOURCES;
        element.selectedResources = ['resource-1', 'resource-3'];
        element.selectedDate = SELECTED_DATE;
        element.events = [EVENTS[0]];

        return Promise.resolve().then(() => {
            const events = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            expect(events).toHaveLength(1);

            const checkboxes = element.shadowRoot.querySelectorAll(
                '[data-element-id="lightning-input-resource"]'
            );
            expect(checkboxes[0].checked).toBeTruthy();
            expect(checkboxes[1].checked).toBeFalsy();
            expect(checkboxes[2].checked).toBeTruthy();
        });
    });

    it('Primitive Scheduler Agenda: reference lines do not depend on selectedResources', () => {
        element.resources = RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;
        element.timeSpan = { unit: 'month', span: 2 };

        return Promise.resolve().then(() => {
            const events = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            expect(events).toHaveLength(1);
            expect(events[0].eventName).toBe(EVENTS[3].name);

            const checkboxes = element.shadowRoot.querySelectorAll(
                '[data-element-id="lightning-input-resource"]'
            );
            checkboxes.forEach((checkbox) => {
                expect(checkbox.checked).toBeFalsy();
            });
        });
    });

    // side-panel-position
    it('Primitive Scheduler Agenda: sidePanelPosition left', () => {
        element.sidePanelPosition = 'left';

        return Promise.resolve().then(() => {
            const mainSection = element.shadowRoot.querySelector(
                '[data-element-id="div-main-section"]'
            );
            const leftPanel = element.shadowRoot.querySelector(
                '[data-element-id="div-panel-left"]'
            );
            const rightPanel = element.shadowRoot.querySelector(
                '[data-element-id="div-panel-right"]'
            );

            expect(leftPanel).toBeTruthy();
            expect(rightPanel).toBeFalsy();
            expect(mainSection.classList).toContain(
                'avonni-scheduler__main-border_right'
            );
            expect(mainSection.classList).not.toContain(
                'avonni-scheduler__main-border_left'
            );
            expect(leftPanel.classList).toContain(
                'avonni-scheduler__main-border_left'
            );
            expect(leftPanel.classList).not.toContain(
                'avonni-scheduler__main-border_right'
            );
        });
    });

    it('Primitive Scheduler Agenda: sidePanelPosition right', () => {
        element.sidePanelPosition = 'right';

        return Promise.resolve().then(() => {
            const leftPanel = element.shadowRoot.querySelector(
                '[data-element-id="div-panel-left"]'
            );
            const rightPanel = element.shadowRoot.querySelector(
                '[data-element-id="div-panel-right"]'
            );
            const mainSection = element.shadowRoot.querySelector(
                '[data-element-id="div-main-section"]'
            );

            expect(leftPanel).toBeFalsy();
            expect(rightPanel).toBeTruthy();
            expect(mainSection.classList).not.toContain(
                'avonni-scheduler__main-border_right'
            );
            expect(mainSection.classList).toContain(
                'avonni-scheduler__main-border_left'
            );
            expect(rightPanel.classList).not.toContain(
                'avonni-scheduler__main-border_left'
            );
            expect(rightPanel.classList).toContain(
                'avonni-scheduler__main-border_right'
            );
        });
    });

    // time-span and visibleintervalchange event
    it('Primitive Scheduler Agenda: timeSpan of one day', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        const selectedDate = DateTime.fromJSDate(new Date(2022, 7, 23));
        element.selectedDate = selectedDate;
        element.events = EVENTS;

        const handler = jest.fn();
        element.addEventListener('visibleintervalchange', handler);

        element.timeSpan = { unit: 'day', span: 1 };

        return Promise.resolve().then(() => {
            const events = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            expect(events).toHaveLength(1);
            expect(events[0].eventName).toBe(EVENTS[2].name);

            const dayHeading = element.shadowRoot.querySelector(
                '[data-element-id="div-day-heading"]'
            );
            expect(dayHeading.textContent).toBe('23TuesdayAug 2022');
            const monthHeading = element.shadowRoot.querySelector(
                '[data-element-id="div-month-heading"]'
            );
            expect(monthHeading).toBeFalsy();

            expect(handler).toHaveBeenCalled();
            const detail = handler.mock.calls[0][0].detail;
            expect(detail.start.ts).toBe(selectedDate.ts);
            const end = selectedDate.endOf('day');
            expect(detail.visibleInterval.e.ts).toBe(end.ts);
        });
    });

    it('Primitive Scheduler Agenda: timeSpan of one week', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;

        const handler = jest.fn();
        element.addEventListener('visibleintervalchange', handler);

        element.timeSpan = { unit: 'week', span: 1 };

        return Promise.resolve().then(() => {
            const events = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            expect(events).toHaveLength(7);
            const monthHeading = element.shadowRoot.querySelector(
                '[data-element-id="div-month-heading"]'
            );
            expect(monthHeading).toBeFalsy();

            expect(handler).toHaveBeenCalled();
            const detail = handler.mock.calls[0][0].detail;
            const start = DateTime.fromJSDate(new Date(2022, 7, 21));
            const end = DateTime.fromJSDate(new Date(2022, 7, 27)).endOf('day');
            expect(detail.start.ts).toBe(start.ts);
            expect(detail.visibleInterval.e.ts).toBe(end.ts);
        });
    });

    it('Primitive Scheduler Agenda: timeSpan of one month', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = new Date(2022, 8, 10, 4, 56, 16);
        element.events = EVENTS;

        const handler = jest.fn();
        element.addEventListener('visibleintervalchange', handler);

        element.timeSpan = { unit: 'month', span: 1 };

        return Promise.resolve().then(() => {
            const events = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            expect(events).toHaveLength(1);
            const monthHeading = element.shadowRoot.querySelector(
                '[data-element-id="div-month-heading"]'
            );
            expect(monthHeading).toBeFalsy();

            expect(handler).toHaveBeenCalled();
            const detail = handler.mock.calls[0][0].detail;
            const start = DateTime.fromJSDate(new Date(2022, 8, 1));
            const end = DateTime.fromJSDate(new Date(2022, 8, 30)).endOf('day');
            expect(detail.start.ts).toBe(start.ts);
            expect(detail.visibleInterval.e.ts).toBe(end.ts);
        });
    });

    it('Primitive Scheduler Agenda: timeSpan of one year', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;

        const handler = jest.fn();
        element.addEventListener('visibleintervalchange', handler);

        element.timeSpan = { unit: 'year', span: 1 };

        return Promise.resolve().then(() => {
            const events = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            expect(events).toHaveLength(8);
            const monthHeadings = element.shadowRoot.querySelectorAll(
                '[data-element-id="div-month-heading"]'
            );
            expect(monthHeadings).toHaveLength(2);
            expect(monthHeadings[0].textContent).toBe('August');
            expect(monthHeadings[1].textContent).toBe('September');

            expect(handler).toHaveBeenCalled();
            const detail = handler.mock.calls[0][0].detail;
            const start = DateTime.fromJSDate(new Date(2022, 0, 1));
            const end = DateTime.fromJSDate(new Date(2022, 11, 31)).endOf(
                'day'
            );
            expect(detail.start.ts).toBe(start.ts);
            expect(detail.visibleInterval.e.ts).toBe(end.ts);
        });
    });

    it('Primitive Scheduler Agenda: timezone', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = '2023-02-17T00:00:00.000Z';
        element.events = [
            {
                name: 'someEvent',
                from: '2023-02-17T00:00:00.000Z',
                to: '2023-02-17T10:00:00.000Z',
                resourceNames: [ALL_RESOURCES[0]]
            }
        ];

        const handler = jest.fn();
        element.addEventListener('visibleintervalchange', handler);

        element.timezone = 'UTC';

        return Promise.resolve().then(() => {
            expect(handler).toHaveBeenCalled();
            const detail = handler.mock.calls[0][0].detail;
            expect(detail.start.zoneName).toBe('UTC');
            expect(detail.visibleInterval.s.zoneName).toBe('UTC');
            expect(detail.visibleInterval.e.zoneName).toBe('UTC');

            const dayGroup = element.shadowRoot.querySelector(
                '[data-element-id="div-day-group"]'
            );
            const start = new Date(
                Number(dayGroup.dataset.start)
            ).toISOString();
            const end = new Date(Number(dayGroup.dataset.end)).toISOString();
            expect(start).toBe('2023-02-17T00:00:00.000Z');
            expect(end).toBe('2023-02-17T23:59:59.999Z');
        });
    });

    it('Primitive Scheduler Agenda: timezone is not UTC', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = '2023-02-17T00:00:00.000Z';
        element.events = [
            {
                name: 'someEvent',
                from: '2023-02-17T00:00:00.000Z',
                to: '2023-02-17T10:00:00.000Z',
                resourceNames: [ALL_RESOURCES[0]]
            }
        ];

        const handler = jest.fn();
        element.addEventListener('visibleintervalchange', handler);

        element.timezone = 'Asia/Shanghai';

        return Promise.resolve().then(() => {
            expect(handler).toHaveBeenCalled();
            const detail = handler.mock.calls[0][0].detail;
            expect(detail.start.zoneName).toBe('Asia/Shanghai');
            expect(detail.visibleInterval.s.zoneName).toBe('Asia/Shanghai');
            expect(detail.visibleInterval.e.zoneName).toBe('Asia/Shanghai');

            const dayGroup = element.shadowRoot.querySelector(
                '[data-element-id="div-day-group"]'
            );
            const start = new Date(
                Number(dayGroup.dataset.start)
            ).toISOString();
            const end = new Date(Number(dayGroup.dataset.end)).toISOString();
            expect(start).toBe('2023-02-16T16:00:00.000Z');
            expect(end).toBe('2023-02-17T15:59:59.999Z');
        });
    });

    /*
     * ------------------------------------------------------------
     *  METHODS
     * -------------------------------------------------------------
     */

    // collapseSidePanel
    it('Primitive Scheduler Agenda: collapseSidePanel() method', () => {
        let collapseButton = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-splitter-collapse"]'
        );
        let resizeButton = element.shadowRoot.querySelector(
            '[data-element-id="div-splitter-resize-handle"]'
        );
        let sidePanel = element.shadowRoot.querySelector(
            '[data-element-id^="div-panel"]'
        );
        expect(collapseButton).toBeTruthy();
        expect(resizeButton).toBeTruthy();
        expect(sidePanel.classList).not.toContain(
            'avonni-scheduler__panel_collapsed'
        );
        element.collapseSidePanel();

        return Promise.resolve().then(() => {
            collapseButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-splitter-collapse"]'
            );
            resizeButton = element.shadowRoot.querySelector(
                '[data-element-id="div-splitter-resize-handle"]'
            );
            sidePanel = element.shadowRoot.querySelector(
                '[data-element-id^="div-panel"]'
            );
            expect(collapseButton).toBeFalsy();
            expect(resizeButton).toBeFalsy();
            expect(sidePanel.classList).toContain(
                'avonni-scheduler__panel_collapsed'
            );
        });
    });

    it('Primitive Scheduler Agenda: collapseSidePanel() method, with right panel', () => {
        element.sidePanelPosition = 'right';

        return Promise.resolve()
            .then(() => {
                const collapseButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-splitter-collapse"]'
                );
                const resizeButton = element.shadowRoot.querySelector(
                    '[data-element-id="div-splitter-resize-handle"]'
                );
                const sidePanel = element.shadowRoot.querySelector(
                    '[data-element-id^="div-panel"]'
                );
                expect(collapseButton).toBeTruthy();
                expect(resizeButton).toBeTruthy();
                expect(sidePanel.classList).not.toContain(
                    'avonni-scheduler__panel_collapsed'
                );
                element.collapseSidePanel();
            })
            .then(() => {
                const collapseButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-splitter-collapse"]'
                );
                const resizeButton = element.shadowRoot.querySelector(
                    '[data-element-id="div-splitter-resize-handle"]'
                );
                const sidePanel = element.shadowRoot.querySelector(
                    '[data-element-id^="div-panel"]'
                );
                expect(collapseButton).toBeFalsy();
                expect(resizeButton).toBeFalsy();
                expect(sidePanel.classList).toContain(
                    'avonni-scheduler__panel_collapsed'
                );
            });
    });

    it('Primitive Scheduler Agenda: collapseSidePanel() method, user triggered', () => {
        const collapseButton = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-splitter-collapse"]'
        );
        collapseButton.click();

        return Promise.resolve().then(() => {
            const sidePanel = element.shadowRoot.querySelector(
                '[data-element-id^="div-panel"]'
            );
            expect(sidePanel.classList).toContain(
                'avonni-scheduler__panel_collapsed'
            );
        });
    });

    it('Primitive Scheduler Agenda: collapseSidePanel() erases panel resizing', () => {
        const splitter = element.shadowRoot.querySelector(
            '[data-element-id="div-splitter"]'
        );
        const panel = element.shadowRoot.querySelector(
            '[data-element-id^="div-panel"]'
        );
        jest.spyOn(panel, 'offsetWidth', 'get').mockReturnValue(50);

        // Resize panel
        const mousedown = new CustomEvent('mousedown');
        mousedown.button = 0;
        mousedown.clientX = 100;
        splitter.dispatchEvent(mousedown);

        const mousemove = new CustomEvent('mousemove');
        mousemove.clientX = 200;
        window.dispatchEvent(mousemove);

        const mouseup = new CustomEvent('mouseup');
        window.dispatchEvent(mouseup);

        expect(panel.style.flexBasis).toBe('150px');

        // Collapse panel
        element.collapseSidePanel();

        return Promise.resolve().then(() => {
            const sidePanel = element.shadowRoot.querySelector(
                '[data-element-id^="div-panel"]'
            );
            expect(sidePanel.style.flexBasis).toBe('');
        });
    });

    // createEvent
    it('Primitive Scheduler Agenda: createEvent()', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;

        return Promise.resolve()
            .then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                expect(events).toHaveLength(0);
                element.createEvent(EVENTS[0]);
            })
            .then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                expect(events).toHaveLength(2);
                expect(events[0].eventName).toBe(EVENTS[0].name);
            });
    });

    // deleteEvent
    it('Primitive Scheduler Agenda: deleteEvent()', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = [EVENTS[0], EVENTS[1]];

        return Promise.resolve()
            .then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                expect(events).toHaveLength(3);
                element.deleteEvent(EVENTS[1].name);
            })
            .then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                expect(events).toHaveLength(2);
            });
    });

    // expandSidePanel
    it('Primitive Scheduler Agenda: expandSidePanel() method', () => {
        let expandButton = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-splitter-expand"]'
        );
        let resizeButton = element.shadowRoot.querySelector(
            '[data-element-id="div-splitter-resize-handle"]'
        );
        let sidePanel = element.shadowRoot.querySelector(
            '[data-element-id^="div-panel"]'
        );
        expect(expandButton).toBeTruthy();
        expect(resizeButton).toBeTruthy();
        expect(sidePanel.classList).not.toContain(
            'avonni-scheduler__panel_expanded'
        );
        element.expandSidePanel();

        return Promise.resolve().then(() => {
            expandButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-splitter-expand"]'
            );
            resizeButton = element.shadowRoot.querySelector(
                '[data-element-id="div-splitter-resize-handle"]'
            );
            sidePanel = element.shadowRoot.querySelector(
                '[data-element-id^="div-panel"]'
            );
            expect(expandButton).toBeFalsy();
            expect(resizeButton).toBeFalsy();
            expect(sidePanel.classList).toContain(
                'avonni-scheduler__panel_expanded'
            );
        });
    });

    it('Primitive Scheduler Agenda: expandSidePanel() method, user triggered', () => {
        const expandButton = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-splitter-expand"]'
        );
        expandButton.click();

        return Promise.resolve().then(() => {
            const sidePanel = element.shadowRoot.querySelector(
                '[data-element-id^="div-panel"]'
            );
            expect(sidePanel.classList).toContain(
                'avonni-scheduler__panel_expanded'
            );
        });
    });

    it('Primitive Scheduler Agenda: expandSidePanel() erases panel resizing', () => {
        const splitter = element.shadowRoot.querySelector(
            '[data-element-id="div-splitter"]'
        );
        const panel = element.shadowRoot.querySelector(
            '[data-element-id^="div-panel"]'
        );
        jest.spyOn(panel, 'offsetWidth', 'get').mockReturnValue(50);

        // Resize panel
        const mousedown = new CustomEvent('mousedown');
        mousedown.button = 0;
        mousedown.clientX = 100;
        splitter.dispatchEvent(mousedown);

        const mousemove = new CustomEvent('mousemove');
        mousemove.clientX = 200;
        window.dispatchEvent(mousemove);

        const mouseup = new CustomEvent('mouseup');
        window.dispatchEvent(mouseup);

        expect(panel.style.flexBasis).toBe('150px');

        // Collapse panel
        element.expandSidePanel();

        return Promise.resolve().then(() => {
            const sidePanel = element.shadowRoot.querySelector(
                '[data-element-id^="div-panel"]'
            );
            expect(sidePanel.style.flexBasis).toBe('');
        });
    });

    it('Primitive Scheduler Agenda: expandSidePanel() and collapseSidePanel() in a row', () => {
        // Collapse
        element.collapseSidePanel();

        return Promise.resolve()
            .then(() => {
                const sidePanel = element.shadowRoot.querySelector(
                    '[data-element-id^="div-panel"]'
                );
                expect(sidePanel.classList).toContain(
                    'avonni-scheduler__panel_collapsed'
                );
                expect(sidePanel.classList).not.toContain(
                    'avonni-scheduler__panel_expanded'
                );
                // Expand to original position
                element.expandSidePanel();
            })
            .then(() => {
                const sidePanel = element.shadowRoot.querySelector(
                    '[data-element-id^="div-panel"]'
                );
                expect(sidePanel.classList).not.toContain(
                    'avonni-scheduler__panel_collapsed'
                );
                expect(sidePanel.classList).not.toContain(
                    'avonni-scheduler__panel_expanded'
                );
                // Expand to full width
                element.expandSidePanel();
            })
            .then(() => {
                const sidePanel = element.shadowRoot.querySelector(
                    '[data-element-id^="div-panel"]'
                );
                expect(sidePanel.classList).not.toContain(
                    'avonni-scheduler__panel_collapsed'
                );
                expect(sidePanel.classList).toContain(
                    'avonni-scheduler__panel_expanded'
                );
                // Collapse to original position
                element.collapseSidePanel();
            })
            .then(() => {
                const sidePanel = element.shadowRoot.querySelector(
                    '[data-element-id^="div-panel"]'
                );
                expect(sidePanel.classList).not.toContain(
                    'avonni-scheduler__panel_collapsed'
                );
                expect(sidePanel.classList).not.toContain(
                    'avonni-scheduler__panel_expanded'
                );
            });
    });

    // focusEvent
    it('Primitive Scheduler Agenda: focusEvent()', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;

        return Promise.resolve().then(() => {
            const event = element.shadowRoot.querySelector(
                `[data-element-id="avonni-primitive-scheduler-event-occurrence"][data-event-name="${EVENTS[1].name}"]`
            );
            const spy = jest.spyOn(event, 'focus');
            element.focusEvent(EVENTS[1].name);
            expect(spy).toHaveBeenCalled();
        });
    });

    // newEvent, cleanSelection and saveSelection
    it('Primitive Scheduler Agenda: newEvent() and saveSelection() methods', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.timeSpan = { unit: 'day', span: 3 };
        element.events = [
            {
                name: 'first event',
                from: new Date(2022, 7, 24, 10),
                to: new Date(2022, 7, 24, 11),
                resourceNames: [ALL_RESOURCES[1]]
            },
            {
                name: 'second event',
                from: new Date(2022, 7, 25, 11),
                to: new Date(2022, 7, 25, 12),
                resourceNames: [ALL_RESOURCES[1]]
            }
        ];
        element.newEventTitle = 'Some new title';

        return Promise.resolve()
            .then(() => {
                const dayGroups = element.shadowRoot.querySelectorAll(
                    '[data-element-id="div-day-group"]'
                );
                const firstGroupEvents = dayGroups[0].querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                const secondGroupEvents = dayGroups[1].querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                expect(secondGroupEvents).toHaveLength(1);
                expect(firstGroupEvents).toHaveLength(1);

                jest.spyOn(
                    dayGroups[1],
                    'getBoundingClientRect'
                ).mockImplementation(() => {
                    return { top: 5, bottom: 18 };
                });
                element.newEvent({ x: 0, y: 6, saveEvent: true });
            })
            .then(() => {
                // The event has not been saved
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                expect(events).toHaveLength(2);

                element.saveSelection();
            })
            .then(() => {
                const dayGroups = element.shadowRoot.querySelectorAll(
                    '[data-element-id="div-day-group"]'
                );
                const firstGroupEvents = dayGroups[0].querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                const secondGroupEvents = dayGroups[1].querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                expect(secondGroupEvents).toHaveLength(2);
                expect(firstGroupEvents).toHaveLength(1);
                expect(secondGroupEvents[1].title).toBe('Some new title');
                expect(
                    secondGroupEvents[1].eventName.startsWith('some-new-title')
                ).toBeTruthy();
                expect(secondGroupEvents[1].from.day).toBe(25);
                expect(secondGroupEvents[1].resourceKey).toBe(ALL_RESOURCES[0]);
            });
    });

    it('Primitive Scheduler Agenda: newEvent() and saveSelection() methods with no given position', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.timeSpan = { unit: 'day', span: 3 };
        element.events = [
            {
                name: 'first event',
                from: new Date(2022, 7, 24, 10),
                to: new Date(2022, 7, 24, 11),
                resourceNames: [ALL_RESOURCES[1]]
            },
            {
                name: 'second event',
                from: new Date(2022, 7, 25, 11),
                to: new Date(2022, 7, 25, 12),
                resourceNames: [ALL_RESOURCES[1]]
            }
        ];
        element.newEventTitle = 'Some new title';

        return Promise.resolve()
            .then(() => {
                const dayGroups = element.shadowRoot.querySelectorAll(
                    '[data-element-id="div-day-group"]'
                );
                const firstGroupEvents = dayGroups[0].querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                const secondGroupEvents = dayGroups[1].querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                expect(secondGroupEvents).toHaveLength(1);
                expect(firstGroupEvents).toHaveLength(1);

                jest.spyOn(
                    dayGroups[1],
                    'getBoundingClientRect'
                ).mockImplementation(() => {
                    return { top: 5, bottom: 18 };
                });
                element.newEvent({ saveEvent: true });
            })
            .then(() => {
                // The event has not been saved
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                expect(events).toHaveLength(2);

                element.saveSelection();
            })
            .then(() => {
                const dayGroups = element.shadowRoot.querySelectorAll(
                    '[data-element-id="div-day-group"]'
                );
                const firstGroupEvents = dayGroups[0].querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                const secondGroupEvents = dayGroups[1].querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                expect(secondGroupEvents).toHaveLength(1);
                expect(firstGroupEvents).toHaveLength(2);
                expect(firstGroupEvents[1].title).toBe('Some new title');
                expect(
                    firstGroupEvents[1].eventName.startsWith('some-new-title')
                ).toBeTruthy();
                expect(firstGroupEvents[1].from.day).toBe(24);
                expect(firstGroupEvents[1].resourceKey).toBe(ALL_RESOURCES[0]);
            });
    });

    it('Primitive Scheduler Agenda: newEvent() and cleanSelection() methods', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = [EVENTS[0]];
        element.newEventTitle = 'Some new title';

        return Promise.resolve()
            .then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                expect(events).toHaveLength(2);

                const dayGroup = element.shadowRoot.querySelector(
                    '[data-element-id="div-day-group"]'
                );
                jest.spyOn(
                    dayGroup,
                    'getBoundingClientRect'
                ).mockImplementation(() => {
                    return { top: 5, bottom: 18 };
                });
                element.newEvent({ x: 0, y: 6, saveEvent: true });
            })
            .then(() => {
                // The event has not been saved
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                expect(events).toHaveLength(2);

                element.cleanSelection(true);
            })
            .then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                expect(events).toHaveLength(2);
            });
    });

    /*
     * ------------------------------------------------------------
     *  EVENTS
     * -------------------------------------------------------------
     */

    // datechange
    it('Primitive Scheduler Agenda: datechange event', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;

        const handler = jest.fn();
        element.addEventListener('datechange', handler);

        return Promise.resolve().then(() => {
            const events = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            expect(events).toHaveLength(4);

            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-calendar-left-panel"]'
            );
            const newDate = new Date(2022, 8, 3);
            calendar.dispatchEvent(
                new CustomEvent('change', {
                    detail: {
                        value: newDate
                    }
                })
            );
            expect(handler).toHaveBeenCalled();
            const call = handler.mock.calls[0][0];
            expect(call.detail.value.ts).toBe(newDate.getTime());
            expect(call.bubbles).toBeFalsy();
            expect(call.cancelable).toBeFalsy();
            expect(call.composed).toBeFalsy();
        });
    });

    it('Primitive Scheduler Agenda: datechange event is not dispatched if date was unselected', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;

        const handler = jest.fn();
        element.addEventListener('datechange', handler);

        return Promise.resolve().then(() => {
            const events = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            expect(events).toHaveLength(4);

            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-calendar-left-panel"]'
            );
            calendar.dispatchEvent(
                new CustomEvent('change', {
                    detail: {
                        value: null
                    }
                })
            );
            expect(handler).not.toHaveBeenCalled();
        });
    });

    // emptyspotcontextmenu
    it('Primitive Scheduler Agenda: emptyspotcontextmenu event', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;

        const handler = jest.fn();
        element.addEventListener('emptyspotcontextmenu', handler);

        return Promise.resolve().then(() => {
            const dayGroup = element.shadowRoot.querySelector(
                '[data-element-id="div-day-group"]'
            );
            jest.spyOn(dayGroup, 'getBoundingClientRect').mockImplementation(
                () => {
                    return { top: 30, bottom: 40 };
                }
            );
            const event = new CustomEvent('contextmenu');
            event.clientY = 35;
            const from = Number(dayGroup.dataset.date);
            const to = from + 24 * 60 * 60 * 1000 - 1;
            dayGroup.dispatchEvent(event);

            expect(handler).toHaveBeenCalled();
            const call = handler.mock.calls[0][0];
            expect(call.detail.y).toBe(35);
            expect(new Date(call.detail.from).getTime()).toBe(from);
            expect(new Date(call.detail.to).getTime()).toBe(to);
            expect(call.bubbles).toBeFalsy();
            expect(call.cancelable).toBeFalsy();
            expect(call.composed).toBeFalsy();
        });
    });

    it('Primitive Scheduler Agenda: emptyspotcontextmenu event dispatched by disabled event', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = [EVENTS[2]];

        const handler = jest.fn();
        element.addEventListener('emptyspotcontextmenu', handler);

        return Promise.resolve().then(() => {
            const event = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            const contextMenuEvent = new CustomEvent(
                'privatedisabledcontextmenu'
            );
            contextMenuEvent.clientY = 35;
            const from = Number(event.dataset.start);
            const to = Number(event.dataset.end);
            event.dispatchEvent(contextMenuEvent);

            expect(handler).toHaveBeenCalled();
            const call = handler.mock.calls[0][0];
            expect(call.detail.y).toBe(35);
            expect(new Date(call.detail.from).getTime()).toBe(from);
            expect(new Date(call.detail.to).getTime()).toBe(to);
        });
    });

    // eventcontextmenu
    it('Primitive Scheduler Agenda: eventcontextmenu event', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;

        const handler = jest.fn();
        element.addEventListener('eventcontextmenu', handler);

        return Promise.resolve().then(() => {
            const event = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            const detail = {
                eventName: event.eventName,
                key: event.occurrenceKey,
                x: 32,
                y: 12
            };
            event.dispatchEvent(
                new CustomEvent('privatecontextmenu', {
                    detail
                })
            );
            expect(handler).toHaveBeenCalled();
            const call = handler.mock.calls[0][0];
            expect(call.detail).toEqual(detail);
            expect(call.bubbles).toBeFalsy();
            expect(call.cancelable).toBeFalsy();
            expect(call.composed).toBeFalsy();
        });
    });

    it('Primitive Scheduler Agenda: eventcontextmenu event is not dispatched for disabled and referenceline events', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = [EVENTS[2], EVENTS[3]];

        const handler = jest.fn();
        element.addEventListener('eventcontextmenu', handler);

        return Promise.resolve().then(() => {
            const events = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            events.forEach((event) => {
                event.dispatchEvent(
                    new CustomEvent('privatecontextmenu', {
                        detail: {}
                    })
                );
            });
            expect(handler).not.toHaveBeenCalled();
        });
    });

    // eventmouseenter
    it('Primitive Scheduler Agenda: eventmouseenter', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;

        const handler = jest.fn();
        element.addEventListener('eventmouseenter', handler);

        return Promise.resolve().then(() => {
            const event = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            const detail = {
                eventName: event.eventName,
                key: event.occurrenceKey,
                x: 23,
                y: 67
            };
            event.dispatchEvent(
                new CustomEvent('privatemouseenter', {
                    detail
                })
            );
            expect(handler).toHaveBeenCalled();
            const call = handler.mock.calls[0][0];
            expect(call.detail).toEqual(detail);
            expect(call.bubbles).toBeFalsy();
            expect(call.cancelable).toBeFalsy();
            expect(call.composed).toBeFalsy();
        });
    });

    // eventmouseleave
    it('Primitive Scheduler Agenda: eventmouseleave', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;

        const handler = jest.fn();
        element.addEventListener('eventmouseleave', handler);

        return Promise.resolve().then(() => {
            const event = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            const detail = {
                eventName: 'some name',
                key: 'some key',
                x: 34,
                y: 56
            };
            event.dispatchEvent(
                new CustomEvent('privatemouseleave', { detail })
            );

            expect(handler).toHaveBeenCalledTimes(1);
            const call = handler.mock.calls[0][0];
            expect(call.detail).toEqual(detail);
            expect(call.bubbles).toBeFalsy();
            expect(call.composed).toBeFalsy();
            expect(call.cancelable).toBeFalsy();
        });
    });

    // eventselect
    it('Primitive Scheduler Agenda: eventselect', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = [RECURRING_EVENT];

        const handler = jest.fn();
        const mouseEnterHandler = jest.fn();
        element.addEventListener('eventselect', handler);
        element.addEventListener('eventmouseenter', mouseEnterHandler);

        return Promise.resolve().then(() => {
            const event = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            const from = DateTime.fromJSDate(RECURRING_EVENT.from);
            const to = DateTime.fromJSDate(RECURRING_EVENT.to);
            event.dispatchEvent(
                new CustomEvent('privatefocus', {
                    detail: {
                        eventName: RECURRING_EVENT.name,
                        from,
                        to
                    }
                })
            );
            expect(handler).toHaveBeenCalled();
            expect(mouseEnterHandler).toHaveBeenCalled();
            const call = handler.mock.calls[0][0];
            expect(call.detail.name).toBe(RECURRING_EVENT.name);
            expect(call.detail.recurrenceDates.from).toBe(from.toUTC().toISO());
            expect(call.detail.recurrenceDates.to).toBe(to.toUTC().toISO());
            expect(call.bubbles).toBeTruthy();
            expect(call.cancelable).toBeFalsy();
            expect(call.composed).toBeFalsy();
        });
    });

    it('Primitive Scheduler Agenda: hidepopovers on event double click', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;

        const handler = jest.fn();
        element.addEventListener('hidepopovers', handler);

        return Promise.resolve().then(() => {
            const event = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            event.dispatchEvent(
                new CustomEvent('privatedblclick', {
                    detail: {
                        eventName: event.eventName,
                        from: event.from,
                        x: 3,
                        y: 120,
                        key: event.occurrenceKey
                    }
                })
            );

            expect(handler).toHaveBeenCalledTimes(1);
            const call = handler.mock.calls[0][0];
            expect(call.detail.list).toBeUndefined();
        });
    });

    // openeditdialog
    it('Primitive Scheduler Agenda: openeditdialog on event double click', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;

        const handler = jest.fn();
        element.addEventListener('openeditdialog', handler);

        return Promise.resolve().then(() => {
            const event = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            event.dispatchEvent(
                new CustomEvent('privatedblclick', {
                    detail: {
                        eventName: event.eventName,
                        from: event.from,
                        x: 3,
                        y: 120,
                        key: event.occurrenceKey
                    }
                })
            );

            expect(handler).toHaveBeenCalledTimes(1);
            const call = handler.mock.calls[0][0];
            expect(call.detail.selection.event.name).toBe(event.eventName);
            expect(call.bubbles).toBeFalsy();
            expect(call.composed).toBeFalsy();
            expect(call.cancelable).toBeFalsy();
        });
    });

    it('Primitive Scheduler Agenda: openeditdialog on empty spot double click', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;
        element.newEventTitle = 'some new event title';

        const handler = jest.fn();
        element.addEventListener('openeditdialog', handler);

        return Promise.resolve().then(() => {
            const dayGroup = element.shadowRoot.querySelector(
                '[data-element-id="div-day-group"]'
            );
            jest.spyOn(dayGroup, 'getBoundingClientRect').mockImplementation(
                () => {
                    return { top: 0, bottom: 100 };
                }
            );
            const dblclick = new CustomEvent('dblclick');
            dblclick.clientY = 45;
            dayGroup.dispatchEvent(dblclick);

            expect(handler).toHaveBeenCalledTimes(1);
            const call = handler.mock.calls[0][0];
            expect(call.detail.selection.event.name).toBe('new-event');
            expect(call.detail.selection.event.title).toBe(
                'some new event title'
            );
        });
    });

    it('Primitive Scheduler Agenda: openeditdialog on disabled event double click', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;

        const handler = jest.fn();
        element.addEventListener('openeditdialog', handler);

        return Promise.resolve().then(() => {
            const event = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            const dblclick = new CustomEvent('privatedisableddblclick');
            dblclick.clientY = 45;
            event.dispatchEvent(dblclick);

            expect(handler).toHaveBeenCalledTimes(1);
            const call = handler.mock.calls[0][0];
            expect(call.detail.selection.event.name).toBe('new-event');
        });
    });

    // resourceselect
    it('Primitive Scheduler Agenda: resourceselect when selecting a resource', () => {
        element.resources = RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;

        const handler = jest.fn();
        element.addEventListener('resourceselect', handler);

        return Promise.resolve()
            .then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                expect(events).toHaveLength(0);

                const firstResource = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-resource"]'
                );
                firstResource.dispatchEvent(
                    new CustomEvent('change', {
                        detail: { checked: true }
                    })
                );
                expect(handler).toHaveBeenCalled();
                const call = handler.mock.calls[0][0];
                expect(call.detail.name).toBe(RESOURCES[0].name);
                expect(call.detail.selectedResources).toEqual([
                    RESOURCES[0].name
                ]);
                expect(call.bubbles).toBeFalsy();
                expect(call.cancelable).toBeFalsy();
                expect(call.composed).toBeFalsy();
            })
            .then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                expect(events).toHaveLength(1);
            });
    });

    it('Primitive Scheduler Agenda: resourceselect when unselecting a resource', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;

        const handler = jest.fn();
        element.addEventListener('resourceselect', handler);

        return Promise.resolve()
            .then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                expect(events).toHaveLength(4);

                const firstResource = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-resource"]'
                );
                firstResource.dispatchEvent(
                    new CustomEvent('change', {
                        detail: { checked: false }
                    })
                );
                expect(handler).toHaveBeenCalled();
                const call = handler.mock.calls[0][0];
                expect(call.detail.name).toBe(RESOURCES[0].name);
                expect(call.detail.selectedResources).toEqual([
                    RESOURCES[1].name,
                    RESOURCES[2].name
                ]);
            })
            .then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                expect(events).toHaveLength(3);
            });
    });

    it('Primitive Scheduler Agenda: scheduleclick', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = '2022-08-24T00:00:00.000Z';
        element.events = EVENTS;
        element.timezone = 'UTC';

        const handler = jest.fn();
        element.addEventListener('scheduleclick', handler);

        return Promise.resolve().then(() => {
            const dayHeading = element.shadowRoot.querySelector(
                '[data-element-id="div-day-heading"]'
            );
            dayHeading.click();
            expect(handler).toHaveBeenCalled();
            const call = handler.mock.calls[0][0];
            expect(new Date(call.detail.from).toISOString()).toBe(
                '2022-08-24T00:00:00.000Z'
            );
            expect(new Date(call.detail.to).toISOString()).toBe(
                '2022-08-24T23:59:59.999Z'
            );
        });
    });
});
