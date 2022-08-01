import { LightningElement } from 'lwc';

export default class ChipContainerBase extends LightningElement {
    items = [
        {
            label: 'First chip',
            variant: 'base'
        },
        {
            label: 'Second chip',
            variant: 'offline'
        },
        {
            label: 'Third chip',
            variant: 'error'
        },
        {
            label: 'Fourth chip',
            variant: 'warning'
        },
        {
            label: 'Fifth chip',
            variant: 'success'
        },
        {
            label: 'Sixth chip',
            variant: 'brand'
        }
    ];
}
