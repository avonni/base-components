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

const DEFAULT_ITEM_ICON_SIZE = 'small';
const DEFAULT_DATE_FORMAT = 'dd/MM/yyyy';
const DEFAULT_INTERVAL_DAYS_LENGTH = 15;
const DEFAULT_INTERVAL_MIN_DATE = new Date(2022, 0, 1);

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
    _timelineWidth = 1300; // TO DO : Change to container width
    _timelineHeight = 300;
    _timelineAxisHeight = 30;
    _numberOfScrollAxisTicks = 10;
    _offsetAxis = 40;
    _scrollAxisColor = '#1c82bd';

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
        if (this.isTimelineHorizontal) this.findDefaultIntervalMinDate();
    }

    renderedCallback() {
        this.createTimelineScrollAxis();
        this.createTimeline();
        this.createTimelineAxis();

        // ONLY FOR TESTING AND LEARNING
        this.testingD3();
    }

    // AJOUT  - TESTING
    testingD3() {
        const divD3Testing = this.template.querySelector('.testing-d3');
        d3.select(divD3Testing).selectAll('*').remove();
        d3.select(divD3Testing).append('span').text('AJOUT DE TEXTE !!');
        d3.select(divD3Testing)
            .style('color', 'orange')
            .transition()
            .style('color', 'yellow')
            .duration(5000)
            .transition()
            .style('color', 'red')
            .duration(5000);

        // AJOUT DE DONNEES , data binding
        // d3.select(divD3Testing)
        //     .append('p')
        //     .selectAll('p')
        //     .data(['a', 'b', 'c'])
        //     .enter()
        //     .append('p')
        //     .text(function (d) {
        //         return d;
        //     });

        // TESTONS SCALE TIME
        // const svg = d3
        //     .select(divD3Testing)
        //     .append('svg')
        //     .attr('width', this._timelineWidth)
        //     .attr('height', this._timelineHeight);

        // const viewTimeScale = d3.scaleTime().domain([this._intervalMinDate, this._intervalMaxDate]).range([this._offsetAxis, this._timelineWidth]);
        // const scrollAxis = d3.axisBottom(viewTimeScale).tickFormat(d3.timeFormat("%d/%m/%Y")).ticks(6);

        // svg.append('g')
        //     .call(scrollAxis);
        // svg.
        // append("circle")
        // .attr("r", "5")
        // .attr("fill", "lightblue")
        // .attr("cx", viewTimeScale(new Date("2022-02-10 01:57:00")))
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

    /**
     * Calculate the numbers of days between the min and max dates in items
     *
     * @type {boolean}
     */
    get daysBetweenMinAndMax() {
        const conversionFactorFromMillisecondToDay = 1000 * 3600 * 24;
        return Math.ceil(
            (this.maxDate.getTime() - this.minDate.getTime()) /
                conversionFactorFromMillisecondToDay
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
            this._intervalMaxDate.getDate() + this._intervalDaysLength - 1
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

    // TODO: A CHANGER
    get viewTimeScale() {
        return d3
            .scaleTime()
            .domain([this._intervalMinDate, this._intervalMaxDate])
            .range([0, this._timelineWidth - 50]);
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

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
     * Create horizontal view timeline
     */
    createTimeline() {
        // <--- SELECT AND REMOVE PREVIOUS TIMELINE --->
        const timelineDiv = d3.select(
            this.template.querySelector(
                '.avonni-activity-timeline__horizontal-timeline-items'
            )
        );
        timelineDiv.selectAll('*').remove();

        // <--- CREATE NEW SVG FOR TIMELINE --->
        const timelineSVG = timelineDiv
            .append('svg')
            .attr('width', this._timelineWidth)
            .attr('height', this._timelineHeight)
            .attr('transform', 'translate(0, ' + 30 + ')');

        timelineSVG
            .append('rect')
            .attr('x', this._offsetAxis)
            .attr('y', 0)
            .attr('width', this._timelineWidth - this._offsetAxis - 10)
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
        timelineSVG
            .append('g')
            .attr('transform', 'translate(40, 0)')
            .attr('opacity', 0.15)
            .style('stroke-dasharray', '8 8')
            .call(axis);

        // TODO: Inserer des donnees aux bonnes positions
        // TODO: Creer nouveau svg pour distinguer les items ?
        const rectWidth = 20;
        const yItem = 75;

        // TODO: DISPLAY ICON INSTEAD OF RECT
        timelineSVG
            .append('g')
            .selectAll('rect')
            .data(this._displayedItems)
            .enter()
            .append('rect')
            .attr('x', (item) =>
                this.viewTimeScale(new Date(item.datetimeValue))
            ) // POSITION DU DATA (X)
            .attr('y', yItem) // TODO: CHANGE Y POSITION IF SAME DATES
            .attr('width', rectWidth)
            .attr('height', rectWidth)
            .attr('fill', this._scrollAxisColor);

        timelineSVG
            .append('g')
            .selectAll('text')
            .data(this._displayedItems)
            .enter()
            .append('text')
            .attr(
                'x',
                (item) =>
                    this.viewTimeScale(new Date(item.datetimeValue)) + rectWidth
            ) // POSITION DU DATA (X)
            .attr('y', yItem + rectWidth * 0.68) // TODO: CHANGE Y POSITION IF SAME DATES
            .text((item) => {
                return ' - ' + item.title;
            })
            .attr('fill', 'black');

        // TODO: Over permet d'afficher plus d'informations
    }

    /**
     * Create the axis below the horizontal timeline to display the min-max interval
     */
    createTimelineAxis() {
        // <--- SELECT AND REMOVE PREVIOUS AXIS --->
        const axisDiv = d3.select(
            this.template.querySelector(
                '.avonni-activity-timeline__horizontal-timeline-axis'
            )
        );
        axisDiv.selectAll('*').remove();

        const axisSVG = axisDiv
            .append('svg')
            .attr('width', this._timelineWidth)
            .attr('height', this._timelineAxisHeight * 2);

        // <--- CREATE RECT AROUND AXIS --->
        axisSVG
            .append('rect')
            .attr('x', this._offsetAxis)
            .attr('y', this._timelineAxisHeight)
            .attr('width', this._timelineWidth - this._offsetAxis - 10)
            .attr('height', 25)
            .attr('stroke', 'black')
            .attr('fill', 'white');

        // <--- CREATE TICKS OF AXIS --->
        const scrollAxis = d3
            .axisBottom(this.viewTimeScale)
            .tickFormat(d3.timeFormat('%d/%m/%Y'))
            .ticks(9);
        axisSVG
            .append('g')
            .attr(
                'transform',
                'translate(40, ' + this._timelineAxisHeight + ')'
            )
            .call(scrollAxis);

        // <--- REMOVE ALL TICK MARKS  --->
        axisSVG.selectAll('.tick').selectAll('line').remove();
    }

    /**
     * Create the scroll axis for horizontal timeline to display all dates
     */
    createTimelineScrollAxis() {
        const scrollAxisDiv = d3.select(
            this.template.querySelector(
                '.avonni-activity-timeline__horizontal-timeline-scroll-axis'
            )
        );
        scrollAxisDiv.selectAll('*').remove();

        // <--- CREATE TICKS OF SCROLL AXIS --->
        const scrollAxisSVG = scrollAxisDiv
            .append('svg')
            .attr('width', this._timelineWidth)
            .attr('height', this._timelineAxisHeight * 2);
        const domainDates = this.createTimelineDateDomain(
            this.minDate,
            this.daysBetweenMinAndMax / this._numberOfScrollAxisTicks,
            this._numberOfScrollAxisTicks
        );
        const xScale = d3
            .scaleBand()
            .domain(domainDates)
            .range([0, this._timelineWidth - 50]);
        const scrollAxis = d3.axisBottom(xScale).tickSizeOuter(0);
        scrollAxisSVG
            .append('g')
            .attr(
                'transform',
                'translate(' +
                    this._offsetAxis +
                    ', ' +
                    this._timelineAxisHeight +
                    ')'
            )
            .call(scrollAxis);

        // <--- CREATE RECT AROUND SCROLL AXIS --->
        scrollAxisSVG
            .append('rect')
            .attr('x', this._offsetAxis) // POSITION X -- TEMPS
            .attr('y', 1) // POSITION Y - GERER SI PLUSIEURS MEMES DATES
            .attr('width', this._timelineWidth - this._offsetAxis - 10) // longueur du rectangle du data
            .attr('height', this._timelineAxisHeight) // Hauteur du rectangle de data
            .attr('stroke', this._scrollAxisColor)
            .attr('fill', 'white');

        // <--- CREATE RECT ON SCROLL AXIS TO REPRESENT DATA --->

        // CALCULATE X AXIS VALUE
        const rectWidth = 5;
        const intervalSize =
            this._timelineWidth / (this._numberOfScrollAxisTicks + 3);
        const dividerFactor = 100000000000.0;
        let xDateData = [];

        const scaleFactor =
            (this._timelineWidth -
                2 * intervalSize +
                this._offsetAxis -
                rectWidth) /
            ((dateTimeObjectFrom(this.maxDate).toFormat('x') -
                dateTimeObjectFrom(this.minDate).toFormat('x')) /
                dividerFactor);

        this.sortedItems.forEach((item) => {
            const xValue =
                dateTimeObjectFrom(item.datetimeValue).toFormat('x') -
                dateTimeObjectFrom(this.minDate).toFormat('x');
            xDateData.push(
                (xValue / dividerFactor) * scaleFactor +
                    intervalSize -
                    rectWidth
            );
        });

        // DRAW RECT FOR EACH DATE
        scrollAxisSVG
            .append('g')
            .selectAll('rect')
            .data(xDateData)
            .enter()
            .append('rect')
            .attr('x', (x) => x) // POSITION DU DATA (X)
            .attr('y', 8) // TODO: CHANGE Y POSITION IF SAME DATES
            .attr('width', rectWidth)
            .attr('height', 3)
            .attr('fill', this._scrollAxisColor);

        // <--- DRAW VIEW INTERVAL (BLUE RECT) -->
        const xMinIntervalDate =
            ((dateTimeObjectFrom(this._intervalMinDate).toFormat('x') -
                dateTimeObjectFrom(this.minDate).toFormat('x')) /
                dividerFactor) *
                scaleFactor +
            intervalSize;
        const xMaxIntervalDate =
            ((dateTimeObjectFrom(this._intervalMaxDate).toFormat('x') -
                dateTimeObjectFrom(this.minDate).toFormat('x')) /
                dividerFactor) *
                scaleFactor +
            intervalSize;
        scrollAxisSVG
            .append('g')
            .append('rect')
            .attr('x', xMinIntervalDate) // Debut date min interval (valeur x convertie)
            .attr('y', 0.5)
            .attr('width', xMaxIntervalDate - xMinIntervalDate) // length of the interval
            .attr('height', this._timelineAxisHeight) // Hauteur du rectangle de data
            .attr('opacity', 0.3)
            .attr('fill', this._scrollAxisColor);

        // TODO: DRAG RECT TO CHANGE INTERVAL
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
        const dateToAdd = new Date(minDate);
        dateDomain.push(this.convertDateToFormat(dateToAdd));

        for (let i = 0; i < Math.floor(domainLength); ++i) {
            dateToAdd.setDate(dateToAdd.getDate() + dayIncrement);
            dateDomain.push(this.convertDateToFormat(dateToAdd));
        }

        return dateDomain;
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
