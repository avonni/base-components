import { LightningElement, api } from 'lwc';

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
    @api size = 'medium';
    @api placement = 'left';
    @api variant = 'border';
    @api popoverSize = 'medium';
    @api triggers = 'click';
    @api popoverVariant = 'base';
}
