import { LightningElement } from 'lwc';

export default class SliderMultipleRange extends LightningElement {
    get values() {
        return [25, 50, 75];
    }
}
