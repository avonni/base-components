import { LightningElement, api } from 'lwc';
import { classSet } from 'avonni/utils';
import { normalizeString } from 'avonni/utilsPrivate';
import { computeSldsClass } from 'avonni/iconUtils';

const SIZE = {
    valid: ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'],
    default: 'medium'
}
const VARIANT = {
    valid: ['circle', 'square'],
    default: 'square'
}
const STATUS = {
    valid: ['approved', 'locked', 'declined', 'unknown'],
    default: null
};
const STATUS_POSITION = {
    valid: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    default: 'top-right'
}

export default class Avatar extends LightningElement {
    avatarClass;

    @api alternativeText = '';
    @api fallbackIconName;
    @api initials;
    @api statusTitle;

    statusComputed;

    _size = SIZE.default;
    _src = '';
    _status = STATUS.default;
    _statusPosition  = STATUS_POSITION.default;
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
            validValues: SIZE.valid,
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

    _computeStatus(type) {
        const classes = classSet('avonni-avatar__status slds-current-color')
            .add({
                'avonni-avatar__status_approved': type === 'approved',
                'avonni-avatar__status_locked': type === 'locked',
                'avonni-avatar__status_declined': type === 'declined',
                'avonni-avatar__status_unknown': type === 'unknown',
            })
            .add({
                'avonni-avatar__status_top-right': this.statusPostion === 'top-right',
                'avonni-avatar__status_top-left': this.statusPostion === 'top-left',
                'avonni-avatar__status_bottom-left': this.statusPostion === 'bottom-left',
                'avonni-avatar__status_bottom-right': this.statusPostion === 'bottom-right'
            });


        const status = {
            type: type,
            class: classes,
            title: this.statusTitle
        }

        // TODO: Change the status icon size depending on the avatar size
        status.iconSize = 'xx-small';
        
        switch (status.type) {
            case 'approved':
                status.iconName = 'utility:check';
                break;
            case 'locked':
                status.iconName = 'utility:lock';
                break;
            case 'declined':
                status.iconName = 'utility:close';
                break;
            default:
                status.iconName = 'utility:help';
                break;
        }

        this.statusComputed = status;
    }

    @api
    get statusPostion() {
        return this._statusPosition;
    }
    set statusPostion(value) {
        this._statusPosition = normalizeString(value, {
            fallbackValue: STATUS_POSITION.default,
            validValues: STATUS_POSITION.valid
        });
    }

    @api
    get variant() {
        return this._variant;
    }
    set variant(value) {
        this._variant = normalizeString(value, {
            fallbackValue: VARIANT.default,
            validValues: VARIANT.valid,
        });
        this.updateClassList();
    }

    connectedCallback() {
        this.updateClassList();
        /*eslint no-unused-expressions: ["error", { "allowShortCircuit": true }]*/
        this.status && this._computeStatus(this.status);
    }

    // Update wrapper div class list
    updateClassList() {
        const size = this._size;
        const variant = this._variant;
        const classes = classSet('slds-avatar')
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
                'slds-avatar_circle': variant === 'circle',
            });
        this.avatarClass = classes;
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
