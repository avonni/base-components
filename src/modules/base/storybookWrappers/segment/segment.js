import { LightningElement, api } from 'lwc';

const DEFAULT_SEGMENT_VARIANT = 'SHADE'

export default class Segment extends LightningElement {
    @api value;
    @api variant = DEFAULT_SEGMENT_VARIANT;
    @api disabled = false;
}
