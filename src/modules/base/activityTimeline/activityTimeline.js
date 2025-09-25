import { DateTime } from 'c/dateTimeUtils';
import { AvonniResizeObserver } from 'c/resizeObserver';
import {
    classSet,
    deepCopy,
    generateUUID,
    normalizeArray,
    normalizeBoolean,
    normalizeObject,
    normalizeString
} from 'c/utils';
import { LightningElement, api, track } from 'lwc';
import { HorizontalActivityTimeline } from './horizontalActivityTimeline';
import horizontalTimeline from './horizontalActivityTimeline.html';
import verticalTimeline from './verticalActivityTimeline.html';
import { keyValues } from 'c/utilsPrivate';

const BUTTON_ICON_POSITIONS = { valid: ['left', 'right'], default: 'left' };

const BUTTON_VARIANTS = {
    valid: [
        'neutral',
        'base',
        'brand',
        'brand-outline',
        'destructive',
        'destructive-text',
        'inverse',
        'success'
    ],
    default: 'neutral'
};

const COLUMNS = { valid: [1, 2, 3, 4, 6, 12], default: 1 };

const DEFAULT_BUTTON_SHOW_MORE_LABEL = 'Show more';
const DEFAULT_BUTTON_SHOW_LESS_LABEL = 'Show less';
const DEFAULT_FIELD_COLUMNS = {
    default: 12,
    small: 12,
    medium: 6,
    large: 4
};
const DEFAULT_HORIZONTAL_FIELD_VARIANT = 'label-inline';
const DEFAULT_ITEM_DATE_FORMAT = 'LLLL dd, yyyy, t';
const DEFAULT_ITEM_ICON_SIZE = 'small';
const DEFAULT_INTERVAL_DAYS_LENGTH = 15;
const DEFAULT_LOAD_MORE_OFFSET = 20;
const DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT = 'Loading...';
const DEFAULT_LOCALE = 'en-GB';
const DEFAULT_MAX_VISIBLE_ITEMS_HORIZONTAL = 10;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}/;

const FIELD_VARIANTS = {
    valid: ['standard', 'label-hidden', 'label-inline', 'label-stacked']
};

const GROUP_BY_OPTIONS = {
    valid: ['day', 'week', 'month', 'year'],
    default: undefined
};

const ICON_SIZES = {
    valid: ['xx-small', 'x-small', 'small', 'medium', 'large'],
    default: 'medium'
};

const ORIENTATIONS = {
    valid: ['vertical', 'horizontal'],
    default: 'vertical'
};

const SORTED_DIRECTIONS = {
    valid: ['asc', 'desc'],
    default: 'desc'
};

/**
 * @class
 * @descriptor avonni-activity-timeline
 * @storyId example-activity-timeline--base
 * @public
 */
export default class ActivityTimeline extends LightningElement {
    /**
     * The Lightning Design System name of the icon displayed in the header, before the title. Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
     * When omitted, a simplified timeline bullet replaces it.
     *
     * @public
     * @type {string}
     */
    @api iconName;
    /**
     * The Lightning Design System name of the show less button icon. Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed. This attribute is only supported for the vertical orientation.
     * @type {string}
     * @public
     */
    @api buttonShowLessIconName;
    /**
     * Label of the button that appears when all items are displayed and max-visible-items value is set. This attribute is only supported for the vertical orientation.
     * @type {string}
     * @default Show less
     * @public
     */
    @api buttonShowLessLabel = DEFAULT_BUTTON_SHOW_LESS_LABEL;
    /**
     * The Lightning Design System name of the show more button icon. Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed. This attribute is only supported for the vertical orientation.
     * @type {string}
     * @public
     */
    @api buttonShowMoreIconName;
    /**
     * Label of the button that appears when the number of item exceeds the max-visible-items number. This attribute is only supported for the vertical orientation.
     * @type {string}
     * @default Show more
     * @public
     */
    @api buttonShowMoreLabel = DEFAULT_BUTTON_SHOW_MORE_LABEL;
    /**
     * The alternative text of the loading state. This attribute is only supported for the vertical orientation.
     * @type {string}
     * @default Loading...
     * @public
     */
    @api loadingStateAlternativeText = DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT;
    /**
     * Time zone used, in a valid IANA format. If empty, the browser's time zone is used.
     *
     * @type {string}
     * @public
     */
    @api timezone;
    /**
     * Title of the timeline, displayed in the header.
     *
     * @public
     * @type {string}
     */
    @api title;

    _actions = [];
    _buttonShowLessIconPosition = BUTTON_ICON_POSITIONS.default;
    _buttonShowMoreIconPosition = BUTTON_ICON_POSITIONS.default;
    _buttonVariant = BUTTON_VARIANTS.default;
    _closed = false;
    _collapsible = false;
    _disableUpcomingGroup = false;
    _enableInfiniteLoading = false;
    _fieldAttributes = {
        cols: DEFAULT_FIELD_COLUMNS.default,
        largeContainerCols: DEFAULT_FIELD_COLUMNS.large,
        mediumContainerCols: DEFAULT_FIELD_COLUMNS.medium,
        smallContainerCols: DEFAULT_FIELD_COLUMNS.small,
        variant: null
    };
    _groupBy = GROUP_BY_OPTIONS.default;
    _hideItemDate = false;
    _hideVerticalBar = false;
    _iconSize = ICON_SIZES.default;
    _intervalDaysLength = DEFAULT_INTERVAL_DAYS_LENGTH;
    _isLoading = false;
    _itemDateFormat = DEFAULT_ITEM_DATE_FORMAT;
    _itemIconSize = DEFAULT_ITEM_ICON_SIZE;
    _items = [];
    _loadMoreOffset = DEFAULT_LOAD_MORE_OFFSET;
    _locale = DEFAULT_LOCALE;
    _maxVisibleItems;
    _orientation = ORIENTATIONS.default;
    _sortedDirection = SORTED_DIRECTIONS.default;

    _redrawHorizontalTimeline = true;

    // Horizontal Activity Timeline
    _resizeObserver;
    intervalMaxDate;
    intervalMinDate;
    showItemPopOver = false;
    selectedItem;
    horizontalTimeline;

    _hasHiddenItems = true;
    _key;
    _isConnected = false;
    _presentDates = [];
    _pastDates = [];
    _upcomingDates = [];

    computedItems = [];
    @track orderedDates = [];

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this._isConnected = true;
        this.initActivityTimeline();

        if (this.isTimelineHorizontal) {
            this.initHorizontalTimeline();

            window.addEventListener(
                'keydown',
                this.handleHorizontalTimelineKeyDown
            );
        }
    }

    renderedCallback() {
        if (this.isTimelineHorizontal) {
            this.renderedCallbackHorizontalTimeline();
        }

        // Check if the end of the timeline has been reached
        this.handleScroll();
    }

    renderedCallbackHorizontalTimeline() {
        if (!this._resizeObserver) {
            this._resizeObserver = this.initResizeObserver();
        }

        if (!this.horizontalTimeline) {
            this.initHorizontalTimeline();
        }

        if (this._redrawHorizontalTimeline) {
            this.horizontalTimeline.createHorizontalActivityTimeline(
                this.sortedItems,
                this._maxVisibleItems,
                this.divHorizontalTimeline?.clientWidth,
                this._intervalDaysLength
            );
            this._redrawHorizontalTimeline = false;
        }

        this.updateHorizontalTimelineHeader();

        if (
            this.showItemPopOver &&
            !this.horizontalTimeline._isTimelineMoving
        ) {
            this.horizontalTimeline.initItemPopover(this.selectedItem);
        }
    }

    render() {
        if (this.isTimelineHorizontal) {
            return horizontalTimeline;
        }
        return verticalTimeline;
    }

    disconnectedCallback() {
        window.removeEventListener(
            'keydown',
            this.handleHorizontalTimelineKeyDown
        );
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Array of action objects. The actions are displayed at the top right of each item. This attribute is only supported for the vertical orientation.
     *
     * @public
     * @type {object[]}
     */
    @api
    get actions() {
        return this._actions;
    }
    set actions(value) {
        this._actions = normalizeArray(value);
    }

    /**
     * Position of the show less button's icon. Valid values include left and right. This attribute is only supported for the vertical orientation.
     * @type {string}
     * @default left
     * @public
     */
    @api
    get buttonShowLessIconPosition() {
        return this._buttonShowLessIconPosition;
    }
    set buttonShowLessIconPosition(value) {
        this._buttonShowLessIconPosition = normalizeString(value, {
            fallbackValue: BUTTON_ICON_POSITIONS.default,
            validValues: BUTTON_ICON_POSITIONS.valid
        });
    }

    /**
     * Position of the show more button's icon. Valid values include left and right. This attribute is only supported for the vertical orientation.
     * @type {string}
     * @default left
     * @public
     */
    @api
    get buttonShowMoreIconPosition() {
        return this._buttonShowMoreIconPosition;
    }
    set buttonShowMoreIconPosition(value) {
        this._buttonShowMoreIconPosition = normalizeString(value, {
            fallbackValue: BUTTON_ICON_POSITIONS.default,
            validValues: BUTTON_ICON_POSITIONS.valid
        });
    }

    /**
     * Variant of the button that appears when the number of items exceeds the `max-visible-items` number. This attribute is only supported for the vertical orientation.
     * @type {string}
     * @default neutral
     * @public
     */
    @api
    get buttonVariant() {
        return this._buttonVariant;
    }
    set buttonVariant(value) {
        this._buttonVariant = normalizeString(value, {
            fallbackValue: BUTTON_VARIANTS.default,
            validValues: BUTTON_VARIANTS.valid
        });
    }

    /**
     * If present, the group sections are closed by default. This attribute is only supported for the vertical orientation.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get closed() {
        return this._closed;
    }
    set closed(value) {
        this._closed = normalizeBoolean(value);
    }

    /**
     * If present, the section is collapsible and the collapse icon is visible. This attribute is only supported for the vertical orientation with grouped items.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get collapsible() {
        return this._collapsible;
    }
    set collapsible(value) {
        this._collapsible = normalizeBoolean(value);
    }

    /**
     * If present, future events are not grouped as 'upcoming' event. This attribute is only supported for the vertical orientation with grouped items.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get disableUpcomingGroup() {
        return this._disableUpcomingGroup;
    }
    set disableUpcomingGroup(value) {
        this._disableUpcomingGroup = normalizeBoolean(value);
    }

    /**
     * If present, you can load a subset of items and then display more when users scroll to the end of the timeline. Use with the `loadmore` event to retrieve more items.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get enableInfiniteLoading() {
        return this._enableInfiniteLoading;
    }
    set enableInfiniteLoading(value) {
        this._enableInfiniteLoading = normalizeBoolean(value);
        this.handleScroll();
    }

    /**
     * Field attributes: cols, smallContainerCols, mediumContainerCols, largeContainerCols and variant.
     *
     * @type {object}
     * @public
     */
    @api
    get fieldAttributes() {
        return this._fieldAttributes;
    }
    set fieldAttributes(value) {
        const normalizedFieldAttributes = normalizeObject(value);

        const small = this.normalizeFieldColumns(
            normalizedFieldAttributes.smallContainerCols
        );
        const medium = this.normalizeFieldColumns(
            normalizedFieldAttributes.mediumContainerCols
        );
        const large = this.normalizeFieldColumns(
            normalizedFieldAttributes.largeContainerCols
        );
        const defaults = this.normalizeFieldColumns(
            normalizedFieldAttributes.cols
        );

        // Keep same logic as in layoutItem.
        this._fieldAttributes.cols = defaults || DEFAULT_FIELD_COLUMNS.default;
        this._fieldAttributes.smallContainerCols =
            small || defaults || DEFAULT_FIELD_COLUMNS.small;
        this._fieldAttributes.mediumContainerCols =
            medium || small || defaults || DEFAULT_FIELD_COLUMNS.medium;
        this._fieldAttributes.largeContainerCols =
            large || medium || small || defaults || DEFAULT_FIELD_COLUMNS.large;

        this._fieldAttributes.variant = normalizeString(
            normalizedFieldAttributes.variant,
            { validValues: FIELD_VARIANTS.valid }
        );

        this._fieldAttributes = { ...this._fieldAttributes };
    }

    /**
     * If present, the value will define how the items will be grouped. Valid values include week, month or year. This attribute is supported only for the vertical orientation.
     *
     * @public
     * @type {string}
     */
    @api
    get groupBy() {
        return this._groupBy;
    }
    set groupBy(value) {
        this._groupBy = normalizeString(value, {
            fallbackValue: GROUP_BY_OPTIONS.default,
            validValues: GROUP_BY_OPTIONS.valid
        });

        if (this._isConnected) this.initActivityTimeline();
    }

    /**
     * If present, the date of each item is hidden.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get hideItemDate() {
        return this._hideItemDate;
    }
    set hideItemDate(value) {
        this._hideItemDate = normalizeBoolean(value);
    }

    /**
     * If present, the vertical timeline bar is hidden.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get hideVerticalBar() {
        return this._hideVerticalBar;
    }
    set hideVerticalBar(value) {
        this._hideVerticalBar = normalizeBoolean(value);
    }

    /**
     * The size of the title's icon. Valid values are xx-small, x-small, small, medium and large.
     *
     * @public
     * @type {string}
     * @default medium
     */
    @api
    get iconSize() {
        return this._iconSize;
    }
    set iconSize(value) {
        this._iconSize = normalizeString(value, {
            fallbackValue: ICON_SIZES.default,
            validValues: ICON_SIZES.valid
        });
    }

    /**
     * Specifies the number of days to display on the horizontal timeline.
     *
     * @type {number}
     * @default 15
     * @public
     */
    @api
    get intervalDaysLength() {
        return this._intervalDaysLength;
    }
    set intervalDaysLength(value) {
        const number = parseInt(value, 10);
        this._intervalDaysLength =
            !isNaN(number) && number > 0 ? number : undefined;

        if (this.isTimelineHorizontal) {
            this.requestRedrawTimeline();
            setTimeout(() => {
                this.renderedCallback();
            }, 0);
        }
    }

    /**
     * If present, a spinner is shown to indicate that more items are loading This attribute is only supported for the vertical orientation..
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get isLoading() {
        return this._isLoading;
    }
    set isLoading(value) {
        this._isLoading = value;
    }

    /**
     * The date format to use for each item. Valid values include 'STANDARD', 'RELATIVE', the name of the preset or the custom format string.
     * See Luxon's documentation for accepted [presets](https://moment.github.io/luxon/#/formatting?id=presets) and [custom format string tokens](https://moment.github.io/luxon/#/formatting?id=table-of-tokens).
     * If you want to insert text in the label in a custom format string, you need to escape it using single quote.
     * For example, the format of "Jan 14 day shift" would be <code>"LLL dd 'day shift'"</code>.
     *
     * @type {string}
     * @default 'LLLL dd, yyyy, t'
     * @public
     */
    @api
    get itemDateFormat() {
        return this._itemDateFormat;
    }
    set itemDateFormat(value) {
        this._itemDateFormat =
            typeof value === 'string' && (value || DEFAULT_ITEM_DATE_FORMAT);
    }

    /**
     * The size of all the items' icon. Valid values are xx-small, x-small, small, medium and large. This attribute is only supported for the vertical orientation.
     *
     * @public
     * @type {string}
     * @default small
     */
    @api
    get itemIconSize() {
        return this._itemIconSize;
    }
    set itemIconSize(value) {
        this._itemIconSize = normalizeString(value, {
            fallbackValue: DEFAULT_ITEM_ICON_SIZE,
            validValues: ICON_SIZES.valid
        });
    }

    /**
     * Array of item objects.
     *
     * @public
     * @type {object[]}
     */
    @api
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = deepCopy(normalizeArray(value, 'object'));
        if (this._isConnected) {
            this.initActivityTimeline();

            if (this.isTimelineHorizontal) {
                this.requestRedrawTimeline();
                this.renderedCallback();
            }
        }
    }

    /**
     * Determines when to trigger infinite loading based on how many pixels the timeline's scroll position is from the bottom of the timeline.
     *
     * @type {number}
     * @default 20
     * @public
     */
    @api
    get loadMoreOffset() {
        return this._loadMoreOffset;
    }
    set loadMoreOffset(value) {
        this._loadMoreOffset = parseInt(value, 10);
    }

    /**
     * Locale of the current user. The locale is used to format the axis dates in the horizontal orientation.
     *
     * @type {string}
     * @default en-GB
     * @public
     */
    @api
    get locale() {
        return this._locale;
    }
    set locale(value) {
        this._locale = value || DEFAULT_LOCALE;

        if (this.isTimelineHorizontal) {
            this.requestRedrawTimeline();
            this.renderedCallback();
        }
    }

    /**
     * The maximum number of visible items to display
     *
     * @type {number}
     * @public
     */
    @api
    get maxVisibleItems() {
        return this._maxVisibleItems;
    }
    set maxVisibleItems(value) {
        const number = parseInt(value, 10);
        this._maxVisibleItems =
            !isNaN(number) && number > 0 ? number : undefined;

        if (this.isTimelineHorizontal) {
            this.requestRedrawTimeline();
            setTimeout(() => {
                this.renderedCallback();
            }, 0);
        } else {
            this.initActivityTimeline();
        }
    }

    /**
     * Orientation of the activity timeline. Valid values include vertical and horizontal.
     *
     * @public
     * @type {string}
     * @default vertical
     */
    @api
    get orientation() {
        return this._orientation;
    }
    set orientation(value) {
        this._orientation = normalizeString(value, {
            fallbackValue: ORIENTATIONS.default,
            validValues: ORIENTATIONS.valid
        });

        if (this.isTimelineHorizontal) {
            this.requestRedrawTimeline();
            setTimeout(() => {
                this.renderedCallback();
            }, 0);
        }
    }

    /**
     * Specifies the sorting direction. Valid values include asc and desc.
     * This attribute is only supported for the vertical orientation.
     *
     * @public
     * @default desc
     * @type {string}
     */
    @api
    get sortedDirection() {
        return this._sortedDirection;
    }
    set sortedDirection(value) {
        this._sortedDirection = normalizeString(value, {
            fallbackValue: SORTED_DIRECTIONS.default,
            validValues: SORTED_DIRECTIONS.valid
        });

        if (this._isConnected) {
            this.initActivityTimeline();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Computed item date format.
     *
     * @type {string}
     */
    get computedItemDateFormat() {
        return this._hideItemDate ? null : this._itemDateFormat;
    }

    /**
     * Current icon name of the show button (show more or show less)
     * @type {string}
     */
    get currentShowButtonIcon() {
        return this._hasHiddenItems
            ? this.buttonShowMoreIconName
            : this.buttonShowLessIconName;
    }

    /**
     * Current label of the show button (show more or show less)
     * @type {string}
     */
    get currentShowButtonLabel() {
        return this._hasHiddenItems
            ? this.buttonShowMoreLabel
            : this.buttonShowLessLabel;
    }

    /**
     * Current icon position of the show button (show more or show less)
     * @type {string}
     */
    get currentShowButtonPosition() {
        return this._hasHiddenItems
            ? this.buttonShowMoreIconPosition
            : this.buttonShowLessIconPosition;
    }

    /**
     * Select only items in min-max interval for horizontal view of the timeline
     *
     * @type {array}
     */
    get displayedItemsLength() {
        return this.horizontalTimeline && this.horizontalTimeline.displayedItems
            ? this.horizontalTimeline.displayedItems.length
            : 0;
    }

    /**
     * Get the div container of horizontal activity timeline
     *
     * @type {object}
     */
    get divHorizontalTimeline() {
        return this.template.querySelector(
            '[data-element-id="avonni-activity-timeline__horizontal-timeline"]'
        );
    }

    /**
     * Generate unique ID key.
     */
    get generateKey() {
        return generateUUID();
    }

    /**
     * Assign header by title or icon-name.
     *
     * @type {boolean}
     */
    get hasHeader() {
        return this.title || this.iconName;
    }

    /**
     * Compute the field's variant for the horizontal timeline.
     *
     * @type {string}
     */
    get horizontalFieldsVariant() {
        return this.fieldAttributes.variant || DEFAULT_HORIZONTAL_FIELD_VARIANT;
    }

    /*
     * Verify if show button should be hidden or not
     *
     * @type {boolean}
     */
    get isShowButtonHidden() {
        return (
            this.enableInfiniteLoading ||
            !this.maxVisibleItems ||
            this.maxVisibleItems >= this.items.length
        );
    }

    /**
     * Check if timeline's orientation is horizontal
     *
     * @type {boolean}
     */
    get isTimelineHorizontal() {
        return this.orientation === 'horizontal';
    }

    /**
     * Computed CSS classes of the loading spinner.
     *
     * @type {string}
     */
    get loadingSpinnerClass() {
        return classSet({
            'slds-is-relative':
                (this.items.length || !this.isShowButtonHidden) &&
                this.isLoading,
            'avonni-activity-timeline__spinner':
                this.items.length && this.isLoading && this.isShowButtonHidden,
            'slds-p-around_xx-large':
                !this.items.length && this.isLoading && this.isShowButtonHidden,
            'slds-show_inline-block':
                this.isLoading && !this.isShowButtonHidden,
            'slds-m-top_small slds-m-bottom_small slds-m-left_small':
                !this.isShowButtonHidden
        }).toString();
    }

    /**
     * Returns the size of the loading spinner.
     *
     * @type {string}
     */
    get loadingSpinnerSize() {
        return this.isShowButtonHidden ? 'medium' : 'small';
    }

    /**
     * Toggle for grouping dates.
     *
     * @type {boolean}
     */
    get noGroupBy() {
        return !this._groupBy;
    }

    /**
     * Get the size of the popover's icon.
     *
     * @return {string}
     */
    get popoverIconSize() {
        const avatarToDisplay =
            this.selectedItem?.avatar?.src ||
            this.selectedItem?.avatar?.initials ||
            this.selectedItem?.avatar?.fallbackIconName ||
            '';
        if (avatarToDisplay.includes('action:')) {
            return 'x-small';
        }
        return 'medium';
    }

    /**
     * Formatted date with requested format (item-date-format) of popover's item for horizontal activity timeline.
     *
     * @return {string}
     */
    get selectedItemFormattedDate() {
        if (
            !this.selectedItem ||
            !this.selectedItem.datetimeValue ||
            !this.computedItemDateFormat
        ) {
            return '';
        }
        return this.horizontalTimeline.convertDateToFormat(
            this.selectedItem.datetimeValue,
            this.computedItemDateFormat
        );
    }

    /**
     * Returns the sorted items and ungrouped array.
     *
     * @type {array}
     */
    get sortedItems() {
        const items = deepCopy(this.items);
        items.sort((a, b) => {
            const aDate = new Date(a.datetimeValue);
            const bDate = new Date(b.datetimeValue);
            return this.sortedDirection === 'desc'
                ? bDate - aDate
                : aDate - bDate;
        });

        return this._hasHiddenItems &&
            !this.isShowButtonHidden &&
            this.maxVisibleItems &&
            !this.isTimelineHorizontal
            ? items.splice(0, this.maxVisibleItems)
            : items;
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Returns the group label.
     *
     * @param {string} isoDate
     * @param {boolean} isDateOnly
     * @returns {string}
     */
    getGroupLabel(isoDate, isDateOnly) {
        if (!isoDate) {
            return 'Others';
        }

        let today = new Date();
        if (isDateOnly) {
            const todayDateTime = new DateTime(today, this.timezone);
            const { y, mo, d } = todayDateTime.dateParts;
            today = new Date(y, mo - 1, d, 0, 0, -1);
        }

        const date = new Date(isoDate);
        if (this._groupBy && date > today && !this.disableUpcomingGroup) {
            return 'Upcoming';
        }
        switch (this._groupBy) {
            case 'day':
                return `${date.toLocaleString('en-EN', {
                    day: '2-digit',
                    month: 'long'
                })}, ${date.getFullYear().toString()}`;
            case 'month':
                return `${date.toLocaleString('en-EN', {
                    month: 'long'
                })} ${date.getFullYear()}`;
            case 'week':
                return `Week: ${this.getNumberOfWeek(
                    date
                )}, ${date.getFullYear()}`;
            case 'year':
                return date.getFullYear().toString();
            default:
                return '';
        }
    }

    /**
     * Compute Number of the week in the year.
     *
     * @param {Date} date
     * @type {(Date|number)}
     * @returns number
     */
    getNumberOfWeek(date) {
        const today = new Date(date);
        const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
        const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    }

    /**
     * Component initialized states.
     */
    initActivityTimeline() {
        this.orderedDates = [];
        this.computedItems = [];

        const othersGroup = {
            label: 'Others',
            items: []
        };
        const groupMap = new Map();

        this.sortedItems.forEach((item) => {
            const computedItem = deepCopy(item);
            this.supportDeprecatedAttributes(computedItem);

            let date = computedItem.datetimeValue;
            const isDateOnly =
                typeof date === 'string' &&
                date.match(ISO_DATE_PATTERN) &&
                !date.includes('T');
            if (isDateOnly) {
                const dateTime = new DateTime(date, this.timezone);
                date = `${date}T00:00:00${dateTime.tzOffset}`;
                computedItem.datetimeValue = date;
            }

            const label = this.getGroupLabel(date, isDateOnly);
            if (label === 'Others') {
                othersGroup.items.push(computedItem);
            } else {
                if (!groupMap.has(label)) {
                    const newGroup = {
                        label,
                        items: [computedItem]
                    };
                    groupMap.set(label, newGroup);
                    this.orderedDates.push(newGroup);
                } else {
                    groupMap.get(label).items.push(computedItem);
                }
            }
            this.computedItems.push(computedItem);
        });

        if (othersGroup.items.length > 0) {
            this.orderedDates.push(othersGroup);
        }
    }

    /**
     * Initialize horizontal activity timeline.
     */
    initHorizontalTimeline() {
        if (!this._maxVisibleItems) {
            this._maxVisibleItems = DEFAULT_MAX_VISIBLE_ITEMS_HORIZONTAL;
        }
        this.horizontalTimeline = new HorizontalActivityTimeline(
            this,
            this.sortedItems
        );
    }

    /**
     * Initialize the screen resize observer.
     *
     * @returns {AvonniResizeObserver} Resize observer.
     */
    initResizeObserver() {
        if (!this.divHorizontalTimeline) {
            return null;
        }
        return new AvonniResizeObserver(this.divHorizontalTimeline, () => {
            this.requestRedrawTimeline();
            this.renderedCallback();
        });
    }

    /**
     * Only accept predetermined number of columns.
     *
     * @param {number} value
     * @returns {number}
     */
    normalizeColumns(value) {
        const numValue = parseInt(value, 10);
        return !isNaN(numValue) && COLUMNS.valid.includes(numValue)
            ? numValue
            : null;
    }

    /**
     * Inverse logic of number of columns.
     *
     * @param {number} value
     * @returns {number}
     */
    normalizeFieldColumns(value) {
        const normalizedCols = this.normalizeColumns(value);
        return normalizedCols
            ? 12 / Math.pow(2, Math.log2(normalizedCols))
            : null;
    }

    /**
     * Triggers a redraw of horizontal activity timeline.
     */
    requestRedrawTimeline() {
        this._redrawHorizontalTimeline = true;
    }

    /**
     * Make sure the deprecated item attributes are still supported.
     */
    supportDeprecatedAttributes(item) {
        if (item?.iconName && item?.avatar?.fallbackIconName === undefined) {
            item.avatar = {
                ...item.avatar,
                fallbackIconName: item.iconName
            };
            delete item.iconName;
        }
    }

    /**
     * Update horizontal timeline header's value.
     */
    updateHorizontalTimelineHeader() {
        this._intervalDaysLength = this.horizontalTimeline.intervalDaysLength;
        this.intervalMaxDate = this.horizontalTimeline.intervalMaxDate;
        this.intervalMinDate = this.horizontalTimeline.intervalMinDate;
    }

    /*
     * -------------------------------------------------------------
     *  EVENT HANDLERS
     * -------------------------------------------------------------
     */

    /**
     * Handle the click on an action. Dispatch the actionclick event.
     *
     * @param {Event} event
     */
    handleActionClick(event) {
        event.stopPropagation();

        /**
         * The event fired when a user clicks on an action.
         *
         * @event
         * @name actionclick
         * @param {string} name Name of the action clicked.
         * @param {string} targetName Unique name of the item the action belongs to.
         * @param {object[]} fieldData Value of the item's fields.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: !this.isTimelineHorizontal
                    ? event.detail
                    : {
                          name: event.detail.value,
                          targetName: this.selectedItem.name,
                          fieldData: deepCopy(this.selectedItem.fields)
                      }
            })
        );
    }

    /**
     * Prevent anchor tag from navigating when href leads to nothing.
     *
     * @param {Event} event
     */
    handleAnchorTagClick(event) {
        const href = event.currentTarget.href;
        if (
            // eslint-disable-next-line no-script-url
            ['#', 'javascript:void(0)', 'javascript:void(0);'].includes(href)
        ) {
            event.preventDefault();
        }
    }

    /**
     * Handle the click on a button. Dispatch the buttonclick event.
     *
     * @param {Event} event
     */
    handleButtonClick(event) {
        event.stopPropagation();

        /**
         * The event fired when the button in the details section is clicked.
         *
         * @event
         * @name buttonclick
         * @param {string} targetName Unique name of the item the button belongs to.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('buttonclick', {
                detail: {
                    targetName: event.detail.name
                }
            })
        );
    }

    /**
     * Handle the check and uncheck event on an item. Dispatch the check event.
     *
     * @param {Event} event
     */
    handleCheck(event) {
        event.stopPropagation();
        const { checked, name } = event.detail;
        const item = this.items.find((it) => it.name === name);
        if (item) {
            item.checked = checked;
        }

        /**
         * The event fired when an item is checked or unchecked.
         *
         * @event
         * @name check
         * @param {boolean} checked True if the item is checked, false otherwise.
         * @param {string} targetName Unique name of the item.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('check', {
                detail: {
                    checked,
                    targetName: name
                }
            })
        );
    }

    /**
     * Handle the keyboard down events on the horizontal view timeline.
     *
     * @param {Event} event
     */
    handleHorizontalTimelineKeyDown = (event) => {
        if (!this.isTimelineHorizontal || !this.horizontalTimeline) {
            return;
        }

        switch (event.key) {
            case keyValues.left:
                event.preventDefault();
                event.stopPropagation();
                this.horizontalTimeline.handleIntervalKeyboardScrollLeft();
                break;
            case keyValues.right:
                event.preventDefault();
                event.stopPropagation();
                this.horizontalTimeline.handleIntervalKeyboardScrollRight();
                break;
            case '+':
                event.preventDefault();
                event.stopPropagation();
                this.horizontalTimeline.handleIntervalKeyboardZoomIn();
                break;
            case '_':
                event.preventDefault();
                event.stopPropagation();
                this.horizontalTimeline.handleIntervalKeyboardZoomOut();
                break;
            default:
                break;
        }
    };

    /**
     * Handle the click on an item. Dispatch the itemclick event.
     *
     * @param {Event} event
     */
    handleItemClick(event) {
        event.stopPropagation();
        const name = event.detail.name || event.currentTarget.dataset.name;

        /**
         * The event fired when a user clicks on an item.
         *
         * @event
         * @name itemclick
         * @param {string} name Name of the item clicked.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('itemclick', {
                detail: { name }
            })
        );
    }

    /**
     * Handle the mouse over on item for horizontal view timeline.
     */
    handleItemMouseOver(item) {
        this.showItemPopOver = true;
        this.selectedItem = item;
    }

    handlePopoverKeyDown(event) {
        if (event.key === keyValues.escape) {
            event.preventDefault();
            event.stopPropagation();
            this.handleTooltipClose();
        }
    }

    /**
     * Handle a scroll of the vertical timeline.
     */
    handleScroll() {
        const wrapper = this.template.querySelector(
            '[data-element-id="div-timeline-wrapper"]'
        );
        if (!this.enableInfiniteLoading || this.isLoading || !wrapper) {
            return;
        }

        const { scrollTop, scrollHeight, clientHeight } = wrapper;
        const offsetFromBottom = scrollHeight - scrollTop - clientHeight;
        const noScrollBar = scrollTop === 0 && scrollHeight === clientHeight;

        if (offsetFromBottom <= this.loadMoreOffset || noScrollBar) {
            /**
             * The event fired when you scroll to the end of the timeline. This event is fired only if `enable-infinite-loading` is true.
             *
             * @event
             * @name loadmore
             * @public
             */
            this.dispatchEvent(new CustomEvent('loadmore'));
        }
    }

    /*
     * Toggle the show more button
     */
    handleToggleShowMoreButton() {
        /**
         * The event fired when you click on the show more/less button that appears at the end of the vertical timeline, if a `max-visible-items` value is present and `enable-infinite-loading` is not present.
         *
         * @event
         * @name itemsvisibilitytoggle
         * @param {boolean} show True if items are currently hidden and the click was meant to show more of them. False if the click was meant to hide the visible items.
         * @public
         * @cancelable
         */
        const event = new CustomEvent('itemsvisibilitytoggle', {
            detail: { show: this._hasHiddenItems },
            cancelable: true
        });
        this.dispatchEvent(event);

        if (!event.defaultPrevented) {
            this._hasHiddenItems = !this._hasHiddenItems;
            this.initActivityTimeline();
        }
    }

    /**
     * Handle close of item's tooltip for horizontal view timeline.
     */
    handleTooltipClose(event) {
        // To prevent item click event to be dispatch when closing tooltip
        if (event) {
            event.stopPropagation();
        }
        this.showItemPopOver = false;
        this.selectedItem = null;

        if (this.isTimelineHorizontal) {
            this.horizontalTimeline.focusCurrentItem();
        }
    }
}
