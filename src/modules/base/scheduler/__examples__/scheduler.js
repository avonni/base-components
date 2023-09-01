

import Component from '../../storybookWrappers/scheduler/scheduler';

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
    eventsDisplayFields,
    eventsTheme,
    toolbarActions,
    hiddenDisplays,
    hideResourcesFilter,
    hideSidePanel,
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
    sidePanelPosition,
    start,
    timeSpans,
    timezone,
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
    element.eventsDisplayFields = eventsDisplayFields;
    element.eventsTheme = eventsTheme;
    element.toolbarActions = toolbarActions;
    element.hiddenDisplays = hiddenDisplays;
    element.hideResourcesFilter = hideResourcesFilter;
    element.hideSidePanel = hideSidePanel;
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
    element.sidePanelPosition = sidePanelPosition;
    element.start = start;
    element.timeSpans = timeSpans;
    element.timezone = timezone;
    element.variant = variant;
    element.zoomToFit = zoomToFit;
    return element;
};
