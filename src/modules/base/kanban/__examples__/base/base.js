import { LightningElement } from 'lwc';

export default class KanbanBase extends LightningElement {
    groupValues = [
        { label: 'Open', value: 'open' },
        { label: 'In Progress', value: 'inProgress' },
        { label: 'Closed', value: 'closed' }
    ];
}
