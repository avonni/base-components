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
                primaryText: { fieldName: 'name' }
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
            resourceNames: ['Jung'],
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
            resourceNames: ['Nina'],
            name: 'code-review',
            title: 'Code review',
            from: new Date(2021, 11, 13, 13),
            to: new Date(2021, 11, 13, 15),
            recurrence: 'daily'
        },
        {
            resourceNames: ['Jung', 'Dave'],
            name: 'seminar',
            title: 'Online seminar',
            from: new Date(2021, 11, 14, 8),
            to: new Date(2021, 11, 16)
        },
        {
            resourceNames: ['Nina', 'Jung'],
            name: 'write-spec',
            title: 'Write specifications',
            from: new Date(2021, 11, 15),
            allDay: true
        },
        {
            resourceNames: ['Dave'],
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
            resourceNames: ['Reginald'],
            name: 'implement-feature',
            title: 'Implement feature',
            from: new Date(2021, 11, 13, 14),
            to: new Date(2021, 11, 15, 16)
        },
        {
            resourceNames: ['Nina', 'Reginald'],
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

    resources = [
        {
            avatarSrc:
                'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
            avatarFallbackIconName: 'standard:person_account',
            avatarInitials: 'NG',
            name: 'Nina',
            role: 'Lead developer',
            sharedField: `This shouldn't show up`
        },
        {
            avatarSrc:
                'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
            avatarFallbackIconName: 'standard:person_account',
            avatarInitials: 'DM',
            name: 'Dave',
            role: 'UX Specialist',
            customRowField: 'Label coming from a custom field in the row'
        },
        {
            avatarFallbackIconName: 'standard:person_account',
            avatarInitials: 'JP',
            name: 'Jung',
            role: 'Product Owner'
        },
        {
            avatarFallbackIconName: 'standard:article',
            avatarInitials: 'LM',
            name: 'Lily',
            role: 'Graphic Designer',
            customField: "This comes from the row's custom field"
        },
        {
            avatarSrc:
                'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
            avatarFallbackIconName: 'standard:person_account',
            avatarInitials: 'RM',
            name: 'Reginald',
            role: 'Developer'
        }
    ];

    start = new Date(2021, 11, 13, 8);

    timeSpans = [{ span: 2, label: 'Two days', name: 'twoDays' }];
}
