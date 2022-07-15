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
    collapseDisabled,
    columns,
    contextMenuEmptySpotActions,
    contextMenuEventActions,
    customEventsPalette,
    dateFormat,
    dialogLabels,
    disabledDatesTimes,
    events,
    eventsLabels,
    eventsPalette,
    eventsTheme,
    hiddenDisplays,
    hideToolbar,
    isLoading,
    readOnly,
    recurrentEditModes,
    referenceLines,
    resizeColumnDisabled,
    resources,
    selectedDisplay,
    selectedResources,
    selectedTimeSpan,
    start,
    timeSpans,
    variant,
    zoomToFit
}) => {
    const element = document.createElement('ac-base-scheduler');
    element.availableDaysOfTheWeek = availableDaysOfTheWeek;
    element.availableMonths = availableMonths;
    element.availableTimeFrames = availableTimeFrames;
    element.collapseDisabled = collapseDisabled;
    element.columns = columns;
    element.contextMenuEmptySpotActions = contextMenuEmptySpotActions;
    element.contextMenuEventActions = contextMenuEventActions;
    element.customEventsPalette = customEventsPalette;
    element.dateFormat = dateFormat;
    element.dialogLabels = dialogLabels;
    element.disabledDatesTimes = disabledDatesTimes;
    element.events = events;
    element.eventsLabels = eventsLabels;
    element.eventsPalette = eventsPalette;
    element.eventsTheme = eventsTheme;
    element.hiddenDisplays = hiddenDisplays;
    element.hideToolbar = hideToolbar;
    element.isLoading = isLoading;
    element.readOnly = readOnly;
    element.recurrentEditModes = recurrentEditModes;
    element.referenceLines = referenceLines;
    element.resizeColumnDisabled = resizeColumnDisabled;
    element.resources = resources;
    element.selectedDisplay = selectedDisplay;
    element.selectedResources = selectedResources;
    element.selectedTimeSpan = selectedTimeSpan;
    element.start = start;
    element.timeSpans = timeSpans;
    element.variant = variant;
    element.zoomToFit = zoomToFit;
    return element;
};
