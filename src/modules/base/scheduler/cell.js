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

export default class Cell {
    constructor(props) {
        this.start = props.start;
        this.end = props.end;
        this.events = [];
        this.crossingEvents = [];
        this.disabledDates = [];
        this.placeholders = [];
    }

    get class() {
        return classSet(
            'slds-border_right slds-col slds-p-around_none slds-wrap'
        )
            .add({
                'slds-theme_alert-texture slds-theme_shade': this.disabled
            })
            .toString();
    }

    addEvent(event) {
        if (event.disabled) {
            this.disabledDates.push(event);
        } else {
            // If this is the first event of the cell
            // and events starting before the current event are already crossing it,
            // add a placeholder per crossing event, to push the events down in the cell
            // let placeholders = [];
            if (!this.events.length) {
                this.crossingEvents.forEach((crossingEvent) => {
                    if (crossingEvent.from < event.from) {
                        this.placeholders.push(crossingEvent);
                    }
                });
            }

            // Push the event
            this.events.push(event);
        }
    }

    addCrossingEvent(event) {
        this.crossingEvents.push(event);

        // If there were already crossing events, make sure they don't need placeholders
        if (this.events.length) {
            this.events.forEach((existingEvent) => {
                if (existingEvent.from > event.from) {
                    // existingEvent.placeholders.push(event);
                    this.placeholders.push(event);
                }
            });
        }
    }
}
