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

    // <-- HORIZONTAL TIMELINE -->
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
                '[data-element-id="avonni-activity-timeline__horizontal-timeline"] svg'
            );
            expect(createHorizontalTimelineSpy).toHaveBeenCalled();
            expect(timelineContainer).toBeDefined();
            expect(element.maxVisibleItems).toBe(10);
        });
    });

    it('Activity Timeline: horizontal - itemclick', () => {
        element.items = horizontalItemsTest;
        element.position = 'horizontal';

        return Promise.resolve().then(() => {
            const timelineItemsSVG = element.shadowRoot.querySelector(
                '[data-element-id="avonni-horizontal-activity-timeline__timeline-items-svg"]'
            );
            const itemSVGGroup = timelineItemsSVG.querySelector(
                '#timeline-item-item4'
            );

            const handler = jest.fn();
            itemSVGGroup.addEventListener('itemclick', handler);
            const clickEvent = new MouseEvent('click');
            jest.spyOn(clickEvent, 'target', 'get').mockImplementation(
                () => itemSVGGroup
            );
            itemSVGGroup.dispatchEvent(clickEvent);

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.name).toBe('item4');
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    it('Activity Timeline: horizontal - click on close button of popover should not trigger itemclick', () => {
        SVGElement.prototype.getComputedTextLength = () => {
            return 100;
        };
        element.items = horizontalItemsTest;
        element.position = 'horizontal';
        let timelineItemsSVG;
        let item;

        return Promise.resolve()
            .then(() => {
                timelineItemsSVG = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-horizontal-activity-timeline__timeline-items-svg"]'
                );
                item = timelineItemsSVG.querySelector('#timeline-item-item8');
                item.dispatchEvent(new CustomEvent('mouseenter'));
            })
            .then(() => {
                timelineItemsSVG = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-horizontal-activity-timeline__timeline-items-svg"]'
                );
                item = timelineItemsSVG.querySelector('#timeline-item-item8');

                const closeButton = element.shadowRoot.querySelector(
                    '.slds-popover__close'
                );
                const handler = jest.fn();
                item.addEventListener('itemclick', handler);
                const clickEvent = new MouseEvent('click');
                jest.spyOn(clickEvent, 'target', 'get').mockImplementation(
                    () => closeButton
                );
                closeButton.dispatchEvent(clickEvent);
                expect(handler).not.toHaveBeenCalled();
            });
    });

    // displayedItems
    it('Activity Timeline: horizontal - displayedItems', () => {
        element.items = horizontalItemsTest;
        element.position = 'horizontal';

        return Promise.resolve().then(() => {
            const timelineItemsSVG = element.shadowRoot.querySelector(
                '[data-element-id="avonni-horizontal-activity-timeline__timeline-items-svg"]'
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
        const handleMouseOverOnIntervalSpy = jest.spyOn(
            HorizontalActivityTimeline.prototype,
            'handleMouseOverOnInterval'
        );
        element.items = horizontalItemsTest;
        element.position = 'horizontal';

        return Promise.resolve().then(() => {
            // By default, edit mode should be disabled
            let editModeLines = element.shadowRoot.querySelectorAll(
                '.avonni-activity-timeline__horizontal-timeline-resize-cursor'
            );
            expect(editModeLines.length).toBe(0);

            // Mouse over : Activate edit mode
            const intervalRectangle = element.shadowRoot.querySelector(
                '[data-element-id="avonni-horizontal-activity-timeline__interval-group"]'
            );
            intervalRectangle.dispatchEvent(new CustomEvent('mouseover'));

            editModeLines = element.shadowRoot.querySelectorAll(
                '.avonni-activity-timeline__horizontal-timeline-resize-cursor'
            );
            expect(handleMouseOverOnIntervalSpy).toBeCalled();
            expect(editModeLines.length).toBe(2);

            // Mouse out : Cancel edit mode
            intervalRectangle.dispatchEvent(new CustomEvent('mouseout'));
            expect(cancelEditIntervalSizeModeSpy).toHaveBeenCalled();
            editModeLines = element.shadowRoot.querySelectorAll(
                '.avonni-activity-timeline__horizontal-timeline-resize-cursor'
            );
            expect(editModeLines.length).toBe(0);
        });
    });

    // Edit interval size mode : drag right interval line to change interval's width
    it('Activity Timeline: horizontal - edit mode - drag upper bound of interval rectangle', () => {
        const handleUpperBoundIntervalDragSpy = jest.spyOn(
            HorizontalActivityTimeline.prototype,
            'handleUpperBoundIntervalDrag'
        );
        const handleUpperBoundIntervalChangeSpy = jest.spyOn(
            HorizontalActivityTimeline.prototype,
            'handleUpperBoundIntervalChange'
        );

        element.items = horizontalItemsTest;
        element.position = 'horizontal';
        const initialIntervalPosition = '602.8452332242226';

        return Promise.resolve().then(() => {
            const intervalRectangle = element.shadowRoot.querySelector(
                '[data-element-id="avonni-horizontal-activity-timeline__time-interval-rectangle"]'
            );
            // Activate edit mode
            intervalRectangle.dispatchEvent(new CustomEvent('mouseover'));
            expect(intervalRectangle.getAttribute('x')).toBe(
                initialIntervalPosition
            );

            // Drag of left interval line
            const scrollAxisSVG = element.shadowRoot.querySelector(
                '[data-element-id="avonni-horizontal-activity-timeline__scroll-axis-svg"]'
            );
            const rightIntervalLine = scrollAxisSVG.querySelector(
                '#avonni-horizontal-activity-timeline__right-interval-line'
            );

            // To simulate drag --> mouse down, mouse move, mouse up events
            const mouseEvent = new MouseEvent('mousedown', { view: window });
            const sourceEvent = new MouseEvent('mousemove');
            sourceEvent.x = 0;
            const mouseUp = new MouseEvent('mouseup', { view: window });
            rightIntervalLine.dispatchEvent(mouseEvent);
            rightIntervalLine.dispatchEvent(sourceEvent);
            rightIntervalLine.dispatchEvent(mouseUp);

            expect(handleUpperBoundIntervalDragSpy).toBeCalled();
            expect(handleUpperBoundIntervalChangeSpy).toBeCalled();
            expect(intervalRectangle.getAttribute('x')).toBe(
                initialIntervalPosition
            );
            expect(intervalRectangle.getAttribute('width')).toBe('2');

            // Check the items displayed, the new interval should be : [02/02/2022, 03/02/2022[
            const itemsAfterDrag = [
                {
                    name: 'item4',
                    title: 'Item',
                    datetimeValue: '02/02/2022 2:00',
                    href: '#',
                    iconName: 'standard:bot',
                    hasCheckbox: false,
                    hasError: true
                },
                {
                    name: 'item5',
                    title: 'Another item',
                    datetimeValue: '02/02/2022 3:30',
                    href: '#',
                    iconName: 'standard:solution',
                    hasCheckbox: false,
                    hasError: true
                },
                {
                    name: 'item6',
                    title: 'Another item with same date',
                    datetimeValue: '02/02/2022 5:30',
                    href: '#',
                    iconName: 'custom:custom74',
                    hasCheckbox: false,
                    hasError: true
                },
                {
                    name: 'item7',
                    title: 'Another item',
                    datetimeValue: '02/02/2022 08:30',
                    href: '#',
                    iconName: 'standard:education',
                    hasCheckbox: true,
                    hasError: false
                },
                {
                    name: 'item8',
                    title: 'Magic item',
                    datetimeValue: '02/02/2022 10:45',
                    href: '#',
                    iconName: 'standard:thanks',
                    hasCheckbox: true,
                    hasError: false
                },
                {
                    name: 'item9',
                    title: 'Another item',
                    datetimeValue: '02/02/2022 20:30',
                    href: '#',
                    iconName: 'standard:lead',
                    hasCheckbox: true,
                    hasError: false
                }
            ];

            const timelineSVG = element.shadowRoot.querySelector(
                '[data-element-id="avonni-horizontal-activity-timeline__timeline-items-svg"]'
            );
            expect(timelineSVG.querySelectorAll('foreignObject').length).toBe(
                itemsAfterDrag.length
            );

            for (const item of itemsAfterDrag) {
                const itemElement = timelineSVG.querySelector(
                    '#timeline-item-' + item.name
                );
                expect(itemElement).toBeDefined();
                const title = itemElement.querySelector('text');
                expect(title.textContent).toBe(item.title);
            }
        });
    });

    // Edit interval size mode : drag left interval line to change interval's width
    it('Activity Timeline: horizontal - edit mode - drag lower bound of interval rectangle', () => {
        const handleLowerBoundIntervalDragSpy = jest.spyOn(
            HorizontalActivityTimeline.prototype,
            'handleLowerBoundIntervalDrag'
        );
        const handleLowerBoundIntervalChangeSpy = jest.spyOn(
            HorizontalActivityTimeline.prototype,
            'handleLowerBoundIntervalChange'
        );

        element.items = horizontalItemsTest;
        element.position = 'horizontal';
        const dragPosition = '16.5';

        return Promise.resolve().then(() => {
            const intervalRectangle = element.shadowRoot.querySelector(
                '[data-element-id="avonni-horizontal-activity-timeline__time-interval-rectangle"]'
            );
            // Activate edit mode
            expect(intervalRectangle.getAttribute('x')).toBe(
                '602.8452332242226'
            );

            // drag of left interval line
            const scrollAxisSVG = element.shadowRoot.querySelector(
                '[data-element-id="avonni-horizontal-activity-timeline__scroll-axis-svg"]'
            );
            const leftIntervalLine = scrollAxisSVG.querySelector(
                '#avonni-horizontal-activity-timeline__left-interval-line'
            );

            // To simulate drag --> mouse down, mouse move, mouse up events
            const mouseEvent = new MouseEvent('mousedown', { view: window });
            const sourceEvent = new MouseEvent('mousemove');
            sourceEvent.x = dragPosition;
            const mouseUp = new MouseEvent('mouseup', { view: window });
            leftIntervalLine.dispatchEvent(mouseEvent);
            leftIntervalLine.dispatchEvent(sourceEvent);
            leftIntervalLine.dispatchEvent(mouseUp);

            expect(handleLowerBoundIntervalDragSpy).toBeCalled();
            expect(handleLowerBoundIntervalChangeSpy).toBeCalled();

            expect(intervalRectangle.getAttribute('x')).toBe(dragPosition);
            expect(intervalRectangle.getAttribute('width')).toBe(
                '775.4041530278232'
            );

            // Check the items displayed, the new interval should be : [27/12/2021, 17/02/2022]
            const itemsAfterDrag = [
                {
                    name: 'item1',
                    title: 'This is a message longer than  ...',
                    datetimeValue: '01/01/2022 11:30',
                    href: '#',
                    iconName: 'standard:skill',
                    hasCheckbox: true,
                    hasError: true
                },
                {
                    name: 'item2',
                    title: 'Another new item',
                    datetimeValue: '01/04/2022 10:30',
                    href: '#',
                    iconName: 'utility:frozen',
                    hasCheckbox: true,
                    hasError: false
                },
                {
                    name: 'item3',
                    title: 'This is another item to displa ...',
                    datetimeValue: '01/30/2022 2:00',
                    href: '#',
                    iconName: 'standard:reward',
                    hasCheckbox: false,
                    hasError: true
                }
            ];
            displayedItemsHorizontalTest.forEach((item) =>
                itemsAfterDrag.push(item)
            );

            const timelineSVG = element.shadowRoot.querySelector(
                '[data-element-id="avonni-horizontal-activity-timeline__timeline-items-svg"]'
            );
            expect(timelineSVG.querySelectorAll('foreignObject').length).toBe(
                itemsAfterDrag.length
            );

            for (const item of itemsAfterDrag) {
                const itemElement = timelineSVG.querySelector(
                    '#timeline-item-' + item.name
                );
                expect(itemElement).toBeDefined();
                const title = itemElement.querySelector('text');
                expect(title.textContent).toBe(item.title);
            }
        });
    });

    // Drag of interval rectangle
    it('Activity Timeline: horizontal - drag of interval rectangle', () => {
        const handleTimeIntervalDragSpy = jest.spyOn(
            HorizontalActivityTimeline.prototype,
            'handleTimeIntervalDrag'
        );
        const setIntervalMaxDateSpy = jest.spyOn(
            HorizontalActivityTimeline.prototype,
            'setIntervalMaxDate'
        );
        element.items = horizontalItemsTest;
        element.position = 'horizontal';
        const dragPosition = '1000';
        const initialXMinPosition = '602.8452332242226';

        return Promise.resolve().then(() => {
            const intervalRectangle = element.shadowRoot.querySelector(
                '[data-element-id="avonni-horizontal-activity-timeline__time-interval-rectangle"]'
            );
            expect(intervalRectangle.getAttribute('x')).toBe(
                initialXMinPosition
            );

            // To simulate drag --> mouse down, mouse move, mouse up events
            const sourceEvent = new MouseEvent('mousemove');
            sourceEvent.offsetX = dragPosition;
            const mouseDownEvent = new MouseEvent('mousedown', {
                view: window
            });
            jest.spyOn(mouseDownEvent, 'clientX', 'get').mockImplementation(
                () => initialXMinPosition
            );

            intervalRectangle.dispatchEvent(mouseDownEvent);
            intervalRectangle.dispatchEvent(sourceEvent);
            intervalRectangle.dispatchEvent(new MouseEvent('mouseup'));

            expect(handleTimeIntervalDragSpy).toBeCalled();
            expect(setIntervalMaxDateSpy).toBeCalled();
            expect(intervalRectangle.getAttribute('x')).toBe(dragPosition);

            // Check the items displayed, the new interval should be : [07/03/2022, 22/03/2022]
            const itemAfterDrag = {
                name: 'item14',
                title: 'Another item',
                datetimeValue: '03/14/2022 8:30',
                href: '#',
                iconName: 'custom:custom47',
                hasCheckbox: true,
                hasError: true
            };

            const timelineSVG = element.shadowRoot.querySelector(
                '[data-element-id="avonni-horizontal-activity-timeline__timeline-items-svg"]'
            );
            expect(timelineSVG.querySelectorAll('foreignObject').length).toBe(
                1
            );
            const item = timelineSVG.querySelector(
                '#timeline-item-' + itemAfterDrag.name
            );
            expect(item).toBeDefined();
            const title = item.querySelector('text');
            expect(title.textContent).toBe(itemAfterDrag.title);
        });
    });

    // Drag interval rectangle : if drag position is lower than minPosition, the interval rectangle is set to the minimum
    it('Activity Timeline: horizontal - drag of interval rectangle (min)', () => {
        const handleTimeIntervalDragSpy = jest.spyOn(
            HorizontalActivityTimeline.prototype,
            'handleTimeIntervalDrag'
        );
        element.items = horizontalItemsTest;
        element.position = 'horizontal';
        const initialXMinPosition = '602.8452332242226';

        return Promise.resolve().then(() => {
            const intervalRectangle = element.shadowRoot.querySelector(
                '[data-element-id="avonni-horizontal-activity-timeline__time-interval-rectangle"]'
            );
            expect(intervalRectangle.getAttribute('x')).toBe(
                initialXMinPosition
            );

            // To simulate drag --> mouse down, mouse move, mouse up events
            const sourceEvent = new MouseEvent('mousemove');
            sourceEvent.offsetX = 0;
            const mouseDownEvent = new MouseEvent('mousedown', {
                view: window
            });
            jest.spyOn(mouseDownEvent, 'clientX', 'get').mockImplementation(
                () => initialXMinPosition
            );

            intervalRectangle.dispatchEvent(mouseDownEvent);
            intervalRectangle.dispatchEvent(sourceEvent);
            intervalRectangle.dispatchEvent(new MouseEvent('mouseup'));

            expect(handleTimeIntervalDragSpy).toBeCalled();
            expect(intervalRectangle.getAttribute('x')).toBe('16.5');

            // Check the items displayed, the new interval should be : [27/12/2021, 01/01/2022]
            // No item should be displayed
            const timelineSVG = element.shadowRoot.querySelector(
                '[data-element-id="avonni-horizontal-activity-timeline__timeline-items-svg"]'
            );
            expect(timelineSVG.querySelectorAll('foreignObject').length).toBe(
                0
            );
        });
    });

    // Scroll disabled if all items can be displayed with preferred height
    it('Activity Timeline: horizontal - scroll disabled', () => {
        element.items = horizontalItemsTest;
        element.position = 'horizontal';
        element.maxVisibleItems = 15;

        return Promise.resolve().then(() => {
            const scrollingContainer = element.shadowRoot.querySelector(
                '[data-element-id="avonni-activity-timeline__horizontal-timeline-scrolling-container"]'
            );
            expect(scrollingContainer.style.overflowY).toBe('hidden');
        });
    });

    // Scroll: If the height of the timeline's svg is bigger than the height displayed
    it('Activity Timeline: horizontal - scroll', () => {
        element.items = horizontalItemsTest;
        element.position = 'horizontal';
        element.maxVisibleItems = 2;

        return Promise.resolve().then(() => {
            const scrollingContainer = element.shadowRoot.querySelector(
                '[data-element-id="avonni-activity-timeline__horizontal-timeline-scrolling-container"]'
            );
            expect(scrollingContainer.style.overflowY).toBe('scroll');
        });
    });

    // Click on scroll axis : click cannot go further than max position - intervalWidth
    it('Activity Timeline: horizontal - click on scroll axis (edit mode disabled, max position)', () => {
        element.items = horizontalItemsTest;
        element.position = 'horizontal';
        const clickPosition = '1150';
        const maxPositionForInterval = '1055.4705400981998';

        return Promise.resolve().then(() => {
            const intervalRectangle = element.shadowRoot.querySelector(
                '[data-element-id="avonni-horizontal-activity-timeline__time-interval-rectangle"]'
            );
            expect(intervalRectangle.getAttribute('x')).toBe(
                '602.8452332242226'
            );

            const scrollAxis = element.shadowRoot.querySelector(
                '[data-element-id="avonni-horizontal-activity-timeline__scroll-axis-rectangle"]'
            );
            const clickEvent = new MouseEvent('click');
            clickEvent.offsetX = clickPosition;
            scrollAxis.dispatchEvent(clickEvent);
            expect(intervalRectangle.getAttribute('x')).toBe(
                maxPositionForInterval
            );
        });
    });

    // Click on scroll axis: if edit mode of interval is disabled, click on scroll axis change interval rectangle's position
    it('Activity Timeline: horizontal - click on scroll axis (edit mode disabled)', () => {
        const handleClickOnScrollAxisSpy = jest.spyOn(
            HorizontalActivityTimeline.prototype,
            'handleClickOnScrollAxis'
        );

        element.items = horizontalItemsTest;
        element.position = 'horizontal';
        const newIntervalPosition = '810.9410801963995';
        const halfIntervalWidth = 189.0589198036006 / 2;

        return Promise.resolve().then(() => {
            const intervalRectangle = element.shadowRoot.querySelector(
                '[data-element-id="avonni-horizontal-activity-timeline__time-interval-rectangle"]'
            );
            expect(intervalRectangle.getAttribute('x')).toBe(
                '602.8452332242226'
            );

            const scrollAxis = element.shadowRoot.querySelector(
                '[data-element-id="avonni-horizontal-activity-timeline__scroll-axis-rectangle"]'
            );
            const clickEvent = new MouseEvent('click');
            clickEvent.offsetX = newIntervalPosition;
            scrollAxis.dispatchEvent(clickEvent);
            expect(handleClickOnScrollAxisSpy).toHaveBeenCalled();
            expect(Number(intervalRectangle.getAttribute('x'))).toBe(
                newIntervalPosition - halfIntervalWidth
            );
        });
    });

    // mouseover and mouseout on item
    it('Activity Timeline: horizontal - Mouseover on item', () => {
        const handleMouseOverOnItemSpy = jest.spyOn(
            HorizontalActivityTimeline.prototype,
            'handleMouseOverOnItem'
        );
        const handleMouseOutOnItemSpy = jest.spyOn(
            HorizontalActivityTimeline.prototype,
            'handleMouseOutOnItem'
        );
        SVGElement.prototype.getComputedTextLength = () => {
            return 100;
        };

        element.items = horizontalItemsTest;
        element.position = 'horizontal';
        let item;
        let popoverItem;

        return (
            Promise.resolve()
                // Get specific item to activate mouse over
                .then(() => {
                    const timelineSVG = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-horizontal-activity-timeline__timeline-items-svg"]'
                    );
                    item = timelineSVG.querySelector('#timeline-item-item8');
                    item.dispatchEvent(new CustomEvent('mouseenter'));
                })
                // Check if popover is present
                .then(() => {
                    popoverItem = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-horizontal-activity-timeline__item-popover"]'
                    );

                    expect(popoverItem.getAttribute('name')).toBe('item8');
                    expect(popoverItem.className).toBe(
                        'slds-nubbin_left slds-popover slds-popover_panel slds-is-absolute slds-p-bottom_x-small slds-p-top_xx-small slds-popover_medium slds-p-left_medium slds-p-right_x-small'
                    );
                    expect(handleMouseOverOnItemSpy).toHaveBeenCalled();

                    item.dispatchEvent(new CustomEvent('mouseleave'));
                    popoverItem.dispatchEvent(new CustomEvent('mouseenter'));
                    popoverItem.dispatchEvent(new CustomEvent('mouseleave'));
                })
                // Check if popover is absent
                .then(() => {
                    popoverItem = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-horizontal-activity-timeline__item-popover"]'
                    );
                    expect(handleMouseOutOnItemSpy).toHaveBeenCalled();
                    expect(popoverItem).toBeNull();
                })
        );
    });

    // mouseover on item - right position
    it('Activity Timeline: horizontal - Mouseover on item (right position)', () => {
        const convertPxSizeToNumberSpy = jest
            .spyOn(
                HorizontalActivityTimeline.prototype,
                'convertPxSizeToNumber'
            )
            .mockReturnValue(400);
        element.items = horizontalItemsTest;
        element.position = 'horizontal';
        let item;

        return Promise.resolve()
            .then(() => {
                // Set width
                element.position = 'vertical';
                const timelineContainer = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-activity-timeline__horizontal-timeline"]'
                );
                jest.spyOn(
                    timelineContainer,
                    'clientWidth',
                    'get'
                ).mockImplementation(() => 1600);
                element.position = 'horizontal';
            })
            .then(() => {
                // Get specific item to activate mouse over
                const timelineSVG = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-horizontal-activity-timeline__timeline-items-svg"]'
                );

                item = timelineSVG.querySelector('#timeline-item-item13');
                item.dispatchEvent(new CustomEvent('mouseenter'));
            })
            .then(() => {
                // Check if popover is present and has right position
                item.dispatchEvent(new CustomEvent('mouseenter'));
                const popoverItem = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-horizontal-activity-timeline__item-popover"]'
                );

                expect(popoverItem.getAttribute('name')).toBe('item13');
                expect(popoverItem.className).toBe(
                    'slds-nubbin_right-top slds-popover slds-popover_panel slds-is-absolute slds-p-bottom_x-small slds-p-top_xx-small slds-popover_medium slds-p-left_medium slds-p-right_x-small'
                );
                expect(convertPxSizeToNumberSpy).toBeCalled();
            });
    });

    // maxVisibleItems and height's change
    it('Activity Timeline: horizontal - maxVisibleItems and height of timeline', () => {
        const isHeightDifferentSpy = jest.spyOn(
            HorizontalActivityTimeline.prototype,
            'isHeightDifferent'
        );
        const setVisibleTimelineHeightSpy = jest.spyOn(
            HorizontalActivityTimeline.prototype,
            'setVisibleTimelineHeight'
        );
        element.items = horizontalItemsTest;
        element.position = 'horizontal';
        element.maxVisibleItems = 4;

        return Promise.resolve().then(() => {
            const scrollingContainer = element.shadowRoot.querySelector(
                '[data-element-id="avonni-activity-timeline__horizontal-timeline-scrolling-container"]'
            );

            expect(scrollingContainer.style.height).toBe('127px');
            expect(isHeightDifferentSpy).toBeCalled();
            expect(setVisibleTimelineHeightSpy).toBeCalled();
        });
    });

    // maxVisibleItems and height's change - if maxVisibleItems is bigger than maximum number of items displayed, height is set with the maximum number of items
    // Here, the maximum number of items is 8 (239px).
    it('Activity Timeline: horizontal - maxVisibleItems bigger than max number of items', () => {
        const isHeightDifferentSpy = jest.spyOn(
            HorizontalActivityTimeline.prototype,
            'isHeightDifferent'
        );
        const setVisibleTimelineHeightSpy = jest.spyOn(
            HorizontalActivityTimeline.prototype,
            'setVisibleTimelineHeight'
        );
        element.items = horizontalItemsTest;
        element.position = 'horizontal';
        element.maxVisibleItems = 30;

        return Promise.resolve().then(() => {
            const scrollingContainer = element.shadowRoot.querySelector(
                '[data-element-id="avonni-activity-timeline__horizontal-timeline-scrolling-container"]'
            );

            expect(scrollingContainer.style.height).toBe('239px');
            expect(isHeightDifferentSpy).toBeCalled();
            expect(setVisibleTimelineHeightSpy).toBeCalled();
        });
    });

    // yPosition of items : No item displayed should overlap even if items share the same date
    it('Activity Timeline: horizontal - yPositions of items with same date of overlapping', () => {
        const expectedYPositions = [
            '10',
            '38',
            '66',
            '94',
            '122',
            '150',
            '178',
            '206',
            '234',
            '262',
            '290',
            '318',
            '10',
            '10'
        ];
        const itemsWithSameDate = [
            {
                name: 'item15',
                title: 'Item 15 title',
                datetimeValue: '02/02/2022 3:00',
                href: '#',
                iconName: 'standard:bot',
                hasCheckbox: false,
                hasError: false
            },
            {
                name: 'item16',
                title: 'Item 16 title',
                datetimeValue: '02/02/2022 3:00',
                href: '#',
                iconName: 'standard:solution',
                hasCheckbox: false,
                hasError: false
            },
            {
                name: 'item17',
                title: 'Item 17 title',
                datetimeValue: '02/02/2022 9:30',
                href: '#',
                iconName: 'custom:custom74',
                hasCheckbox: false,
                hasError: true
            },
            {
                name: 'item18',
                title: 'Item 18 title',
                datetimeValue: '02/02/2022 6:30',
                href: '#',
                iconName: 'custom:custom74',
                hasCheckbox: false,
                hasError: true
            }
        ];

        horizontalItemsTest.forEach((item) => itemsWithSameDate.push(item));
        element.items = itemsWithSameDate;
        element.position = 'horizontal';
        element.maxVisibleItems = 30;

        return Promise.resolve().then(() => {
            const timelineItemsSVG = element.shadowRoot.querySelector(
                '[data-element-id="avonni-horizontal-activity-timeline__timeline-items-svg"]'
            );
            const itemsDisplayed =
                timelineItemsSVG.querySelectorAll('foreignObject');
            expect(itemsDisplayed.length).toBe(14);

            for (let i = 0; i < itemsDisplayed.length; ++i) {
                expect(itemsDisplayed[i].getAttribute('y')).toBe(
                    expectedYPositions[i]
                );
            }
        });
    });

    // Change width of timeline
    it('Activity Timeline: horizontal - set width of timeline', () => {
        element.items = horizontalItemsTest;
        element.position = 'horizontal';

        return Promise.resolve()
            .then(() => {
                element.position = 'vertical';
                const timelineContainer = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-activity-timeline__horizontal-timeline"]'
                );
                jest.spyOn(
                    timelineContainer,
                    'clientWidth',
                    'get'
                ).mockImplementation(() => 2000);
                element.position = 'horizontal';
            })
            .then(() => {
                const timelineItemsSVG = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-horizontal-activity-timeline__timeline-items-svg"]'
                );
                expect(timelineItemsSVG.getAttribute('width')).toBe('2001');
            });
    });

    // ticks : Reduce timeline's width to check if ticks do not overlap
    it('Activity Timeline: horizontal - Number of ticks', () => {
        const timelineWidth = 880;
        const createTimeAxisSpy = jest.spyOn(
            HorizontalActivityTimeline.prototype,
            'createTimeAxis'
        );
        element.items = horizontalItemsTest;
        element.position = 'horizontal';

        return Promise.resolve()
            .then(() => {
                // The width of timeline container is reduced to change ticks
                element.position = 'vertical';
                const timelineContainer = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-activity-timeline__horizontal-timeline"]'
                );
                jest.spyOn(
                    timelineContainer,
                    'clientWidth',
                    'get'
                ).mockImplementation(() => timelineWidth);
                element.position = 'horizontal';
            })
            .then(() => {
                // Check if the width of the timeline was changed
                const timelineItemsSVG = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-horizontal-activity-timeline__timeline-items-svg"]'
                );
                expect(timelineItemsSVG.getAttribute('width')).toBe(
                    (timelineWidth + 1).toString()
                );
                expect(createTimeAxisSpy).toBeCalled();

                // Check if the number of ticks was change and if they are at least 50 units apart
                const axisSVG = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-horizontal-activity-timeline__timeline-axis-svg"]'
                );
                const tickPositions = [];
                for (const tick of axisSVG.querySelectorAll('.tick')) {
                    const transformValue = tick.getAttribute('transform');
                    tickPositions.push(
                        Number(
                            transformValue.slice(
                                'translate('.length,
                                transformValue.indexOf(',')
                            )
                        )
                    );
                }
                expect(tickPositions.length).toBe(9);
                for (let i = tickPositions.length - 1; i > 0; --i) {
                    expect(
                        tickPositions[i] - tickPositions[i - 1]
                    ).toBeGreaterThan(50);
                }
            });
    });

    // wheel event : positive deltaX (interval going right)
    // Note: intervalMinDate is always set to 0:0:0:0, so there is an offset in x position (initialIntervalPosition - deltaX - offset to set to start of the day)
    it('Activity Timeline: horizontal - event wheel with positive deltaX', () => {
        const handleWheelOnIntervalSpy = jest.spyOn(
            HorizontalActivityTimeline.prototype,
            'handleWheelOnInterval'
        );
        element.items = horizontalItemsTest;
        element.position = 'horizontal';
        const initialIntervalPosition = '602.8452332242226';
        const expectedPosition = '615.4491612111293';
        const deltaX = 20;
        let intervalRectangle;

        return Promise.resolve()
            .then(() => {
                intervalRectangle = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-horizontal-activity-timeline__time-interval-rectangle"]'
                );
                expect(intervalRectangle.getAttribute('x')).toBe(
                    initialIntervalPosition
                );

                let timelineContainer = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-activity-timeline__horizontal-timeline"]'
                );

                const wheelEvent = new CustomEvent('wheel');
                wheelEvent.deltaX = deltaX;
                wheelEvent.deltaY = 0;
                timelineContainer.dispatchEvent(wheelEvent);
            })
            .then(() => {
                intervalRectangle = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-horizontal-activity-timeline__time-interval-rectangle"]'
                );
                expect(handleWheelOnIntervalSpy).toHaveBeenCalled();
                expect(intervalRectangle.getAttribute('x')).toBe(
                    expectedPosition
                );
            });
    });

    // wheel event : negative deltaX (interval going left)
    it('Activity Timeline: horizontal - event wheel with negative deltaX', () => {
        const handleWheelOnIntervalSpy = jest.spyOn(
            HorizontalActivityTimeline.prototype,
            'handleWheelOnInterval'
        );
        element.items = horizontalItemsTest;
        element.position = 'horizontal';
        const initialIntervalPosition = '602.8452332242226';
        const expectedPosition = '527.2216653027824';
        const deltaX = -100;
        let intervalRectangle;

        return Promise.resolve()
            .then(() => {
                intervalRectangle = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-horizontal-activity-timeline__time-interval-rectangle"]'
                );
                expect(intervalRectangle.getAttribute('x')).toBe(
                    initialIntervalPosition
                );

                let timelineContainer = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-activity-timeline__horizontal-timeline"]'
                );

                const wheelEvent = new CustomEvent('wheel');
                wheelEvent.deltaX = deltaX;
                wheelEvent.deltaY = 0;
                timelineContainer.dispatchEvent(wheelEvent);
            })
            .then(() => {
                intervalRectangle = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-horizontal-activity-timeline__time-interval-rectangle"]'
                );
                expect(handleWheelOnIntervalSpy).toHaveBeenCalled();
                expect(intervalRectangle.getAttribute('x')).toBe(
                    expectedPosition
                );
            });
    });

    // wheel event : deltaY value with timeline to scroll
    it('Activity Timeline: horizontal - event wheel with deltaY value', () => {
        const handleWheelOnIntervalSpy = jest.spyOn(
            HorizontalActivityTimeline.prototype,
            'handleWheelOnInterval'
        );
        const isScrollingVerticallyOnTimelineSpy = jest
            .spyOn(
                HorizontalActivityTimeline.prototype,
                'isScrollingVerticallyOnTimeline'
            )
            .mockReturnValue(true);

        element.items = horizontalItemsTest;
        element.position = 'horizontal';
        const initialIntervalPosition = '602.8452332242226';
        const deltaX = -100;
        let intervalRectangle;

        return Promise.resolve()
            .then(() => {
                intervalRectangle = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-horizontal-activity-timeline__time-interval-rectangle"]'
                );
                expect(intervalRectangle.getAttribute('x')).toBe(
                    initialIntervalPosition
                );

                let timelineContainer = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-activity-timeline__horizontal-timeline"]'
                );
                const wheelEvent = new CustomEvent('wheel');
                wheelEvent.deltaX = deltaX;
                wheelEvent.deltaY = 10;
                timelineContainer.dispatchEvent(wheelEvent);
            })
            .then(() => {
                intervalRectangle = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-horizontal-activity-timeline__time-interval-rectangle"]'
                );
                expect(handleWheelOnIntervalSpy).toHaveBeenCalled();
                expect(isScrollingVerticallyOnTimelineSpy).toBeCalled();
                expect(intervalRectangle.getAttribute('x')).toBe(
                    initialIntervalPosition
                );
            });
    });
});
