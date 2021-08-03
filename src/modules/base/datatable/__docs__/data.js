/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2021, Avonni Labs, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

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

const options = [
    {
        label: 'Burlington Textiles Corp of America',
        value: 'no-avatar-burlington'
    },
    {
        label: 'Dickenson plc',
        value: 'no-avatar-dickenson'
    },
    {
        label: 'United Oil SLA',
        value: 'no-avatar-oil-sla'
    },
    {
        label: 'United Oil Standby Generators',
        value: 'no-avatar-united-oil'
    },
    {
        label: 'Edge Communication',
        value: 'no-avatar-edge'
    }
];

const columnsAB = [
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

const columnsCD = [
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
        fixedWidth: 190,
        editable: true
    },
    {
        label: 'Combobox',
        fieldName: 'combobox',
        type: 'combobox',
        typeAttributes: {
            label: 'Simple Combobox',
            options: options,
            isMultiSelect: { fieldName: 'isMultiSelect' }
        },
        editable: true,
        fixedWidth: 260
    },
    {
        label: 'Currency',
        fieldName: 'currency',
        type: 'currency',
        typeAttributes: {
            currencyCode: 'CAD'
        },
        editable: true,
        summarizeTypes: ['max', 'min', 'sum']
    },
    {
        label: 'Date',
        fieldName: 'date',
        type: 'date',
        typeAttributes: {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            timeZone: 'Pacific/Honolulu'
        },
        editable: true
    },
    {
        label: 'Date local',
        fieldName: 'date',
        type: 'date-local',
        typeAttributes: {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
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

const columnsEN = [
    {
        label: 'Email',
        fieldName: 'email',
        type: 'email',
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
    },
    {
        label: 'Location',
        type: 'location',
        fieldName: 'location',
        editable: true
    },
    {
        label: 'Number',
        type: 'number',
        fieldName: 'number',
        editable: true,
        typeAttributes: {
            minimumFractionDigits: 2
        },
        summarizeTypes: ['max', 'min', 'sum']
    }
];

const columnsOQ = [
    {
        label: 'Percent',
        fieldName: 'percent',
        type: 'percent',
        editable: true,
        summarizeTypes: 'mode'
    },
    {
        label: 'Phone',
        fieldName: 'phone',
        type: 'phone',
        editable: true
    },
    {
        label: 'Progress Bar',
        fieldName: 'progress',
        type: 'progress-bar',
        typeAttributes: {
            referenceLines: { fieldName: 'progressBarReferenceLines' },
            theme: { fieldName: 'progressBarTheme' },
            variant: 'circular',
            thickness: 'large'
        },
        initialWidth: 150
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
        editable: true,
        initialWidth: 200
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
    },
    {
        label: 'Text',
        fieldName: 'text',
        editable: true
    },
    {
        label: 'URL',
        fieldName: 'url',
        type: 'url',
        typeAttributes: {
            label: { fieldName: 'urlLabel' },
            target: '_blank'
        }
    }
];

const columnsSum = [
    {
        label: 'Boolean',
        fieldName: 'boolean',
        type: 'boolean',
        editable: true
    },
    {
        label: 'Currency',
        fieldName: 'currency',
        type: 'currency',
        typeAttributes: {
            currencyCode: 'CAD'
        },
        editable: true,
        summarizeTypes: [
            'count',
            'countUnique',
            'sum',
            'average',
            'median',
            'min',
            'max',
            'mode'
        ]
    },
    {
        label: 'Number',
        type: 'number',
        fieldName: 'number',
        typeAttributes: {
            minimumFractionDigits: 4
        },
        summarizeTypes: [
            'count',
            'countUnique',
            'sum',
            'average',
            'median',
            'min',
            'max',
            'mode'
        ]
    },
    {
        label: 'Percent',
        fieldName: 'percent',
        type: 'percent',
        editable: true,
        summarizeTypes: [
            'count',
            'countUnique',
            'average',
            'median',
            'min',
            'max',
            'mode'
        ]
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
        ],
        avatarGroupName: 'avatar-group-1',
        badge: 'approved',
        badgeVariant: 'success',
        boolean: true
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
            avatarGroupItems[0],
            avatarGroupItems[1],
            avatarGroupItems[3]
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
            avatarGroupItems[1],
            avatarGroupItems[2],
            avatarGroupItems[0]
        ],
        avatarGroupName: 'avatar-group-4',
        badge: 'approved',
        badgeVariant: 'success',
        boolean: true
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
        avatarGroupName: 'avatar-group-5',
        badge: 'approved',
        badgeVariant: 'success'
    }
];

const dataCD = [
    {
        id: 1,
        colorPicker: '#00a1e0',
        currency: 200,
        dynamicIcon: 'ellie',
        date: new Date('2022/03/24')
    },
    {
        id: 2,
        currency: 230,
        colorPicker: '#e65cd1',
        dynamicIcon: 'score',
        dynamicIconOption: 'negative',
        date: new Date('2022/03/21')
    },
    {
        id: 3,
        checkboxButton: true,
        checkboxButtonDisabled: true,
        currency: 3045,
        colorPickerDisabled: true,
        dynamicIcon: 'strength',
        dynamicIconOption: -3,
        date: new Date('2022/05/04'),
        isMultiSelect: true
    },
    {
        id: 4,
        colorPicker: '#f4bc25',
        currency: 432,
        dynamicIcon: 'eq',
        date: new Date('2021/02/14')
    },
    {
        id: 5,
        checkboxButton: true,
        colorPicker: '#f99120',
        currency: 217,
        dynamicIcon: 'waffle',
        date: new Date('2022/10/12')
    }
];
const dataEN = [
    {
        id: 1,
        email: 'nina.gomez@email.com',
        image:
            'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg',
        inputDateRange: {
            startDate: new Date('2021/10/02'),
            endDate: new Date('2021/10/05')
        },
        location: {
            latitude: '45.53',
            longitude: '-73.61'
        },
        number: 6
    },
    {
        id: 2,
        email: 'dave.mckinsley@email.com',
        image:
            'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/tbc_banner_2x.jpg',
        inputCounter: 3,
        inputDateRange: {
            startDate: new Date('2021/09/12'),
            endDate: new Date('2021/10/05')
        },
        inputToggle: true,
        location: {
            latitude: '45.53',
            longitude: '-73.58'
        },
        number: 18
    },
    {
        id: 3,
        email: 'jung.phung@email.com',
        image:
            'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/tbc_banner_2x.jpg',
        imageBlank: true,
        imageBlankColor: '#CCC',
        imageHeight: 50,
        inputCounterDisabled: true,
        inputDateRangeDisabled: true,
        inputToggleDisabled: true,
        location: {
            latitude: '45.54',
            longitude: '-73.60'
        },
        number: 1789
    },
    {
        id: 4,
        email: 'lily.murray@email.com',
        image:
            'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/tdx-home-bg_2x.png',
        inputCounter: 5,
        inputDateRange: {
            startDate: new Date('2021/09/17'),
            endDate: new Date('2021/09/25')
        },
        location: {
            latitude: '45.55',
            longitude: '-73.62'
        },
        number: 345
    },
    {
        id: 5,
        email: 'reginald.martin@email.com',
        image:
            'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/tdx-header-bg_2x.png',
        inputCounterStep: 2,
        inputCounter: 0,
        inputDateRange: {
            startDate: new Date('2021/08/02'),
            endDate: new Date('2021/09/15')
        },
        location: {
            latitude: '45.56',
            longitude: '-73.56'
        },
        number: 9
    }
];

const dataOQ = [
    {
        id: 1,
        percent: 0.34,
        phone: '5142223333',
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
        percent: 0.45,
        phone: '5144546767',
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
        percent: 0.67,
        phone: '6785643214',
        progress: 43,
        qrcode: 'https://www.avonni.app/'
    },
    {
        id: 4,
        percent: 4,
        phone: '3547789900',
        progress: 5,
        progressBarTheme: 'info',
        progressRingVariant: 'expired',
        qrcode: 'https://www.avonni.app/'
    },
    {
        id: 5,
        percent: 0.05,
        phone: '5143245564',
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
        slider: 36,
        text: 'Nina Gomez',
        url: 'https://www.avonnicomponents.com/',
        urlLabel: 'Avonni Components Documentation'
    },
    {
        id: 2,
        slider: 78,
        text: 'Dave McKinsley',
        url: 'https://www.avonni.app/',
        urlLabel: 'Avonni'
    },
    {
        id: 3,
        sliderDisabled: true,
        ratingDisabled: true,
        text: 'Jung Phung',
        url:
            'https://developer.salesforce.com/docs/component-library/overview/components',
        urlLabel: 'Salesforce documentation'
    },
    {
        id: 4,
        slider: 3,
        sliderStep: 4,
        text: 'Lily Murray',
        url: 'https://www.lightningdesignsystem.com/',
        urlLabel: 'Lightning Design System'
    },
    {
        id: 5,
        text: 'Reginald Martin',
        url: 'https://lwc.dev/',
        urlLabel: 'LWC Documentation'
    }
];

const dataSum = [
    {
        id: 1,
        currency: 5,
        number: 5,
        percent: 0.05
    },
    {
        id: 2,
        currency: 5,
        number: 10,
        percent: 0.1
    },
    {
        id: 3,
        currency: 15,
        number: 15,
        percent: 0.15
    },
    {
        id: 4,
        currency: 20,
        number: 20,
        percent: 0.2
    },
    {
        id: 5,
        currency: 25,
        number: 25,
        percent: 0.25
    },
    {
        id: 6,
        currency: 25,
        number: 25,
        percent: 0.25
    }
];

export {
    columnsAB,
    columnsCD,
    columnsEN,
    columnsOQ,
    columnsRZ,
    columnsSum,
    dataAB,
    dataCD,
    dataEN,
    dataOQ,
    dataRZ,
    dataSum
};
