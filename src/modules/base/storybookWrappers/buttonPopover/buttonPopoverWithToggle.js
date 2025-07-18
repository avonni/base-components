import { LightningElement, api } from 'lwc';

const DEFAULT_POPOVER_SIZE = 'medium';
const DEFAULT_POPOVER_PLACEMENT = 'left';
const DEFAULT_POPOVER_VARIANT = 'base';
const DEFAULT_ICON_POSITION = 'left';
const DEFAULT_BUTTON_VARIANT = 'neutral';
const DEFAULT_BUTTON_TRIGGER = 'click';

export default class ButtonPopoverWithToggle extends LightningElement {
    @api accessKey;
    @api disabled = false;
    @api hideCloseButton = false;
    @api iconName;
    @api iconPosition = DEFAULT_ICON_POSITION;
    @api isButtonLoading = false;
    @api isLoading = false;
    @api label;
    @api loadingStateAlternativeText;
    @api placement = DEFAULT_POPOVER_PLACEMENT;
    @api popoverSize = DEFAULT_POPOVER_SIZE;
    @api popoverVariant = DEFAULT_POPOVER_VARIANT;
    @api title;
    @api triggers = DEFAULT_BUTTON_TRIGGER;
    @api variant = DEFAULT_BUTTON_VARIANT;
}
