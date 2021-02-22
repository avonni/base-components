import { LightningElement, api } from 'lwc';
import { classSet } from 'avonni/utils';
import { normalizeString, normalizeBoolean } from 'avonni/utilsPrivate';
import { computeSldsClass } from 'avonni/iconUtils';
import avatar from './avatar.html';
import avatarWithDetails from './avatarWithDetails.html';

const SIZE = {
    valid: [
        'xx-small',
        'x-small',
        'small',
        'medium',
        'large',
        'x-large',
        'xx-large'
    ],
    default: 'medium'
};
const VARIANT = {
    valid: ['circle', 'square'],
    default: 'square'
};
const STATUS = {
    valid: ['approved', 'locked', 'declined', 'unknown'],
    default: null
};
const POSITION = {
    valid: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    presenceDefault: 'bottom-right',
    statusDefault: 'top-right',
    entityDefault: 'top-left'
};
const PRESENCE = {
    valid: ['online', 'busy', 'focus', 'offline', 'blocked', 'away'],
    default: null
};

export default class Avatar extends LightningElement {
    @api entityIconName;
    @api entityInitials;
    @api fallbackIconName;
    @api initials;
    @api primaryText;
    @api secondaryText;
    @api tertiaryText;

    avatarClass;
    entityClass;
    presenceClass;
    statusComputed;
    wrapperClass;

    _alternativeText = 'Avatar';
    _entityPosition = POSITION.entityDefault;
    _entitySrc;
    _entityTitle = 'Entity';
    _entityVariant = VARIANT.default;
    _hideAvatarDetails;
    _presence = PRESENCE.default;
    _presencePosition = POSITION.presenceDefault;
    _presenceTitle = 'Presence';
    _size = SIZE.default;
    _src = '';
    _status = STATUS.default;
    _statusPosition = POSITION.statusDefault;
    _statusTitle = 'Status';
    _variant = VARIANT.default;

    render() {
        if (this.hideAvatarDetails) {
            return avatar;
        }
        return avatarWithDetails;
    }

    @api
    get hideAvatarDetails() {
        return this._hideAvatarDetails || false;
    }
    set hideAvatarDetails(value) {
        this._hideAvatarDetails = normalizeBoolean(value);
    }

    // TODO:
    // Make the icon grow when x-large or xx-large
    @api
    get size() {
        return this._size;
    }
    set size(value) {
        this._size = normalizeString(value, {
            fallbackValue: SIZE.default,
            validValues: SIZE.valid
        });
        this.updateClassList();
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
    }

    @api
    get statusTitle() {
        return this._statusTitle;
    }
    set statusTitle(value) {
        this._statusTitle = value;
    }

    _computeStatus() {
        const { status, statusPosition } = this;
        const classes = classSet('avonni-avatar__status slds-current-color')
            .add({
                'avonni-avatar__status_approved': status === 'approved',
                'avonni-avatar__status_locked': status === 'locked',
                'avonni-avatar__status_declined': status === 'declined',
                'avonni-avatar__status_unknown': status === 'unknown'
            })
            .add({
                'avonni-avatar_top-right': statusPosition === 'top-right',
                'avonni-avatar_top-left': statusPosition === 'top-left',
                'avonni-avatar_bottom-left': statusPosition === 'bottom-left',
                'avonni-avatar_bottom-right': statusPosition === 'bottom-right'
            });

        let iconName;
        switch (this.status) {
            case 'approved':
                iconName = 'utility:check';
                break;
            case 'locked':
                iconName = 'utility:lock';
                break;
            case 'declined':
                iconName = 'utility:close';
                break;
            default:
                iconName = 'utility:help';
                break;
        }

        this.statusComputed = {
            class: classes,
            iconName: iconName,
            iconSize: 'xx-small',
            type: this.status,
            title: this.statusTitle
        };
    }

    @api
    get statusPosition() {
        return this._statusPosition;
    }
    set statusPosition(value) {
        this._statusPosition = normalizeString(value, {
            fallbackValue: POSITION.statusDefault,
            validValues: POSITION.valid
        });
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
    }

    @api
    get presencePosition() {
        return this._presencePosition;
    }
    set presencePosition(value) {
        this._presencePosition = normalizeString(value, {
            fallbackValue: POSITION.presenceDefault,
            validValues: POSITION.valid
        });
    }

    @api
    get presenceTitle() {
        return this._presenceTitle;
    }
    set presenceTitle(value) {
        this._presenceTitle = value;
    }

    _computePresenceClasses() {
        const { presence, presencePosition } = this;

        this.presenceClass = classSet('avonni-avatar__presence')
            .add({
                'avonni-avatar__presence_online': presence === 'online',
                'avonni-avatar__presence_busy': presence === 'busy',
                'avonni-avatar__presence_focus': presence === 'focus',
                'avonni-avatar__presence_offline': presence === 'offline',
                'avonni-avatar__presence_blocked': presence === 'blocked',
                'avonni-avatar__presence_away': presence === 'away'
            })
            .add({
                'avonni-avatar_top-right': presencePosition === 'top-right',
                'avonni-avatar_top-left': presencePosition === 'top-left',
                'avonni-avatar_bottom-left': presencePosition === 'bottom-left',
                'avonni-avatar_bottom-right':
                    presencePosition === 'bottom-right'
            });
    }

    // Entity section ----
    _computeEntityClasses() {
        const { entityVariant, entityPosition } = this;
        const iconFullName = this.entityIconName.split(':');
        const iconCategory = iconFullName[0];
        const iconName = iconFullName[1];

        this.entityClass = classSet(
            `slds-avatar slds-current-color avonni-avatar__entity slds-icon-${iconCategory}-${iconName}`
        )
            .add({
                'avonni-avatar_top-right': entityPosition === 'top-right',
                'avonni-avatar_top-left': entityPosition === 'top-left',
                'avonni-avatar_bottom-left': entityPosition === 'bottom-left',
                'avonni-avatar_bottom-right': entityPosition === 'bottom-right'
            })
            .add({
                'slds-avatar_circle': entityVariant === 'circle'
            });
    }

    get computedEntityInitialsClass() {
        return classSet('slds-avatar__initials')
            .add(computeSldsClass(this.entityIconName))
            .toString();
    }

    @api
    get entityPosition() {
        return this._entityPosition;
    }
    set entityPosition(value) {
        this._entityPosition = normalizeString(value, {
            fallbackValue: POSITION.entityDefault,
            validValues: POSITION.valid
        });
        console.log(this._entityPosition);
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
        this._entityTitle = value;
    }

    @api
    get entityVariant() {
        return this._entityVariant;
    }
    set entityVariant(value) {
        this._entityVariant = normalizeString(value, {
            fallbackValue: VARIANT.default,
            validValues: VARIANT.valid
        });
        this.updateClassList();
    }

    get showEntityIcon() {
        return !this.entitySrc && !this.entityInitials;
    }

    get showEntity() {
        return this.entitySrc || this.entityInitials || this.entityIconName;
    }

    // ---- end of entity section

    @api
    get variant() {
        return this._variant;
    }
    set variant(value) {
        this._variant = normalizeString(value, {
            fallbackValue: VARIANT.default,
            validValues: VARIANT.valid
        });
        this.updateClassList();
    }

    connectedCallback() {
        this.updateClassList();
        /*eslint no-unused-expressions: ["error", { "allowShortCircuit": true }]*/
        this.status && this._computeStatus();
        this.presence && this._computePresenceClasses();
        this.showEntity && this._computeEntityClasses();
    }

    // Update wrapper div class list
    updateClassList() {
        const size = this.size;
        const variant = this.variant;
        const wrapperClass = classSet('avonni-avatar slds-is-relative')
            .add({
                'avonni-avatar_square': variant === 'square',
                'avonni-avatar_circle': variant === 'circle'
            })
            .add({
                'avonni-avatar_xx-small': size === 'xx-small',
                'slds-avatar_x-small': size === 'x-small',
                'slds-avatar_small': size === 'small',
                'slds-avatar_medium': size === 'medium',
                'slds-avatar_large': size === 'large',
                'avonni-avatar_x-large': size === 'x-large',
                'avonni-avatar_xx-large': size === 'xx-large'
            });

        const avatarClass = classSet('slds-avatar').add({
            'slds-avatar_circle': variant === 'circle'
        });

        this.avatarClass = avatarClass;
        this.wrapperClass = wrapperClass;
    }

    @api
    get alternativeText() {
        return this._alternativeText;
    }
    set alternativeText(value) {
        this._alternativeText = value;
    }

    get computedInitialsClass() {
        return classSet('slds-avatar__initials')
            .add(computeSldsClass(this.fallbackIconName))
            .toString();
    }

    get showInitials() {
        return !this._src && this.initials;
    }

    get showIcon() {
        return !this._src && !this.initials;
    }

    get showTertiaryText() {
        return this.size === 'x-large' || this.size === 'xx-large';
    }

    handleImageError(event) {
        // eslint-disable-next-line no-console
        console.warn(
            `<avonni-avatar> Image with src="${event.target.src}" failed to load.`
        );
        this._src = '';
    }
}
