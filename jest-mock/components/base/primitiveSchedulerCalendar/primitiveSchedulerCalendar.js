import { LightningElement, api } from 'lwc';

export default class PrimitiveSchedulerCalendar extends LightningElement {
    @api availableDaysOfTheWeek;
    @api availableMonths;
    @api availableTimeFrames;
    @api availableTimeSpans;
    @api collapseDisabled;
    @api dateFormat;
    @api events;
    @api eventsLabels;
    @api eventsTheme;
    @api hiddenActions;
    @api hideResourcesFilter;
    @api hideSidePanel;
    @api loadingStateAlternativeText;
    @api newEventTitle;
    @api readOnly;
    @api recurrentEditModes;
    @api resizeColumnDisabled;
    @api resources;
    @api selectedDate;
    @api selectedResources;
    @api sidePanelPosition;
    @api timeSpan;
    @api timezone;
    @api zoomToFit;

    @api cleanSelection() {}
    @api collapseSidePanel() {}
    @api createEvent() {}
    @api deleteEvent() {}
    @api expandSidePanel() {}
    @api focusEvent() {}
    @api newEvent() {}
    @api saveSelection() {}
    @api selectEvent() {}
}
