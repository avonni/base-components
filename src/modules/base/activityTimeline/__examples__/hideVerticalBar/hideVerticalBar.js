import { LightningElement } from 'lwc';

export default class ActivityTimelineHideVerticalBar extends LightningElement {
    items = [
        {
            name: 'item1',
            title: 'Review proposals for EBC deck with larger team and have marketing review this',
            description: 'You created a task with Charlie Gomez',
            datetimeValue: '01/01/2022',
            href: 'salesforce.com',
            avatar: 'standard:task',
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
                    value: 'Need to finalize proposals and brand details before the meeting',
                    type: 'text'
                }
            ]
        },
        {
            name: 'item2',
            title: 'Mobile conversation on Monday',
            description: 'You logged a call with Adam Chan',
            href: '#',
            datetimeValue: new Date(),
            avatar: 'standard:log_a_call',
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
            datetimeValue: '02/20/2022 08:00',
            href: '#',
            avatar: 'standard:email',
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
            datetimeValue: '04/21/2021 8:00',
            href: '#',
            avatar: 'standard:event',
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
            description: 'Fields are loading',
            datetimeValue: '05/21/2022 10:00',
            href: '#',
            avatar: 'standard:dashboard',
            loadingStateAlternativeText: 'Is Loading',
            hasCheckbox: true,
            isLoading: true,
            buttonLabel: 'Public Sharing',
            buttonIconName: 'utility:world'
        },
        {
            name: 'item6',
            title: 'Create another task',
            datetimeValue: '05/21/2022 11:30',
            href: '#',
            avatar: 'standard:case',
            hasCheckbox: true,
            hasError: true
        }
    ];
}
