import { normalizeArray } from 'c/utilsPrivate';

export default class Item {
    constructor(value) {
        this.label = value.label;
        this.description = value.description;
        this.infos = normalizeArray(value.infos);
        this.icons = normalizeArray(value.icons);
        this.imageSrc = value.imageSrc;
        this.hasImage = this.imageSrc;
        console.log(this);
    }

    get hasImage() {
        console.log(this._hasImage);
        return this._hasImage;
    }

    set hasImage(imageSrc) {
        if (imageSrc) {
            this._hasImage = imageSrc.length > 0;
        }
    }
}
