import {
    classSet,
    generateUUID,
    normalizeArray,
    normalizeString
} from 'c/utils';

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
        this.checked = value.checked;
        this.uncheckable = value.uncheckable;
        this.description = value.description;
        this.fallbackIconName = value.fallbackIconName;
        this.fields = normalizeArray(value.fields).map((f) => {
            return { ...f, key: generateUUID() };
        });
        this.href = value.href;
        this.infos = normalizeArray(value.infos);
        this.icons = normalizeArray(value.icons);
        this.imageAlternativeText = value.imageAlternativeText;
        this.imageSrc = value.imageSrc;
        this.imagePosition = value.imagePosition;
        this.label = value.label;
        this.name = value.name;
    }

    /**
     * Computes if the avatar is at the left.
     */
    get isAvatarLeft() {
        return this.hasAvatar && this.avatarPosition.endsWith('left');
    }

    /**
     * Computes if the avatar is at the right.
     */
    get isAvatarRight() {
        return this.hasAvatar && this.avatarPosition.endsWith('right');
    }

    /**
     * Computes if the avatar is at the left of the title.
     */
    get isAvatarLeftOfTitle() {
        return this.hasAvatar && this.avatarPosition === 'left-of-title';
    }

    /**
     * Computes if the avatar is at the right of the title.
     */
    get isAvatarRightOfTitle() {
        return this.hasAvatar && this.avatarPosition === 'right-of-title';
    }

    /**
     * Compute the class of the avatar
     */
    get computedAvatarClass() {
        return classSet('avonni-list-item-avatar')
            .add({
                'slds-m-bottom_xx-small':
                    this.isAvatarLeftOfTitle || this.isAvatarRightOfTitle,
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
     * Computes if the item has an avatar.
     */
    get hasAvatar() {
        return (
            this.avatar &&
            (this.avatar.fallbackIconName ||
                this.avatar.src ||
                this.avatar.initials)
        );
    }

    /**
     * Computes if the item has icons.
     */
    get hasIcons() {
        return this.icons && this.icons.length > 0;
    }

    /**
     * Computes if the item has an image.
     */
    get hasImage() {
        return !!this.imageSrc;
    }
}
