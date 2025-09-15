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
    @api imageErrorLabel;
    @api lazyLoading;
    @api noImageLabel;
    @api position;
    @api src;
    @api srcset;
    @api staticImages;
    @api thumbnail;
    @api width;
    @api magnifierType;
    @api magnifierAttributes;
    @api compareAlternativeText;
    @api compareSrc;
    @api compareAttributes;
}
