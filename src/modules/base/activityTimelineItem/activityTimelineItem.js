import { LightningElement, api } from 'lwc';
import {
    normalizeBoolean,
    normalizeArray,
    normalizeString
} from 'c/utilsPrivate';

import { classSet } from 'c/utils';

const validButtonIconPositions = { valid: ['left', 'right'], default: 'left' };

const validButtonVariants = {
    valid: [
        'neutral',
        'base',
        'brand',
        'brand-outline',
        'destructive',
        'destructive-text',
        'inverse',
        'success'
    ],
    default: 'neutral'
};

const DEFAULT_LOADING_TEXT = 'Loading';

export default class ActivityTimelineItem extends LightningElement {
    @api title;
    @api description;
    @api datetimeValue;
    @api href;
    @api iconName;
    @api icons = [];
    @api buttonLabel;
    @api buttonIconName;
    @api loadingStateAlternativeText = DEFAULT_LOADING_TEXT;
    @api actions;

    _fields = [];
    _hasCheckbox = false;
    _hasError = false;
    _isLoading = false;
    _closed = false;
    _buttonIconPosition = validButtonIconPositions.default;
    _buttonVariant = validButtonVariants.default;
    _rendered = false;
    _color;

    connectedCallback() {
        this.actionsIcon();
    }
    
    renderedCallback() {
        this.setLineColor()
    }

    @api
    get hasCheckbox() {
        return this._hasCheckbox;
    }

    set hasCheckbox(value) {
        this._hasCheckbox = normalizeBoolean(value);
    }

    @api
    get hasError() {
        return this._hasError;
    }

    set hasError(value) {
        this._hasError = normalizeBoolean(value);
    }

    @api
    get closed() {
        return this._closed;
    }

    set closed(value) {
        this._closed = normalizeBoolean(value);
    }

    @api
    get fields() {
        return this._fields;
    }

    set fields(value) {
        this._fields = normalizeArray(value);
    }

    @api
    get buttonIconPosition() {
        return this._buttonIconPosition;
    }

    set buttonIconPosition(value) {
        this._buttonIconPosition = normalizeString(value, {
            fallbackValue: validButtonIconPositions.default,
            validValues: validButtonIconPositions.valid
        });
    }

    @api
    get buttonVariant() {
        return this._buttonVariant;
    }

    set buttonVariant(value) {
        this._buttonVariant = normalizeString(value, {
            fallbackValue: validButtonVariants.default,
            validValues: validButtonVariants.valid
        });
    }

    @api
    get isLoading() {
        return this._isLoading;
    }

    set isLoading(value) {
        this._isLoading = normalizeBoolean(value);
    }

    get hasFields() {
        return this._fields.length > 0;
    }

    get hasActions() {
        return this.actions.length > 0;
    }

    get backgroundColor() {
        return `--line-color: ${this._color}`;
    }

    get activityTimelineItemOuterClass() {
        return classSet('slds-timeline__item_expandable')
            .add({
                'slds-is-open': !this.closed
            })
            .toString();
    }

    actionsIcon() {
        this.actions.forEach((action) => {
            if (action.iconName) {
                this.icons.push(action.iconName);
            }
        });
        return this.icons;
    }

    handleSectionStatus() {
        this._closed = !this._closed;
    }

    handleActionClick(event) {
        const name = event.currentTarget.value;

        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: {
                    name: name,
                    fieldData: this._fields
                }
            })
        );
    }

    handleButtonClick() {
        this.dispatchEvent(new CustomEvent('buttonclick'));
    }

    handleCheck(event) {
        this.dispatchEvent(
            new CustomEvent('check', {
                detail: event.target.checked,
                bubbles: true,
                cancelable: false,
                composed: true
            })
        );
    }

    setLineColor(){
        const icon = this.template.querySelector('lightning-icon')
        if(icon === null) return;
        const style = getComputedStyle(icon);
        this._color = style.backgroundColor;
    }
}
