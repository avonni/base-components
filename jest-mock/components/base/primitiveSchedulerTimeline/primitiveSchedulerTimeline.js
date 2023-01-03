import { LightningElement, api } from 'lwc';

export default class PrimitiveSchedulerTimeline extends LightningElement {
    @api availableDaysOfTheWeek;
    @api availableMonths;
    @api availableTimeFrames;
    @api availableTimeSpans;
    @api collapseDisabled;
    @api columns;
    @api dateFormat;
    @api events;
    @api eventsLabels;
    @api eventsTheme;
    @api loadingStateAlternativeText;
    @api newEventTitle;
    @api orientation;
    @api readOnly;
    @api recurrentEditModes;
    @api resizeColumnDisabled;
    @api resources;
    @api selectedResources;
    @api start;
    @api timeSpan;
    @api zoomToFit;

    @api cleanSelection() {}
    @api createEvent() {}
    @api deleteEvent() {}
    @api focusEvent() {}
    @api newEvent() {}
    @api saveSelection() {}
    @api selectEvent() {}
}
