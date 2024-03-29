import { LightningElement } from 'lwc';

export default class FilterMenuMultiSelectList extends LightningElement {
    typeAttributes = {
        allowSearch: true,
        isMultiSelect: true,
        items: [
            {
                label: 'Call',
                value: 'call',
                prefixIconName: 'standard:call',
                iconName: 'utility:voicemail_drop'
            },
            {
                label: 'Email',
                value: 'email',
                prefixIconName: 'standard:email'
            },
            {
                label: 'Meeting',
                value: 'meeting',
                prefixIconName: 'standard:service_appointment',
                disabled: true
            },
            {
                label: 'Other',
                value: 'other',
                prefixIconName: 'standard:all'
            },
            {
                label: 'Menu item 5',
                value: 'item-5'
            },
            {
                label: 'Menu item 6',
                value: 'item-6'
            },
            {
                label: 'Menu item 7',
                value: 'item-7'
            }
        ]
    };

    value = ['item-5', 'meeting', 'wrong-value'];
}
