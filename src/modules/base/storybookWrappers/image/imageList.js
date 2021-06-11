import { LightningElement, api } from 'lwc';

export default class Image extends LightningElement {
    @api src;
    @api srcset;
    @api alt;
    @api width;
    @api height;
    @api blankColor;
    @api rounded;
    @api block;
    @api fluid;
    @api fluidGrow;
    @api thumbnail;
    @api left;
    @api right;
    @api center;
    @api blank;
    @api staticImages;
    @api lazyLoading;
    @api cropSize;
    @api cropFit;
    @api cropPositionX;
    @api cropPositionY;

    _itemsNumber = 12;

    get itemList() {
        let result = [];
        for (let i = 0; i < this._itemsNumber; i++) {
            let item = {
                key: i,
                src : this.src,
                srcset : this.srcset,
                alt : this.alt,
                width : this.width,
                height : this.height,
                blankColor : this.blankColor,
                rounded : this.rounded,
                block : this.block,
                fluid : this.fluid,
                fluidGrow : this.fluidGrow,
                thumbnail : this.thumbnail,
                left : this.left,
                right : this.right,
                center : this.center,
                blank : this.blank,
                staticImages : this.staticImages,
                lazyLoading : this.lazyLoading,
                cropSize : this.cropSize,
                cropFit : this.cropFit,
                cropPositionX : this.cropPositionX, 
                cropPositionY : this.cropPositionY, 
            }
            result.push(item);
        } 

        return result;
    }
}

