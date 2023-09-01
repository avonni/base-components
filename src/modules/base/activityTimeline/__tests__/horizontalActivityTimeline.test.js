

import { createElement } from 'lwc';
import ActivityTimeline from '../activityTimeline';
import { HorizontalActivityTimeline } from '../horizontalActivityTimeline';
import {
    horizontalItemsTest,
    displayedItemsHorizontalTest
} from '../__docs__/data';

let element;
let activityTimeline;
describe('Horizontal Activity Timeline', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        // Mock fetch method
        global.fetch = jest.fn(() =>
            Promise.resolve({
                response: () => {
                    return { status: 200, ok: true };
                },
                error: jest.fn(() => {})
            })
        );

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

        element.setIconLibraries = jest.fn(() => {});
    });

    it('Horizontal Activity Timeline: Default attributes', () => {
        expect(element._changeIntervalSizeMode).toBeFalsy();
        expect(element._dateFormat).toBe('dd/MM/yyyy');
        expect(element._intervalDaysLength).toBe(15);
        expect(element._offsetAxis).toBe(16.5);
        expect(element._displayedItems).toMatchObject([]);
        expect(element._maxYPositionOfItem).toBe(0);
        expect(element._numberOfTimelineAxisTicks).toBe(9);
        expect(element._timelineWidth).toBe(1300);
        expect(element._timelineHeight).toBe(350);
        expect(element._timelineAxisHeight).toBe(30);
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
        const defaultFormat = 'dd/MM/yyyy';
        expect(element.convertDateToFormat(element.minDate, defaultFormat)).toBe('01/01/2022');
        expect(element.convertDateToFormat(element.maxDate, defaultFormat)).toBe('14/03/2022');
    });

    // scrollAxisMaxDate (15 days after maxDate) and scrollAxisMinDate (15 days before minDate)
    it('Horizontal Activity Timeline: scrollAxisMaxDate and scrollAxisMinDate', () => {
        const defaultFormat = 'dd/MM/yyyy';
        expect(element.convertDateToFormat(element.scrollAxisMinDate, defaultFormat)).toBe(
            '17/12/2021'
        );
        expect(element.convertDateToFormat(element.scrollAxisMaxDate, defaultFormat)).toBe(
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
        jest.spyOn(element, 'intervalWidth', 'get').mockImplementation(
            () => 189
        );
        jest.spyOn(element, 'scrollAxisMaxDate', 'get').mockImplementation(
            () =>
                new Date(
                    'Tue Mar 29 2022 08:30:00 GMT-0400 (Eastern Daylight Saving Time)'
                )
        );
        jest.spyOn(element, 'scrollAxisMinDate', 'get').mockImplementation(
            () =>
                new Date(
                    'Fri Dec 17 2021 11:30:00 GMT-0500 (Eastern Standard Time)'
                )
        );
        const minPosition = 16.5;
        const maxPosition = 1111;
        const positionsSmallerThanMin = [-100, -40, 0, 10, 16, 16.5];
        const positionsBiggerThanMax = [1111, 1112, 1300, 2000, 234234];
        const validPositions = [17, 40, 233, 425, 734, 923, 1093];

        for (const position of positionsSmallerThanMin) {
            expect(element.validateXMousePosition(position)).toBe(minPosition);
        }

        for (const position of positionsBiggerThanMax) {
            expect(Math.ceil(element.validateXMousePosition(position))).toBe(
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
            category: 'standard',
            categoryIconClass: 'slds-icon-standard-empty slds-icon_small'
        };

        for (const iconName of invalidIconCategoryNames) {
            expect(element.setIconInformation(iconName)).toMatchObject(
                expectedIconInformation
            );
        }
    });

    // endIntervalResizing
    it('Horizontal Activity Timeline: endIntervalResizing', () => {
        element.setIntervalBoundsState = jest.fn();
        element.position = 'horizontal';
        element._isResizingInterval = true;
        element._changeIntervalSizeMode = true;
        element.endIntervalResizing();
        expect(element._isResizingInterval).toBeFalsy();
        expect(element._changeIntervalSizeMode).toBeFalsy();
    });

    // addValidItemsToData
    it('Horizontal Activity Timeline: addValidItemsToData with invalid dates', () => {
        element.position = 'horizontal';
        const invalidDateItems = [
            {
                name: 'item1',
                datetimeValue: '13/01/2022 11:30',  // invalid month
            },
            {
                name: 'item2',
                datetimeValue: 'Not a date',        // no date
            },
            {
                name: 'item3',
                datetimeValue: '',                  // empty input
            },
            {
                name: 'item4',
                datetimeValue: '01/32/2022 11:30',  // invalid day
            },
            {
                name: 'item5',
                datetimeValue: '01/01/-122',        // invalid  year
            },
            {
                name: 'item6',
                datetimeValue: '01/01/2000 40:02',  // invalid time
            },
            {
                name: 'item7',
                datetimeValue: null,                // null
            },
            {
                name: 'item8',                      // no date
            },
            {
                name: 'item9',
                datetimeValue: undefined,           // undefined
            },
        ];
        element.addValidItemsToData(invalidDateItems);
        expect(element._sortedItems.length).toBe(0);
    });
});
