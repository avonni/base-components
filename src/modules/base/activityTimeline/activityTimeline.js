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

import { LightningElement, api, track } from 'lwc';
import * as d3 from 'd3';
import {
    normalizeBoolean,
    normalizeString,
    normalizeArray,
    dateTimeObjectFrom
} from 'c/utilsPrivate';

const COLOR_CHANGE_INTERVAL_SIZE = '#084d75';
const DEFAULT_AXIS_SCROLL_COLOR = '#1c82bd';
const DEFAULT_ITEM_ICON_SIZE = 'small';
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

const GROUP_BY_OPTIONS = {
    valid: ['week', 'month', 'year'],
    default: undefined
};

const ICON_SIZES = {
    valid: ['xx-small', 'x-small', 'small', 'medium', 'large'],
    default: 'medium'
};

const POSITIONS = {
    valid: ['vertical', 'horizontal'],
    default: 'vertical'
};

const SORTED_DIRECTIONS = {
    valid: ['asc', 'desc'],
    default: 'desc'
};

// ** Functionalities/bug **
// TODO: Fix overlap of items at specific place (setYPosition) + consequences
// TODO: Scroll --> prevent scroll if no item to show
// TODO: Responsive size, or container width size instead of fixed

// ** QA/tests/Doc **
// TODO: Move horizontal timeline to new file
// TODO: Refactor
// TODO: Doc
// TODO: Tests

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
     * Title of the timeline, displayed in the header.
     *
     * @public
     * @type {string}
     */
    @api title;

    _actions = [];
    _closed = false;
    _collapsible = false;
    _groupBy = GROUP_BY_OPTIONS.default;
    _items = [];
    _iconSize = ICON_SIZES.default;
    _itemIconSize = DEFAULT_ITEM_ICON_SIZE;
    _position = POSITIONS.default;
    _sortedDirection = SORTED_DIRECTIONS.default;

    // Horizontal view properties
    _intervalMinDate = DEFAULT_INTERVAL_MIN_DATE;
    _intervalMaxDate;
    _intervalDaysLength = DEFAULT_INTERVAL_DAYS_LENGTH;
    _intervalIncrement = 2;
    _displayedItems = [];
    _dateFormat = DEFAULT_DATE_FORMAT;
    _timelineWidth = DEFAULT_TIMELINE_WIDTH; // TODO : Change to container width
    _timelineHeight = DEFAULT_TIMELINE_HEIGHT;
    _timelineAxisHeight = DEFAULT_TIMELINE_AXIS_HEIGHT;
    _numberOfScrollAxisTicks = 10;
    _offsetAxis = DEFAULT_TIMELINE_AXIS_OFFSET;
    _scrollAxisColor = DEFAULT_AXIS_SCROLL_COLOR;
    _maxYPositionOfItem = 0;
    _changeIntervalSizeMode = false;

    // D3 selector
    _timelineDiv;
    _timelineSVG;
    _scrollAxisSVG;
    _timeIntervalSelector;

    _key;
    _isConnected = false;
    _presentDates = [];
    _pastDates = [];
    _upcomingDates = [];

    showItemPopOver = false;
    selectedItem;

    @track orderedDates = [];

    connectedCallback() {
        this._isConnected = true;
        this.initActivityTimeline();
        if (this.isTimelineHorizontal) {
            this.findDefaultIntervalMinDate();
        }
    }

    renderedCallback() {
        this.createTimelineScrollAxis();
        this.createTimeline();
        this.createTimelineAxis();

        // ONLY FOR TESTING AND LEARNING
        this.testingD3();
    }

    // TESTING AND LEARNING FUNCTION
    testingD3() {
        // const minPosition = 100;
        // const maxPosition = 1000;
        d3.select(this.template.querySelector('.slds-section__title'))
            .style('color', 'orange')
            .transition()
            .style('color', 'yellow')
            .duration(3000)
            .transition()
            .style('color', 'red')
            .duration(3000)
            .transition()
            .style('color', 'purple')
            .transition()
            .duration(3000)
            .style('color', 'blue')
            .transition()
            .duration(3000)
            .style('color', 'green')
            .transition()
            .duration(3000);

        // const divD3Testing = d3.select(this.template.querySelector('.testing-d3'));
        // divD3Testing.selectAll('*').remove();
        // // // TESTING DRAG

        // const testSvg = divD3Testing.append('svg').attr('width', 1300).attr('height', 100);
        // testSvg.append('rect').attr('x', 0).attr('y',0).attr('width', 1300).attr('height', 100).attr('fill', 'goldenrod');

        // const nestedSVG = testSvg.append('svg').attr('width', 700).attr('height', 50).attr('x', 200).attr('y', 20);

        // // Testing nested svg - icon works, without container
        // nestedSVG.append('svg')
        //     .attr('x', '-100')
        //     .attr('y', 0)
        //     .append('use')
        //     .attr('xlink:href', '/assets/icons/standard-sprite/svg/symbols.svg#bot')
        //     .style('fill', 'purple');

        // // Test to create group with text + foreign object (span container and svg icon)
        // const testGroup = testSvg.append('g').attr('id', 'elementName');
        // const foreignObject = testGroup.append('foreignObject');
        // foreignObject.attr('width', 25)
        //             .attr('height', 25)
        //             .attr('x', 100)
        //             .attr('y', 20);
        // foreignObject.append("xhtml:span")
        // .attr(
        //     'class',
        //     'slds-icon slds-icon_container slds-icon_small slds-grid slds-grid_vertical-align-center slds-icon-standard-bot')
        //     .html('<svg class="slds-icon"><use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#bot"></use></svg>');

        // testGroup.append('text').attr('x', 130).attr('y', 35).text('Ceci est le titre de element');

        // testGroup
        //     .on('mouseover', function() {
        //         console.log('mouse over works');
        //     }).on('mouseout', function() {
        //         console.log('mouse out works');
        //     });

        //     // .transition().duration(2000).style('width', '300')
        //     // .transition().duration(2000).attr('x', '200')
        //     // .transition().duration(2000).attr('x', '100');
        // testSvg.append('rect').attr('x', this._offsetAxis + 100).attr('y',0).attr('width', 100).attr('height', 100).attr('fill', 'red');
        // testSvg.append('rect').attr('x', this._offsetAxis + 200).attr('y',0).attr('width', 100).attr('height', 100).attr('fill', 'orange');
        // testSvg.append('rect').attr('x', this._offsetAxis + 300).attr('y', 0).attr('width', 100).attr('height', 100).attr('fill', 'purple');
        // testSvg.append('rect').attr('x', this._offsetAxis + 400).attr('y',0).attr('width', 100).attr('height', 100).attr('fill', 'aqua');
        // testSvg.append('rect').attr('x', this._offsetAxis + 500).attr('y',0).attr('width', 100).attr('height', 100).attr('fill', 'black');
        // testSvg.append('rect').attr('x', this._offsetAxis + 600).attr('y', 0).attr('width', 100).attr('height', 100).attr('fill', 'goldenrod');
        // // testing
        //     .append('circle')
        //     .attr('id', 'dragCircle')
        //     .attr('r', 20)
        //     .attr('cx', 500)
        //     .attr('cy', 20)
        //     .attr('fill', '#abc432')
        //     .call(
        //         d3.drag().on('drag', function (event) {
        //             const xPosition =
        //                 event.x > maxPosition
        //                     ? maxPosition
        //                     : event.x < minPosition
        //                     ? minPosition
        //                     : event.x;
        //             d3.select(this).attr('cx', xPosition).attr('cy', 20);
        //         })
        //     );

        // TESTING SCALE TIME
        // const svg = divD3Testing
        //     .append('svg')
        //     .attr('width', this._timelineWidth)
        //     .attr('height', this._timelineHeight);

        // const temporaryThis = this;
        // // const viewTimeScale = d3.scaleTime().domain([this._intervalMinDate, this._intervalMaxDate]).range([this._offsetAxis, this._timelineWidth]);
        // const scrollAxis = d3.axisBottom(this.scrollTimeScale).tickFormat(d3.timeFormat("%d/%m/%Y")).ticks(12);
        // console.log(this.scrollTimeScale.invert(this._timelineWidth));
        // svg.append('g').call(scrollAxis).style('border', '1px red solid').attr('transform', 'translate(0, 0)')
        //     .on('click', function(event) {
        //         console.log(event.x);
        //         console.log(temporaryThis.convertDateToFormat(temporaryThis.scrollTimeScale.invert(event.x)));
        //     });
        // svg.
        // append("circle")
        // .attr("r", "5")
        // .attr("fill", "lightblue")
        // .attr("cx", this.scrollTimeScale(new Date("2022-01-01 01:57:00")))
        // .attr("cy", 5);
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Array of action objects. The actions are displayed at the top right of each item.
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
     * If present, the group sections are closed by default.
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
     * If present, the section is collapsible and the collapse icon is visible.
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
     * If present, the value will define how the items will be grouped. Valid values include week, month or year.
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
        this._items = normalizeArray(value);
        if (this._isConnected) this.initActivityTimeline();
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
     * The size of all the items' icon. Valid values are xx-small, x-small, small, medium and large.
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
     * Position of the activity timeline. Valid values include vertical and horizontal.
     *
     * @public
     * @type {string}
     * @default vertical
     */
    @api
    get position() {
        return this._position;
    }

    set position(value) {
        this._position = normalizeString(value, {
            fallbackValue: POSITIONS.default,
            validValues: POSITIONS.valid
        });
    }

    /**
     * If present, the value will define how the items will be grouped. Valid values include week, month or year.
     *
     * @public
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
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    get intervalWidth() {
        return Math.abs(
            this.scrollTimeScale(new Date(this._intervalMaxDate)) -
                this.scrollTimeScale(new Date(this._intervalMinDate))
        );
    }

    get divTimelineItemsSelector() {
        return this.template.querySelector(
            '.avonni-activity-timeline__horizontal-timeline-items'
        );
    }

    get divTimelineAxisSelector() {
        return this.template.querySelector(
            '.avonni-activity-timeline__horizontal-timeline-axis'
        );
    }

    get divTimelineScrollAxisSelector() {
        return this.template.querySelector(
            '.avonni-activity-timeline__horizontal-timeline-scroll-axis'
        );
    }

    get itemPopoverSelector() {
        return this.template.querySelector(
            '.avonni-activity-timeline__item-popover'
        );
    }

    /**
     * Select only items in min-max interval for horizontal view of the timeline
     *
     * @type {array}
     */
    get displayedItems() {
        this._displayedItems = this.sortedItems.filter((item) => {
            const date = new Date(item.datetimeValue);
            return (
                date >= this._intervalMinDate && date <= this._intervalMaxDate
            );
        });
        return this._displayedItems;
    }

    /**
     * Verify if dates exist.
     *
     * @type {boolean}
     */
    get hasDates() {
        return this.orderedDates.length > 0;
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
        this._intervalMaxDate = new Date(this._intervalMinDate);
        this._intervalMaxDate.setDate(
            this._intervalMaxDate.getDate() + this._intervalDaysLength
        );
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
     * Check if timeline's position is horizontal
     *
     * @type {boolean}
     */
    get isTimelineHorizontal() {
        return this.position === 'horizontal';
    }

    /**
     * Find the min date in items
     *
     * @type {Date}
     */
    get minDate() {
        const minIndex =
            this._sortedDirection === 'desc' ? this.sortedItems.length - 1 : 0;
        return new Date(this.sortedItems[minIndex].datetimeValue);
    }

    /**
     * Find the max date in items
     *
     * @type {Date}
     */
    get maxDate() {
        const maxIndex =
            this._sortedDirection === 'desc' ? 0 : this.sortedItems.length - 1;
        return new Date(this.sortedItems[maxIndex].datetimeValue);
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
     * Compute sortedItems and ungrouped array.
     */
    get sortedItems() {
        return this._sortedDirection === 'desc'
            ? [...this.items].sort(
                  (a, b) =>
                      new Date(b.datetimeValue) - new Date(a.datetimeValue)
              )
            : [...this.items].sort(
                  (a, b) =>
                      new Date(a.datetimeValue) - new Date(b.datetimeValue)
              );
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

    get scrollAxisMaxDate() {
        return this.findNextDate(this.maxDate, 4);
    }

    get scrollAxisMinDate() {
        return this.findNextDate(this.minDate, -1);
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

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
     * Set the yPosition value of all items to prevent overlap of elements in horizontal timeline
     *
     * @returns array
     */
    // TODO: fix bug at interval end
    setYPositionOfItems(items, yStartPosition, yGapBetweenItems) {
        // Set all items with startPosition as yPosition and sort them by date
        let dataToDisplay = items.map((element) => ({
            ...element,
            yPosition: yStartPosition
        }));
        dataToDisplay = [...dataToDisplay].sort(
            (a, b) => new Date(a.datetimeValue) - new Date(b.datetimeValue)
        );

        dataToDisplay.forEach((item, itemIndex) => {
            const itemDate = new Date(item.datetimeValue);
            const daysOverlapInterval = Math.ceil(this._intervalDaysLength / 5);

            // Find all elements in date range of item to prevent overlapping
            let foundElements = dataToDisplay.filter((element) => {
                const date = new Date(element.datetimeValue);
                return (
                    date >= itemDate &&
                    date <= this.findNextDate(itemDate, daysOverlapInterval)
                );
            });

            if (foundElements && foundElements.length > 0) {
                // Add vertical gap between each element
                foundElements.forEach((element, index) => {
                    if (element.name !== item.name) {
                        element.yPosition += yGapBetweenItems;
                    }

                    // To prevent two elements with the same date to have the same yPosition
                    if (
                        index > 0 &&
                        foundElements[index - 1].datetimeValue ===
                            element.datetimeValue &&
                        foundElements[index - 1].yPosition === element.yPosition
                    ) {
                        foundElements[index - 1].yPosition -= yGapBetweenItems;
                    }
                });

                // TODO: to improve
                if (
                    itemIndex > 1 &&
                    dataToDisplay[itemIndex - 2].yPosition ===
                        dataToDisplay[itemIndex - 1].yPosition
                ) {
                    dataToDisplay[itemIndex - 1].yPosition += yGapBetweenItems;
                    item.yPosition += yGapBetweenItems;
                }

                // To find max y position
                if (item.yPosition > this._maxYPositionOfItem) {
                    this._maxYPositionOfItem = item.yPosition;
                }
            }
        });
        return dataToDisplay;
    }

    /**
     * Create horizontal view timeline
     */
    createTimeline() {
        // <--- SELECT AND REMOVE PREVIOUS TIMELINE --->
        this._timelineDiv = d3.select(this.divTimelineItemsSelector);
        this._timelineDiv.selectAll('*').remove();

        // Calculate each items y position and set timeline height
        const dataToDisplay = this.setYPositionOfItems(
            this._displayedItems,
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

        // Set height of timeline items container to crop exceeding svg
        this._timelineDiv
            .style('height', this._timelineHeight + 'px')
            .style('overflow', 'hidden');
    }

    addItemsToTimeline(dataToDisplay) {
        // Handler function for mouse over and mouse out
        const handleMouseOutOnItem = function () {
            d3.select(this.itemPopoverSelector).style('visibility', 'hidden');
            this.handleItemMouseLeave();
        };

        const handleMouseOverOnItem = function (element, event) {
            this.showItemPopOver = true;
            this.selectedItem = element;

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
                .on('mouseout', handleMouseOutOnItem.bind(this));
        };

        //  <--- CREATE EACH ITEM --->
        dataToDisplay.forEach((item) => {
            const itemGroup = this._timelineSVG
                .append('g')
                .attr('id', 'timeline-item-' + item.name);
            this.createItem(itemGroup, item);

            itemGroup
                // TODO: change size to better fit popover content
                .on('mouseover', handleMouseOverOnItem.bind(this, item))
                .on('mouseout', handleMouseOutOnItem.bind(this, item));
        });
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
     * Create the axis below the horizontal timeline to display the min-max interval
     */
    createTimelineAxis() {
        // <--- SELECT AND REMOVE PREVIOUS AXIS --->
        const axisDiv = d3.select(this.divTimelineAxisSelector);
        axisDiv.selectAll('*').remove();

        const axisSVG = axisDiv
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
        const scrollAxisDiv = d3.select(this.divTimelineScrollAxisSelector);
        scrollAxisDiv.selectAll('*').remove();

        // <--- CREATE TICKS OF SCROLL AXIS --->
        this._scrollAxisSVG = scrollAxisDiv
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

        // To handle click on scroll axis to change interval value
        const handleClickOnScrollAxis = function (event) {
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
            }
        };

        // <--- CREATE RECT AROUND SCROLL AXIS --->
        this._scrollAxisSVG
            .append('rect')
            .attr('x', this._offsetAxis)
            .attr('y', 1)
            .attr('width', this._timelineWidth - this._offsetAxis)
            .attr('height', this._timelineAxisHeight)
            .attr('stroke', this._scrollAxisColor)
            .attr('fill', 'white')
            .on('click', handleClickOnScrollAxis.bind(this));

        this.addItemsToScrollAxis();
        this.addTimeIntervalToScrollAxis();
    }

    addItemsToScrollAxis() {
        // <--- CREATE RECT ON SCROLL AXIS TO REPRESENT DATA --->
        // To find y position of all items
        let itemsToDisplay = this.setYPositionOfItems(
            this.sortedItems,
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

    addTimeIntervalToScrollAxis() {
        // <--- DRAW VIEW INTERVAL (BLUE RECT) -->

        const handleTimeIntervalDrag = function (event) {
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
            }
        };

        const handleLowerBoundIntervalDrag = function (event) {
            if (this._changeIntervalSizeMode) {
                const minXPosition = this.scrollTimeScale(
                    this.scrollAxisMinDate
                );
                const maxXPosition = this.scrollTimeScale(
                    this._intervalMaxDate
                );
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
        };

        const handleLowerBoundIntervalChange = function () {
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
            this.renderedCallback();
        };

        const handleUpperBoundIntervalDrag = function (event) {
            if (this._changeIntervalSizeMode) {
                const minXPosition = this.scrollTimeScale(
                    this._intervalMinDate
                );
                const maxXPosition = this.scrollTimeScale(
                    this.scrollAxisMaxDate
                );
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
        };

        const handleUpperBoundIntervalChange = function () {
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
            this.renderedCallback();
        };

        const handleClickOnInterval = function () {
            this._changeIntervalSizeMode = !this._changeIntervalSizeMode;

            if (this._changeIntervalSizeMode) {
                this._timeIntervalSelector.attr(
                    'fill',
                    COLOR_CHANGE_INTERVAL_SIZE
                );

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
        };

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
            .call(d3.drag().on('drag', handleTimeIntervalDrag.bind(this)))
            .on('click', handleClickOnInterval.bind(this));

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
                    .on('drag', handleLowerBoundIntervalDrag.bind(this))
                    .on('end', handleLowerBoundIntervalChange.bind(this))
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
                    .on('drag', handleUpperBoundIntervalDrag.bind(this))
                    .on('end', handleUpperBoundIntervalChange.bind(this))
            );
    }

    cancelEditIntervalSizeMode() {
        this._changeIntervalSizeMode = false;
        this._timeIntervalSelector.attr('fill', this._scrollAxisColor);
        this._rightIntervalLine.style('opacity', 0).attr('class', '');
        this._leftIntervalLine.style('opacity', 0).attr('class', '');
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

    /**
     * Create a date domain that contains domainLength values, start at minDate and increment of dayIncrement days
     *
     * @param {Date} minDate
     * @param {number} dayIncrement
     * @param {number} domainLength
     * @returns array of date
     */
    createTimelineDateDomain(minDate, dayIncrement, domainLength) {
        const dateDomain = [];
        let dateToAdd = new Date(minDate);
        dateDomain.push(this.convertDateToFormat(dateToAdd));

        for (let i = 0; i < Math.floor(domainLength); ++i) {
            dateToAdd = this.findNextDate(dateToAdd, dayIncrement);
            dateDomain.push(this.convertDateToFormat(dateToAdd));
        }

        return dateDomain;
    }

    findNextDate(date, dayIncrement) {
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + dayIncrement);
        return nextDate;
    }

    /**
     * Set the interval's min date to the middle datetime value of all items
     *
     */
    findDefaultIntervalMinDate() {
        const middleIndex = Math.ceil(this.sortedItems.length / 2 - 1);
        this._intervalMinDate = new Date(
            this.sortedItems[middleIndex].datetimeValue
        );
        this._intervalMinDate.setHours(0, 0, 0, 0);
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
     * Sort the item dates by year, month, week.
     */
    sortDates() {
        this._upcomingDates = [];
        this._presentDates = [];
        this._pastDates = [];

        this.sortedItems.forEach((item) => {
            const date = new Date(item.datetimeValue);
            const dateYear = date.getFullYear();
            const today = new Date();
            const currentYear = today.getFullYear();
            const isUpcomingYear = dateYear > currentYear;
            const isPastYear = dateYear < currentYear;
            if (this._groupBy === 'month') {
                if (
                    (date.getMonth() > today.getMonth() && !isPastYear) ||
                    isUpcomingYear
                ) {
                    this._upcomingDates.push(item);
                } else if (
                    date.getMonth() === today.getMonth() &&
                    !isPastYear
                ) {
                    this._presentDates.push(item);
                } else {
                    this._pastDates.push(item);
                }
            } else if (this._groupBy === 'year') {
                if (isUpcomingYear) {
                    this._upcomingDates.push(item);
                } else if (isPastYear) {
                    this._pastDates.push(item);
                } else {
                    this._presentDates.push(item);
                }
            } else {
                if (
                    (this.getNumberOfWeek(date) > this.getNumberOfWeek(today) &&
                        !isPastYear) ||
                    isUpcomingYear
                ) {
                    this._upcomingDates.push(item);
                } else if (
                    this.getNumberOfWeek(date) ===
                        this.getNumberOfWeek(today) &&
                    !isPastYear
                ) {
                    this._presentDates.push(item);
                } else {
                    this._pastDates.push(item);
                }
            }
        });
    }

    /**
     * Create section's label for each group.
     */
    displayDates(array, isUpcoming) {
        return array.reduce((prev, cur) => {
            if (!isUpcoming) {
                const date = new Date(cur.datetimeValue);
                if (this._groupBy === 'month') {
                    this._key = `${date.toLocaleString('en-EN', {
                        month: 'long'
                    })} ${date.getFullYear()}`;
                } else if (this._groupBy === 'week') {
                    this._key = `Week: ${this.getNumberOfWeek(
                        date
                    )}, ${date.getFullYear()}`;
                } else if (this._groupBy === 'year') {
                    this._key = `${date.getFullYear()}`;
                }
            } else {
                this._key = 'Upcoming';
            }

            if (!prev[this._key]) {
                prev[this._key] = [cur];
            } else {
                prev[this._key].push(cur);
            }
            return prev;
        }, []);
    }

    /**
     * Regroup each groups in order.
     */
    regroupDates(array) {
        Object.keys(array).forEach((date) => {
            this.orderedDates.push({
                label: date,
                items: array[date]
            });
        });
    }

    /**
     * Group upcomingDates presentDates and beforeDates by year, month or week.
     */
    groupDates() {
        this.orderedDates = [];
        this._upcomingDates = this.displayDates(this._upcomingDates, true);
        this._presentDates = this.displayDates(this._presentDates, false);
        this._pastDates = this.displayDates(this._pastDates, false);

        this.regroupDates(this._upcomingDates);
        this.regroupDates(this._presentDates);
        this.regroupDates(this._pastDates);
    }

    /**
     * Component initialized states.
     */
    initActivityTimeline() {
        this.sortDates();
        this.groupDates();
    }

    /**
     * Handle the click on an action. Dispatch the actionclick event.
     *
     * @param {Event} event
     */
    handleActionClick(event) {
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
                detail: {
                    ...event.detail,
                    targetName: event.currentTarget.dataset.name
                }
            })
        );
    }

    handleButtonClick(event) {
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
                    targetName: event.currentTarget.dataset.name
                }
            })
        );
    }

    handleCheck(event) {
        event.stopPropagation();

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
                    checked: event.detail.checked,
                    targetName: event.currentTarget.dataset.name
                }
            })
        );
    }

    /**
     * Handle the mouse enter on item for horizontal view timeline.
     *
     * @param {Event} mouseEvent
     */
    handleItemMouseEnter(mouseEvent) {
        this.showItemPopOver = true;
        this.selectedItem = this.displayedItems.find((item) => {
            return (
                mouseEvent.target.getAttribute('data-element-id') === item.name
            );
        });
    }

    /**
     * Handle the mouse leave on item for horizontal view timeline.
     *
     */
    handleItemMouseLeave() {
        this.showItemPopOver = false;
        this.selectedItem = null;
    }
}
