import { LightningElement } from 'lwc';

export default class ActivityTimelineYearly extends LightningElement {
    items = [
        {
            title:
                'Review proposals for EBC deck with larger team and have marketing review this',
            description: 'You created a task with Charlie Gomez',
            datetimeValue: 1620648000000,
            href: 'salesforce.com',
            iconName: 'standard:task',
            icons: ['utility:refresh'],
            hasCheckbox: true,
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
            ]
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
            buttonIconName: 'utility:world',
            closed: true
        },
        {
            title: 'Create one task',
            description: 'Fields are loading',
            datetimeValue: 1621605600000,
            href: '#',
            iconName: 'standard:dashboard',
            loadingStateAlternativeText: 'Is Loading',
            hasCheckbox: true,
            isLoading: true,
            buttonLabel: 'Public Sharing',
            buttonIconName: 'utility:world'
        },
        {
            title: 'Create another task',
            datetimeValue: 1621611000000,
            href: '#',
            iconName: 'standard:case',
            hasCheckbox: true,
            hasError: true
        }
    ];

    actions = [
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
}
