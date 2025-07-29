import { LightningElement, api } from 'lwc';

const DEFAULT_BUTTON_SIZE = 'medium';
const DEFAULT_BUTTON_VARIANT = 'border';

export default class ButtonIconDialog extends LightningElement {
    @api accessKey;
    @api alternativeText;
    @api cancelButtonLabel;
    @api disabled;
    @api iconClass;
    @api iconName;
    @api iconSrc;
    @api isButtonLoading;
    @api loadingStateAlternativeText;
    @api saveButtonLabel;
    @api size = DEFAULT_BUTTON_SIZE;
    @api tooltip;
    @api variant = DEFAULT_BUTTON_VARIANT;
}
