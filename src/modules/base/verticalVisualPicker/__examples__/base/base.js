import { LightningElement } from 'lwc';

export default class VerticalVisualPickerBase extends LightningElement {
    items = [
        {
            title: 'Item Text',
            description:
                'Some optional item description to help the user better understand what this option is about.',
            value: 'item-1'
        },
        {
            title: 'Item Text',
            description:
                'Some optional item description to help the user better understand what this option is about.',
            value: 'item-2'
        },
        {
            title: 'Item Text',
            description:
                'Some optional item description to help the user better understand what this option is about.',
            value: 'item-3'
        }
    ];
}
