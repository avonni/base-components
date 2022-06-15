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

import { createElement } from 'lwc';
import ActivityTimeline from '../activityTimeline';
import { HorizontalActivityTimeline } from '../horizontalActivityTimeline';
import {
    horizontalItemsTest,
    displayedItemsHorizontalTest
} from '../__docs__/data';

let element;
let activityTimeline;
describe('Activity Timeline', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        activityTimeline = createElement('avonni-activity-timeline', {
            is: ActivityTimeline
        });

        activityTimeline.items = horizontalItemsTest;
        activityTimeline.position = 'horizontal';
        document.body.appendChild(activityTimeline);
        element = new HorizontalActivityTimeline(
            activityTimeline,
            horizontalItemsTest
        );
    });

    it('Horizontal Activity Timeline: Default attributes', () => {
        expect(element._changeIntervalSizeMode).toBeFalsy();
        expect(element._dateFormat).toBe('dd/MM/yyyy');
        expect(element._intervalDaysLength).toBe(15);
        expect(element._offsetAxis).toBe(40);
        expect(element._displayedItems).toMatchObject([]);
        expect(element._maxYPositionOfItem).toBe(0);
        expect(element._numberOfScrollAxisTicks).toBe(10);
        expect(element._numberOfTimelineAxisTicks).toBe(9);
        expect(element._timelineWidth).toBe(1300);
        expect(element._timelineHeight).toBe(350);
        expect(element._timelineAxisHeight).toBe(30);
        expect(element._scrollAxisColor).toBe('#1c82bd');
        expect(element._requestHeightChange).toBeFalsy();
    });

    /* ----- ATTRIBUTES ----- */
    // Min and max interval dates. Min date should be the date of the middle index item and max date should be
    // 15 days (_intervalDaysLength) after min date
    it('Horizontal Activity Timeline: Interval min and max dates', () => {
        element.setDefaultIntervalDates();
        expect(element.intervalMinDate).toBe('02/02/2022');
        expect(element.intervalMaxDate).toBe('17/02/2022');
    });

    // displayedItems : only items with dates contained in interval dates values (02/02/2022 to 17/02/2022)
    it('Horizontal Activity Timeline: displayedItems', () => {
        expect(element.displayedItems.length).toBe(10);
        expect(element.displayedItems).toMatchObject(
            displayedItemsHorizontalTest
        );
    });

    // minDate and maxDate : first and last elements of sortedItems
    it('Horizontal Activity Timeline: minDate and maxDate', () => {
        expect(element.convertDateToFormat(element.minDate)).toBe('01/01/2022');
        expect(element.convertDateToFormat(element.maxDate)).toBe('14/03/2022');
    });

    // scrollAxisMaxDate (15 days after maxDate) and scrollAxisMinDate (5 days before minDate)
    it('Horizontal Activity Timeline: scrollAxisMaxDate and scrollAxisMinDate', () => {
        expect(element.convertDateToFormat(element.scrollAxisMinDate)).toBe(
            '27/12/2021'
        );
        expect(element.convertDateToFormat(element.scrollAxisMaxDate)).toBe(
            '29/03/2022'
        );
    });

    /* ----- METHODS ----- */
    // calculateDaysBetweenDates
    it('Horizontal Activity Timeline: calculateDaysBetweenDates', () => {
        const minDate = new Date(2022, 0, 4);
        const maxDate = new Date(2022, 3, 29);
        expect(element.calculateDaysBetweenDates(minDate, maxDate)).toBe(115);
    });

    // computedItemTitle
    it('Horizontal Activity Timeline: computedItemTitle', () => {
        expect(element.computedItemTitle(horizontalItemsTest[0])).toBe(
            'This is a message longer than  ...'
        );
    });

    // validateXMousePosition
    it('Horizontal Activity Timeline: validateXMousePosition', () => {
        const minPosition = 40;
        const maxPosition = 1094;
        const positionsSmallerThanMin = [-100, -40, 0, 10, 30, 39, 40];
        const positionsBiggerThanMax = [1094, 1095, 1100, 2000, 234234];
        const validPositions = [41, 59, 233, 425, 734, 923, 1093];

        for (const position of positionsSmallerThanMin) {
            expect(element.validateXMousePosition(position)).toBe(minPosition);
        }

        for (const position of positionsBiggerThanMax) {
            expect(Math.floor(element.validateXMousePosition(position))).toBe(
                maxPosition
            );
        }

        // Should be unchanged since the positions are all valid
        for (const position of validPositions) {
            expect(element.validateXMousePosition(position)).toBe(position);
        }
    });

    //setIconInformation : invalid icon category, default icon should be returned
    it('Horizontal Activity Timeline: setIconInformation', () => {
        const invalidIconCategoryNames = [
            'sandard:bot',
            'default:bot',
            'actions:bug',
            'standar:bot',
            'ulitity:answer',
            'doc:flash',
            'customs:custom54',
            ''
        ];
        const expectedIconInformation = {
            iconName: 'empty',
            xLinkHref: '/assets/icons/standard-sprite/svg/symbols.svg#empty',
            categoryIconClass: 'slds-icon-standard-empty'
        };

        for (const iconName of invalidIconCategoryNames) {
            expect(element.setIconInformation(iconName)).toMatchObject(
                expectedIconInformation
            );
        }
    });
});
