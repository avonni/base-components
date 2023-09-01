

import { LightningElement, api } from 'lwc';

export default class Image extends LightningElement {
    @api alternativeText;
    @api cropFit;
    @api cropPositionX;
    @api cropPositionY;
    @api cropSize;
    @api fluid;
    @api fluidGrow;
    @api height;
    @api lazyLoading;
    @api position;
    @api src = [];
    @api srcset;
    @api staticImages;
    @api thumbnail;
    @api width;
    @api magnifierType;
    @api magnifierAttributes;
    @api compareSrc;
    @api compareAttributes;

    get itemList() {
        let result = [];
        for (let i = 0; i < this.src.length; i++) {
            let item = {
                key: i,
                src: this.src[i],
                srcset: this.srcset,
                alternativeText: this.alternativeText,
                width: this.width,
                height: this.height,
                fluid: this.fluid,
                fluidGrow: this.fluidGrow,
                thumbnail: this.thumbnail,
                position: this.position,
                staticImages: this.staticImages,
                lazyLoading: this.lazyLoading,
                cropSize: this.cropSize,
                cropFit: this.cropFit,
                cropPositionX: this.cropPositionX,
                cropPositionY: this.cropPositionY,
                magnifierType: this.magnifierType,
                magnifierAttributes: this.magnifierAttributes,
                compareSrc: this.compareSrc,
                compareAttributes: this.compareAttributes
            };
            result.push(item);
        }
        return result;
    }
}
