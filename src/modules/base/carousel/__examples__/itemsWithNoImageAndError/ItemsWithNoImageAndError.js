import { LightningElement } from 'lwc';

export default class AvonniCarouselItemsWithNoImageAndError extends LightningElement {
    items = [
        {
            name: '1',
            src: null
        },
        {
            name: '2',
            src: 'https://v1.lightningdesignsystem.com/assets/images/carousel/carousel-02.jg'
        }
    ];
}
