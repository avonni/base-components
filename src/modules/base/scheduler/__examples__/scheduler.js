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
    hiddenActions,
    hiddenDisplays,
    hideResourcesFilter,
    hideSidePanel,
    hideToolbar,
    isLoading,
    isMobileView,
    labelNoEventsFound,
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
    toolbarActions,
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
    element.hiddenActions = hiddenActions;
    element.hiddenDisplays = hiddenDisplays;
    element.hideResourcesFilter = hideResourcesFilter;
    element.hideSidePanel = hideSidePanel;
    element.hideToolbar = hideToolbar;
    element.isLoading = isLoading;
    element.isMobileView = isMobileView;
    element.labelNoEventsFound = labelNoEventsFound;
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
    element.toolbarActions = toolbarActions;
    element.variant = variant;
    element.zoomToFit = zoomToFit;
    return element;
};
