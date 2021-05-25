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

const columnsAB = [
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
            { label: 'Unpublished', checked: false, name: 'show_unpublished' }
        ]
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
    }
];

const columnsCE = [
    {
        label: 'Checkbox button',
        fieldName: 'checkboxButton',
        type: 'checkbox-button',
        typeAttributes: {
            disabled: { fieldName: 'checkboxButtonDisabled' },
            label: 'Checkbox'
        },
        editable: true
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
        },
        editable: true
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
        label: 'Dynamic icon',
        fieldName: 'dynamicIcon',
        type: 'dynamic-icon',
        typeAttributes: {
            alternativeText: { fieldName: 'dynamicIcon' },
            option: { fieldName: 'dynamicIconOption' }
        }
    }
];

const columnsFN = [
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
        },
        actions: [
            { label: 'All', checked: true, name: 'all' },
            { label: 'Published', checked: false, name: 'show_published' },
            { label: 'Unpublished', checked: false, name: 'show_unpublished' }
        ]
    },
    {
        label: 'Input Counter',
        fieldName: 'inputCounter',
        type: 'input-counter',
        typeAttributes: {
            disabled: { fieldName: 'inputCounterDisabled' },
            label: 'Counter',
            step: { fieldName: 'inputCounterStep' }
        },
        editable: true,
        cellAttributes: {
            alignment: 'center'
        }
    },
    {
        label: 'Input Date Range',
        fieldName: 'inputDateRange',
        type: 'input-date-range',
        typeAttributes: {
            label: 'Date range',
            disabled: { fieldName: 'inputDateRangeDisabled' },
            dateStyle: 'short',
            labelStartDate: 'Start',
            labelEndDate: 'End'
        },
        editable: true
    },
    {
        label: 'Input Toggle',
        fieldName: 'inputToggle',
        type: 'input-toggle',
        typeAttributes: {
            disabled: { fieldName: 'inputToggleDisabled' },
            size: 'large',
            label: 'Toggle'
        },
        editable: true,
        cellAttributes: {
            alignment: 'center'
        }
    }
];

const columnsOQ = [
    {
        label: 'Progress Bar',
        fieldName: 'progress',
        type: 'progress-bar',
        typeAttributes: {
            referenceLines: { fieldName: 'progressBarReferenceLines' },
            theme: { fieldName: 'progressBarTheme' },
            variant: 'circular',
            thickness: 'large'
        }
    },
    {
        label: 'Progress Circle',
        fieldName: 'progress',
        type: 'progress-circle',
        typeAttributes: {
            thickness: 'large',
            size: 'small',
            color: { fieldName: 'progressCircleColor' }
        }
    },
    {
        label: 'Progress Ring',
        fieldName: 'progress',
        type: 'progress-ring',
        typeAttributes: {
            variant: { fieldName: 'progressRingVariant' },
            size: 'large'
        }
    },
    {
        label: 'QR Code',
        fieldName: 'qrcode',
        type: 'qrcode',
        typeAttributes: {
            borderColor: { fieldName: 'qrcodeBorderColor' },
            borderWidth: { fieldName: 'qrcodeBorderWidth' },
            size: 50
        }
    }
];

const columnsRZ = [
    {
        label: 'Rating',
        fieldName: 'rating',
        type: 'rating',
        typeAttributes: {
            iconName: 'utility:favorite',
            label: 'Rating on 5',
            disabled: { fieldName: 'ratingDisabled' }
        },
        editable: true
    },
    {
        label: 'Slider',
        fieldName: 'slider',
        type: 'slider',
        typeAttributes: {
            disabled: { fieldName: 'sliderDisabled' },
            label: 'Slider',
            step: { fieldName: 'sliderStep' }
        },
        editable: true
    }
];

const dataAB = [
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
    }
];

const dataCE = [
    {
        id: 1,
        colorPicker: '#00a1e0',
        currency: 200,
        dynamicIcon: 'ellie'
    },
    {
        id: 2,
        currency: 230,
        colorPicker: '#e65cd1',
        dynamicIcon: 'score',
        dynamicIconOption: 'negative'
    },
    {
        id: 3,
        checkboxButton: true,
        checkboxButtonDisabled: true,
        currency: 3045,
        colorPickerDisabled: true,
        dynamicIcon: 'strength',
        dynamicIconOption: -3
    },
    {
        id: 4,
        colorPicker: '#f4bc25',
        currency: 432,
        dynamicIcon: 'eq'
    },
    {
        id: 5,
        checkboxButton: true,
        colorPicker: '#f99120',
        currency: 217,
        dynamicIcon: 'waffle'
    }
];
const dataFN = [
    {
        id: 1,
        image:
            'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg',
        inputDateRange: {
            startDate: new Date('2021/10/02'),
            endDate: new Date('2021/10/05')
        }
    },
    {
        id: 2,
        image:
            'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/tbc_banner_2x.jpg',
        inputCounter: 3,
        inputDateRange: {
            startDate: new Date('2021/09/12'),
            endDate: new Date('2021/10/05')
        },
        inputToggle: true
    },
    {
        id: 3,
        image:
            'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/tbc_banner_2x.jpg',
        imageBlank: true,
        imageBlankColor: '#CCC',
        imageHeight: 50,
        inputCounterDisabled: true,
        inputDateRangeDisabled: true,
        inputToggleDisabled: true
    },
    {
        id: 4,
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

const dataOQ = [
    {
        id: 1,
        progress: 34,
        progressBarReferenceLines: [
            {
                label: 'IT',
                value: 12,
                variant: 'warning'
            },
            {
                label: 'R&D',
                value: 45,
                variant: 'success'
            }
        ],
        progressRingVariant: 'warning',
        qrcode: 'https://www.avonni.app/'
    },
    {
        id: 2,
        progress: 100,
        progressBarTheme: 'success',
        progressRingVariant: 'base-autocomplete',
        progressCircleColor: '#45c65a',
        qrcode: 'https://www.avonni.app/',
        qrcodeBorderColor: '#45c65a',
        qrcodeBorderWidth: 5
    },
    {
        id: 3,
        progress: 43,
        qrcode: 'https://www.avonni.app/'
    },
    {
        id: 4,
        progress: 5,
        progressBarTheme: 'info',
        progressRingVariant: 'expired',
        qrcode: 'https://www.avonni.app/'
    },
    {
        id: 5,
        progress: 66,
        progressBarTheme: 'alt-inverse',
        progressBarReferenceLines: [
            {
                label: 'IT',
                value: 78,
                borderStyle: 'solid'
            },
            {
                label: 'R&D',
                value: 33,
                borderStyle: 'solid'
            }
        ],
        qrcode: 'https://www.avonni.app/'
    }
];
const dataRZ = [
    {
        id: 1,
        slider: 36
    },
    {
        id: 2,
        slider: 78
    },
    {
        id: 3,
        sliderDisabled: true,
        ratingDisabled: true
    },
    {
        id: 4,
        slider: 3,
        sliderStep: 4
    },
    {
        id: 5
    }
];

export {
    columnsAB,
    columnsCE,
    columnsFN,
    columnsOQ,
    columnsRZ,
    dataAB,
    dataCE,
    dataFN,
    dataOQ,
    dataRZ
};
