import { LightningElement } from 'lwc';

export default class ActivityTimelineHorizontal extends LightningElement {
    items = [
        {
            name: 'item1',
            title: 'Review proposals for EBC deck with larger team and have marketing review this',
            description: 'You created a task with Charlie Gomez',
            datetimeValue: '01/01/2022 7:45',
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
                    label: 'Due Date',
                    value: 'Before Friday, May 13, 2022',
                    type: 'text'
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
            datetimeValue: '02/20/2023 08:00',
            avatar: 'standard:email',
            icons: ['utility:groups', 'utility:attach'],
            buttonLabel: 'Public Sharing',
            buttonIconName: 'utility:world',
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
            ]
        },
        {
            name: 'item4',
            title: 'EBC Follow up call',
            description: 'You created an event with Aida Lee and 5 others',
            icons: ['utility:world'],
            datetimeValue: '04/21/2021 8:00',
            avatar: 'standard:event',
            buttonLabel: 'Public Sharing',
            buttonIconName: 'utility:activity',
            closed: true,
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
            name: 'item5',
            title: 'Create one task',
            description: 'Fields are loading',
            datetimeValue: '02/14/2022 10:00',
            avatar: 'standard:dashboard',
            loadingStateAlternativeText: 'Is Loading',
            hasCheckbox: true,
            isLoading: true,
            buttonLabel: 'Public Sharing',
            buttonIconName: 'utility:brush'
        },
        {
            name: 'item6',
            title: 'Create another task',
            description: 'This is the description of the task.',
            datetimeValue: '01/21/2022 11:30',
            avatar: 'standard:skill',
            hasCheckbox: true,
            hasError: true
        },
        {
            name: 'item7',
            title: 'Meeting with John Smith',
            datetimeValue: '03/14/2022 8:30',
            avatar: 'custom:custom47',
            hasCheckbox: true,
            closed: true,
            hasError: true
        },
        {
            name: 'item8',
            title: 'Meeting with Suzanne Smith',
            description: 'Important follow up for the company.',
            datetimeValue: '02/02/2022 3:30',
            href: '#',
            avatar: 'standard:solution',
            hasCheckbox: false,
            hasError: true
        },
        {
            name: 'item88',
            title: 'Brainstorming with Jasmine',
            datetimeValue: '02/02/2022 5:30',
            avatar: 'standard:procedure_detail',
            hasCheckbox: false,
            hasError: true
        },
        {
            name: 'item9',
            title: 'Brunch meeting',
            description: 'This is the description.',
            datetimeValue: '01/30/2022 2:00',
            href: '#',
            avatar: 'standard:service_request_detail',
            hasCheckbox: false,
            closed: true,
            hasError: true
        },
        {
            name: 'item99',
            title: 'EBC Follow up call',
            description: 'You created an event with Aida Lee and 5 others',
            datetimeValue: '01/31/2022 2:00',
            href: '#',
            avatar: 'action:log_event',
            hasCheckbox: false,
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
                }
            ]
        },
        {
            name: 'item10',
            title: 'Conference',
            description: 'This is the description of the conference.',
            datetimeValue: '01/04/2022 10:30',
            href: '#',
            avatar: 'utility:frozen',
            hasCheckbox: true,
            hasError: false
        },
        {
            name: 'item11',
            title: 'Meeting',
            datetimeValue: '02/03/2022 00:00',
            href: '#',
            avatar: 'standard:bot',
            hasCheckbox: true,
            closed: true,
            hasError: false
        },
        {
            name: 'item12',
            title: 'Release date of new technology',
            datetimeValue: '02/16/2022 00:00',
            href: '#',
            avatar: 'action:map',
            hasCheckbox: true,
            closed: true,
            hasError: false
        },
        {
            name: 'item13',
            title: 'Review business proposal',
            datetimeValue: '02/08/2022 08:00',
            href: '#',
            avatar: 'standard:bot',
            hasCheckbox: true,
            hasError: false
        },
        {
            name: 'item14',
            title: 'Another item',
            description: 'This is the description.',
            datetimeValue: '02/02/2022 08:30',
            href: '#',
            avatar: 'standard:education',
            hasCheckbox: true,
            closed: true,
            hasError: false
        },
        {
            name: 'item15',
            title: 'Meeting with Charles',
            description: 'This is the description.',
            datetimeValue: '02/02/2022 20:30',
            href: '#',
            avatar: 'standard:lead',
            hasCheckbox: true,
            hasError: false
        },
        {
            name: 'item16',
            title: 'Zoom call with client',
            description: 'This is the description.',
            datetimeValue: '02/02/2022 10:45',
            href: '#',
            avatar: 'standard:thanks',
            hasCheckbox: true,
            hasError: false
        },
        {
            name: 'item17',
            title: 'Meeting with Tom',
            description: 'This is the description.',
            datetimeValue: '02/03/2022 10:45',
            href: '#',
            avatar: 'custom:custom69',
            hasCheckbox: true,
            closed: true,
            hasError: false
        },
        {
            name: 'item18',
            title: 'Inauguration of new office',
            datetimeValue: '02/04/2022 10:45',
            href: '#',
            avatar: 'standard:announcement',
            hasCheckbox: true,
            closed: false,
            hasError: false
        },
        {
            name: 'item19',
            title: 'Meeting',
            datetimeValue: '02/04/2022 10:45',
            href: '#',
            avatar: 'action:priority',
            hasCheckbox: true,
            hasError: false
        },
        {
            name: 'item20',
            title: 'Science class',
            description: 'Chemistry subject this week.',
            datetimeValue: '02/02/2022 00:00',
            href: '#',
            avatar: 'utility:education',
            hasCheckbox: true,
            hasError: false
        },
        {
            name: 'item21',
            title: 'Family event',
            description: 'This is the description of the event.',
            datetimeValue: '02/02/2022 08:30',
            href: '#',
            closed: false,
            avatar: 'utility:animal_and_nature',
            hasCheckbox: true,
            hasError: false,
            fields: [
                {
                    label: 'When ?',
                    value: 'Sunday',
                    type: 'url',
                    typeAttributes: {
                        label: 'Sunday morning at 10AM'
                    }
                },
                {
                    label: 'Where ?',
                    value: 'The parc',
                    type: 'url',
                    typeAttributes: {
                        label: 'The parc'
                    }
                },
                {
                    label: 'Description',
                    value: 'Bring your pet!',
                    type: 'text'
                }
            ]
        },
        {
            name: 'item22',
            title: 'Hiking with Nicole',
            description: 'This is the description.',
            datetimeValue: '02/02/2022 08:30',
            href: '#',
            avatar: 'standard:trailhead',
            hasCheckbox: true,
            closed: false,
            hasError: false
        },
        {
            name: 'item23',
            title: 'Meeting with design team',
            datetimeValue: '02/09/2022 08:30',
            href: '#',
            avatar: 'utility:palette',
            hasCheckbox: true,
            closed: false,
            hasError: false
        },
        {
            name: 'item24',
            title: 'Meeting with UX team',
            datetimeValue: '02/09/2024 08:30',
            href: '#',
            avatar: 'utility:pin',
            hasCheckbox: true,
            closed: false,
            hasError: false
        },
        {
            name: 'item25',
            title: 'Cooking class.',
            description: 'This is the description.',
            datetimeValue: '02/02/2022 08:30',
            href: '#',
            avatar: 'standard:recipe',
            hasCheckbox: true,
            hasError: false
        },
        {
            name: 'item26',
            title: 'Event',
            description: 'This is the description.',
            datetimeValue: '02/02/2022 09:30',
            href: '#',
            avatar: 'standard:story',
            hasCheckbox: true,
            hasError: false
        },
        {
            name: 'item27',
            title: 'Surprise party for Johnny',
            datetimeValue: '02/02/2022 22:30',
            href: '#',
            avatar: 'standard:topic',
            hasCheckbox: true,
            hasError: false
        },
        {
            name: 'item28',
            title: 'Event',
            datetimeValue: '09/09/2022 22:30',
            href: '#',
            avatar: 'doctype:video',
            hasCheckbox: true,
            hasError: false
        },
        {
            name: 'item29',
            title: 'Event',
            description: 'Description of the event.',
            datetimeValue: '06/09/2022 10:30',
            href: '#',
            avatar: 'doctype:folder',
            hasCheckbox: true,
            hasError: false
        },
        {
            name: 'item30',
            title: 'Default event',
            datetimeValue: '07/09/2022 10:30',
            href: '#',
            avatar: 'invalid:name',
            hasCheckbox: true,
            hasError: false
        },
        {
            name: 'item31',
            title: 'Custom event',
            datetimeValue: '08/08/2022 11:11',
            href: '#',
            avatar: 'custom:custom74',
            hasCheckbox: true,
            hasError: false
        },
        {
            name: 'item32',
            title: 'Event',
            description: 'This is the description.',
            datetimeValue: '01/01/2021 11:11',
            href: '#',
            avatar: 'custom:custom74',
            hasCheckbox: true,
            hasError: false
        },
        {
            name: 'item33',
            title: 'Deadline to sign contract',
            datetimeValue: '01/04/2022 8:27',
            href: '#',
            avatar: 'custom:custom1',
            hasCheckbox: true,
            hasError: false
        },
        {
            name: 'item34',
            title: 'Important event',
            datetimeValue: '02/11/2022 10:32',
            href: '#',
            avatar: 'utility:classic_interface',
            hasCheckbox: true,
            hasError: false
        },
        {
            name: 'item35',
            title: 'Meeting',
            datetimeValue: '02/11/2023 10:32',
            href: '#',
            avatar: 'standard:swarm_request',
            hasCheckbox: true,
            closed: false,
            hasError: false
        },
        {
            name: 'item36',
            title: 'Important meeting',
            datetimeValue: '11/11/2023 11:11',
            href: '#',
            avatar: 'standard:process_exception',
            hasCheckbox: true,
            closed: false,
            hasError: false
        },
        {
            name: 'item37',
            title: 'Ceremony',
            datetimeValue: '04/11/2021 11:11',
            href: '#',
            avatar: 'standard:reward',
            hasCheckbox: true,
            closed: true,
            hasError: false
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
