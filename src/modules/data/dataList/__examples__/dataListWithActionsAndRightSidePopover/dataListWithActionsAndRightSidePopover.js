import { LightningElement } from 'lwc';

export default class DataListWithActionsAndRightSidePopover extends LightningElement {
    fields = [
        {
            label: 'Label',
            name: 'label',
            type: 'text'
        },
        {
            label: 'Title',
            name: 'title',
            type: 'text'
        },
        {
            label: 'Name',
            name: 'name',
            type: 'text'
        }
    ];

    data = [
        {
            label: 'Accordion Title A',
            title: 'Lightning Accodion Section',
            name: 'A'
        },
        {
            label: 'Accordion Title B',
            title: 'Lightning Accodion Section',
            name: 'B'
        },
        {
            label: 'Accordion Title C',
            title: 'Lightning Accodion Section',
            name: 'C'
        }
    ];

    actions = [
        {
            label: 'Save',
            name: 'save-action',
            iconName: 'utility:save'
        },
        {
            label: 'Delete',
            name: 'delete-action',
            iconName: 'utility:delete',
            disabled: true
        }
    ];
}
