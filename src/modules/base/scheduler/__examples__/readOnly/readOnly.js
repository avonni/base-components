import { LightningElement } from 'lwc';

export default class SchedulerReadOnly extends LightningElement {
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

    contextMenuEventActions = [
        {
            name: 'see-details',
            label: 'See details'
        }
    ];

    events = [
        {
            keyFields: ['3'],
            name: 'research',
            title: 'Research',
            from: new Date(2021, 11, 13, 9),
            to: new Date(2021, 11, 14, 12)
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
            to: new Date(2021, 11, 16, 12)
        },
        {
            keyFields: ['4'],
            name: 'create-mockup',
            title: 'Create mockup',
            from: new Date(2021, 11, 20, 7),
            to: new Date(2021, 11, 22, 10, 30)
        },
        {
            keyFields: ['2'],
            name: 'test-new-ui',
            title: 'Test new UI',
            from: new Date(2021, 11, 17, 15),
            to: new Date(2021, 11, 21)
        },
        {
            keyFields: ['5'],
            name: 'implement-feature',
            title: 'Implement feature',
            from: new Date(2021, 11, 13, 14),
            to: new Date(2021, 11, 15, 16)
        },
        {
            keyFields: ['1'],
            name: 'push-to-prod',
            title: 'Push to production',
            from: new Date(2021, 11, 16, 11),
            to: new Date(2021, 11, 16, 12)
        },
        {
            keyFields: ['1'],
            name: 'phone-meeting',
            title: 'Phone meeting',
            from: new Date(2021, 11, 21, 10),
            to: new Date(2021, 11, 21, 12)
        },
        {
            keyFields: ['3'],
            name: 'update-documentation',
            title: 'Update documentation',
            from: new Date(2021, 11, 17, 11),
            to: new Date(2021, 11, 17, 18)
        },
        {
            keyFields: ['3'],
            name: 'presentation',
            title: 'Presentation at the conference',
            from: new Date(2021, 11, 16, 11),
            to: new Date(2021, 11, 16, 18)
        },
        {
            keyFields: ['2', '4'],
            name: 'ux-ui-team-meeting',
            title: 'UI/UX team meeting',
            from: new Date(2021, 11, 17, 11),
            to: new Date(2021, 11, 17, 12),
            recurrence: 'weekly'
        },
        {
            keyFields: ['1', '2', '3', '4', '5'],
            name: 'office-party',
            title: 'Office party',
            from: new Date(2021, 11, 24, 12),
            to: new Date(2021, 11, 25)
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

    rows = [
        {
            id: '1',
            avatarSrc:
                'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
            avatarFallbackIconName: 'standard:person_account',
            avatarInitials: 'NG',
            firstName: 'Nina',
            role: 'Lead developer'
        },
        {
            id: '2',
            avatarSrc:
                'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
            avatarFallbackIconName: 'standard:person_account',
            avatarInitials: 'DM',
            firstName: 'Dave',
            role: 'UX Specialist'
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
            role: 'Graphic Designer'
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
        span: 5
    };
}
