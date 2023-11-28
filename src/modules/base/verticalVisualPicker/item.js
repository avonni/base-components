import { classSet, generateUUID } from 'c/utils';

export default class VerticalVisualPickerItem {
    constructor(props) {
        Object.assign(this, props);

        this.key = generateUUID();
        this.mediaPosition = this.mediaPosition || 'left';
    }

    get alternativeText() {
        return this.hasAvatar
            ? this.avatar.alternativeText ||
                  this.avatar.iconName ||
                  this.avatar.initials
            : '';
    }

    get bodyClass() {
        return classSet('slds-p-around_small slds-has-flexi-truncate')
            .add({
                'slds-border_left': this.mediaIsLeft,
                'slds-border_right': this.mediaIsRight
            })
            .toString();
    }

    get computedValue() {
        return this.value || this.key;
    }

    get descriptionClass() {
        return classSet(
            'slds-text-title avonni-vertical-visual-picker__item-description'
        ).add({
            'slds-truncate': this.tags && this.size === 'small',
            'slds-line-clamp_x-small': this.tags && this.size !== 'small',
            'slds-line-clamp_small': !this.tags
        });
    }

    get hasAvatar() {
        return (
            this.avatar &&
            typeof this.avatar === 'object' &&
            (this.avatar.imgSrc || this.avatar.initials || this.avatar.iconName)
        );
    }

    get mediaIsLeft() {
        return this.mediaPosition === 'left' && (this.hasAvatar || this.imgSrc);
    }

    get mediaIsRight() {
        return (
            this.mediaPosition === 'right' && (this.hasAvatar || this.imgSrc)
        );
    }
}
