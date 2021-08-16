import { LightningElement } from 'lwc';

export default class SortableDataListWithDividerOnTop extends LightningElement {
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

    records = [
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
}
