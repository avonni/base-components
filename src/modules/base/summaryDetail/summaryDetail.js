import { LightningElement, api } from 'lwc';
import { normalizeBoolean } from 'c/utilsPrivate';
import { classSet } from 'c/utils';

const DEFAULT_SHRINK_ICON_NAME = 'utility:chevrondown';
const DEFAULT_EXPAND_ICON_NAME = 'utility:chevronright';

export default class SummaryDetail extends LightningElement {
    @api title;

    _removeBodyIndentation;
    _shrinkIconName = DEFAULT_SHRINK_ICON_NAME;
    _expandIconName = DEFAULT_EXPAND_ICON_NAME;
    _fullWidth;
    _closed;
    _hideIcon;

    @api
    get shrinkIconName() {
        return this._shrinkIconName;
    }
    set shrinkIconName(name) {
        this._shrinkIconName = (typeof name === 'string' && name.trim()) || '';
    }

    @api
    get expandIconName() {
        return this._expandIconName;
    }
    set expandIconName(name) {
        this._expandIconName = (typeof name === 'string' && name.trim()) || '';
    }

    @api
    get fullWidth() {
        return this._fullWidth;
    }
    set fullWidth(boolean) {
        this._fullWidth = normalizeBoolean(boolean);
    }

    @api
    get removeBodyIndentation() {
        return this._removeBodyIndentation;
    }
    set removeBodyIndentation(boolean) {
        this._removeBodyIndentation = normalizeBoolean(boolean);
    }

    @api
    get closed() {
        return this._closed;
    }
    set closed(value) {
        this._closed = normalizeBoolean(value);
    }

    @api
    get hideIcon() {
        return this._hideIcon;
    }
    set hideIcon(value) {
        this._hideIcon = normalizeBoolean(value);
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
        return classSet('avonni-min-width_0').add({
            'slds-col': this.fullWidth
        });
    }

    get bodyClass() {
        return classSet('avonni-min-width_0').add({
            'slds-col': this.fullWidth
        });
    }

    get contentClass() {
        return classSet('slds-summary-detail__content').add({
            'content_no-indent': this.removeBodyIndentation && !this.hideIcon
        });
    }

    get iconName() {
        return this.closed ? this.expandIconName : this.shrinkIconName;
    }

    changeSectionStatus() {
        this._closed = !this._closed;

        this.dispatchEvent(
            new CustomEvent('toggle', {
                detail: {
                    closed: this._closed
                }
            })
        );
    }
}
