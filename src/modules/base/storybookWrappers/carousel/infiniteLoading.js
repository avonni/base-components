import { LightningElement, api } from 'lwc';

const IMAGES = [
    'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
    'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg',
    'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-03.jpg'
];

export default class InfiniteLoadingCarousel extends LightningElement {
    @api actionsPosition;
    @api actionsVariant;
    @api assistiveText;
    @api currentPanel;
    @api disableAutoRefresh;
    @api disableAutoScroll;
    @api hideIndicator;
    @api hidePreviousNextPanelNavigation;
    @api imagePosition;
    @api indicatorVariant;
    @api isInfinite;
    @api itemsPerPanel;
    @api largeItemsPerPanel;
    @api mediumItemsPerPanel;
    @api scrollDuration;
    @api smallItemsPerPanel;

    enableInfiniteLoading = true;
    isLoading = false;
    items = [];

    connectedCallback() {
        this.loadMoreItems();
    }

    loadMoreItems() {
        for (let i = 0; i < 10; i++) {
            this.items.push({
                src: IMAGES[i % 3],
                name: `item-${this.items.length}`,
                title: `Item #${this.items.length}`
            });
        }
        this.items = [...this.items];
    }

    handleLoadMore() {
        this.isLoading = true;

        setTimeout(() => {
            this.loadMoreItems();
            this.isLoading = false;
        }, 3000);
    }
}
