import { LightningElement } from 'lwc';

export default class SchedulerThemesAndColors extends LightningElement {
    columns = [
        {
            label: 'Staff',
            fieldName: 'resourceAvatarSrc',
            type: 'avatar',
            typeAttributes: {
                alternativeText: 'Avatar',
                fallbackIconName: {
                    fieldName: 'resourceAvatarFallbackIconName'
                },
                initials: { fieldName: 'resourceAvatarInitials' },
                primaryText: { fieldName: 'resourceName' }
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
            keyFields: ['1', '5', '4'],
            name: 'event-1',
            title: 'Theme hollow',
            from: 1639400400000,
            to: 1639407600000,
            theme: 'hollow'
        },
        {
            keyFields: ['4'],
            name: 'event-2',
            title: 'Theme line',
            from: 1639404000000,
            to: 1639411200000,
            theme: 'line'
        },
        {
            keyFields: ['5', '3'],
            name: 'event-3',
            title: 'Custom color',
            from: 1639432800000,
            to: 1639440000000,
            color: 'tomato'
        },
        {
            keyFields: ['2', '4'],
            name: 'event-4',
            title: 'Theme transparent',
            from: 1639411200000,
            to: 1639418400000,
            theme: 'transparent'
        },
        {
            keyFields: ['2', '1'],
            name: 'event-5',
            title: 'Theme rounded',
            from: 1639414800000,
            to: 1639422000000,
            theme: 'rounded'
        },
        {
            keyFields: ['4', '1'],
            name: 'event-6',
            title: 'Default theme',
            from: 1639425600000,
            to: 1639432800000
        }
    ];

    resources = [
        {
            id: '1',
            resourceAvatarSrc:
                'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
            resourceAvatarFallbackIconName: 'standard:person_account',
            resourceAvatarInitials: 'NG',
            resourceName: 'Nina',
            role: 'Lead developer',
            sharedField: `This shouldn't show up`
        },
        {
            id: '2',
            resourceAvatarSrc:
                'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
            resourceAvatarFallbackIconName: 'standard:person_account',
            resourceAvatarInitials: 'DM',
            resourceName: 'Dave',
            role: 'UX Specialist',
            customRowField: 'Label coming from a custom field in the row'
        },
        {
            id: '3',
            resourceAvatarFallbackIconName: 'standard:person_account',
            resourceAvatarInitials: 'JP',
            resourceName: 'Jung',
            role: 'Product Owner'
        },
        {
            id: '4',
            resourceAvatarFallbackIconName: 'standard:article',
            resourceAvatarInitials: 'LM',
            resourceName: 'Lily',
            role: 'Graphic Designer',
            customField: "This comes from the row's custom field"
        },
        {
            id: '5',
            resourceAvatarSrc:
                'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
            resourceAvatarFallbackIconName: 'standard:person_account',
            resourceAvatarInitials: 'RM',
            resourceName: 'Reginald',
            role: 'Developer'
        }
    ];

    start = new Date(2021, 11, 13, 8);
}
