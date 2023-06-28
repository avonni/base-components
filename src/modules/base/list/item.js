import { normalizeArray, normalizeString } from 'c/utilsPrivate';
import { classSet } from 'c/utils';

const AVATAR_POSITION = {
    valid: [
        'left',
        'top-left',
        'bottom-left',
        'right',
        'top-right',
        'bottom-right',
        'left-of-title',
        'right-of-title'
    ],
    default: 'left'
};

export default class Item {
    constructor(value) {
        this.avatar = value.avatar;
        this.avatarPosition = normalizeString(
            this.avatar && this.avatar.position,
            {
                validValues: AVATAR_POSITION.valid,
                fallbackValue: AVATAR_POSITION.default
            }
        );
        this.description = value.description;
        this.fallbackIconName = value.fallbackIconName;
        this.fields = value.fields;
        this.href = value.href;
        this.infos = normalizeArray(value.infos);
        this.icons = normalizeArray(value.icons);
        this.imageSrc = value.imageSrc;
        this.imagePosition = value.imagePosition;
        this.label = value.label;
        this.name = value.name;
    }

    /**
     * Computes if the avatar is at the left.
     */
    get isAvatarLeft() {
        return this.avatar && this.avatarPosition.endsWith('left');
    }

    /**
     * Computes if the avatar is at the right.
     */
    get isAvatarRight() {
        return this.avatar && this.avatarPosition.endsWith('right');
    }

    /**
     * Computes if the avatar is at the left of the title.
     */
    get isAvatarLeftOfTitle() {
        return this.avatar && this.avatarPosition === 'left-of-title';
    }

    /**
     * Computes if the avatar is at the right of the title.
     */
    get isAvatarRightOfTitle() {
        return this.avatar && this.avatarPosition === 'right-of-title';
    }

    /**
     * Compute the class of the avatar
     */
    get computedAvatarClass() {
        return classSet('avonni-list-item-avatar')
            .add({
                'slds-m-right_x-small':
                    this.isAvatarLeft || this.isAvatarLeftOfTitle,
                'slds-m-left_x-small':
                    this.isAvatarRight || this.isAvatarRightOfTitle,
                'avonni-list-item-avatar-top':
                    this.avatarPosition.includes('top'),
                'avonni-list-item-avatar-bottom':
                    this.avatarPosition.includes('bottom')
            })
            .toString();
    }

    /**
     * On overlay and background media positions, set default text color to white.
     */
    get computedTextColor() {
        return classSet('avonni-list__flex-col slds-has-flexi-truncate')
            .add({
                'avonni-list__item-text-color_inverse':
                    this.imagePosition === 'background' ||
                    this.imagePosition === 'overlay'
            })
            .toString();
    }

    /**
     * Computes if the item has an image.
     */
    get hasImage() {
        return !!this.imageSrc;
    }
}
