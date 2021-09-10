import { LightningElement } from 'lwc';

export default class SchedulerLabels extends LightningElement {
    columns = [
        {
            label: 'Staff',
            fieldName: 'avatarSrc',
            type: 'avatar',
            typeAttributes: {
                alternativeText: 'Avatar',
                fallbackIconName: { fieldName: 'avatarFallbackIconName' },
                initials: { fieldName: 'avatarInitials' },
                primaryText: { fieldName: 'firstName' }
            }
        },
        {
            label: 'Role',
            fieldName: 'role',
            hideDefaultActions: true
        }
    ];

    events = [
        {
            keyFields: ['3'],
            name: 'research',
            title: 'Research',
            from: new Date(2021, 11, 13, 9),
            to: new Date(2021, 11, 14, 12),
            labels: {
                center: {
                    value: 'Custom label and icon specific to this event',
                    iconName: 'utility:key_dates'
                }
            }
        },
        {
            keyFields: ['1'],
            name: 'code-review',
            title: 'Code review',
            from: new Date(2021, 11, 13, 13),
            to: new Date(2021, 11, 13, 15),
            recurrence: 'daily'
        },
        {
            keyFields: ['3', '2'],
            name: 'seminar',
            title: 'Online seminar',
            from: new Date(2021, 11, 14, 8),
            to: new Date(2021, 11, 16)
        },
        {
            keyFields: ['1', '3'],
            name: 'write-spec',
            title: 'Write specifications',
            from: new Date(2021, 11, 15),
            allDay: true
        },
        {
            keyFields: ['2'],
            name: 'create-wireframe',
            title: 'Create wireframe',
            from: new Date(2021, 11, 13, 10, 15),
            to: new Date(2021, 11, 16, 12),
            customEventField: 'Label coming from a custom field in the event',
            labels: {
                center: {
                    fieldName: 'customEventField'
                },
                top: {
                    fieldName: 'customRowField'
                }
            }
        },
        {
            keyFields: ['5'],
            name: 'implement-feature',
            title: 'Implement feature',
            from: new Date(2021, 11, 13, 14),
            to: new Date(2021, 11, 15, 16)
        },
        {
            keyFields: ['1', '5'],
            name: 'standup',
            title: 'Stand-up meeting',
            from: new Date(2021, 11, 13, 9, 30),
            to: new Date(2021, 11, 14, 10),
            recurrence: 'weekly',
            recurrenceAttributes: {
                weekdays: [1, 3, 5]
            }
        }
    ];

    eventLabels = {
        left: {
            fieldName: 'from'
        },
        top: {
            fieldName: 'title'
        },
        bottom: {
            fieldName: 'role'
        },
        right: {
            fieldName: 'to'
        },
        center: {
            fieldName: 'firstName',
            iconName: 'utility:user'
        }
    };

    rows = [
        {
            id: '1',
            avatarSrc:
                'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
            avatarFallbackIconName: 'standard:person_account',
            avatarInitials: 'NG',
            firstName: 'Nina',
            role: 'Lead developer',
            sharedField: "This shouldn't show up"
        },
        {
            id: '2',
            avatarSrc:
                'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
            avatarFallbackIconName: 'standard:person_account',
            avatarInitials: 'DM',
            firstName: 'Dave',
            role: 'UX Specialist',
            customRowField: 'Label coming from a custom field in the row'
        },
        {
            id: '3',
            avatarFallbackIconName: 'standard:person_account',
            avatarInitials: 'JP',
            firstName: 'Jung',
            role: 'Product Owner'
        },
        {
            id: '4',
            avatarFallbackIconName: 'standard:article',
            avatarInitials: 'LM',
            firstName: 'Lily',
            role: 'Graphic Designer',
            customField: "This comes from the row's custom field"
        },
        {
            id: '5',
            avatarSrc:
                'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
            avatarFallbackIconName: 'standard:person_account',
            avatarInitials: 'RM',
            firstName: 'Reginald',
            role: 'Developer'
        }
    ];

    start = new Date(2021, 11, 13, 8);

    timeSpan = {
        unit: 'day',
        span: 2
    };
}
