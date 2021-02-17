import { LightningElement, api } from 'lwc';
import { normalizeString, normalizeBoolean } from 'avonni/utilsPrivate';
import { classSet } from '../utils/utils';

const validSizes = ['small', 'medium', 'large'];
const validVerticalAlignement = ['center', 'start', 'end'];

export default class MediaObject extends LightningElement {
    _verticalAlign = 'start';
    _responsive = false;
    _inline = false;
    _size = 'medium';
    showFigureSlot = true;
    showFigureInverseSlot = true;

    renderedCallback() {
        if (this.figureSlot) {
            this.showFigureSlot =
                this.figureSlot.assignedElements().length !== 0;
        }

        if (this.figureInverseSlot) {
            this.showFigureInverseSlot =
                this.showFigureInverseSlot.assignedElements().length !== 0;
        }
    }

    get figureSlot() {
        return this.template.querySelector('slot[name=figure]');
    }

    get figureInverseSlot() {
        return this.template.querySelector('slot[name=figureInverse]');
    }

    get mediaObjectClass() {
        return classSet('slds-media')
            .add({
                'slds-media_small': this._size === 'small',
                'slds-media_large': this._size === 'large',
                'slds-media_center': this._verticalAlign === 'center',
                'avonni-media-object-alignement-end':
                    this._verticalAlign === 'end',
                'slds-media_responsive': this._responsive === true,
                'avonni-media-object-display-inline': this._inline === true
            })
            .toString();
    }

    @api get size() {
        return this._size;
    }

    set size(size) {
        this._size = normalizeString(size, {
            fallbackValue: 'medium',
            validValues: validSizes
        });
    }

    @api get verticalAlign() {
        return this._verticalAlign;
    }

    set verticalAlign(verticalAlign) {
        this._verticalAlign = normalizeString(verticalAlign, {
            fallbackValue: 'start',
            validValues: validVerticalAlignement
        });
    }

    @api get responsive() {
        return this._responsive;
    }

    set responsive(value) {
        this._responsive = normalizeBoolean(value);
    }

    @api get inline() {
        return this._inline;
    }

    set inline(value) {
        this._inline = normalizeBoolean(value);
    }
}
