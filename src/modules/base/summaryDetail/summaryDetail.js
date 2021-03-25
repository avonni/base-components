import { LightningElement, api } from 'lwc';
import { normalizeBoolean } from 'c/utilsPrivate';
import { classSet } from 'c/utils';

export default class SummaryDetail extends LightningElement {
    @api title;

    _shrinkIconName = 'utility:chevrondown';
    _expandIconName = 'utility:chevronright';
    _fullWidthHeader;
    _closed;

    @api get shrinkIconName() {
        return this._shrinkIconName;
    }
    set shrinkIconName(name) {
        this._shrinkIconName = name;
    }

    @api get expandIconName() {
        return this._expandIconName;
    }
    set expandIconName(name) {
        this._expandIconName = name;
    }

    @api get fullWidthHeader() {
        return this._fullWidthHeader;
    }
    set fullWidthHeader(boolean) {
        this._fullWidthHeader = normalizeBoolean(boolean);
    }

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

    get titleClass() {
        return this.fullWidthHeader ? 'slds-col' : undefined;
    }

    get iconName() {
        return this.closed ? this.expandIconName : this.shrinkIconName;
    }

    changeSectionStatus() {
        this._closed = !this._closed;
    }
}
