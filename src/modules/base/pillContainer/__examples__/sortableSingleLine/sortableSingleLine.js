import { LightningElement } from 'lwc';

export default class PillContainerSortableSingleLine extends LightningElement {
    items;
    actions = [
        {
            label: 'Delete',
            name: 'delete',
            iconName: 'utility:close'
        },
        {
            label: 'See record',
            name: 'see',
            iconName: 'utility:search'
        },
        {
            label: 'Edit',
            name: 'edit',
            disabled: true
        }
    ];

    connectedCallback() {
        this.items = this.generateItems();
    }

    generateItems() {
        const items = [];
        for (let i = 0; i < 200; i++) {
            items.push({
                label: `Item ${i}`,
                name: `item-${i}`
            });
        }
        return items;
    }
}
