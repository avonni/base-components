import { LightningElement, api } from 'lwc';

export default class InputToggle extends LightningElement {
    @api accessKey = null;
    @api ariaControls = null;
    @api ariaDescribedBy = null;
    @api ariaLabel = null;
    @api ariaLabelledBy = null;
    @api checked;
    @api disabled;
    @api fieldLevelHelp;
    @api hideMark = false;
    @api label = 'Toggle Label';
    @api messageToggleActive = 'Active';
    @api messageToggleInactive = 'Inactive';
    @api messageWhenValueMissing;
    @api name;
    @api readOnly;
    @api required;
    @api size = 'medium';
    @api validity;
    @api value;
    @api variant;
}
