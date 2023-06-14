import { normalizeArray, normalizeString } from 'c/utilsPrivate';
import { classSet } from 'c/utils';

const AVATAR_POSITION = {
    valid: ['left', 'right', 'left-of-title', 'right-of-title'],
    default: 'left'
};

export default class Item {
    constructor(value) {
        this.avatar = value.avatar;
        this.avatarPosition = normalizeString(
            value.avatar && value.avatar.position,
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
        return this.avatarPosition === 'left';
    }

    /**
     * Computes if the avatar is at the right.
     */
    get isAvatarRight() {
        return this.avatarPosition === 'right';
    }

    /**
     * Computes if the avatar is at the left of the title.
     */
    get isAvatarLeftOfTitle() {
        return this.avatarPosition === 'left-of-title';
    }

    /**
     * Computes if the avatar is at the right of the title.
     */
    get isAvatarRightOfTitle() {
        return this.avatarPosition === 'right-of-title';
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
