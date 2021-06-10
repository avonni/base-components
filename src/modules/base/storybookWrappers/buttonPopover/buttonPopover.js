import { LightningElement, api } from 'lwc';

const DEFAULT_POPOVER_SIZE = 'medium'
const DEFAULT_POPOVER_PLACEMENT = 'left'
const DEFAULT_POPOVER_VARIANT = 'base'
const DEFAULT_ICON_POSITION = 'left'
const DEFAULT_BUTTON_VARIANT = 'neutral'
const DEFAULT_BUTTON_TRIGGER = 'click'


export default class ButtonPopover extends LightningElement {
    @api accessKey;
    @api label;
    @api title;
    @api iconName;
    @api loadingStateAlternativeText;
    @api disabled = false;
    @api isLoading = false;
    @api popoverSize = DEFAULT_POPOVER_SIZE;
    @api placement = DEFAULT_POPOVER_PLACEMENT;
    @api popoverVariant = DEFAULT_POPOVER_VARIANT;
    @api iconPosition = DEFAULT_ICON_POSITION;
    @api variant = DEFAULT_BUTTON_VARIANT;
    @api triggers = DEFAULT_BUTTON_TRIGGER;
}
