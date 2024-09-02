import { LightningElement, api } from 'lwc';
import { classSet } from 'c/utils';
import { normalizeObject, normalizeString } from 'c/utilsPrivate';

const AVATAR_POSITIONS = {
    valid: [
        'left',
        'right',
        'top',
        'bottom',
        'center',
        'left-of-content',
        'right-of-content'
    ],
    default: 'left'
};

const VISUAL_PICKER_SIZES = {
    valid: ['small', 'medium', 'large', 'x-large', 'xx-large', 'responsive'],
    default: 'medium'
};

export default class PrimitiveVisualPickerHeader extends LightningElement {
    @api alternativeText;
    @api description;
    @api descriptionClass;
    @api hideAvatarTopBottom = false;
    @api hideDescription = false;
    @api hideTitle = false;
    @api title;

    _avatar = {};
    _avatarPosition = AVATAR_POSITIONS.default;
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
     * If present, sets the position of the avatar. Valid values include top, bottom, center, right, left, left-of-content and right-of-content. The value defaults to left.
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
     * Verify if avatar position is bottom and should display avatar.
     *
     * @type {boolean}
     */
    get avatarIsBottom() {
        const isBiggerThanXSmall = !(
            this.size === 'x-small' || this.size === 'xx-small'
        );
        return (
            !this.hideAvatarTopBottom &&
            (this.avatarPositionToDisplay === 'bottom' ||
                this.avatarPositionToDisplay === 'center' ||
                !isBiggerThanXSmall ||
                (this.avatarPositionToDisplay !== 'bottom' &&
                    this.avatarPositionToDisplay !== 'top' &&
                    this.hideTitle))
        );
    }

    /**
     * Verify if avatar position is next to text content and should display avatar.
     *
     * @type {boolean}
     */
    get avatarIsHorizontal() {
        return (
            !this.hideTitle &&
            (this.avatarPositionToDisplay === 'left-of-content' ||
                this.avatarPositionToDisplay === 'right-of-content')
        );
    }

    /**
     * Verify if avatar position is top and should display avatar.
     *
     * @type {boolean}
     */
    get avatarIsTop() {
        return (
            !this.hideAvatarTopBottom && this.avatarPositionToDisplay === 'top'
        );
    }

    /**
     * Returns the position of the avatar to be displayed.
     *
     * @type {string}
     */
    get avatarPositionToDisplay() {
        if (!this.hideTitle && this.hideDescription) {
            if (this._avatarPosition === 'left-of-content') {
                return 'left';
            }
            if (this._avatarPosition === 'right-of-content') {
                return 'right';
            }
        }
        return this._avatarPosition;
    }

    /**
     * Computed container class styling.
     *
     * @type {string}
     */
    get computedContainerClass() {
        return classSet('avonni-visual-picker__figure-header-container')
            .add({
                'slds-p-horizontal_small slds-p-vertical_xxx-small':
                    this.avatarIsHorizontal,
                'avonni-visual-picker__figure-header-container-avatar-left':
                    this.avatarIsHorizontal &&
                    this.avatarPositionToDisplay === 'left-of-content',
                'avonni-visual-picker__figure-header-container-avatar-right':
                    this.avatarIsHorizontal &&
                    this.avatarPositionToDisplay === 'right-of-content'
            })
            .toString();
    }

    /**
     * Verify if the title should display avatar.
     *
     * @type {boolean}
     */
    get displayTitleAvatar() {
        return (
            this.hasAvatar &&
            (this.avatarPositionToDisplay === 'right' ||
                this.avatarPositionToDisplay === 'left')
        );
    }

    /**
     * Verify if there is an avatar to display.
     *
     * @type {boolean}
     */
    get hasAvatar() {
        return (
            this.avatar.imgSrc || this.avatar.iconName || this.avatar.initials
        );
    }
}
