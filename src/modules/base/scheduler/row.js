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

import { classSet } from 'c/utils';
import { normalizeArray } from 'c/utilsPrivate';
import { generateUniqueId } from 'c/utils';

export default class Row {
    constructor(props) {
        this.key = props.key.toString();
        this.color = props.color;
        this.columns = [];
        this.events = props.events;
    }

    get events() {
        return this._events;
    }
    set events(value) {
        this._events = normalizeArray(value);

        if (this.columns.length) {
            this.generateEvents();
        }
    }

    getColumnClass(column) {
        return classSet(
            'slds-border_right slds-col slds-p-around_none slds-wrap'
        )
            .add({
                'slds-theme_alert-texture slds-theme_shade':
                    column && column.disabled
            })
            .toString();
    }

    generateColumns(headerColumns) {
        this.columns = [];
        headerColumns.forEach((element) => {
            this.columns.push({
                start: element.start,
                end: element.end,
                class: this.getColumnClass(),
                events: [],
                crossingEvents: [],
                disabledDates: []
            });
        });

        this.generateEvents();
    }

    generateEvents() {
        const columns = this.columns;

        this.events.forEach((event) => {
            if (!event.color) {
                event.color = this.color;
            }
            // Create one event for each occurrence
            event.dates.forEach((date) => {
                let i = columns.findIndex((column) => {
                    return column.end > date.from;
                });
                if (i > -1) {
                    // If the event is a disabled date/time
                    if (event.disabled) {
                        columns[i].disabledDates.push({
                            title: event.title,
                            from: date.from.ts,
                            to: date.to.ts,
                            style: event.wrapperStyle
                        });
                    } else {
                        // If an event is already crossing this column
                        // and started before the current event,
                        // add a placeholder to push the current event down in the column
                        let placeholders = [];
                        columns[i].crossingEvents.forEach((crossingEvent) => {
                            if (crossingEvent.from < date.from) {
                                placeholders.push(crossingEvent);
                            }
                        });

                        // Push the current event in the first column
                        columns[i].events.push({
                            key: generateUniqueId(),
                            wrapperClass: event.wrapperClass,
                            wrapperStyle: event.wrapperStyle,
                            name: event.name,
                            title: event.title,
                            class: event.class,
                            style: event.style,
                            iconName: event.iconName,
                            from: date.from.ts,
                            to: date.to.ts,
                            placeholders: placeholders
                        });
                    }

                    // In every other column the event crosses, add the event to crossingEvents
                    i += 1;
                    if (!event.disabled) {
                        while (i < columns.length && date.to > columns[i].end) {
                            const crossingEvent = {
                                from: date.from,
                                key: generateUniqueId(),
                                wrapperClass: event.wrapperClass,
                                wrapperStyle: event.wrapperStyle,
                                class: event.class,
                                style: event.style,
                                iconName: event.iconName,
                                title: event.title
                            };
                            columns[i].crossingEvents.push(crossingEvent);

                            // If there were already crossing events, make sure they don't need placeholders
                            if (columns[i].events.length) {
                                columns[i].events.forEach((existingEvent) => {
                                    if (existingEvent.from > date.from) {
                                        existingEvent.placeholders.push(
                                            crossingEvent
                                        );
                                    }
                                });
                            }
                            i += 1;
                        }
                    }
                }
            });
        });
    }
}
