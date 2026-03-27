import { LightningElement, api } from 'lwc';

const DEFAULT_ILLUSTRATION_SIZE = 'small';
const DEFAULT_ILLUSTRATION_VARIANT = 'text-only';

export default class Illustration extends LightningElement {
    @api alternativeText;
    @api size = DEFAULT_ILLUSTRATION_SIZE;
    @api title;
    @api variant = DEFAULT_ILLUSTRATION_VARIANT;
}
