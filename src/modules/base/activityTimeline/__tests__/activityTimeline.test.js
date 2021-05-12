import { createElement } from 'lwc';
import ActivityTimeline from 'c/activityTimeline';

const items = [
    {
        title:
            'Review proposals for EBC deck with larger team and have marketing review this',
        description: 'You created a task with Charlie Gomez',
        datetimeValue: 1620648000000,
        href: 'salesforce.com',
        iconName: 'standard:task',
        icons: ['utility:refresh'],
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
                value:
                    'Need to finalize proposals and brand details before the meeting',
                type: 'text'
            }
        ],
        hasCheckbox: true
    },
    {
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
                value:
                    'Adam seemed interested in closing this deal quickly! Let’s move.',
                type: 'text'
            }
        ]
    },
    {
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
                value:
                    'Hi everyone, Thanks for meeting with the team today and going through the proposals we saw. This goes on and wraps if needed.',
                type: 'text'
            }
        ],
        buttonLabel: 'Public Sharing',
        buttonIconName: 'utility:world'
    },
    {
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
                value:
                    "Let's discuss the 2017 product roadmap and address any questions",
                type: 'text'
            }
        ],
        buttonLabel: 'Public Sharing',
        buttonIconName: 'utility:world'
    },
    {
        title: 'Create a new task',
        datetimeValue: 1621605600000,
        href: '#',
        iconName: 'standard:dashboard',
        hasError: true,
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
                value:
                    'Need to finalize proposals and brand details before the meeting',
                type: 'text'
            }
        ],
        hasCheckbox: true,
        isLoading: true,
        closed: true
    }
];

const actions = [
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

describe('ActivityTimeline', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-activity-timeline', {
            is: ActivityTimeline
        });

        expect(element.title).toBeUndefined();
        expect(element.iconName).toBeUndefined();
        expect(element.collapsible).toBeFalsy();
        expect(element.closed).toBeFalsy();
        expect(element.groupBy).toBe('week');
        expect(element.items).toMatchObject([]);
        expect(element.actions).toMatchObject([]);
    });

    /* ----- ATTRIBUTES ----- */

    // title
    it('Activity timeline title', () => {
        const element = createElement('base-activity-timeline', {
            is: ActivityTimeline
        });
        document.body.appendChild(element);
        
        element.title = 'This is an title text';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector('.slds-section__title');
            expect(title.textContent).toBe('This is an title text');
        });
    });

    // icon name
    it('Activity timeline icon name', () => {
        const element = createElement('base-activity-timeline', {
            is: ActivityTimeline
        });
        document.body.appendChild(element);
        
        element.iconName = 'standard:case'

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('.slds-media__figure > lightning-icon');
            expect(icon.iconName).toBe('standard:case');
        });
    });

    // collapsible
    it('Activity timeline collapsible', () => {
        const element = createElement('base-activity-timeline', {
            is: ActivityTimeline
        });

        
        document.body.appendChild(element);
        
        element.items = items
        element.collapsible = true
        
        return Promise.resolve().then(() => {

        })
        .then(() => {
        })
        .then(() => {
            // console.log(element.shadowRoot.innerHTML)
            const expandableSection = element.shadowRoot.querySelector('c-expandable-section');
            expect(expandableSection.collapsible).toBe('standard:case');
        });
    });
});