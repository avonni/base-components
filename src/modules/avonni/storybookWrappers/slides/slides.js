import { LightningElement, api } from 'lwc';

export default class Slides extends LightningElement {
    @api slidesPerView = 1;
    @api spaceBetween = 0;
    @api autoplayDelay;
    @api initialSlide = 0;
    @api speed = 300;
    @api buttonPreviousIconName = 'utility:left';
    @api buttonPreviousLabel;
    @api buttonNextIconName = 'utility:right';
    @api buttonNextLabel;
    @api fractionPrefixLabel;
    @api fractionLabel = '/';
    @api width;
    @api height;
    @api coverflowSlideWidth;
    @api coverflowSlideHeight;
    @api direction = 'horizontal';
    @api effect = 'slide';
    @api buttonPreviousIconPosition = 'left';
    @api buttonPreviousVariant = 'neutral';
    @api buttonNextIconPosition = 'right';
    @api buttonNextVariant = 'neutral';
    @api buttonPosition = 'middle';
    @api indicatorType = 'bullets';
    @api indicatorPosition = 'bottom-center';
    @api navigation = false;
    @api buttonInner = false;
    @api indicators = false;
    @api indicatorInner = false;
    @api loop = false;
}
