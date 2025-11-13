import { LightningElement, api } from 'lwc';

export default class ButtonIconPopover extends LightningElement {
    @api accessKey;
    @api alternativeText;
    @api disabled;
    @api hideCloseButton;
    @api iconClass;
    @api iconName;
    @api iconSrc;
    @api isButtonLoading;
    @api isLoading;
    @api loadingStateAlternativeText;
    @api name;
    @api placement;
    @api popoverSize;
    @api popoverVariant;
    @api size;
    @api title;
    @api tooltip;
    @api triggers;
    @api type;
    @api variant;

    @api click() {}
    @api focus() {}
}
