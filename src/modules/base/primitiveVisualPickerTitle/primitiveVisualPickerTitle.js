import { LightningElement, api } from 'lwc';
import {
    classSet,
    normalizeBoolean,
    normalizeObject,
    normalizeString
} from 'c/utils';

const AVATAR_POSITIONS = {
    valid: ['left', 'right', 'top', 'bottom', 'center'],
    default: 'left'
};
const DEFAULT_DISPLAY_AVATAR = false;
const VISUAL_PICKER_SIZES = {
    valid: ['small', 'medium', 'large', 'x-large', 'xx-large', 'responsive'],
    default: 'medium'
};

export default class PrimitiveVisualPickerTitle extends LightningElement {
    /**
     * The alternative text used to describe the avatar, which is displayed as hover text on the image.
     *
     * @type {string}
     */
    @api alternativeText;
    /**
     * The title can include text and is displayed inside the figure.
     *
     * @type {string}
     */
    @api title;

    _avatar = {};
    _avatarPosition = AVATAR_POSITIONS.default;
    _checked = false;
    _displayAvatar = DEFAULT_DISPLAY_AVATAR;
    _size = VISUAL_PICKER_SIZES.default;

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * An object with item fields to be rendered as an avatar.
     *
     * @type {object}
     */
    @api
    get avatar() {
        return this._avatar;
    }
    set avatar(avatar) {
        this._avatar = normalizeObject(avatar);
    }

    /**
     * If present, sets the position of the avatar. Valid values include top, bottom, center, right and left. The value defaults to left.
     *
     * @type {string}
     */
    @api
    get avatarPosition() {
        return this._avatarPosition;
    }
    set avatarPosition(position) {
        this._avatarPosition = normalizeString(position, {
            fallbackValue: AVATAR_POSITIONS.default,
            validValues: AVATAR_POSITIONS.valid
        });
    }

    /**
     * If present, the selected style is applied to the title.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get checked() {
        return this._checked;
    }
    set checked(value) {
        this._checked = normalizeBoolean(value);
    }

    /**
     * Verify if should display avatar.
     *
     * @type {boolean}
     */
    @api
    get displayAvatar() {
        return this._displayAvatar;
    }
    set displayAvatar(value) {
        this._displayAvatar = normalizeBoolean(value);
    }

    /**
     * The size of the items. Valid values include xx-small (4rem x 4 rem), x-small (6rem x 6 rem), small (8rem x 8rem), medium (12rem x 12rem), large (15rem x 15rem), x-large (18rem x 18rem), xx-large (21rem x 21rem) and responsive. Only avatar appears when x-small and xx-small.
     *
     * @type {string}
     */
    @api
    get size() {
        return this._size;
    }
    set size(size) {
        this._size = normalizeString(size, {
            fallbackValue: VISUAL_PICKER_SIZES.default,
            validValues: VISUAL_PICKER_SIZES.valid
        });
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Computed avatar class.
     *
     * @type {string}
     */
    get computedAvatarClass() {
        return classSet('avonni-primitive-visual-picker-title__avatar')
            .add({
                'slds-order_0 slds-m-right_x-small':
                    this.avatarPosition === 'left',
                'slds-order_2 slds-m-left_x-small':
                    this.avatarPosition === 'right'
            })
            .toString();
    }

    /**
     * Computed container class styling.
     *
     * @type {string}
     */
    get computedContainerClass() {
        return classSet(
            'avonni-visual-picker__figure-content_alignment slds-media slds-media_center'
        )
            .add(`avonni-visual-picker__figure-content_${this.size}`)
            .toString();
    }

    /**
     * Computed title class.
     *
     * @type {string}
     */
    get computedTitleClass() {
        return classSet('avonni-visual-picker__figure-title slds-line-clamp')
            .add({ 'avonni-visual-picker__item-selected': this.checked })
            .toString();
    }
}
