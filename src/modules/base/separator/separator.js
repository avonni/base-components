

import { LightningElement, api } from 'lwc';
import { classSet } from 'c/utils';
import { normalizeString } from 'c/utilsPrivate';

const VALID_ALIGN_CONTENTS = {
    valid: ['start', 'center', 'end'],
    default: 'center'
};
const VALID_ICON_SIZES = {
    valid: ['xx-small', 'x-small', 'small', 'medium', 'large'],
    default: 'small'
};
const VALID_ORIENTATIONS = {
    valid: ['horizontal', 'vertical'],
    default: 'horizontal'
};
const VALID_ICON_POSITIONS = { valid: ['left', 'right'], default: 'left' };

/**
 * @class
 * @descriptor avonni-segment
 * @storyId example-separator--base
 * @public
 */
export default class Separator extends LightningElement {
    /**
     * The name of the icon to be used in the format 'utility:down'.
     *
     * @type {string}
     * @public
     */
    @api iconName;
    /**
     * Text to display in the separator.
     *
     * @type {string}
     * @public
     */
    @api label;

    _alignContent = VALID_ALIGN_CONTENTS;
    _iconPosition = VALID_ICON_POSITIONS;
    _iconSize = VALID_ICON_SIZES;
    _orientation = VALID_ORIENTATIONS;

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Position of the content in the separator. Valid values include start, center and end.
     *
     * @type {string}
     * @public
     * @default center
     */
    @api
    get alignContent() {
        return this._alignContent;
    }

    set alignContent(value) {
        this._alignContent = normalizeString(value, {
            fallbackValue: VALID_ALIGN_CONTENTS.default,
            validValues: VALID_ALIGN_CONTENTS.valid
        });
    }

    /**
     * Describes the position of the icon. Valid values include left and right.
     *
     * @type {string}
     * @public
     * @default left
     */
    @api
    get iconPosition() {
        return this._iconPosition;
    }

    set iconPosition(value) {
        this._iconPosition = normalizeString(value, {
            fallbackValue: VALID_ICON_POSITIONS.default,
            validValues: VALID_ICON_POSITIONS.valid
        });
    }

    /**
     * The size of the icon. Options include xx-small, x-small, small, medium and large.
     *
     * @type {string}
     * @public
     * @default small
     */
    @api
    get iconSize() {
        return this._iconSize;
    }

    set iconSize(value) {
        this._iconSize = normalizeString(value, {
            fallbackValue: VALID_ICON_SIZES.default,
            validValues: VALID_ICON_SIZES.valid
        });
    }

    /**
     * Orientation of the separator. Valid values include horizontal and vertical.
     *
     * @type {string}
     * @public
     * @default horizontal
     */
    @api
    get orientation() {
        return this._orientation;
    }

    set orientation(value) {
        this._orientation = normalizeString(value, {
            fallbackValue: VALID_ORIENTATIONS.default,
            validValues: VALID_ORIENTATIONS.valid
        });
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Verify if the content is populated.
     *
     * @type {string}
     */
    get hasContent() {
        return this.label || this.iconName;
    }

    /**
     * Computed container class styling based on orientation.
     *
     * @type {string}
     */
    get computedContainerClass() {
        return classSet(
            'avonni-separator__container slds-grid slds-grid_vertical-align-center slds-nowrap'
        )
            .add({
                'slds-grid_vertical slds-grid_align-center':
                    this.orientation === 'vertical'
            })
            .toString();
    }

    /**
     * Computed line one class styling based on oritentaion and alignment.
     *
     * @type {string}
     */
    get computedLineOneClass() {
        return classSet('avonni-separator__lines_styling slds-grow')
            .add({
                'slds-border_bottom avonni-separator__flex-col':
                    this.orientation === 'horizontal',
                'slds-border_left avonni-separator__flex-col slds-grow':
                    this.orientation === 'vertical',
                'slds-hide': this.alignContent === 'start'
            })
            .toString();
    }

    /**
     * Computed line two class styling based on oritentaion and alignment.
     *
     * @type {string}
     */
    get computedLineTwoClass() {
        return classSet('avonni-separator__lines_styling slds-grow')
            .add({
                'slds-border_bottom avonni-separator__flex-col':
                    this.orientation === 'horizontal',
                'slds-border_left avonni-separator__flex-col slds-grow':
                    this.orientation === 'vertical',
                'slds-hide': this.alignContent === 'end'
            })
            .toString();
    }

    /**
     * Computed content class styling.
     *
     * @type {string}
     */
    get computedContentClass() {
        return classSet(
            'avonni-separator_content slds-grid slds-vertical slds-grid_vertical-align-center slds-grid_align-center slds-m-around_small'
        )
            .add({
                'slds-grid_reverse': this.iconPosition === 'right'
            })
            .toString();
    }

    /**
     * Computed icon class styling based on label and icon position.
     *
     * @type {string}
     */
    get computedIconClass() {
        return classSet('avonni-separator__icon')
            .add({
                'slds-m-right_x-small':
                    this.label && this.iconPosition === 'left',
                'slds-m-left_x-small':
                    this.label && this.iconPosition === 'right'
            })
            .toString();
    }
}
