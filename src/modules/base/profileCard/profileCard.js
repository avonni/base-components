import { AvonniResizeObserver } from 'c/resizeObserver';
import { classSet, normalizeString } from 'c/utils';
import { LightningElement, api } from 'lwc';

const AVATAR_POSITIONS = {
    valid: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
        'left',
        'center',
        'right'
    ],
    default: 'top-left'
};
const AVATAR_SIZES = {
    valid: ['x-small', 'small', 'medium', 'large', 'x-large'],
    default: 'medium'
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

    _avatarPosition = AVATAR_POSITIONS.default;
    _avatarSize = AVATAR_SIZES.default;
    _avatarSrc;
    _avatarVariant = AVATAR_VARIANTS.default;
    _largeAvatarPosition;
    _mediumAvatarPosition;
    _smallAvatarPosition;

    _connected = false;
    _isSmallContainer = false;
    _resizeObserver;

    avatarPositionToDisplay = AVATAR_POSITIONS.default;
    showActions = true;
    showAvatarActions = true;
    showFooter = true;

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this._connected = true;
    }

    renderedCallback() {
        if (!this._resizeObserver) {
            this._resizeObserver = this.initResizeObserver();
        }

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
        }

        if (this.footerSlot) {
            this.showFooter = this.footerSlot.assignedElements().length !== 0;
        }

        /**
         * The event fired when the profile card is rendered.
         *
         * @event
         * @name privateprofilecardrendered
         */
        this.dispatchEvent(
            new CustomEvent('privateprofilecardrendered', {
                detail: {
                    callbacks: {
                        // Used by the Component Builder in Salesforce
                        // to show the empty slots when a component is being dragged
                        recomputeSlotsVisibility: () => {
                            this.showActions = true;
                            this.showFooter = true;
                        }
                    }
                },
                bubbles: true
            })
        );
    }

    disconnectedCallback() {
        if (this._resizeObserver) {
            this._resizeObserver.disconnect();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Position of the avatar when screen width is under 480px. Valid values include top-left, top-center, top-right, bottom-left, bottom-center, bottom-right, left, center, right.
     *
     * @type {string}
     * @deprecated
     */
    @api
    get avatarMobilePosition() {
        return this._smallAvatarPosition;
    }
    set avatarMobilePosition(value) {
        this._smallAvatarPosition = normalizeString(value, {
            validValues: AVATAR_POSITIONS.valid
        });

        if (this._connected) {
            this.initAvatarPosition();
        }
        console.warn(
            "'avatarMobilePosition' is deprecated. Use 'small-avatar-position' instead."
        );
    }

    /**
     * Position of the avatar. Valid values include top-left, top-center, top-right, bottom-left, bottom-center, bottom-right, left, center, right.
     *
     * @type {string}
     * @public
     * @default top-left
     */
    @api
    get avatarPosition() {
        return this._avatarPosition;
    }
    set avatarPosition(value) {
        this._avatarPosition = normalizeString(value, {
            fallbackValue: AVATAR_POSITIONS.default,
            validValues: AVATAR_POSITIONS.valid
        });

        if (this._connected) {
            this.initAvatarPosition();
        }
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
    set avatarSize(value) {
        this._avatarSize = normalizeString(value, {
            fallbackValue: AVATAR_SIZES.default,
            validValues: AVATAR_SIZES.valid
        });
    }

    /**
     * The URL of the avatar image.
     *
     * @type {string}
     * @public
     */
    @api
    get avatarSrc() {
        return this._avatarSrc;
    }
    set avatarSrc(value) {
        this._avatarSrc = (typeof value === 'string' && value.trim()) || '';
    }

    /**
     * The variant change the shape of the avatar. Valid values are circle and square.
     *
     * @type {string}
     * @public
     * @default circle
     */
    @api
    get avatarVariant() {
        return this._avatarVariant;
    }
    set avatarVariant(value) {
        this._avatarVariant = normalizeString(value, {
            fallbackValue: AVATAR_VARIANTS.default,
            validValues: AVATAR_VARIANTS.valid
        });
    }

    /**
     * Position of the avatar when the component is 1024px wide or more. Valid values include top-left, top-center, top-right, bottom-left, bottom-center, bottom-right, left, center, and right.
     *
     * @type {string}
     * @public
     */
    @api
    get largeAvatarPosition() {
        return this._largeAvatarPosition;
    }
    set largeAvatarPosition(value) {
        this._largeAvatarPosition = normalizeString(value, {
            validValues: AVATAR_POSITIONS.valid
        });

        if (this._connected) {
            this.initAvatarPosition();
        }
    }

    /**
     * Position of the avatar when the component is 768px wide or more. Valid values include top-left, top-center, top-right, bottom-left, bottom-center, bottom-right, left, center, and right.
     *
     * @type {string}
     * @public
     */
    @api
    get mediumAvatarPosition() {
        return this._mediumAvatarPosition;
    }
    set mediumAvatarPosition(value) {
        this._mediumAvatarPosition = normalizeString(value, {
            validValues: AVATAR_POSITIONS.valid
        });

        if (this._connected) {
            this.initAvatarPosition();
        }
    }

    /**
     * Deprecated. Use `avatar-size` instead.
     *
     * @type {object[]}
     * @deprecated
     */
    @api
    get size() {
        return this.avatarSize;
    }
    set size(value) {
        this._avatarSize = value;

        console.warn(
            'The "size" attribute is deprecated. Use "avatar-size" instead.'
        );
    }

    /**
     * Position of the avatar when the component is 480px wide or more. Valid values include top-left, top-center, top-right, bottom-left, bottom-center, bottom-right, left, center, and right.
     *
     * @type {string}
     * @public
     */
    @api
    get smallAvatarPosition() {
        return this._smallAvatarPosition;
    }
    set smallAvatarPosition(value) {
        this._smallAvatarPosition = normalizeString(value, {
            validValues: AVATAR_POSITIONS.valid
        });

        if (this._connected) {
            this.initAvatarPosition();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Get the action slot DOM element.
     *
     * @type {Element}
     */
    get actionsSlot() {
        return this.template.querySelector('slot[name=actions]');
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
     * Computed actions class styling.
     *
     * @type {string}
     */
    get computedActionsClass() {
        const isLeft =
            this.showActions && this.avatarPositionToDisplay.includes('right');
        return classSet('slds-is-absolute')
            .add({
                'avonni-profile-card__actions-right': !isLeft,
                'avonni-profile-card__actions-left': isLeft
            })
            .toString();
    }

    /**
     * Computed avatar class styling.
     *
     * @type {string}
     */
    get computedAvatarClass() {
        return classSet('avonni-profile-card__avatar-img')
            .add(`avonni-profile-card__avatar_size-${this.avatarSize}`)
            .add(`avonni-profile-card__avatar-img-${this.avatarVariant}`)
            .add({ 'slds-align_absolute-center': this.showAvatarFallbackIcon })
            .toString();
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
                    this.avatarPositionToDisplay === 'top-center' ||
                    this.avatarPositionToDisplay === 'bottom-center' ||
                    this.avatarPositionToDisplay === 'center',
                'avonni-profile-card__flex-container_align-end':
                    this.avatarPositionToDisplay === 'top-right' ||
                    this.avatarPositionToDisplay === 'bottom-right' ||
                    this.avatarPositionToDisplay === 'right'
            })
            .toString();
    }

    /**
     * Computed header class background size.
     *
     * @type {string}
     */
    get computedHeaderClass() {
        return classSet(
            'slds-media slds-media_center slds-has-flexi-truncate avonni-profile-card_color-background avonni-profile-card__header-border'
        )
            .add(`avonni-profile-card__background_size-${this.avatarSize}`)
            .toString();
    }

    /**
     * Computed lightning-icon class.
     *
     * @type {string}
     */
    get computedIconClass() {
        return classSet('avonni-profile-card__lightning-icon')
            .add(`avonni-profile-card__lightning-icon_size-${this.avatarSize}`)
            .add(this.computedVariantClass)
            .toString();
    }

    /**
     * Computed icon-wrapper class.
     *
     * @type {string}
     */
    get computedIconWrapperClass() {
        return classSet('avonni-profile-card__icon-wrapper')
            .add(this.computedVariantClass)
            .add('slds-align_absolute-center')
            .toString();
    }

    /**
     * Computed image class.
     *
     * @type {string}
     */
    get computedImageClass() {
        return classSet('avonni-profile-card__image')
            .add(this.computedVariantClass)
            .toString();
    }

    /**
     * Computed Main container class styling based on selected attributes.
     *
     * @type {string}
     */
    get computedMainContainerClass() {
        const containerClass = classSet('');

        // Add responsive classes
        containerClass.add({
            'avonni-profile-card__avatar-desktop': !this._isSmallContainer,
            'avonni-profile-card__avatar-mobile': this._isSmallContainer
        });

        // Add position classes
        containerClass.add({
            'avonni-profile-card__avatar-bottom':
                this.avatarPositionToDisplay.includes('bottom'),
            'avonni-profile-card__avatar-center':
                this.avatarPositionToDisplay.includes('center'),
            'avonni-profile-card__avatar-left':
                this.avatarPositionToDisplay.includes('left'),
            'avonni-profile-card__avatar-right':
                this.avatarPositionToDisplay.includes('right'),
            'avonni-profile-card__avatar-top':
                this.avatarPositionToDisplay.includes('top')
        });

        // Add size class
        containerClass.add(`avonni-profile-card__card_size-${this.avatarSize}`);

        return containerClass.toString();
    }

    /**
     * Computed the text container class styling.
     *
     * @type {string}
     */
    get computedTextContainerClass() {
        return classSet('avonni-profile-card__flex-container slds-size_full')
            .add({
                'avonni-profile-card__flex-container__left':
                    this.avatarPositionToDisplay.includes('left'),
                'avonni-profile-card__flex-container__right':
                    this.avatarPositionToDisplay.includes('right'),
                'avonni-profile-card__flex-container__center':
                    this.avatarPositionToDisplay.includes('center')
            })
            .toString();
    }

    /**
     * Computed avatar variant class styling.
     *
     * @type {string}
     */
    get computedVariantClass() {
        return this.avatarVariant === 'circle'
            ? 'avonni-profile-card__avatar-img-circle'
            : 'avonni-profile-card__avatar-img-square';
    }

    /**
     * Get the footer slot DOM element.
     *
     * @type {Element}
     */
    get footerSlot() {
        return this.template.querySelector('slot[name=footer]');
    }

    /**
     * HTML element for the profile card container.
     *
     * @type {HTMLElement}
     */
    get profileCardContainer() {
        return this.template.querySelector(
            '[data-element-id="main-container"]'
        );
    }

    /**
     * Show avatar fallback icon.
     *
     * @type {boolean}
     */
    get showAvatarFallbackIcon() {
        return !this.avatarSrc;
    }

    /**
     * Show header slot.
     *
     * @type {boolean}
     */
    get showHeaderSlot() {
        return !this.title && !this.subtitle;
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    initAvatarPosition() {
        if (!this.profileCardContainer) return;

        const width = this.profileCardContainer.clientWidth || 0;
        if (width < 480) {
            this.avatarPositionToDisplay = this.avatarPosition;
        } else if (width >= 480 && width < 768) {
            this.avatarPositionToDisplay =
                this.smallAvatarPosition || this.avatarPosition;
        } else if (width >= 768 && width < 1024) {
            this.avatarPositionToDisplay =
                this.mediumAvatarPosition ||
                this.smallAvatarPosition ||
                this.avatarPosition;
        } else {
            this.avatarPositionToDisplay =
                this.largeAvatarPosition ||
                this.mediumAvatarPosition ||
                this.smallAvatarPosition ||
                this.avatarPosition;
        }
    }

    /**
     * Initialize the screen resize observer.
     *
     * @returns {AvonniResizeObserver} Resize observer.
     */
    initResizeObserver() {
        if (!this.profileCardContainer) {
            return null;
        }
        return new AvonniResizeObserver(this.profileCardContainer, () => {
            const width = this.profileCardContainer.clientWidth || 0;
            this._isSmallContainer = width <= 480;
            this.initAvatarPosition();
        });
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS
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
