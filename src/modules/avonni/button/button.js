import { LightningElement, api, track } from 'lwc';
import { isIE11, normalizeBoolean, normalizeString } from 'avonni/utilsPrivate';
import { classSet } from 'avonni/utils';
import template from './button.html';

export default class cButton extends LightningElement {
    static delegatesFocus = true;

    @api name;
    @api value;
    @api label;
    @api variant = 'neutral';
    @api iconName;
    @api iconPosition = 'left';
    @api type = 'button';

    @track _order = null;
    @track state = {
        accesskey: null,
        ariaAtomic: null,
        ariaControls: null,
        ariaDescribedBy: null,
        ariaExpanded: null,
        ariaLabel: null,
        ariaLive: null,
        disabled: false
    };

    constructor() {
        super();

        if (isIE11) {
            this.template.addEventListener('click', event => {
                if (this.disabled) {
                    event.stopImmediatePropagation();
                }
            });
        }
    }

    connectedCallback() {
        this._connected = true;
        const privatebuttonregister = new CustomEvent('privatebuttonregister', {
            bubbles: true,
            detail: {
                callbacks: {
                    setOrder: this.setOrder.bind(this),
                    setDeRegistrationCallback: deRegistrationCallback => {
                        this._deRegistrationCallback = deRegistrationCallback;
                    }
                }
            }
        });

        this.dispatchEvent(privatebuttonregister);
    }

    disconnectedCallback() {
        this._connected = false;
        if (this._deRegistrationCallback) {
            this._deRegistrationCallback();
        }
    }

    render() {
        return template;
    }

    get computedButtonClass() {
        return classSet('slds-button')
            .add({
                'slds-button_neutral': this.normalizedVariant === 'neutral',
                'slds-button_brand': this.normalizedVariant === 'brand',
                'slds-button_outline-brand':
                    this.normalizedVariant === 'brand-outline',
                'slds-button_destructive':
                    this.normalizedVariant === 'destructive',
                'slds-button_text-destructive':
                    this.normalizedVariant === 'destructive-text',
                'slds-button_inverse': this.normalizedVariant === 'inverse',
                'slds-button_success': this.normalizedVariant === 'success',
                'slds-button_first': this._order === 'first',
                'slds-button_middle': this._order === 'middle',
                'slds-button_last': this._order === 'last'
            })
            .toString();
    }

    get computedTitle() {
        return this.title;
    }

    get normalizedVariant() {
        return normalizeString(this.variant, {
            fallbackValue: 'neutral',
            validValues: [
                'base',
                'neutral',
                'brand',
                'brand-outline',
                'destructive',
                'destructive-text',
                'inverse',
                'success'
            ]
        });
    }

    get normalizedType() {
        return normalizeString(this.type, {
            fallbackValue: 'button',
            validValues: ['button', 'reset', 'submit']
        });
    }

    get normalizedIconPosition() {
        return normalizeString(this.iconPosition, {
            fallbackValue: 'left',
            validValues: ['left', 'right']
        });
    }

    get showIconLeft() {
        return this.iconName && this.normalizedIconPosition === 'left';
    }

    get showIconRight() {
        return this.iconName && this.normalizedIconPosition === 'right';
    }

    get computedIconClass() {
        return classSet('slds-button__icon')
            .add({
                'slds-button__icon_left':
                    this.normalizedIconPosition === 'left' && this.label,
                'slds-button__icon_right':
                    this.normalizedIconPosition === 'right' && this.label
            })
            .toString();
    }

    setOrder(order) {
        this._order = order;
    }

    @api get disabled() {
        return this.state.disabled;
    }

    set disabled(value) {
        this.state.disabled = normalizeBoolean(value);
    }

    set accessKey(value) {
        this.state.accesskey = value;
    }

    @api get accessKey() {
        return this.state.accesskey;
    }

    get computedAccessKey() {
        return this.state.accesskey;
    }

    @api get title() {
        return this.state.title;
    }

    set title(value) {
        this.state.title = value;
    }

    @api get ariaLabel() {
        return this.state.ariaLabel;
    }

    set ariaLabel(value) {
        this.state.ariaLabel = value;
    }

    get computedAriaLabel() {
        return this.state.ariaLabel;
    }

    @api get ariaDescribedBy() {
        return this.state.ariaDescribedBy;
    }

    set ariaDescribedBy(value) {
        this.state.ariaDescribedBy = value;
    }

    get computedAriaDescribedBy() {
        return this.state.ariaDescribedBy;
    }

    @api get ariaControls() {
        return this.state.ariaControls;
    }

    set ariaControls(value) {
        this.state.ariaControls = value;
    }

    get computedAriaControls() {
        return this.state.ariaControls;
    }

    @api get ariaExpanded() {
        return this.state.ariaExpanded;
    }

    set ariaExpanded(value) {
        this.state.ariaExpanded = normalizeString(value, {
            fallbackValue: undefined,
            validValues: ['true', 'false']
        });
    }

    get computedAriaExpanded() {
        return this.state.ariaExpanded || null;
    }

    set ariaLive(value) {
        this.state.ariaLive = value;
    }

    @api get ariaLive() {
        return this.state.ariaLive;
    }

    get computedAriaLive() {
        return this.state.ariaLive;
    }

    @api get ariaAtomic() {
        return this.state.ariaAtomic || null;
    }

    set ariaAtomic(value) {
        this.state.ariaAtomic = normalizeString(value, {
            fallbackValue: undefined,
            validValues: ['true', 'false']
        });
    }

    get computedAriaAtomic() {
        return this.state.ariaAtomic || null;
    }

    @api
    focus() {
        if (this._connected) {
            this.template.querySelector('button').focus();
        }
    }

    @api
    click() {
        if (this._connected) {
            this.template.querySelector('button').click();
        }
    }

    handleButtonFocus() {
        this.dispatchEvent(new CustomEvent('focus'));
    }

    handleButtonBlur() {
        this.dispatchEvent(new CustomEvent('blur'));
    }
}

cButton.interopMap = {
    exposeNativeEvent: {
        click: true,
        focus: true,
        blur: true
    }
};
