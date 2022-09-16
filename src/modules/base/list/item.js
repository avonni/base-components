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
        this.imagePosition = value.imagePosition;
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

    /**
     * On overlay and background media positions, set default text color to white.
     */
    get computedTextColor() {
        return classSet('slds-col slds-has-flexi-truncate')
            .add({
                'avonni-list__item-text-color-white':
                    this.imagePosition === 'background' ||
                    this.imagePosition === 'overlay'
            })
            .toString();
    }

}
