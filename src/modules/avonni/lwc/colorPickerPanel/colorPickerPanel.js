import { LightningElement, api } from 'lwc';
import { classSet } from 'c/utils';
import { keyCodes } from 'c/utilsPrivate';

const i18n = {
    cancelButton: 'Cancel',
    customTab: 'Custom',
    defaultTab: 'Default',
    doneButton: 'Done'
};

const DEFAULT_COLOR = '#000000';
export default class ColorPickerPanel extends LightningElement {
    @api currentColor;

    _isCustomTabActive = false;
    _selectedColor = null;

    connectedCallback() {
        this._selectedColor = this.currentColor || DEFAULT_COLOR;
    }

    get i18n() {
        return i18n;
    }

    get computedClassDefault() {
        return classSet({
            'slds-tabs_default__item': true,
            'slds-is-active': !this._isCustomTabActive
        }).toString();
    }

    get computedClassCustom() {
        return classSet({
            'slds-tabs_default__item': true,
            'slds-is-active': this._isCustomTabActive
        }).toString();
    }

    get ariaSelectedDefault() {
        return !this._isCustomTabActive.toString();
    }

    get ariaSelectedCustom() {
        return this._isCustomTabActive.toString();
    }

    handleTabChange(event) {
        event.preventDefault();
        const tabElement = event.currentTarget;
        if (tabElement.classList.contains('slds-is-active')) {
            return;
        }
        this._isCustomTabActive = tabElement.title !== i18n.defaultTab;
    }

    handleUpdateSelectedColor(event) {
        this._selectedColor = event.detail.color;
    }

    dispatchUpdateColorEventWithColor(color) {
        this.dispatchEvent(
            // eslint-disable-next-line lightning-global/no-custom-event-bubbling
            new CustomEvent('updatecolor', {
                composed: true,
                bubbles: true,
                detail: { color }
            })
        );
    }

    handleDoneClick() {
        this.dispatchUpdateColorEventWithColor(this._selectedColor);
    }

    handleCancelClick() {
        this.dispatchUpdateColorEventWithColor(this.currentColor);
    }

    handleKeydown(event) {
        if (event.keyCode === keyCodes.escape) {
            event.preventDefault();
            this.dispatchUpdateColorEventWithColor(this.currentColor);
        } else if (
            event.shiftKey &&
            event.keyCode === keyCodes.tab &&
            event.srcElement.dataset.id === 'color-anchor'
        ) {
            event.preventDefault();
            this.template.querySelector('button[name="done"]').focus();
        } else if (
            !event.shiftKey &&
            event.keyCode === keyCodes.tab &&
            event.srcElement.name === 'done'
        ) {
            event.preventDefault();
            this.template
                .querySelector('c-color-picker-custom')
                .focus();
        }
    }
}
