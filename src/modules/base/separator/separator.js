import { LightningElement, api } from 'lwc';
import { classSet, normalizeString } from 'c/utils';

const ALIGN_CONTENTS = {
    valid: ['start', 'center', 'end'],
    default: 'center'
};
const ICON_POSITIONS = { valid: ['left', 'right'], default: 'left' };
const ICON_SIZES = {
    valid: [
        'xx-small',
        'x-small',
        'small',
        'medium',
        'large',
        'x-large',
        'xx-large'
    ],
    default: 'small'
};
const ICON_VARIANTS = {
    valid: ['circle', 'square'],
    default: 'square'
};
const ORIENTATIONS = {
    valid: ['horizontal', 'vertical'],
    default: 'horizontal'
};

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
     * URL to set for the image attribute.
     *
     * @public
     * @type {string}
     */
    @api iconSrc;
    /**
     * Text to display in the separator.
     *
     * @type {string}
     * @public
     */
    @api label;

    _alignContent = ALIGN_CONTENTS.default;
    _iconPosition = ICON_POSITIONS.default;
    _iconSize = ICON_SIZES.default;
    _iconVariant = ICON_VARIANTS.default;
    _orientation = ORIENTATIONS.default;

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
            fallbackValue: ALIGN_CONTENTS.default,
            validValues: ALIGN_CONTENTS.valid
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
            fallbackValue: ICON_POSITIONS.default,
            validValues: ICON_POSITIONS.valid
        });
    }

    /**
     * The size of the icon. Valid values include xx-small, x-small, small, medium, large, x-large and xx-large.
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
            fallbackValue: ICON_SIZES.default,
            validValues: ICON_SIZES.valid
        });
    }

    /**
     * The variant changes the shape of the avatar. Valid values are circle and square.
     *
     * @public
     * @type {string}
     * @default square
     */
    @api
    get iconVariant() {
        return this._iconVariant;
    }
    set iconVariant(value) {
        this._iconVariant = normalizeString(value, {
            fallbackValue: ICON_VARIANTS.default,
            validValues: ICON_VARIANTS.valid
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
            fallbackValue: ORIENTATIONS.default,
            validValues: ORIENTATIONS.valid
        });
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Computed icon class styling based on label and icon position.
     *
     * @type {string}
     */
    get computedAvatarClass() {
        return classSet('avonni-separator__avatar')
            .add({
                'slds-m-right_x-small':
                    this.label && this.iconPosition === 'left',
                'slds-m-left_x-small':
                    this.label && this.iconPosition === 'right'
            })
            .toString();
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
     * Computed line one class styling based on oritentaion and alignment.
     *
     * @type {string}
     */
    get computedLineOneClass() {
        return classSet(
            'avonni-separator__lines_styling avonni-separator__flex-col slds-grow'
        )
            .add({
                'slds-border_bottom ': this.orientation === 'horizontal',
                'slds-border_left': this.orientation === 'vertical',
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
        return classSet(
            'avonni-separator__lines_styling avonni-separator__flex-col slds-grow'
        )
            .add({
                'slds-border_bottom ': this.orientation === 'horizontal',
                'slds-border_left': this.orientation === 'vertical',
                'slds-hide': this.alignContent === 'end'
            })
            .toString();
    }

    /**
     * Verify if the avatar is populated.
     *
     * @type {string}
     */
    get hasAvatar() {
        return this.iconName || this.iconSrc;
    }

    /**
     * Verify if the content is populated.
     *
     * @type {string}
     */
    get hasContent() {
        return this.label || this.hasAvatar;
    }
}
