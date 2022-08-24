import { normalizeArray } from 'c/utilsPrivate';
import { classSet } from '../utils/classSet';

export default class Item {
    constructor(value) {
        this.avatar = value.avatar;
        this.avatarSrc = value.avatarSrc;
        this.name = value.name;
        this.fallbackIconName = value.fallbackIconName;
        this.label = value.label;
        this.description = value.description;
        this.infos = normalizeArray(value.infos);
        this.icons = normalizeArray(value.icons);
        this.imageSrc = value.imageSrc;
    }

    get hasImage() {
        if (!this.imageSrc) {
            return false;
        }
        return this.imageSrc.length > 0;
    }

    get actionsClass() {
        return classSet('slds-m-right_x-small').add({
            'avonni-list__item-action-top-right':
                this.hasImage && this.variant !== 'list'
        });
    }
}
