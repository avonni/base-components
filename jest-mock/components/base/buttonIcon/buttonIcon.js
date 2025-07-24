import { LightningElement, api } from 'lwc';

export default class ButtonIcon extends LightningElement {
    @api accessKey;
    @api alternativeText;
    @api disableAnimation;
    @api disabled;
    @api iconClass;
    @api iconName;
    @api iconSrc;
    @api isButtonLoading;
    @api loadingStateAlternativeText;
    @api name;
    @api size;
    @api tabIndex;
    @api tooltip;
    @api type;
    @api value;
    @api variant;

    @api click() {}
    @api focus() {}
}
