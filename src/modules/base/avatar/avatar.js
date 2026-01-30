import {
    classSet,
    normalizeArray,
    normalizeBoolean,
    normalizeString
} from 'c/utils';
import { LightningElement, api } from 'lwc';

const AVATAR_SIZES = {
    valid: [
        'xx-small',
        'x-small',
        'small',
        'medium',
        'large',
        'x-large',
        'xx-large',
        'xxx-large'
    ],
    default: 'medium'
};
const AVATAR_VARIANTS = {
    valid: ['circle', 'square'],
    default: 'square'
};
const ICON_POSITIONS = {
    valid: ['start', 'center', 'end'],
    default: 'center'
};
const POSITIONS = {
    valid: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    presenceDefault: 'bottom-right',
    statusDefault: 'top-right',
    entityDefault: 'top-left',
    actionDefault: 'bottom-left'
};
const PRESENCE = {
    valid: ['online', 'busy', 'focus', 'offline', 'blocked', 'away'],
    default: null
};
const STATUS = {
    valid: ['approved', 'locked', 'declined', 'unknown'],
    default: null
};
const TEXT_POSITIONS = {
    valid: ['left', 'right', 'center'],
    default: 'right'
};

const DEFAULT_ALTERNATIVE_TEXT = 'Avatar';
const DEFAULT_ENTITY_TITLE = 'Entity';
const DEFAULT_PRESENCE_TITLE = 'Presence';
const DEFAULT_STATUS_TITLE = 'Status';

/**
 * @class
 * @descriptor avonni-avatar
 * @storyId example-avatar--base
 * @public
 */
export default class Avatar extends LightningElement {
    /**
     * The Lightning Design System icon name for a custom menu icon. Unused if there is only one action.
     *
     * @public
     * @type {string}
     * @default utility:down
     */
    @api actionMenuIcon;
    /**
     * The Lightning Design System name of the icon used as a fallback for the entity icon when the image fails to load. The initials fallback relies on this for its background color.
     * Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed. Only icons from the standard and custom categories are allowed.
     *
     * @public
     * @type {string}
     */
    @api entityIconName;
    /**
     * Entity initials. If the record name contains two words, like first and last name, use the first capitalized letter of each. For records that only have a single word name, use the first two letters of that word using one capital and one lower case letter.
     *
     * @public
     * @type {string}
     */
    @api entityInitials;
    /**
     * The Lightning Design System name of the icon used as a fallback when the image fails to load. The initials fallback relies on this for its background color. Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed. Only icons from the standard and custom categories are allowed.
     *
     * @public
     * @type {string}
     */
    @api fallbackIconName;
    /**
     * The URL of the page the link goes to.
     *
     * @public
     * @type {string}
     */
    @api href;
    /**
     * If the record name contains two words, like first and last name, use the first capitalized letter of each. For records that only have a single word name, use the first two letters of that word using one capital and one lower case letter.
     *
     * @public
     * @type {string}
     */
    @api initials;
    /**
     * Primary text to display, usually the name of the person.
     *
     * @public
     * @type {string}
     */
    @api primaryText;
    /**
     * Primary text url
     *
     * @public
     * @type {string}
     */
    @api primaryTextUrl;
    /**
     * Secondary text to display, usually the role of the user.
     *
     * @public
     * @type {string}
     */
    @api secondaryText;
    /**
     * The target of the link.
     *
     * @public
     * @type {string}
     */
    @api target;
    /**
     * Tertiary text to display, usually the status of the user. The tertiary text will only be shown when using size x-large, xx-large and xxx-large.
     *
     * @public
     * @type {string}
     */
    @api tertiaryText;

    _actions = [];
    _actionPosition = POSITIONS.actionDefault;
    _alternativeText = DEFAULT_ALTERNATIVE_TEXT;
    _entityPosition = POSITIONS.entityDefault;
    _entitySrc;
    _entityTitle = DEFAULT_ENTITY_TITLE;
    _entityVariant = AVATAR_VARIANTS.default;
    _hideAvatarDetails = false;
    _iconPosition = ICON_POSITIONS.default;
    _presence = PRESENCE.default;
    _presencePosition = POSITIONS.presenceDefault;
    _presenceTitle = DEFAULT_PRESENCE_TITLE;
    _size = AVATAR_SIZES.default;
    _src;
    _status = STATUS.default;
    _statusPosition = POSITIONS.statusDefault;
    _statusTitle = DEFAULT_STATUS_TITLE;
    _tags = [];
    _textPosition = TEXT_POSITIONS.default;
    _variant = AVATAR_VARIANTS.default;

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Position of the action button or menu relative to the avatar. Valid values include top-right, bottom-right, bottom-left or top-left.
     *
     * @public
     * @type {string}
     * @default bottom-left
     */
    @api
    get actionPosition() {
        return this._actionPosition;
    }
    set actionPosition(value) {
        this._actionPosition = normalizeString(value, {
            fallbackValue: POSITIONS.actionDefault,
            validValues: POSITIONS.valid
        });
    }

    /**
     * Array of action objects. If the array contains a single action, it is displayed as a button icon. Otherwise, actions are placed in a button menu with a label and icon.
     *
     * @public
     * @type {object[]}
     */
    @api
    get actions() {
        return this._actions;
    }
    set actions(value) {
        this._actions = normalizeArray(value);
    }

    /**
     * The alternative text used to describe the avatar, which is displayed as hover text on the image.
     *
     * @public
     * @type {string}
     * @required
     * @default Avatar
     */
    @api
    get alternativeText() {
        return this._alternativeText;
    }
    set alternativeText(value) {
        this._alternativeText =
            typeof value === 'string' ? value.trim() : DEFAULT_ALTERNATIVE_TEXT;
    }

    /**
     * Position of the entity icon. Valid values include top-left, top-right, bottom-left and bottom-right.
     *
     * @public
     * @type {string}
     * @default top-left
     */
    @api
    get entityPosition() {
        return this._entityPosition;
    }
    set entityPosition(value) {
        this._entityPosition = normalizeString(value, {
            fallbackValue: POSITIONS.entityDefault,
            validValues: POSITIONS.valid
        });
    }

    /**
     * The URL for the entity image.
     *
     * @public
     * @type {string}
     */
    @api
    get entitySrc() {
        return this._entitySrc;
    }
    set entitySrc(value) {
        this._entitySrc = (typeof value === 'string' && value.trim()) || '';
    }

    /**
     * Entity title to be shown as a tooltip on hover over the presence icon.
     *
     * @public
     * @type {string}
     * @default Entity
     */
    @api
    get entityTitle() {
        return this._entityTitle;
    }
    set entityTitle(value) {
        this._entityTitle =
            (typeof value === 'string' && value.trim()) || DEFAULT_ENTITY_TITLE;
    }

    /**
     * The variant changes the shape of the entity. Valid values are empty, circle, and square.
     *
     * @public
     * @type {string}
     * @default square
     */
    @api
    get entityVariant() {
        return this._entityVariant;
    }
    set entityVariant(value) {
        this._entityVariant = normalizeString(value, {
            fallbackValue: AVATAR_VARIANTS.default,
            validValues: AVATAR_VARIANTS.valid
        });
    }

    /**
     * Hide primary, secondary and tertiary text.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get hideAvatarDetails() {
        return this._hideAvatarDetails;
    }
    set hideAvatarDetails(value) {
        this._hideAvatarDetails = normalizeBoolean(value);
    }

    /**
     * The position of the avatar icon. Valid values are start, center, end.
     *
     * @public
     * @type {string}
     * @default center
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
     * Presence of the user to display. Valid values include online, busy, focus, offline, blocked and away.
     *
     * @public
     * @type {string}
     */
    @api
    get presence() {
        return this._presence;
    }
    set presence(value) {
        this._presence = normalizeString(value, {
            fallbackValue: PRESENCE.default,
            validValues: PRESENCE.valid
        });
    }

    /**
     * Presence title to be shown as a tooltip on hover over the presence icon.
     *
     * @public
     * @type {string}
     * @default bottom-right
     */
    @api
    get presencePosition() {
        return this._presencePosition;
    }
    set presencePosition(value) {
        this._presencePosition = normalizeString(value, {
            fallbackValue: POSITIONS.presenceDefault,
            validValues: POSITIONS.valid
        });
    }

    /**
     * Position of the presence icon. Valid values include top-left, top-right, bottom-left and bottom-right.
     *
     * @public
     * @type {string}
     * @default Presence
     */
    @api
    get presenceTitle() {
        return this._presenceTitle;
    }
    set presenceTitle(value) {
        this._presenceTitle =
            typeof value === 'string' ? value.trim() : DEFAULT_PRESENCE_TITLE;
    }

    /**
     * The size of the avatar. Valid values are x-small, small, medium, large, x-large , xx-large and xxx-large.
     *
     * @public
     * @type {string}
     * @default medium
     */
    @api
    get size() {
        return this._size;
    }
    set size(value) {
        this._size = normalizeString(value, {
            fallbackValue: AVATAR_SIZES.default,
            validValues: AVATAR_SIZES.valid
        });
    }

    /**
     * The URL for the image.
     *
     * @public
     * @type {string}
     * @required
     */
    @api
    get src() {
        return this._src;
    }
    set src(value) {
        this._src = (typeof value === 'string' && value.trim()) || '';
    }

    /**
     * Status of the user to display. Valid values include approved, locked, declined and unknown.
     *
     * @public
     * @type {string}
     */
    @api
    get status() {
        return this._status;
    }
    set status(value) {
        this._status = normalizeString(value, {
            fallbackValue: STATUS.default,
            validValues: STATUS.valid
        });
    }

    /**
     * Position of the status icon. Valid values include top-left, top-right, bottom-left and bottom-right.
     *
     * @public
     * @type {string}
     * @default top-right
     */
    @api
    get statusPosition() {
        return this._statusPosition;
    }
    set statusPosition(value) {
        this._statusPosition = normalizeString(value, {
            fallbackValue: POSITIONS.statusDefault,
            validValues: POSITIONS.valid
        });
    }

    /**
     * Status title to be shown as a tooltip on hover over the status icon.
     *
     * @public
     * @type {string}
     * @default Status
     */
    @api
    get statusTitle() {
        return this._statusTitle;
    }
    set statusTitle(value) {
        this._statusTitle =
            typeof value === 'string' ? value.trim() : DEFAULT_STATUS_TITLE;
    }

    /**
     * Array of tag objects. The tags are displayed as chips in the details.
     *
     * @public
     * @type {object[]}
     */
    @api
    get tags() {
        return this._tags;
    }
    set tags(tags) {
        this._tags = normalizeArray(tags);
    }

    /**
     * Position of the details text, relatively to the avatar. Valid values include right, left or center.
     *
     * @public
     * @type {string}
     * @default right
     */
    @api
    get textPosition() {
        return this._textPosition;
    }
    set textPosition(position) {
        this._textPosition = normalizeString(position, {
            fallbackValue: TEXT_POSITIONS.default,
            validValues: TEXT_POSITIONS.valid
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
    get variant() {
        return this._variant;
    }
    set variant(value) {
        this._variant = normalizeString(value, {
            fallbackValue: AVATAR_VARIANTS.default,
            validValues: AVATAR_VARIANTS.valid
        });
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Get the background color of the icon.
     *
     * @returns {string} The background color of the icon.
     * @public
     */
    @api
    getBackgroundColor() {
        const icon = this.template.querySelector(
            '[data-element-id^="avonni-primitive-avatar"]'
        );
        return icon ? icon.getBackgroundColor() : '';
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Media object class based on text position.
     *
     * @type {string}
     */
    get computedMediaObjectClass() {
        return classSet('').add({
            'slds-text-align_right': this.textPosition === 'left',
            'slds-text-align_center': this.textPosition === 'center',
            'avonni-avatar__media-object_width-100':
                this.textPosition === 'center'
        });
    }

    /**
     * Text position centered.
     *
     * @type {boolean}
     */
    get computedMediaObjectInline() {
        return this.textPosition === 'center';
    }

    /**
     * If true, the avatar is not displayed in the media object.
     *
     * @type {boolean}
     */
    get displayAvatarNoDetails() {
        return this.showAvatar && this.hideAvatarDetails;
    }

    /**
     * If true, the avatar is displayed as figure inverse in the media object.
     *
     * @type {boolean}
     */
    get displayAvatarRight() {
        return this.textPosition === 'left';
    }

    /**
     * Check if Avatar exists.
     *
     * @type {boolean}
     */
    get showAvatar() {
        return this.src || this.initials || this.fallbackIconName;
    }

    /**
     * If true, the chip container is displayed.
     *
     * @type {boolean}
     */
    get showChipContainer() {
        return this.tags.length;
    }

    /**
     * Tertiary text show.
     *
     * @type {boolean}
     */
    get showTertiaryText() {
        return (
            (this.size === 'x-large' ||
                this.size === 'xx-large' ||
                this.size === 'xxx-large') &&
            this.tertiaryText
        );
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS
     * -------------------------------------------------------------
     */

    /**
     * Action clicked event handler.
     *
     * @param {event}
     */
    handleActionClick(event) {
        /**
         * The event fired when a user clicks on an action.
         *
         * @event
         * @name actionclick
         * @param {string} name The action name.
         * @bubbles
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('actionclick', {
                bubbles: true,
                detail: {
                    name: event.detail.name
                }
            })
        );
    }
}
