import { LightningElement, api } from 'lwc';
import { classSet, normalizeArray, normalizeString } from 'c/utils';
import { computeSldsClass, isActionIconType } from 'c/iconUtils';

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
const DEFAULT_ALTERNATIVE_TEXT = 'Avatar';
const DEFAULT_ENTITY_TITLE = 'Entity';
const DEFAULT_ICON_MENU_ICON = 'utility:down';
const DEFAULT_PRESENCE_TITLE = 'Presence';
const DEFAULT_STATUS_TITLE = 'Status';
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

export default class PrimitiveAvatar extends LightningElement {
    @api entityInitials;
    @api initials;

    _actionMenuIcon = DEFAULT_ICON_MENU_ICON;
    _actionPosition = POSITIONS.actionDefault;
    _actions = [];
    _actionTitle = '';
    _alternativeText = DEFAULT_ALTERNATIVE_TEXT;
    _entityIconName;
    _entityPosition = POSITIONS.entityDefault;
    _entitySrc;
    _entityTitle = DEFAULT_ENTITY_TITLE;
    _entityVariant = AVATAR_VARIANTS.default;
    _fallbackIconName;
    _href;
    _presence = PRESENCE.default;
    _presencePosition = POSITIONS.presenceDefault;
    _presenceTitle = DEFAULT_PRESENCE_TITLE;
    _size = AVATAR_SIZES.default;
    _src = '';
    _status = STATUS.default;
    _statusPosition = POSITIONS.statusDefault;
    _statusTitle = DEFAULT_STATUS_TITLE;
    _variant = AVATAR_VARIANTS.default;

    computedAvatarClass;
    computedEntityClass;
    computedFallbackIconClass;
    computedPresenceClass;
    computedStatus;
    computedWrapperClass;

    connectedCallback() {
        this._updateClassList();

        if (this.status) this._computeStatusClass();
        if (this.presence) this._computePresenceClass();
        if (this.showEntity) this._computeEntityClass();
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    @api
    get actionMenuIcon() {
        return this._actionMenuIcon;
    }
    set actionMenuIcon(icon) {
        this._actionMenuIcon = icon || DEFAULT_ICON_MENU_ICON;
    }

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

    @api
    get actions() {
        return this._actions;
    }
    set actions(value) {
        this._actions = normalizeArray(value);
    }

    @api
    get alternativeText() {
        return this._alternativeText;
    }
    set alternativeText(value) {
        this._alternativeText =
            typeof value === 'string' ? value.trim() : DEFAULT_ALTERNATIVE_TEXT;
    }

    @api
    get entityIconName() {
        return this._entityIconName;
    }
    set entityIconName(value) {
        this._entityIconName = value;
        this._computeEntityClass();
    }

    @api
    get entityPosition() {
        return this._entityPosition;
    }
    set entityPosition(value) {
        this._entityPosition = normalizeString(value, {
            fallbackValue: POSITIONS.entityDefault,
            validValues: POSITIONS.valid
        });
        this._computeEntityClass();
    }

    @api
    get entitySrc() {
        return this._entitySrc;
    }
    set entitySrc(value) {
        this._entitySrc = (typeof value === 'string' && value.trim()) || '';
    }

    @api
    get entityTitle() {
        return this._entityTitle;
    }
    set entityTitle(value) {
        this._entityTitle =
            (typeof value === 'string' && value.trim()) || DEFAULT_ENTITY_TITLE;
    }

    @api
    get entityVariant() {
        return this._entityVariant;
    }
    set entityVariant(value) {
        this._entityVariant = normalizeString(value, {
            fallbackValue: AVATAR_VARIANTS.default,
            validValues: AVATAR_VARIANTS.valid
        });
        this._computeEntityClass();
    }

    @api
    get fallbackIconName() {
        return this._fallbackIconName;
    }
    set fallbackIconName(value) {
        this._fallbackIconName = value;
        this._updateClassList();
    }

    @api
    get href() {
        return this._href;
    }
    set href(value) {
        this._href = value;
        this._updateClassList();
    }

    @api
    get presence() {
        return this._presence;
    }
    set presence(value) {
        this._presence = normalizeString(value, {
            fallbackValue: PRESENCE.default,
            validValues: PRESENCE.valid
        });
        this._computePresenceClass();
    }

    @api
    get presencePosition() {
        return this._presencePosition;
    }
    set presencePosition(value) {
        this._presencePosition = normalizeString(value, {
            fallbackValue: POSITIONS.presenceDefault,
            validValues: POSITIONS.valid
        });
        this._computePresenceClass();
    }

    @api
    get presenceTitle() {
        return this._presenceTitle;
    }
    set presenceTitle(value) {
        this._presenceTitle =
            typeof value === 'string' ? value.trim() : DEFAULT_PRESENCE_TITLE;
    }

    @api
    get size() {
        return this._size;
    }
    set size(value) {
        this._size = normalizeString(value, {
            fallbackValue: AVATAR_SIZES.default,
            validValues: AVATAR_SIZES.valid
        });
        this._updateClassList();
    }

    @api
    get src() {
        return this._src;
    }
    set src(value) {
        this._src = (typeof value === 'string' && value.trim()) || '';
    }

    @api
    get status() {
        return this._status;
    }
    set status(value) {
        this._status = normalizeString(value, {
            fallbackValue: STATUS.default,
            validValues: STATUS.valid
        });
        this._computeStatusClass();
    }

    @api
    get statusPosition() {
        return this._statusPosition;
    }
    set statusPosition(value) {
        this._statusPosition = normalizeString(value, {
            fallbackValue: POSITIONS.statusDefault,
            validValues: POSITIONS.valid
        });
        this._computeStatusClass();
    }

    @api
    get statusTitle() {
        return this._statusTitle;
    }
    set statusTitle(value) {
        this._statusTitle =
            typeof value === 'string' ? value.trim() : DEFAULT_STATUS_TITLE;
        this._computeStatusClass();
    }

    @api
    get variant() {
        return this._variant;
    }
    set variant(value) {
        this._variant = normalizeString(value, {
            fallbackValue: AVATAR_VARIANTS.default,
            validValues: AVATAR_VARIANTS.valid
        });
        this._updateClassList();
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    @api
    getBackgroundColor() {
        const icon = this.template.querySelector(
            '[data-element-id="avatar-container"]'
        );
        return icon ? getComputedStyle(icon).backgroundColor : '';
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    get action() {
        return this.actions[0];
    }

    get actionMenu() {
        return this.actions.length > 1;
    }

    get computedActionClass() {
        return classSet('avonni-avatar__actions').add(
            `avonni-avatar_${this._actionPosition}`
        );
    }

    get computedActionMenuIcon() {
        return this.actions.length === 1 && this.actions[0].iconName
            ? this.actions[0].iconName
            : this.actionMenuIcon;
    }

    get computedActionMenuSize() {
        switch (this.size) {
            case 'x-large':
                return 'x-small';
            case 'large':
                return 'xx-small';
            case 'medium':
                return 'xx-small';
            default:
                return 'small';
        }
    }

    get computedEntityInitialsClass() {
        return classSet('slds-avatar__initials avonni-avatar__entity-initials')
            .add(computeSldsClass(this.entityIconName))
            .toString();
    }

    get computedInitialsClass() {
        return classSet(
            'slds-avatar__initials avonni-avatar__initials_text-color'
        )
            .add({
                'slds-avatar-grouped__initials': this.groupedAvatar
            })
            .add(computeSldsClass(this.fallbackIconName))
            .toString();
    }

    get groupedAvatar() {
        return Array.from(this.classList).includes('slds-avatar-grouped');
    }

    get showActions() {
        const { size, actions } = this;
        const isSmallSize =
            size === 'small' || size === 'x-small' || size === 'xx-small';
        const hasActions = Array.isArray(actions) && actions.length;

        return !isSmallSize && hasActions;
    }

    get showAvatar() {
        return this.src || this.initials || this.fallbackIconName;
    }

    get showEntity() {
        return this.entitySrc || this.entityInitials || this.entityIconName;
    }

    get showEntityIcon() {
        return !this.entitySrc && !this.entityInitials;
    }

    get showIcon() {
        return !this._src && !this.initials;
    }

    get showInitials() {
        return !this._src && this.initials;
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    _computeEntityClass() {
        const { entityVariant, entityPosition, entityIconName } = this;

        const iconFullName =
            typeof entityIconName === 'string' ? entityIconName.trim() : ':';
        const iconCategory = iconFullName.split(':')[0];
        const iconName = iconFullName.split(':')[1]
            ? iconFullName.split(':')[1].replace(/_/g, '-')
            : '';

        this.computedEntityClass = classSet(
            `avonni-avatar avonni-avatar__entity slds-icon-${iconCategory}-${iconName}`
        )
            .add(`avonni-avatar_${entityPosition}`)
            .add({
                'avonni-avatar__entity_circle': entityVariant === 'circle'
            });
    }

    _computePresenceClass() {
        const { presence, presencePosition } = this;

        this.computedPresenceClass = classSet('avonni-avatar__presence')
            .add(`avonni-avatar__presence_${presence}`)
            .add(`avonni-avatar_${presencePosition}`);
    }

    _computeStatusClass() {
        const { status, statusPosition, statusTitle } = this;
        const classes = classSet('avonni-avatar__status slds-current-color')
            .add(`avonni-avatar__status_${status}`)
            .add(`avonni-avatar_${statusPosition}`);

        let iconName = this._getStatusIconName(status);

        this.computedStatus = {
            class: classes,
            iconName,
            type: status,
            title: statusTitle
        };
    }

    _getStatusIconName(status) {
        switch (status) {
            case 'approved':
                return 'utility:check';
            case 'locked':
                return 'utility:lock';
            case 'declined':
                return 'utility:close';
            default:
                return 'utility:help';
        }
    }

    _updateClassList() {
        const { size, variant, fallbackIconName, groupedAvatar } = this;
        const wrapperClass = classSet(
            'slds-is-relative avonni-avatar__display_inline-block'
        )
            .add(`avonni-avatar_${variant}`)
            .add(`avonni-avatar_${size}`);

        const avatarClass = classSet('avonni-avatar')
            .add({
                'avonni-avatar__border-radius_circle': variant === 'circle',
                'avonni-avatar_link': this.href
            })
            .add(computeSldsClass(fallbackIconName));

        const fallbackIconClass = classSet('avonni-avatar__icon').add({
            'slds-avatar-grouped__icon': groupedAvatar,
            'avonni-avatar__action-icon': isActionIconType(fallbackIconName)
        });

        this.computedAvatarClass = avatarClass;
        this.computedWrapperClass = wrapperClass;
        this.computedFallbackIconClass = fallbackIconClass;
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
         * @bubbles
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('actionclick', {
                bubbles: true,
                detail: {
                    name: event.currentTarget.value || event.detail.value
                }
            })
        );
    }

    /**
     * Prevent anchor tag from navigating when href leads to nothing.
     *
     * @param {Event} event
     */
    handleAnchorTagClick(event) {
        const href = event.currentTarget.href;
        if (
            // eslint-disable-next-line no-script-url
            ['#', 'javascript:void(0)', 'javascript:void(0);'].includes(href)
        ) {
            event.preventDefault();
        }
    }

    handleImageError(event) {
        // eslint-disable-next-line no-console
        console.warn(
            `Avatar component Image with src="${event.target.src}" failed to load.`
        );
        this._src = '';
    }

    handleStopPropagation(event) {
        event.stopPropagation();
    }
}
