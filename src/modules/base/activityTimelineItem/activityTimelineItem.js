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

export default class ActivityTimelineItem extends LightningElement {
    @api title;
    @api description;
    @api datetimeValue;
    @api href;
    @api iconName;
    @api icons = [];
    @api buttonLabel;
    @api buttonIconName;
    @api loadingStateAlternativeText;
    @api actions;

    _fields = [];
    _hasCheckbox = false;
    _hasError = false;
    _isLoading = false;
    _closed = false;
    _buttonIconPosition;
    _buttonVariant;

    renderedCallback() {
        console.log(this.actions);
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

    get activityTimelineItemOuterClass() {
        return classSet('slds-timeline__item_expandable')
            .add({
                'slds-is-open': !this.closed
            })
            .add({
                'slds-timeline__item_call':
                    this.iconName === 'standard:log_a_call',
                'slds-timeline__item_email': this.iconName === 'standard:email',
                'slds-timeline__item_event': this.iconName === 'standard:event',
                'slds-timeline__item_task': this.iconName === 'standard:task'
            })
            .toString();
    }

    handleSectionStatus() {
        this._closed = !this._closed;
    }
}
