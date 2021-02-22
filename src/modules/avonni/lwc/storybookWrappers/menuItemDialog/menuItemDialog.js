import { LightningElement, api } from 'lwc';

export default class MenuItemDialog extends LightningElement {
    @api value;
    @api accessKey;
    @api draftAlternativeText;
    @api iconName;
    @api label;
    @api prefixIconName;
    @api tabIndex = '0';
    @api disabled = false;
    @api isDraft = false;
}
