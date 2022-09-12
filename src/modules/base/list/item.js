import { normalizeArray } from 'c/utilsPrivate';
import { classSet } from 'c/utils';

export default class Item {
    constructor(value) {
        this.avatar = value.avatar;
        this.avatarSrc = value.avatarSrc;
        this.fallbackIconName = value.fallbackIconName;
        this.href = value.href;
        this.infos = normalizeArray(value.infos);
        this.icons = normalizeArray(value.icons);
        this.imageSrc = value.imageSrc;
        this.label = value.label;
        this.description = value.description;
        this.name = value.name;
    }

    get hasImage() {
        if (!this.imageSrc) {
            return false;
        }
        return this.imageSrc.length > 0;
    }

    get actionsClass() {
        return classSet('slds-m-right_x-small').add({
            // 'slds-m-top_x-small slds-is-absolute avonni-list__item-action-image-top-right':
            //     this.hasImage && this.variant !== 'list',
            'slds-align-top':
                this.listHasImages && !this.hasImage && this.variant !== 'list'
        });
    }
}
