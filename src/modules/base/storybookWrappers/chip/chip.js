import { LightningElement, api } from 'lwc';

const DEFAULT_CHIP_VARIANT = 'base';

export default class Chip extends LightningElement {
    @api backgroundColor;
    @api hideText = false;
    @api label;
    @api outline = false;
    @api textColor;
    @api variant = DEFAULT_CHIP_VARIANT;
}
