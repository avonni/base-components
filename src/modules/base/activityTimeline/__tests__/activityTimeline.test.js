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
    actions,
    horizontalItemsTest,
    testItems,
    displayedItemsHorizontalTest
} from '../__docs__/data';

let element;
describe('Activity Timeline', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-activity-timeline', {
            is: ActivityTimeline
        });
        document.body.appendChild(element);
    });

    it('Activity Timeline: Default attributes', () => {
        expect(element.actions).toMatchObject([]);
        expect(element.closed).toBeFalsy();
        expect(element.collapsible).toBeFalsy();
        expect(element.groupBy).toBeUndefined();
        expect(element.iconName).toBeUndefined();
        expect(element.items).toMatchObject([]);
        expect(element.sortedDirection).toBe('desc');
        expect(element.title).toBeUndefined();
        expect(element.buttonShowLessIconName).toBeUndefined();
        expect(element.buttonShowLessIconPosition).toBe('left');
        expect(element.buttonShowLessLabel).toBe('Show less');
        expect(element.buttonShowMoreIconName).toBeUndefined();
        expect(element.buttonShowMoreIconPosition).toBe('left');
        expect(element.buttonShowMoreLabel).toBe('Show more');
        expect(element.buttonVariant).toBe('neutral');
        expect(element.position).toBe('vertical');
        expect(element.horizontalTimeline).toBeUndefined();
        expect(element.showItemPopOver).toBeFalsy();
        expect(element.selectedItem).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */
    // actions
    it('Activity Timeline: actions', () => {
        element.items = testItems;
        element.actions = actions;

        return Promise.resolve().then(() => {
            const timelineItems = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-activity-timeline-item"]'
            );

            expect(timelineItems.actions).toMatchObject(actions);
        });
    });

    // closed
    // needs to specify the group by to have sections
    it('Activity Timeline: closed', () => {
        element.items = testItems;
        element.groupBy = 'week';
        element.closed = true;

        return Promise.resolve().then(() => {
            const expandableSection = element.shadowRoot.querySelector(
                '[data-element-id="avonni-expandable-section"]'
            );
            expect(expandableSection.closed).toBeTruthy();
        });
    });

    // collapsible
    // needs to specify the group by to have sections
    it('Activity Timeline: collapsible', () => {
        element.items = testItems;
        element.groupBy = 'week';
        element.collapsible = true;

        return Promise.resolve().then(() => {
            const expandableSection = element.shadowRoot.querySelector(
                'c-expandable-section'
            );
            expect(expandableSection.collapsible).toBeTruthy();
        });
    });

    // group by
    it('Activity Timeline: group by undefined', () => {
        element.items = testItems;

        return Promise.resolve()
            .then(() => {})
            .then(() => {
                const expandableSection = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-expandable-section"]'
                );
                expect(expandableSection).toHaveLength(0);
            });
    });

    it('Activity Timeline: group by week', () => {
        element.items = testItems;
        element.groupBy = 'week';
        const firstSection = 'Upcoming';
        const secondSection = 'Week: 2, 2022';
        const thirdSection = 'Week: 21, 2021';

        return Promise.resolve().then(() => {
            const expandableSection = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-expandable-section"]'
            );
            expect(expandableSection).toHaveLength(3);
            expect(expandableSection[0].title).toBe(firstSection);
            expect(expandableSection[1].title).toBe(secondSection);
            expect(expandableSection[2].title).toBe(thirdSection);
        });
    });

    it('Activity Timeline: group by year', () => {
        element.groupBy = 'year';
        element.items = testItems;
        const firstSection = 'Upcoming';
        const secondSection = '2022';
        const thirdSection = '2021';

        return Promise.resolve().then(() => {
            const expandableSection = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-expandable-section"]'
            );
            expect(expandableSection).toHaveLength(3);
            expect(expandableSection[0].title).toBe(firstSection);
            expect(expandableSection[1].title).toBe(secondSection);
            expect(expandableSection[2].title).toBe(thirdSection);
        });
    });

    it('Activity Timeline: group by month', () => {
        element.groupBy = 'month';
        element.items = testItems;
        const firstSection = 'Upcoming';
        const secondSection = 'January 2022';
        const thirdSection = 'May 2021';

        return Promise.resolve().then(() => {
            const expandableSection = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-expandable-section"]'
            );
            expect(expandableSection).toHaveLength(3);
            expect(expandableSection[0].title).toBe(firstSection);
            expect(expandableSection[1].title).toBe(secondSection);
            expect(expandableSection[2].title).toBe(thirdSection);
        });
    });

    // icon name
    it('Activity Timeline: icon name', () => {
        element.iconName = 'standard:case';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-activity-timeline-icon"]'
            );
            expect(icon.iconName).toBe('standard:case');
        });
    });

    // icon size
    it('Activity Timeline: icon size (xx-small)', () => {
        element.iconName = 'standard:case';
        element.iconSize = 'xx-small';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-activity-timeline-icon"]'
            );
            expect(icon.size).toBe('xx-small');
        });
    });

    it('Activity Timeline: icon size (x-small)', () => {
        element.iconName = 'standard:case';
        element.iconSize = 'x-small';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-activity-timeline-icon"]'
            );
            expect(icon.size).toBe('x-small');
        });
    });

    it('Activity Timeline: icon size (small)', () => {
        element.iconName = 'standard:case';
        element.iconSize = 'small';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-activity-timeline-icon"]'
            );
            expect(icon.size).toBe('small');
        });
    });

    it('Activity Timeline: icon size (medium)', () => {
        element.iconName = 'standard:case';
        element.iconSize = 'medium';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-activity-timeline-icon"]'
            );
            expect(icon.size).toBe('medium');
        });
    });

    it('Activity Timeline: icon size (large)', () => {
        element.iconName = 'standard:case';
        element.iconSize = 'large';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-activity-timeline-icon"]'
            );
            expect(icon.size).toBe('large');
        });
    });

    // item icon size
    it('Activity Timeline: item icon size (xx-small)', () => {
        element.iconName = 'standard:case';
        element.itemIconSize = 'xx-small';

        return Promise.resolve().then(() => {
            const timelinesItems = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-activity-timeline-item"]'
            );
            timelinesItems.forEach((item) =>
                expect(item.iconSize).toBe('xx-small')
            );
        });
    });

    it('Activity Timeline: item icon size (x-small)', () => {
        element.iconName = 'standard:case';
        element.itemIconSize = 'x-small';

        return Promise.resolve().then(() => {
            const timelinesItems = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-activity-timeline-item"]'
            );
            timelinesItems.forEach((item) =>
                expect(item.iconSize).toBe('x-small')
            );
        });
    });

    it('Activity Timeline: item icon size (small)', () => {
        element.iconName = 'standard:case';
        element.itemIconSize = 'small';

        return Promise.resolve().then(() => {
            const timelinesItems = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-activity-timeline-item"]'
            );
            timelinesItems.forEach((item) =>
                expect(item.iconSize).toBe('small')
            );
        });
    });

    it('Activity Timeline: item icon size (medium)', () => {
        element.iconName = 'standard:case';
        element.itemIconSize = 'medium';

        return Promise.resolve().then(() => {
            const timelinesItems = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-activity-timeline-item"]'
            );
            timelinesItems.forEach((item) =>
                expect(item.iconSize).toBe('medium')
            );
        });
    });

    it('Activity Timeline: item icon size (large)', () => {
        element.iconName = 'standard:case';
        element.itemIconSize = 'large';

        return Promise.resolve().then(() => {
            const timelinesItems = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-activity-timeline-item"]'
            );
            timelinesItems.forEach((item) =>
                expect(item.iconSize).toBe('large')
            );
        });
    });

    // items
    it('Activity Timeline: items', () => {
        const ITEM = [
            {
                name: 'item1',
                title: 'Mobile conversation on Monday',
                description: 'You logged a call with Adam Chan',
                href: '#',
                datetimeValue: 1653141600000,
                iconName: 'standard:log_a_call',
                fields: [
                    {
                        label: 'Name',
                        value: 'Adam Chan',
                        type: 'url',
                        typeAttributes: {
                            label: 'Adam Chan'
                        }
                    },
                    {
                        label: 'Related To',
                        value: 'Tesla Cloudhub + Anypoint Connectors',
                        type: 'url',
                        typeAttributes: {
                            label: 'Tesla Cloudhub + Anypoint Connectors'
                        }
                    },
                    {
                        label: 'Description',
                        value: 'Adam seemed interested in closing this deal quickly! Let’s move.',
                        type: 'text'
                    }
                ]
            },
            {
                name: 'item2',
                title: 'Re: Mobile conversation on Monday with the new global team',
                description: 'You emailed Lea Chan',
                datetimeValue: 1619013600000,
                href: '#',
                isActive: true,
                icons: ['utility:groups', 'utility:attach'],
                fields: [
                    {
                        label: 'Name',
                        value: 'Jackie Dewar',
                        type: 'url',
                        typeAttributes: {
                            label: 'Jackie Dewar'
                        }
                    },
                    {
                        label: 'To Address',
                        value: 'Lea Chan',
                        type: 'url',
                        typeAttributes: {
                            label: 'Lea Chan'
                        }
                    },
                    {
                        label: 'Text Body',
                        value: 'Hi everyone, Thanks for meeting with the team today and going through the proposals we saw. This goes on and wraps if needed.',
                        type: 'text'
                    }
                ],
                buttonLabel: 'Public Sharing',
                buttonIconName: 'utility:world'
            }
        ];

        element.items = ITEM;
        return Promise.resolve().then(() => {
            const timelineItems = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-activity-timeline-item"]'
            );

            expect(timelineItems).toHaveLength(2);

            timelineItems.forEach((item, index) => {
                expect(item.title).toBe(ITEM[index].title);
                expect(item.description).toBe(ITEM[index].description);
                expect(item.datetimeValue).toBe(ITEM[index].datetimeValue);
                expect(item.href).toBe(ITEM[index].href);
                expect(item.iconName).toBe(ITEM[index].iconName);
                expect(item.fields).toMatchObject(ITEM[index].fields);
                expect(item.hasCheckbox).toBe(ITEM[index].hasCheckbox || false);
                expect(item.hasError).toBe(ITEM[index].hasError || false);
                expect(item.isLoading).toBe(ITEM[index].isLoading || false);
                expect(item.isActive).toBe(ITEM[index].isActive);
                expect(item.loadingStateAlternativeText).toBe(
                    ITEM[index].loadingStateAlternativeText
                );
                expect(item.closed).toBe(ITEM[index].closed || false);
                expect(item.buttonLabel).toBe(ITEM[index].buttonLabel);
                expect(item.buttonIconName).toBe(ITEM[index].buttonIconName);
                expect(item.buttonIconPosition).toBe(
                    ITEM[index].buttonIconPosition || 'left'
                );
                expect(item.buttonDisabled).toBe(
                    ITEM[index].buttonDisabled || false
                );
                expect(item.buttonVariant).toBe(
                    ITEM[index].buttonVariant || 'neutral'
                );
            });
        });
    });

    // max visible items
    it('Activity Timeline: right number of items displayed if maxVisibleItems is set', () => {
        element.items = testItems;
        element.maxVisibleItems = 1;
        return Promise.resolve().then(() => {
            const timelineItems = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-activity-timeline-item"]'
            );
            expect(timelineItems).toHaveLength(1);
            expect(
                element.shadowRoot.querySelectorAll(
                    '[data-element-id="lightning-button"]'
                )
            ).toHaveLength(1);
        });
    });

    it('Activity Timeline: if maxVisibleItems is equal to items.length, all elements are shown', () => {
        element.items = testItems;
        element.maxVisibleItems = testItems.length;
        return Promise.resolve().then(() => {
            const timelineItems = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-activity-timeline-item"]'
            );
            expect(timelineItems).toHaveLength(testItems.length);
            expect(
                element.shadowRoot.querySelectorAll(
                    '[data-element-id="lightning-button"]'
                )
            ).toHaveLength(0);
        });
    });

    // button show less icon position
    it('Activity Timeline: change button show less position to right', () => {
        element.items = testItems;
        element.buttonShowLessIconPosition = 'right';
        element.maxVisibleItems = 1;

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button"]'
                );
                button.click();
            })
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button"]'
                );
                expect(button.iconPosition).toBe('right');
            });
    });

    // button show more icon position
    it('Activity Timeline: change button show more position to right', () => {
        element.items = testItems;
        element.buttonShowMoreIconPosition = 'right';
        element.maxVisibleItems = 1;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.iconPosition).toBe('right');
        });
    });

    // button show less label
    it("Activity Timeline: click on show button should change button's label to show less", () => {
        element.items = testItems;
        element.buttonShowLessLabel = 'Show less';
        element.maxVisibleItems = 1;

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button"]'
                );
                button.click();
            })
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button"]'
                );
                expect(button.label).toBe('Show less');
            });
    });

    // button show more label
    it('Activity Timeline: show button should have label show more', () => {
        element.items = testItems;
        element.buttonShowLessLabel = 'Show less';
        element.buttonShowMoreLabel = 'Show more';
        element.maxVisibleItems = 1;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.label).toBe('Show more');
        });
    });

    // sorted direction
    it('Activity Timeline: sorted direction desc', () => {
        element.items = testItems;
        const firstDateContent = '05/21/2055';
        const secondDateContent = '05/21/2038';
        const thirdDateContent = '01/01/2022';
        const fourthDateContent = '05/21/2021';

        return Promise.resolve().then(() => {
            const firstDate = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-activity-timeline-item"]'
            )[0];
            const secondDate = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-activity-timeline-item"]'
            )[1];
            const thirdDate = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-activity-timeline-item"]'
            )[2];
            const fourthDate = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-activity-timeline-item"]'
            )[3];
            expect(firstDate.datetimeValue).toContain(firstDateContent);
            expect(secondDate.datetimeValue).toContain(secondDateContent);
            expect(thirdDate.datetimeValue).toContain(thirdDateContent);
            expect(fourthDate.datetimeValue).toContain(fourthDateContent);
        });
    });

    it('Activity Timeline: sorted direction asc', () => {
        element.items = testItems;
        element.sortedDirection = 'asc';
        const firstDateContent = '05/21/2021';
        const secondDateContent = '01/01/2022';
        const thirdDateContent = '05/21/2038';
        const fourthDateContent = '05/21/2055';

        return Promise.resolve().then(() => {
            const firstDate = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-activity-timeline-item"]'
            )[0];
            const secondDate = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-activity-timeline-item"]'
            )[1];
            const thirdDate = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-activity-timeline-item"]'
            )[2];
            const fourthDate = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-activity-timeline-item"]'
            )[3];
            expect(firstDate.datetimeValue).toContain(firstDateContent);
            expect(secondDate.datetimeValue).toContain(secondDateContent);
            expect(thirdDate.datetimeValue).toContain(thirdDateContent);
            expect(fourthDate.datetimeValue).toContain(fourthDateContent);
        });
    });

    // title
    it('Activity Timeline: title', () => {
        element.title = 'This is an title text';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '.slds-section__title'
            );
            expect(title.textContent).toBe('This is an title text');
        });
    });

    /* ----- EVENTS ----- */

    // check
    it('Activity Timeline: check event', () => {
        const ITEM = [
            {
                name: 'item1',
                title: 'Mobile conversation on Monday',
                description: 'You logged a call with Adam Chan',
                href: '#',
                datetimeValue: 1653141600000,
                iconName: 'standard:log_a_call'
            }
        ];
        element.items = ITEM;
        const handler = jest.fn();
        element.addEventListener('check', handler);

        return Promise.resolve().then(() => {
            const item = element.shadowRoot.querySelector(
                'c-primitive-activity-timeline-item'
            );
            item.dispatchEvent(
                new CustomEvent('check', {
                    detail: {
                        checked: true
                    }
                })
            );
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.checked).toBeTruthy();
            expect(handler.mock.calls[0][0].detail.targetName).toBe('item1');
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    it('Activity Timeline: button clicked event', () => {
        const ITEM = [
            {
                name: 'item1',
                title: 'Mobile conversation on Monday',
                description: 'You logged a call with Adam Chan',
                href: '#',
                datetimeValue: 1653141600000,
                iconName: 'standard:log_a_call',
                buttonLabel: 'button'
            }
        ];
        element.items = ITEM;

        const handler = jest.fn();
        element.addEventListener('buttonclick', handler);

        return Promise.resolve().then(() => {
            const item = element.shadowRoot.querySelector(
                'c-primitive-activity-timeline-item'
            );
            item.dispatchEvent(new CustomEvent('buttonclick'));
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.targetName).toBe('item1');
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    // action clicked
    it('Activity Timeline: action clicked event', () => {
        const ITEM = [
            {
                name: 'item1',
                title: 'Mobile conversation on Monday',
                description: 'You logged a call with Adam Chan',
                href: '#',
                datetimeValue: 1653141600000,
                iconName: 'standard:log_a_call'
            }
        ];
        element.items = ITEM;

        const handler = jest.fn();
        element.addEventListener('actionclick', handler);

        return Promise.resolve().then(() => {
            const item = element.shadowRoot.querySelector(
                'c-primitive-activity-timeline-item'
            );
            item.dispatchEvent(new CustomEvent('actionclick'));
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.targetName).toBe('item1');
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    // HORIZONTAL TIMELINE
    // position
    it('Activity Timeline: position', () => {
        const createHorizontalTimelineSpy = jest.spyOn(
            HorizontalActivityTimeline.prototype,
            'createHorizontalActivityTimeline'
        );
        element.title = 'Horizontal Activity Timeline';
        element.items = horizontalItemsTest;
        element.position = 'horizontal';

        return Promise.resolve().then(() => {
            const timelineContainer = element.shadowRoot.querySelectorAll(
                '.avonni-activity-timeline__horizontal-timeline svg'
            );

            // Fix : private
            //const timelineTitle = element.shadowRoot.querySelector('[data-element-id="avonni-activity-horizontal-timeline-title"]');
            // expect(timelineTitle.textContent).toBe('Showing : 02/02/2022 - 17/02/2022 • 15 day(s) • 10 item(s)');
            expect(createHorizontalTimelineSpy).toHaveBeenCalled();
            expect(timelineContainer).toBeDefined();
            expect(element.maxVisibleItems).toBe(10);
        });
    });

    // displayedItems
    it('Activity Timeline: horizontal - displayedItems', () => {
        element.items = horizontalItemsTest;
        element.position = 'horizontal';

        return Promise.resolve().then(() => {
            const timelineItemsSVG = element.shadowRoot.querySelector(
                '.avonni-horizontal-activity-timeline__timeline-items-svg'
            );

            for (const item of displayedItemsHorizontalTest) {
                const itemCategoryIcon = item.iconName.slice(
                    0,
                    item.iconName.indexOf(':')
                );
                const itemNameIcon = item.iconName.slice(
                    item.iconName.indexOf(':') + 1,
                    item.iconName.length
                );
                const itemSVGGroup = timelineItemsSVG.querySelector(
                    '#timeline-item-' + item.name
                );
                const itemIcon = itemSVGGroup.querySelector('span');

                expect(itemSVGGroup).toBeDefined();
                expect(itemSVGGroup.textContent).toContain(item.title);
                expect(itemIcon.className).toContain(
                    'slds-icon slds-icon_container slds-icon_small slds-grid slds-grid_vertical-align-center slds-icon-' +
                        itemCategoryIcon +
                        '-' +
                        itemNameIcon
                );
            }
        });
    });

    // changeIntervalSizeMode
    it('Activity Timeline: horizontal - changeIntervalSizeMode', () => {
        const cancelEditIntervalSizeModeSpy = jest.spyOn(
            HorizontalActivityTimeline.prototype,
            'cancelEditIntervalSizeMode'
        );
        const handleClickOnIntervalSpy = jest.spyOn(
            HorizontalActivityTimeline.prototype,
            'handleClickOnInterval'
        );
        element.items = horizontalItemsTest;
        element.position = 'horizontal';

        return Promise.resolve().then(() => {
            // By default, edit mode should be disabled
            let editModeLines = element.shadowRoot.querySelectorAll(
                '.avonni-activity-timeline__horizontal-timeline-resize-cursor'
            );
            expect(editModeLines.length).toBe(0);

            // First click : Activate edit mode
            const intervalRectangle = element.shadowRoot.querySelector(
                '.avonni-horizontal-activity-timeline__time-interval-rectangle'
            );
            intervalRectangle.dispatchEvent(new CustomEvent('click'));

            editModeLines = element.shadowRoot.querySelectorAll(
                '.avonni-activity-timeline__horizontal-timeline-resize-cursor'
            );
            expect(handleClickOnIntervalSpy).toBeCalled();
            expect(editModeLines.length).toBe(2);

            // Second click : Cancel edit mode
            intervalRectangle.dispatchEvent(new CustomEvent('click'));
            expect(cancelEditIntervalSizeModeSpy).toHaveBeenCalled();
            editModeLines = element.shadowRoot.querySelectorAll(
                '.avonni-activity-timeline__horizontal-timeline-resize-cursor'
            );
            expect(editModeLines.length).toBe(0);
        });
    });

    // Test : yPosition

    // Test :  mouseover on item

    // Test : Drag of interval

    // Test resize : this.divHorizontalTimeline - WIP
    // it('Activity Timeline: horizontal - Resize', () => {
    //     const setTimelineWidthSpy = jest.spyOn(HorizontalActivityTimeline.prototype, 'setTimelineWidth');
    //     element.items = horizontalItemsTest;
    //     element.position = 'horizontal';

    //     return Promise.resolve().then(() => {
    //         const timelineContainer = element.shadowRoot.querySelector(
    //             '.avonni-activity-timeline__horizontal-timeline');

    //         timelineContainer.width = 2040;
    //         // Object.defineProperty(timelineContainer, 'width', 'set', 2040);

    //         console.log(timelineContainer.getAttribute('width'));
    //         console.log(timelineContainer.getAttribute('clientWidth'));

    //         const timelineItemsSVG = element.shadowRoot.querySelector('.avonni-horizontal-activity-timeline__timeline-items-svg');

    //         expect(timelineItemsSVG.getAttribute('width')).toBe(2000);
    //         expect(setTimelineWidthSpy).toHaveBeenCalled();
    //     });
    // });

    // Test : maxVisibleItems and height's change
});
