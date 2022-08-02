import { LightningElement } from 'lwc';

export default class SliderRange extends LightningElement {
    get values() {
        return [25, 75];
    }
}
