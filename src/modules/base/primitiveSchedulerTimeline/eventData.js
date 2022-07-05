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

import { addToDate, dateTimeObjectFrom, normalizeArray } from 'c/utilsPrivate';
import SchedulerTimelineEvent from './event';
import SchedulerTimelineEventDrag from './eventDrag';
import { getCellFromPosition } from './utils';

export default class SchedulerTimelineEventData {
    events = [];
    eventDrag;
    selection;

    constructor(timeline) {
        this.timeline = timeline;
    }

    get shouldInitDraggedEvent() {
        const newSelectedEvent = this.selection && this.selection.newEvent;
        const noDraggedEvent = this.eventDrag && !this.eventDrag.draggedEvent;
        return newSelectedEvent && noDraggedEvent;
    }

    /**
     * Create the computed events that are included in the currently visible interval of time.
     */
    initEvents() {
        const interval = this.timeline.visibleInterval;
        if (!interval) {
            this.events = [];
        }

        const events = this.timeline.events.filter((event) => {
            const from = dateTimeObjectFrom(event.from);
            const to = dateTimeObjectFrom(event.to);
            return (
                interval.contains(from) ||
                interval.contains(to) ||
                (interval.isAfter(from) && interval.isBefore(to)) ||
                event.recurrence
            );
        });

        this.events = events.reduce((computedEvents, evt) => {
            const event = { ...evt };
            this.updateEventDefaults(event);
            const computedEvent = new SchedulerTimelineEvent(event);

            if (computedEvent.occurrences.length) {
                computedEvents.push(computedEvent);
            }
            return computedEvents;
        }, []);
    }

    /**
     * Clear the selected or new event.
     */
    cleanSelection(cancelEdition = false) {
        // If a new event was being created, remove the unfinished event from the events
        const lastEvent = this.events[this.events.length - 1];
        if (
            cancelEdition &&
            this.selection &&
            this.selection.newEvent &&
            lastEvent === this.selection.event
        ) {
            this.events.pop();
            this.refreshEvents();
        }
        this.selection = undefined;
        if (this.eventDrag) {
            this.eventDrag.cleanDraggedElement();
            this.eventDrag = null;
        }
    }

    /**
     * Create an event.
     *
     * @param {object} event The object describing the event to create.
     */
    createEvent(event) {
        const computedEvent = { ...event };
        this.updateEventDefaults(computedEvent);
        this.events.push(new SchedulerTimelineEvent(computedEvent));
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
     * @param {HTMLElement} resource The resource element the event is being dragged to.
     * @param {HTMLElement} cell The cell element the event is being dragged to.
     */
    dragEventTo(resource, cell) {
        const { occurrence, draftValues } = this.selection;

        // Update the start and end date
        const duration = occurrence.to - occurrence.from;
        const start = dateTimeObjectFrom(Number(cell.dataset.start));
        draftValues.from = start.toUTC().toISO();
        draftValues.to = addToDate(start, 'millisecond', duration + 1)
            .toUTC()
            .toISO();

        // Update the resources
        const resourceName = resource.dataset.name;
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

    /**
     * Display a new event on the schedule grid and open the edition dialog if showDialog is true.
     *
     * @param {number} x Horizontal position of the event in the schedule, in pixels.
     * @param {number} y Vertical position of the event in the schedule, in pixels.
     * @param {boolean} showDialog If true, the edit dialog will be opened. Defaults to true.
     */
    newEvent({ resourceElement, x, y }, saveEvent = true) {
        const resourceAxisPosition = this.timeline.isVertical ? y : x;
        const cell = getCellFromPosition(
            resourceElement,
            resourceAxisPosition,
            this.timeline.isVertical
        );
        const resourceNames = [resourceElement.dataset.name];
        const from = Number(cell.dataset.start);
        const to = Number(cell.dataset.end) + 1;

        const event = {
            resourceNames,
            title: this.timeline.newEventTitle,
            from,
            to
        };
        this.updateEventDefaults(event);
        const computedEvent = new SchedulerTimelineEvent(event);
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

    refreshEvents() {
        this.events = [...this.events];
        this.timeline.computedEvents = this.events;
    }

    /**
     * Resize an event to a given cell element and save the change.
     *
     * @param {HTMLElement} cell The cell element.
     */
    resizeEventToCell(cell, resource) {
        const occurrence = this.selection.occurrence;
        const side = this.resizeSide;

        // Remove the occurrence from the resource
        resource.removeEvent(occurrence);

        if (side === 'end') {
            // Update the end date if the event was resized from the right
            occurrence.to = dateTimeObjectFrom(Number(cell.dataset.end) + 1);
        } else if (side === 'start') {
            // Update the start date if the event was resized from the left
            occurrence.from = dateTimeObjectFrom(Number(cell.dataset.start));
        }

        // Add the occurrence to the resource with the updated start/end date
        resource.events.push(occurrence);
        resource.addEventToCells(occurrence);
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

            if (value.length || key === 'allDay') {
                event[key] = value;
            }
        });

        if (this.selection.newEvent) {
            // Generate a name for the new event, based on its title
            const lowerCaseName = event.title.toLowerCase();
            event.name = lowerCaseName.replace(/\s/g, '-').concat(event.key);
            this.timeline.dispatchEventCreate(event);
        } else {
            const detail = {
                name: event.name,
                draftValues: draftValues
            };
            this.timeline.dispatchEventChange(detail);
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
        const processedResourceNames = [...resourceNames];
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

                    if (value.length || key === 'allDay') {
                        if (key === 'from' || key === 'to') {
                            // Convert the ISO dates into DateTime objects
                            occ[key] = dateTimeObjectFrom(value);
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
        this.timeline.dispatchEventChange(detail);
        this.refreshEvents();
    }

    selectEvent({ eventName, from, x, y, key }) {
        const event = this.events.find((evt) => {
            return evt.name === eventName;
        });
        const occurrences = event.occurrences.filter((occ) => {
            return occ.from.ts === from.ts;
        });
        const occurrence = occurrences.find((occ) => occ.key === key);

        this.selection = {
            event,
            occurrences,
            occurrence,
            x,
            y,
            draftValues: {}
        };
        return this.selection;
    }

    setDraggedEvent() {
        if (!this.eventDrag || !this.selection) {
            return;
        }

        const key = this.selection.occurrence.key;
        const draggedEvent = this.timeline.template.querySelector(
            `[data-element-id="avonni-primitive-scheduler-event-occurrence"][data-key="${key}"]`
        );
        if (draggedEvent) {
            this.eventDrag.setDraggedEvent(draggedEvent);
        }
    }

    updateAllEventsDefaults() {
        this.events.forEach((event) => {
            this.updateEventDefaults(event);
        });
    }

    /**
     * Set the default properties of the given event.
     *
     * @param {object} event The event object.
     */
    updateEventDefaults(event) {
        // We store the initial event object in a variable,
        // in case a custom field is used by the labels
        event.data = { ...event };
        event.schedulerEnd = this.timeline.visibleInterval.e;
        event.schedulerStart = this.timeline.visibleInterval.s;
        event.availableMonths = this.timeline.availableMonths;
        event.availableDaysOfTheWeek = this.timeline.availableDaysOfTheWeek;
        event.availableTimeFrames = this.timeline.availableTimeFrames;
        event.smallestHeader = this.timeline.smallestHeader;
        event.theme = event.disabled
            ? 'disabled'
            : event.theme || this.timeline.eventsTheme;

        event.labels =
            typeof event.labels === 'object'
                ? event.labels
                : this.timeline.eventsLabels;
    }

    handleExistingEventMouseDown(mouseEvent, resource, resourceElement) {
        const isVertical = this.timeline.isVertical;
        this.eventDrag = new SchedulerTimelineEventDrag({
            event: mouseEvent,
            isVertical,
            resource,
            resourceElement,
            boundaries: this.timeline.timelinePosition
        });
        this.selectEvent(mouseEvent.detail);
    }

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
            const { resourceElement, resizeSide } = this.eventDrag;
            const resourceName = resourceElement.dataset.name;
            const resource = this.timeline.getResourceFromName(resourceName);
            const { occurrence, newEvent } = this.selection;

            if (resizeSide || newEvent) {
                const hoveredEventCell = this.eventDrag.resize(
                    x,
                    y,
                    occurrence,
                    resource
                );
                if (hoveredEventCell) {
                    this.resizeEventToCell(hoveredEventCell, resource);
                }
            } else {
                this.eventDrag.drag(x, y);
            }
        }
    }

    handleMouseUp(x, y) {
        if (!this.selection || !this.selection.isMoving) {
            this.cleanSelection();
            return {};
        }

        // Get the new position
        const valueOnTheResourceAxis = this.eventDrag.getValueOnTheResourceAxis(
            x,
            y
        );
        const valueOnTheHeadersAxis = this.eventDrag.getValueOnTheHeadersAxis(
            x,
            y
        );
        const { draftValues, newEvent, event, occurrence } = this.selection;
        const side = this.eventDrag.resizeSide;

        // Find the resource and cell the event was dropped on
        const resourceElement = this.timeline.getResourceElementFromPosition(
            valueOnTheHeadersAxis
        );
        const cellElement = getCellFromPosition(
            resourceElement,
            valueOnTheResourceAxis,
            this.timeline.isVertical
        );

        // Update the draft values
        const to = dateTimeObjectFrom(Number(cellElement.dataset.end) + 1);
        const from = dateTimeObjectFrom(Number(cellElement.dataset.start));
        switch (side) {
            case 'end':
                draftValues.allDay = false;
                draftValues.to = to.toUTC().toISO();
                if (newEvent) {
                    occurrence.to = to;
                }
                break;
            case 'start':
                draftValues.allDay = false;
                draftValues.from = from.toUTC().toISO();
                if (newEvent) {
                    occurrence.from = from;
                }
                break;
            default:
                this.dragEventTo(resourceElement, cellElement);
                break;
        }

        if (newEvent) {
            this.selection.isMoving = false;
            return { eventToDispatch: 'edit' };
        }
        const recurrentEvent = event.recurrence;
        const recurrenceModes = this.timeline.recurrentEditModes;
        const onlyOccurrenceEditAllowed =
            this.timeline.onlyOccurrenceEditAllowed;

        if (recurrentEvent && recurrenceModes.length > 1) {
            return { eventToDispatch: 'recurrence' };
        }
        if (recurrentEvent && onlyOccurrenceEditAllowed) {
            this.saveOccurrence();
        } else {
            this.saveEvent();
        }
        this.cleanSelection();
        return { updateResources: true };
    }

    handleNewEventMouseDown({ event, resourceElement, x, y }) {
        const isVertical = this.timeline.isVertical;
        this.eventDrag = new SchedulerTimelineEventDrag({
            event,
            isVertical,
            resourceElement,
            isNewEvent: true,
            boundaries: this.timeline.timelinePosition
        });

        this.newEvent({ resourceElement, x, y }, false);
    }
}
