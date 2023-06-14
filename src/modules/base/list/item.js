import { normalizeArray } from 'c/utilsPrivate';
import { classSet } from 'c/utils';

export default class Item {
    constructor(value) {
        this.avatar = value.avatar;
        this.avatarSrc = value.avatarSrc;
        this.description = value.description;
        this.fallbackIconName = value.fallbackIconName;
        this.fields = value.fields;
        this.href = value.href;
        this.infos = normalizeArray(value.infos);
        this.icons = normalizeArray(value.icons);
        this.imageSrc = value.imageSrc;
        this.imagePosition = value.imagePosition;
        this.label = value.label;
        this.name = value.name;
    }

    get hasImage() {
        return !!this.imageSrc;
    }

    /**
     * On overlay and background media positions, set default text color to white.
     */
    get computedTextColor() {
        return classSet('avonni-list__flex-col slds-has-flexi-truncate')
            .add({
                'avonni-list__item-text-color_inverse':
                    this.imagePosition === 'background' ||
                    this.imagePosition === 'overlay'
            })
            .toString();
    }
}
