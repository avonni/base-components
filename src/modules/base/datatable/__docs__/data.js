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
        },
        editable: true
    },
    {
        label: 'Image',
        fieldName: 'image',
        type: 'image',
        editable: true
    },
    {
        label: 'Input Counter',
        fieldName: 'inputCounter',
        type: 'input-counter'
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
        currency: 200,
        image: {
            src:
                'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg'
        },
        inputCounter: {
            label: 'Counter',
            variant: 'label-hidden'
        }
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
        },
        image: {
            src:
                'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/tbc_banner_2x.jpg'
        },
        inputCounter: {
            label: 'Counter',
            variant: 'label-hidden'
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
        },
        image: {
            blankColor: '#CCC',
            blank: true,
            height: 50,
            width: 50,
            alt: 'Blank image'
        },
        inputCounter: {
            label: 'Counter',
            variant: 'label-hidden'
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
        currency: 432,
        image: {
            src:
                'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/tdx-home-bg_2x.png'
        },
        inputCounter: {
            label: 'Counter',
            variant: 'label-hidden'
        }
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
        currency: 217,
        image: {
            src:
                'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/tdx-header-bg_2x.png'
        },
        inputCounter: {
            label: 'Counter',
            variant: 'label-hidden'
        }
    }
];

export { columns, data };
