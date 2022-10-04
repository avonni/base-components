import { LightningElement, api } from 'lwc';

export default class PrimitiveSchedulerAgenda extends LightningElement {
    @api availableDaysOfTheWeek;
    @api availableMonths;
    @api availableTimeFrames;
    @api availableTimeSpans;
    @api collapseDisabled;
    @api dateFormat;
    @api events;
    @api eventsLabels;
    @api eventsTheme;
    @api loadingStateAlternativeText;
    @api newEventTitle;
    @api readOnly;
    @api recurrentEditModes;
    @api resizeColumnDisabled;
    @api resources;
    @api selectedResources;
    @api selectedDate;
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
