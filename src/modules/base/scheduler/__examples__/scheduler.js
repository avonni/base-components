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

import Component from 'avonni/scheduler';

customElements.define('ac-base-scheduler', Component.CustomElementConstructor);

export const Scheduler = ({
    availableDaysOfTheWeek,
    availableMonths,
    availableTimeFrames,
    columns,
    contextMenuEmptySpotActions,
    contextMenuEventActions,
    customEventsPalette,
    disabledDatesTimes,
    events,
    eventsPalette,
    eventsTheme,
    headers,
    readOnly,
    rows,
    rowsKeyField,
    start,
    theme,
    visibleSpan
}) => {
    const element = document.createElement('ac-base-scheduler');
    element.availableDaysOfTheWeek = availableDaysOfTheWeek;
    element.availableMonths = availableMonths;
    element.availableTimeFrames = availableTimeFrames;
    element.columns = columns;
    element.contextMenuEmptySpotActions = contextMenuEmptySpotActions;
    element.contextMenuEventActions = contextMenuEventActions;
    element.customEventsPalette = customEventsPalette;
    element.disabledDatesTimes = disabledDatesTimes;
    element.events = events;
    element.eventsPalette = eventsPalette;
    element.eventsTheme = eventsTheme;
    element.headers = headers;
    element.readOnly = readOnly;
    element.rows = rows;
    element.rowsKeyField = rowsKeyField;
    element.start = start;
    element.theme = theme;
    element.visibleSpan = visibleSpan;
    return element;
};
