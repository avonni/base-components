import { LightningElement } from 'lwc';

export default class Compare extends LightningElement {
    compareAttributes = {
        moveOn: 'click',
        orientation: 'horizontal',
        showBeforeAfterOverlay: true,
        showBeforeAfterOverlayOnHover: false
    };
}
