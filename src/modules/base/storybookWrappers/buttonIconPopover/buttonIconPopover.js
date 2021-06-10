import { LightningElement, api } from 'lwc';

const DEFAULT_POPOVER_SIZE = 'medium'
const DEFAULT_POPOVER_PLACEMENT = 'left'
const DEFAULT_BUTTON_VARIANT = 'border'
const DEFAULT_BUTTON_SIZE = 'medium'
const DEFAULT_BUTTON_TRIGGER = 'click'
const DEFAULT_POPOVER_VARIANT = 'base'


export default class ButtonIconPopover extends LightningElement {
    @api accessKey;
    @api alternativeText;
    @api title;
    @api iconName;
    @api iconClass;
    @api loadingStateAlternativeText;
    @api tooltip;
    @api disabled = false;
    @api isLoading = false;
    @api popoverSize = DEFAULT_POPOVER_SIZE;
    @api placement = DEFAULT_POPOVER_PLACEMENT;
    @api popoverVariant = DEFAULT_POPOVER_VARIANT;
    @api size = DEFAULT_BUTTON_SIZE;
    @api variant = DEFAULT_BUTTON_VARIANT;
    @api triggers = DEFAULT_BUTTON_TRIGGER;
}
