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

const ITEMS = [
    {
        name: 'item1',
        title: 'Review proposals for EBC deck with larger team and have marketing review this',
        description: 'You created a task with Charlie Gomez',
        datetimeValue: 1620648000000,
        href: 'salesforce.com',
        iconName: 'standard:task',
        icons: ['utility:refresh'],
        hasCheckbox: true
    },
    {
        name: 'item2',
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
        name: 'item3',
        title: 'Re: Mobile conversation on Monday with the new global team',
        description: 'You emailed Lea Chan',
        datetimeValue: 1619013600000,
        href: '#',
        iconName: 'standard:email',
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
    },
    {
        name: 'item4',
        title: 'EBC Follow up call',
        description: 'You created an event with Aida Lee and 5 others',
        icons: ['utility:world'],
        datetimeValue: 1619006400000,
        href: '#',
        iconName: 'standard:event',
        fields: [
            {
                label: 'Location',
                value: 'Westen St. Francis, San Francisco, CA, 94622',
                type: 'url',
                typeAttributes: {
                    label: 'Westen St. Francis, San Francisco, CA, 94622'
                }
            },
            {
                label: 'Attendees',
                value: 'Jason Dewar (Organizer) + 5 others',
                type: 'url',
                typeAttributes: {
                    label: 'Jason Dewar (Organizer) + 5 others'
                }
            },
            {
                label: 'When',
                value: 'March 26, 10:00 AM - 11:00 AM',
                type: 'url',
                typeAttributes: {
                    label: 'March 26, 10:00 AM - 11:00 AM'
                }
            },
            {
                label: 'Description',
                value: "Let's discuss the 2017 product roadmap and address any questions",
                type: 'text'
            }
        ],
        buttonLabel: 'Public Sharing',
        buttonIconName: 'utility:world',
        closed: true
    },
    {
        name: 'item5',
        title: 'Create one task',
        datetimeValue: 1621605600000,
        href: '#',
        iconName: 'standard:dashboard',
        loadingStateAlternativeText: 'Is Loading',
        fields: [
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
        ],
        hasCheckbox: true,
        isLoading: true,
        closed: true
    },
    {
        name: 'item6',
        title: 'Create another task',
        datetimeValue: 1621611000000,
        href: '#',
        iconName: 'standard:case',
        hasCheckbox: true,
        hasError: true
    }
];

const ACTIONS = [
    {
        label: 'Add item',
        name: 'add-item',
        iconName: 'utility:add'
    },
    {
        label: 'Edit item',
        name: 'edit-item',
        iconName: 'utility:edit'
    }
];

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
        expect(element.title).toBeUndefined();
        expect(element.iconName).toBeUndefined();
        expect(element.collapsible).toBeFalsy();
        expect(element.closed).toBeFalsy();
        expect(element.groupBy).toBeUndefined();
        expect(element.items).toMatchObject([]);
        expect(element.actions).toMatchObject([]);
    });

    /* ----- ATTRIBUTES ----- */

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

    // icon name
    it('Activity Timeline: icon name', () => {
        element.iconName = 'standard:case';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '.slds-media__figure > lightning-icon'
            );
            expect(icon.iconName).toBe('standard:case');
        });
    });

    // collapsible
    // needs to specify the group by to have sections
    it('Activity Timeline: collapsible', () => {
        element.items = ITEMS;
        element.groupBy = 'week';
        element.collapsible = true;

        return Promise.resolve().then(() => {
            const expandableSection = element.shadowRoot.querySelector(
                'c-expandable-section'
            );
            expect(expandableSection.collapsible).toBeTruthy();
        });
    });

    // closed
    // needs to specify the group by to have sections
    it('Activity Timeline: closed', () => {
        element.items = ITEMS;
        element.groupBy = 'week';
        element.closed = true;

        return Promise.resolve().then(() => {
            const expandableSection = element.shadowRoot.querySelector(
                '[data-element-id="avonni-expandable-section"]'
            );
            expect(expandableSection.closed).toBeTruthy();
        });
    });

    // group by
    it('Activity Timeline: group by undefined', () => {
        element.items = ITEMS;

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
        element.items = ITEMS;
        element.groupBy = 'week';
        const firstSection = 'Upcoming';
        const secondSection = 'Week: 21, 2021';
        const thirdSection = 'Week: 20, 2021';
        const fourthSection = 'Week: 17, 2021';

        return Promise.resolve().then(() => {
            const expandableSection = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-expandable-section"]'
            );
            expect(expandableSection).toHaveLength(4);
            expect(expandableSection[0].title).toBe(firstSection);
            expect(expandableSection[1].title).toBe(secondSection);
            expect(expandableSection[2].title).toBe(thirdSection);
            expect(expandableSection[3].title).toBe(fourthSection);
        });
    });

    it('Activity Timeline: group by year', () => {
        element.groupBy = 'year';
        element.items = ITEMS;
        const firstSection = 'Upcoming';
        const secondSection = '2021';

        return Promise.resolve().then(() => {
            const expandableSection = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-expandable-section"]'
            );
            expect(expandableSection).toHaveLength(2);
            expect(expandableSection[0].title).toBe(firstSection);
            expect(expandableSection[1].title).toBe(secondSection);
        });
    });

    it('Activity Timeline: group by month', () => {
        element.groupBy = 'month';
        element.items = ITEMS;
        const firstSection = 'Upcoming';
        const secondSection = 'May 2021';
        const thirdSection = 'April 2021';

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
                iconName: 'standard:email',
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
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-activity-timeline-item"]'
            );

            expect(items).toHaveLength(2);

            items.forEach((item, index) => {
                expect(item.title).toBe(ITEM[index].title);
                expect(item.description).toBe(ITEM[index].description);
                expect(item.datetimeValue).toBe(ITEM[index].datetimeValue);
                expect(item.href).toBe(ITEM[index].href);
                expect(item.iconName).toBe(ITEM[index].iconName);
                expect(item.fields).toMatchObject(ITEM[index].fields);
                expect(item.hasCheckbox).toBe(ITEM[index].hasCheckbox || false);
                expect(item.hasError).toBe(ITEM[index].hasError || false);
                expect(item.isLoading).toBe(ITEM[index].isLoading || false);
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

    // actions
    it('Activity Timeline: actions', () => {
        element.items = ITEMS;
        element.actions = ACTIONS;

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-activity-timeline-item"]'
            );

            expect(items.actions).toMatchObject(ACTIONS);
        });
    });
});
