import { LightningElement } from 'lwc';

const IMAGES = [
    'https://v1.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
    'https://v1.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg',
    'https://v1.lightningdesignsystem.com/assets/images/carousel/carousel-03.jpg'
];

export default class AvonniInfiniteLoadingCarousel extends LightningElement {
    isLoading = false;
    items = [];

    connectedCallback() {
        this.loadMoreItems();
    }

    loadMoreItems() {
        for (let i = 0; i < 16; i++) {
            this.items.push({
                src: IMAGES[i % 3],
                name: `item-${this.items.length}`,
                title: `Item #${this.items.length}`
            });
        }
        this.items = [...this.items];
    }

    handleLoadMore() {
        if (this.items.length > 50) {
            return;
        }
        this.isLoading = true;

        setTimeout(() => {
            this.loadMoreItems();
            this.isLoading = false;
        }, 500);
    }
}
