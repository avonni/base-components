import { LightningElement, api } from 'lwc';
import { normalizeString } from '../utilsPrivate/normalize';

const VALID_POSITIONS = { valid: ['right', 'left'], default: 'right' };

const VALID_SIZES = {
    valid: ['small', 'medium', 'large', 'x-large', 'full'],
    default: 'medium'
};

export default class Pagination extends LightningElement {
    @api title;

    _position = 'right';
    _size = 'medium';
    showTitle = true;
    showPanelBody = true;

    renderedCallback() {
        if (this.titleSlot) {
            this.showTitle = this.titleSlot.assignedElements().length !== 0;
        }

        if (this.panelBodySlot) {
            this.showPanelBody =
                this.panelBodySlot.assignedElements().length !== 0;
        }
    }

    get titleSlot() {
        return this.template.querySelector('slot[name=title]');
    }

    get panelBodySlot() {
        return this.template.querySelector('slot[name=panelbody]');
    }

    @api
    get position() {
        return this._position;
    }

    set position(position) {
        this._position = normalizeString(position, {
            fallbackValue: VALID_POSITIONS.default,
            validValues: VALID_POSITIONS.valid
        });
    }

    @api
    get size() {
        return this._size;
    }

    set size(size) {
        this._size = normalizeString(size, {
            fallbackValue: VALID_SIZES.default,
            validValues: VALID_SIZES.valid
        });
    }
}
