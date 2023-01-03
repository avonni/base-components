import { LightningElement, api } from 'lwc';

export default class Scheduler extends LightningElement {
    @api dialogLabels;
    @api availableDaysOfTheWeek;
    @api availableMonths;
    @api availableTimeFrames;
    @api columns;
    @api contextMenuEmptySpotActions;
    @api contextMenuEventActions;
    @api customEventsPalette;
    @api collapseDisabled;
    @api dateFormat;
    @api disabledDatesTimes;
    @api events;
    @api eventsLabels;
    @api eventsPalette;
    @api eventsTheme;
    @api hiddenDisplays;
    @api hideToolbar;
    @api isLoading;
    @api loadingStateAlternativeText;
    @api readOnly;
    @api recurrentEditModes;
    @api referenceLines;
    @api resizeColumnDisabled;
    @api resources;
    @api selectedDisplay;
    @api selectedResources;
    @api selectedTimeSpan;
    @api start;
    @api timeSpans;
    @api variant;
    @api zoomToFit;
}
