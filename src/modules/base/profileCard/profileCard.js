import { LightningElement, api } from 'lwc';
import { normalizeString } from 'c/utilsPrivate';
import { classSet } from 'c/utils';

const validSizes = {
    valid: ['x-small', 'small', 'medium', 'large', 'x-large'],
    default: 'medium'
};
const validAvatarPositions = {
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
const validAvatarVariants = { valid: ['circle', 'square'], default: 'circle' };

export default class ProfileCard extends LightningElement {
    @api title;
    @api subtitle;
    @api backgroundColor;
    @api backgroundSrc;
    @api backgroundAlternativeText;
    @api avatarSrc;
    @api avatarAlternativeText;
    @api avatarFallbackIconName;

    _size = validSizes.default;
    _avatarPosition = validAvatarPositions.default;
    _avatarMobilePosition = validAvatarPositions.default;
    _avatarVariant = validAvatarVariants.default;
    isError = false;
    showActions = true;
    showFooter = true;
    showAvatarActions = true;
    _innerWidth;

    renderedCallback() {
        let header = this.template.querySelector('header');

        if (this.backgroundColor) {
            header.style.backgroundColor = this.backgroundColor;
        }

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
                    '.avonni-actions'
                );
                actionsContainer.classList.add('avonni-actions-left');
            } else {
                let actionsContainer = this.template.querySelector(
                    '.avonni-actions'
                );
                actionsContainer.classList.add('avonni-actions-right');
            }
            if (
                this.showActions &&
                this._avatarMobilePosition.indexOf('right') > -1
            ) {
                let actionsContainer = this.template.querySelector(
                    '.avonni-actions'
                );
                actionsContainer.classList.add('avonni-mobile-actions-left');
            } else {
                let actionsContainer = this.template.querySelector(
                    '.avonni-actions'
                );
                actionsContainer.classList.add('avonni-mobile-actions-right');
            }
        }

        if (this.footerSlot) {
            this.showFooter = this.footerSlot.assignedElements().length !== 0;
        }
    }

    get avatarActionsSlot() {
        return this.template.querySelector('slot[name=avataractions]');
    }

    get actionsSlot() {
        return this.template.querySelector('slot[name=actions]');
    }

    get footerSlot() {
        return this.template.querySelector('slot[name=footer]');
    }

    @api
    get size() {
        return this._size;
    }

    set size(size) {
        this._size = normalizeString(size, {
            fallbackValue: validSizes.default,
            validValues: validSizes.valid
        });
    }

    @api
    get avatarPosition() {
        return this._avatarPosition;
    }

    set avatarPosition(avatarPosition) {
        this._avatarPosition = normalizeString(avatarPosition, {
            fallbackValue: validAvatarPositions.default,
            validValues: validAvatarPositions.valid
        });
    }

    @api
    get avatarMobilePosition() {
        return this._avatarMobilePosition;
    }

    set avatarMobilePosition(avatarMobilePosition) {
        this._avatarMobilePosition = normalizeString(avatarMobilePosition, {
            fallbackValue: validAvatarPositions.default,
            validValues: validAvatarPositions.valid
        });
    }

    @api
    get avatarVariant() {
        return this._avatarVariant;
    }

    set avatarVariant(avatarVariant) {
        this._avatarVariant = normalizeString(avatarVariant, {
            fallbackValue: validAvatarVariants.default,
            validValues: validAvatarVariants.valid
        });
    }

    get computedContainerClass() {
        return classSet('avonni-flex-container')
            .add({
                'avonni-flex-align-start':
                    this._avatarPosition === 'top-left' ||
                    this._avatarPosition === 'bottom-left',
                'avonni-flex-align-center':
                    this._avatarPosition === 'top-center' ||
                    this._avatarPosition === 'bottom-center',
                'avonni-flex-align-end':
                    this._avatarPosition === 'top-right' ||
                    this._avatarPosition === 'bottom-right'
            })
            .add({
                'avonni-flex-mobile-align-start':
                    this._avatarMobilePosition === 'top-left' ||
                    this._avatarMObilePosition === 'bottom-left',
                'avonni-flex-mobile-align-center':
                    this._avatarMobilePosition === 'top-center' ||
                    this._avatarMobilePosition === 'bottom-center',
                'avonni-flex-mobile-align-end':
                    this._avatarMobilePosition === 'top-right' ||
                    this._avatarMobilePosition === 'bottom-right'
            })
            .toString();
    }

    get computedMainContainerClass() {
        return classSet('')
            .add({
                'top-left': this._avatarPosition === 'top-left',
                'bottom-left': this._avatarPosition === 'bottom-left',
                'bottom-right': this._avatarPosition === 'bottom-right',
                'top-right': this._avatarPosition === 'top-right',
                'top-center': this._avatarPosition === 'top-center',
                'bottom-center': this._avatarPosition === 'bottom-center'
            })
            .add({
                'top-left-mobile': this._avatarMobilePosition === 'top-left',
                'bottom-left-mobile':
                    this._avatarMobilePosition === 'bottom-left',
                'bottom-right-mobile':
                    this._avatarMobilePosition === 'bottom-right',
                'top-right-mobile': this._avatarMobilePosition === 'top-right',
                'top-center-mobile':
                    this._avatarMobilePosition === 'top-center',
                'bottom-center-mobile':
                    this._avatarMobilePosition === 'bottom-center'
            })
            .add(`card-${this._size}`)
            .toString();
    }

    get computedHeaderClass() {
        return classSet('slds-media slds-media_center slds-has-flexi-truncate')
            .add(`background-${this._size}`)
            .toString();
    }

    get computedAvatarClass() {
        return classSet('avatar-img')
            .add(`avatar-${this._size}`)
            .add({
                'avatar-img-circle': this._avatarVariant === 'circle',
                'avonni-icon-container': this.isError
            })
            .toString();
    }

    get showHeaderSlot() {
        return !this.title && !this.subtitle;
    }

    get isCircle() {
        return this._avatarVariant === 'circle' ? 'avatar-img-circle' : '';
    }

    setFallbackIcon() {
        if (
            this.avatarFallbackIconName &&
            (this.avatarFallbackIconName.indexOf('standard') > -1 ||
                this.avatarFallbackIconName.indexOf('custom') > -1)
        ) {
            this.isError = true;
        }
    }

    computedWidth() {
        this._innerWidth = window.innerWidth;
    }
}
