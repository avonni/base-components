import { createElement } from 'lwc';
import {
    actions,
    displayedItemsHorizontalTest,
    horizontalItemsTest,
    testItems
} from '../__docs__/data';
import ActivityTimeline from '../activityTimeline';
import { HorizontalActivityTimeline } from '../horizontalActivityTimeline';

let element;
describe('Activity Timeline', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        HorizontalActivityTimeline.setIconLibraries = jest.fn(() => {});

        global.fetch = jest.fn(() =>
            Promise.resolve({
                response: () => {
                    return { status: 200, ok: true };
                },
                error: jest.fn(() => {})
            })
        );

        element = createElement('avonni-activity-timeline', {
            is: ActivityTimeline
        });

        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.actions).toMatchObject([]);
            expect(element.buttonShowLessIconName).toBeUndefined();
            expect(element.buttonShowLessIconPosition).toBe('left');
            expect(element.buttonShowLessLabel).toBe('Show less');
            expect(element.buttonShowMoreIconName).toBeUndefined();
            expect(element.buttonShowMoreIconPosition).toBe('left');
            expect(element.buttonShowMoreLabel).toBe('Show more');
            expect(element.buttonVariant).toBe('neutral');
            expect(element.closed).toBeFalsy();
            expect(element.collapsible).toBeFalsy();
            expect(element.enableInfiniteLoading).toBeFalsy();
            expect(element.fieldAttributes).toEqual({
                cols: 12,
                largeContainerCols: 4,
                mediumContainerCols: 6,
                smallContainerCols: 12,
                variant: null
            });
            expect(element.groupBy).toBeUndefined();
            expect(element.hideItemDate).toBeFalsy();
            expect(element.iconName).toBeUndefined();
            expect(element.intervalDaysLength).toBe(15);
            expect(element.isLoading).toBeFalsy();
            expect(element.itemDateFormat).toBe('LLLL dd, yyyy, t');
            expect(element.itemIconSize).toBe('small');
            expect(element.items).toMatchObject([]);
            expect(element.loadMoreOffset).toBe(20);
            expect(element.locale).toBe('en-GB');
            expect(element.maxVisibleItems).toBeUndefined();
            expect(element.orientation).toBe('vertical');
            expect(element.sortedDirection).toBe('desc');
            expect(element.timezone).toBeUndefined();
            expect(element.title).toBeUndefined();
        });

        describe('actions', () => {
            it('Passed to the component', () => {
                element.items = testItems;
                element.actions = actions;

                return Promise.resolve().then(() => {
                    const timelineItems = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-activity-timeline-item"]'
                    );

                    expect(timelineItems.actions).toMatchObject(actions);
                });
            });
        });

        describe('buttonShowLessIconPosition', () => {
            it('change button show less position to right', () => {
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
        });

        describe('buttonShowMoreIconPosition', () => {
            it('change button show more position to right', () => {
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
        });

        describe('buttonShowLessLabel', () => {
            it("click on show button should change button's label to show less", () => {
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
        });

        describe('buttonShowMoreLabel', () => {
            it('show button should have label show more', () => {
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
        });

        describe('buttonVariant', () => {
            it('show button should have label show more', () => {
                element.items = testItems;
                element.buttonVariant = 'neutral';
                element.maxVisibleItems = 1;

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button"]'
                    );
                    expect(button.label).toBe('Show more');
                    expect(button.variant).toBe('neutral');
                });
            });
        });

        describe('closed', () => {
            it('needs to specify the group by to have sections', () => {
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
        });

        describe('collapsible', () => {
            it('needs to specify the group by to have sections', () => {
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
        });

        describe('enableInfiniteLoading', () => {
            it('Passed to the component', () => {
                const handler = jest.fn();
                element.addEventListener('loadmore', handler);
                element.enableInfiniteLoading = true;

                expect(handler).toHaveBeenCalled();
            });
        });

        describe('fieldAttributes', () => {
            it('Passed to the component', () => {
                element.fieldAttributes = { cols: 12, largeContainerCols: 4 };

                return Promise.resolve().then(() => {
                    expect(element.fieldAttributes.cols).toBe(1);
                    expect(element.fieldAttributes.largeContainerCols).toBe(3);
                    expect(element.fieldAttributes.mediumContainerCols).toBe(1);
                    expect(element.fieldAttributes.smallContainerCols).toBe(1);
                });
            });
        });

        describe('groupBy', () => {
            it('Passed to the component', () => {
                element.items = testItems;

                return Promise.resolve().then(() => {
                    const expandableSection =
                        element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-expandable-section"]'
                        );
                    expect(expandableSection).toHaveLength(0);
                });
            });

            it('group by day', () => {
                element.items = testItems;
                element.groupBy = 'day';
                const firstSection = 'Upcoming';
                const secondSection = 'January 01, 2022';
                const thirdSection = 'May 21, 2021';

                return Promise.resolve().then(() => {
                    const expandableSection =
                        element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-expandable-section"]'
                        );
                    expect(expandableSection).toHaveLength(3);
                    expect(expandableSection[0].title).toBe(firstSection);
                    expect(expandableSection[1].title).toBe(secondSection);
                    expect(expandableSection[2].title).toBe(thirdSection);
                });
            });

            it('group by day, day-only items that are today are considered upcoming', () => {
                element.items = [
                    {
                        name: 'item1',
                        datetimeValue: new Date()
                            .toISOString()
                            .replace(/T.+/, '')
                    },
                    {
                        name: 'item2',
                        datetimeValue: new Date(
                            new Date().getTime() - 3600
                        ).toISOString()
                    }
                ];
                element.groupBy = 'day';

                return Promise.resolve().then(() => {
                    const expandableSections =
                        element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-expandable-section"]'
                        );
                    expect(expandableSections).toHaveLength(2);
                    const upcoming = Array.from(expandableSections).find(
                        (s) => s.title === 'Upcoming'
                    );
                    expect(upcoming).toBeTruthy();
                });
            });

            it('group by month', () => {
                element.groupBy = 'month';
                element.items = testItems;
                const firstSection = 'Upcoming';
                const secondSection = 'January 2022';
                const thirdSection = 'May 2021';

                return Promise.resolve().then(() => {
                    const expandableSection =
                        element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-expandable-section"]'
                        );
                    expect(expandableSection).toHaveLength(3);
                    expect(expandableSection[0].title).toBe(firstSection);
                    expect(expandableSection[1].title).toBe(secondSection);
                    expect(expandableSection[2].title).toBe(thirdSection);
                });
            });

            it('group by week', () => {
                element.items = testItems;
                element.groupBy = 'week';
                const firstSection = 'Upcoming';
                const secondSection = 'Week: 2, 2022';
                const thirdSection = 'Week: 21, 2021';

                return Promise.resolve().then(() => {
                    const expandableSection =
                        element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-expandable-section"]'
                        );
                    expect(expandableSection).toHaveLength(3);
                    expect(expandableSection[0].title).toBe(firstSection);
                    expect(expandableSection[1].title).toBe(secondSection);
                    expect(expandableSection[2].title).toBe(thirdSection);
                });
            });

            it('group by year', () => {
                element.groupBy = 'year';
                element.items = testItems;
                const firstSection = 'Upcoming';
                const secondSection = '2022';
                const thirdSection = '2021';

                return Promise.resolve().then(() => {
                    const expandableSection =
                        element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-expandable-section"]'
                        );
                    expect(expandableSection).toHaveLength(3);
                    expect(expandableSection[0].title).toBe(firstSection);
                    expect(expandableSection[1].title).toBe(secondSection);
                    expect(expandableSection[2].title).toBe(thirdSection);
                });
            });
        });

        describe('hideItemDate', () => {
            it('Passed to the component', () => {
                element.items = testItems;
                element.groupBy = 'week';
                element.itemDateFormat = 'dd LLL yyyy';
                element.hideItemDate = true;

                return Promise.resolve().then(() => {
                    const timelineItems = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-activity-timeline-item"]'
                    );
                    expect(timelineItems.dateFormat).toBeFalsy();
                });
            });
        });

        describe('isLoading', () => {
            it('Passed to the component', () => {
                element.isLoading = false;

                return Promise.resolve()
                    .then(() => {
                        const spinner = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-spinner"]'
                        );
                        expect(spinner).toBeFalsy();

                        element.isLoading = true;
                    })
                    .then(() => {
                        const spinner = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-spinner"]'
                        );
                        expect(spinner).toBeTruthy();
                    });
            });
        });

        describe('itemDateFormat', () => {
            it('Passed to the component', () => {
                element.items = testItems;
                element.groupBy = 'week';
                element.itemDateFormat = 'dd LLL yyyy';

                return Promise.resolve()
                    .then(() => {
                        const timelineItems = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-activity-timeline-item"]'
                        );
                        expect(timelineItems.dateFormat).toBe('dd LLL yyyy');

                        // Standard
                        element.itemDateFormat = 'DATETIME_MED';
                    })
                    .then(() => {
                        const timelineItems = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-activity-timeline-item"]'
                        );
                        expect(timelineItems.dateFormat).toBe('DATETIME_MED');
                    });
            });
        });

        describe('iconName', () => {
            it('Passed to the component', () => {
                element.iconName = 'standard:case';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-activity-timeline-icon"]'
                    );
                    expect(icon.iconName).toBe('standard:case');
                });
            });
        });

        describe('iconSize', () => {
            it('xx-small', () => {
                element.iconName = 'standard:case';
                element.iconSize = 'xx-small';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-activity-timeline-icon"]'
                    );
                    expect(icon.size).toBe('xx-small');
                });
            });

            it('x-small', () => {
                element.iconName = 'standard:case';
                element.iconSize = 'x-small';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-activity-timeline-icon"]'
                    );
                    expect(icon.size).toBe('x-small');
                });
            });

            it('small', () => {
                element.iconName = 'standard:case';
                element.iconSize = 'small';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-activity-timeline-icon"]'
                    );
                    expect(icon.size).toBe('small');
                });
            });

            it('medium', () => {
                element.iconName = 'standard:case';
                element.iconSize = 'medium';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-activity-timeline-icon"]'
                    );
                    expect(icon.size).toBe('medium');
                });
            });

            it('large', () => {
                element.iconName = 'standard:case';
                element.iconSize = 'large';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-activity-timeline-icon"]'
                    );
                    expect(icon.size).toBe('large');
                });
            });
        });

        describe('intervalDaysLength', () => {
            it('Passed to the component', () => {
                element.intervalDaysLength = 's';
                element.orientation = 'horizontal';

                return Promise.resolve().then(() => {
                    expect(element.intervalDaysLength).toBeUndefined();
                });
            });
        });

        describe('itemIconSize', () => {
            it('xx-small', () => {
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

            it('x-small', () => {
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

            it('small', () => {
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

            it('medium', () => {
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

            it('large', () => {
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
        });

        describe('items', () => {
            it('Passed to the component', () => {
                const ITEM = [
                    {
                        name: 'item1',
                        title: 'Mobile conversation on Monday',
                        description: 'You logged a call with Adam Chan',
                        href: '#',
                        datetimeValue: 1653141600000,
                        avatar: { fallbackIconName: 'standard:log_a_call' },
                        hasCheckbox: true,
                        checked: true,
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
                        expect(item.checked).toBe(ITEM[index].checked || false);
                        expect(item.description).toBe(ITEM[index].description);
                        expect(item.datetimeValue).toBe(
                            ITEM[index].datetimeValue
                        );
                        expect(item.href).toBe(ITEM[index].href);
                        expect(item.avatar?.fallbackIconName).toBe(
                            ITEM[index].avatar?.fallbackIconName
                        );
                        expect(item.fields).toMatchObject(ITEM[index].fields);
                        expect(item.hasCheckbox).toBe(
                            ITEM[index].hasCheckbox || false
                        );
                        expect(item.hasError).toBe(
                            ITEM[index].hasError || false
                        );
                        expect(item.isLoading).toBe(
                            ITEM[index].isLoading || false
                        );
                        expect(item.isActive).toBe(
                            ITEM[index].isActive || false
                        );
                        expect(item.loadingStateAlternativeText).toBe(
                            ITEM[index].loadingStateAlternativeText
                        );
                        expect(item.closed).toBe(ITEM[index].closed || false);
                        expect(item.buttonLabel).toBe(ITEM[index].buttonLabel);
                        expect(item.buttonIconName).toBe(
                            ITEM[index].buttonIconName
                        );
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

            it('day-only items dates are normalized', () => {
                element.items = [
                    {
                        name: 'item1',
                        datetimeValue: '2025-01-28'
                    },
                    {
                        name: 'item2',
                        title: 'Re: Mobile conversation on Monday with the new global team',
                        description: 'You emailed Lea Chan',
                        datetimeValue: '2025-01-28T10:30:00.00Z'
                    }
                ];

                return Promise.resolve().then(() => {
                    const timelineItems = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-activity-timeline-item"]'
                    );
                    expect(timelineItems[0].datetimeValue).toBe(
                        '2025-01-28T10:30:00.00Z'
                    );
                    expect(new Date(timelineItems[1].datetimeValue)).toEqual(
                        new Date(2025, 0, 28)
                    );
                });
            });

            it('items with deprecated iconName property', () => {
                const ITEM = [
                    {
                        name: 'item1',
                        title: 'Mobile conversation on Monday',
                        description: 'You logged a call with Adam Chan',
                        href: '#',
                        datetimeValue: 1653141600000,
                        iconName: 'standard:log_a_call',
                        hasCheckbox: true,
                        checked: true,
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
                        expect(item.checked).toBe(ITEM[index].checked || false);
                        expect(item.description).toBe(ITEM[index].description);
                        expect(item.datetimeValue).toBe(
                            ITEM[index].datetimeValue
                        );
                        expect(item.href).toBe(ITEM[index].href);
                        expect(item.avatar?.fallbackIconName).toBe(
                            ITEM[index].iconName
                        );
                        expect(item.fields).toMatchObject(ITEM[index].fields);
                        expect(item.hasCheckbox).toBe(
                            ITEM[index].hasCheckbox || false
                        );
                        expect(item.hasError).toBe(
                            ITEM[index].hasError || false
                        );
                        expect(item.isLoading).toBe(
                            ITEM[index].isLoading || false
                        );
                        expect(item.isActive).toBe(
                            ITEM[index].isActive || false
                        );
                        expect(item.loadingStateAlternativeText).toBe(
                            ITEM[index].loadingStateAlternativeText
                        );
                        expect(item.closed).toBe(ITEM[index].closed || false);
                        expect(item.buttonLabel).toBe(ITEM[index].buttonLabel);
                        expect(item.buttonIconName).toBe(
                            ITEM[index].buttonIconName
                        );
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

            describe('maxVisibleItems', () => {
                it('right number of items displayed if maxVisibleItems is set', () => {
                    element.items = testItems;
                    element.maxVisibleItems = 1;
                    return Promise.resolve().then(() => {
                        const timelineItems =
                            element.shadowRoot.querySelectorAll(
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

                it('if maxVisibleItems is equal to items.length, all elements are shown', () => {
                    element.items = testItems;
                    element.maxVisibleItems = testItems.length;
                    return Promise.resolve().then(() => {
                        const timelineItems =
                            element.shadowRoot.querySelectorAll(
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
            });

            describe('sortedDirection', () => {
                it('asc', () => {
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
                        expect(firstDate.datetimeValue).toContain(
                            firstDateContent
                        );
                        expect(secondDate.datetimeValue).toContain(
                            secondDateContent
                        );
                        expect(thirdDate.datetimeValue).toContain(
                            thirdDateContent
                        );
                        expect(fourthDate.datetimeValue).toContain(
                            fourthDateContent
                        );
                    });
                });
                it('desc', () => {
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
                        expect(firstDate.datetimeValue).toContain(
                            firstDateContent
                        );
                        expect(secondDate.datetimeValue).toContain(
                            secondDateContent
                        );
                        expect(thirdDate.datetimeValue).toContain(
                            thirdDateContent
                        );
                        expect(fourthDate.datetimeValue).toContain(
                            fourthDateContent
                        );
                    });
                });
            });

            describe('timezone', () => {
                it('Passed to the component', () => {
                    element.timezone = 'Pacific/Honolulu';
                    element.items = testItems;

                    return Promise.resolve().then(() => {
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-primitive-activity-timeline-item"]'
                        );
                        items.forEach((it) => {
                            expect(it.timezone).toBe('Pacific/Honolulu');
                        });
                    });
                });
            });

            describe('title', () => {
                it('Passed to the component', () => {
                    element.title = 'This is an title text';

                    return Promise.resolve().then(() => {
                        const title = element.shadowRoot.querySelector(
                            '.slds-section__title'
                        );
                        expect(title.textContent).toBe('This is an title text');
                    });
                });
            });
        });
    });

    describe('Events', () => {
        describe('actionclick', () => {
            it('actionclick event', () => {
                element.actions = actions;
                element.items = testItems;

                const handler = jest.fn();
                element.addEventListener('actionclick', handler);

                return Promise.resolve().then(() => {
                    const item = element.shadowRoot.querySelector(
                        'c-primitive-activity-timeline-item'
                    );
                    item.dispatchEvent(
                        new CustomEvent('actionclick', {
                            detail: {
                                name: actions[0].name,
                                targetName: testItems[0].name,
                                fieldData: testItems[0].fields
                            },
                            bubbles: true
                        })
                    );
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.name).toBe(
                        actions[0].name
                    );
                    expect(handler.mock.calls[0][0].detail.targetName).toBe(
                        testItems[0].name
                    );
                    expect(handler.mock.calls[0][0].detail.fieldData).toEqual(
                        testItems[0].fields
                    );
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                });
            });
        });

        describe('buttonclick', () => {
            it('buttonclick event', () => {
                element.items = testItems;

                const handler = jest.fn();
                element.addEventListener('buttonclick', handler);

                return Promise.resolve().then(() => {
                    const item = element.shadowRoot.querySelector(
                        'c-primitive-activity-timeline-item'
                    );
                    item.dispatchEvent(
                        new CustomEvent('buttonclick', {
                            detail: { name: testItems[0].name },
                            bubbles: true
                        })
                    );
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.targetName).toBe(
                        testItems[0].name
                    );
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                });
            });
        });

        describe('check', () => {
            it('check event', () => {
                element.items = testItems;
                const handler = jest.fn();
                element.addEventListener('check', handler);

                return Promise.resolve().then(() => {
                    const item = element.shadowRoot.querySelector(
                        'c-primitive-activity-timeline-item'
                    );
                    item.dispatchEvent(
                        new CustomEvent('check', {
                            detail: {
                                checked: true,
                                name: testItems[0].name
                            },
                            bubbles: true
                        })
                    );
                    expect(element.items[0].checked).toBeTruthy();
                    expect(handler).toHaveBeenCalled();
                    expect(
                        handler.mock.calls[0][0].detail.checked
                    ).toBeTruthy();
                    expect(handler.mock.calls[0][0].detail.targetName).toBe(
                        testItems[0].name
                    );
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                });
            });
        });

        describe('itemclick', () => {
            it('itemclick event', () => {
                element.items = testItems;
                const handler = jest.fn();
                element.addEventListener('itemclick', handler);

                return Promise.resolve().then(() => {
                    const item = element.shadowRoot.querySelector(
                        'c-primitive-activity-timeline-item'
                    );
                    item.dispatchEvent(
                        new CustomEvent('itemclick', {
                            detail: { name: testItems[0].name },
                            bubbles: true
                        })
                    );
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.name).toBe(
                        testItems[0].name
                    );
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                });
            });
        });

        describe('itemsvisibilitytoggle', () => {
            it('itemsvisibilitytoggle event', () => {
                element.items = testItems;
                element.maxVisibleItems = 2;

                const handler = jest.fn();
                element.addEventListener('itemsvisibilitytoggle', handler);

                return Promise.resolve()
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button"]'
                        );
                        button.click();
                        expect(handler).toHaveBeenCalledTimes(1);
                        const call = handler.mock.calls[0][0];
                        expect(call.detail.show).toBeTruthy();
                        expect(call.cancelable).toBeTruthy();
                        expect(call.bubbles).toBeFalsy();
                        expect(call.composed).toBeFalsy();
                    })
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button"]'
                        );
                        button.click();
                        expect(handler).toHaveBeenCalledTimes(2);
                        const call = handler.mock.calls[1][0];
                        expect(call.detail.show).toBeFalsy();
                    });
            });
        });

        describe('loadmore', () => {
            it('loadmore event', () => {
                const handler = jest.fn();
                element.addEventListener('loadmore', handler);
                element.enableInfiniteLoading = true;
                element.loadMoreOffset = 50;

                // First dispatch when there are no items
                expect(handler).toHaveBeenCalledTimes(1);
                const call = handler.mock.calls[0][0];
                expect(call.bubbles).toBeFalsy();
                expect(call.composed).toBeFalsy();
                expect(call.cancelable).toBeFalsy();

                element.isLoading = true;

                return Promise.resolve()
                    .then(() => {
                        element.items = testItems;
                        element.isLoading = false;
                        const wrapper = element.shadowRoot.querySelector(
                            '[data-element-id="div-timeline-wrapper"]'
                        );
                        jest.spyOn(
                            wrapper,
                            'clientHeight',
                            'get'
                        ).mockImplementation(() => 100);
                        jest.spyOn(
                            wrapper,
                            'scrollHeight',
                            'get'
                        ).mockImplementation(() => 200);
                    })
                    .then(() => {
                        // No dispatch until the scroll position reaches the loadMoreOffset
                        const wrapper = element.shadowRoot.querySelector(
                            '[data-element-id="div-timeline-wrapper"]'
                        );
                        wrapper.scrollTop = 49;
                        wrapper.dispatchEvent(new CustomEvent('scroll'));
                        expect(handler).toHaveBeenCalledTimes(1);

                        wrapper.scrollTop = 50;
                        wrapper.dispatchEvent(new CustomEvent('scroll'));
                        expect(handler).toHaveBeenCalledTimes(2);
                    });
            });
        });
    });

    describe('Horizontal Timeline', () => {
        describe('position', () => {
            it('position', () => {
                const createHorizontalTimelineSpy = jest.spyOn(
                    HorizontalActivityTimeline.prototype,
                    'createHorizontalActivityTimeline'
                );
                element.title = 'Horizontal Activity Timeline';
                element.items = horizontalItemsTest;
                element.orientation = 'horizontal';

                return Promise.resolve().then(() => {
                    const timelineContainer =
                        element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-activity-timeline__horizontal-timeline"] svg'
                        );
                    expect(createHorizontalTimelineSpy).toHaveBeenCalled();
                    expect(timelineContainer).toBeDefined();
                    expect(element.maxVisibleItems).toBe(10);
                });
            });
        });

        it('horizontal - itemclick', () => {
            element.items = horizontalItemsTest;
            element.orientation = 'horizontal';

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

        it('horizontal - actionclick event', () => {
            SVGElement.prototype.getComputedTextLength = () => {
                return 100;
            };
            element.actions = actions;
            element.items = horizontalItemsTest;
            element.orientation = 'horizontal';

            const handler = jest.fn();
            element.addEventListener('actionclick', handler);

            return Promise.resolve()
                .then(() => {
                    const timelineItemsSVG = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-horizontal-activity-timeline__timeline-items-svg"]'
                    );
                    const itemSVGGroup = timelineItemsSVG.querySelector(
                        '#timeline-item-item13'
                    );
                    itemSVGGroup.dispatchEvent(new CustomEvent('mouseenter'));
                })
                .then(() => {
                    const popoverItem = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-horizontal-activity-timeline__item-popover"]'
                    );
                    const popoverActionsMenu = popoverItem.querySelector(
                        '[data-element-id="lightning-button-menu-actions"]'
                    );
                    popoverActionsMenu.dispatchEvent(
                        new CustomEvent('select', {
                            detail: { value: actions[0].name }
                        })
                    );

                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.name).toBe(
                        'add-item'
                    );
                    expect(handler.mock.calls[0][0].detail.targetName).toBe(
                        'item13'
                    );
                    expect(handler.mock.calls[0][0].detail.fieldData).toEqual([
                        {
                            label: 'Name',
                            value: 'Charlie Gomez',
                            type: 'url',
                            typeAttributes: {
                                label: 'Charlie Gomez'
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
                            value: 'Need to finalize proposals and brand details before the meeting',
                            type: 'text'
                        }
                    ]);
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                });
        });

        it('horizontal - click on close button of popover should not trigger itemclick', () => {
            SVGElement.prototype.getComputedTextLength = () => {
                return 100;
            };
            element.items = horizontalItemsTest;
            element.orientation = 'horizontal';
            let timelineItemsSVG;
            let item;

            return Promise.resolve()
                .then(() => {
                    timelineItemsSVG = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-horizontal-activity-timeline__timeline-items-svg"]'
                    );
                    item = timelineItemsSVG.querySelector(
                        '#timeline-item-item8'
                    );
                    item.dispatchEvent(new CustomEvent('mouseenter'));
                })
                .then(() => {
                    timelineItemsSVG = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-horizontal-activity-timeline__timeline-items-svg"]'
                    );
                    item = timelineItemsSVG.querySelector(
                        '#timeline-item-item8'
                    );

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
        it('horizontal - displayedItems', () => {
            element.items = horizontalItemsTest;
            element.orientation = 'horizontal';

            return Promise.resolve().then(() => {
                const timelineItemsSVG = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-horizontal-activity-timeline__timeline-items-svg"]'
                );

                for (const item of displayedItemsHorizontalTest) {
                    const itemCategoryIcon = item.avatar.fallbackIconName.slice(
                        0,
                        item.avatar.fallbackIconName.indexOf(':')
                    );
                    const itemNameIcon = item.avatar.fallbackIconName.slice(
                        item.avatar.fallbackIconName.indexOf(':') + 1,
                        item.avatar.fallbackIconName.length
                    );
                    const itemSVGGroup = timelineItemsSVG.querySelector(
                        '#timeline-item-' + item.name
                    );
                    const itemIcon = itemSVGGroup.querySelector('span');

                    expect(itemSVGGroup).toBeDefined();
                    expect(itemSVGGroup.textContent).toContain(item.title);
                    expect(itemIcon.className).toContain(
                        'slds-icon slds-icon_container slds-icon_small slds-icon-' +
                            itemCategoryIcon +
                            '-' +
                            itemNameIcon
                    );
                }
            });
        });

        // changeIntervalSizeMode
        it('horizontal - changeIntervalSizeMode', () => {
            const cancelEditIntervalSizeModeSpy = jest.spyOn(
                HorizontalActivityTimeline.prototype,
                'cancelEditIntervalSizeMode'
            );
            const handleMouseOverOnIntervalSpy = jest.spyOn(
                HorizontalActivityTimeline.prototype,
                'handleMouseOverOnInterval'
            );
            element.items = horizontalItemsTest;
            element.orientation = 'horizontal';

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
        it('horizontal - edit mode - drag upper bound of interval rectangle (to the left)', () => {
            jest.spyOn(
                HorizontalActivityTimeline.prototype,
                'minIntervalWidth',
                'get'
            ).mockReturnValue(2);
            const handleUpperBoundIntervalDragSpy = jest.spyOn(
                HorizontalActivityTimeline.prototype,
                'handleUpperBoundIntervalDrag'
            );
            const handleUpperBoundIntervalChangeSpy = jest.spyOn(
                HorizontalActivityTimeline.prototype,
                'handleUpperBoundIntervalChange'
            );

            element.items = horizontalItemsTest;
            element.orientation = 'horizontal';
            const initialIntervalPosition = 602;
            let receivedX;

            return Promise.resolve().then(() => {
                const intervalRectangle = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-horizontal-activity-timeline__time-interval-rectangle"]'
                );
                // Activate edit mode
                intervalRectangle.dispatchEvent(new CustomEvent('mouseover'));
                receivedX = intervalRectangle.getAttribute('x');
                expect(Math.floor(Number(receivedX))).toBe(
                    initialIntervalPosition
                );

                // Drag of right interval line
                const scrollAxisSVG = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-horizontal-activity-timeline__scroll-axis-svg"]'
                );
                const rightIntervalLine = scrollAxisSVG.querySelector(
                    '#avonni-horizontal-activity-timeline__right-interval-line'
                );

                // To simulate drag --> mouse down, mouse move, mouse up events
                const mouseEvent = new MouseEvent('mousedown', {
                    view: window
                });
                const sourceEvent = new MouseEvent('mousemove');
                sourceEvent.offsetX = 0;
                const mouseUp = new MouseEvent('mouseup', { view: window });
                rightIntervalLine.dispatchEvent(mouseEvent);
                rightIntervalLine.dispatchEvent(sourceEvent);
                rightIntervalLine.dispatchEvent(mouseUp);

                expect(handleUpperBoundIntervalDragSpy).toBeCalled();
                expect(handleUpperBoundIntervalChangeSpy).toBeCalled();
                receivedX = intervalRectangle.getAttribute('x');
                expect(Math.floor(Number(receivedX))).toBe(
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
                expect(
                    timelineSVG.querySelectorAll('foreignObject').length
                ).toBe(itemsAfterDrag.length);

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

        it('horizontal - edit mode - drag upper bound of interval rectangle (to the right)', () => {
            const handleUpperBoundIntervalDragSpy = jest.spyOn(
                HorizontalActivityTimeline.prototype,
                'handleUpperBoundIntervalDrag'
            );
            const handleUpperBoundIntervalChangeSpy = jest.spyOn(
                HorizontalActivityTimeline.prototype,
                'handleUpperBoundIntervalChange'
            );

            element.items = horizontalItemsTest;
            element.orientation = 'horizontal';
            const initialIntervalPosition = 602;
            let receivedX;

            return Promise.resolve().then(() => {
                const intervalRectangle = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-horizontal-activity-timeline__time-interval-rectangle"]'
                );
                // Activate edit mode
                intervalRectangle.dispatchEvent(new CustomEvent('mouseover'));
                receivedX = intervalRectangle.getAttribute('x');
                expect(Math.floor(Number(receivedX))).toBe(
                    initialIntervalPosition
                );

                // Drag of right interval line
                const scrollAxisSVG = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-horizontal-activity-timeline__scroll-axis-svg"]'
                );
                const rightIntervalLine = scrollAxisSVG.querySelector(
                    '#avonni-horizontal-activity-timeline__right-interval-line'
                );

                // To simulate drag --> mouse down, mouse move, mouse up events
                const mouseEvent = new MouseEvent('mousedown', {
                    view: window
                });
                const sourceEvent = new MouseEvent('mousemove');
                sourceEvent.offsetX = 2000;
                const mouseUp = new MouseEvent('mouseup', { view: window });
                rightIntervalLine.dispatchEvent(mouseEvent);
                rightIntervalLine.dispatchEvent(sourceEvent);
                rightIntervalLine.dispatchEvent(mouseUp);

                expect(handleUpperBoundIntervalDragSpy).toBeCalled();
                expect(handleUpperBoundIntervalChangeSpy).toBeCalled();
                receivedX = intervalRectangle.getAttribute('x');
                expect(Math.floor(Number(receivedX))).toBe(
                    initialIntervalPosition
                );
                expect(
                    Math.ceil(Number(intervalRectangle.getAttribute('width')))
                ).toBe(1300 - initialIntervalPosition);

                // Check the items displayed, the new interval should be : [02/02/2022, 30/03/2022]
                const timelineSVG = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-horizontal-activity-timeline__timeline-items-svg"]'
                );
                const idOfItemsInInterval = [
                    'item4',
                    'item5',
                    'item6',
                    'item7',
                    'item8',
                    'item9',
                    'item10',
                    'item11',
                    'item12',
                    'item13',
                    'item14'
                ];
                expect(
                    timelineSVG.querySelectorAll('foreignObject').length
                ).toBe(idOfItemsInInterval.length);

                for (const id of idOfItemsInInterval) {
                    const itemElement = timelineSVG.querySelector(
                        '#timeline-item-' + id
                    );
                    expect(itemElement).not.toBeNull();
                }
            });
        });

        // Edit interval size mode : drag left interval line to change interval's width
        it('horizontal - edit mode - drag lower bound of interval rectangle (to the left)', () => {
            jest.spyOn(
                HorizontalActivityTimeline.prototype,
                'minIntervalWidth',
                'get'
            ).mockReturnValue(2);
            const handleLowerBoundIntervalDragSpy = jest.spyOn(
                HorizontalActivityTimeline.prototype,
                'handleLowerBoundIntervalDrag'
            );
            const handleLowerBoundIntervalChangeSpy = jest.spyOn(
                HorizontalActivityTimeline.prototype,
                'handleLowerBoundIntervalChange'
            );

            element.items = horizontalItemsTest;
            element.orientation = 'horizontal';
            const dragPosition = '16.5';

            return Promise.resolve().then(() => {
                const intervalRectangle = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-horizontal-activity-timeline__time-interval-rectangle"]'
                );
                // Activate edit mode
                expect(
                    Math.floor(Number(intervalRectangle.getAttribute('x')))
                ).toBe(602);

                // drag of left interval line
                const scrollAxisSVG = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-horizontal-activity-timeline__scroll-axis-svg"]'
                );
                const leftIntervalLine = scrollAxisSVG.querySelector(
                    '#avonni-horizontal-activity-timeline__left-interval-line'
                );

                // To simulate drag --> mouse down, mouse move, mouse up events
                const mouseEvent = new MouseEvent('mousedown', {
                    view: window
                });
                const sourceEvent = new MouseEvent('mousemove');
                sourceEvent.offsetX = dragPosition;
                const mouseUp = new MouseEvent('mouseup', { view: window });
                leftIntervalLine.dispatchEvent(mouseEvent);
                leftIntervalLine.dispatchEvent(sourceEvent);
                leftIntervalLine.dispatchEvent(mouseUp);

                expect(handleLowerBoundIntervalDragSpy).toBeCalled();
                expect(handleLowerBoundIntervalChangeSpy).toBeCalled();

                expect(intervalRectangle.getAttribute('x')).toBe(dragPosition);
                expect(
                    Math.floor(Number(intervalRectangle.getAttribute('width')))
                ).toBe(785);

                // Check the items displayed, the new interval should be : [27/12/2021, 17/02/2022]
                const itemsAfterDrag = [
                    {
                        name: 'item1',
                        title: 'This is a message longer t ...',
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
                        title: 'This is another item to di ...',
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
                expect(
                    timelineSVG.querySelectorAll('foreignObject').length
                ).toBe(itemsAfterDrag.length);

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
        it('horizontal - edit mode - drag lower bound of interval rectangle (to the right)', () => {
            const minIntervalWidth = 2;
            jest.spyOn(
                HorizontalActivityTimeline.prototype,
                'minIntervalWidth',
                'get'
            ).mockReturnValue(minIntervalWidth);
            const handleLowerBoundIntervalDragSpy = jest.spyOn(
                HorizontalActivityTimeline.prototype,
                'handleLowerBoundIntervalDrag'
            );
            const handleLowerBoundIntervalChangeSpy = jest.spyOn(
                HorizontalActivityTimeline.prototype,
                'handleLowerBoundIntervalChange'
            );

            element.items = horizontalItemsTest;
            element.orientation = 'horizontal';

            return Promise.resolve().then(() => {
                const intervalRectangle = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-horizontal-activity-timeline__time-interval-rectangle"]'
                );
                // Activate edit mode
                expect(
                    Math.floor(Number(intervalRectangle.getAttribute('x')))
                ).toBe(602);

                // drag of left interval line
                const scrollAxisSVG = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-horizontal-activity-timeline__scroll-axis-svg"]'
                );
                const leftIntervalLine = scrollAxisSVG.querySelector(
                    '#avonni-horizontal-activity-timeline__left-interval-line'
                );

                // To simulate drag --> mouse down, mouse move, mouse up events
                const mouseEvent = new MouseEvent('mousedown', {
                    view: window
                });
                const sourceEvent = new MouseEvent('mousemove');
                sourceEvent.offsetX = 2000;
                const mouseUp = new MouseEvent('mouseup', { view: window });
                leftIntervalLine.dispatchEvent(mouseEvent);
                leftIntervalLine.dispatchEvent(sourceEvent);
                leftIntervalLine.dispatchEvent(mouseUp);

                expect(handleLowerBoundIntervalDragSpy).toBeCalled();
                expect(handleLowerBoundIntervalChangeSpy).toBeCalled();
                expect(
                    Math.floor(Number(intervalRectangle.getAttribute('width')))
                ).toBe(minIntervalWidth);
            });
        });

        // Drag of interval rectangle
        it('horizontal - drag of interval rectangle', () => {
            const handleTimeIntervalDragSpy = jest.spyOn(
                HorizontalActivityTimeline.prototype,
                'handleTimeIntervalDrag'
            );
            const setIntervalMaxDateSpy = jest.spyOn(
                HorizontalActivityTimeline.prototype,
                'setIntervalMaxDate'
            );
            element.items = horizontalItemsTest;
            element.orientation = 'horizontal';
            // Corresponding date : 05/03/2022
            const dragPosition = 989;
            const initialXMinPosition = 602;

            return Promise.resolve().then(() => {
                const intervalRectangle = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-horizontal-activity-timeline__time-interval-rectangle"]'
                );
                expect(
                    Math.floor(Number(intervalRectangle.getAttribute('x')))
                ).toBe(initialXMinPosition);

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

                expect(handleTimeIntervalDragSpy).toBeCalled();
                expect(setIntervalMaxDateSpy).toBeCalled();
                expect(
                    Math.ceil(Number(intervalRectangle.getAttribute('x')))
                ).toBe(dragPosition);

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
                expect(
                    timelineSVG.querySelectorAll('foreignObject').length
                ).toBe(1);
                const item = timelineSVG.querySelector(
                    '#timeline-item-' + itemAfterDrag.name
                );
                expect(item).toBeDefined();
                const title = item.querySelector('text');
                expect(title.textContent).toBe(itemAfterDrag.title);
            });
        });

        // Drag interval rectangle : if drag position is lower than minPosition, the interval rectangle is set to the minimum
        it('horizontal - drag of interval rectangle (min)', () => {
            const handleTimeIntervalDragSpy = jest.spyOn(
                HorizontalActivityTimeline.prototype,
                'handleTimeIntervalDrag'
            );
            element.items = horizontalItemsTest;
            element.orientation = 'horizontal';
            const initialXMinPosition = 602;

            return Promise.resolve().then(() => {
                const intervalRectangle = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-horizontal-activity-timeline__time-interval-rectangle"]'
                );
                expect(
                    Math.floor(Number(intervalRectangle.getAttribute('x')))
                ).toBe(initialXMinPosition);

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

                expect(handleTimeIntervalDragSpy).toBeCalled();
                expect(intervalRectangle.getAttribute('x')).toBe('16.5');

                // Check the items displayed, the new interval should be : [17/12/2021, 01/01/2022]. 17/12/2021 is the minimum date of scroll axis.
                // One item should be displayed (item1 at 01/01/2022)
                const timelineSVG = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-horizontal-activity-timeline__timeline-items-svg"]'
                );
                expect(
                    timelineSVG.querySelectorAll('foreignObject').length
                ).toBe(1);
                expect(
                    timelineSVG.querySelector('#timeline-item-item1')
                ).not.toBeNull();
            });
        });

        // Drag interval rectangle : if drag position is greater than maxPosition, the interval rectangle is set to the maximum
        it('horizontal - drag of interval rectangle (max)', () => {
            const handleTimeIntervalDragSpy = jest.spyOn(
                HorizontalActivityTimeline.prototype,
                'handleTimeIntervalDrag'
            );
            element.items = horizontalItemsTest;
            element.orientation = 'horizontal';
            const initialXMinPosition = 602;

            return Promise.resolve().then(() => {
                const intervalRectangle = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-horizontal-activity-timeline__time-interval-rectangle"]'
                );
                expect(
                    Math.floor(Number(intervalRectangle.getAttribute('x')))
                ).toBe(initialXMinPosition);

                // To simulate drag --> mouse down, mouse move, mouse up events
                const sourceEvent = new MouseEvent('mousemove');
                sourceEvent.offsetX = 3000;
                const mouseDownEvent = new MouseEvent('mousedown', {
                    view: window
                });
                jest.spyOn(mouseDownEvent, 'clientX', 'get').mockImplementation(
                    () => initialXMinPosition
                );

                intervalRectangle.dispatchEvent(mouseDownEvent);
                intervalRectangle.dispatchEvent(sourceEvent);

                expect(handleTimeIntervalDragSpy).toBeCalled();
                expect(
                    Math.floor(Number(intervalRectangle.getAttribute('x')))
                ).toBe(1100);

                // Check the items displayed, the new interval should be : [14/03/2022, 30/03/2022]. 30/03/2022 is the maximum date of scroll axis.
                // One item should be displayed (item14 at 03/14/2022)
                const timelineSVG = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-horizontal-activity-timeline__timeline-items-svg"]'
                );
                expect(
                    timelineSVG.querySelectorAll('foreignObject').length
                ).toBe(1);
                expect(
                    timelineSVG.querySelector('#timeline-item-item14')
                ).not.toBeNull();
            });
        });

        // Scroll disabled if all items can be displayed with preferred height
        it('horizontal - scroll disabled', () => {
            element.items = horizontalItemsTest;
            element.orientation = 'horizontal';
            element.maxVisibleItems = 15;

            return Promise.resolve().then(() => {
                const scrollingContainer = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-activity-timeline__horizontal-timeline-scrolling-container"]'
                );
                expect(scrollingContainer.style.overflowY).toBe('hidden');
            });
        });

        // Scroll: If the height of the timeline's svg is bigger than the height displayed
        it('horizontal - scroll', () => {
            element.items = horizontalItemsTest;
            element.orientation = 'horizontal';
            element.maxVisibleItems = 2;

            return Promise.resolve().then(() => {
                const scrollingContainer = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-activity-timeline__horizontal-timeline-scrolling-container"]'
                );
                expect(scrollingContainer.style.overflowY).toBe('scroll');
            });
        });

        // Click on scroll axis : click cannot go further than max position - intervalWidth
        it('horizontal - click on scroll axis (edit mode disabled, max position)', () => {
            jest.spyOn(
                HorizontalActivityTimeline.prototype,
                'minIntervalWidth',
                'get'
            ).mockReturnValue(2);
            element.items = horizontalItemsTest;
            element.orientation = 'horizontal';
            const clickPosition = '1150';
            const maxPositionForInterval = 1038;

            return Promise.resolve().then(() => {
                const intervalRectangle = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-horizontal-activity-timeline__time-interval-rectangle"]'
                );
                expect(
                    Math.floor(Number(intervalRectangle.getAttribute('x')))
                ).toBe(602);

                const scrollAxis = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-horizontal-activity-timeline__scroll-axis-rectangle"]'
                );
                const clickEvent = new MouseEvent('click');
                clickEvent.offsetX = clickPosition;
                scrollAxis.dispatchEvent(clickEvent);
                expect(
                    Math.floor(Number(intervalRectangle.getAttribute('x')))
                ).toBe(maxPositionForInterval);
            });
        });

        // Click on scroll axis: if edit mode of interval is disabled, click on scroll axis change interval rectangle's position
        it('horizontal - click on scroll axis (edit mode disabled)', () => {
            jest.spyOn(
                HorizontalActivityTimeline.prototype,
                'minIntervalWidth',
                'get'
            ).mockReturnValue(2);
            const handleClickOnScrollAxisSpy = jest.spyOn(
                HorizontalActivityTimeline.prototype,
                'handleClickOnScrollAxis'
            );

            element.items = horizontalItemsTest;
            element.orientation = 'horizontal';
            const newIntervalPosition = 810;
            const halfIntervalWidth = 100;
            const offsetToStartOfDay = 8;

            jest.spyOn(
                HorizontalActivityTimeline.prototype,
                'intervalWidth',
                'get'
            ).mockImplementation(() => halfIntervalWidth * 2);

            return Promise.resolve().then(() => {
                const intervalRectangle = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-horizontal-activity-timeline__time-interval-rectangle"]'
                );
                expect(
                    Math.floor(Number(intervalRectangle.getAttribute('x')))
                ).toBe(602);

                const scrollAxis = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-horizontal-activity-timeline__scroll-axis-rectangle"]'
                );
                const clickEvent = new MouseEvent('click');
                clickEvent.offsetX = newIntervalPosition;
                scrollAxis.dispatchEvent(clickEvent);
                expect(handleClickOnScrollAxisSpy).toHaveBeenCalled();

                // +/- 1 of difference with expected output's value is accepted
                const differenceBetweenOutputAndExpected =
                    Math.floor(Number(intervalRectangle.getAttribute('x'))) -
                    (newIntervalPosition -
                        halfIntervalWidth -
                        offsetToStartOfDay);
                expect(
                    Math.abs(differenceBetweenOutputAndExpected)
                ).toBeLessThanOrEqual(1);
            });
        });

        // mouseover and mouseout on item
        it('horizontal - Mouseover on item', () => {
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
            element.orientation = 'horizontal';
            let item;
            let popoverItem;

            return (
                Promise.resolve()
                    // Get specific item to activate mouse over
                    .then(() => {
                        const timelineSVG = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-horizontal-activity-timeline__timeline-items-svg"]'
                        );
                        item = timelineSVG.querySelector(
                            '#timeline-item-item8'
                        );
                        item.dispatchEvent(new CustomEvent('mouseenter'));
                    })
                    // Check if popover is present
                    .then(() => {
                        popoverItem = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-horizontal-activity-timeline__item-popover"]'
                        );

                        expect(popoverItem.getAttribute('name')).toBe('item8');
                        expect(popoverItem.className).toBe(
                            'avonni-horizontal-activity-timeline__popover slds-popover slds-popover_large slds-is-absolute slds-p-around_none slds-nubbin_left'
                        );
                        expect(handleMouseOverOnItemSpy).toHaveBeenCalled();

                        item.dispatchEvent(new CustomEvent('mouseleave'));
                        popoverItem.dispatchEvent(
                            new CustomEvent('mouseenter')
                        );
                        popoverItem.dispatchEvent(
                            new CustomEvent('mouseleave')
                        );
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
        it('horizontal - Mouseover on item (right position)', () => {
            const convertPxSizeToNumberSpy = jest
                .spyOn(
                    HorizontalActivityTimeline.prototype,
                    'convertPxSizeToNumber'
                )
                .mockReturnValue(400);
            element.items = horizontalItemsTest;
            element.orientation = 'horizontal';
            let item;

            return Promise.resolve()
                .then(() => {
                    // Set width
                    element.orientation = 'vertical';
                    element._redrawHorizontalTimeline = true;
                    const timelineContainer = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-activity-timeline__horizontal-timeline"]'
                    );
                    jest.spyOn(
                        timelineContainer,
                        'clientWidth',
                        'get'
                    ).mockImplementation(() => 1600);
                    element.orientation = 'horizontal';
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
                        'avonni-horizontal-activity-timeline__popover slds-popover slds-popover_large slds-is-absolute slds-p-around_none slds-nubbin_right-top'
                    );
                    expect(convertPxSizeToNumberSpy).toBeCalled();
                });
        });

        // maxVisibleItems and height's change
        it('horizontal - maxVisibleItems and height of timeline', () => {
            const setVisibleTimelineHeightSpy = jest.spyOn(
                HorizontalActivityTimeline.prototype,
                'setVisibleTimelineHeight'
            );
            element.items = horizontalItemsTest;
            element.orientation = 'horizontal';
            element.maxVisibleItems = 4;

            return Promise.resolve().then(() => {
                const scrollingContainer = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-activity-timeline__horizontal-timeline-scrolling-container"]'
                );

                expect(scrollingContainer.style.height).toBe('127px');
                expect(setVisibleTimelineHeightSpy).toBeCalled();
            });
        });

        // maxVisibleItems and height's change - if maxVisibleItems is bigger than number of items, height is set with the maximum number of items
        // Here, the maximum number of items is 14 (407px).
        it('horizontal - maxVisibleItems bigger than max number of items', () => {
            const setVisibleTimelineHeightSpy = jest.spyOn(
                HorizontalActivityTimeline.prototype,
                'setVisibleTimelineHeight'
            );
            element.items = horizontalItemsTest;
            element.orientation = 'horizontal';
            element.maxVisibleItems = 30;

            return Promise.resolve().then(() => {
                const scrollingContainer = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-activity-timeline__horizontal-timeline-scrolling-container"]'
                );

                expect(horizontalItemsTest.length).toBe(14);
                expect(scrollingContainer.style.height).toBe('407px');
                expect(setVisibleTimelineHeightSpy).toBeCalled();
            });
        });

        // yPosition of items : No item displayed should overlap even if items share the same date
        it('horizontal - yPositions of items with same date of overlapping', () => {
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
            element.orientation = 'horizontal';
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
        it('horizontal - set width of timeline', () => {
            element.items = horizontalItemsTest;
            element.orientation = 'horizontal';

            return Promise.resolve()
                .then(() => {
                    element.orientation = 'vertical';
                    element._redrawHorizontalTimeline = true;
                    const timelineContainer = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-activity-timeline__horizontal-timeline"]'
                    );
                    jest.spyOn(
                        timelineContainer,
                        'clientWidth',
                        'get'
                    ).mockImplementation(() => 2000);
                    element.orientation = 'horizontal';
                })
                .then(() => {
                    const timelineItemsSVG = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-horizontal-activity-timeline__timeline-items-svg"]'
                    );
                    expect(timelineItemsSVG.getAttribute('width')).toBe('2001');
                });
        });

        // ticks : Reduce timeline's width to check if ticks do not overlap
        it('horizontal - Number of ticks', () => {
            const timelineWidth = 880;
            const createTimeAxisSpy = jest.spyOn(
                HorizontalActivityTimeline.prototype,
                'createTimeAxis'
            );
            element.items = horizontalItemsTest;
            element.orientation = 'horizontal';

            return Promise.resolve()
                .then(() => {
                    // The width of timeline container is reduced to change ticks
                    element.orientation = 'vertical';
                    element._redrawHorizontalTimeline = true;
                    const timelineContainer = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-activity-timeline__horizontal-timeline"]'
                    );
                    jest.spyOn(
                        timelineContainer,
                        'clientWidth',
                        'get'
                    ).mockReturnValue(timelineWidth);
                    element.orientation = 'horizontal';
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
        it('horizontal - event wheel with positive deltaX', () => {
            jest.spyOn(
                HorizontalActivityTimeline.prototype,
                'minIntervalWidth',
                'get'
            ).mockReturnValue(2);
            const handleWheelOnIntervalSpy = jest.spyOn(
                HorizontalActivityTimeline.prototype,
                'handleWheelOnInterval'
            );
            element.items = horizontalItemsTest;
            element.orientation = 'horizontal';
            const initialIntervalPosition = 602;
            const deltaX = 20;
            let intervalRectangle;

            return Promise.resolve()
                .then(() => {
                    intervalRectangle = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-horizontal-activity-timeline__time-interval-rectangle"]'
                    );
                    jest.spyOn(
                        intervalRectangle,
                        'getBoundingClientRect'
                    ).mockImplementation(() => {
                        return { left: initialIntervalPosition };
                    });
                    expect(
                        Math.floor(Number(intervalRectangle.getAttribute('x')))
                    ).toBe(initialIntervalPosition);

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
                    // Set to beginning of the day (614 = 2022-02-03T05:00:00.000Z), initialIntervalPosition + deltaX - offset set hours to 0,0,0,0
                    expect(
                        Math.floor(Number(intervalRectangle.getAttribute('x')))
                    ).toBe(614);
                });
        });

        // wheel event : negative deltaX (interval going left)
        it('horizontal - event wheel with negative deltaX', () => {
            jest.spyOn(
                HorizontalActivityTimeline.prototype,
                'minIntervalWidth',
                'get'
            ).mockReturnValue(2);
            const handleWheelOnIntervalSpy = jest.spyOn(
                HorizontalActivityTimeline.prototype,
                'handleWheelOnInterval'
            );
            element.items = horizontalItemsTest;
            element.orientation = 'horizontal';
            const initialIntervalPosition = 602;
            const deltaX = -20;
            let intervalRectangle;

            return Promise.resolve()
                .then(() => {
                    intervalRectangle = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-horizontal-activity-timeline__time-interval-rectangle"]'
                    );
                    jest.spyOn(
                        intervalRectangle,
                        'getBoundingClientRect'
                    ).mockImplementation(() => {
                        return { left: initialIntervalPosition };
                    });
                    expect(
                        Math.floor(Number(intervalRectangle.getAttribute('x')))
                    ).toBe(initialIntervalPosition);

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
                    // Set to beginning of the day (577 = 2022-01-31T05:00:00.000Z), initialIntervalPosition + deltaX - offset set hours to 0,0,0,0
                    expect(
                        Math.floor(Number(intervalRectangle.getAttribute('x')))
                    ).toBe(577);
                });
        });

        // wheel event : deltaY value with timeline to scroll
        it('horizontal - event wheel with deltaY value', () => {
            jest.spyOn(
                HorizontalActivityTimeline.prototype,
                'minIntervalWidth',
                'get'
            ).mockReturnValue(2);
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
            element.orientation = 'horizontal';
            const initialIntervalPosition = 602;
            const deltaX = -100;
            let intervalRectangle;

            return Promise.resolve()
                .then(() => {
                    intervalRectangle = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-horizontal-activity-timeline__time-interval-rectangle"]'
                    );
                    expect(
                        Math.floor(Number(intervalRectangle.getAttribute('x')))
                    ).toBe(initialIntervalPosition);

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
                    expect(
                        Math.floor(Number(intervalRectangle.getAttribute('x')))
                    ).toBe(initialIntervalPosition);
                });
        });
    });
});
