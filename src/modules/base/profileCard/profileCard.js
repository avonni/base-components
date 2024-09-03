import { LightningElement, api } from 'lwc';
import { classSet, normalizeString } from 'c/utils';

const AVATAR_SIZES = {
    valid: ['x-small', 'small', 'medium', 'large', 'x-large'],
    default: 'medium'
};
const AVATAR_POSITIONS = {
    valid: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right'
    ],
    default: 'top-left'
};
const AVATAR_VARIANTS = { valid: ['circle', 'square'], default: 'circle' };

/**
 * @class
 * @descriptor avonni-profile-card
 * @storyId example-profile-card--base
 * @public
 */
export default class ProfileCard extends LightningElement {
    /**
     * Value to set the image attribute 'alt'.
     *
     * @type {string}
     * @public
     */
    @api avatarAlternativeText;
    /**
     * The Lightning Design System name of the icon used as a fallback when the image fails to load.
     * The initials fallback relies on this for its background color. Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed. Only icons from the standard and custom categories are allowed.
     *
     * @type {string}
     * @public
     */
    @api avatarFallbackIconName;
    /**
     * Value to set the image attribute 'alt'.
     *
     * @type {string}
     * @public
     */
    @api backgroundAlternativeText;
    /**
     * URL for the optional image.
     *
     * @type {string}
     * @public
     */
    @api backgroundSrc;
    /**
     * The subtitle can include text, and is displayed under the title.
     *
     * @type {string}
     * @public
     */
    @api subtitle;
    /**
     * The title can include text, and is displayed in the header.
     *
     * @type {string}
     * @public
     */
    @api title;

    _avatarMobilePosition = AVATAR_POSITIONS.default;
    _avatarPosition = AVATAR_POSITIONS.default;
    _avatarSize = AVATAR_SIZES.default;
    _avatarSrc;
    _avatarVariant = AVATAR_VARIANTS.default;

    showActions = true;
    showFooter = true;
    showAvatarActions = true;

    renderedCallback() {
        let header = this.template.querySelector('[data-element-id="header"]');

        if (this.backgroundSrc) {
            header.style.backgroundImage = `url(${this.backgroundSrc})`;
        }

        if (this.avatarActionsSlot) {
            this.showAvatarActions =
                this.avatarActionsSlot.assignedElements().length !== 0;
        }

        if (this.actionsSlot) {
            this.showActions = this.actionsSlot.assignedElements().length !== 0;

            if (
                this.showActions &&
                this._avatarPosition.indexOf('right') > -1
            ) {
                let actionsContainer = this.template.querySelector(
                    '[data-element-id="avonni-actions"]'
                );
                actionsContainer.classList.add(
                    'avonni-profile-card__actions-left'
                );
            } else {
                let actionsContainer = this.template.querySelector(
                    '[data-element-id="avonni-actions"]'
                );
                actionsContainer.classList.add(
                    'avonni-profile-card__actions-right'
                );
            }
            if (
                this.showActions &&
                this._avatarMobilePosition.indexOf('right') > -1
            ) {
                let actionsContainer = this.template.querySelector(
                    '[data-element-id="avonni-actions"]'
                );
                actionsContainer.classList.add(
                    'avonni-profile-card__actions-left'
                );
            } else {
                let actionsContainer = this.template.querySelector(
                    '[data-element-id="avonni-actions"]'
                );
                actionsContainer.classList.add(
                    'avonni-profile-card__actions-right'
                );
            }
        }

        if (this.footerSlot) {
            this.showFooter = this.footerSlot.assignedElements().length !== 0;
        }
    }

    @api
    get avatarSrc() {
        return this._avatarSrc;
    }

    set avatarSrc(value) {
        this._avatarSrc = (typeof value === 'string' && value.trim()) || '';
    }

    /**
     * Get the avatar action slot DOM element.
     *
     * @type {Element}
     */
    get avatarActionsSlot() {
        return this.template.querySelector('slot[name=avataractions]');
    }

    /**
     * Get the action slot DOM element.
     *
     * @type {Element}
     */
    get actionsSlot() {
        return this.template.querySelector('slot[name=actions]');
    }

    /**
     * Get the footer slot DOM element.
     *
     * @type {Element}
     */
    get footerSlot() {
        return this.template.querySelector('slot[name=footer]');
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Position of the avatar when screen width is under 480px. Valid values include top-left, top-center, top-right, bottom-left, bottom-center, bottom-right.
     *
     * @type {string}
     * @public
     */
    @api
    get avatarMobilePosition() {
        return this._avatarMobilePosition;
    }

    set avatarMobilePosition(avatarMobilePosition) {
        this._avatarMobilePosition = normalizeString(avatarMobilePosition, {
            fallbackValue: AVATAR_POSITIONS.default,
            validValues: AVATAR_POSITIONS.valid
        });
    }

    /**
     * Position of the avatar. Valid values include top-left, top-center, top-right, bottom-left, bottom-center, bottom-right.
     *
     * @type {string}
     * @public
     * @default top-left
     */
    @api
    get avatarPosition() {
        return this._avatarPosition;
    }

    set avatarPosition(avatarPosition) {
        this._avatarPosition = normalizeString(avatarPosition, {
            fallbackValue: AVATAR_POSITIONS.default,
            validValues: AVATAR_POSITIONS.valid
        });
    }

    /**
     * The size of the avatar. Valid values include x-small, small, medium, large, x-large.
     *
     * @type {string}
     * @public
     * @default medium
     */
    @api
    get avatarSize() {
        return this._avatarSize;
    }

    set avatarSize(avatarSize) {
        this._avatarSize = normalizeString(avatarSize, {
            fallbackValue: AVATAR_SIZES.default,
            validValues: AVATAR_SIZES.valid
        });
    }

    /**
     * The variant change the shape of the avatar. Valid values are circle, square.
     *
     * @type {string}
     * @public
     * @default circle
     */
    @api
    get avatarVariant() {
        return this._avatarVariant;
    }

    set avatarVariant(avatarVariant) {
        this._avatarVariant = normalizeString(avatarVariant, {
            fallbackValue: AVATAR_VARIANTS.default,
            validValues: AVATAR_VARIANTS.valid
        });
    }

    /**
     * Deprecated. Use `resources` instead.
     *
     * @type {object[]}
     * @deprecated
     */
    @api
    get size() {
        return this.avatarSize;
    }
    set size(value) {
        // eslint-disable-next-line @lwc/lwc/no-api-reassignments
        this.avatarSize = value;
        console.warn(
            'The "size" attribute is deprecated. Use "avatar-size" instead.'
        );
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Convert profile card avatar size to primitive avatar size
     *
     * @type {boolean}
     */
    get primitiveAvatarSize() {
        switch (this.avatarSize) {
            case 'x-small':
                return 'medium';
            case 'small':
                return 'large';
            case 'medium':
                return 'x-large';
            default:
                return 'xx-large';
        }
    }

    /**
     * Computed container class styling based on selected attributes.
     *
     * @type {string}
     */
    get computedContainerClass() {
        return classSet('avonni-profile-card__flex-container')
            .add({
                'avonni-profile-card__flex-container_align-center':
                    this._avatarPosition === 'top-center' ||
                    this._avatarPosition === 'bottom-center',
                'avonni-profile-card__flex-container_align-end':
                    this._avatarPosition === 'top-right' ||
                    this._avatarPosition === 'bottom-right'
            })
            .add({
                'avonni-profile-card__flex-container-mobile_align-center':
                    this._avatarMobilePosition === 'top-center' ||
                    this._avatarMobilePosition === 'bottom-center',
                'avonni-profile-card__flex-container-mobile_align-end':
                    this._avatarMobilePosition === 'top-right' ||
                    this._avatarMobilePosition === 'bottom-right'
            })
            .toString();
    }

    /**
     * Computed Main container class styling based on selected attributes.
     *
     * @type {string}
     */
    get computedMainContainerClass() {
        return classSet('')
            .add(`${this._avatarPosition}-desktop`)
            .add(`mobile-${this._avatarMobilePosition}`)
            .add(`avonni-profile-card__card_size-${this._avatarSize}`)
            .toString();
    }

    /**
     * Computed header class background size.
     *
     * @type {string}
     */
    get computedHeaderClass() {
        return classSet(
            'slds-media slds-media_center slds-has-flexi-truncate avonni-profile-card_color-background'
        )
            .add(`avonni-profile-card__background_size-${this._avatarSize}`)
            .toString();
    }

    /**
     * Computed avatar class styling.
     *
     * @type {string}
     */
    get computedAvatarClass() {
        return classSet('avonni-profile-card__avatar-img')
            .add(`avonni-profile-card__avatar_size-${this._avatarSize}`)
            .add({
                'avonni-profile-card__avatar-img-circle':
                    this._avatarVariant === 'circle',
                'slds-align_absolute-center': this.showAvatarFallbackIcon
            })
            .toString();
    }

    /**
     * Show avatar fallback icon.
     *
     * @type {boolean}
     */
    get showAvatarFallbackIcon() {
        return !this.avatarSrc && !this.initials;
    }

    /**
     * Show header slot.
     *
     * @type {boolean}
     */
    get showHeaderSlot() {
        return !this.title && !this.subtitle;
    }

    /**
     * Verify is avatar variant is circle.
     *
     * @type {string}
     */
    get isCircle() {
        return this._avatarVariant === 'circle'
            ? 'avonni-profile-card__avatar-img-circle'
            : '';
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    handleImageError(event) {
        // eslint-disable-next-line no-console
        console.warn(
            `Avatar component Image with src="${event.target.src}" failed to load.`
        );
        this._avatarSrc = '';
    }
}
