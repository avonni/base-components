const avatarGroupItems = [
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
        }
    },
    {
        label: 'Avatar Group',
        fieldName: 'avatarGroup',
        type: 'avatar-group',
        typeAttributes: {
            variant: 'circle',
            maxCount: 3,
            size: 'small'
        }
    },
    {
        label: 'Checkbox button',
        fieldName: 'checkboxButton',
        type: 'checkbox-button',
        typeAttributes: {
            disabled: { fieldName: 'checkboxButtonDisabled' },
            label: 'Checkbox'
        }
    },
    {
        label: 'Color Picker',
        fieldName: 'colorPicker',
        type: 'color-picker',
        typeAttributes: {
            colors: [
                '#00a1e0',
                '#16325c',
                '#76ded9',
                '#08a69e',
                '#e2ce7d',
                '#e69f00'
            ],
            disabled: { fieldName: 'colorPickerDisabled' },
            label: 'Pick a color',
            opacity: true
        }
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
        typeAttributes: {
            alt: { fieldName: 'avatarPrimaryText' },
            blank: { fieldName: 'imageBlank' },
            blankColor: { fieldName: 'imageBlankColor' },
            width: 100,
            height: { fieldName: 'imageHeight' }
        }
    },
    {
        label: 'Input Counter',
        fieldName: 'inputCounter',
        type: 'input-counter',
        typeAttributes: {
            disabled: { fieldName: 'inputCounterDisabled' },
            label: 'Counter',
            step: { fieldName: 'inputCounterStep' }
        }
    },
    {
        label: 'Input Date Range',
        fieldName: 'inputDateRange',
        type: 'input-date-range',
        typeAttributes: {
            disabled: { fieldName: 'inputDateRangeDisabled' },
            dateStyle: 'short'
        }
    }
];

const data = [
    {
        id: 1,
        avatar:
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
        avatarInitials: 'NG',
        avatarSecondaryText: 'Approved',
        avatarStatus: 'approved',
        avatarPrimaryText: 'Nina Gomez',
        avatarFallbackIconName: 'standard:person_account',
        avatarGroup: [
            avatarGroupItems[1],
            avatarGroupItems[4],
            avatarGroupItems[3]
        ],
        colorPicker: '#00a1e0',
        currency: 200,
        image:
            'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg',
        inputDateRange: {
            startDate: new Date('2021/10/02'),
            endDate: new Date('2021/10/05')
        }
    },
    {
        id: 2,
        avatar:
            'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
        avatarFallbackIconName: 'standard:person_account',
        avatarInitials: 'DM',
        avatarSecondaryText: 'Declined',
        avatarStatus: 'declined',
        avatarPrimaryText: 'Dave McKinsley',
        avatarGroup: [
            avatarGroupItems[0],
            avatarGroupItems[3],
            avatarGroupItems[4],
            avatarGroupItems[2]
        ],
        currency: 230,
        colorPicker: '#16325c',
        image:
            'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/tbc_banner_2x.jpg',
        inputCounter: 3,
        inputDateRange: {
            startDate: new Date('2021/09/12'),
            endDate: new Date('2021/10/05')
        }
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
            avatarGroupItems[0],
            avatarGroupItems[1],
            avatarGroupItems[3]
        ],
        checkboxButton: true,
        checkboxButtonDisabled: true,
        currency: 3045,
        colorPickerDisabled: true,
        image:
            'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/tbc_banner_2x.jpg',
        imageBlank: true,
        imageBlankColor: '#CCC',
        imageHeight: 50,
        inputCounterDisabled: true,
        inputDateRangeDisabled: true
    },
    {
        id: 4,
        avatarFallbackIconName: 'standard:person_account',
        avatarSecondaryText: 'Approved',
        avatarStatus: 'approved',
        avatarPrimaryText: 'Lily Murray',
        avatarGroup: [
            avatarGroupItems[1],
            avatarGroupItems[2],
            avatarGroupItems[0]
        ],
        colorPicker: '#f4bc25',
        currency: 432,
        image:
            'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/tdx-home-bg_2x.png',
        inputCounter: 5,
        inputDateRange: {
            startDate: new Date('2021/09/17'),
            endDate: new Date('2021/09/25')
        }
    },
    {
        id: 5,
        avatar:
            'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
        avatarFallbackIconName: 'standard:person_account',
        avatarInitials: 'RM',
        avatarSecondaryText: 'Approved',
        avatarStatus: 'approved',
        avatarPrimaryText: 'Reginald Martin',
        avatarGroup: [
            avatarGroupItems[4],
            avatarGroupItems[2],
            avatarGroupItems[1],
            avatarGroupItems[3]
        ],
        checkboxButton: true,
        colorPicker: '#f99120',
        currency: 217,
        image:
            'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/tdx-header-bg_2x.png',
        inputCounterStep: 2,
        inputCounter: 0,
        inputDateRange: {
            startDate: new Date('2021/08/02'),
            endDate: new Date('2021/09/15')
        }
    }
];

export { columns, data };
