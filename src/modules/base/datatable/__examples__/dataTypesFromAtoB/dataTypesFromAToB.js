import { LightningElement } from 'lwc';

export default class DataTypesFromAToB extends LightningElement {
    columns = [
        {
            label: 'Action',
            fieldName: 'action',
            type: 'action',
            typeAttributes: {
                rowActions: [
                    {
                        label: 'Add',
                        name: 'add',
                        iconName: 'utility:add'
                    },
                    {
                        label: 'Delete',
                        name: 'delete',
                        iconName: 'utility:delete'
                    }
                ],
                menuAlignment: 'left'
            }
        },
        {
            label: 'Avatar',
            fieldName: 'avatar',
            type: 'avatar',
            typeAttributes: {
                alternativeText: 'Avatar',
                entityIconName: { fieldName: 'avatarEntityIconName' },
                fallbackIconName: { fieldName: 'avatarFallbackIconName' },
                initials: { fieldName: 'avatarInitials' },
                size: 'large',
                primaryText: { fieldName: 'avatarPrimaryText' },
                secondaryText: { fieldName: 'avatarSecondaryText' },
                status: { fieldName: 'avatarStatus' }
            },
            actions: [
                { label: 'All', checked: true, name: 'all' },
                { label: 'Published', checked: false, name: 'show_published' },
                {
                    label: 'Unpublished',
                    checked: false,
                    name: 'show_unpublished'
                }
            ]
        },
        {
            label: 'Avatar Group',
            fieldName: 'avatarGroup',
            type: 'avatar-group',
            typeAttributes: {
                variant: 'circle',
                maxCount: 3,
                size: 'small',
                actionIconName: 'utility:add',
                name: { fieldName: 'avatarGroupName' }
            }
        },
        {
            label: 'Badge',
            fieldName: 'badge',
            type: 'badge',
            typeAttributes: {
                variant: { fieldName: 'badgeVariant' }
            }
        },
        {
            label: 'Boolean',
            fieldName: 'boolean',
            type: 'boolean',
            editable: true
        },
        {
            label: 'Button',
            fieldName: 'button',
            type: 'button',
            typeAttributes: {
                disabled: { fieldName: 'buttonDisabled' },
                label: { fieldName: 'avatarPrimaryText' }
            }
        },
        {
            label: 'Button icon',
            fieldName: 'buttonIcon',
            type: 'button-icon',
            typeAttributes: {
                disabled: { fieldName: 'buttonIconDisabled' },
                iconName: 'utility:alert'
            }
        }
    ];

    records = [
        {
            id: 1,
            avatar: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
            avatarInitials: 'NG',
            avatarSecondaryText: 'Approved',
            avatarStatus: 'approved',
            avatarPrimaryText: 'Nina Gomez',
            avatarFallbackIconName: 'standard:person_account',
            avatarGroup: [
                {
                    fallbackIconName: 'standard:person_account',
                    initials: 'DM',
                    src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
                    alternativeText: 'Dave McKinsley'
                },
                {
                    fallbackIconName: 'standard:person_account',
                    initials: 'RM',
                    src: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
                    alternativeText: 'Reginald Martin'
                },
                {
                    fallbackIconName: 'standard:person_account',
                    secondaryText: 'Approved',
                    alternativeText: 'Lily Murray'
                }
            ],
            avatarGroupName: 'avatar-group-1',
            badge: 'approved',
            badgeVariant: 'success',
            boolean: true
        },
        {
            id: 2,
            avatar: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
            avatarFallbackIconName: 'standard:person_account',
            avatarInitials: 'DM',
            avatarSecondaryText: 'Declined',
            avatarStatus: 'declined',
            avatarPrimaryText: 'Dave McKinsley',
            avatarGroup: [
                {
                    fallbackIconName: 'standard:person_account',
                    initials: 'NG',
                    src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
                    alternativeText: 'Nina Gomez'
                },
                {
                    fallbackIconName: 'standard:person_account',
                    secondaryText: 'Approved',
                    alternativeText: 'Lily Murray'
                },
                {
                    fallbackIconName: 'standard:person_account',
                    initials: 'RM',
                    src: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
                    alternativeText: 'Reginald Martin'
                },
                {
                    fallbackIconName: 'standard:person_account',
                    initials: 'JP',
                    alternativeText: 'Jung Phung'
                }
            ],
            avatarGroupName: 'avatar-group-2',
            badge: 'declined',
            badgeVariant: 'error',
            boolean: false
        },
        {
            id: 3,
            avatarFallbackIconName: 'standard:person_account',
            avatarInitials: 'JP',
            avatarSecondaryText: 'Unknown',
            avatarStatus: 'unknown',
            avatarEntityIconName: 'standard:article',
            avatarPrimaryText: 'Jung Phung',
            avatarGroup: [
                {
                    fallbackIconName: 'standard:person_account',
                    initials: 'NG',
                    src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
                    alternativeText: 'Nina Gomez'
                },
                {
                    fallbackIconName: 'standard:person_account',
                    initials: 'DM',
                    src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
                    alternativeText: 'Dave McKinsley'
                },
                {
                    fallbackIconName: 'standard:person_account',
                    secondaryText: 'Approved',
                    alternativeText: 'Lily Murray'
                }
            ],
            avatarGroupName: 'avatar-group-3',
            badge: 'unknown',
            badgeVariant: 'inverse',
            buttonDisabled: true,
            buttonIconDisabled: true
        },
        {
            id: 4,
            avatarFallbackIconName: 'standard:person_account',
            avatarSecondaryText: 'Approved',
            avatarStatus: 'approved',
            avatarPrimaryText: 'Lily Murray',
            avatarGroup: [
                {
                    fallbackIconName: 'standard:person_account',
                    initials: 'DM',
                    src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
                    alternativeText: 'Dave McKinsley'
                },
                {
                    fallbackIconName: 'standard:person_account',
                    initials: 'JP',
                    alternativeText: 'Jung Phung'
                },
                {
                    fallbackIconName: 'standard:person_account',
                    initials: 'NG',
                    src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
                    alternativeText: 'Nina Gomez'
                }
            ],
            avatarGroupName: 'avatar-group-4',
            badge: 'approved',
            badgeVariant: 'success',
            boolean: true
        },
        {
            id: 5,
            avatar: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
            avatarFallbackIconName: 'standard:person_account',
            avatarInitials: 'RM',
            avatarSecondaryText: 'Approved',
            avatarStatus: 'approved',
            avatarPrimaryText: 'Reginald Martin',
            avatarGroup: [
                {
                    fallbackIconName: 'standard:person_account',
                    initials: 'RM',
                    src: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
                    alternativeText: 'Reginald Martin'
                },
                {
                    fallbackIconName: 'standard:person_account',
                    initials: 'JP',
                    alternativeText: 'Jung Phung'
                },
                {
                    fallbackIconName: 'standard:person_account',
                    initials: 'DM',
                    src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
                    alternativeText: 'Dave McKinsley'
                },
                {
                    fallbackIconName: 'standard:person_account',
                    secondaryText: 'Approved',
                    alternativeText: 'Lily Murray'
                }
            ],
            avatarGroupName: 'avatar-group-5',
            badge: 'approved',
            badgeVariant: 'success'
        }
    ];
}
