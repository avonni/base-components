import { LightningElement, api, track } from 'lwc';
import { normalizeString } from 'avonni/utilsPrivate';
import { classSet } from '../utils/utils';

const validSizes = ['small', 'medium', 'large'];
const validVerticalAlignement = ['center', 'start', 'end'];

export default class MediaObject extends LightningElement {
    @api responsive;
    @api inline;

    @track _verticalAlign = '';
    @track _responsive = false;
    @track _inline = false;
    @track _size = 'medium';

    get mediaObjectClass() {
        return classSet('slds-media')
            .add({
                'slds-media_small': this._size === 'small',
                'slds-media_large': this._size === 'large',
                'slds-media_center': this._verticalAlign === 'center',
                'avonni-media-object-alignement-end':
                    this._verticalAlign === 'end'
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
}
