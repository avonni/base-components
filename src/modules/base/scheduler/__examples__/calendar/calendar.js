import { LightningElement } from 'lwc';

export default class SchedulerCalendar extends LightningElement {
    disabledDatesTimes = [
        {
            resourceNames: ['Nina', 'Dave'],
            title: 'Lunch',
            from: new Date(2021, 0, 1, 12),
            to: new Date(2021, 0, 1, 14),
            recurrence: 'weekly',
            recurrenceAttributes: {
                weekdays: [1, 2, 3, 4, 5]
            }
        },
        {
            resourceNames: ['Lily'],
            title: 'Vacation',
            from: new Date(2021, 11, 6),
            to: new Date(2021, 11, 20)
        },
        {
            resourceNames: ['Dave'],
            title: 'Day off',
            from: new Date(2021, 11, 18),
            allDay: true
        },
        {
            resourceNames: ['Jung'],
            title: 'Day off',
            from: new Date(2021, 11, 23),
            allDay: true
        }
    ];

    events = [
        {
            resourceNames: ['Jung'],
            name: 'research',
            title: 'Research',
            from: new Date(2021, 11, 13, 9),
            to: new Date(2021, 11, 14, 12)
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
            resourceNames: ['Jung'],
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
            to: new Date(2021, 11, 16, 12)
        },
        {
            resourceNames: ['Lily'],
            name: 'create-mockup',
            title: 'Create mockup',
            from: new Date(2021, 11, 20, 7),
            to: new Date(2021, 11, 22, 10, 30)
        },
        {
            resourceNames: ['Dave'],
            name: 'test-new-ui',
            title: 'Test new UI',
            from: new Date(2021, 11, 17, 15),
            to: new Date(2021, 11, 21)
        },
        {
            resourceNames: ['Reginald'],
            name: 'implement-feature',
            title: 'Implement feature',
            from: new Date(2021, 11, 13, 14),
            to: new Date(2021, 11, 15, 16)
        },
        {
            resourceNames: ['Nina'],
            name: 'push-to-prod',
            title: 'Push to production',
            from: new Date(2021, 11, 16, 11),
            to: new Date(2021, 11, 16, 12)
        },
        {
            resourceNames: ['Nina'],
            name: 'phone-meeting',
            title: 'Phone meeting',
            from: new Date(2021, 11, 21, 10),
            to: new Date(2021, 11, 21, 12)
        },
        {
            resourceNames: ['Jung'],
            name: 'update-documentation',
            title: 'Update documentation',
            from: new Date(2021, 11, 17, 11),
            to: new Date(2021, 11, 17, 18)
        },
        {
            resourceNames: ['Jung'],
            name: 'presentation',
            title: 'Presentation at the conference',
            from: new Date(2021, 11, 16, 11),
            to: new Date(2021, 11, 16, 18)
        },
        {
            resourceNames: ['Dave', 'Lily'],
            name: 'ux-ui-team-meeting',
            title: 'UI/UX team meeting',
            from: new Date(2021, 11, 17, 11),
            to: new Date(2021, 11, 17, 12),
            recurrence: 'weekly'
        },
        {
            resourceNames: ['Nina', 'Dave', 'Jung', 'Lily', 'Reginald'],
            name: 'office-party',
            title: 'Office party',
            from: new Date(2021, 11, 24, 12),
            to: new Date(2021, 11, 25)
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

    referenceLines = [
        {
            label: 'Now',
            variant: 'success'
        },
        {
            label: 'Deadline',
            variant: 'error',
            date: new Date(2021, 11, 17, 15)
        },
        {
            label: 'Coffee break',
            date: new Date(2022, 1, 1, 10),
            recurrence: 'daily',
            recurrenceEndDate: new Date(2022, 1, 5)
        }
    ];

    resources = [
        {
            avatarSrc:
                'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
            avatarFallbackIconName: 'standard:person_account',
            avatarInitials: 'NG',
            name: 'Nina',
            label: 'Nina G.',
            role: 'Lead developer',
            sharedField: `This shouldn't show up`
        },
        {
            avatarSrc:
                'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
            avatarFallbackIconName: 'standard:person_account',
            avatarInitials: 'DM',
            name: 'Dave',
            label: 'Dave M.',
            role: 'UX Specialist',
            customRowField: 'Label coming from a custom field in the row'
        },
        {
            avatarFallbackIconName: 'standard:person_account',
            avatarInitials: 'JP',
            name: 'Jung',
            label: 'Jung P.',
            role: 'Product Owner'
        },
        {
            avatarFallbackIconName: 'standard:article',
            avatarInitials: 'LM',
            name: 'Lily',
            label: 'Lily M.',
            role: 'Graphic Designer',
            customField: "This comes from the row's custom field"
        },
        {
            avatarSrc:
                'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
            avatarFallbackIconName: 'standard:person_account',
            avatarInitials: 'RM',
            name: 'Reginald',
            label: 'Reginald M.',
            role: 'Developer'
        }
    ];

    selectedResources = ['Dave', 'Jung', 'Reginald'];

    start = new Date(2021, 11, 13, 8);
}
