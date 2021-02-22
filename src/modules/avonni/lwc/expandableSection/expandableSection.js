import { LightningElement, api, track } from 'lwc';
import { classSet } from 'c/utils';
import { normalizeBoolean } from 'c/utilsPrivate';

export default class ExpandableSection extends LightningElement {
    @api title;

    @track _closed;
    @track _collapsable;

    @api get closed() {
        return this._closed;
    }

    set closed(value) {
        this._closed = normalizeBoolean(value);
    }

    @api get collapsable() {
        return this._collapsable;
    }

    set collapsable(value) {
        this._collapsable = normalizeBoolean(value);
    }

    get sectionClass() {
        return classSet('slds-section')
            .add({
                'slds-is-open': !this.collapsable || !this.closed
            })
            .toString();
    }

    get sectionTitleClass() {
        return classSet('slds-section__title')
            .add({
                'slds-theme_shade': !this.collapsable
            })
            .toString();
    }

    changeSectionStatus() {
        this._closed = !this._closed;
    }
}
