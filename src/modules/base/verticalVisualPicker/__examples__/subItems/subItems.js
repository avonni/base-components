import { LightningElement } from 'lwc';

export default class VerticalVisualPickerBase extends LightningElement {
    items = [
        {
            title: 'Item 1 With Sub Items Multi Select',
            description:
                'Some optional item description to help the user better understand what this option is about.',
            value: 'item-1',
            subItemsMultiSelect: true,
            subItems: [
                { label: 'Sub Item 1', value: 'sub-item-1-1' },
                { label: 'Sub Item 2', value: 'sub-item-1-2' },
                { label: 'Sub Item 3', value: 'sub-item-1-3' },
                { label: 'Sub Item 4', value: 'sub-item-1-4' }
            ]
        },
        {
            title: 'Item 2 With Sub Items',
            description:
                'Some optional item description to help the user better understand what this option is about.',
            value: 'item-2',
            subItems: [
                { label: 'Sub Item 1', value: 'sub-item-2-1' },
                { label: 'Sub Item 2', value: 'sub-item-2-2' },
                { label: 'Sub Item 3', value: 'sub-item-2-3' },
                { label: 'Sub Item 4', value: 'sub-item-2-4' }
            ]
        },
        {
            title: 'Item 3 With Sub Items',
            description:
                'Some optional item description to help the user better understand what this option is about.',
            value: 'item-3',
            subItems: [
                { label: 'Sub Item 1', value: 'sub-item-3-1' },
                { label: 'Sub Item 2', value: 'sub-item-3-2' },
                { label: 'Sub Item 3', value: 'sub-item-3-3' },
                { label: 'Sub Item 4', value: 'sub-item-3-4' }
            ]
        }
    ];

    value = [
        'item-1',
        'sub-item-1-2',
        'sub-item-1-3',
        'item-3',
        'sub-item-3-1'
    ];
}
