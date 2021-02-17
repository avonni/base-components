import { LightningElement, api, track } from 'lwc';
import { normalizeBoolean } from 'avonni/utilsPrivate';
import { classSet } from 'avonni/utils';

export default class SummaryDetail extends LightningElement {
    @api title;
    @track _closed;

    @api get closed() {
        return this._closed;
    }

    set closed(value) {
        this._closed = normalizeBoolean(value);
    }

    get sectionIsOpen() {
        return !this._closed;
    }

    get sectionClass() {
        return classSet('slds-summary-detail')
            .add({
                'slds-is-open': this.sectionIsOpen
            })
            .toString();
    }

    changeSectionStatus() {
        this._closed = !this._closed;
    }
}
