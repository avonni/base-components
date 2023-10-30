import { LightningElement, api } from 'lwc';
import { classSet } from 'c/utils';
import {
    normalizeBoolean,
    normalizeObject,
    normalizeString
} from 'c/utilsPrivate';

const AVATAR_POSITIONS = {
    valid: ['left', 'right', 'top', 'bottom', 'center'],
    default: 'left'
};

const VISUAL_PICKER_SIZES = {
    valid: ['small', 'medium', 'large', 'x-large', 'xx-large', 'responsive'],
    default: 'medium'
};

const DEFAULT_DISPLAY_AVATAR = false;

export default class PrimitiveVisualPickerTitle extends LightningElement {
    /**
     * The title can include text and is displayed inside the figure.
     *
     * @type {string}
     */
    @api title;
    /**
     * The alternative text used to describe the avatar, which is displayed as hover text on the image.
     *
     * @type {string}
     */
    @api alternativeText;

    _avatar = {};
    _avatarPosition = AVATAR_POSITIONS.default;
    _displayAvatar = DEFAULT_DISPLAY_AVATAR;
    _size = VISUAL_PICKER_SIZES.default;

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

    /**
     * Verify if avatar position is left and should display avatar.
     *
     * @type {boolean}
     */
    get avatarIsLeft() {
        return this._avatarPosition === 'left' && this._displayAvatar;
    }

    /**
     * Verify if avatar position is right and should display avatar.
     *
     * @type {boolean}
     */
    get avatarIsRight() {
        return this._avatarPosition === 'right' && this._displayAvatar;
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
            .add(`avonni-visual-picker__figure-content_${this._size}`)
            .toString();
    }
}
