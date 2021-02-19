import { LightningElement, api } from 'lwc';
import { classSet } from 'avonni/utils';
import { normalizeString } from 'avonni/utilsPrivate';
import { computeSldsClass } from 'avonni/iconUtils';

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
    statusDefault: 'top-right'
};
const PRESENCE = {
    valid: ['online', 'busy', 'focus', 'offline', 'blocked', 'away'],
    default: null
};

export default class Avatar extends LightningElement {
    avatarClass;

    @api alternativeText = '';
    @api fallbackIconName;
    @api initials;
    @api presenceTitle;
    @api statusTitle;

    presenceClass;
    statusComputed;
    wrapperClass;

    _presence = PRESENCE.default;
    _presencePosition = POSITION.presenceDefault;
    _size = SIZE.default;
    _src = '';
    _status = STATUS.default;
    _statusPosition = POSITION.statusDefault;
    _variant = VARIANT.default;

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

    _computeStatus() {
        const classes = classSet('avonni-avatar__status slds-current-color')
            .add({
                'avonni-avatar__status_approved': this.status === 'approved',
                'avonni-avatar__status_locked': this.status === 'locked',
                'avonni-avatar__status_declined': this.status === 'declined',
                'avonni-avatar__status_unknown': this.status === 'unknown'
            })
            .add({
                'avonni-avatar_top-right': this.statusPosition === 'top-right',
                'avonni-avatar_top-left': this.statusPosition === 'top-left',
                'avonni-avatar_bottom-left':
                    this.statusPosition === 'bottom-left',
                'avonni-avatar_bottom-right':
                    this.statusPosition === 'bottom-right'
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

        // TODO: Change the status icon size depending on the avatar size
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

    _computePresenceClasses() {
        const presence = this.presence;
        const presencePosition = this.presencePosition;

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
    }

    // Update wrapper div class list
    updateClassList() {
        const size = this._size;
        const variant = this._variant;
        const avatarClasses = classSet('slds-avatar')
            .add({
                'avonni-avatar_xx-small': size === 'xx-small',
                'slds-avatar_x-small': size === 'x-small',
                'slds-avatar_small': size === 'small',
                'slds-avatar_medium': size === 'medium',
                'slds-avatar_large': size === 'large',
                'avonni-avatar_x-large': size === 'x-large',
                'avonni-avatar_xx-large': size === 'xx-large'
            })
            .add({
                'slds-avatar_circle': variant === 'circle'
            });

        const wrapperClass = classSet('avonni-avatar slds-is-relative').add({
            'avonni-avatar_square': variant === 'square',
            'avonni-avatar_circle': variant === 'circle'
        });

        this.avatarClass = avatarClasses;
        this.wrapperClass = wrapperClass;
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

    handleImageError(event) {
        // eslint-disable-next-line no-console
        console.warn(
            `<avonni-avatar> Image with src="${event.target.src}" failed to load.`
        );
        this._src = '';
    }
}
