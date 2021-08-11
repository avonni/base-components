import { LightningElement } from 'lwc';

export default class DataListWithListActions extends LightningElement {
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
            name: 'delete-action',
            iconName: 'utility:close'
        }
    ];

    listActions = [
        {
            label: 'Add Lightning Accordion Section',
            name: 'addLightningAccordionSection'
        },
        {
            label: 'Reset List',
            name: 'resetList',
            iconName: 'utility:loop',
            disabled: true
        }
    ];
}
