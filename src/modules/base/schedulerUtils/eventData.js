import {
    numberOfUnitsBetweenDates,
    addToDate,
    dateTimeObjectFrom,
    intervalFrom
} from 'c/luxonDateTimeUtils';
import { deepCopy, normalizeArray } from 'c/utils';
import SchedulerEvent from './event';
import SchedulerEventDrag from './eventDrag';
import { getElementOnXAxis, getElementOnYAxis } from './positions';
import { spansOnMoreThanOneDay } from './dateComputations';

/**
 * Events data of the scheduler.
 * @class
 * @param {object[]} events Array of event objects.
 * @param {object} eventsLabels Labels of the events. Valid keys include top, bottom, left, right and center.
 * @param {string} eventsTheme Theme of the events. Valid values include default, transparent, line, hollow and rounded.
 * @param {boolean} isAgenda If true, the scheduler scheduler view is agenda.
 * @param {boolean} isCalendar If true, the selected scheduler view is calendar.
 * @param {boolean} isVertical If true, the events are displayed vertically.
 * @param {string} newEventTitle Default title of the new event.
 * @param {SchedulerCalendarColumn} multiDayEventsCellGroup Used only by the calendar display. Cell group containing the multi-day events.
 * @param {string[]} recurrentEditModes Allowed edition modes for recurring events.
 * @param {object} schedule Instance of the primitive schedule (calendar, agenda or timeline) to which the event data belongs.
 * @param {string[]} selectedResources Array of selected resources names.
 * @param {object} smallestHeader The smallest time header of the scheduler. Valid keys include unit and span.
 * @param {Interval} visibleInterval Visible interval of the scheduler.
 */
export default class SchedulerEventData {
    eventDrag;
    eventsPerDayMap = {};
    selection;

    constructor(schedule, props) {
        this.schedule = schedule;
        Object.assign(this, props);
    }

    /**
     * If true, editing a recurring event only updates the occurrence, never the complete event.
     *
     * @type {boolean}
     * @default false
     */
    get onlyOccurrenceEditAllowed() {
        return (
            this.recurrentEditModes.length === 1 &&
            this.recurrentEditModes[0] === 'one'
        );
    }

    /**
     * If true, a new event is being created by dragging, and the dragged event HTML element should be updated on the next render.
     *
     * @type {boolean}
     */
    get shouldInitDraggedEvent() {
        const newSelectedEvent = this.selection && this.selection.newEvent;
        const noDraggedEvent = this.eventDrag && !this.eventDrag.draggedEvent;
        return newSelectedEvent && noDraggedEvent;
    }

    /**
     * Create the computed events that are included in the currently visible interval of time.
     */
    initEvents() {
        const interval = this.visibleInterval;
        if (!interval) {
            this.events = [];
            this.refreshEvents();
            return;
        }

        const skipOverflowingEvents =
            this.isCalendar && (this.schedule.isMonth || this.schedule.isYear);
        const { events, eventsPerDayMap } = this.getEventsInInterval(
            this.events,
            this.visibleInterval,
            skipOverflowingEvents
        );
        this.eventsPerDayMap = eventsPerDayMap;
        this.events = events;
        this.refreshEvents();
    }

    /**
     * Map the event objects to the days they span on.
     * Used in the calendar month view, to avoid computing the event occurrences before they are visible.
     *
     * @param {object} eventsPerDayMap Object containing a key per visible day. The value of each key is an object containing the count and the events that day.
     * @param {object} event Event object to add to the map.
     * @param {Interval} intersection Time interval representing the intersection of the event with the visible interval.
     * @param {Interval} interval Currently visible time interval.
     */
    addToEventsPerDayMap({ eventsPerDayMap, event, interval, intersection }) {
        const addEventToMap = (date) => {
            const dayKey = `${date.month}-${date.day}`;
            let count = 1;
            if (event.resourceNames) {
                const resources = this.selectedResources.filter((r) =>
                    event.resourceNames.includes(r)
                );
                count = resources.length;
            }

            if (eventsPerDayMap[dayKey]) {
                const dayData = eventsPerDayMap[dayKey];
                dayData.count += count;
                dayData.events.push(event);
            } else {
                eventsPerDayMap[dayKey] = {
                    count,
                    events: [event]
                };
            }
        };

        if (event.recurrence) {
            // If it is recurring, we have to create the event occurrences
            // to know all of the days the event spans on
            const evt = { ...event };
            this.updateEventDefaults(evt, true, interval);
            const computedEvent = new SchedulerEvent(evt);
            const occurrences = computedEvent.occurrences;

            if (occurrences.length) {
                // Make sure the event is added only once for all of its resources
                const firstResource = occurrences[0].resourceName;
                const uniqueDateOccurrences = occurrences.filter((occ) => {
                    return occ.resourceName === firstResource;
                });
                uniqueDateOccurrences.forEach((occurrence) => {
                    addEventToMap(occurrence.from);
                });
            }
        } else {
            const daysCount = numberOfUnitsBetweenDates(
                'day',
                intersection.start,
                intersection.end
            );

            for (let i = 0; i < daysCount; i++) {
                const date = intersection.start.plus({ days: i });
                addEventToMap(date);
            }
        }
    }

    /**
     * Add the given event to the `singleDayEvents` or `multiDayEvents` arrays.
     *
     * @param {SchedulerEvent} event The event to add.
     */
    addToSingleAndMultiDayEvents(event) {
        const from = event.computedFrom;
        const to = event.computedTo;
        const endOfTo = to.endOf('day');
        const startOfFrom = from.startOf('day');
        if (spansOnMoreThanOneDay({ event, from, to, endOfTo, startOfFrom })) {
            this.multiDayEvents.push(event);
        } else {
            this.singleDayEvents.push(event);
        }
    }

    /**
     * Check if the given event belongs to any of the selected resources.
     *
     * @param {object} event Event object to check.
     * @returns {boolean} True if the event belongs to any of the selected resources, false otherwise.
     */
    belongsToSelectedResources(event) {
        if (event.referenceLine) {
            return true;
        }
        const names = normalizeArray(event.resourceNames);
        const resources = normalizeArray(this.selectedResources);
        return !!names.find((name) => {
            return resources.includes(name);
        });
    }

    /**
     * Clear the selection.
     * @param {boolean} cancelEdition If true, cancel the edition of the selected event. If a new event was being created, delete it.
     */
    cleanSelection(cancelEdition = false) {
        const lastEvent = this.events[this.events.length - 1];
        const reset = cancelEdition && this.selection;
        const resetNewEvent =
            reset &&
            this.selection.newEvent &&
            lastEvent === this.selection.event;

        if (resetNewEvent) {
            // Cancel the creation of a new event
            this.events.pop();
            this.refreshEvents();
        } else if (reset) {
            // Cancel the edition of an existing event
            Object.keys(this.selection.draftValues).forEach((key) => {
                const { occurrence, originalValues } = this.selection;
                occurrence[key] = originalValues[key];
            });
        }
        this.selection = undefined;
        if (this.eventDrag) {
            this.eventDrag.cleanDraggedElement();
            this.eventDrag = null;
        }
    }

    /**
     * Compute the events for the given interval.
     *
     * @param {object[]} events Array of events to compute.
     * @param {Interval} interval Interval of time in which the events occurrences should be happening.
     * @returns {object[]} Array of computed events.
     */
    computeEventsOccurrences(events, interval) {
        return events.reduce((computedEvents, evt) => {
            const event = { ...evt };
            this.updateEventDefaults(event, true, interval);
            const computedEvent = new SchedulerEvent(event);

            if (computedEvent.occurrences.length) {
                computedEvents.push(computedEvent);
            }
            return computedEvents;
        }, []);
    }

    /**
     * Create a Luxon DateTime object from a date, including the timezone.
     *
     * @param {string|number|Date} date Date to convert.
     * @returns {DateTime|boolean} Luxon DateTime object or false if the date is invalid.
     */
    createDate(date) {
        return dateTimeObjectFrom(date, { zone: this.schedule.timezone });
    }

    /**
     * Create an event.
     *
     * @param {object} event The object describing the event to create.
     */
    createEvent(event) {
        const computedEvent = { ...event };
        this.updateEventDefaults(computedEvent);
        this.events.push(new SchedulerEvent(computedEvent));
        this.refreshEvents();
    }

    /**
     * Delete an event.
     *
     * @param {string} eventName Unique name of the event to delete.
     */
    deleteEvent(eventName) {
        const name = eventName || this.selection.event.name;

        // Delete the event
        const index = this.events.findIndex((evt) => {
            return evt.name === name;
        });
        this.events.splice(index, 1);
        this.refreshEvents();
        this.cleanSelection();
        this.eventDrag = null;
    }

    /**
     * Drag an event to a cell and save the change.
     *
     * @param {HTMLElement} cellGroupElement The cell group element the event is being dragged to. It is a resource row/column if the scheduler is a timeline, or a day column if the scheduler is a calendar.
     * @param {HTMLElement} cell The cell element the event is being dragged to.
     */
    dragEventTo(cellGroupElement, cell) {
        const { occurrence, draftValues } = this.selection;

        // Update the start and end date
        const duration = occurrence.to - occurrence.from;
        let start = this.createDate(Number(cell.dataset.start));
        if (this.isCalendar && this.schedule.isMonth) {
            // Keep the original time
            // when dragging an event to a calendar month cell
            start = start.set({
                hour: occurrence.from.hour,
                minute: occurrence.from.minute,
                second: occurrence.from.second,
                millisecond: occurrence.from.millisecond
            });
        }
        if (this.preventPastEventCreation) {
            const now = this.createDate(new Date()).startOf('hour');
            if (start < now.ts) {
                return false;
            }
        }
        draftValues.from = start.toUTC().toISO();
        draftValues.to = addToDate(start, 'millisecond', duration)
            .toUTC()
            .toISO();

        if (!this.isCalendar) {
            // Update the resources
            const resourceName = cellGroupElement.dataset.name;
            const previousResourceName = occurrence.resourceName;

            if (previousResourceName !== resourceName) {
                const resourceIndex = occurrence.resourceNames.findIndex(
                    (name) => name === previousResourceName
                );
                draftValues.resourceNames = [...occurrence.resourceNames];
                draftValues.resourceNames.splice(resourceIndex, 1);

                if (!draftValues.resourceNames.includes(resourceName)) {
                    draftValues.resourceNames.push(resourceName);
                }
            }
        }
        return true;
    }

    /**
     * Get the boundaries of the dragging area.
     *
     * @param {boolean} isVertical If true, the events are displayed vertically.
     * @returns {DOMRect} Boundaries of the dragging area.
     */
    getDraggingBoundaries(isVertical) {
        if (this.isCalendar && !isVertical) {
            // Get the multi day events grid boundaries
            const multiDayGrid = this.schedule.template.querySelector(
                '[data-element-id="div-multi-day-events-wrapper"]'
            );
            return multiDayGrid.getBoundingClientRect();
        }

        // Get the schedule boundaries
        const body = this.schedule.template.querySelector(
            '[data-element-id="div-schedule-body"]'
        );
        return body.getBoundingClientRect();
    }

    getEventsInInterval(events, interval, skipOverflowingEvents) {
        if (!interval) {
            return [];
        }
        const eventsPerDayMap = {};
        const eventsInTimeFrame = new Set();

        // Keep only events that are in the currently visible interval
        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            const from = this.createDate(event.from);
            let to = this.createDate(event.to);
            if (!to) {
                to = from.set({
                    hour: 23,
                    minute: 59,
                    second: 59,
                    millisecond: 999
                });
            }

            const eventInterval = intervalFrom(from, to);
            const intersection = interval.intersection(eventInterval);
            const isInTimeFrame =
                this.belongsToSelectedResources(event) &&
                (event.recurrence || intersection);

            if (!isInTimeFrame) {
                continue;
            }

            if (skipOverflowingEvents) {
                this.addToEventsPerDayMap({
                    eventsPerDayMap,
                    event,
                    interval,
                    intersection
                });
            } else {
                eventsInTimeFrame.add(event);
            }
        }

        if (skipOverflowingEvents) {
            // Keep only 10 events per day
            Object.values(eventsPerDayMap).forEach((dayData) => {
                for (let i = 0; i < dayData.events.length && i < 10; i++) {
                    eventsInTimeFrame.add(dayData.events[i]);
                }
            });
        }

        // Compute the event occurrences
        const computedEvents = this.computeEventsOccurrences(
            Array.from(eventsInTimeFrame),
            interval
        );
        return { events: computedEvents, eventsPerDayMap };
    }

    /**
     * Get the cell group and the cell HTML elements at a specific position.
     *
     * @param {number} x Position on the X axis.
     * @param {number} y Position on the Y axis.
     * @returns {object} Object with two keys: cellGroupElement and cellElement.
     */
    getGridElementsAtPosition(x, y) {
        let dragState = 'HORIZONTAL_TIMELINE';
        if (this.isCalendar && !this.eventDrag.isVertical) {
            dragState = 'MULTI_DAY_EVENT_CALENDAR';
        } else if (this.isCalendar) {
            dragState = 'SINGLE_DAY_EVENT_CALENDAR';
        } else if (this.isVertical) {
            dragState = 'VERTICAL_TIMELINE';
        }

        switch (dragState) {
            case 'VERTICAL_TIMELINE': {
                const resourceColumn =
                    this.schedule.getResourceElementFromPosition(x, y);
                const normalizedY = this.eventDrag.getValueOnTheCellGroupAxis(
                    x,
                    y
                );
                const cell = getElementOnYAxis(resourceColumn, normalizedY);
                return { cellGroupElement: resourceColumn, cellElement: cell };
            }
            case 'SINGLE_DAY_EVENT_CALENDAR': {
                const position = this.eventDrag.normalizeMousePosition(x, y);
                const dayColumn = this.schedule.getColumnElementFromPosition(
                    position.x
                );
                const normalizedY = this.eventDrag.getValueOnTheCellGroupAxis(
                    x,
                    y
                );
                const hourCell = getElementOnYAxis(dayColumn, normalizedY);
                return { cellGroupElement: dayColumn, cellElement: hourCell };
            }
            case 'MULTI_DAY_EVENT_CALENDAR': {
                const normalizedY = this.eventDrag.getValueOnTheCellGroupAxis(
                    x,
                    y
                );
                const dayCell = this.schedule.getColumnElementFromPosition(
                    normalizedY,
                    true
                );
                return {
                    cellGroupElement: this.schedule.multiDayWrapper,
                    cellElement: dayCell
                };
            }
            default: {
                const resourceRow =
                    this.schedule.getResourceElementFromPosition(x, y);
                const normalizedX = this.eventDrag.getValueOnTheCellGroupAxis(
                    x,
                    y
                );
                const cell = getElementOnXAxis(resourceRow, normalizedX);
                return { cellGroupElement: resourceRow, cellElement: cell };
            }
        }
    }

    /**
     * Create and select a new event.
     *
     * @param {object} detail Information on the new event to create. Valid keys include `resourceNames`, `from`, `to`, `x` and `y`.
     * @param {boolean} saveEvent If true, the event is saved in the events list.
     */
    newEvent({ resourceNames, from, to, x, y }, saveEvent = true) {
        const event = {
            resourceNames: normalizeArray(resourceNames, 'string'),
            title: this.newEventTitle,
            from,
            to
        };
        this.updateEventDefaults(event);
        const computedEvent = new SchedulerEvent(event);
        this.selection = {
            event: computedEvent,
            occurrences: computedEvent.occurrences,
            occurrence: computedEvent.occurrences[0],
            draftValues: {},
            x,
            y,
            newEvent: true
        };

        if (saveEvent) {
            this.events.push(computedEvent);
        }
    }

    /**
     * Get the normalized event end date.
     *
     * @param {object} event Event the end date is computed from.
     * @returns {DateTime} Normalized event end date.
     */
    normalizedEventTo(event) {
        let to = this.createDate(event.to);
        const from = this.createDate(event.from);

        if (event.allDay && to) {
            to = to.endOf('day');
        } else if (from && (event.allDay || to < from)) {
            to = from.endOf('day');
        }
        return to;
    }

    /**
     * Refresh the events to force the schedule rerender.
     */
    refreshEvents() {
        this.events = [...this.events];
        this.singleDayEvents = [];
        this.multiDayEvents = [];

        if (this.isCalendar) {
            this.events.forEach((event) => {
                this.addToSingleAndMultiDayEvents(event);
            });
            this.schedule.singleDayEvents = this.singleDayEvents;
            this.schedule.multiDayEvents = this.multiDayEvents;
        } else {
            this.schedule.computedEvents = this.events;
        }
    }

    /**
     * Resize an event to a given cell element and save the change.
     *
     * @param {HTMLElement} cell Cell element.
     * @param {SchedulerCellGroup} cellGroup Cell group the resized event belongs to.
     */
    resizeEventToCell(cell, cellGroup) {
        const occurrence = this.selection.occurrence;
        const side = this.eventDrag.resizeSide;

        // Remove the occurrence from the cell group (resource or day column)
        cellGroup.removeEvent(occurrence);

        if (side === 'end') {
            // Update the end date if the event was resized from the right
            occurrence.to = this.createDate(Number(cell.dataset.end) + 1);
        } else if (side === 'start') {
            // Update the start date if the event was resized from the left
            occurrence.from = this.createDate(Number(cell.dataset.start));
        }

        // Add the occurrence to the cell group (resource or day column)
        // with the updated start/end date
        cellGroup.events.push(occurrence);
        cellGroup.addEventToCells(occurrence);
        this.refreshEvents();
    }

    /**
     * Save the current changes made to the currently selected event.
     */
    saveEvent() {
        const { event, draftValues } = this.selection;

        // Update the event with the new values
        Object.entries(draftValues).forEach((entry) => {
            const [key, value] = entry;
            if (key === 'allDay' || value.length) {
                event[key] = value;
            }
        });

        if (this.selection.newEvent) {
            // Generate a name for the new event, based on its title
            const lowerCaseName = event.title.toLowerCase();
            event.name = lowerCaseName.replace(/\s/g, '-').concat(event.key);
            this.schedule.dispatchEventCreate(event);
        } else {
            const detail = {
                name: event.name,
                draftValues: draftValues
            };
            this.schedule.dispatchEventChange(detail);
        }

        event.initOccurrences();
        this.refreshEvents();
    }

    /**
     * Save the current changes made to the currently selected event occurrence.
     */
    saveOccurrence() {
        const { event, occurrences, occurrence, draftValues } = this.selection;
        const draftResourceNames = normalizeArray(draftValues.resourceNames);
        const resourceNames = draftResourceNames.length
            ? draftResourceNames
            : occurrence.resourceNames;
        const processedResourceNames = [...resourceNames].filter((name) => {
            // Update only the selected resources occurrences
            return this.selectedResources.includes(name);
        });
        const newOccurrences = [];

        occurrences.forEach((occ) => {
            const resourceName = processedResourceNames.indexOf(
                occ.resourceName
            );
            if (resourceName > -1) {
                // If the occurrence resource name is still included in the resource names,
                // update the occurrence with the new values
                Object.entries(draftValues).forEach((entry) => {
                    const [key, value] = entry;

                    if (key === 'allDay' || value.length) {
                        if (key === 'from' || key === 'to') {
                            // Convert the ISO dates into DateTime objects
                            occ[key] = this.createDate(value);
                        } else {
                            occ[key] = value;
                        }
                    }
                });
                occ.resourceNames = resourceNames;
                newOccurrences.push(occ);

                // Remove the processed key field from the list
                processedResourceNames.splice(resourceName, 1);
            } else {
                // If the occurrence resource key has been removed,
                // remove it from the event as well
                event.removeOccurrence(occ.key);
            }
        });

        // The resource names left are new ones added by the user
        processedResourceNames.forEach((resourceName) => {
            const occ = Object.assign({}, newOccurrences[0] || occurrences[0]);
            occ.resourceName = resourceName;
            occ.key = `${event.name}-${resourceName}-${
                event.occurrences.length + 1
            }`;
            occ.resourceNames = resourceNames;
            event.occurrences.push(occ);
        });

        const detail = {
            name: event.name,
            draftValues,
            recurrenceDates: {
                from: occurrence.from.toUTC().toISO(),
                to: occurrence.to.toUTC().toISO()
            }
        };
        this.refreshEvents();
        this.schedule.dispatchEventChange(detail);
    }

    /**
     * Select an event.
     *
     * @param {object} detail Detail of the event to select. Valid keys include eventName, from, x, y and key.
     * @returns {object} Selection object.
     */
    selectEvent({ eventName, from, x, y, key }) {
        const event = this.events.find((evt) => {
            return evt.name === eventName;
        });
        const occurrences = event.occurrences.filter((occ) => {
            return occ.from.ts === from.ts || occ.startOfFrom.ts === from.ts;
        });
        const occurrence = occurrences.find((occ) => occ.key === key);

        this.selection = {
            event,
            occurrences,
            occurrence,
            x,
            y,
            originalValues: { ...occurrence },
            draftValues: {}
        };
        return this.selection;
    }

    /**
     * Set the dragged event element in the `SchedulerEventDrag` instance.
     */
    setDraggedEvent() {
        if (!this.eventDrag || !this.selection) {
            return;
        }

        const key = this.selection.occurrence.key;
        const draggedEvent = this.schedule.template.querySelector(
            `[data-element-id^="avonni-primitive-scheduler-event-occurrence"][data-key="${key}"]:not([data-element-id$="-placeholder"])`
        );
        if (draggedEvent) {
            this.eventDrag.setDraggedEvent(draggedEvent);
        }
    }

    /**
     * Shrink the width of the dragged event.
     *
     * @param {number} width New width of the dragged event.
     * @param {number} mouseX Position of the mouse on the X axis.
     * @param {number} mouseY Position of the mouse on the Y axis.
     */
    shrinkDraggedEvent(width, mouseX, mouseY) {
        if (!this.eventDrag) {
            return;
        }
        this.eventDrag.shrinkDraggedEvent(width, mouseX, mouseY);
        this.selection.isMoving = true;
    }

    /**
     * Update all the events default values and recreate their occurrences.
     */
    updateAllEventsDefaults() {
        this.events.forEach((event) => {
            this.updateEventDefaults(event, false);
            event.initOccurrences();
        });
        this.refreshEvents();
    }

    /**
     * Set the default properties of the given event.
     *
     * @param {object} event The event object.
     */
    updateEventDefaults(
        event,
        newEvent = true,
        interval = this.visibleInterval
    ) {
        // If the event is a calendar multi-day event,
        // do not cut it at the currently visible schedule start/end
        const visibleEnd = interval.e;
        const visibleStart = interval.s;
        const from = this.createDate(event.from);
        const to = this.normalizedEventTo(event);
        const endOfTo = to.endOf('day');
        const startOfFrom = from.startOf('day');
        const isMultiDay = spansOnMoreThanOneDay({
            event,
            from,
            to,
            endOfTo,
            startOfFrom
        });
        const isCalendarMultiDay =
            isMultiDay && (this.isCalendar || this.isAgenda);
        event.schedulerEnd = isCalendarMultiDay ? null : visibleEnd;
        event.schedulerStart = isCalendarMultiDay ? null : visibleStart;
        event.selectedResources = normalizeArray(this.selectedResources);

        // We store the initial event object in a variable,
        // in case a custom field is used by the labels
        if (newEvent) {
            event.data = deepCopy(event);
        }
        event.availableMonths = this.schedule.availableMonths;
        event.availableDaysOfTheWeek = this.schedule.availableDaysOfTheWeek;
        event.availableTimeFrames = this.schedule.availableTimeFrames;
        event.smallestHeader = this.smallestHeader;
        event.theme = event.disabled
            ? 'disabled'
            : event.data.theme || this.eventsTheme;
        event.timezone = this.schedule.timezone;

        event.labels =
            typeof event.data.labels === 'object'
                ? event.data.labels
                : this.eventsLabels;
    }

    /**
     * Handle a mouse down on an event. Initialize the event drag instance, and select the event.
     *
     * @param {event} mouseEvent
     * @param {HTMLElement} cellGroupElement Cell group element the event belongs to.
     * @param {boolean} isVertical If true, the events are displayed vertically.
     */
    handleExistingEventMouseDown(
        mouseEvent,
        cellGroupElement,
        isVertical = this.isVertical
    ) {
        this.eventDrag = new SchedulerEventDrag({
            event: mouseEvent,
            isVertical,
            cellGroupElement,
            boundaries: this.getDraggingBoundaries(isVertical),
            preventPastEventCreation: this.preventPastEventCreation
        });
        this.selectEvent(mouseEvent.detail);
    }

    /**
     * Handle a mouse movement. Compute the dragging or resizing of an event.
     *
     * @param {Event} event
     */
    handleMouseMove(event) {
        if (!this.eventDrag) {
            return;
        }

        if (this.shouldInitDraggedEvent) {
            this.events.push(this.selection.event);
            this.refreshEvents();
        } else {
            this.selection.isMoving = true;
            const x = event.clientX;
            const y = event.clientY;
            const { cellGroupElement, resizeSide } = this.eventDrag;
            const { occurrence, newEvent } = this.selection;

            if (resizeSide || newEvent) {
                let cellGroup;
                if (this.isCalendar) {
                    const index = Number(cellGroupElement.dataset.index);
                    cellGroup = !isNaN(index)
                        ? this.schedule.columns[index]
                        : this.multiDayEventsCellGroup;
                } else {
                    const resourceName = cellGroupElement.dataset.name;
                    cellGroup = this.schedule.getResourceFromName(resourceName);
                }
                const hoveredEventCell = this.eventDrag.resize(
                    x,
                    y,
                    occurrence,
                    cellGroup
                );
                if (hoveredEventCell) {
                    this.resizeEventToCell(hoveredEventCell, cellGroup);
                }
            } else {
                this.eventDrag.drag(x, y);
            }
        }
    }

    /**
     * Handle a mouse up. End the dragging or resizing of an event and clean the selection.
     *
     * @param {number} x Position of the mouse on the X axis.
     * @param {number} y Position of the mouse on the Y axis.
     * @returns {object} Actions to take. Valid keys include eventToDispatch and updateCellGroups.
     */
    handleMouseUp(x, y) {
        if (!this.selection || !this.selection.isMoving) {
            this.cleanSelection();
            return {};
        }

        // Get the new position
        const { draftValues, newEvent, event, occurrence } = this.selection;
        const side = this.eventDrag.resizeSide;
        const isCalendarMultiDayEvent =
            this.isCalendar && !this.eventDrag.isVertical;
        const isCalendarSingleDayEvent =
            this.isCalendar && this.eventDrag.isVertical;

        // Find the column/row and cell the event was dropped on
        const normalizedX =
            isCalendarSingleDayEvent && side ? this.selection.x : x;
        const { cellGroupElement, cellElement } =
            this.getGridElementsAtPosition(normalizedX, y);

        // Update the draft values
        switch (side) {
            case 'end': {
                const to = this.createDate(Number(cellElement.dataset.end) + 1);
                draftValues.allDay = isCalendarMultiDayEvent;
                draftValues.to = to.toUTC().toISO();
                if (newEvent) {
                    occurrence.to = to;
                }
                break;
            }
            case 'start': {
                let from = this.createDate(Number(cellElement.dataset.start));

                if (this.preventPastEventCreation) {
                    const now = this.createDate(new Date());
                    if (from < now.ts) {
                        from = now;
                    }
                }
                draftValues.allDay = isCalendarMultiDayEvent;
                draftValues.from = from.toUTC().toISO();
                if (newEvent) {
                    occurrence.from = from;
                }
                break;
            }
            default: {
                const isValid = this.dragEventTo(cellGroupElement, cellElement);
                if (!isValid) {
                    this.cleanSelection(true);
                    return { updateCellGroups: true };
                }
                break;
            }
        }

        if (newEvent) {
            this.selection.isMoving = false;
            return { eventToDispatch: 'edit' };
        }
        const recurrentEvent = event.recurrence;
        const recurrenceModes = this.recurrentEditModes;

        if (recurrentEvent && recurrenceModes.length > 1) {
            return { eventToDispatch: 'recurrence' };
        }
        if (recurrentEvent && this.onlyOccurrenceEditAllowed) {
            this.saveOccurrence();
        } else {
            this.saveEvent();
        }
        this.cleanSelection();
        return { updateCellGroups: true };
    }

    /**
     * Handle a mouse down on a new event. Initialize the event drag instance, and create the new event.
     *
     * @param {object} detail Detail on the new event. Valid keys include event, cellGroupElement, from, isVertical, to, resourceNames, x and y.
     */
    handleNewEventMouseDown({
        event,
        cellGroupElement,
        from,
        isVertical = this.isVertical,
        to,
        resourceNames,
        x,
        y
    }) {
        this.eventDrag = new SchedulerEventDrag({
            event,
            isVertical,
            cellGroupElement,
            isNewEvent: true,
            boundaries: this.getDraggingBoundaries(isVertical),
            preventPastEventCreation: this.preventPastEventCreation
        });

        this.newEvent({ resourceNames, from, to, x, y }, false);
    }
}
