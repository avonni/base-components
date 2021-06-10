import { LightningElement, api } from 'lwc';

const DEFAULT_TAB_INDEX = '0'

export default class MenuItemDialog extends LightningElement {
    @api value;
    @api accessKey;
    @api draftAlternativeText;
    @api iconName;
    @api label;
    @api prefixIconName;
    @api tabIndex = DEFAULT_TAB_INDEX;
    @api disabled = false;
    @api isDraft = false;
}
