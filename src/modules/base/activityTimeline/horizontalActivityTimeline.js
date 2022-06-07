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

const COLOR_CHANGE_INTERVAL_SIZE = '#084d75';
const DEFAULT_AXIS_SCROLL_COLOR = '#1c82bd';
const DEFAULT_DATE_FORMAT = 'dd/MM/yyyy';
const DEFAULT_INTERVAL_DAYS_LENGTH = 15;
const DEFAULT_INTERVAL_MIN_DATE = new Date(2022, 0, 1);
const DEFAULT_TIMELINE_WIDTH = 1300;
const DEFAULT_TIMELINE_HEIGHT = 350;
const DEFAULT_TIMELINE_AXIS_OFFSET = 40;
const DEFAULT_TIMELINE_AXIS_HEIGHT = 30;
const INTERVAL_RECTANGLE_OFFSET_Y = 0.5;
const MAX_LENGTH_TITLE_ITEM = 30;
const RESIZE_CURSOR_CLASS =
    'avonni-activity-timeline__horizontal-timeline-resize-cursor';
const SCROLL_ITEM_RECTANGLE_WIDTH = 4;
const SVG_ICON_SIZE = 25;
const Y_START_POSITION_TIMELINE_ITEM = 10;
const Y_GAP_BETWEEN_ITEMS_TIMELINE = 28;
const Y_START_POSITION_SCROLL_ITEM = 4;
const Y_GAP_BETWEEN_ITEMS_SCROLL = 4;
const LWC_ICONS_XLINK_HREF = {
    standard: '/assets/icons/standard-sprite/svg/symbols.svg#',
    utility: '/assets/icons/utility-sprite/svg/symbols.svg#',
    doctype: '/assets/icons/doctype-sprite/svg/symbols.svg#',
    action: '/assets/icons/action-sprite/svg/symbols.svg#',
    custom: '/assets/icons/custom-sprite/svg/symbols.svg#'
};

const LWC_ICONS_CLASS = {
    standard: 'slds-icon-standard-',
    utility: 'slds-icon-text-default slds-icon-utility-',
    doctype: 'slds-icon-doctype-',
    action: 'slds-icon-action-',
    custom: 'slds-icon-custom-'
};

// ** Functionalities/bug **
// TODO: Fix popover size
// TODO: Handle if screen is smaller --> timeline axis label overlap, min size ?
// TODO: Last item : click/drag

// ** QA/tests/Doc **
// TODO: Separate HTML with render ?
// TODO: Refactor
// TODO: Doc
// TODO: Tests

export class HorizontalActivityTimeline {
    // Horizontal view properties
    _intervalMinDate = DEFAULT_INTERVAL_MIN_DATE;
    _intervalMaxDate;
    _intervalDaysLength = DEFAULT_INTERVAL_DAYS_LENGTH;
    _intervalIncrement = 2;

    _dateFormat = DEFAULT_DATE_FORMAT;
    _timelineWidth = DEFAULT_TIMELINE_WIDTH;
    _timelineHeight = DEFAULT_TIMELINE_HEIGHT;
    _timelineAxisHeight = DEFAULT_TIMELINE_AXIS_HEIGHT;
    _numberOfScrollAxisTicks = 10;
    _offsetAxis = DEFAULT_TIMELINE_AXIS_OFFSET;
    _scrollAxisColor = DEFAULT_AXIS_SCROLL_COLOR;
    _maxYPositionOfItem = 0;
    _changeIntervalSizeMode = false;
    _resizeObserver;
    _displayedItems = [];

    // D3 selector
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
    }

    createHorizontalActivityTimeline(sortedItems) {
        this._sortedItems = sortedItems;

        // Set width to timeline div (screen)
        this._timelineWidth =
            this._activityTimeline.divHorizontalTimeline.clientWidth - 25;

        this.resetHorizontalTimeline();
        this.createTimelineScrollAxis();
        this.createTimeline();
        this.createTimelineAxis();
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

    get divHorizontalTimeline() {
        return this._activityTimeline.template.querySelector(
            '.avonni-activity-timeline__horizontal-timeline'
        );
    }

    get divTimelineAxisSelector() {
        return this._activityTimeline.template.querySelector(
            '.avonni-activity-timeline__horizontal-timeline-axis'
        );
    }

    get divTimelineItemsSelector() {
        return this._activityTimeline.template.querySelector(
            '.avonni-activity-timeline__horizontal-timeline-items'
        );
    }

    get divTimelineScroll() {
        return this._activityTimeline.template.querySelector(
            '.avonni-activity-timeline__horizontal-timeline-scrolling-container'
        );
    }

    get divTimelineScrollAxisSelector() {
        return this._activityTimeline.template.querySelector(
            '.avonni-activity-timeline__horizontal-timeline-scroll-axis'
        );
    }

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

    get scrollAxisMaxDate() {
        return this.findNextDate(this.maxDate, 4);
    }

    get scrollAxisMinDate() {
        return this.findNextDate(this.minDate, -1);
    }

    /**
     * Function that calculate the time scale for the horizontal activity timeline's time scroll axis. If we pass a date, it returns the corresponding x value. If we use invert, we can pass an x value to return date.
     * We add -1 and +4 to display all dates in interval
     */
    get scrollTimeScale() {
        return d3
            .scaleTime()
            .domain([this.scrollAxisMinDate, this.scrollAxisMaxDate])
            .range([this._offsetAxis, this._timelineWidth]);
    }

    /**
     * Function that calculate the time scale for the horizontal activity timeline's time axis. If we pass a date, it returns the corresponding x value. If we use invert, we can pass an x value to return date.
     * We add +/- 1 to view all interval
     */
    get viewTimeScale() {
        return d3
            .scaleTime()
            .domain([
                this.findNextDate(this._intervalMinDate, -1),
                this.findNextDate(this._intervalMaxDate, 1)
            ])
            .range([this._offsetAxis, this._timelineWidth]);
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    addItemsToScrollAxis() {
        // <--- CREATE RECT ON SCROLL AXIS TO REPRESENT DATA --->
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

        // DRAW RECT FOR EACH DATE
        this._scrollAxisSVG
            .append('g')
            .selectAll('rect')
            .data(itemsToDisplay)
            .enter()
            .append('rect')
            .attr('x', (item) =>
                this.scrollTimeScale(new Date(item.datetimeValue))
            ) // POSITION DU DATA (X)
            .attr('y', (item) => item.yPosition)
            .attr('width', SCROLL_ITEM_RECTANGLE_WIDTH)
            .attr('height', 3)
            .attr('fill', this._scrollAxisColor);
    }

    addItemsToTimeline(dataToDisplay) {
        //  <--- CREATE EACH ITEM --->
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

    addTimeIntervalToScrollAxis() {
        // < --- CREATE INTERVAL RECTANGLE -->
        this._timeIntervalSelector = this._scrollAxisSVG
            .append('g')
            .append('rect')
            .attr('x', this.scrollTimeScale(new Date(this._intervalMinDate)))
            .attr('y', INTERVAL_RECTANGLE_OFFSET_Y)
            .attr('width', this.intervalWidth)
            .attr('height', this._timelineAxisHeight)
            .attr('opacity', 0.3)
            .attr('fill', this._scrollAxisColor)
            .call(d3.drag().on('drag', this.handleTimeIntervalDrag.bind(this)))
            .on('click', this.handleClickOnInterval.bind(this));

        // <--- CREATE LEFT AND RIGHT LINE TO CHANGE WIDTH OF INTERVAL -->
        this._leftIntervalLine = this._scrollAxisSVG
            .append('line')
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
            return ' - ' + item.title.slice(0, MAX_LENGTH_TITLE_ITEM) + ' ... ';
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

    // Create item on horizontal timeline to display lightning icon and item's title
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
                    iconInformation.categoryIconClass +
                    iconInformation.iconName.replaceAll('_', '-')
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

        // Method to calculate the text width
        // console.log(itemText.node().getComputedTextLength());        /// *****************
    }

    /**
     * Create horizontal view timeline
     */
    createTimeline() {
        // Calculate each items y position and set timeline height
        const dataToDisplay = this.setYPositionOfItems(
            this.displayedItems,
            Y_START_POSITION_TIMELINE_ITEM,
            Y_GAP_BETWEEN_ITEMS_TIMELINE
        );

        this._timelineHeight = Math.max(
            this._maxYPositionOfItem + 30,
            DEFAULT_TIMELINE_HEIGHT
        );

        // <--- CREATE NEW SVG FOR TIMELINE --->
        this._timelineSVG = this._timelineDiv
            .append('svg')
            .attr('width', this._timelineWidth)
            .attr('height', this._timelineHeight);

        this._timelineSVG
            .append('rect')
            .attr('x', this._offsetAxis)
            .attr('y', 0)
            .attr('width', this._timelineWidth - this._offsetAxis)
            .attr('height', this._timelineHeight)
            .attr('stroke', 'black')
            .attr('fill', 'white');

        //  <--- CREATE DASHED LINES ALIGN TO AXIS TICKS --->
        const axis = d3
            .axisBottom(this.viewTimeScale)
            .tickFormat(d3.timeFormat('%d/%m/%Y'))
            .ticks(9)
            .tickSizeInner(this._timelineHeight + this._timelineAxisHeight)
            .tickSizeOuter(0);
        this._timelineSVG
            .append('g')
            .attr('opacity', 0.15)
            .style('stroke-dasharray', '8 8')
            .call(axis);

        this.addItemsToTimeline(dataToDisplay);

        // Activate scroll only if needed
        if (this._timelineHeight > DEFAULT_TIMELINE_HEIGHT) {
            d3.select(this.divTimelineScroll).style('overflow', 'scroll');
        } else {
            d3.select(this.divTimelineScroll).style('overflow', 'hidden');
        }
    }

    /**
     * Create the axis below the horizontal timeline to display the min-max interval
     */
    createTimelineAxis() {
        const axisSVG = this._timelineAxisDiv
            .append('svg')
            .attr('width', this._timelineWidth)
            .attr('height', this._timelineAxisHeight * 2);

        // <--- CREATE RECT AROUND AXIS --->
        axisSVG
            .append('rect')
            .attr('x', this._offsetAxis)
            .attr('y', 0) // change position du rectangle blanc sous timeline
            .attr('width', this._timelineWidth - this._offsetAxis)
            .attr('height', 25)
            .attr('stroke', 'black')
            .attr('fill', 'white');

        // <--- CREATE TICKS OF AXIS --->
        const timeAxis = d3
            .axisBottom(this.viewTimeScale)
            .tickFormat(d3.timeFormat('%d/%m/%Y'))
            .ticks(9);
        axisSVG.append('g').call(timeAxis);

        // <--- REMOVE ALL TICK MARKS  --->
        axisSVG.selectAll('.tick').selectAll('line').remove();
    }

    /**
     * Create the scroll axis for horizontal timeline to display all dates
     */
    createTimelineScrollAxis() {
        // <--- CREATE TICKS OF SCROLL AXIS --->
        this._scrollAxisSVG = this._scrollAxisDiv
            .append('svg')
            .attr('width', this._timelineWidth)
            .attr('height', this._timelineAxisHeight * 2)
            .attr('transform', 'translate(0, -25)');

        const scrollAxis = d3
            .axisBottom(this.scrollTimeScale)
            .tickFormat(d3.timeFormat('%d/%m/%Y'))
            .ticks(12)
            .tickSizeOuter(0);

        this._scrollAxisSVG
            .append('g')
            .attr('transform', 'translate(0 ' + this._timelineAxisHeight + ')')
            .call(scrollAxis);

        // <--- CREATE RECT AROUND SCROLL AXIS --->
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

    findNextDate(date, dayIncrement) {
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + dayIncrement);
        return nextDate;
    }

    // Select and remove all elements inside the horizontal timeline to build a new one
    resetHorizontalTimeline() {
        this._maxYPositionOfItem = 0;

        // <--- SELECT AND REMOVE PREVIOUS TIMELINE --->
        this._timelineDiv = d3.select(this.divTimelineItemsSelector);
        this._timelineDiv.selectAll('*').remove();

        // <--- SELECT AND REMOVE PREVIOUS AXIS --->
        this._timelineAxisDiv = d3.select(this.divTimelineAxisSelector);
        this._timelineAxisDiv.selectAll('*').remove();

        this._scrollAxisDiv = d3.select(this.divTimelineScrollAxisSelector);
        this._scrollAxisDiv.selectAll('*').remove();
    }

    /**
     * Set the interval's min date to the middle datetime value of all items
     *
     */
    setDefaultIntervalDates() {
        const middleIndex = Math.ceil(this._sortedItems.length / 2 - 1);
        this._intervalMinDate = new Date(
            this._sortedItems[middleIndex].datetimeValue
        );
        this._intervalMinDate.setHours(0, 0, 0, 0);
        this.setIntervalMaxDate();
    }

    setIconInformation(iconName) {
        const iconInformation = {};

        // Set lightning icon informations according to its category
        if (iconName.match('standard:*')) {
            iconInformation.iconName = iconName.slice(
                'standard:'.length,
                iconName.length
            );
            iconInformation.xLinkHref = LWC_ICONS_XLINK_HREF.standard;
            iconInformation.categoryIconClass = LWC_ICONS_CLASS.standard;
        } else if (iconName.match('utility:*')) {
            iconInformation.iconName = iconName.slice(
                'utility:'.length,
                iconName.length
            );
            iconInformation.xLinkHref = LWC_ICONS_XLINK_HREF.utility;
            iconInformation.categoryIconClass = LWC_ICONS_CLASS.utility;
        } else if (iconName.match('doctype:*')) {
            iconInformation.iconName = iconName.slice(
                'doctype:'.length,
                iconName.length
            );
            iconInformation.xLinkHref = LWC_ICONS_XLINK_HREF.doctype;
            iconInformation.categoryIconClass = LWC_ICONS_CLASS.doctype;
        } else if (iconName.match('action:*')) {
            iconInformation.iconName = iconName.slice(
                'action:'.length,
                iconName.length
            );
            iconInformation.xLinkHref = LWC_ICONS_XLINK_HREF.action;
            iconInformation.categoryIconClass = LWC_ICONS_CLASS.action;
        } else if (iconName.match('custom:*')) {
            iconInformation.iconName = iconName.slice(
                'custom:'.length,
                iconName.length
            );
            iconInformation.xLinkHref = LWC_ICONS_XLINK_HREF.custom;
            iconInformation.categoryIconClass = LWC_ICONS_CLASS.custom;
        } else {
            iconInformation.iconName = 'default';
            iconInformation.xLinkHref = LWC_ICONS_XLINK_HREF.standard;
            iconInformation.categoryIconClass = LWC_ICONS_CLASS.standard;
        }
        iconInformation.xLinkHref += iconInformation.iconName;

        return iconInformation;
    }

    setIntervalMaxDate() {
        this._intervalMaxDate = new Date(this._intervalMinDate);
        this._intervalMaxDate.setDate(
            this._intervalMaxDate.getDate() + this._intervalDaysLength
        );
    }

    /**
     * Set the yPosition value of all items to prevent overlap of elements in horizontal timeline
     *
     * @returns array
     */
    setYPositionOfItems(items, yStartPosition, yGapBetweenItems) {
        // TODO - CALCULATE REAL LENGTH OF EACH ITEM
        const MAX_ITEM_LENGTH = 230;

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

            // To find max y position
            if (item.yPosition > this._maxYPositionOfItem) {
                this._maxYPositionOfItem = item.yPosition;
            }
        });

        return dataToDisplay;
    }

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

    // To handle click on scroll axis to change interval value
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

        // refresh view
        this._activityTimeline.renderedCallback();
    }

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

    // Handler function for mouse over and mouse out
    handleMouseOutOnItem() {
        d3.select(this.itemPopoverSelector).style('visibility', 'hidden');
        this._activityTimeline.handleItemMouseLeave();
    }

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

    handleTimeIntervalDrag(event) {
        if (!this._changeIntervalSizeMode) {
            // To allow only horizontal drag
            const xPosition = this.validateXMousePosition(
                event.sourceEvent.offsetX
            );
            this._timeIntervalSelector
                .attr('x', xPosition)
                .attr('y', INTERVAL_RECTANGLE_OFFSET_Y);

            // Refresh timeline view (renderedCallback() is called)
            this._intervalMinDate = this.scrollTimeScale
                .invert(xPosition)
                .setHours(0, 0, 0, 0);

            this.setIntervalMaxDate();
            this._activityTimeline.renderedCallback();
        }
    }

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

        // refresh view
        this._activityTimeline.renderedCallback();
    }

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
