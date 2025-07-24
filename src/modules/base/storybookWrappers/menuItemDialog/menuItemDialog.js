import { LightningElement, api } from 'lwc';

const DEFAULT_TAB_INDEX = '0';

export default class MenuItemDialog extends LightningElement {
    @api accessKey;
    @api disabled = false;
    @api draftAlternativeText;
    @api iconName;
    @api isDraft = false;
    @api label;
    @api prefixIconName;
    @api tabIndex = DEFAULT_TAB_INDEX;
    @api value;
}
