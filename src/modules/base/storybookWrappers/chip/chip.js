import { LightningElement, api } from 'lwc';

const DEFAULT_CHIP_VARIANT = 'base'

export default class Chip extends LightningElement {
    @api label;
    @api variant = DEFAULT_CHIP_VARIANT;
    @api outline = false;
}
