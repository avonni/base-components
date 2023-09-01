

import { LightningElement, api } from 'lwc';
import { normalizeString, normalizeBoolean } from 'c/utilsPrivate';
import { classSet } from 'c/utils';

const MEDIA_OBJECT_SIZES = {
    valid: ['small', 'medium', 'large'],
    default: 'medium'
};
const VERTICAL_ALIGNMENTS = {
    valid: ['center', 'start', 'end'],
    default: 'start'
};

/**
 * @class
 * @descriptor avonni-media-object
 * @storyId example-media-object--base
 * @public
 */
export default class MediaObject extends LightningElement {
    _inline = false;
    _responsive = false;
    _size = MEDIA_OBJECT_SIZES.default;
    _verticalAlign = VERTICAL_ALIGNMENTS.default;

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * If present, the figures and body are stacked on each other.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get inline() {
        return this._inline;
    }

    set inline(value) {
        this._inline = normalizeBoolean(value);
    }

    /**
     * If present, figure and body stack on smaller screens.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get responsive() {
        return this._responsive;
    }

    set responsive(value) {
        this._responsive = normalizeBoolean(value);
    }

    /**
     * The size of the media object. Valid values include small, medium and large.
     *
     * @type {string}
     * @public
     * @default medium
     */
    @api
    get size() {
        return this._size;
    }

    set size(size) {
        this._size = normalizeString(size, {
            fallbackValue: MEDIA_OBJECT_SIZES.default,
            validValues: MEDIA_OBJECT_SIZES.valid
        });
    }

    /**
     * Determines how to align the media object items vertically in the container. The alignment options are start, center and end.
     *
     * @type {string}
     * @public
     * @default start
     */
    @api
    get verticalAlign() {
        return this._verticalAlign;
    }

    set verticalAlign(verticalAlign) {
        this._verticalAlign = normalizeString(verticalAlign, {
            fallbackValue: VERTICAL_ALIGNMENTS.default,
            validValues: VERTICAL_ALIGNMENTS.value
        });
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Compute media object class styling based on selected attributes.
     *
     * @type {string}
     */
    get mediaObjectClass() {
        return classSet('slds-media')
            .add({
                'slds-media_small': this._size === 'small',
                'slds-media_large': this._size === 'large',
                'slds-media_center': this._verticalAlign === 'center',
                'avonni-media-object_alignment-end':
                    this._verticalAlign === 'end',
                'slds-media_responsive': this._responsive,
                'avonni-media-object_display-inline': this._inline
            })
            .toString();
    }
}
