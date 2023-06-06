import { LightningElement } from 'lwc';

export default class Compare extends LightningElement {
    compareAttributes = {
        moveOn: 'click',
        orientation: 'horizontal',
        originalLabel: 'Before',
        compareLabel: 'After',
        showLabelsOnHover: false
    };
}
