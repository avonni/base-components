const avatars = [
    {
        fallbackIconName: 'standard:person_account',
        initials: 'NG',
        secondaryText: 'Approved',
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
        variant: 'circle',
        status: 'approved',
        statusPosition: 'bottom-right',
        primaryText: 'Nina Gomez'
    },
    {
        fallbackIconName: 'standard:person_account',
        initials: 'DM',
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
        secondaryText: 'Declined',
        variant: 'circle',
        status: 'declined',
        statusPosition: 'bottom-right',
        primaryText: 'Dave McKinsley'
    },
    {
        fallbackIconName: 'standard:person_account',
        initials: 'JP',
        secondaryText: 'Unknown',
        variant: 'circle',
        status: 'unknown',
        statusPosition: 'bottom-right',
        primaryText: 'Jung Phung'
    },
    {
        fallbackIconName: 'standard:person_account',
        secondaryText: 'Approved',
        variant: 'circle',
        status: 'approved',
        statusPosition: 'bottom-right',
        primaryText: 'Lily Murray'
    },
    {
        fallbackIconName: 'standard:person_account',
        initials: 'RM',
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
        secondaryText: 'Approved',
        variant: 'circle',
        status: 'approved',
        statusPosition: 'bottom-right',
        primaryText: 'Reginald Martin'
    }
];

const avatarsForAvatarGroup = [
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
        initials: 'JP',
        alternativeText: 'Jung Phung'
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
    }
];

const columns = [
    {
        label: 'Avatar',
        fieldName: 'avatar',
        type: 'avatar'
    },
    {
        label: 'Avatar Group',
        fieldName: 'avatarGroup',
        type: 'avatar-group'
    },
    {
        label: 'Color Picker',
        fieldName: 'colorPicker',
        type: 'color-picker'
    },
    {
        label: 'Currency',
        fieldName: 'currency',
        type: 'currency',
        typeAttributes: {
            currencyCode: 'CAD'
        }
    }
];

const data = [
    {
        id: 1,
        avatar: avatars[0],
        avatarGroup: {
            items: [
                avatarsForAvatarGroup[1],
                avatarsForAvatarGroup[4],
                avatarsForAvatarGroup[3]
            ],
            maxCount: 3,
            variant: 'circle'
        },
        colorPicker: {
            value: '#bd35bd'
        },
        currency: 200
    },
    {
        id: 2,
        avatar: avatars[1],
        avatarGroup: {
            items: [
                avatarsForAvatarGroup[0],
                avatarsForAvatarGroup[3],
                avatarsForAvatarGroup[4],
                avatarsForAvatarGroup[2]
            ],
            maxCount: 3,
            variant: 'circle'
        },
        currency: 230,
        colorPicker: {
            value: '#5ebbff'
        }
    },
    {
        id: 3,
        avatar: avatars[2],
        avatarGroup: {
            items: [
                avatarsForAvatarGroup[0],
                avatarsForAvatarGroup[1],
                avatarsForAvatarGroup[3]
            ],
            maxCount: 3,
            variant: 'circle'
        },
        currency: 3045,
        colorPicker: {
            value: '#3bba4c',
            disabled: true
        }
    },
    {
        id: 4,
        avatar: avatars[3],
        avatarGroup: {
            items: [
                avatarsForAvatarGroup[1],
                avatarsForAvatarGroup[2],
                avatarsForAvatarGroup[0]
            ],
            maxCount: 3,
            variant: 'circle'
        },
        colorPicker: {
            value: '#f4bc25'
        },
        currency: 432
    },
    {
        id: 5,
        avatar: avatars[4],
        avatarGroup: {
            items: [
                avatarsForAvatarGroup[4],
                avatarsForAvatarGroup[2],
                avatarsForAvatarGroup[1],
                avatarsForAvatarGroup[3]
            ],
            maxCount: 3,
            variant: 'circle'
        },
        colorPicker: {
            value: '#f99120'
        },
        currency: 217
    }
];

export { columns, data };
