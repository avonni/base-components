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
    @api hiddenActions;
    @api hideResourcesFilter;
    @api hideSidePanel;
    @api isMobileView;
    @api loadingStateAlternativeText;
    @api newEventTitle;
    @api orientation;
    @api preventPastEventCreation;
    @api readOnly;
    @api recurrentEditModes;
    @api resizeColumnDisabled;
    @api resources;
    @api selectedResources;
    @api sidePanelPosition;
    @api start;
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
