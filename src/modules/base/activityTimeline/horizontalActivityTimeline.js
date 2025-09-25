import * as d3 from 'd3';
import { getFormattedDate } from 'c/dateTimeUtils';
import { computeSldsClass, createAvatar } from 'c/iconUtils';
import { keyValues } from 'c/utilsPrivate';

const AXIS_LABEL_WIDTH = 50.05;
const AXIS_TYPE = { timelineAxis: 'timeline-axis', scrollAxis: 'scroll-axis' };
const AVATAR_MARGIN = 6;
const BORDER_OFFSET = 0.5;
const DEFAULT_ICON_CATEGORY = 'standard';
const DEFAULT_ICON_NAME = 'empty';
const DEFAULT_INTERVAL_DAYS_LENGTH = 15;
const DEFAULT_LABEL_FONT_SIZE = 13;
const DEFAULT_NUBBIN_TOP_POSITION_PX = 24;
const DEFAULT_SCROLL_AXIS_TICKS_NUMBER = 12;
const DEFAULT_TIMELINE_AXIS_HEIGHT = 30;
const DEFAULT_TIMELINE_AXIS_OFFSET = 16.5;
const DEFAULT_TIMELINE_AXIS_TICKS_NUMBER = 9;
const DEFAULT_TIMELINE_HEIGHT = 350;
const DEFAULT_TIMELINE_WIDTH = 1300;
const DEFAULT_TOOLTIP_CLASSES =
    'avonni-horizontal-activity-timeline__popover slds-popover slds-popover_large slds-is-absolute slds-p-around_none';
const DISTANCE_BETWEEN_POPOVER_AND_ITEM = 15;
const INTERVAL_DATE_FORMAT = 'dd/MM/yyyy';
const INTERVAL_RECTANGLE_OFFSET_Y = 1.5;
const MAX_LENGTH_TITLE_ITEM = 30;
const MAX_ITEM_LENGTH = 230;
const MIN_INTERVAL_WIDTH = 2;
const RESIZE_CURSOR_CLASS =
    'avonni-activity-timeline__horizontal-timeline-resize-cursor';
const SCROLL_AXIS_RECTANGLES_G_ID =
    'avonni-horizontal-activity-timeline__scroll-axis-rectangles';
const SCROLL_ITEM_RECTANGLE_HEIGHT = 3;
const SCROLL_ITEM_RECTANGLE_WIDTH = 4;
const SCROLL_STEP = 10;
const SPACE_BETWEEN_ICON_AND_TEXT = 5;
const SVG_ICON_SIZE = 25;
const TIMELINE_COLORS = {
    scrollAxisBorder: '#c9c7c5', // $color-gray-6
    scrollAxisItemRect: '#b0adab', // $color-gray-7
    intervalBackground: '#1b96ff', // $color-brand
    intervalBorder: '#0176d3', // $palette-blue-50
    popoverBackground: '#ffffff',
    timelineBorder: '#c9c9c9', // $card-color-border
    axisLabel: '#181818', // $color-text-action-label-active
    itemBorder: '#aacbff', // $palette-blue-80
    itemBackground: '#eef4ff' // $palette-blue-95
};
const VALID_ICON_CATEGORIES = [
    'standard',
    'utility',
    'doctype',
    'action',
    'custom'
];
const Y_GAP_BETWEEN_BORDER_ITEMS_SCROLL = 6;
const Y_GAP_BETWEEN_BORDER_ITEMS_TIMELINE = 45;
const Y_GAP_BETWEEN_ITEMS_SCROLL = 4;
const Y_GAP_BETWEEN_ITEMS_TIMELINE = 28;
const Y_START_POSITION_SCROLL_ITEM = 4;
const Y_START_POSITION_TIMELINE_ITEM = 10;
const ZOOM_STEP = 20;

const BORDER_ITEM_HEIGHT = SVG_ICON_SIZE + AVATAR_MARGIN * 2;

export class HorizontalActivityTimeline {
    // Horizontal view properties
    _changeIntervalSizeMode = false;
    _displayedItems = [];
    _distanceBetweenDragAndMin;
    _intervalDaysLength = DEFAULT_INTERVAL_DAYS_LENGTH;
    _intervalMaxDate;
    _intervalMinDate;
    _isMouseOverOnPopover = false;
    _isResizingInterval = false;
    _isTimelineMoving = false;
    _maxYPositionOfItem = 0;
    _numberOfTimelineAxisTicks = DEFAULT_TIMELINE_AXIS_TICKS_NUMBER;
    _offsetAxis = DEFAULT_TIMELINE_AXIS_OFFSET;
    _timelineAxisHeight = DEFAULT_TIMELINE_AXIS_HEIGHT;
    _timelineHeight = DEFAULT_TIMELINE_HEIGHT;
    _timelineWidth = DEFAULT_TIMELINE_WIDTH;
    _tooltipClosingTimeout = null;

    // To change visible height of timeline
    _maxVisibleItems;
    _timelineHeightDisplayed;

    // D3 selector DOM elements
    _scrollAxisDiv;
    _scrollAxisSVG;
    _timeIntervalSelector;
    _timelineAxisDiv;
    _timelineItemsDiv;
    _timelineSVG;

    _focusedItem;

    constructor(activityTimeline, sortedItems) {
        this.addValidItemsToData(sortedItems);
        this._activityTimeline = activityTimeline;
        this.setDefaultIntervalDates();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Returns the date format for the axis
     *
     * @type {string}
     */
    get axisDateFormat() {
        try {
            const date = new Date(2000, 10, 22);
            const formattedDate = new Intl.DateTimeFormat(
                this._activityTimeline.locale
            ).format(date);

            const year = {
                index: formattedDate.indexOf('2000'),
                format: '%Y'
            };
            const month = {
                index: formattedDate.indexOf('11'),
                format: '%m'
            };
            const day = {
                index: formattedDate.indexOf('22'),
                format: '%d'
            };
            const sortedDateParts = [year, month, day].sort(
                (a, b) => a.index - b.index
            );

            return sortedDateParts.reduce((acc, datePart) => {
                return acc ? `${acc}/${datePart.format}` : datePart.format;
            }, '');
        } catch (e) {
            return '%d/%m/%Y';
        }
    }

    /**
     * Selects only items in min-max interval for horizontal view of the timeline
     *
     * @type {array}
     */
    get displayedItems() {
        if (!this._sortedItems) {
            return [];
        }

        this._displayedItems = this._sortedItems.filter((item) => {
            const date = new Date(item.datetimeValue);
            return (
                date >= this._intervalMinDate && date <= this._intervalMaxDate
            );
        });
        return this._displayedItems;
    }

    /**
     * Selects div container of timeline axis
     */
    get divTimelineAxisSelector() {
        return this._activityTimeline.template.querySelector(
            '[data-element-id="avonni-activity-timeline__horizontal-timeline-axis"]'
        );
    }

    /**
     * Selects div container of timeline
     */
    get divTimelineContainer() {
        return this._activityTimeline.template.querySelector(
            '[data-element-id="avonni-activity-timeline__horizontal-timeline"]'
        );
    }

    /**
     * Selects div container of timeline header
     */
    get divTimelineHeader() {
        return this._activityTimeline.template.querySelector(
            '[data-element-id="avonni-activity-horizontal-timeline-header"]'
        );
    }

    /**
     * Selects div container of timeline items
     */
    get divTimelineItemsSelector() {
        return this._activityTimeline.template.querySelector(
            '[data-element-id="avonni-activity-timeline__horizontal-timeline-items"]'
        );
    }

    /**
     * Selects div of the scroll container for timeline
     */
    get divTimelineScroll() {
        return this._activityTimeline.template.querySelector(
            '[data-element-id="avonni-activity-timeline__horizontal-timeline-scrolling-container"]'
        );
    }

    /**
     * Selects the div container of the scroll axis
     */
    get divTimelineScrollAxisSelector() {
        return this._activityTimeline.template.querySelector(
            '[data-element-id="avonni-activity-timeline__horizontal-timeline-scroll-axis"]'
        );
    }

    /**
     * Returns the number of days in the interval for the horizontal timeline
     *
     * @type {number}
     */
    get intervalDaysLength() {
        return this._intervalDaysLength;
    }

    /**
     * Returns the max date for the horizontal timeline with the correct format
     *
     * @type {Date}
     */
    get intervalMaxDate() {
        if (!this._isResizingInterval) {
            this.setIntervalMaxDate();
        }
        return this.convertDateToFormat(
            this._intervalMaxDate,
            INTERVAL_DATE_FORMAT
        );
    }

    /**
     * Returns the min date for the horizontal timeline with the correct format
     *
     * @type {Date}
     */
    get intervalMinDate() {
        return this.convertDateToFormat(
            this._intervalMinDate,
            INTERVAL_DATE_FORMAT
        );
    }

    /**
     * Calculates the width of the time interval
     *
     * @type {number}
     */
    get intervalWidth() {
        return Math.abs(
            this.scrollTimeScale(new Date(this._intervalMaxDate)) -
                this.scrollTimeScale(new Date(this._intervalMinDate))
        );
    }

    /**
     * Checks if there is no data to display.
     *
     * @type {boolean}
     */
    get isTimelineEmpty() {
        return !this._sortedItems.length;
    }

    /**
     * Selects the popover created when mouse is over an item
     */
    get itemPopoverSelector() {
        return this._activityTimeline.template.querySelector(
            '[data-element-id="avonni-horizontal-activity-timeline__item-popover"]'
        );
    }

    /**
     * Finds the max date in items
     *
     * @type {Date}
     */
    get maxDate() {
        if (this.isTimelineEmpty) {
            return this.findNextDate(
                new Date(),
                2 * DEFAULT_INTERVAL_DAYS_LENGTH
            );
        }

        const maxIndex =
            this._activityTimeline._sortedDirection === 'desc'
                ? 0
                : this._sortedItems.length - 1;
        return new Date(this._sortedItems[maxIndex].datetimeValue);
    }

    /**
     * Finds the min date in items
     *
     * @type {Date}
     */
    get minDate() {
        if (this.isTimelineEmpty) {
            return new Date();
        }

        const minIndex =
            this._activityTimeline._sortedDirection === 'desc'
                ? this._sortedItems.length - 1
                : 0;
        return new Date(this._sortedItems[minIndex].datetimeValue);
    }

    /**
     * Calculates the minimum interval width. If the distance for one day is bigger than minimum width, we take this distance.
     * If not, we calculate to find the number of days necessary to obtain the minimum.
     *
     * @type {number}
     */
    get minIntervalWidth() {
        const beginningOfDayPosition = this.findBeginningOfDayPosition(
            this.scrollTimeScale(this._intervalMinDate)
        );
        const endOfDayPosition = this.findEndOfDayPosition(
            this.scrollTimeScale(this._intervalMinDate)
        );
        const distanceForOneDay = Math.abs(
            endOfDayPosition - beginningOfDayPosition
        );

        // To make sure there is minimum distance respected
        if (distanceForOneDay < MIN_INTERVAL_WIDTH) {
            const numberOfDays = Math.floor(
                MIN_INTERVAL_WIDTH / distanceForOneDay
            );
            return numberOfDays * distanceForOneDay;
        }

        return distanceForOneDay;
    }

    /**
     * Left position offset of scroll axis element.
     */
    get scrollAxisLeftPosition() {
        return this.scrollAxisRectangle.getBoundingClientRect().left;
    }

    /**
     * Finds the max date displayed in the scroll axis
     */
    get scrollAxisMaxDate() {
        return this.findNextDate(this.maxDate, 15).setHours(23, 59, 59, 999);
    }

    /**
     * Finds the min date displayed in the scroll axis
     */
    get scrollAxisMinDate() {
        return this.findNextDate(this.minDate, -15).setHours(0, 0, 0, 0);
    }

    /**
     * Selects the scroll axis rectangle element.
     */
    get scrollAxisRectangle() {
        return this._activityTimeline.template.querySelector(
            '[data-element-id="avonni-horizontal-activity-timeline__scroll-axis-rectangle"]'
        );
    }

    /**
     * Calculates the time scale for the horizontal activity timeline's time scroll axis.
     * If we pass a date, it returns the corresponding x value. If we use invert, we can pass an x value to return date.
     */
    get scrollTimeScale() {
        return d3
            .scaleTime()
            .domain([this.scrollAxisMinDate, this.scrollAxisMaxDate])
            .range([this._offsetAxis, this._timelineWidth]);
    }

    /**
     * Gets tooltip offset if nubbin is at top position (header is present)
     *
     * @return {number}
     */
    get tooltipNubbinTopOffset() {
        let nubbinTopOffset = DEFAULT_NUBBIN_TOP_POSITION_PX;
        const popoverHeader = this._activityTimeline.template.querySelector(
            '[data-element-id="avonni-horizontal-activity-timeline__popover-header"]'
        );

        if (popoverHeader) {
            nubbinTopOffset = popoverHeader.getBoundingClientRect().height / 2;
        }

        return nubbinTopOffset;
    }

    /**
     * Calculates the time scale for the horizontal activity timeline's time axis.
     * If we pass a date, it returns the corresponding x value. If we use invert, we can pass an x value to return date.
     */
    get viewTimeScale() {
        return d3
            .scaleTime()
            .domain([
                this.findNextDate(this._intervalMinDate, -1),
                this.findNextDate(this._intervalMaxDate, 1)
            ])
            .range([0, this._timelineWidth]);
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Adds rectangles at correct dates to scroll axis to represent items
     */
    addItemsToScrollAxis() {
        // To find y position of all items
        let itemsToDisplay = this.setYPositionOfItems(
            this._sortedItems,
            Y_START_POSITION_SCROLL_ITEM,
            Y_GAP_BETWEEN_ITEMS_SCROLL,
            Y_GAP_BETWEEN_BORDER_ITEMS_SCROLL
        );

        // To remove all items that exceed the scroll axis
        itemsToDisplay = itemsToDisplay.filter(
            (item) => item.yPosition < DEFAULT_TIMELINE_AXIS_HEIGHT
        );

        // Select or create rectangles container
        let rectanglesContainer = this._scrollAxisSVG.select(
            '#' + SCROLL_AXIS_RECTANGLES_G_ID
        );
        if (!rectanglesContainer.node()) {
            rectanglesContainer = this._scrollAxisSVG
                .append('g')
                .attr('id', SCROLL_AXIS_RECTANGLES_G_ID);
        }

        // Draw rectangle for each item
        rectanglesContainer
            .selectAll('rect')
            .data(itemsToDisplay)
            .enter()
            .append('rect')
            .attr('x', (item) =>
                this.scrollTimeScale(new Date(item.datetimeValue))
            )
            .attr('y', (item) => item.yPosition)
            .attr('width', SCROLL_ITEM_RECTANGLE_WIDTH)
            .attr('height', SCROLL_ITEM_RECTANGLE_HEIGHT)
            .attr('fill', TIMELINE_COLORS.scrollAxisItemRect);
    }

    /**
     * Adds all items in activity timeline.
     */
    addItemsToTimeline(dataToDisplay) {
        if (dataToDisplay) {
            dataToDisplay.forEach((item) => {
                const itemGroup = this._timelineSVG
                    .append('g')
                    .attr('id', 'timeline-item-' + item.name)
                    .attr('class', 'avonni-horizontal-activity-timeline__item')
                    .attr('data-name', item.name)
                    .attr('tabindex', 0);

                this.createItem(itemGroup, item);

                itemGroup
                    .style('cursor', 'default')
                    .on('blur', this.handleMouseOutOnItem.bind(this))
                    .on('click', this._activityTimeline.handleItemClick)
                    .on('keydown', this.handleKeyDownOnItem.bind(this, item))
                    .on(
                        'mouseenter',
                        this.handleMouseOverOnItem.bind(this, item)
                    )
                    .on('mouseleave', this.handleMouseOutOnItem.bind(this));
            });
        }
    }

    /**
     * Adds time interval rectangle to scroll axis to allow user to scroll across all dates
     */
    addTimeIntervalToScrollAxis() {
        // Create group with rectangle and two lines
        const intervalGroup = this._scrollAxisSVG
            .append('g')
            .attr(
                'data-element-id',
                'avonni-horizontal-activity-timeline__interval-group'
            )
            .on('mouseover', this.handleMouseOverOnInterval.bind(this))
            .on('mouseout', this.cancelEditIntervalSizeMode.bind(this));

        // Create the interval rectangle
        this._timeIntervalSelector = intervalGroup
            .append('rect')
            .attr(
                'data-element-id',
                'avonni-horizontal-activity-timeline__time-interval-rectangle'
            )
            .attr('x', this.scrollTimeScale(new Date(this._intervalMinDate)))
            .attr('y', INTERVAL_RECTANGLE_OFFSET_Y)
            .attr('width', this.intervalWidth)
            .attr('height', this._timelineAxisHeight - 2 * BORDER_OFFSET)
            .attr('opacity', 0.15)
            .attr('fill', TIMELINE_COLORS.intervalBackground)
            .call(
                d3
                    .drag()
                    .on('start', this.handleTimeIntervalDragStart.bind(this))
                    .on('drag', this.handleTimeIntervalDrag.bind(this))
                    .on('end', () => {
                        this._isTimelineMoving = false;
                    })
            );

        // Create left and right lines to change width of interval
        this.createIntervalBounds(intervalGroup);
    }

    /**
     * Adds only items with valid date to sortedItems.
     */
    addValidItemsToData(sortedItems) {
        this._sortedItems = [];

        if (sortedItems) {
            sortedItems.forEach((item) => {
                if (!this.isDateInvalid(item.datetimeValue)) {
                    this._sortedItems.push(item);
                }
            });
        }
    }

    /**
     * Calculates the numbers of days between the min and max dates in items
     *
     * @type {number}
     */
    calculateDaysBetweenDates(minDate, maxDate) {
        const conversionFactorFromMillisecondToDay = 1000 * 3600 * 24;
        return Math.ceil(
            (new Date(maxDate).getTime() - new Date(minDate).getTime()) /
                conversionFactorFromMillisecondToDay
        );
    }

    /**
     * Calculates the space between ticks of an axis.
     *
     * @return {number}
     */
    calculateSpaceBetweenTicks(axisTicksSelector) {
        // Get all ticks and extract translate X value
        const ticksXPositions = [];
        let containTextAnchorStart = false;
        for (const tick of axisTicksSelector) {
            if (
                d3.select(tick).select('text').style('text-anchor') === 'start'
            ) {
                containTextAnchorStart = true;
            }
            ticksXPositions.push(
                this.getXTranslateValue(d3.select(tick).attr('transform'))
            );
        }

        if (ticksXPositions.length <= 1) {
            return AXIS_LABEL_WIDTH;
        }

        let minDistanceBetweenTicks;
        for (let i = 1; i < ticksXPositions.length; ++i) {
            if (containTextAnchorStart && i === 1) {
                ticksXPositions[i] -= AXIS_LABEL_WIDTH / 4;
            }
            const ticksDistance =
                ticksXPositions[i] - ticksXPositions[i - 1] - AXIS_LABEL_WIDTH;
            if (
                !minDistanceBetweenTicks ||
                ticksDistance < minDistanceBetweenTicks
            ) {
                minDistanceBetweenTicks = ticksDistance;
            }
        }
        return minDistanceBetweenTicks;
    }

    /**
     * Cancels edit mode of the size of interval on scroll axis. Lines are removed.
     */
    cancelEditIntervalSizeMode() {
        if (!this._isResizingInterval) {
            this._changeIntervalSizeMode = false;
            this.setIntervalBoundsState();
        }
    }

    /**
     * Checks if there is enough space to display popover on left side.
     *
     * @return {boolean}
     */
    canPopoverBeOnLeft(xPosition, popoverWidth) {
        const maxVisiblePosition = this._timelineWidth - popoverWidth;
        return xPosition < maxVisiblePosition;
    }

    /**
     * Checks if there is enough space to display popover on right side.
     *
     * @return {boolean}
     */
    canPopoverBeOnRight(xPosition) {
        return xPosition > 0;
    }

    /**
     * Clears active timeout to close item's tooltip.
     */
    clearPreviousTooltipClosingTimeout() {
        if (this._tooltipClosingTimeout) {
            clearTimeout(this._tooltipClosingTimeout);
            this._tooltipClosingTimeout = null;
        }
    }

    /**
     * Returns the height and the width of the bordered item.
     *
     * @return {Object}
     */
    computedBorderItemSize(item) {
        let width = 0;
        let height = 0;
        if (item) {
            height = this.hasBorder(item) ? BORDER_ITEM_HEIGHT : SVG_ICON_SIZE;
            if (item.datetimeValue && item.endDate) {
                width =
                    this.viewTimeScale(new Date(item.endDate)) -
                    this.viewTimeScale(new Date(item.datetimeValue)) -
                    AVATAR_MARGIN;
            }
        }
        return { width, height };
    }

    /**
     * Formats item's title to prevent text longer than 30 characters on horizontal timeline
     * @param {Object} item
     * @returns string
     */
    computedItemTitle(item, maxLength = MAX_LENGTH_TITLE_ITEM) {
        const truncationText = ' ...';
        if (item.title.length > maxLength) {
            const max =
                maxLength > truncationText.length
                    ? maxLength - truncationText.length
                    : 0;
            return item.title.slice(0, max) + truncationText;
        }
        return item.title;
    }

    /**
     * Converts a date to the correct format
     *
     * @param {Date} date
     * @param {string} format
     * @returns string
     */
    convertDateToFormat(date, format) {
        if (this.isDateInvalid(date)) {
            return '';
        }
        return getFormattedDate({
            date,
            timeZone: this._activityTimeline.timezone,
            format
        });
    }

    /**
     * Converts a valid xPosition to a date (timestamp format) based on specific scale.
     *
     * @return {number}
     */
    convertPositionToScaleDate(scale, xPosition) {
        return scale.invert(xPosition).setHours(0, 0, 0, 0);
    }

    /**
     * Removes 'px' from a size attribute (width, height) and converts to number
     *
     * @return {number}
     */
    convertPxSizeToNumber(stringSize) {
        return Number(stringSize.slice(0, stringSize.length - 2));
    }

    /**
     * Converts a value from px to em (16 px = 1.00 em).
     *
     * @return {number}
     */
    convertPxToEm(pxValue) {
        return Number(pxValue) / 16.0;
    }

    /**
     * Creates an axis bottom element using d3 to insert in destinationSVG
     */
    createAxisBottom(scale, axisId, numberOfTicks, destinationSVG) {
        if (numberOfTicks < 1) {
            numberOfTicks = 2;
        }

        const timeAxis = d3
            .axisBottom(scale)
            .tickFormat(d3.timeFormat(this.axisDateFormat))
            .ticks(numberOfTicks)
            .tickSizeOuter(0);

        // TIMELINE AXIS
        if (axisId === AXIS_TYPE.timelineAxis) {
            destinationSVG
                .append('g')
                .attr('id', axisId)
                .attr('transform', 'translate(0, -1.5)')
                .style('color', TIMELINE_COLORS.axisLabel)
                .call(timeAxis);

            this._numberOfTimelineAxisTicks = numberOfTicks;
            // Remove all ticks marks
            destinationSVG.selectAll('.tick').selectAll('line').remove();
        }
        // TIMELINE SCROLL AXIS
        else {
            const yPosition = this._timelineAxisHeight + 1.5 * BORDER_OFFSET;
            destinationSVG
                .append('g')
                .attr('id', axisId)
                .attr('transform', 'translate(0, ' + yPosition + ')')
                .style('color', TIMELINE_COLORS.axisLabel)
                .call(timeAxis);
            this.setFirstAndLastTickLabel();
        }
        destinationSVG.select('.domain').remove();
    }

    /**
     * Creates horizontal view timeline
     */
    createHorizontalActivityTimeline(
        sortedItems,
        maxVisibleItems,
        width,
        intervalDaysLength
    ) {
        this.resetHorizontalTimeline();
        this.addValidItemsToData(sortedItems);
        this._maxVisibleItems = maxVisibleItems;
        this._intervalDaysLength = intervalDaysLength;

        this.setIntervalMaxDate();
        this.setTimelineWidth(width);
        this.createTimelineScrollAxis();
        this.createTimelineAxis();
        this.createTimeline();
        this.initIntervalHorizontalScroll();
    }

    /**
     * Creates svg to display lightning icon.
     */
    createIcon(destinationSVG, avatar, xPosition, yPosition, svgSize) {
        const foreignObjectForIcon = destinationSVG.append('foreignObject');
        foreignObjectForIcon
            .attr('width', svgSize)
            .attr('height', svgSize)
            .attr('x', xPosition)
            .attr('y', yPosition);

        const iconInformation = this.setIconInformation(avatar);
        let propertyName = 'svg';
        if (avatar?.src) {
            propertyName = 'src';
        } else if (avatar?.initials) {
            propertyName = 'initials';
        }
        const iconSVG = createAvatar(
            propertyName,
            iconInformation,
            foreignObjectForIcon,
            this.resetAndRedrawTimeline.bind(this)
        );

        if (iconInformation.category === 'action') {
            this.setActionIconPosition(iconSVG);
        }
    }

    /**
     * Creates the left and right lines on each side of interval rectangle to allow resize.
     */
    createIntervalBounds(intervalGroup) {
        const maxIntervalPosition =
            this._timelineAxisHeight +
            INTERVAL_RECTANGLE_OFFSET_Y -
            2 * BORDER_OFFSET;
        this._leftIntervalLine = intervalGroup
            .append('line')
            .attr(
                'id',
                'avonni-horizontal-activity-timeline__left-interval-line'
            )
            .attr('x1', this.scrollTimeScale(new Date(this._intervalMinDate)))
            .attr('y1', 1.4)
            .attr('x2', this.scrollTimeScale(new Date(this._intervalMinDate)))
            .attr('y2', maxIntervalPosition)
            .call(
                d3
                    .drag()
                    .on('drag', this.handleLowerBoundIntervalDrag.bind(this))
                    .on('end', this.endIntervalResizing.bind(this))
            );

        this._rightIntervalLine = intervalGroup
            .append('line')
            .attr(
                'id',
                'avonni-horizontal-activity-timeline__right-interval-line'
            )
            .attr('x1', this.scrollTimeScale(new Date(this._intervalMaxDate)))
            .attr('y1', 1.4)
            .attr('x2', this.scrollTimeScale(new Date(this._intervalMaxDate)))
            .attr('y2', maxIntervalPosition)
            .call(
                d3
                    .drag()
                    .on('drag', this.handleUpperBoundIntervalDrag.bind(this))
                    .on('end', this.endIntervalResizing.bind(this))
            );

        this.setIntervalBoundsState();
    }

    /**
     * Creates an item on horizontal timeline to display lightning icon and item's title
     */
    createItem(itemGroup, item) {
        const itemX = this.viewTimeScale(new Date(item.datetimeValue));
        const itemY = item.yPosition;
        let contentX = itemX;
        let contentY = itemY;

        let itemRect;
        if (this.hasBorder(item)) {
            contentX += AVATAR_MARGIN;
            contentY += AVATAR_MARGIN;
            itemRect = itemGroup.append('rect');
            itemRect
                .attr(
                    'class',
                    'avonni-horizontal-activity-timeline__item-rectangle'
                )
                .attr('x', itemX)
                .attr('y', itemY)
                .attr('fill', TIMELINE_COLORS.itemBackground)
                .attr('stroke-width', 1)
                .attr('stroke', TIMELINE_COLORS.itemBorder)
                .attr('rx', 2);
        }

        this.createIcon(
            itemGroup,
            item.avatar,
            contentX,
            contentY,
            SVG_ICON_SIZE
        );

        const label = itemGroup.append('text');
        label
            .attr('class', 'avonni-horizontal-activity-timeline__item-text')
            .attr('x', contentX + SVG_ICON_SIZE + SPACE_BETWEEN_ICON_AND_TEXT)
            .attr('y', contentY + 0.64 * SVG_ICON_SIZE)
            .style('font-size', DEFAULT_LABEL_FONT_SIZE);

        let labelMaxLength = MAX_LENGTH_TITLE_ITEM;
        if (itemRect) {
            const { width, height } = this.computedBorderItemSize(item);
            itemRect.attr('width', width).attr('height', height);
            const dx = SVG_ICON_SIZE + SPACE_BETWEEN_ICON_AND_TEXT;
            labelMaxLength =
                width > dx ? ((width - dx) / DEFAULT_LABEL_FONT_SIZE) * 2 : 0;
        }
        label.text(this.computedItemTitle(item, labelMaxLength));
    }

    /**
     * Creates a time axis using d3 with an acceptable distance between ticks to prevent overlap.
     */
    createTimeAxis(scale, axisId, numberOfTicks, destinationSVG) {
        if (
            Math.floor(this._timelineWidth / AXIS_LABEL_WIDTH) <
            numberOfTicks + 2
        ) {
            numberOfTicks = Math.floor(numberOfTicks / 2);
        }
        this.createAxisBottom(scale, axisId, numberOfTicks, destinationSVG);
        let spaceBetweenTicks = this.calculateSpaceBetweenTicks(
            destinationSVG.selectAll('.tick')._groups[0]
        );

        const minDistanceBetweenTicks =
            axisId === AXIS_TYPE.timelineAxis ? 10 : 5;

        // Reduce number of ticks until the space between ticks is acceptable
        while (
            spaceBetweenTicks < minDistanceBetweenTicks &&
            numberOfTicks >= 2
        ) {
            destinationSVG.select('#' + axisId).remove();

            // Lower numberOfTicks to the next even number
            if (numberOfTicks % 2 === 0) {
                numberOfTicks -= 2;
            } else {
                numberOfTicks -= 3;
            }
            this.createAxisBottom(scale, axisId, numberOfTicks, destinationSVG);
            spaceBetweenTicks = this.calculateSpaceBetweenTicks(
                destinationSVG.selectAll('.tick')._groups[0]
            );
        }
    }

    /**
     * Creates horizontal view timeline (top section with items)
     */
    createTimeline() {
        // Calculate each items y position and set timeline height
        const dataToDisplay = this.setYPositionOfItems(
            this.displayedItems,
            Y_START_POSITION_TIMELINE_ITEM,
            Y_GAP_BETWEEN_ITEMS_TIMELINE,
            Y_GAP_BETWEEN_BORDER_ITEMS_TIMELINE
        );

        this.setVisibleTimelineHeight();

        this._timelineHeight = Math.max(
            this._maxYPositionOfItem + 30,
            this._timelineHeightDisplayed
        );

        // Create SVG for timeline
        this._timelineSVG = this._timelineItemsDiv
            .append('svg')
            .attr(
                'data-element-id',
                'avonni-horizontal-activity-timeline__timeline-items-svg'
            )
            .attr('width', this._timelineWidth + 2 * BORDER_OFFSET)
            .attr('height', this._timelineHeight);

        // Create dashed lines aligned to axis ticks
        const axis = d3
            .axisBottom(this.viewTimeScale)
            .tickFormat(d3.timeFormat(this.axisDateFormat))
            .ticks(this._numberOfTimelineAxisTicks)
            .tickSizeInner(this._timelineHeight + this._timelineAxisHeight)
            .tickSizeOuter(0);
        this._timelineSVG
            .append('g')
            .attr('opacity', 0.15)
            .style('stroke-dasharray', '8 8')
            .attr('transform', 'translate(0, -12)')
            .call(axis);

        this.addItemsToTimeline(dataToDisplay);

        // Activate scroll only if needed
        if (this._timelineHeight > this._timelineHeightDisplayed) {
            d3.select(this.divTimelineScroll).style('overflow-y', 'scroll');
        } else {
            d3.select(this.divTimelineScroll).style('overflow-y', 'hidden');
        }
    }

    /**
     * Creates the axis below the horizontal timeline to display the min-max interval
     */
    createTimelineAxis() {
        const axisSVG = this._timelineAxisDiv
            .append('svg')
            .attr(
                'data-element-id',
                'avonni-horizontal-activity-timeline__timeline-axis-svg'
            )
            .attr('width', this._timelineWidth + BORDER_OFFSET)
            .attr('height', 25)
            .attr('transform', 'translate(0 ,0)');

        // Add upper and lower line of timeline axis
        axisSVG
            .append('line')
            .attr('stroke', TIMELINE_COLORS.timelineBorder)
            .attr('stroke-width', 1)
            .attr('x1', 0)
            .attr('y1', BORDER_OFFSET)
            .attr('x2', this._timelineWidth + 2 * BORDER_OFFSET)
            .attr('y2', BORDER_OFFSET);
        axisSVG
            .append('line')
            .attr('stroke', TIMELINE_COLORS.timelineBorder)
            .attr('stroke-width', 1)
            .attr('x1', 0)
            .attr('y1', 21)
            .attr('x2', this._timelineWidth + 2 * BORDER_OFFSET)
            .attr('y2', 21);

        this.createTimeAxis(
            this.viewTimeScale,
            AXIS_TYPE.timelineAxis,
            this._numberOfTimelineAxisTicks,
            axisSVG
        );
    }

    /**
     * Creates the scroll axis for horizontal timeline to display all dates
     */
    createTimelineScrollAxis() {
        this._scrollAxisSVG = this._scrollAxisDiv
            .append('svg')
            .attr(
                'data-element-id',
                'avonni-horizontal-activity-timeline__scroll-axis-svg'
            )
            .attr(
                'width',
                this._timelineWidth + AXIS_LABEL_WIDTH / 3 + 2 * BORDER_OFFSET
            )
            .attr('height', this._timelineAxisHeight * 2)
            .attr('transform', 'translate(-8.75, 5)');

        // Create ticks of scroll axis
        this.createTimeAxis(
            this.scrollTimeScale,
            AXIS_TYPE.scrollAxis,
            DEFAULT_SCROLL_AXIS_TICKS_NUMBER,
            this._scrollAxisSVG
        );

        this.addItemsToScrollAxis();

        // Create the surrounding rectangle of the scroll axis
        this._scrollAxisSVG
            .append('rect')
            .attr(
                'data-element-id',
                'avonni-horizontal-activity-timeline__scroll-axis-rectangle'
            )
            .attr('x', this._offsetAxis)
            .attr('y', 1)
            .attr('width', this._timelineWidth - this._offsetAxis)
            .attr('height', this._timelineAxisHeight)
            .attr('stroke', TIMELINE_COLORS.timelineBorder)
            .attr('fill', 'transparent')
            .on('click', this.handleClickOnScrollAxis.bind(this));

        this.addTimeIntervalToScrollAxis();
    }

    /**
     * Ends the interval resizing mode.
     */
    endIntervalResizing() {
        this._isTimelineMoving = false;
        this._isResizingInterval = false;
        this._changeIntervalSizeMode = false;
        this.setIntervalBoundsState();
    }

    /**
     * Extracts x scroll position of interval from event. The position corresponds to the beginning of the day.
     *
     * @return {number}
     */
    extractScrollXPosition(event) {
        // Horizontal scroll of interval
        const requestedPosition =
            Number(this._timeIntervalSelector.attr('x')) +
            this.normalizeHorizontalScrollDeltaX(event);

        // To set hours at 0,0,0,0 for min date
        return this.findBeginningOfDayPosition(requestedPosition);
    }

    /**
     * Finds the position of the beginning of the day based on scrollTimeScale.
     *
     * @return {number}
     */
    findBeginningOfDayPosition(position) {
        const beginningOfDay = this.convertPositionToScaleDate(
            this.scrollTimeScale,
            position
        );
        return this.scrollTimeScale(beginningOfDay);
    }

    /**
     * Finds the position of the end of the day based on scrollTimeScale.
     *
     * @return {number}
     */
    findEndOfDayPosition(position) {
        const endOfDay = this.scrollTimeScale
            .invert(position)
            .setHours(23, 59, 59, 999);
        return this.scrollTimeScale(endOfDay);
    }

    /**
     * Finds the x end position of an item. This position is used to display popover (left).
     *
     * @return {number}
     */
    findEndPositionOfItem(item) {
        const itemGroup = this._timelineSVG.select(
            '#timeline-item-' + item.name
        );
        const textLength = itemGroup
            .select('text')
            .node()
            .getComputedTextLength();
        const xTextStartPosition = Number(itemGroup.select('text').attr('x'));
        return (
            xTextStartPosition + textLength + DISTANCE_BETWEEN_POPOVER_AND_ITEM
        );
    }

    /**
     * Calculates the date after x days of specific date
     *
     * @return {Date}
     */
    findNextDate(date, dayIncrement) {
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + dayIncrement);
        return nextDate;
    }

    /**
     * Finds the popover's direction by checking which side has more space in timeline.
     *
     * @return {string}
     */
    findPopoverDirectionWithMoreSpace(leftSpaceForPopover) {
        const rightSpaceForPopover = this._timelineWidth - leftSpaceForPopover;
        if (leftSpaceForPopover > rightSpaceForPopover) {
            return 'right';
        }
        return 'left';
    }

    /**
     * Finds the x start position of an item. This position is used to display popover (right).
     *
     * @return {number}
     */
    findStartPositionOfItem(item) {
        const itemGroup = this._timelineSVG.select(
            '#timeline-item-' + item.name
        );
        const xTextStartPosition = Number(itemGroup.select('text').attr('x'));
        return (
            xTextStartPosition -
            SVG_ICON_SIZE -
            SPACE_BETWEEN_ICON_AND_TEXT -
            DISTANCE_BETWEEN_POPOVER_AND_ITEM
        );
    }

    /**
     * Focuses the current item.
     */
    focusCurrentItem() {
        if (this._focusedItem) {
            this._focusedItem.focus();
        }
        this._focusedItem = null;
    }

    /**
     * Finds the right popover nubbin class depending on direction and if fields are displayed.
     *
     * @return {string}
     */
    getPopoverNubbinClass(item, direction) {
        return this.hasPopoverHeader(item)
            ? `slds-nubbin_${direction}-top`
            : `slds-nubbin_${direction}`;
    }

    /**
     * Finds and converts to a number the x value of translate from the value of the transform attribute. The argument should be : translate(x,y)
     *
     * @return {number}
     */
    getXTranslateValue(transformValue) {
        return Number(
            transformValue.slice(
                'translate('.length,
                transformValue.indexOf(',')
            )
        );
    }

    /**
     * Checks if item has border.
     *
     * @return {boolean}
     */
    hasBorder(item) {
        return item.datetimeValue && item.endDate;
    }

    /**
     * Checks if popover has a header.
     *
     * @return {boolean}
     */
    hasPopoverHeader(item) {
        return item.fields || item.description;
    }

    /**
     * Initializes horizontal scroll (wheel event) for interval on timeline's scroll axis.
     *
     */
    initIntervalHorizontalScroll() {
        const timelineDivContainer = d3.select(this.divTimelineContainer);
        timelineDivContainer.on(
            'wheel',
            this.handleWheelOnInterval.bind(this),
            { passive: false }
        );
    }

    /**
     * Initializes item's popover with correct position and classes.
     */
    initItemPopover(element) {
        const tooltipElement = d3.select(this.itemPopoverSelector);

        if (!tooltipElement._groups[0][0]) {
            return;
        }

        // Reset tooltip's classes if nubbin is already present
        if (tooltipElement.attr('class').includes('slds-nubbin')) {
            tooltipElement.attr('class', DEFAULT_TOOLTIP_CLASSES);
        }

        // Set popover position
        const popoverPosition = this.setPopoverPosition(
            tooltipElement,
            element
        );

        tooltipElement
            .style('opacity', 1)
            .style('top', popoverPosition.y + 'px')
            .style('left', popoverPosition.x + 'px')
            .style('background', TIMELINE_COLORS.popoverBackground)
            .classed(
                this.getPopoverNubbinClass(element, popoverPosition.direction),
                true
            )
            .on('mouseenter', this.handleMouseOverOnPopover.bind(this))
            .on('mouseleave', this.handleMouseOutOfPopover.bind(this));
    }

    /**
     * Checks if date is invalid.
     *
     * @return {boolean}
     */
    isDateInvalid(date) {
        return new Date(date).toString() === 'Invalid Date' || !date;
    }

    /**
     * Checks if user is scrolling vertically.
     *
     * @return {boolean}
     */
    isScrollingVerticallyOnTimeline(event) {
        return (
            Math.abs(event.deltaY) > 0 &&
            Math.abs(event.deltaY) > Math.abs(event.deltaX)
        );
    }

    /**
     * Moves interval (drag or scroll) on timeline's scroll axis to new valid position.
     */
    moveIntervalToPosition(position) {
        this._intervalMinDate = this.convertPositionToScaleDate(
            this.scrollTimeScale,
            position
        );
        this.setIntervalMaxDate();

        this._timeIntervalSelector
            .attr('x', position)
            .attr('width', this.intervalWidth)
            .attr('y', INTERVAL_RECTANGLE_OFFSET_Y);

        this.moveTimelineDisplay();
    }

    /**
     * Moves timeline display with the new interval min and max date. The following elements will be updated : timeline (with items),
     * timeline axis (only scale), top header and interval rectangle (on scroll axis) position and bounds (blue lines).
     */
    moveTimelineDisplay() {
        // Set position of interval bounds (blue lines)
        this._leftIntervalLine
            .attr('x1', this.scrollTimeScale(new Date(this._intervalMinDate)))
            .attr('x2', this.scrollTimeScale(new Date(this._intervalMinDate)));

        this._rightIntervalLine
            .attr('x1', this.scrollTimeScale(new Date(this._intervalMaxDate)))
            .attr('x2', this.scrollTimeScale(new Date(this._intervalMaxDate)));

        this.resetAndRedrawTimelineAxis();
        this.resetAndRedrawTimeline();
        this._activityTimeline.updateHorizontalTimelineHeader();
    }

    /**
     * Normalizes deltaX value to reduce speed of horizontal scroll movement.
     */
    normalizeHorizontalScrollDeltaX(event) {
        let factor = event.deltaX;
        if (Math.abs(event.deltaX) > 1000) {
            factor *= 0.3;
        } else if (Math.abs(event.deltaX) > 100) {
            factor *= 0.5;
        } else if (Math.abs(event.deltaX) > 50) {
            factor *= 0.7;
        } else if (Math.abs(event.deltaX) > 25) {
            factor *= 0.8;
        }

        return factor;
    }

    /**
     * Removes all scroll axis rectangles and redraws them with new positions.
     */
    resetAndRedrawScrollAxisRectangle() {
        // Remove all rectangles of scroll axis
        this._scrollAxisSVG
            .select('#' + SCROLL_AXIS_RECTANGLES_G_ID)
            .selectAll('*')
            .remove();

        // Redraw rectangles with new positions
        this.addItemsToScrollAxis();
    }

    /**
     * Removes timeline (section with items) and re-draws it. This method is used to refresh it's not on salesforce and
     * iconLibraries are ready after initial draw.
     */
    resetAndRedrawTimeline() {
        this._maxYPositionOfItem = 0;
        this._timelineItemsDiv = d3.select(this.divTimelineItemsSelector);
        this._timelineItemsDiv.selectAll('*').remove();
        this.createTimeline();
    }

    /**
     * Removes timeline axis and redraws it with new scale.
     */
    resetAndRedrawTimelineAxis() {
        // Select and remove previous timeline axis
        const timelineAxisSVG = d3
            .select(this.divTimelineAxisSelector)
            .select('svg');
        timelineAxisSVG.selectChild('#timeline-axis').remove();

        // Redraw timeline axis
        this.createTimeAxis(
            this.viewTimeScale,
            AXIS_TYPE.timelineAxis,
            this._numberOfTimelineAxisTicks,
            timelineAxisSVG
        );
    }

    /**
     * Selects and removes all elements inside the horizontal timeline to build a new one
     *
     */
    resetHorizontalTimeline() {
        this._maxYPositionOfItem = 0;

        this._timelineItemsDiv = d3.select(this.divTimelineItemsSelector);
        this._timelineItemsDiv.selectAll('*').remove();

        this._timelineAxisDiv = d3.select(this.divTimelineAxisSelector);
        this._timelineAxisDiv.selectAll('*').remove();

        this._scrollAxisDiv = d3.select(this.divTimelineScrollAxisSelector);
        this._scrollAxisDiv.selectAll('*').remove();
    }

    /**
     * For action icon, sets position of icon to center it in container.
     */
    setActionIconPosition(iconSVG) {
        const svgElement = iconSVG.node();
        const parentSpanElement = iconSVG.node().parentElement;

        if (svgElement && parentSpanElement) {
            const iconWidth = svgElement.getBoundingClientRect().width;
            const iconHeight = svgElement.getBoundingClientRect().height;

            const offsetX =
                (parentSpanElement.getBoundingClientRect().width - iconWidth) /
                2;
            const offsetY =
                (parentSpanElement.getBoundingClientRect().height -
                    iconHeight) /
                2;

            iconSVG.attr('transform', `translate(-${offsetX}, -${offsetY})`);
        }
    }

    /**
     * Sets the icon's information (name of the icon, x link href and CSS classes) to default (standard:empty)
     */
    setDefaultIconInformation() {
        return {
            iconName: DEFAULT_ICON_NAME,
            category: DEFAULT_ICON_CATEGORY,
            categoryIconClass: `slds-icon-${DEFAULT_ICON_CATEGORY}-${DEFAULT_ICON_NAME} slds-icon_small`
        };
    }

    /**
     * Sets the interval's min date to the middle datetime value of all items
     */
    setDefaultIntervalDates() {
        if (this.isTimelineEmpty) {
            this._intervalMinDate = this.findNextDate(
                new Date(),
                Math.floor(DEFAULT_INTERVAL_DAYS_LENGTH)
            );
        } else {
            const middleIndex = Math.ceil(this._sortedItems.length / 2 - 1);
            this._intervalMinDate = new Date(
                this._sortedItems[middleIndex].datetimeValue
            );
        }

        this._intervalMinDate.setHours(0, 0, 0, 0);
        this.setIntervalMaxDate();
    }

    /**
     * Changes position of first and last tick label of scroll axis to prevent overflow from timeline.
     */
    setFirstAndLastTickLabel() {
        // Set first tick label position
        const firstTick = this._scrollAxisSVG.select('.tick:first-of-type');
        const distanceFirstTick =
            this.getXTranslateValue(firstTick.attr('transform')) -
            this._offsetAxis * 0.7;
        firstTick
            .select('text')
            .style('text-anchor', 'start')
            .attr(
                'dx',
                '-' + Math.abs(this.convertPxToEm(distanceFirstTick)) + 'em'
            );

        // Set last tick label position
        const lastTick = this._scrollAxisSVG.select('.tick:last-of-type');
        const distanceEndTick =
            this._timelineWidth -
            this.getXTranslateValue(lastTick.attr('transform'));
        if (distanceEndTick < AXIS_LABEL_WIDTH / 2) {
            lastTick
                .select('text')
                .style('text-anchor', 'end')
                .attr(
                    'dx',
                    this.convertPxToEm(distanceEndTick + this._offsetAxis / 2) +
                        'em'
                );
        }
    }

    /**
     * Determines and sets the icon's information (name of the icon, x link href and CSS classes) according to correct category
     */
    setIconInformation(avatar) {
        let iconInformations = {};
        let styleClass = '';

        if (avatar && avatar.fallbackIconName) {
            const iconCategory = VALID_ICON_CATEGORIES.find((category) => {
                return avatar.fallbackIconName.match(category + ':');
            });

            // Invalid icon category - Set default icon
            if (!iconCategory) {
                return this.setDefaultIconInformation();
            }

            // Set icon's information
            let iconClass = '';
            if (iconCategory === 'utility') {
                iconClass = ' slds-icon-text-default ';
            }
            iconClass += 'slds-icon-' + iconCategory + '-';

            const nameOfIcon = avatar.fallbackIconName.slice(
                avatar.fallbackIconName.indexOf(':') + 1,
                avatar.fallbackIconName.length
            );
            iconInformations = {
                iconName: nameOfIcon,
                category: iconCategory,
                categoryIconClass: `slds-icon_small ${iconClass}${nameOfIcon.replace(
                    /_/g,
                    '-'
                )}`
            };
        } else {
            // The item has no icon
            iconInformations = this.setDefaultIconInformation();
        }

        // CSS class depending of the avatar type
        if (avatar?.src) {
            styleClass +=
                ' avonni-activity-timeline__horizontal-timeline-avatar__image ';
        } else if (avatar?.initials) {
            styleClass += ` slds-avatar__initials ${computeSldsClass(
                avatar.fallbackIconName
            )} avonni-activity-timeline__horizontal-timeline-avatar__initials `;
        }

        return {
            ...iconInformations,
            src: avatar?.src,
            presence: avatar?.presence,
            initials: avatar?.initials,
            styleClass
        };
    }

    /**
     * Sets the visibility of the interval bounds.
     */
    setIntervalBoundsState() {
        if (this._isResizingInterval || this._changeIntervalSizeMode) {
            this._leftIntervalLine
                .style('opacity', 1)
                .style('stroke', TIMELINE_COLORS.intervalBorder)
                .style('stroke-width', 3)
                .attr('class', RESIZE_CURSOR_CLASS);
            this._rightIntervalLine
                .style('opacity', 1)
                .style('stroke', TIMELINE_COLORS.intervalBorder)
                .style('stroke-width', 3)
                .attr('class', RESIZE_CURSOR_CLASS);
        } else {
            this._rightIntervalLine.style('opacity', 0).attr('class', '');
            this._leftIntervalLine.style('opacity', 0).attr('class', '');
        }
    }

    /**
     * Sets the max date of the interval
     */
    setIntervalMaxDate() {
        this._intervalMaxDate = new Date(this._intervalMinDate);
        this._intervalMaxDate.setDate(
            this._intervalMaxDate.getDate() + this._intervalDaysLength
        );
        this._intervalMaxDate.setHours(23, 59, 59, 999);

        if (this._intervalMaxDate > this.scrollAxisMaxDate) {
            this._intervalMaxDate = this.scrollAxisMaxDate;
        }
    }

    /**
     * Sets popover's direction and adjusts x position if needed.
     */
    setPopoverDirection(tooltipElement, popoverPosition, element) {
        const popoverWidth = this.convertPxSizeToNumber(
            tooltipElement.style('width')
        );

        if (this.canPopoverBeOnLeft(popoverPosition.x, popoverWidth)) {
            return;
        }

        popoverPosition.x =
            this.findStartPositionOfItem(element) - popoverWidth;
        if (this.canPopoverBeOnRight(popoverPosition.x)) {
            popoverPosition.direction = 'right';
            return;
        }

        // Not enough space on either side. We choose the side with more space.
        const leftSpaceForPopover =
            this._offsetAxis +
            this.viewTimeScale(new Date(element.datetimeValue)) +
            SVG_ICON_SIZE;
        popoverPosition.direction =
            this.findPopoverDirectionWithMoreSpace(leftSpaceForPopover);
        if (popoverPosition.direction === 'left') {
            popoverPosition.x = leftSpaceForPopover;
        }
    }

    /**
     * Sets the position (x, y, direction) of item's popover.
     *
     * @return {object}
     */
    setPopoverPosition(tooltipElement, element) {
        let offsetY = this.divTimelineHeader
            ? this.divTimelineScroll.getBoundingClientRect().top -
              this.divTimelineHeader.getBoundingClientRect().top
            : 0;
        offsetY -= this.divTimelineScroll.scrollTop;
        if (this.hasBorder(element)) {
            offsetY += AVATAR_MARGIN;
        }

        const popoverPosition = {
            x: this.findEndPositionOfItem(element),
            y: element.yPosition + offsetY,
            direction: 'left'
        };

        this.setPopoverDirection(tooltipElement, popoverPosition, element);

        // if element has field, adjust position (nubbin top)
        if (this.hasPopoverHeader(element)) {
            popoverPosition.y +=
                SVG_ICON_SIZE / 2 - this.tooltipNubbinTopOffset;
        } else {
            const popoverHeight = this.convertPxSizeToNumber(
                tooltipElement.style('height')
            );
            popoverPosition.y += SVG_ICON_SIZE / 2 - popoverHeight / 2;
        }

        return popoverPosition;
    }

    /**
     * Sets width of the timeline div (screen)
     */
    setTimelineWidth(containerWidth) {
        if (containerWidth > 0) {
            this._timelineWidth = containerWidth;
            const timelineContainerWidth =
                this._timelineWidth + 2 * BORDER_OFFSET;
            d3.select(this.divTimelineItemsSelector).style(
                'width',
                timelineContainerWidth + 'px'
            );
        }
    }

    /**
     * Sets the visible height of the timeline according to the max visible items number
     */
    setVisibleTimelineHeight() {
        // To limit height to number of items in timeline
        if (this._maxVisibleItems > this._sortedItems.length) {
            this._maxVisibleItems = this._sortedItems.length;
        }

        this._timelineHeightDisplayed =
            this._maxVisibleItems * Y_GAP_BETWEEN_ITEMS_TIMELINE +
            Y_START_POSITION_TIMELINE_ITEM * 1.5;

        d3.select(this.divTimelineScroll).style(
            'height',
            this._timelineHeightDisplayed + 'px'
        );
    }

    /**
     * Sets the yPosition value of all items to prevent overlap of elements in horizontal timeline
     *
     * @returns {array}
     */
    setYPositionOfItems(
        items,
        yStartPosition,
        yGapBetweenItems,
        yGapBetweenBorderItems
    ) {
        // Sets all items with startPosition as yPosition and sort them by date
        let dataToDisplay = items.map((element) => ({
            ...element,
            yPosition: yStartPosition,
            xMinPosition: this.viewTimeScale(new Date(element.datetimeValue)),
            xMaxPosition:
                this.viewTimeScale(new Date(element.datetimeValue)) +
                MAX_ITEM_LENGTH
        }));

        dataToDisplay = [...dataToDisplay].sort(
            (a, b) => new Date(a.datetimeValue) - new Date(b.datetimeValue)
        );

        dataToDisplay.forEach((item, itemIndex) => {
            // Find all elements in date range of item to prevent overlapping
            let foundElements = dataToDisplay.filter(
                (element, elementIndex) => {
                    return (
                        elementIndex > itemIndex &&
                        element.name !== item.name &&
                        element.xMinPosition >= item.xMinPosition &&
                        element.xMinPosition <= item.xMaxPosition
                    );
                }
            );
            if (foundElements && foundElements.length > 0) {
                // Add vertical gap between each element
                foundElements.forEach((element, elementIndex) => {
                    if (item.yPosition >= element.yPosition) {
                        element.yPosition = item.yPosition;
                        if (this.hasBorder(item)) {
                            element.yPosition += yGapBetweenBorderItems;
                        } else {
                            if (this.hasBorder(element) && elementIndex === 0) {
                                element.yPosition +=
                                    SVG_ICON_SIZE +
                                    (yGapBetweenBorderItems -
                                        BORDER_ITEM_HEIGHT);
                            } else {
                                element.yPosition += yGapBetweenItems;
                            }
                        }
                    }
                });
            }

            // Find max y position - only for timeline axis
            if (
                yStartPosition === Y_START_POSITION_TIMELINE_ITEM &&
                item.yPosition > this._maxYPositionOfItem
            ) {
                this._maxYPositionOfItem = item.yPosition;
            }
        });

        return dataToDisplay;
    }

    /**
     * Validates the x value of the mouse position for the scroll axis. If the position is invalid, it is set to min or max.
     *
     * @return {number}
     */
    validateXMousePosition(xMousePosition) {
        const maxPosition =
            this.scrollTimeScale(this.scrollAxisMaxDate) - this.intervalWidth;
        const minPosition = this.scrollTimeScale(this.scrollAxisMinDate);
        let xPosition = xMousePosition;
        if (xMousePosition > maxPosition) {
            xPosition = maxPosition;
        } else if (xPosition < minPosition) {
            xPosition = minPosition;
        }
        return xPosition;
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLER
     * -------------------------------------------------------------
     */

    /**
     * Handles click on scroll axis to change interval values. Timeline is re-render.
     */
    handleClickOnScrollAxis(event) {
        this.handleMouseOutOfPopover();

        if (!this._changeIntervalSizeMode) {
            let xPosition = this.findBeginningOfDayPosition(
                event.offsetX - this.intervalWidth / 2
            );
            const maxPosition =
                this.scrollTimeScale(this.scrollAxisMaxDate) -
                this.intervalWidth;
            const minPosition = this.scrollTimeScale(this.scrollAxisMinDate);

            if (xPosition < minPosition) {
                xPosition = minPosition;
            } else if (xPosition > maxPosition) {
                xPosition = maxPosition;
            }

            this._intervalMinDate = this.convertPositionToScaleDate(
                this.scrollTimeScale,
                xPosition
            );
            this.setIntervalMaxDate();

            // The width is set again because of setHours that can add small offset if scale is on short period of time
            this._timeIntervalSelector
                .attr('x', this.scrollTimeScale(this._intervalMinDate))
                .attr('width', this.intervalWidth)
                .attr('y', INTERVAL_RECTANGLE_OFFSET_Y);

            this.moveTimelineDisplay();
        }
    }

    /**
     * Handles moving the interval to the left using the keyboard arrow key.
     */
    handleIntervalKeyboardScrollLeft() {
        const minXPosition = this.scrollTimeScale(this.scrollAxisMinDate);
        let position =
            this.scrollTimeScale(this._intervalMinDate) - SCROLL_STEP;
        if (position < minXPosition) {
            position = minXPosition;
        }
        this.moveIntervalToPosition(position);
    }

    /**
     * Handles moving the interval to the right using the keyboard arrow key.
     */
    handleIntervalKeyboardScrollRight() {
        const maxXPosition = this.scrollTimeScale(this.scrollAxisMaxDate);
        let position =
            this.scrollTimeScale(this._intervalMinDate) + SCROLL_STEP;
        if (position > maxXPosition) {
            position = maxXPosition;
        }
        this.moveIntervalToPosition(position);
    }

    /**
     * Handles increasing the width of the interval using the keyboard.
     */
    handleIntervalKeyboardZoomIn() {
        this.handleMouseOutOfPopover();

        const lowerMinXPosition = this.scrollTimeScale(this.scrollAxisMinDate);
        let xStartPosition =
            this.scrollTimeScale(this._intervalMinDate) - ZOOM_STEP;
        if (xStartPosition < lowerMinXPosition) {
            xStartPosition = lowerMinXPosition;
        }
        const upperMaxXPosition = this.scrollTimeScale(this.scrollAxisMaxDate);
        let xEndPosition =
            this.scrollTimeScale(this._intervalMaxDate) + ZOOM_STEP;
        if (xEndPosition > upperMaxXPosition) {
            xEndPosition = upperMaxXPosition;
        }

        const newRectangleWidth = xEndPosition - xStartPosition;
        this._timeIntervalSelector
            .attr('x', xStartPosition)
            .attr('y', INTERVAL_RECTANGLE_OFFSET_Y)
            .attr('width', newRectangleWidth);

        this.handleLowerBoundIntervalChange();
        this.handleUpperBoundIntervalChange();
        this.endIntervalResizing();
    }

    /**
     * Handles decreasing the width of the interval using the keyboard.
     */
    handleIntervalKeyboardZoomOut() {
        this.handleMouseOutOfPopover();

        const width = Number(this._timeIntervalSelector.attr('width'));
        if (width < ZOOM_STEP) {
            return;
        }

        const lowerMaxXPosition =
            this.scrollTimeScale(this._intervalMaxDate) - this.minIntervalWidth;
        let xStartPosition =
            this.scrollTimeScale(this._intervalMinDate) + ZOOM_STEP;
        if (xStartPosition > lowerMaxXPosition) {
            xStartPosition = lowerMaxXPosition;
        }
        const upperMinXPosition =
            this.scrollTimeScale(this._intervalMinDate) + this.minIntervalWidth;
        let xEndPosition =
            this.scrollTimeScale(this._intervalMaxDate) - ZOOM_STEP;
        if (xEndPosition < upperMinXPosition) {
            xEndPosition = upperMinXPosition;
        }

        const newRectangleWidth = xEndPosition - xStartPosition;
        if (newRectangleWidth < MIN_INTERVAL_WIDTH) {
            return;
        }

        this._timeIntervalSelector
            .attr('x', xStartPosition)
            .attr('y', INTERVAL_RECTANGLE_OFFSET_Y)
            .attr('width', newRectangleWidth);

        this.handleLowerBoundIntervalChange();
        this.handleUpperBoundIntervalChange();
        this.endIntervalResizing();
    }

    /**
     * Handles a keydown on an item.
     */
    handleKeyDownOnItem(element, event) {
        switch (event.key) {
            case keyValues.space:
            case keyValues.spacebar:
            case keyValues.enter:
                event.preventDefault();
                event.stopPropagation();
                if (!this._activityTimeline.showItemPopOver) {
                    this._focusedItem = event.currentTarget;
                    this.handleMouseOverOnItem(element);
                    this._isMouseOverOnPopover = true;

                    requestAnimationFrame(() => {
                        const actionsMenu =
                            this._activityTimeline.template.querySelector(
                                '[data-element-id="lightning-button-menu-actions"]'
                            );
                        if (actionsMenu) {
                            actionsMenu.focus();
                        }
                    });
                }
                break;
            case keyValues.escape:
                event.preventDefault();
                event.stopPropagation();
                this.handleMouseOutOfPopover();
                break;
            default:
                break;
        }
    }

    /**
     * Handles the change of width of the interval with the lower bound side. Timeline is re-render.
     */
    handleLowerBoundIntervalChange() {
        this._isResizingInterval = true;
        const xDateMinPosition = this._timeIntervalSelector.attr('x');
        this._intervalMinDate = this.convertPositionToScaleDate(
            this.scrollTimeScale,
            xDateMinPosition
        );
        this._intervalDaysLength = this.calculateDaysBetweenDates(
            this._intervalMinDate,
            this._intervalMaxDate
        );

        this.resetAndRedrawScrollAxisRectangle();
        this.moveTimelineDisplay();
    }

    /**
     * Handles the drag of the lower bound of interval to expand or reduce interval size.
     */
    handleLowerBoundIntervalDrag(event) {
        // Keep popover close while resizing
        this.handleMouseOutOfPopover();
        this._isTimelineMoving = true;

        const minXPosition = this.scrollTimeScale(this.scrollAxisMinDate);
        const maxXPosition =
            this.scrollTimeScale(this._intervalMaxDate) - this.minIntervalWidth;

        let xPosition = this.findBeginningOfDayPosition(
            event.sourceEvent.offsetX
        );
        if (
            event.sourceEvent.pageX < this.scrollAxisLeftPosition ||
            xPosition < minXPosition
        ) {
            xPosition = minXPosition;
        } else if (xPosition > maxXPosition) {
            xPosition = maxXPosition;
        }

        const newRectangleWidth =
            this.scrollTimeScale(this._intervalMaxDate) - xPosition;
        this._timeIntervalSelector
            .attr('x', xPosition)
            .attr('width', newRectangleWidth);

        this.handleLowerBoundIntervalChange();
    }

    /**
     * Handles mouse out of item to hide popover
     */
    handleMouseOutOnItem() {
        this.clearPreviousTooltipClosingTimeout();
        this._tooltipClosingTimeout = setTimeout(() => {
            if (!this._isMouseOverOnPopover) {
                this._activityTimeline.handleTooltipClose();
            }
        }, 250);
    }

    /**
     * Handles mouse over on popover.
     */
    handleMouseOverOnPopover() {
        if (this._isTimelineMoving) {
            return;
        }
        this.clearPreviousTooltipClosingTimeout();
        this._isMouseOverOnPopover = true;
    }

    /**
     * Handles mouse out of popover.
     */
    handleMouseOutOfPopover() {
        if (this._activityTimeline.showItemPopOver) {
            this.clearPreviousTooltipClosingTimeout();
            this._isMouseOverOnPopover = false;
            this._activityTimeline.handleTooltipClose();
        }
    }

    /**
     * Handles mouse over on time interval on scroll axis to activate edit mode the interval size.
     */
    handleMouseOverOnInterval() {
        this._changeIntervalSizeMode = true;
        this.setIntervalBoundsState();
    }

    /**
     * Handles mouse over on item to display a popover
     */
    handleMouseOverOnItem(element) {
        if (this._isTimelineMoving) {
            return;
        }
        this.clearPreviousTooltipClosingTimeout();
        this._isMouseOverOnPopover = false;
        this._activityTimeline.handleItemMouseOver(element);
    }

    /**
     * Handles the drag of interval on scroll axis to change dates displayed on main timeline. Timeline is re-render.
     */
    handleTimeIntervalDrag(event) {
        let xPosition = this.findBeginningOfDayPosition(
            event.sourceEvent.offsetX - this._distanceBetweenDragAndMin
        );

        // To allow only horizontal drag
        xPosition = this.validateXMousePosition(xPosition);

        if (event.sourceEvent.pageX < this.scrollAxisLeftPosition) {
            xPosition = this.scrollTimeScale(this.scrollAxisMinDate);
        }

        this.handleMouseOutOfPopover();
        this.moveIntervalToPosition(xPosition);
    }

    /**
     * Handles the drag start of time interval to set the distance between drag position and min value.
     */
    handleTimeIntervalDragStart(event) {
        this._isTimelineMoving = true;
        this._distanceBetweenDragAndMin =
            event.x - this.scrollTimeScale(this._intervalMinDate);
    }

    /**
     * Handles the change of size of the interval using the upper bound side. Timeline is re-render.
     */
    handleUpperBoundIntervalChange() {
        this._isResizingInterval = true;
        const newIntervalWidth = Number(
            this._timeIntervalSelector.attr('width')
        );
        const xPositionMaxDate =
            this.scrollTimeScale(this._intervalMinDate) + newIntervalWidth;
        this._intervalMaxDate = this.scrollTimeScale
            .invert(xPositionMaxDate)
            .setHours(23, 59, 59, 999);
        this._intervalDaysLength = this.calculateDaysBetweenDates(
            this._intervalMinDate,
            this._intervalMaxDate
        );

        this.resetAndRedrawScrollAxisRectangle();
        this.moveTimelineDisplay();
    }

    /**
     * Handles the drag of the upper bound of interval to expand or reduce interval size.
     */
    handleUpperBoundIntervalDrag(event) {
        // Keep popover close while resizing
        this.handleMouseOutOfPopover();
        this._isTimelineMoving = true;

        const minXPosition =
            this.scrollTimeScale(this._intervalMinDate) + this.minIntervalWidth;
        const maxXPosition = this.scrollTimeScale(this.scrollAxisMaxDate);

        let xPosition = this.findEndOfDayPosition(event.sourceEvent.offsetX);
        if (
            event.sourceEvent.pageX < this.scrollAxisLeftPosition ||
            xPosition < minXPosition
        ) {
            xPosition = minXPosition;
        } else if (xPosition > maxXPosition) {
            xPosition = maxXPosition;
        }

        const newRectangleWidth =
            xPosition - this.scrollTimeScale(this._intervalMinDate);
        this._timeIntervalSelector
            .attr('y', INTERVAL_RECTANGLE_OFFSET_Y)
            .attr('width', newRectangleWidth);

        this.handleUpperBoundIntervalChange();
    }

    /**
     * Handles horizontal scroll (wheel event) of interval on timeline's scroll axis.
     */
    handleWheelOnInterval(event) {
        const timeIntervalSelector = this._timeIntervalSelector.node();
        const timeIntervalSelectorLeft =
            timeIntervalSelector.getBoundingClientRect().left;
        const timeIntervalSelectorRight =
            timeIntervalSelector.getBoundingClientRect().right;

        const canScroll = Math.abs(event.deltaX) !== Math.abs(event.deltaY);
        const isScrollingVertically =
            this.isScrollingVerticallyOnTimeline(event);

        const scrollLeftEnd =
            this.scrollAxisLeftPosition === timeIntervalSelectorLeft &&
            event.deltaX <= 0;
        const scrollRightEnd =
            timeIntervalSelectorRight >=
                this.scrollAxisLeftPosition +
                    this.scrollAxisRectangle.getBoundingClientRect().width &&
            event.deltaX > 0;
        const scrollTopEnd =
            this.divTimelineScroll.scrollTop <= 0 && event.deltaY <= 0;
        const scrollBottomEnd =
            this.divTimelineScroll.scrollTop +
                this.divTimelineScroll.clientHeight >=
                this.divTimelineScroll.scrollHeight && event.deltaY > 0;

        if (
            !canScroll ||
            (!isScrollingVertically && (scrollLeftEnd || scrollRightEnd)) ||
            (isScrollingVertically && (scrollTopEnd || scrollBottomEnd))
        ) {
            return;
        }

        if (!isScrollingVertically) {
            event.stopPropagation();
            event.preventDefault();

            this.cancelEditIntervalSizeMode();
            this.handleMouseOutOfPopover();

            // Horizontal scroll of interval
            const requestedPosition = this.extractScrollXPosition(event);

            this.moveIntervalToPosition(
                this.validateXMousePosition(requestedPosition)
            );
        }
    }
}
