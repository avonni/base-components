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

export default class Row {
    constructor(props) {
        this.key = props.key;
        this.columns = [];
        this.events = props.events;
    }

    get eventClass() {
        return 'slds-p-vertical_xx-small slds-grid slds-grid_vertical-align-center scheduler__event slds-is-relative';
    }

    generateColumns(headerColumns) {
        const columns = [];
        headerColumns.forEach((element) => {
            columns.push({
                start: element.start,
                end: element.end,
                events: []
            });
        });

        this.events.forEach((event) => {
            // Create one event for each occurrence
            event.dates.forEach((date) => {
                let i = columns.findIndex((column) => {
                    return column.end > date.from;
                });
                if (i > -1) {
                    // The event will be visible in the first column
                    columns[i].events.push({
                        event,
                        class: this.eventClass
                    });

                    i += 1;
                    // The event will be hidden in the other column it crosses,
                    // so it takes some room in case there are several events in one column
                    while (i < columns.length && date.to > columns[i].end) {
                        columns[i].events.push({
                            event,
                            class: this.eventClass.concat(' slds-hidden')
                        });
                        i += 1;
                    }
                }
            });
        });
        this.columns = columns;
    }
}
