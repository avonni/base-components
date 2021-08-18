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
        editable: true
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
        fieldName: 'dateLocal',
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
        editable: true,
        initialWidth: 225
    },
    {
        label: 'Formatted Rich Text',
        fieldName: 'formattedRichText',
        type: 'formatted-rich-text',
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
        }
    }
];

const columnsOQ = [
    {
        label: 'Percent',
        fieldName: 'percent',
        type: 'percent',
        editable: true
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
        type: 'text',
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
        label: 'Status',
        fieldName: 'badge',
        type: 'badge',
        typeAttributes: {
            variant: { fieldName: 'badgeVariant' }
        }
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
        editable: true,
        summarizeTypes: [
            'count',
            'countUnique',
            'average',
            'median',
            'max',
            'min',
            'mode'
        ],
        initialWidth: 280
    },
    {
        label: 'Progress Ring',
        fieldName: 'progress',
        type: 'progress-ring',
        typeAttributes: {
            variant: { fieldName: 'progressRingVariant' },
            size: 'large'
        },
        summarizeTypes: ['count', 'sum', 'average', 'min', 'max'],
        initialWidth: 130
    },
    {
        label: 'Price',
        fieldName: 'currency',
        type: 'currency',
        typeAttributes: {
            currencyCode: 'CAD'
        },
        editable: true,
        summarizeTypes: [
            'count',
            'countUnique',
            'average',
            'median',
            'min',
            'max'
        ]
    },
    {
        label: 'Amount',
        type: 'number',
        fieldName: 'number',
        typeAttributes: {
            minimumFractionDigits: 1
        },
        summarizeTypes: ['sum', 'min', 'max', 'mode']
    },
    {
        label: 'Percent',
        fieldName: 'percent',
        type: 'percent',
        editable: true,
        summarizeTypes: ['count', 'countUnique', 'median', 'min', 'max', 'mode']
    }
];
const columnsGroupBy = [
    {
        id: 1,
        label: 'Name',
        fieldName: 'name',
        editable: true
    },
    {
        id: 2,
        label: 'Age',
        fieldName: 'age',
        type: 'number',
        summarizeTypes: ['count', 'average']
    },
    {
        id: 3,
        label: 'City',
        fieldName: 'city'
    },
    {
        id: 4,
        label: 'District',
        fieldName: 'district'
    }
];

const recordsAB = [
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

const recordsCD = [
    {
        id: 1,
        colorPicker: '#00a1e0',
        currency: '200',
        dynamicIcon: 'ellie',
        date: new Date('2022/03/24'),
        dateLocal: new Date('2022/03/24'),
        combobox: 'no-avatar-burlington'
    },
    {
        id: 2,
        currency: '230',
        colorPicker: '#e65cd1',
        dynamicIcon: 'score',
        dynamicIconOption: 'negative',
        date: new Date('2022/03/21'),
        dateLocal: new Date('2022/03/21')
    },
    {
        id: 3,
        checkboxButton: true,
        checkboxButtonDisabled: true,
        currency: '3045',
        colorPickerDisabled: true,
        dynamicIcon: 'strength',
        dynamicIconOption: -3,
        date: new Date('2022/05/04'),
        dateLocal: new Date('2022/05/04'),
        isMultiSelect: true
    },
    {
        id: 4,
        colorPicker: '#f4bc25',
        currency: '432',
        dynamicIcon: 'eq',
        date: new Date('2021/02/14'),
        dateLocal: new Date('2021/02/14')
    },
    {
        id: 5,
        checkboxButton: true,
        colorPicker: '#f99120',
        currency: '217',
        dynamicIcon: 'waffle',
        date: new Date('2021/02/14'),
        dateLocal: new Date('2022/10/12')
    }
];
const recordsEN = [
    {
        id: 1,
        email: 'nina.gomez@email.com',
        formattedRichText: '<h1>Header 1</h1>',
        image:
            'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg',
        inputCounter: 1,
        inputDateRange: {
            startDate: new Date('2021/10/02'),
            endDate: new Date('2021/10/05')
        },
        location: {
            latitude: '45.53',
            longitude: '-73.61'
        },
        number: '6'
    },
    {
        id: 2,
        email: 'dave.mckinsley@email.com',
        formattedRichText: '<h2>Header 2</h2>',
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
        number: '18'
    },
    {
        id: 3,
        email: 'jung.phung@email.com',
        formattedRichText: '<h3>Header 3</h3>',
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
        number: '1789'
    },
    {
        id: 4,
        email: 'lily.murray@email.com',
        formattedRichText: '<h4>Header 4</h4>',
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
        number: '345'
    },
    {
        id: 5,
        email: 'reginald.martin@email.com',
        formattedRichText: '<h5>Header 5</h5>',
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
        number: '9'
    }
];

const recordsOQ = [
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
const recordsRZ = [
    {
        id: 1,
        rating: '3',
        slider: 36,
        text: 'Nina Gomez',
        url: 'https://www.avonnicomponents.com/',
        urlLabel: 'Avonni Components Documentation'
    },
    {
        id: 2,
        rating: '2',
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
        rating: '5',
        slider: 36,
        sliderStep: 4,
        text: 'Lily Murray',
        url: 'https://www.lightningdesignsystem.com/',
        urlLabel: 'Lightning Design System'
    },
    {
        id: 5,
        rating: '4',
        slider: '0',
        text: 'Reginald Martin',
        url: 'https://lwc.dev/',
        urlLabel: 'LWC Documentation'
    }
];

const recordsSum = [
    {
        id: 1,
        date: new Date('2021/09/24'),
        progress: 100,
        progressRingVariant: 'base-autocomplete',
        badge: 'approved',
        badgeVariant: 'success',
        currency: '5',
        number: '5',
        percent: '0.05'
    },
    {
        id: 2,
        date: new Date('2021/10/24'),
        badge: 'declined',
        progressRingVariant: 'expired',
        progress: 0,
        badgeVariant: 'error',
        currency: '5',
        number: '10',
        percent: '0.1'
    },
    {
        id: 3,
        date: new Date('2021/10/24'),
        progress: 75,
        progressRingVariant: 'warning',
        badge: 'unknown',
        badgeVariant: 'inverse',
        number: '15',
        percent: '0.15'
    },
    {
        id: 4,
        date: new Date('2021/11/24'),
        progress: 50,
        badge: 'approved',
        badgeVariant: 'success',
        currency: '20',
        number: '20',
        percent: '0.2'
    },
    {
        id: 5,
        date: new Date('2021/12/24'),
        progress: 35,
        badge: 'approved',
        badgeVariant: 'success',
        currency: '25',
        number: '25',
        percent: '0.25'
    },
    {
        id: 6,
        date: new Date('2022/01/24'),
        progress: 20,
        badge: 'approved',
        badgeVariant: 'success',
        currency: '25',
        number: '25',
        percent: '0.25'
    }
];

const recordsGroupBy = [
    {
        id: 1,
        name: 'Karen',
        age: '88',
        city: 'Montreal',
        district: 'Plateau'
    },
    {
        id: 2,
        name: 'James',
        age: '87',
        city: 'Montreal',
        district: 'Villeray'
    },
    {
        id: 3,
        name: 'Jane',
        age: '30',
        city: 'Laval',
        district: 'Viau'
    },
    {
        id: 4,
        name: 'Don',
        age: '18',
        city: 'Longueuil',
        district: 'Old Longueuil'
    },
    {
        id: 5,
        name: 'Donald',
        age: '16',
        city: 'Longueuil',
        district: 'Saint-Hubert'
    },
    {
        id: 6,
        name: 'Jenny',
        age: '56',
        city: 'Longueuil',
        district: 'Greenfield Park'
    },
    {
        id: 7,
        name: 'Doug',
        age: '61',
        city: 'Montreal',
        district: 'Outremont'
    },
    {
        id: 8,
        name: 'Michel',
        age: '19',
        city: 'Longueuil',
        district: 'Greenfield Park'
    },
    {
        id: 9,
        name: 'Renaud',
        age: '29',
        city: 'Longueuil',
        district: 'Saint-Hubert'
    },
    {
        id: 10,
        name: 'Linda',
        age: '14',
        city: 'Laval',
        district: 'Vimont'
    },
    {
        id: 11,
        name: 'Daniel',
        age: '41',
        city: 'Laval'
    },
    {
        id: 12,
        name: 'Mike',
        age: '30',
        city: 'Laval',
        district: 'Vimont'
    },
    {
        id: 13,
        name: 'Melissa',
        age: '73',
        city: 'Montreal',
        district: 'Plateau'
    },
    {
        id: 14,
        name: 'Lisa',
        age: '15',
        city: 'Laval',
        district: 'Viau'
    },
    {
        id: 15,
        name: 'Tyrone',
        age: '16',
        city: 'Montreal',
        district: 'Outremont'
    },
    {
        id: 16,
        name: 'Carlito',
        age: '19',
        city: 'Montreal',
        district: 'Outremont'
    },
    {
        id: 16,
        name: 'Jeanne',
        age: '29',
        city: 'Longueuil'
    }
];

export {
    columnsAB,
    columnsCD,
    columnsEN,
    columnsOQ,
    columnsRZ,
    columnsSum,
    columnsGroupBy,
    recordsAB,
    recordsCD,
    recordsEN,
    recordsOQ,
    recordsRZ,
    recordsSum,
    recordsGroupBy
};
