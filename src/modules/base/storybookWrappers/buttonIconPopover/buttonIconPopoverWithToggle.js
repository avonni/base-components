import { LightningElement, api } from 'lwc';

const DEFAULT_POPOVER_SIZE = 'medium';
const DEFAULT_POPOVER_PLACEMENT = 'left';
const DEFAULT_BUTTON_VARIANT = 'border';
const DEFAULT_BUTTON_SIZE = 'medium';
const DEFAULT_BUTTON_TRIGGER = 'click';
const DEFAULT_POPOVER_VARIANT = 'base';

export default class ButtonIconPopoverWithToggle extends LightningElement {
    @api accessKey;
    @api alternativeText;
    @api disabled = false;
    @api hideCloseButton = false;
    @api iconName;
    @api iconClass;
    @api iconSrc;
    @api isButtonLoading = false;
    @api isLoading = false;
    @api loadingStateAlternativeText;
    @api placement = DEFAULT_POPOVER_PLACEMENT;
    @api popoverSize = DEFAULT_POPOVER_SIZE;
    @api popoverVariant = DEFAULT_POPOVER_VARIANT;
    @api size = DEFAULT_BUTTON_SIZE;
    @api title;
    @api tooltip;
    @api triggers = DEFAULT_BUTTON_TRIGGER;
    @api variant = DEFAULT_BUTTON_VARIANT;
}
