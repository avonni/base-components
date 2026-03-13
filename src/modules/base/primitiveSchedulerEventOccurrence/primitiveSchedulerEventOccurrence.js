import PrimitiveSchedulerEvent from 'c/primitiveSchedulerEvent';
import {
    DEFAULT_ACTION_NAMES,
    isAllDay,
    spansOnMoreThanOneDay
} from 'c/schedulerUtils';
import {
    classSet,
    normalizeArray,
    normalizeBoolean,
    normalizeObject,
    normalizeString
} from 'c/utils';
import { classListMutation } from 'c/utilsPrivate';
import { api } from 'lwc';
import disabled from './disabled.html';
import eventOccurrence from './eventOccurrence.html';
import referenceLine from './referenceLine.html';

const DEFAULT_DATE_FORMAT = 'ff';
const VARIANTS = {
    default: 'timeline-horizontal',
    valid: [
        'agenda',
        'calendar-horizontal',
        'calendar-month',
        'calendar-vertical',
        'timeline-horizontal',
        'timeline-vertical'
    ]
};

/**
 * Event occurrence displayed by the scheduler.
 *
 * @class
 * @descriptor c-primitive-scheduler-event-occurrence
 */
export default class PrimitiveSchedulerEventOccurrence extends PrimitiveSchedulerEvent {
    /**
     * Unique name of the event this occurrence belongs to.
     *
     * @type {string}
     * @public
     */
    @api eventName;
    /**
     * The Lightning Design System name of the icon. Names are written in the format utility:user.
     * The icon is only used by the disabled occurrences and is appended to the left of the title.
     *
     * @type {string}
     * @public
     */
    @api iconName;
    /**
     * Unique key of the occurrence.
     *
     * @type {string}
     * @public
     */
    @api occurrenceKey;
    /**
     * Theme of the occurrence.
     * If the event is a reference line, valid values include default, inverse, success, warning, error and lightest. Otherwise, valid values include default, transparent, line, hollow and rounded.
     *
     * @type {string}
     * @public
     */
    @api theme;

    _dateFormat = DEFAULT_DATE_FORMAT;
    _disabled = false;
    _event;
    _eventData = {};
    _hiddenActions = [];
    _labels = {};
    _occurrence = {};
    _preventPastEventCreation = false;
    _readOnly = false;
    _referenceLine = false;
    _resourceKey;
    _resources = [];
    _scrollOffset = 0;
    _title;
    _variant = VARIANTS.default;
    _zoomToFit = false;

    computedLabels = {};

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        super.connectedCallback();
        this._initLabels();
        this._connected = true;
    }

    renderedCallback() {
        this.updatePosition();
        this.updateLength();
        this.updateThickness();
        this._updateStickyLabels();
    }

    render() {
        if (this.disabled) return disabled;
        if (this.referenceLine) return referenceLine;
        return eventOccurrence;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Duration of a scheduler column, in milliseconds.
     *
     * @type {number}
     * @public
     * @default 0
     */
    @api
    get cellDuration() {
        return this._cellDuration;
    }
    set cellDuration(value) {
        super.cellDuration = value;

        if (this._connected) {
            this._updateStickyLabels();
        }
    }

    /**
     * Height of a cell, in pixels.
     *
     * @type {number}
     * @public
     * @default 0
     */
    @api
    get cellHeight() {
        return this._cellHeight;
    }
    set cellHeight(value) {
        super.cellHeight = value;
    }

    /**
     * Width of a cell, in pixels.
     *
     * @type {number}
     * @public
     * @default 0
     */
    @api
    get cellWidth() {
        return this._cellWidth;
    }
    set cellWidth(value) {
        super.cellWidth = value;

        if (this._connected) {
            this._updateStickyLabels();
        }
    }

    /**
     * Luxon date format to use in the labels.
     *
     * @type {string}
     * @public
     */
    @api
    get dateFormat() {
        return this._dateFormat;
    }
    set dateFormat(value) {
        this._dateFormat =
            typeof value === 'string' ? value : DEFAULT_DATE_FORMAT;

        if (this._connected) this._initLabels();
    }

    /**
     * If present, the occurrence is a disabled date/time.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = normalizeBoolean(value);

        if (this._connected) {
            this.updateThickness();
        }
    }

    /**
     * Position of the end extremity of the occurrence. Right for horizontal, bottom for vertical.
     *
     * @type {number}
     * @public
     * @default 0
     */
    @api
    get endPosition() {
        if (this.isVertical) {
            return (
                this.startPosition +
                this.hostElement.getBoundingClientRect().height
            );
        }
        return (
            this.x +
            this._offsetStart +
            this.hostElement.getBoundingClientRect().width +
            this.rightLabelWidth
        );
    }

    /**
     * Initial event object, before it was computed and transformed into a SchedulerEvent.
     * It may be used by the labels.
     *
     * @type {object}
     * @public
     */
    @api
    get eventData() {
        return this._eventData;
    }
    set eventData(value) {
        this._eventData = typeof value === 'object' ? value : {};

        if (this._connected) this._initLabels();
    }

    /**
     * Start date of the occurrence.
     *
     * @type {DateTime}
     * @public
     * @required
     */
    @api
    get from() {
        return this._from;
    }
    set from(value) {
        super.from = value;

        if (this._connected) {
            this._updateStickyLabels();
        }
    }

    /**
     * The header cells used to position and size the event. Two keys are allowed: xAxis and yAxis. If present, each key must be an array of cell objects.
     *
     * @type {object}
     * @public
     * @required
     */
    @api
    get headerCells() {
        return this._headerCells;
    }
    set headerCells(value) {
        super.headerCells = value;

        if (this._connected) {
            this._updateStickyLabels();
        }
    }

    /**
     * Array of default action names that are not allowed. These actions will be hidden from the menus, and ignored when triggered by a user action (double click, drag, etc.).
     * Valid values include `Standard.Scheduler.AddEvent`, `Standard.Scheduler.DeleteEvent` and `Standard.Scheduler.EditEvent`.
     *
     * @type {string[]}
     * @public
     */
    @api
    get hiddenActions() {
        return this._hiddenActions;
    }
    set hiddenActions(value) {
        this._hiddenActions = normalizeArray(value, 'string');
    }

    /**
     * Labels of the event, by their position.
     *
     * @type {object}
     * @public
     */
    @api
    get labels() {
        return this._labels;
    }
    set labels(value) {
        this._labels = typeof value === 'object' ? { ...value } : {};

        if (this._connected) this._initLabels();
    }

    /**
     * Left label element width.
     *
     * @type {HTMLElement}
     * @public
     * @default 0
     */
    @api
    get leftLabelWidth() {
        const label = this.template.querySelector(
            '.avonni-scheduler__event-label_left'
        );
        return label ? label.getBoundingClientRect().width : 0;
    }

    /**
     * Deprecated. Use `start-position` instead.
     *
     * @type {number}
     * @public
     * @default 0
     * @deprecated
     */
    @api
    get leftPosition() {
        return this.startPosition;
    }

    /**
     * Event occurrence object this component is based on. The object is used to make sure the changes made in the scheduler are taken into account, even without a re-render.
     *
     * @type {object}
     * @public
     * @required
     */
    @api
    get occurrence() {
        return this._occurrence;
    }
    set occurrence(value) {
        this._occurrence = typeof value === 'object' ? value : {};
    }

    /**
     * If present, the users cannot create new events, or move existing events in the past.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get preventPastEventCreation() {
        return this._preventPastEventCreation;
    }
    set preventPastEventCreation(value) {
        this._preventPastEventCreation = normalizeBoolean(value);
    }

    /**
     * If true, the occurrence cannot be dragged, resized or edited in any way.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get readOnly() {
        return this._readOnly;
    }
    set readOnly(value) {
        this._readOnly = normalizeBoolean(value);
    }

    /**
     * If true, the occurrence is a referenceLine.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get referenceLine() {
        return this._referenceLine;
    }
    set referenceLine(value) {
        this._referenceLine = normalizeBoolean(value);
    }

    /**
     * Unique key of the scheduler resource this occurrence appears on.
     *
     * @type {string}
     * @public
     * @required
     */
    @api
    get resourceKey() {
        return this._resourceKey;
    }
    set resourceKey(value) {
        this._resourceKey = value;

        if (this._connected) this._initLabels();
    }

    /**
     * Array of the scheduler resource objects.
     *
     * @type {object[]}
     * @public
     */
    @api
    get resources() {
        return this._resources;
    }
    set resources(value) {
        this._resources = normalizeArray(value);

        if (this._connected) this._initLabels();
    }

    /**
     * Right label element width.
     *
     * @type {HTMLElement}
     * @public
     * @default 0
     */
    @api
    get rightLabelWidth() {
        const label = this.template.querySelector(
            '.avonni-scheduler__event-label_right'
        );
        return label ? label.getBoundingClientRect().width : 0;
    }

    /**
     * Deprecated. Use `end-position` instead.
     *
     * @type {number}
     * @public
     * @default 0
     * @deprecated
     */
    @api
    get rightPosition() {
        return this.endPosition;
    }

    /**
     * Deprecated. Use `resource-key` instead.
     *
     * @type {string}
     * @deprecated
     */
    @api
    get rowKey() {
        return this._resourceKey;
    }
    set rowKey(value) {
        this._resourceKey = value;

        if (this._connected) this._initLabels();
    }

    /**
     * Deprecated. Use `resources` instead.
     *
     * @type {object[]}
     * @deprecated
     */
    @api
    get rows() {
        return this._resources;
    }
    set rows(value) {
        this._resources = normalizeArray(value);

        if (this._connected) this._initLabels();
    }

    /**
     * Deprecated. Use `scrollOffset` instead.
     *
     * @type {number}
     * @deprecated
     */
    @api
    get scrollLeftOffset() {
        return this._scrollOffset;
    }
    set scrollLeftOffset(value) {
        this._scrollOffset = !isNaN(Number(value)) ? Number(value) : 0;
        if (this._connected) this._updateStickyLabels();
    }

    /**
     * Width of the scheduler datatable column. It is used as an offset by the sticky labels.
     *
     * @type {number}
     * @public
     * @default 0
     */
    @api
    get scrollOffset() {
        return this._scrollOffset;
    }
    set scrollOffset(value) {
        this._scrollOffset = !isNaN(Number(value)) ? Number(value) : 0;
        if (this._connected) this._updateStickyLabels();
    }

    /**
     * Position of the start extremity of the occurrence. Left for horizontal, top for vertical.
     *
     * @type {number}
     * @public
     * @default 0
     */
    @api
    get startPosition() {
        if (this.isVertical) {
            const top = this.y + this._offsetStart;
            return top;
        }
        const left = this.x + this._offsetStart - this.leftLabelWidth;
        return left > 0 ? left : 0;
    }

    /**
     * Title of the occurrence.
     *
     * @type {string}
     * @public
     */
    @api
    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;

        if (this._connected) this._initLabels();
    }

    /**
     * End date of the occurrence.
     *
     * @type {DateTime}
     * @public
     * @required
     */
    @api
    get to() {
        return this._to;
    }
    set to(value) {
        super.to = value;

        if (this._connected) {
            this._updateStickyLabels();
        }
    }

    /**
     * Orientation of the scheduler. Valid values include timeline-horizontal, timeline-vertical and calendar.
     *
     * @type {string}
     * @public
     * @default timeline-horizontal
     */
    @api
    get variant() {
        return this._variant;
    }
    set variant(value) {
        this._variant = normalizeString(value, {
            fallbackValue: VARIANTS.default,
            validValues: VARIANTS.valid
        });

        classListMutation(this.classList, {
            'avonni-scheduler__event_horizontal':
                this._variant === 'timeline-horizontal',
            'avonni-scheduler__standalone-event': this.isStandalone
        });

        if (this._connected) {
            this.updatePosition();
            this.updateLength();
            this.updateThickness();
            this._updateStickyLabels();
        }
    }

    /**
     * Total width of the occurrence, including the labels.
     *
     * @type {number}
     * @public
     * @default 0
     */
    @api
    get width() {
        if (this.hostElement) {
            const width = this.hostElement.getBoundingClientRect().width;
            return this.leftLabelWidth + width + this.rightLabelWidth;
        }
        return 0;
    }

    /**
     * Horizontal position of the occurrence in the scheduler, in pixels.
     *
     * @type {number}
     * @public
     * @default 0
     */
    @api
    get x() {
        return this._x;
    }
    set x(value) {
        super.x = value;
        if (this._connected) {
            this._updateStickyLabels();
        }
    }

    /**
     * If present, the event is in a zoom-to-fit scheduler.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get zoomToFit() {
        return this._zoomToFit;
    }
    set zoomToFit(value) {
        this._zoomToFit = normalizeBoolean(value);
        this._updateStickyLabels();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * True if the center label contains rich text. Used to make sure the truncation is applied when the label is not rich text.
     *
     * @type {boolean}
     * @default false
     */
    get centerLabelHasRichText() {
        return (
            typeof this.computedLabels.center.value === 'string' &&
            this.computedLabels.center.value.includes('<')
        );
    }

    /**
     * Computed CSS classes of the disabled events wrapper.
     *
     * @type {string}
     */
    get computedDisabledClass() {
        return classSet(
            'slds-theme_alert-texture avonni-scheduler__disabled-date'
        )
            .add({
                'slds-theme_shade': this.isTimeline,
                'slds-is-absolute': !this.isStandalone,
                'avonni-scheduler__disabled-date_standalone slds-p-horizontal_x-small slds-m-bottom_xx-small slds-is-relative':
                    this.isStandalone,
                'avonni-scheduler__event_month-multi-day-starts-in-previous-cell':
                    !this.displayAsDot && this.occurrence.startsInPreviousCell,
                'avonni-scheduler__event_month-multi-day-ends-in-later-cell':
                    !this.displayAsDot && this.occurrence.endsInLaterCell
            })
            .toString();
    }

    /**
     * Computed CSS classes of the disabled occurrences' title.
     *
     * @type {string}
     */
    get computedDisabledTitleClass() {
        return classSet(
            'avonni-scheduler__disabled-date-title slds-text-body_small slds-p-around_xx-small slds-grid slds-grid-vertical-align_center slds-text-color_weak'
        )
            .add({
                'avonni-scheduler__disabled-date-title_vertical':
                    this.isVertical
            })
            .toString();
    }

    /**
     * Computed CSS classes of the event occurence center label.
     *
     * @type {string}
     */
    get computedEventOccurrenceCenterLabelClass() {
        return classSet(
            'slds-truncate slds-grid avonni-scheduler__event-label_center'
        )
            .add({
                'slds-p-horizontal_x-small':
                    !this.isVerticalTimeline && !this.displayAsDot,
                'slds-m-top_small': this.isVertical && this.theme === 'line',
                'slds-grid_vertical-align-center': this.displayAsDot
            })
            .toString();
    }

    /**
     * Computed CSS classes of the event occurrences.
     *
     * @type {string}
     */
    get computedEventOccurrenceClass() {
        return classSet('slds-grid')
            .add({
                'slds-grid_vertical-align-center':
                    !this.isVerticalTimeline &&
                    !this.isVerticalCalendar &&
                    !this.displayAsDot,
                'avonni-scheduler__event-wrapper_vertical': this.isVertical,
                'avonni-scheduler__event-wrapper': !this.isVertical
            })
            .toString();
    }

    /**
     * Computed CSS classes of the occurrence.
     *
     * @type {string}
     */
    get computedOccurrenceClass() {
        const theme = this.theme;
        const isPast = this.to < Date.now();
        const centerLabel = normalizeObject(this.labels.center);
        let classes = classSet(
            'avonni-scheduler__event slds-grid slds-has-flexi-truncate avonni-primitive-scheduler-event-occurrence__flex-col'
        )
            .add({
                'slds-p-horizontal_x-small': !this.isVerticalCalendar,
                'avonni-scheduler__event_horizontal': !this.isVertical,
                'avonni-scheduler__event_inverse-label slds-current-color':
                    !isPast &&
                    !this.displayAsDot &&
                    (theme === 'default' ||
                        theme === 'rounded' ||
                        (this._focused && theme === 'transparent')),
                'avonni-scheduler__event_focused': this._focused,
                'slds-p-vertical_xx-small': centerLabel.iconName,
                'avonni-scheduler__event_vertical-animated':
                    theme !== 'line' &&
                    this.isVertical &&
                    !this.readOnly &&
                    !this.hiddenActions.includes(DEFAULT_ACTION_NAMES.edit),
                'slds-p-bottom_xx-small': theme === 'line',
                'avonni-scheduler__event_display-as-dot': this.displayAsDot,
                'slds-theme_shade slds-theme_alert-texture slds-text-color_weak':
                    this.disabled,
                'avonni-scheduler__event_standalone-multi-day-starts-in-previous-cell':
                    !this.displayAsDot && this.occurrence.startsInPreviousCell,
                'avonni-scheduler__event_standalone-multi-day-ends-in-later-cell':
                    !this.displayAsDot && this.occurrence.endsInLaterCell,
                'avonni-scheduler__event_past': isPast
            })
            .toString();

        if (!this.displayAsDot) {
            classes += ` avonni-scheduler__event_${theme}`;
        }
        return classes;
    }

    /**
     * Computed CSS classes of the reference line.
     *
     * @type {string}
     */
    get computedReferenceLineClass() {
        return classSet('avonni-scheduler__reference-line slds-is-absolute')
            .add({
                'avonni-scheduler__reference-line_vertical':
                    this.isVerticalTimeline || this.isVerticalCalendar,
                'avonni-scheduler__reference-line_standalone': this.isStandalone
            })
            .toString();
    }

    /**
     * Computed background color of the occurrence.
     *
     * @type {string}
     */
    get computedColor() {
        return this.color || this.resourceColor;
    }

    /**
     * Computed CSS style for the disabled events wrapper.
     *
     * @type {string}
     */
    get disabledStyle() {
        return this.isTimeline
            ? null
            : `
                background-color: ${this._getTransparentColor(
                    this.computedColor
                )};
                --avonni-primitive-scheduler-event-occurrence-background-color: ${this._getTransparentColor(
                    this.computedColor
                )};
            `;
    }

    /**
     * True if the event should be displayed as a dot.
     *
     * @type {boolean}
     */
    get displayAsDot() {
        return this.isStandalone && !this.spansOnMoreThanOneDay;
    }

    /**
     * True if the start resize icon should be hidden.
     *
     * @type {boolean}
     */
    get hideEndResizeIcon() {
        return (
            this.hideResizeIcon ||
            (this.preventPastEventCreation &&
                this.to <= this._createDate(new Date()))
        );
    }

    /**
     * True if the resize icons should be hidden.
     *
     * @type {boolean}
     */
    get hideResizeIcon() {
        return (
            this.readOnly ||
            this.isStandalone ||
            this.hiddenActions.includes(DEFAULT_ACTION_NAMES.edit)
        );
    }

    /**
     * True if the start resize icon should be hidden.
     *
     * @type {boolean}
     */
    get hideStartResizeIcon() {
        return (
            this.hideResizeIcon ||
            (this.preventPastEventCreation &&
                this.from <= this._createDate(new Date()))
        );
    }

    /**
     * True if the variant is agenda.
     *
     * @type {boolean}
     */
    get isAgenda() {
        return this.variant === 'agenda';
    }

    /**
     * True if the event spans on one full day.
     *
     * @type {boolean}
     */
    get isAllDay() {
        return isAllDay({
            event: this.eventData,
            from: this.from,
            to: this.to,
            endOfTo: this.occurrence && this.occurrence.endOfTo,
            startOfFrom: this.occurrence && this.occurrence.startOfFrom
        });
    }

    /**
     * True if the event is part of a calendar.
     *
     * @type {boolean}
     */
    get isCalendar() {
        return this.variant.startsWith('calendar');
    }

    /**
     * True if the variant is calendar-horizontal.
     *
     * @type {boolean}
     */
    get isHorizontalCalendar() {
        return this.variant === 'calendar-horizontal';
    }

    /**
     * True if the variant is calendar-month.
     *
     * @type {boolean}
     */
    get isMonthCalendar() {
        return this.variant === 'calendar-month';
    }

    /**
     * True if the event is part of a calendar in the month view, and it doesn't span on more than one day.
     *
     * @type {boolean}
     */
    get isMonthCalendarSingleDay() {
        return this.isMonthCalendar && !this.spansOnMoreThanOneDay;
    }

    /**
     * True if the event orientation is horizontal, but it is not set to one row. The standalone events are positionned in absolute on a grid (in a calendar), or positionned statically (in an agenda).
     *
     * @type {boolean}
     */
    get isStandalone() {
        return this.isMonthCalendar || this.isAgenda;
    }

    /**
     * True if the event is part of a timeline.
     *
     * @type {boolean}
     */
    get isTimeline() {
        return this.variant.startsWith('timeline');
    }

    /**
     * True if the orientation of the event is vertical.
     *
     * @type {boolean}
     */
    get isVertical() {
        return this.isVerticalTimeline || this.isVerticalCalendar;
    }

    /**
     * True if the variant is calendar-vertical.
     *
     * @type {boolean}
     */
    get isVerticalCalendar() {
        return this.variant === 'calendar-vertical';
    }

    /**
     * True if the variant is timeline-vertical.
     *
     * @type {boolean}
     */
    get isVerticalTimeline() {
        return this.variant === 'timeline-vertical';
    }

    /**
     * Total number of events (including this one) that overlap in this time frame.
     *
     * @type {number}
     */
    get numberOfEventsInThisTimeFrame() {
        return this.occurrence?.numberOfEventsInThisTimeFrame || 0;
    }

    /**
     * Offset space between the start of the resource and the start position of the occurrence.
     *
     * @type {number}
     * @default 0
     */
    get offsetSide() {
        return this.occurrence?.offsetSide || 0;
    }

    /**
     * True if the occurrence overflows the cell.
     *
     * @type {boolean}
     */
    get overflowsCell() {
        return this.occurrence?.overflowsCell;
    }

    /**
     * Default color of the occurrence's resource.
     *
     * @type {string}
     */
    get resourceColor() {
        const resource = this.resources.find(
            (res) => res.name === this.resourceKey
        );
        return resource && resource.color;
    }

    /**
     * True if the event start and end are on different days.
     *
     * @type {boolean}
     */
    get spansOnMoreThanOneDay() {
        return spansOnMoreThanOneDay({
            event: this.eventData,
            from: this.from,
            to: this.to,
            endOfTo: this.occurrence && this.occurrence.endOfTo,
            startOfFrom: this.occurrence && this.occurrence.startOfFrom
        });
    }

    /**
     * Computed inline style of the standalone chip.
     *
     * @type {string}
     */
    get standaloneChipStyle() {
        return `background-color: ${this.computedColor};`;
    }

    /**
     * Computed start time of the occurrence.
     *
     * @type {string}
     */
    get startTime() {
        return this.from ? this.from.toFormat('t') : '';
    }

    /**
     * Computed inline style of the occurrence.
     *
     * @type {string}
     */
    get style() {
        if (this.displayAsDot) {
            return '';
        }
        const { computedColor, theme } = this;
        const transparentColor = this._getTransparentColor(this.computedColor);
        const isDefault = theme === 'default';
        const isTransparent = theme === 'transparent';
        const isRounded = theme === 'rounded';
        const isHollow = theme === 'hollow';
        const isLine = theme === 'line';

        let style = '';
        if (isDefault || isRounded || (isTransparent && this._focused)) {
            style += `
                background-color: ${computedColor};
                --avonni-primitive-scheduler-event-occurrence-background-color: ${computedColor};
            `;
        } else if (isTransparent && !this._focused) {
            style += `
                background-color: ${transparentColor};
                --avonni-primitive-scheduler-event-occurrence-background-color: ${transparentColor};
            `;
        }
        if (isTransparent) {
            style += `border-left-color: ${computedColor};`;
        }
        if (isHollow || isLine) {
            style += `border-color: ${computedColor}`;
        }

        return style;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Hide the right label. Since the label is not part of the component width, it is used to make sure it doesn't overflow.
     *
     * @public
     */
    @api
    hideRightLabel() {
        const rightLabel = this.template.querySelector(
            '.avonni-scheduler__event-label_right'
        );
        if (rightLabel) {
            rightLabel.classList.add('slds-hide');
        }
    }

    /**
     * Display the right label.
     *
     * @public
     */
    @api
    showRightLabel() {
        const rightLabel = this.template.querySelector(
            '.avonni-scheduler__event-label_right'
        );
        if (rightLabel) {
            rightLabel.classList.remove('slds-hide');
        }
    }

    /**
     * Deprecated. Use `updateThickness` instead.
     * @deprecated
     */
    @api
    updateHeight() {
        this.updateThickness();
    }

    /**
     * Update the length of the occurrence in the scheduler grid.
     *
     * @public
     */
    @api
    updateLength() {
        super._updateLength();
    }

    /**
     * Update the position of the occurrence in the scheduler grid.
     *
     * @public
     */
    @api
    updatePosition() {
        this._updatePosition();
    }

    /**
     * Update the thickness of a disabled occurrence.
     *
     * @public
     */
    @api
    updateThickness() {
        if (!this.disabled || this.isStandalone) return;

        const element = this.hostElement;

        if (this.isVerticalTimeline) {
            // Vertical timeline
            element.style.width = `${this.cellWidth}px`;
        } else if (this.isVerticalCalendar) {
            // Calendar single-day event
            const width = this.cellWidth / this.numberOfEventsInThisTimeFrame;
            element.style.width = `${width}px`;
        } else if (this.isCalendar) {
            // Calendar day/week multi-day event
            const height = this.cellHeight / this.numberOfEventsInThisTimeFrame;
            element.style.height = `${height}px`;
        } else {
            // Horizontal timeline
            const resource = this.resources.find(
                (res) => res.name === this.resourceKey
            );

            if (resource) {
                const height = resource.height;
                element.style.height = `${height}px`;
            }
        }
    }

    /**
     * Deprecated. Use `updateLength` instead.
     *
     * @deprecated
     */
    @api
    updateWidth() {
        this.updateLength();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Align the event with its resource.
     */
    _alignPositionWithResource() {
        if (this.referenceLine) {
            return;
        }

        if (this.isVerticalTimeline) {
            const resourceIndex = this.resources.findIndex((resource) => {
                return resource.name === this.resourceKey;
            });
            this._x = resourceIndex * this.cellWidth;
        } else {
            let y = 0;
            for (let i = 0; i < this.resources.length; i++) {
                const resource = this.resources[i];
                const resourceKey = resource.name;
                if (resourceKey === this.resourceKey) break;

                y += resource.height;
            }
            y += this.offsetSide;
            this._y = y;
        }
    }

    /**
     * Initialize the labels values.
     */
    _initLabels() {
        if (!this.resources.length || !this.resourceKey) return;

        const labels = {};
        const resource = this.resources.find(
            (res) => res.name === this.resourceKey
        );

        if (resource) {
            for (let i = 0; i < Object.entries(this.labels).length; i++) {
                const label = Object.entries(this.labels)[i];
                const position = label[0];
                const hideLabels =
                    this.isVertical ||
                    this.isMonthCalendar ||
                    this.isAgenda ||
                    this.isHorizontalCalendar;
                if (hideLabels && position !== 'center') {
                    continue;
                }

                const { value, fieldName, iconName } = label[1];

                labels[position] = {};
                if (value) {
                    // If the label has a fixed value, prioritize it
                    labels[position].value = value;
                } else if (fieldName) {
                    // Else, search for a field name in the occurrence,
                    // then the event, then the resource
                    const computedValue =
                        this[fieldName] ||
                        this.eventData[fieldName] ||
                        resource.data[fieldName];

                    // If the field name is a date, parse it with the date format
                    if (
                        ['from', 'to', 'recurrenceEndDate'].includes(fieldName)
                    ) {
                        const dateValue = this._createDate(computedValue);
                        labels[position].value = dateValue
                            ? dateValue.toFormat(this.dateFormat)
                            : computedValue;
                    } else {
                        labels[position].value = computedValue;
                    }
                }
                labels[position].iconName = iconName;
            }
        }

        this.computedLabels = labels;

        requestAnimationFrame(() => {
            this._updateStickyLabels();
        });
    }

    /**
     * Update the position of the occurrence in the scheduler grid.
     */
    _updatePosition() {
        if (this.isTimeline || this.isHorizontalCalendar) {
            this._updatePositionInTimeline();
        } else {
            this._updatePositionInCalendar();
        }

        this._updateHostTranslate();
    }

    /**
     * Update the position of the event if it is set in a calendar.
     */
    _updatePositionInCalendar() {
        const style = this.hostElement.style;
        const isMonth = this.isMonthCalendar;

        // Hide the placeholders in the month calendar display
        const { isPlaceholder, columnIndex } = this.hostElement.dataset;
        const isHidden = isMonth && isPlaceholder && columnIndex !== '0';
        style.visibility = isHidden ? 'hidden' : 'visible';

        // Hide the overflowing events in the month calendar display
        let overflows = this.overflowsCell;
        const yAxis = this.headerCells.yAxis;
        if (yAxis && !overflows && !isPlaceholder) {
            const firstVisibleDate = this._createDate(yAxis[0].start);
            const startsBeforeBeginningOfMonth =
                this.from < firstVisibleDate &&
                this.to > firstVisibleDate.endOf('day');
            // The visible weeks placeholders will be displayed,
            // but not the original event
            overflows = startsBeforeBeginningOfMonth;
        }
        style.display = isMonth && overflows ? 'none' : null;

        const { cellHeight, headerCells, cellWidth } = this;
        if (
            !headerCells.xAxis ||
            !headerCells.yAxis ||
            !cellWidth ||
            !cellHeight
        ) {
            return;
        }

        // Get the vertical and horizontal cells indices
        const start = this.occurrence.firstAllowedDate;
        const yIndex = this._getStartCellIndex(headerCells.yAxis);
        const xIndex = headerCells.xAxis.findIndex((cell) => {
            const cellEnd = this._createDate(cell.end);
            const sameWeekDay = cellEnd.weekday === start.weekday;
            return cellEnd > start && (!this.isMonthCalendar || sameWeekDay);
        });

        if (yIndex < 0 || xIndex < 0) {
            return;
        }
        this._y = yIndex * cellHeight;
        this._x = xIndex * cellWidth;

        if (this.isMonthCalendar) {
            this._y += this.offsetSide;
        }
    }

    /**
     * Update the position of the event if it is set in a timeline.
     */
    _updatePositionInTimeline() {
        const { cellHeight, cellWidth, cells } = this;
        if (!cells) {
            return;
        }

        // Find the cell where the event starts
        const i = this._getStartCellIndex(cells);
        if (i < 0) return;

        // Place the event at the right header
        if (this.isVerticalTimeline) {
            this._y = i * cellHeight;
        } else {
            this._x = i * cellWidth;
        }

        this._alignPositionWithResource();
    }

    /**
     * Set the left position of the sticky label.
     */
    _updateStickyLabels() {
        const stickyLabel = this.template.querySelector(
            '[data-element-id="div-center-label-wrapper"]'
        );
        if (!stickyLabel) {
            return;
        }

        if (this.isVerticalTimeline) {
            const top = this.scrollOffset - this.y - this._offsetStart;
            stickyLabel.style.top = `${top}px`;
        } else if (!this.zoomToFit) {
            const left = this.scrollOffset - this.x - this._offsetStart;
            stickyLabel.style.left = `${left}px`;
        }
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Handle the contextmenu event fired by the occurrence if it is not disabled.
     * Dispatch a privatecontextmenu event.
     *
     * @param {Event} event
     */
    handleContextMenu(event) {
        event.preventDefault();

        /**
         * The event fired when the user opens the context menu of the occurrence, if it is not disabled.
         *
         * @event
         * @name privatecontextmenu
         * @param {string} eventName Name of the event this occurrence belongs to.
         * @param {string} key Key of this occurrence.
         * @param {number} x Horizontal position of the occurrence.
         * @param {number} y Vertical position of the occurrence.
         */
        this.dispatchCustomEvent('privatecontextmenu', event);
    }

    /**
     * Handle the dblclick event fired by the disabled and reference line occurrences.
     * Dispatch a privatedisableddblclick event.
     *
     * @param {Event} event
     */
    handleDisabledContextMenu(event) {
        event.preventDefault();

        const customEvent = new CustomEvent('privatedisabledcontextmenu');
        customEvent.clientX = event.clientX;
        customEvent.clientY = event.clientY;

        /**
         * The event fired when the user opens the context menu of a disabled or reference line occurrence.
         *
         * @event
         * @name privatedisabledcontextmenu
         * @param {number} x Horizontal position of the occurrence.
         * @param {number} y Vertical position of the occurrence.
         */
        this.dispatchEvent(customEvent);
    }

    /**
     * Handle the dblclick event fired by the disabled and reference line occurrences.
     * Dispatch a privatedisableddblclick event.
     *
     * @param {Event} event
     */
    handleDisabledDoubleClick(event) {
        const customEvent = new CustomEvent('privatedisableddblclick');
        customEvent.clientX = event.clientX;
        customEvent.clientY = event.clientY;

        /**
         * The event fired when the user double-clicks on a disabled or reference line occurrence.
         *
         * @event
         * @name privatedisableddblclick
         * @param {number} x Horizontal position of the occurrence.
         * @param {number} y Vertical position of the occurrence.
         */
        this.dispatchEvent(customEvent);
    }

    /**
     * Handle the mousedown event fired by disabled and reference line occurrences.
     * Dispatch a privatedisabledmousedown event.
     *
     * @param {Event} event
     */
    handleDisabledMouseDown(event) {
        if (event.button !== 0) return;

        /**
         * The event fired when the mouse is pressed on a disabled or reference line occurrence.
         *
         * @event
         * @name privatedisabledmousedown
         * @param {number} x Horizontal position of the occurrence.
         * @param {number} y Vertical position of the occurrence.
         */
        this.dispatchEvent(
            new CustomEvent('privatedisabledmousedown', {
                detail: {
                    x: event.clientX,
                    y: event.clientY
                }
            })
        );
    }

    /**
     * Handle the dblclick event fired by the occurrence if it is not disabled.
     * Dispatch a privatedblclick event.
     *
     * @param {Event} event
     */
    handleDoubleClick(event) {
        /**
         * The event fired when the user double-clicks on the occurrence, if it is not disabled.
         *
         * @event
         * @name privatedblclick
         * @param {string} eventName Name of the event this occurrence belongs to.
         * @param {string} key Key of this occurrence.
         * @param {number} x Horizontal position of the occurrence.
         * @param {number} y Vertical position of the occurrence.
         */
        this.dispatchCustomEvent('privatedblclick', event);
    }

    /**
     * Handle the focus event fired by the occurrence if it is not disabled.
     * Dispatch a privatefocus event.
     *
     * @param {Event} event
     */
    handleFocus(event) {
        this._focused = true;

        /**
         * The event fired when the occurrence is focused, if it is not disabled.
         *
         * @event
         * @name privatefocus
         * @param {string} eventName Name of the event this occurrence belongs to.
         * @param {string} key Key of this occurrence.
         * @param {number} x Horizontal position of the occurrence.
         * @param {number} y Vertical position of the occurrence.
         */
        this.dispatchCustomEvent('privatefocus', event);
    }

    /**
     * Handle the mouseclick event fired by the occurrence.
     * Dispatch a privatemouseclick event.
     *
     * @param {Event} event
     */
    handleMouseClick(event) {
        if (event.button !== 0) return;

        const resize = event.target.dataset.resize;

        /**
         * The event fired when the mouse is pressed on the occurrence.
         *
         * @event
         * @name privatemouseclick
         * @param {string} eventName Name of the event this occurrence belongs to.
         * @param {string} key Key of this occurrence.
         * @param {number} x Horizontal position of the occurrence.
         * @param {number} y Vertical position of the occurrence.
         */
        this.dispatchEvent(
            new CustomEvent('privatemouseclick', {
                detail: {
                    eventName: this.eventName,
                    key: this.occurrenceKey,
                    from: this.from,
                    x: event.clientX,
                    y: event.clientY,
                    side: resize
                }
            })
        );
    }

    /**
     * Handle the mousedown event fired by the occurrence if it is not disabled.
     * Dispatch a privatemousedown event.
     *
     * @param {Event} event
     */
    handleMouseDown(event) {
        if (
            event.button !== 0 ||
            this.readOnly ||
            this.hiddenActions.includes(DEFAULT_ACTION_NAMES.edit)
        )
            return;

        const resize = event.target.dataset.resize;

        /**
         * The event fired when the mouse is pressed on the occurrence, if it is not disabled.
         *
         * @event
         * @name privatemousedown
         * @param {string} eventName Name of the event this occurrence belongs to.
         * @param {string} key Key of this occurrence.
         * @param {number} x Horizontal position of the occurrence.
         * @param {number} y Vertical position of the occurrence.
         */
        this.dispatchEvent(
            new CustomEvent('privatemousedown', {
                detail: {
                    eventName: this.eventName,
                    key: this.occurrenceKey,
                    from: this.from,
                    x: event.clientX,
                    y: event.clientY,
                    side: resize
                }
            })
        );
    }

    /**
     * Handle the mouseenter event fired by the occurrence if it is not disabled.
     * Dispatch a privatemouseenter event.
     *
     * @param {Event} event
     */
    handleMouseEnter(event) {
        /**
         * The event fired when the mouse enters the occurrence, if it is not disabled.
         *
         * @event
         * @name privatemouseenter
         * @param {string} eventName Name of the event this occurrence belongs to.
         * @param {string} key Key of this occurrence.
         * @param {number} x Horizontal position of the occurrence.
         * @param {number} y Vertical position of the occurrence.
         */
        this.dispatchCustomEvent('privatemouseenter', event);
    }

    /**
     * Handle the mouseleave event fired by the occurrence if it is not disabled.
     * Dispatch a privatemouseleave event.
     *
     * @param {Event} event
     */
    handleMouseLeave(event) {
        /**
         * The event fired when the mouse leaves the occurrence, if it is not disabled.
         *
         * @event
         * @name privatemouseleave
         * @param {string} eventName Name of the event this occurrence belongs to.
         * @param {string} key Key of this occurrence.
         * @param {number} x Horizontal position of the occurrence.
         * @param {number} y Vertical position of the occurrence.
         */
        this.dispatchCustomEvent('privatemouseleave', event);
    }

    /**
     * Dispatch a custom event. The name of the event to dispatch is given as a parameter.
     *
     * @param {string} name
     * @param {Event} event
     */
    dispatchCustomEvent(name, event) {
        const x =
            event.clientX || event.currentTarget.getBoundingClientRect().x;
        const y =
            event.clientY || event.currentTarget.getBoundingClientRect().bottom;

        this.dispatchEvent(
            new CustomEvent(name, {
                detail: {
                    eventName: this.eventName,
                    key: this.occurrenceKey,
                    from: this.from,
                    to: this.to,
                    x,
                    y
                }
            })
        );
    }
}
