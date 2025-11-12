import { LightningElement, api } from 'lwc';

export default class Button extends LightningElement {
    @api accessKey;
    @api disableAnimation;
    @api disabled;
    @api groupOrder;
    @api iconName;
    @api iconPosition;
    @api iconSize;
    @api iconSrc;
    @api isButtonLoading;
    @api label;
    @api loadingStateAlternativeText;
    @api name;
    @api stretch;
    @api type;
    @api value;
    @api variant;
}
