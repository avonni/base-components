import { LightningElement, api } from 'lwc';

export default class ButtonPopover extends LightningElement {
    @api accessKey;
    @api label;
    @api title;
    @api iconName;
    @api loadingStateAlternativeText;
    @api disabled = false;
    @api isLoading = false;
    @api iconPosition = 'left';
    @api popoverSize = 'medium';
    @api placement = 'left';
    @api variant = 'neutral';
    @api triggers = 'click';
    @api popoverVariant = 'base';
}
