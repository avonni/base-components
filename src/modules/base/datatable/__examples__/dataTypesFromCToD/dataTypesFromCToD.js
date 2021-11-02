import { LightningElement } from 'lwc';

export default class DataTypesFromCToD extends LightningElement {
    columns = [
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
            fixedWidth: 250,
            editable: true
        },
        {
            label: 'Combobox',
            fieldName: 'combobox',
            type: 'combobox',
            typeAttributes: {
                label: 'Simple Combobox',
                options: { fieldName: 'options' },
                isMultiSelect: { fieldName: 'isMultiSelect' }
            },
            editable: true,
            fixedWidth: 300
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

    records = [
        {
            id: 1,
            colorPicker: '#00a1e0',
            currency: '200',
            dynamicIcon: 'ellie',
            date: new Date('2022/03/24'),
            dateLocal: new Date('2022/03/24'),
            combobox: 'no-avatar-burlington',
            options: [
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
            ],
            isMultiSelect: true
        },
        {
            id: 2,
            currency: '230',
            colorPicker: '#e65cd1',
            dynamicIcon: 'score',
            dynamicIconOption: 'negative',
            date: new Date('2022/03/21'),
            dateLocal: new Date('2022/03/21'),
            options: [
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
            ]
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
            isMultiSelect: true,
            options: [
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
            ]
        },
        {
            id: 4,
            colorPicker: '#f4bc25',
            currency: '432',
            dynamicIcon: 'eq',
            date: new Date('2021/02/14'),
            dateLocal: new Date('2021/02/14'),
            options: [
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
            ]
        },
        {
            id: 5,
            checkboxButton: true,
            colorPicker: '#f99120',
            currency: '217',
            dynamicIcon: 'waffle',
            date: new Date('2021/02/14'),
            dateLocal: new Date('2022/10/12'),
            options: [
                {
                    label: 'Accounts',
                    value: 'accounts'
                },
                {
                    label: 'Opportunities',
                    value: 'opportunities'
                },
                {
                    label: 'Closed',
                    value: 'closed'
                },
                {
                    label: 'Won',
                    value: 'won'
                }
            ]
        }
    ];

    draftValues = [
        {
            colorPicker: '#76ded9',
            id: '1'
        },
        {
            currency: '3044',
            id: '3'
        }
    ];

    errors = {
        rows: {
            2: {
                title: 'Invalid',
                messages: ['The color picked is invalid.'],
                fieldNames: ['colorPicker']
            }
        }
    };
}
