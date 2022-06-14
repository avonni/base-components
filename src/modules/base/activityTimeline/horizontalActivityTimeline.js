/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2021, Avonni Labs, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import * as d3 from 'd3';
import { dateTimeObjectFrom } from 'c/utilsPrivate';

const AXIS_LABEL_WIDTH = 50.05;
const AXIS_TYPE = { timelineAxis: 'timeline-axis', scrollAxis: 'scroll-axis' };
const COLOR_CHANGE_INTERVAL_SIZE = '#084d75';
const DEFAULT_AXIS_SCROLL_COLOR = '#1c82bd';
const DEFAULT_TIMELINE_AXIS_TICKS_NUMBER = 9;
const DEFAULT_SCROLL_AXIS_TICKS_NUMBER = 10;
const DEFAULT_DATE_FORMAT = 'dd/MM/yyyy';
const DEFAULT_INTERVAL_DAYS_LENGTH = 15;
const DEFAULT_TIMELINE_WIDTH = 1300;
const DEFAULT_TIMELINE_HEIGHT = 350;
const DEFAULT_TIMELINE_AXIS_OFFSET = 40;
const DEFAULT_TIMELINE_AXIS_HEIGHT = 30;
const INTERVAL_RECTANGLE_OFFSET_Y = 0.5;
const MAX_LENGTH_TITLE_ITEM = 30;
const MAX_ITEM_LENGTH = 230;
const RESIZE_CURSOR_CLASS =
    'avonni-activity-timeline__horizontal-timeline-resize-cursor';
const SCROLL_ITEM_RECTANGLE_WIDTH = 4;
const SVG_ICON_SIZE = 25;
const VALID_ICON_CATEGORIES = [
    'standard',
    'utility',
    'doctype',
    'action',
    'custom'
];
const Y_START_POSITION_TIMELINE_ITEM = 10;
const Y_GAP_BETWEEN_ITEMS_TIMELINE = 28;
const Y_START_POSITION_SCROLL_ITEM = 4;
const Y_GAP_BETWEEN_ITEMS_SCROLL = 4;

// ** Functionalities/bug **
// TODO: Fix popover size
// TODO: Last item : click/drag (when interval width is changed) -->
//      --- > change date by calculation of distance and convert to date (Change scroll too )

// ** QA/tests/Doc **
// TODO: Refactor
// TODO: Doc
// TODO: Tests

export class HorizontalActivityTimeline {
    // Horizontal view properties
    _changeIntervalSizeMode = false;
    _intervalMinDate;
    _intervalMaxDate;
    _intervalDaysLength = DEFAULT_INTERVAL_DAYS_LENGTH;
    _dateFormat = DEFAULT_DATE_FORMAT;
    _displayedItems = [];
    _maxYPositionOfItem = 0;
    _numberOfScrollAxisTicks = DEFAULT_SCROLL_AXIS_TICKS_NUMBER;
    _numberOfTimelineAxisTicks = DEFAULT_TIMELINE_AXIS_TICKS_NUMBER;
    _offsetAxis = DEFAULT_TIMELINE_AXIS_OFFSET;
    _timelineWidth = DEFAULT_TIMELINE_WIDTH;
    _timelineHeight = DEFAULT_TIMELINE_HEIGHT;
    _timelineAxisHeight = DEFAULT_TIMELINE_AXIS_HEIGHT;
    _scrollAxisColor = DEFAULT_AXIS_SCROLL_COLOR;

    // To change visible height of timeline
    _requestHeightChange = false;
    _previousMaxYPosition;
    _maxVisibleItems;
    _timelineHeightDisplayed;
    _maxDisplayedItems;

    // D3 selector DOM elements
    _timelineDiv;
    _timelineSVG;
    _scrollAxisSVG;
    _timeIntervalSelector;
    _timelineAxisDiv;
    _scrollAxisDiv;

    // displayedItems = items presented in horizontal timeline (dates are in interval)
    // sortedItems = all items sorted by date
    constructor(activityTimeline, sortedItems) {
        this._sortedItems = sortedItems;
        this._activityTimeline = activityTimeline;
        this.setDefaultIntervalDates();
    }

    /**
     * Create horizontal view timeline
     */
    createHorizontalActivityTimeline(sortedItems, maxVisibleItems, width) {
        this.resetHorizontalTimeline();
        this._sortedItems = sortedItems;

        if (this.isHeightDifferent(sortedItems, maxVisibleItems)) {
            this._requestHeightChange = true;
            this._maxVisibleItems = maxVisibleItems;
        }

        this.setTimelineWidth(width);
        this.createTimelineScrollAxis();
        this.createTimelineAxis();
        this.createTimeline();
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Select only items in min-max interval for horizontal view of the timeline
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
     * Select div container of timeline axis
     */
    get divTimelineAxisSelector() {
        return this._activityTimeline.template.querySelector(
            '.avonni-activity-timeline__horizontal-timeline-axis'
        );
    }

    /**
     * Select div container of timeline items
     */
    get divTimelineItemsSelector() {
        return this._activityTimeline.template.querySelector(
            '.avonni-activity-timeline__horizontal-timeline-items'
        );
    }

    /**
     * Select div of the scroll container for timeline
     */
    get divTimelineScroll() {
        return this._activityTimeline.template.querySelector(
            '.avonni-activity-timeline__horizontal-timeline-scrolling-container'
        );
    }

    /**
     * Select the div container of the scroll axis
     */
    get divTimelineScrollAxisSelector() {
        return this._activityTimeline.template.querySelector(
            '.avonni-activity-timeline__horizontal-timeline-scroll-axis'
        );
    }

    /**
     * Calculate the width of the time interval
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
     * Return the number of days in the interval for the horizontal timeline
     *
     * @type {number}
     */
    get intervalDaysLength() {
        return this._intervalDaysLength;
    }

    /**
     * Return the max date for the horizontal timeline with the correct format
     *
     * @type {Date}
     */
    get intervalMaxDate() {
        this.setIntervalMaxDate();
        return this.convertDateToFormat(this._intervalMaxDate);
    }

    /**
     * Return the min date for the horizontal timeline with the correct format
     *
     * @type {Date}
     */
    get intervalMinDate() {
        return this.convertDateToFormat(this._intervalMinDate);
    }

    /**
     * Select the popover created when mouse is over an item
     */
    get itemPopoverSelector() {
        return this._activityTimeline.template.querySelector(
            '.avonni-activity-timeline__item-popover'
        );
    }

    /**
     * Find the max date in items
     *
     * @type {Date}
     */
    get maxDate() {
        const maxIndex =
            this._activityTimeline._sortedDirection === 'desc'
                ? 0
                : this._sortedItems.length - 1;
        return new Date(this._sortedItems[maxIndex].datetimeValue);
    }

    /**
     * Find the min date in items
     *
     * @type {Date}
     */
    get minDate() {
        const minIndex =
            this._activityTimeline._sortedDirection === 'desc'
                ? this._sortedItems.length - 1
                : 0;
        return new Date(this._sortedItems[minIndex].datetimeValue);
    }

    /**
     * Find the max date displayed in the scroll axis
     */
    get scrollAxisMaxDate() {
        return this.findNextDate(this.maxDate, 15);
    }

    /**
     * Find the min date displayed in the scroll axis
     */
    get scrollAxisMinDate() {
        return this.findNextDate(this.minDate, -5);
    }

    /**
     * Function that calculate the time scale for the horizontal activity timeline's time scroll axis.
     * If we pass a date, it returns the corresponding x value. If we use invert, we can pass an x value to return date.
     */
    get scrollTimeScale() {
        return d3
            .scaleTime()
            .domain([this.scrollAxisMinDate, this.scrollAxisMaxDate])
            .range([this._offsetAxis, this._timelineWidth]);
    }

    /**
     * Function that calculate the time scale for the horizontal activity timeline's time axis.
     * If we pass a date, it returns the corresponding x value. If we use invert, we can pass an x value to return date.
     */
    get viewTimeScale() {
        return d3
            .scaleTime()
            .domain([
                this.findNextDate(this._intervalMinDate, -1),
                this.findNextDate(this._intervalMaxDate, 1)
            ])
            .range([0, this._timelineWidth - this._offsetAxis]);
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Add rectangles at correct dates to scroll axis to represent items
     */
    addItemsToScrollAxis() {
        // To find y position of all items
        let itemsToDisplay = this.setYPositionOfItems(
            this._sortedItems,
            Y_START_POSITION_SCROLL_ITEM,
            Y_GAP_BETWEEN_ITEMS_SCROLL
        );

        // To remove all items that exceed the scroll axis
        itemsToDisplay = itemsToDisplay.filter(
            (item) => item.yPosition < DEFAULT_TIMELINE_AXIS_HEIGHT
        );

        // Draw rectangle for each item
        this._scrollAxisSVG
            .append('g')
            .selectAll('rect')
            .data(itemsToDisplay)
            .enter()
            .append('rect')
            .attr('x', (item) =>
                this.scrollTimeScale(new Date(item.datetimeValue))
            )
            .attr('y', (item) => item.yPosition)
            .attr('width', SCROLL_ITEM_RECTANGLE_WIDTH)
            .attr('height', 3)
            .attr('fill', this._scrollAxisColor);
    }

    /**
     * Add all items in activity timeline.
     */
    addItemsToTimeline(dataToDisplay) {
        dataToDisplay.forEach((item) => {
            const itemGroup = this._timelineSVG
                .append('g')
                .attr('id', 'timeline-item-' + item.name);
            this.createItem(itemGroup, item);

            itemGroup
                // TODO: change size to better fit popover content
                .on('mouseover', this.handleMouseOverOnItem.bind(this, item))
                .on('mouseout', this.handleMouseOutOnItem.bind(this));
        });
    }

    /**
     * Add time interval rectangle to scroll axis to allow user to scroll across all dates
     */
    addTimeIntervalToScrollAxis() {
        // Create the interval rectangle
        this._timeIntervalSelector = this._scrollAxisSVG
            .append('g')
            .append('rect')
            .attr(
                'class',
                'avonni-horizontal-activity-timeline__time-interval-rectangle'
            )
            .attr('x', this.scrollTimeScale(new Date(this._intervalMinDate)))
            .attr('y', INTERVAL_RECTANGLE_OFFSET_Y)
            .attr('width', this.intervalWidth)
            .attr('height', this._timelineAxisHeight)
            .attr('opacity', 0.3)
            .attr('fill', this._scrollAxisColor)
            .call(d3.drag().on('drag', this.handleTimeIntervalDrag.bind(this)))
            .on('click', this.handleClickOnInterval.bind(this));

        // Create left and right lines to change width of interval
        this._leftIntervalLine = this._scrollAxisSVG
            .append('line')
            .attr(
                'id',
                'avonni-horizontal-activity-timeline__left-interval-line'
            )
            .style('stroke', COLOR_CHANGE_INTERVAL_SIZE)
            .style('opacity', 0)
            .style('stroke-width', 1)
            .attr('x1', this.scrollTimeScale(new Date(this._intervalMinDate)))
            .attr('y1', 1.4)
            .attr('x2', this.scrollTimeScale(new Date(this._intervalMinDate)))
            .attr('y2', this._timelineAxisHeight + INTERVAL_RECTANGLE_OFFSET_Y)
            .call(
                d3
                    .drag()
                    .on('drag', this.handleLowerBoundIntervalDrag.bind(this))
                    .on('end', this.handleLowerBoundIntervalChange.bind(this))
            );

        this._rightIntervalLine = this._scrollAxisSVG
            .append('line')
            .attr(
                'id',
                'avonni-horizontal-activity-timeline__right-interval-line'
            )
            .style('stroke', COLOR_CHANGE_INTERVAL_SIZE)
            .style('opacity', 0)
            .style('stroke-width', 1)
            .attr('x1', this.scrollTimeScale(new Date(this._intervalMaxDate)))
            .attr('y1', 1.4)
            .attr('x2', this.scrollTimeScale(new Date(this._intervalMaxDate)))
            .attr('y2', this._timelineAxisHeight + INTERVAL_RECTANGLE_OFFSET_Y)
            .call(
                d3
                    .drag()
                    .on('drag', this.handleUpperBoundIntervalDrag.bind(this))
                    .on('end', this.handleUpperBoundIntervalChange.bind(this))
            );
    }

    /**
     * Calculate the numbers of days between the min and max dates in items
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
     * Cancel edit mode of the size of interval on scroll axis. Lines are removed and default color is restored.
     */
    cancelEditIntervalSizeMode() {
        this._changeIntervalSizeMode = false;
        this._timeIntervalSelector.attr('fill', this._scrollAxisColor);
        this._rightIntervalLine.style('opacity', 0).attr('class', '');
        this._leftIntervalLine.style('opacity', 0).attr('class', '');
    }

    /**
     * Formatted item's title to prevent text longer than 30 characters on horizontal timeline
     * @param {Object} item
     * @returns string
     */
    computedItemTitle(item) {
        if (item.title.length > MAX_LENGTH_TITLE_ITEM) {
            return ' - ' + item.title.slice(0, MAX_LENGTH_TITLE_ITEM) + ' ...';
        }
        return ' - ' + item.title;
    }

    /**
     * Convert a date to the correct format
     *
     * @param {Date} date
     * @returns string
     */
    convertDateToFormat(date) {
        return dateTimeObjectFrom(date).toFormat(this._dateFormat);
    }

    /**
     *  Create item on horizontal timeline to display lightning icon and item's title
     */
    createItem(itemGroup, item) {
        const iconInformation = this.setIconInformation(item.iconName);
        const foreignObjectForIcon = itemGroup.append('foreignObject');
        foreignObjectForIcon
            .attr('width', SVG_ICON_SIZE)
            .attr('height', SVG_ICON_SIZE)
            .attr('x', this.viewTimeScale(new Date(item.datetimeValue)))
            .attr('y', item.yPosition);

        foreignObjectForIcon
            .append('xhtml:span')
            .attr(
                'class',
                'slds-icon slds-icon_container slds-icon_small slds-grid slds-grid_vertical-align-center ' +
                    iconInformation.categoryIconClass
            )
            .html(
                '<svg class="slds-icon"><use xlink:href=' +
                    iconInformation.xLinkHref +
                    '></use></svg>'
            );

        itemGroup
            .append('text')
            .attr(
                'x',
                this.viewTimeScale(new Date(item.datetimeValue)) + SVG_ICON_SIZE
            )
            .attr('y', item.yPosition + 0.64 * SVG_ICON_SIZE)
            .text(this.computedItemTitle(item))
            .style('font-size', 13);
    }

    /**
     * Create horizontal view timeline (top section with items)
     */
    createTimeline() {
        // Calculate each items y position and set timeline height
        const dataToDisplay = this.setYPositionOfItems(
            this.displayedItems,
            Y_START_POSITION_TIMELINE_ITEM,
            Y_GAP_BETWEEN_ITEMS_TIMELINE
        );

        if (this._requestHeightChange) {
            this.setVisibleTimelineHeight();
        }

        this._timelineHeight = Math.max(
            this._maxYPositionOfItem + 30,
            this._timelineHeightDisplayed
        );

        // Create SVG for timeline
        this._timelineSVG = this._timelineDiv
            .append('svg')
            .attr(
                'class',
                'avonni-horizontal-activity-timeline__timeline-items-svg'
            )
            .attr('width', this._timelineWidth - this._offsetAxis)
            .attr('height', this._timelineHeight)
            .attr('transform', 'translate(' + this._offsetAxis + ' , 0)');

        //  Create dashed lines aligned to axis ticks
        const axis = d3
            .axisBottom(this.viewTimeScale)
            .tickFormat(d3.timeFormat('%d/%m/%Y'))
            .ticks(this._numberOfTimelineAxisTicks)
            .tickSizeInner(this._timelineHeight + this._timelineAxisHeight)
            .tickSizeOuter(0);
        this._timelineSVG
            .append('g')
            .attr('opacity', 0.15)
            .style('stroke-dasharray', '8 8')
            .attr('transform', 'translate(0, -10)')
            .call(axis);

        this.createTimelineOutline();
        this.addItemsToTimeline(dataToDisplay);

        // Activate scroll only if needed
        if (this._timelineHeight > this._timelineHeightDisplayed) {
            d3.select(this.divTimelineScroll).style('overflow-y', 'scroll');
        } else {
            d3.select(this.divTimelineScroll).style('overflow-y', 'hidden');
        }
    }

    /**
     * Create the timeline outline with top rectangle line fixed.
     */
    createTimelineOutline() {
        d3.select(
            this._activityTimeline.template.querySelector(
                '.avonni-activity-timeline__horizontal-timeline-fixed-outline'
            )
        )
            .append('svg')
            .attr('width', this._timelineWidth - this._offsetAxis)
            .attr('height', 2)
            .attr('transform', 'translate(' + this._offsetAxis + ' ,0)')
            .style('position', 'fixed')
            .style('z-index', 50)
            .append('line')
            .attr('stroke', 'black')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', this._timelineWidth - this._offsetAxis)
            .attr('y2', 0);

        this._timelineSVG
            .append('line')
            .attr('stroke', 'black')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', 0)
            .attr('y2', this._timelineHeight);
        this._timelineSVG
            .append('line')
            .attr('stroke', 'black')
            .attr('x1', this._timelineWidth - this._offsetAxis)
            .attr('y1', 0)
            .attr('x2', this._timelineWidth - this._offsetAxis)
            .attr('y2', this._timelineHeight);
    }

    /**
     * Create the axis below the horizontal timeline to display the min-max interval
     */
    createTimelineAxis() {
        const axisSVG = this._timelineAxisDiv
            .append('svg')
            .attr('width', this._timelineWidth - this._offsetAxis)
            .attr('height', this._timelineAxisHeight * 2)
            .attr('transform', 'translate(' + this._offsetAxis + ' ,0)');

        // Create time axis and rectangle to surround it
        axisSVG
            .append('rect')
            .attr('x', '0.3')
            .attr('y', 0) // change position du rectangle blanc sous timeline
            .attr('width', this._timelineWidth - this._offsetAxis - 0.6)
            .attr('height', 25)
            .attr('stroke', 'black')
            .attr('stroke-width', '0.5px')
            .attr('fill', 'white');

        this.createTimeAxis(
            this.viewTimeScale,
            AXIS_TYPE.timelineAxis,
            this._numberOfTimelineAxisTicks,
            axisSVG
        );

        // Remove all ticks marks
        axisSVG.selectAll('.tick').selectAll('line').remove();
    }

    /**
     * Create a time axis using d3 with an acceptable distance between ticks to prevent overlap.
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
            destinationSVG
                .select('#' + axisId)
                .selectAll('*')
                .remove();

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
     * Calculate the space between ticks of an axis.
     *
     * @return {number}
     */
    calculateSpaceBetweenTicks(axisTicksSelector) {
        // Get all ticks and extract translate X value
        const ticksXPositions = [];
        for (const tick of axisTicksSelector) {
            const transformValue = d3.select(tick).attr('transform');
            ticksXPositions.push(
                Number(
                    transformValue.slice(
                        'translate('.length,
                        transformValue.indexOf(',')
                    )
                )
            );
        }

        if (ticksXPositions.length <= 1) {
            return AXIS_LABEL_WIDTH;
        }

        let minDistanceBetweenTicks;
        for (let i = 1; i < ticksXPositions.length; ++i) {
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
     * Create an axis bottom element using d3 to insert in destinationSVG
     */
    createAxisBottom(scale, axisId, numberOfTicks, destinationSVG) {
        if (numberOfTicks < 1) {
            numberOfTicks = 2;
        }

        const timeAxis = d3
            .axisBottom(scale)
            .tickFormat(d3.timeFormat('%d/%m/%Y'))
            .ticks(numberOfTicks)
            .tickSizeOuter(0);

        if (axisId === AXIS_TYPE.timelineAxis) {
            destinationSVG.append('g').attr('id', axisId).call(timeAxis);
            this._numberOfTimelineAxisTicks = numberOfTicks;
        } else {
            destinationSVG
                .append('g')
                .attr(
                    'transform',
                    'translate(0 ' + this._timelineAxisHeight + ')'
                )
                .call(timeAxis);
        }
    }

    /**
     * Create the scroll axis for horizontal timeline to display all dates
     */
    createTimelineScrollAxis() {
        this._scrollAxisSVG = this._scrollAxisDiv
            .append('svg')
            .attr(
                'class',
                'avonni-horizontal-activity-timeline__scroll-axis-svg'
            )
            .attr('width', this._timelineWidth + AXIS_LABEL_WIDTH / 3)
            .attr('height', this._timelineAxisHeight * 2)
            .attr('transform', 'translate(0, -25)');

        // Create ticks of scroll axis
        this.createTimeAxis(
            this.scrollTimeScale,
            AXIS_TYPE.scrollAxis,
            12,
            this._scrollAxisSVG
        );

        // Create the surrounding rectangle of the scroll axis
        this._scrollAxisSVG
            .append('rect')
            .attr('x', this._offsetAxis)
            .attr('y', 1)
            .attr('width', this._timelineWidth - this._offsetAxis)
            .attr('height', this._timelineAxisHeight)
            .attr('stroke', this._scrollAxisColor)
            .attr('fill', 'white')
            .on('click', this.handleClickOnScrollAxis.bind(this));

        this.addItemsToScrollAxis();
        this.addTimeIntervalToScrollAxis();
    }

    /**
     *  Calculate the date after x days of specific date
     *
     * @return {Date}
     */
    findNextDate(date, dayIncrement) {
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + dayIncrement);
        return nextDate;
    }

    /**
     *  Determine if timeline height is different than last render
     *
     * @return {Boolean}
     */
    isHeightDifferent(sortedItems, maxVisibleItems) {
        return (
            maxVisibleItems !== this._maxVisibleItems ||
            this._sortedItems.length !== sortedItems.length
        );
    }

    /**
     * Select and remove all elements inside the horizontal timeline to build a new one
     *
     */
    resetHorizontalTimeline() {
        this._maxYPositionOfItem = 0;

        this._timelineDiv = d3.select(this.divTimelineItemsSelector);
        this._timelineDiv.selectAll('*').remove();

        this._timelineAxisDiv = d3.select(this.divTimelineAxisSelector);
        this._timelineAxisDiv.selectAll('*').remove();

        this._scrollAxisDiv = d3.select(this.divTimelineScrollAxisSelector);
        this._scrollAxisDiv.selectAll('*').remove();

        d3.select(
            this._activityTimeline.template.querySelector(
                '.avonni-activity-timeline__horizontal-timeline-fixed-outline'
            )
        )
            .selectAll('*')
            .remove();
    }

    /**
     * Set the interval's min date to the middle datetime value of all items
     */
    setDefaultIntervalDates() {
        const middleIndex = Math.ceil(this._sortedItems.length / 2 - 1);
        this._intervalMinDate = new Date(
            this._sortedItems[middleIndex].datetimeValue
        );
        this._intervalMinDate.setHours(0, 0, 0, 0);
        this.setIntervalMaxDate();
    }

    /**
     * Determine and set the icon's information (name of the icon, x link href and CSS classes) according to correct category
     */
    setIconInformation(iconName) {
        const iconCategory = VALID_ICON_CATEGORIES.find((category) => {
            return iconName.match(category + ':*');
        });

        // Invalid icon category - Set default icon
        if (!iconCategory) {
            return {
                iconName: 'default',
                xLinkHref:
                    '/assets/icons/standard-sprite/svg/symbols.svg#default',
                categoryIconClass: 'slds-icon-standard-default'
            };
        }

        // Set icon's information
        let iconClass = '';
        if (iconCategory === 'utility') {
            iconClass = ' slds-icon-text-default ';
        }
        iconClass += 'slds-icon-' + iconCategory + '-';
        const nameOfIcon = iconName.slice(
            iconName.indexOf(':') + 1,
            iconName.length
        );

        return {
            iconName: nameOfIcon,
            xLinkHref:
                '/assets/icons/' +
                iconCategory +
                '-sprite/svg/symbols.svg#' +
                nameOfIcon,
            categoryIconClass: iconClass + nameOfIcon.replaceAll('_', '-')
        };
    }

    /**
     * Set the max date of the interval
     */
    setIntervalMaxDate() {
        this._intervalMaxDate = new Date(this._intervalMinDate);
        this._intervalMaxDate.setDate(
            this._intervalMaxDate.getDate() + this._intervalDaysLength
        );
    }

    /**
     * Set width of the timeline div (screen)
     */
    setTimelineWidth(containerWidth) {
        if (containerWidth > 0) {
            this._timelineWidth = containerWidth - 25;
            d3.select(this.divTimelineItemsSelector).style(
                'width',
                this._timelineWidth + 'px'
            );
        }
    }

    /**
     * Set the visible height of the timeline according to the max visible items number
     */
    setVisibleTimelineHeight() {
        if (
            !this._previousMaxYPosition ||
            this._maxYPositionOfItem >= this._previousMaxYPosition
        ) {
            this._previousMaxYPosition = this._maxYPositionOfItem;
            this._maxDisplayedItems =
                (this._maxYPositionOfItem - Y_START_POSITION_TIMELINE_ITEM) /
                    Y_GAP_BETWEEN_ITEMS_TIMELINE +
                1;
        }
        this._timelineHeightDisplayed =
            this._maxVisibleItems * Y_GAP_BETWEEN_ITEMS_TIMELINE +
            Y_START_POSITION_TIMELINE_ITEM * 1.5;

        // To prevent timeline height to be bigger than the max number of items displayed
        if (this._maxVisibleItems > this._maxDisplayedItems) {
            this._timelineHeightDisplayed =
                this._maxDisplayedItems * Y_GAP_BETWEEN_ITEMS_TIMELINE +
                Y_START_POSITION_TIMELINE_ITEM * 1.5;
        }

        d3.select(this.divTimelineScroll).style(
            'height',
            this._timelineHeightDisplayed + 'px'
        );
        this._requestHeightChange = false;
    }

    /**
     * Set the yPosition value of all items to prevent overlap of elements in horizontal timeline
     *
     * @returns {array}
     */
    setYPositionOfItems(items, yStartPosition, yGapBetweenItems) {
        // Set all items with startPosition as yPosition and sort them by date
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
                foundElements.forEach((element) => {
                    if (item.yPosition >= element.yPosition) {
                        element.yPosition = item.yPosition + yGapBetweenItems;
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
     * Validate the x value of the mouse position for the scroll axis. If the position is invalid, it is set to min or max.
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
     * Handle the click on time interval on scroll axis. It toggles a mode to edit the interval size.
     */
    handleClickOnInterval() {
        this._changeIntervalSizeMode = !this._changeIntervalSizeMode;

        if (this._changeIntervalSizeMode) {
            this._timeIntervalSelector.attr('fill', COLOR_CHANGE_INTERVAL_SIZE);

            // Display interval lines
            this._leftIntervalLine
                .style('opacity', 1)
                .attr('class', RESIZE_CURSOR_CLASS);
            this._rightIntervalLine
                .style('opacity', 1)
                .attr('class', RESIZE_CURSOR_CLASS);
        } else {
            this.cancelEditIntervalSizeMode();
        }
    }

    /**
     * Handle click on scroll axis to change interval values. Timeline is re-render.
     */
    handleClickOnScrollAxis(event) {
        if (!this._changeIntervalSizeMode) {
            let xPosition = event.offsetX;
            const highestMinDateXPosition =
                this.scrollTimeScale(this.scrollAxisMaxDate) -
                this.intervalWidth;

            if (xPosition > highestMinDateXPosition) {
                xPosition = highestMinDateXPosition;
            }

            this._timeIntervalSelector
                .attr('x', xPosition)
                .attr('y', INTERVAL_RECTANGLE_OFFSET_Y);
            this._intervalMinDate = this.scrollTimeScale
                .invert(xPosition)
                .setHours(0, 0, 0, 0);

            this.setIntervalMaxDate();
            this._activityTimeline.renderedCallback();
        }
    }

    /**
     * Handle the change of width of the interval with the lower bound side. Timeline is re-render.
     */
    handleLowerBoundIntervalChange() {
        this.cancelEditIntervalSizeMode();
        const xDateMinPosition = this._timeIntervalSelector.attr('x');
        this._intervalMinDate = this.scrollTimeScale
            .invert(xDateMinPosition)
            .setHours(0, 0, 0, 0);
        this._intervalDaysLength = this.calculateDaysBetweenDates(
            this._intervalMinDate,
            this._intervalMaxDate
        );

        this._requestHeightChange = true;
        this._activityTimeline.renderedCallback();
    }

    /**
     * Handle the drag of the lower bound of interval to expand or reduce interval size.
     */
    handleLowerBoundIntervalDrag(event) {
        if (this._changeIntervalSizeMode) {
            const minXPosition = this.scrollTimeScale(this.scrollAxisMinDate);
            const maxXPosition = this.scrollTimeScale(this._intervalMaxDate);
            let xPosition = event.x;

            if (xPosition < minXPosition) {
                xPosition = minXPosition;
            } else if (xPosition > maxXPosition) {
                xPosition = maxXPosition;
            }

            const newRectangleWidth =
                this.scrollTimeScale(this._intervalMaxDate) - xPosition;
            this._timeIntervalSelector
                .attr('x', xPosition)
                .attr('width', newRectangleWidth);
        }
    }

    /**
     * Handle mouse out of item to hide popover
     */
    handleMouseOutOnItem() {
        d3.select(this.itemPopoverSelector).style('visibility', 'hidden');
        this._activityTimeline.handleItemMouseLeave();
    }

    /**
     * Handle mouse over on item to display a popover
     */
    handleMouseOverOnItem(element, event) {
        this._activityTimeline.handleItemMouseOver(element);

        const tooltipElement = d3.select(this.itemPopoverSelector);
        const sizeClassToAdd =
            (element.fields && element.fields.length > 0) ||
            element.buttonLabel !== undefined
                ? 'avonni-activity-timeline__item-popover-with-fields'
                : element.hasError || element.description !== undefined
                ? 'avonni-activity-timeline__item-popover-with-errors'
                : '';

        tooltipElement
            .attr(
                'class',
                'slds-is-fixed avonni-activity-timeline__item-popover slds-popover slds-dropdown slds-dropdown_left ' +
                    sizeClassToAdd
            )
            .style('top', event.pageY - 10 + 'px')
            .style('left', event.pageX - 10 + 'px')
            .style('visibility', 'visible')
            .on('mouseout', this.handleMouseOutOnItem.bind(this));
    }

    /**
     * Handle the drag of interval on scroll axis to change dates displayed on main timeline. Timeline is re-render.
     */
    handleTimeIntervalDrag(event) {
        if (!this._changeIntervalSizeMode) {
            // To allow only horizontal drag
            const xPosition = this.validateXMousePosition(
                event.sourceEvent.offsetX
            );
            this._timeIntervalSelector
                .attr('x', xPosition)
                .attr('y', INTERVAL_RECTANGLE_OFFSET_Y);

            this._intervalMinDate = this.scrollTimeScale
                .invert(xPosition)
                .setHours(0, 0, 0, 0);

            this.setIntervalMaxDate();
            this._activityTimeline.renderedCallback();
        }
    }

    /**
     * Handle the change of size of the interval using the upper bound side. Timeline is re-render.
     */
    handleUpperBoundIntervalChange() {
        this.cancelEditIntervalSizeMode();
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

        this._requestHeightChange = true;
        this._activityTimeline.renderedCallback();
    }

    /**
     * Handle the drag of the upper bound of interval to expand or reduce interval size.
     */
    handleUpperBoundIntervalDrag(event) {
        if (this._changeIntervalSizeMode) {
            const minXPosition = this.scrollTimeScale(this._intervalMinDate);
            const maxXPosition = this.scrollTimeScale(this.scrollAxisMaxDate);
            let xPosition = event.x;

            if (xPosition < minXPosition) {
                xPosition = minXPosition;
            } else if (xPosition > maxXPosition) {
                xPosition = maxXPosition;
            }

            const newRectangleWidth =
                xPosition - this.scrollTimeScale(this._intervalMinDate);
            this._timeIntervalSelector
                .attr('y', INTERVAL_RECTANGLE_OFFSET_Y)
                .attr('width', newRectangleWidth);
        }
    }
}
