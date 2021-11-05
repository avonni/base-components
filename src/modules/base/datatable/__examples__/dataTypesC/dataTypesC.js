import { LightningElement } from 'lwc';

export default class DataTypesC extends LightningElement {
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
            label: 'Counter',
            fieldName: 'counter',
            type: 'counter',
            typeAttributes: {
                disabled: { fieldName: 'counterDisabled' },
                label: 'Counter',
                step: { fieldName: 'counterStep' }
            },
            editable: true,
            cellAttributes: {
                alignment: 'center'
            }
        }
    ];

    records = [
        {
            id: 1,
            combobox: 'no-avatar-burlington',
            colorPicker: '#00a1e0',
            currency: '200',
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
            id: 2,
            colorPicker: '#e65cd1',
            counter: 3,
            currency: '230',
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
            colorPickerDisabled: true,
            counter: 1,
            counterDisabled: true,
            currency: '3045',
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
            counter: 5,
            currency: '432',
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
            counterStep: 2,
            counter: 0,
            currency: '217',
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
